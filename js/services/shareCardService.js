import { getReadableTextColor } from '../utils/colorUtils.js';

/**
 * Genera la imagen que se comparte: el Pokémon sobre el fondo de la
 * Pokédex, con su nombre, tipos, afinidad y la dirección de la web.
 *
 * La URL va impresa en la propia tarjeta a propósito: algunas apps de
 * mensajería descartan el campo `url` cuando se comparte un fichero,
 * y así el enlace viaja igualmente.
 */

const COLORS = Object.freeze({
  background: '#0a0c11',
  grid: 'rgba(255, 255, 255, 0.035)',
  red: '#ec2b3b',
  yellow: '#ffcb05',
  text: '#f3f5f8',
  muted: '#7c8290',
});

const GRID_STEP = 90;
const SANS = "'Space Grotesk', 'Segoe UI', sans-serif";
const MONO = "'Space Mono', 'Courier New', monospace";

/**
 * Carga una imagen permitiendo su uso en canvas sin contaminarlo.
 * @param {string} src
 * @returns {Promise<HTMLImageElement>}
 */
function loadImage(src) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.crossOrigin = 'anonymous';
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error(`No se pudo cargar la imagen: ${src}`));
    image.src = src;
  });
}

/**
 * @param {HTMLCanvasElement} canvas
 * @param {string} mime
 * @param {number} quality
 * @returns {Promise<Blob>}
 */
function toBlob(canvas, mime, quality) {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error('El canvas no produjo imagen'))),
      mime,
      quality,
    );
  });
}

/** Rectángulo con esquinas redondeadas, para las insignias de tipo. */
function roundedRect(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + width, y, x + width, y + height, radius);
  ctx.arcTo(x + width, y + height, x, y + height, radius);
  ctx.arcTo(x, y + height, x, y, radius);
  ctx.arcTo(x, y, x + width, y, radius);
  ctx.closePath();
}

/**
 * Fondo: color base, rejilla y los dos halos de la interfaz.
 * @param {CanvasRenderingContext2D} ctx
 * @param {number} width
 * @param {number} height
 */
function drawBackground(ctx, width, height) {
  ctx.fillStyle = COLORS.background;
  ctx.fillRect(0, 0, width, height);

  ctx.strokeStyle = COLORS.grid;
  ctx.lineWidth = 1;
  ctx.beginPath();
  for (let x = 0; x <= width; x += GRID_STEP) {
    ctx.moveTo(x + 0.5, 0);
    ctx.lineTo(x + 0.5, height);
  }
  for (let y = 0; y <= height; y += GRID_STEP) {
    ctx.moveTo(0, y + 0.5);
    ctx.lineTo(width, y + 0.5);
  }
  ctx.stroke();

  const topGlow = ctx.createRadialGradient(width / 2, 0, 0, width / 2, 0, width * 0.85);
  topGlow.addColorStop(0, 'rgba(236, 43, 59, 0.30)');
  topGlow.addColorStop(1, 'rgba(236, 43, 59, 0)');
  ctx.fillStyle = topGlow;
  ctx.fillRect(0, 0, width, height);

  const bottomGlow = ctx.createRadialGradient(width, height, 0, width, height, width * 0.7);
  bottomGlow.addColorStop(0, 'rgba(255, 203, 5, 0.12)');
  bottomGlow.addColorStop(1, 'rgba(255, 203, 5, 0)');
  ctx.fillStyle = bottomGlow;
  ctx.fillRect(0, 0, width, height);
}

/**
 * Cabecera con el punto rojo y el nombre de la aplicación.
 * @param {CanvasRenderingContext2D} ctx
 * @param {number} width
 */
function drawHeader(ctx, width) {
  const y = 74;
  ctx.fillStyle = COLORS.red;
  ctx.beginPath();
  ctx.arc(66, y - 5, 9, 0, Math.PI * 2);
  ctx.fill();

  ctx.font = `26px ${MONO}`;
  ctx.fillStyle = COLORS.muted;
  ctx.textAlign = 'left';
  ctx.fillText('POKÉDEX OS — TEST DE AFINIDAD', 92, y + 3);

  ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(60, y + 34);
  ctx.lineTo(width - 60, y + 34);
  ctx.stroke();
}

/**
 * Ilustración del Pokémon, con halo detrás y encajada en su área.
 * @param {CanvasRenderingContext2D} ctx
 * @param {HTMLImageElement} image
 * @param {{centerX: number, centerY: number, maxSize: number}} box
 */
function drawArtwork(ctx, image, { centerX, centerY, maxSize }) {
  const glow = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, maxSize * 0.62);
  glow.addColorStop(0, 'rgba(236, 43, 59, 0.34)');
  glow.addColorStop(1, 'rgba(236, 43, 59, 0)');
  ctx.fillStyle = glow;
  ctx.fillRect(centerX - maxSize, centerY - maxSize, maxSize * 2, maxSize * 2);

  const scale = Math.min(maxSize / image.width, maxSize / image.height);
  const drawWidth = image.width * scale;
  const drawHeight = image.height * scale;

  ctx.save();
  ctx.shadowColor = 'rgba(0, 0, 0, 0.55)';
  ctx.shadowBlur = 48;
  ctx.shadowOffsetY = 22;
  ctx.drawImage(image, centerX - drawWidth / 2, centerY - drawHeight / 2, drawWidth, drawHeight);
  ctx.restore();
}

/**
 * Insignias de tipo, centradas horizontalmente.
 * @param {CanvasRenderingContext2D} ctx
 * @param {readonly {es: string, color: string}[]} types
 * @param {number} centerX
 * @param {number} y
 */
function drawTypeBadges(ctx, types, centerX, y) {
  const height = 56;
  const paddingX = 34;
  const gap = 18;

  ctx.font = `bold 26px ${MONO}`;
  const badges = types.map((type) => ({
    ...type,
    width: ctx.measureText(type.es.toUpperCase()).width + paddingX * 2,
  }));

  const totalWidth = badges.reduce((sum, b) => sum + b.width, 0) + gap * (badges.length - 1);
  let x = centerX - totalWidth / 2;

  badges.forEach((badge) => {
    ctx.fillStyle = badge.color;
    roundedRect(ctx, x, y, badge.width, height, height / 2);
    ctx.fill();

    ctx.fillStyle = getReadableTextColor(badge.color);
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(badge.es.toUpperCase(), x + badge.width / 2, y + height / 2 + 1);
    ctx.textBaseline = 'alphabetic';

    x += badge.width + gap;
  });
}

/**
 * Ajusta el tamaño del nombre para que quepa siempre en una línea.
 * @param {CanvasRenderingContext2D} ctx
 * @param {string} name
 * @param {number} maxWidth
 * @returns {number} Tamaño de fuente en píxeles.
 */
function fitNameFontSize(ctx, name, maxWidth) {
  let size = 104;
  do {
    ctx.font = `bold ${size}px ${SANS}`;
    if (ctx.measureText(name).width <= maxWidth) {
      break;
    }
    size -= 4;
  } while (size > 48);
  return size;
}

/**
 * Construye la tarjeta y la devuelve como fichero listo para compartir.
 * @param {object} result Modelo del resultado.
 * @param {object} cardConfig CONFIG.SHARE_CARD.
 * @param {string} shareUrl Dirección pública de la web.
 * @returns {Promise<File>}
 */
export async function buildShareCard(result, cardConfig, shareUrl) {
  const {
    WIDTH: width, HEIGHT: height, FILENAME: filename, MIME: mime, QUALITY: quality,
  } = cardConfig;

  // Las fuentes deben estar listas o el canvas usaría la de reserva.
  await document.fonts.ready;
  const artwork = await loadImage(result.artwork);

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  const centerX = width / 2;

  drawBackground(ctx, width, height);
  drawHeader(ctx, width);
  drawArtwork(ctx, artwork, { centerX, centerY: 500, maxSize: 620 });

  ctx.textAlign = 'center';

  ctx.font = `28px ${MONO}`;
  ctx.fillStyle = COLORS.red;
  ctx.fillText(`AFINIDAD ${result.matchPercent}%`, centerX, 880);

  ctx.font = `26px ${MONO}`;
  ctx.fillStyle = COLORS.muted;
  ctx.fillText('ERES', centerX, 946);

  const nameSize = fitNameFontSize(ctx, result.name, width - 140);
  ctx.font = `bold ${nameSize}px ${SANS}`;
  ctx.fillStyle = COLORS.text;
  ctx.fillText(result.name, centerX, 1040);

  drawTypeBadges(ctx, result.types, centerX, 1082);

  ctx.font = `24px ${MONO}`;
  ctx.fillStyle = COLORS.muted;
  ctx.fillText(`N.º ${result.dexNumber} · ${result.genus.toUpperCase()}`, centerX, 1204);

  ctx.font = `bold 30px ${MONO}`;
  ctx.fillStyle = COLORS.yellow;
  ctx.fillText(shareUrl.replace(/^https?:\/\//, '').replace(/\/$/, ''), centerX, 1276);

  const blob = await toBlob(canvas, mime, quality);
  return new File([blob], filename, { type: mime });
}

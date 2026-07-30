/**
 * Acceso controlado a GSAP y a las preferencias de movimiento del usuario.
 * El resto de módulos de animación no tocan `window` directamente.
 */

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

/**
 * @returns {boolean} true si el usuario pidió reducir el movimiento.
 */
export function prefersReducedMotion() {
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

/**
 * @returns {object|null} La instancia de GSAP, o null si no llegó a cargar.
 */
export function getGsap() {
  return window.gsap ?? null;
}

/**
 * Las animaciones solo se ejecutan si GSAP está disponible y el usuario
 * no ha pedido reducir el movimiento.
 * @returns {boolean}
 */
export function isMotionEnabled() {
  return getGsap() !== null && !prefersReducedMotion();
}

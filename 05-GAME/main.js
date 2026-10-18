// ASTREA REBORN — logique de démarrage minimale
// Ce fichier prépare l'espace de code ; la scène HTML est initialisée dans index.html.
export const ASTREA_CONFIG = {
  title: 'ASTREA REBORN',
  mobileFirst: true,
  quality: 'low',
  assets: {
    player: '02-MODELS/characters/',
    divineSword: '02-MODELS/weapons/',
    animations: '04-ANIMATIONS/'
  }
};

export function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

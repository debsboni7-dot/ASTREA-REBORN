// Module de référence — pas encore connecté à index.html.
export const createGameState = () => ({
  player: { health: 100, stamina: 100, position: { x: 0, y: 0, z: 2 } },
  inventory: [],
  quests: [],
  scene: "village",
  paused: false
});

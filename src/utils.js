const TYPE_NL = {
  normal: 'Normaal',
  fire: 'Vuur',
  water: 'Water',
  electric: 'Elektrisch',
  grass: 'Plant',
  ice: 'IJs',
  fighting: 'Vechten',
  poison: 'Gif',
  ground: 'Grond',
  flying: 'Vliegend',
  psychic: 'Psychisch',
  bug: 'Insect',
  rock: 'Steen',
  ghost: 'Spook',
  dragon: 'Draak',
  dark: 'Duister',
  steel: 'Staal',
  fairy: 'Fee',
}

const STAT_NL = {
  hp: 'HP',
  attack: 'Aanval',
  defense: 'Verdediging',
  'special-attack': 'Sp. aanval',
  'special-defense': 'Sp. verdediging',
  speed: 'Snelheid',
}

export const typeLabel = (name) => TYPE_NL[name] ?? name
export const statLabel = (name) => STAT_NL[name] ?? name

export const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1)

export const padId = (id) => `#${String(id).padStart(3, '0')}`

export const spriteUrl = (id) =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`

// Hoogste basiswaarde is 255; gebruikt om balken als percentage te tekenen.
export const statPercent = (value) => Math.min(100, (value / 255) * 100)

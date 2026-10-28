# Pokémon Team Manager

Een React-app waarmee je Pokémon opzoekt, hun statistieken bekijkt en een team van maximaal zes Pokémon samenstelt. De data komt van [PokéAPI](https://pokeapi.co).

## Starten

```
npm install
npm run dev
```

Andere scripts: `npm run build`, `npm run preview` en `npm run lint`.

## Pagina's

| Pad | Pagina |
|---|---|
| `/` | Home met zoekveld en uitgelichte Pokémon |
| `/list` | Pokédex met alle 151 Pokémon en zoekfilter |
| `/detail/:id` | Detail met types, statistieken en knop om toe te voegen aan het team |
| `/team` | Mijn team |

## Structuur

- `src/hooks/useFetch.js`: haalt data op met `fetch`
- `src/hooks/useTeam.js`: toegang tot het team
- `src/context/`: team-opslag, bewaard in `localStorage`
- `src/pages/`: de pagina's
- `src/components/`: de zijbalk

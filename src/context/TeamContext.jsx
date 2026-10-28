import { useEffect, useState } from 'react'
import { MAX_TEAM, TeamContext } from './teamContextValue'

const STORAGE_KEY = 'pokemon-team'

function loadTeam() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY))
    return Array.isArray(saved) ? saved : []
  } catch {
    return []
  }
}

export function TeamProvider({ children }) {
  const [team, setTeam] = useState(loadTeam)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(team))
    } catch {
    }
  }, [team])

  const isInTeam = (id) => team.some((p) => p.id === id)

  const addToTeam = (pokemon) => {
    setTeam((current) =>
      current.length >= MAX_TEAM || current.some((p) => p.id === pokemon.id)
        ? current
        : [...current, pokemon],
    )
  }

  const removeFromTeam = (id) => {
    setTeam((current) => current.filter((p) => p.id !== id))
  }

  return (
    <TeamContext.Provider value={{ team, isInTeam, addToTeam, removeFromTeam }}>
      {children}
    </TeamContext.Provider>
  )
}

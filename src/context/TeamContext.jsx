import { createContext, useContext, useEffect, useState } from 'react'

export const MAX_TEAM = 6
const STORAGE_KEY = 'pokemon-team'

const TeamContext = createContext(null)

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
      // opslag niet beschikbaar: team blijft alleen in het geheugen
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

// eslint-disable-next-line react-refresh/only-export-components
export function useTeam() {
  const ctx = useContext(TeamContext)
  if (!ctx) throw new Error('useTeam moet binnen TeamProvider gebruikt worden')
  return ctx
}

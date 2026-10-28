import { useContext } from 'react'
import { TeamContext } from '../context/teamContextValue'

function useTeam() {
  const ctx = useContext(TeamContext)
  if (!ctx) throw new Error('useTeam moet binnen TeamProvider gebruikt worden')
  return ctx
}

export default useTeam

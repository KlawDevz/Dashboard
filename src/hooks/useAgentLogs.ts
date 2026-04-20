import { useState, useEffect } from 'react'
import { supabase, type AgentLog } from '../lib/supabase'

export function useAgentLogs() {
  const [logs, setLogs] = useState<AgentLog[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchLogs() {
      try {
        setIsLoading(true)
        const { data, error } = await supabase
          .from('agent_logs')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(100)

        if (error) {
          throw error
        }

        setLogs(data || [])
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message)
        } else {
          setError('Failed to fetch logs')
        }
      } finally {
        setIsLoading(false)
      }
    }

    fetchLogs()
  }, [])

  return { logs, isLoading, error }
}
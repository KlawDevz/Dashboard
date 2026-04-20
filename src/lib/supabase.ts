import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase URL or Anon Key is missing from environment variables')
}

export const supabase = createClient(
  supabaseUrl || 'http://placeholder.com', 
  supabaseAnonKey || 'placeholder'
)

export type AgentLog = {
  id: string
  created_at: string
  agent_name: string
  task_description: string
  model_used: string
  status: 'completed' | 'failed'
}
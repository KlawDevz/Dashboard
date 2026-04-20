export type Todo = {
  id: string
  title: string
  category: string
  priority: 'low' | 'medium' | 'high'
  due_date: string | null
  completed: boolean
  status: 'todo' | 'in_progress' | 'done'
  track_status: string | null
  created_at: string
}

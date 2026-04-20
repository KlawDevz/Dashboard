import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import type { Todo } from '../lib/types'

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchTodos = async () => {
    try {
      setIsLoading(true)
      setError(null)
      const { data, error } = await supabase
        .from('todos')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        // Handle table missing silently to some extent, but throw the rest
        if (error.code === '42P01') {
          setError('MISSING_TABLE')
        } else {
          throw error
        }
      }

      setTodos(data || [])
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('Failed to fetch todos')
      }
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    let mounted = true
    const fetchTodosAsync = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const { data, error } = await supabase
          .from('todos')
          .select('*')
          .order('created_at', { ascending: false })

        if (error) {
          if (error.code === '42P01') {
            if (mounted) setError('MISSING_TABLE')
          } else {
            throw error
          }
        } else {
          if (mounted) setTodos(data || [])
        }
      } catch (err: unknown) {
        if (mounted) {
          if (err instanceof Error) {
            setError(err.message)
          } else {
            setError('Failed to fetch todos')
          }
        }
      } finally {
        if (mounted) setIsLoading(false)
      }
    }
    fetchTodosAsync()
    return () => { mounted = false }
  }, [])

  const updateTodoStatus = async (id: string, status: Todo['status']) => {
    try {
      const { error } = await supabase
        .from('todos')
        .update({ status, completed: status === 'done' })
        .eq('id', id)
      
      if (error) throw error
      
      setTodos(prev => prev.map(t => t.id === id ? { ...t, status, completed: status === 'done' } : t))
    } catch (err: unknown) {
      console.error('Failed to update status:', err)
    }
  }

  const addTodo = async (todo: Partial<Todo>) => {
    try {
      const newTodo = {
        ...todo,
        status: todo.status || 'todo',
        completed: false,
        created_at: new Date().toISOString()
      }
      const { data, error } = await supabase
        .from('todos')
        .insert([newTodo])
        .select()
        .single()
        
      if (error) throw error
      if (data) setTodos(prev => [data, ...prev])
      return data
    } catch (err: unknown) {
      console.error('Failed to add todo:', err)
      throw err
    }
  }

  const deleteTodo = async (id: string) => {
    try {
      const { error } = await supabase
        .from('todos')
        .delete()
        .eq('id', id)
        
      if (error) throw error
      setTodos(prev => prev.filter(t => t.id !== id))
    } catch (err: unknown) {
      console.error('Failed to delete todo:', err)
      throw err
    }
  }

  const updateTodo = async (id: string, updates: Partial<Todo>) => {
      try {
        const { data, error } = await supabase
          .from('todos')
          .update(updates)
          .eq('id', id)
          .select()
          .single()
          
        if (error) throw error
        if (data) {
          setTodos(prev => prev.map(t => t.id === id ? data : t))
        }
      } catch (err: unknown) {
        console.error('Failed to update todo:', err)
        throw err
      }
  }
  
  const seedData = async () => {
      const dummyData: Partial<Todo>[] = [
          { title: 'Migrer le dashboard', category: 'Dev', priority: 'high', status: 'done', completed: true },
          { title: 'Créer la page Agents', category: 'Dev', priority: 'high', status: 'todo', completed: false },
          { title: 'Créer la page Kanban', category: 'Dev', priority: 'high', status: 'todo', completed: false },
          { title: 'Faire une recherche web sur les IAs', category: 'Research', priority: 'medium', status: 'in_progress', completed: false },
          { title: 'Rédiger le rapport hebdomadaire', category: 'Writing', priority: 'low', status: 'todo', completed: false },
          { title: 'Mettre à jour la documentation', category: 'Dev', priority: 'medium', status: 'todo', completed: false }
      ];
      
      try {
          const { error } = await supabase.from('todos').insert(dummyData.map(t => ({...t, created_at: new Date().toISOString()})));
          if (error) throw error;
          await fetchTodos();
      } catch (err) {
          console.error("Failed to seed data:", err);
      }
  }

  return { todos, isLoading, error, updateTodoStatus, addTodo, deleteTodo, updateTodo, seedData }
}

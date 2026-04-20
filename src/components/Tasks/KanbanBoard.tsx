import { useState } from 'react'
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import type { DropResult } from '@hello-pangea/dnd'
import type { Todo } from '../../lib/types'
import { Clock, Plus, Trash2, Edit2 } from 'lucide-react'

interface KanbanBoardProps {
  todos: Todo[]
  onUpdateStatus: (id: string, status: Todo['status']) => void
  onAddTodo: (todo: Partial<Todo>) => void
  onDeleteTodo: (id: string) => void
  onUpdateTodo: (id: string, updates: Partial<Todo>) => void
}

const COLUMNS: { id: Todo['status']; title: string; color: string }[] = [
  { id: 'todo', title: 'À faire', color: 'bg-slate-100' },
  { id: 'in_progress', title: 'En cours', color: 'bg-blue-50' },
  { id: 'done', title: 'Terminé', color: 'bg-green-50' }
]

const PRIORITY_COLORS = {
  low: 'bg-slate-100 text-slate-600',
  medium: 'bg-yellow-100 text-yellow-800',
  high: 'bg-red-100 text-red-800'
}

export function KanbanBoard({ todos, onUpdateStatus, onAddTodo, onDeleteTodo, onUpdateTodo }: KanbanBoardProps) {
  const [filterCategory, setFilterCategory] = useState<string>('all')
  const [filterPriority, setFilterPriority] = useState<string>('all')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editTitle, setEditTitle] = useState('')
  const [isAdding, setIsAdding] = useState<Todo['status'] | null>(null)
  const [newTitle, setNewTitle] = useState('')

  const categories = Array.from(new Set(todos.map(t => t.category))).filter(Boolean)

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return
    const { source, destination, draggableId } = result
    if (source.droppableId !== destination.droppableId) {
      onUpdateStatus(draggableId, destination.droppableId as Todo['status'])
    }
  }

  const handleAdd = (status: Todo['status']) => {
    if (!newTitle.trim()) return
    onAddTodo({ title: newTitle, status, priority: 'medium', category: 'General' })
    setNewTitle('')
    setIsAdding(null)
  }

  const handleSaveEdit = (id: string) => {
    if (!editTitle.trim()) return
    onUpdateTodo(id, { title: editTitle })
    setEditingId(null)
  }

  const filteredTodos = todos.filter(t => {
    if (filterCategory !== 'all' && t.category !== filterCategory) return false
    if (filterPriority !== 'all' && t.priority !== filterPriority) return false
    return true
  })

  return (
    <div className="space-y-6">
      <div className="flex gap-4 items-center">
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2 px-3 border bg-white"
        >
          <option value="all">Toutes les catégories</option>
          {categories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <select
          value={filterPriority}
          onChange={(e) => setFilterPriority(e.target.value)}
          className="rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2 px-3 border bg-white"
        >
          <option value="all">Toutes les priorités</option>
          <option value="low">Basse</option>
          <option value="medium">Moyenne</option>
          <option value="high">Haute</option>
        </select>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="flex gap-6 h-[calc(100vh-16rem)] overflow-x-auto pb-4">
          {COLUMNS.map(col => {
            const columnTodos = filteredTodos.filter(t => t.status === col.id)
            
            return (
              <div key={col.id} className={`flex-1 min-w-[300px] rounded-xl flex flex-col ${col.color} border border-slate-200/50 p-4`}>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold text-slate-800 flex items-center gap-2">
                    {col.title}
                    <span className="bg-white/50 text-slate-500 text-xs px-2 py-1 rounded-full font-medium">
                      {columnTodos.length}
                    </span>
                  </h3>
                </div>

                <Droppable droppableId={col.id}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className={`flex-1 overflow-y-auto space-y-3 p-1 min-h-[150px] ${
                        snapshot.isDraggingOver ? 'bg-slate-200/30 rounded-lg' : ''
                      }`}
                    >
                      {columnTodos.map((todo, index) => (
                        <Draggable key={todo.id} draggableId={todo.id} index={index}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={`bg-white p-4 rounded-lg shadow-sm border border-slate-200 group ${
                                snapshot.isDragging ? 'shadow-md ring-2 ring-indigo-500 ring-opacity-50' : 'hover:border-indigo-300'
                              } transition-all`}
                            >
                              <div className="flex justify-between items-start mb-2">
                                {editingId === todo.id ? (
                                  <input
                                    autoFocus
                                    value={editTitle}
                                    onChange={e => setEditTitle(e.target.value)}
                                    onBlur={() => handleSaveEdit(todo.id)}
                                    onKeyDown={e => e.key === 'Enter' && handleSaveEdit(todo.id)}
                                    className="text-sm font-medium text-slate-900 border-b border-indigo-500 focus:outline-none w-full"
                                  />
                                ) : (
                                  <h4 className="text-sm font-medium text-slate-900 line-clamp-2">{todo.title}</h4>
                                )}
                                
                                <div className="flex items-center gap-1 ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                  <button onClick={() => {
                                    setEditingId(todo.id)
                                    setEditTitle(todo.title)
                                  }} className="text-slate-400 hover:text-indigo-600 p-1">
                                    <Edit2 className="w-3 h-3" />
                                  </button>
                                  <button onClick={() => onDeleteTodo(todo.id)} className="text-slate-400 hover:text-red-600 p-1">
                                    <Trash2 className="w-3 h-3" />
                                  </button>
                                </div>
                              </div>
                              
                              <div className="flex items-center gap-2 mt-3">
                                {todo.category && (
                                  <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                                    {todo.category}
                                  </span>
                                )}
                                <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${PRIORITY_COLORS[todo.priority]}`}>
                                  {todo.priority === 'high' ? 'Urgent' : todo.priority === 'medium' ? 'Normal' : 'Basse'}
                                </span>
                              </div>
                              
                              {todo.due_date && (
                                <div className="mt-3 flex items-center gap-1 text-xs text-slate-500">
                                  <Clock className="w-3 h-3" />
                                  {new Date(todo.due_date).toLocaleDateString('fr-FR')}
                                </div>
                              )}
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}

                      {isAdding === col.id ? (
                        <div className="bg-white p-3 rounded-lg border border-indigo-300 shadow-sm">
                          <input
                            autoFocus
                            placeholder="Titre de la tâche..."
                            value={newTitle}
                            onChange={e => setNewTitle(e.target.value)}
                            onKeyDown={e => {
                              if (e.key === 'Enter') handleAdd(col.id)
                              if (e.key === 'Escape') setIsAdding(null)
                            }}
                            onBlur={() => newTitle.trim() ? handleAdd(col.id) : setIsAdding(null)}
                            className="w-full text-sm outline-none bg-transparent"
                          />
                        </div>
                      ) : (
                        <button
                          onClick={() => setIsAdding(col.id)}
                          className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-800 hover:bg-slate-200/50 w-full p-2 rounded-lg transition-colors mt-2"
                        >
                          <Plus className="w-4 h-4" />
                          Ajouter une tâche
                        </button>
                      )}
                    </div>
                  )}
                </Droppable>
              </div>
            )
          })}
        </div>
      </DragDropContext>
    </div>
  )
}

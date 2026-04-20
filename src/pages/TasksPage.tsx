import { useTodos } from '../hooks/useTodos'
import { KanbanBoard } from '../components/Tasks/KanbanBoard'
import { Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { CheckCircle2, AlertTriangle, PlayCircle } from 'lucide-react'

ChartJS.register(ArcElement, Tooltip, Legend)

export function TasksPage() {
  const { todos, isLoading, error, updateTodoStatus, addTodo, deleteTodo, updateTodo, seedData } = useTodos()

  if (isLoading) return <div className="p-8">Chargement des tâches...</div>

  if (error === 'MISSING_TABLE') {
    return (
      <div className="p-8 space-y-4">
        <div className="bg-amber-50 border-l-4 border-amber-500 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <AlertTriangle className="h-5 w-5 text-amber-400" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-amber-800">Table `todos` manquante</h3>
              <div className="mt-2 text-sm text-amber-700">
                <p>
                  Vous devez exécuter le script SQL suivant dans Supabase pour créer la table et continuer :
                </p>
                <pre className="mt-2 bg-slate-800 text-slate-50 p-4 rounded text-xs overflow-x-auto">
{`CREATE TABLE todos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT,
  priority TEXT CHECK (priority IN ('low', 'medium', 'high')) DEFAULT 'medium',
  due_date TIMESTAMP WITH TIME ZONE,
  completed BOOLEAN DEFAULT false,
  status TEXT CHECK (status IN ('todo', 'in_progress', 'done')) DEFAULT 'todo',
  track_status TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);`}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) return <div className="p-8 text-red-500">Erreur : {error}</div>

  const todoCount = todos.filter(t => t.status === 'todo').length
  const inProgressCount = todos.filter(t => t.status === 'in_progress').length
  const doneCount = todos.filter(t => t.status === 'done').length
  const total = todos.length

  const completionRate = total > 0 ? Math.round((doneCount / total) * 100) : 0

  const getMotivationMessage = (rate: number) => {
    if (rate === 100) return "Objectif atteint ! Excellent travail ! 🚀"
    if (rate >= 80) return "Presque au but, on lâche rien ! 💪"
    if (rate >= 50) return "Moitié du chemin fait, continuez comme ça ! ✨"
    if (rate > 0) return "C'est un bon début, gardez le rythme ! 🎯"
    return "Prêt à commencer la journée ? 🌟"
  }

  const chartData = {
    labels: ['À faire', 'En cours', 'Terminé'],
    datasets: [
      {
        data: [todoCount, inProgressCount, doneCount],
        backgroundColor: ['#F1F5F9', '#DBEAFE', '#DCFCE7'],
        borderColor: ['#E2E8F0', '#BFDBFE', '#BBF7D0'],
        borderWidth: 1,
      },
    ],
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold leading-tight text-slate-900 mb-2">Gestion des Tâches</h2>
          <p className="text-slate-500 text-sm">Organisez et suivez votre progression quotidienne</p>
        </div>
        {todos.length === 0 && (
          <button 
            onClick={seedData}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-sm font-medium transition-colors"
          >
            Générer données de test
          </button>
        )}
      </div>

      {total > 0 && (
        <div className="bg-white rounded-xl shadow border border-slate-200 p-6 flex flex-col md:flex-row gap-8 items-center">
          <div className="w-48 h-48 flex-shrink-0">
            <Doughnut 
              data={chartData} 
              options={{ 
                cutout: '75%', 
                plugins: { legend: { display: false } },
                maintainAspectRatio: true
              }} 
            />
          </div>
          
          <div className="flex-1 space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-4xl font-bold text-slate-900">{completionRate}%</span>
                <span className="text-slate-500">complété</span>
              </div>
              <p className="text-indigo-600 font-medium">{getMotivationMessage(completionRate)}</p>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2 text-slate-600 text-sm font-medium">
                  <AlertTriangle className="w-4 h-4 text-slate-400" />
                  À faire
                </div>
                <span className="text-2xl font-semibold text-slate-800">{todoCount}</span>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2 text-blue-600 text-sm font-medium">
                  <PlayCircle className="w-4 h-4 text-blue-400" />
                  En cours
                </div>
                <span className="text-2xl font-semibold text-slate-800">{inProgressCount}</span>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2 text-green-600 text-sm font-medium">
                  <CheckCircle2 className="w-4 h-4 text-green-400" />
                  Terminé
                </div>
                <span className="text-2xl font-semibold text-slate-800">{doneCount}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="bg-slate-50 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-8 border-t border-slate-200">
        <KanbanBoard 
          todos={todos}
          onUpdateStatus={updateTodoStatus}
          onAddTodo={addTodo}
          onDeleteTodo={deleteTodo}
          onUpdateTodo={updateTodo}
        />
      </div>
    </div>
  )
}

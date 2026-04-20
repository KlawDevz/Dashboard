import { useAgentLogs } from '../hooks/useAgentLogs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'
import { Line } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

export function OverviewPage() {
  const { logs, isLoading, error } = useAgentLogs()

  if (isLoading) return (
    <div className="p-8 space-y-6 animate-pulse">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map(i => <div key={i} className="h-32 bg-slate-800 rounded-xl"></div>)}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="h-[400px] bg-slate-800 rounded-xl"></div>
        <div className="h-[400px] bg-slate-800 rounded-xl"></div>
      </div>
    </div>
  )
  if (error) return <div className="p-8 text-red-400 bg-red-900/20 rounded-xl border border-red-900/50">Erreur : {error}</div>

  const successCount = logs.filter(l => l.status === 'completed').length
  const totalCount = logs.length
  const successRate = totalCount > 0 ? Math.round((successCount / totalCount) * 100) : 0
  const lastAction = logs[0]

  // Prépare les données pour le graphique des dernières 24h
  const now = new Date()
  const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000)
  
  const recentLogs = logs.filter(l => new Date(l.created_at) >= twentyFourHoursAgo)
  
  // Regrouper par heure
  const hourlyData: Record<string, number> = {}
  for (let i = 23; i >= 0; i--) {
    const d = new Date(now.getTime() - i * 60 * 60 * 1000)
    const hourLabel = `${d.getHours()}h`
    hourlyData[hourLabel] = 0
  }

  recentLogs.forEach(l => {
    const d = new Date(l.created_at)
    const hourLabel = `${d.getHours()}h`
    if (hourlyData[hourLabel] !== undefined) {
      hourlyData[hourLabel]++
    }
  })

  const chartData = {
    labels: Object.keys(hourlyData),
    datasets: [
      {
        label: 'Actions des agents (24h)',
        data: Object.values(hourlyData),
        fill: true,
        borderColor: '#818cf8',
        backgroundColor: 'rgba(129, 140, 248, 0.1)',
        tension: 0.4
      }
    ]
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false }
    },
    scales: {
      y: { 
        beginAtZero: true,
        grid: { color: 'rgba(255, 255, 255, 0.05)' },
        ticks: { color: '#94a3b8', stepSize: 1 }
      },
      x: {
        grid: { display: false },
        ticks: { color: '#94a3b8' }
      }
    }
  }

  return (
    <div className="space-y-6">
      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl">
          <h3 className="text-slate-400 text-sm font-medium">Tâches Totales</h3>
          <p className="text-3xl font-bold text-white mt-2">{totalCount}</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl">
          <h3 className="text-slate-400 text-sm font-medium">Taux de Réussite Global</h3>
          <div className="flex items-end gap-2 mt-2">
            <p className="text-3xl font-bold text-white">{successRate}%</p>
            <p className="text-emerald-500 text-sm font-medium mb-1">OK</p>
          </div>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl">
          <h3 className="text-slate-400 text-sm font-medium">Dernière Action</h3>
          {lastAction ? (
            <div className="mt-2">
              <p className="text-white font-medium truncate">{lastAction.agent_name}</p>
              <p className="text-slate-500 text-xs truncate mt-1">{lastAction.task_description}</p>
              <p className="text-slate-600 text-xs mt-1">{new Date(lastAction.created_at).toLocaleString('fr-FR')}</p>
            </div>
          ) : (
            <p className="text-slate-500 mt-2">Aucune action</p>
          )}
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl flex flex-col h-[400px]">
          <h3 className="text-slate-200 font-medium mb-4">Activité Modèles (24h)</h3>
          <div className="flex-1 relative">
             <Line data={chartData} options={chartOptions} />
          </div>
        </div>

        {/* Live Feed */}
        <div className="bg-[#0f111a] border border-slate-800 rounded-xl shadow-xl overflow-hidden flex flex-col h-[400px]">
          <div className="bg-slate-900 border-b border-slate-800 p-3 flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
            </div>
            <span className="text-slate-400 text-xs font-mono ml-2">console d'événements (20 derniers)</span>
          </div>
          <div className="flex-1 p-4 overflow-y-auto font-mono text-sm space-y-3">
            {logs.slice(0, 20).map(log => {
              const date = new Date(log.created_at)
              const time = `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`
              return (
                <div key={log.id} className="text-slate-300 break-words">
                  <span className="text-slate-500">[{time}]</span>{' '}
                  <span className={
                    log.agent_name.toLowerCase() === 'dev' ? 'text-emerald-400' :
                    log.agent_name.toLowerCase() === 'sacha' ? 'text-blue-400' :
                    log.agent_name.toLowerCase() === 'edith' ? 'text-purple-400' : 'text-slate-400'
                  }>
                    {log.agent_name}
                  </span>
                  <span className="text-slate-500">@</span>
                  <span className="text-indigo-400">{log.model_used}</span>
                  <span className="text-slate-500"> : </span>
                  <span>{log.task_description}</span>
                  {' '}
                  <span className={log.status === 'completed' ? 'text-emerald-500' : 'text-red-500'}>
                    [{log.status.toUpperCase()}]
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
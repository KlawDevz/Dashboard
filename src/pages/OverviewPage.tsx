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
        <div className="bg-white/[0.02] backdrop-blur-2xl border border-white/[0.05] rounded-2xl p-6 shadow-2xl transition-all duration-300 hover:bg-white/[0.04] hover:-translate-y-1">
          <h3 className="text-neutral-500 text-sm font-medium tracking-wide uppercase">Tâches Totales</h3>
          <p className="text-3xl font-light tracking-tight text-neutral-200 mt-3">{totalCount}</p>
        </div>
        <div className="bg-white/[0.02] backdrop-blur-2xl border border-white/[0.05] rounded-2xl p-6 shadow-2xl transition-all duration-300 hover:bg-white/[0.04] hover:-translate-y-1">
          <h3 className="text-neutral-500 text-sm font-medium tracking-wide uppercase">Taux de Réussite Global</h3>
          <div className="flex items-baseline gap-2 mt-3">
            <p className="text-3xl font-light tracking-tight text-neutral-200">{successRate}%</p>
            <p className="text-emerald-400/90 text-sm font-medium drop-shadow-[0_0_10px_rgba(52,211,153,0.4)]">OK</p>
          </div>
        </div>
        <div className="bg-white/[0.02] backdrop-blur-2xl border border-white/[0.05] rounded-2xl p-6 shadow-2xl transition-all duration-300 hover:bg-white/[0.04] hover:-translate-y-1">
          <h3 className="text-neutral-500 text-sm font-medium tracking-wide uppercase">Dernière Action</h3>
          {lastAction ? (
            <div className="mt-3">
              <p className="text-neutral-200 font-medium truncate">{lastAction.agent_name}</p>
              <p className="text-neutral-400 text-sm truncate mt-1.5">{lastAction.task_description}</p>
              <p className="text-neutral-500 text-xs mt-2">{new Date(lastAction.created_at).toLocaleString('fr-FR')}</p>
            </div>
          ) : (
            <p className="text-neutral-500 mt-3">Aucune action</p>
          )}
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart */}
        <div className="bg-white/[0.02] backdrop-blur-2xl border border-white/[0.05] rounded-2xl p-6 shadow-2xl flex flex-col h-[400px]">
          <h3 className="text-neutral-200 font-medium tracking-tight mb-6">Activité Modèles (24h)</h3>
          <div className="flex-1 relative">
             <Line data={{
               ...chartData,
               datasets: [{
                 ...chartData.datasets[0],
                 borderColor: 'rgba(255, 255, 255, 0.2)',
                 backgroundColor: 'rgba(255, 255, 255, 0.03)',
               }]
             }} options={{
               ...chartOptions,
               scales: {
                 y: { 
                   beginAtZero: true,
                   grid: { color: 'rgba(255, 255, 255, 0.03)' },
                   ticks: { color: '#737373', stepSize: 1, padding: 10 }
                 },
                 x: {
                   grid: { display: false },
                   ticks: { color: '#737373', padding: 10 }
                 }
               }
             }} />
          </div>
        </div>

        {/* Live Feed */}
        <div className="bg-[#050505]/80 backdrop-blur-2xl border border-white/[0.05] rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[400px]">
          <div className="bg-white/[0.02] border-b border-white/[0.05] p-3 flex items-center gap-3">
            <div className="flex gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-neutral-600"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-neutral-600"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-neutral-600"></div>
            </div>
            <span className="text-neutral-500 text-xs font-mono">console d'événements (20 derniers)</span>
          </div>
          <div className="flex-1 p-5 overflow-y-auto font-mono text-sm space-y-4">
            {logs.slice(0, 20).map(log => {
              const date = new Date(log.created_at)
              const time = `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`
              return (
                <div key={log.id} className="text-neutral-300 break-words leading-relaxed">
                  <span className="text-neutral-600">[{time}]</span>{' '}
                  <span className={
                    log.agent_name.toLowerCase() === 'dev' ? 'text-neutral-200 font-medium' :
                    log.agent_name.toLowerCase() === 'sacha' ? 'text-neutral-300 font-medium' :
                    log.agent_name.toLowerCase() === 'edith' ? 'text-neutral-100 font-medium' : 'text-neutral-400'
                  }>
                    {log.agent_name}
                  </span>
                  <span className="text-neutral-600 mx-1">@</span>
                  <span className="text-neutral-400">{log.model_used}</span>
                  <span className="text-neutral-600 mx-1"> : </span>
                  <span className="text-neutral-300">{log.task_description}</span>
                  {' '}
                  <span className={log.status === 'completed' ? 'text-emerald-400/80 drop-shadow-[0_0_8px_rgba(52,211,153,0.2)] ml-2' : 'text-red-400/80 ml-2'}>
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
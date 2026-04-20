import type { AgentLog } from '../../lib/supabase'

interface AgentCardProps {
  name: string
  role: string
  color: string
  logs: AgentLog[]
}

export function AgentCard({ name, role, color, logs }: AgentCardProps) {
  const agentLogs = logs.filter(log => log.agent_name.toLowerCase() === name.toLowerCase())
  const isOnline = agentLogs.length > 0 && new Date(agentLogs[0].created_at).getTime() > Date.now() - 24 * 60 * 60 * 1000 // online if active in last 24h
  
  const today = new Date().toISOString().split('T')[0]
  const todayLogs = agentLogs.filter(log => log.created_at.startsWith(today))
  
  const lastTask = agentLogs[0]
  const lastModel = lastTask?.model_used || 'N/A'
  
  const shadowColor = color.replace('#', '')
  
  return (
    <div 
      className="bg-white rounded-xl shadow-lg p-6 relative overflow-hidden border border-slate-100"
      style={{ boxShadow: `0 4px 20px -5px rgba(${parseInt(shadowColor.substring(0,2), 16)}, ${parseInt(shadowColor.substring(2,4), 16)}, ${parseInt(shadowColor.substring(4,6), 16)}, 0.3)` }}
    >
      <div className="absolute top-0 left-0 w-1 h-full" style={{ backgroundColor: color }}></div>
      
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            {name}
            <span className="relative flex h-3 w-3">
              {isOnline && <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: color }}></span>}
              <span className={`relative inline-flex rounded-full h-3 w-3 ${isOnline ? 'bg-green-500' : 'bg-slate-300'}`}></span>
            </span>
          </h3>
          <p className="text-sm font-medium text-slate-500">{role}</p>
        </div>
        <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl" style={{ backgroundColor: color }}>
          {name.charAt(0)}
        </div>
      </div>

      <div className="space-y-3 mt-6">
        <div className="flex justify-between items-center text-sm">
          <span className="text-slate-500">Tâches du jour</span>
          <span className="font-semibold text-slate-900 bg-slate-100 px-2 py-1 rounded">{todayLogs.length}</span>
        </div>
        
        <div className="flex justify-between items-center text-sm">
          <span className="text-slate-500">Dernier modèle</span>
          <span className="font-medium text-slate-700">{lastModel}</span>
        </div>

        <div className="pt-4 border-t border-slate-100">
          <span className="text-xs text-slate-400 block mb-1">Dernière tâche</span>
          <p className="text-sm text-slate-700 line-clamp-2" title={lastTask?.task_description}>
            {lastTask?.task_description || "Aucune donnée"}
          </p>
          <span className="text-xs text-slate-400 block mt-2">
            {lastTask ? new Date(lastTask.created_at).toLocaleString('fr-FR') : "N/A"}
          </span>
        </div>
      </div>
    </div>
  )
}

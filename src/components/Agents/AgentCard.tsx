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
      className="bg-slate-900 rounded-xl shadow-xl p-6 relative overflow-hidden border border-slate-800"
      style={{ boxShadow: `0 4px 30px -5px rgba(${parseInt(shadowColor.substring(0,2), 16)}, ${parseInt(shadowColor.substring(2,4), 16)}, ${parseInt(shadowColor.substring(4,6), 16)}, 0.15)` }}
    >
      <div className="absolute top-0 left-0 w-1 h-full" style={{ backgroundColor: color, opacity: 0.8 }}></div>
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ background: `radial-gradient(circle at top right, ${color} 0%, transparent 70%)` }}></div>
      
      <div className="flex justify-between items-start mb-4 relative z-10">
        <div>
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            {name}
            <span className="relative flex h-3 w-3">
              {isOnline && <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: color }}></span>}
              <span className={`relative inline-flex rounded-full h-3 w-3 ${isOnline ? 'bg-emerald-500' : 'bg-slate-600'}`}></span>
            </span>
          </h3>
          <p className="text-sm font-medium text-slate-400">{role}</p>
        </div>
        <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg ring-2 ring-slate-800" style={{ backgroundColor: color }}>
          {name.charAt(0)}
        </div>
      </div>

      <div className="space-y-3 mt-6 relative z-10">
        <div className="flex justify-between items-center text-sm">
          <span className="text-slate-400">Tâches du jour</span>
          <span className="font-semibold text-slate-200 bg-slate-800/80 px-2.5 py-1 rounded border border-slate-700">{todayLogs.length}</span>
        </div>
        
        <div className="flex justify-between items-center text-sm">
          <span className="text-slate-400">Modèle favori</span>
          <span className="font-medium text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20 text-xs">{lastModel}</span>
        </div>

        <div className="pt-4 border-t border-slate-800">
          <span className="text-xs text-slate-500 block mb-1">Dernière action</span>
          <p className="text-sm text-slate-300 line-clamp-2" title={lastTask?.task_description}>
            {lastTask?.task_description || "Aucune donnée"}
          </p>
          <div className="flex justify-between items-center mt-2">
             <span className="text-xs text-slate-500">
               {lastTask ? new Date(lastTask.created_at).toLocaleString('fr-FR') : "N/A"}
             </span>
             {lastTask && (
               <span className={`text-[10px] uppercase font-bold px-1.5 py-0.5 rounded ${lastTask.status === 'completed' ? 'text-emerald-400 bg-emerald-400/10' : 'text-red-400 bg-red-400/10'}`}>
                 {lastTask.status}
               </span>
             )}
          </div>
        </div>
      </div>
    </div>
  )
}

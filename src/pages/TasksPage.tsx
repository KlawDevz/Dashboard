import { useAgentLogs } from '../hooks/useAgentLogs'
import { CheckCircle2, XCircle, Clock, Loader2, HelpCircle, Layers } from 'lucide-react'

export function TasksPage() {
  const { logs, isLoading, error } = useAgentLogs()

  if (isLoading) return (
    <div className="p-8 space-y-6 animate-pulse">
      <div className="h-8 w-48 bg-slate-800 rounded mb-6"></div>
      <div className="flex gap-4 overflow-x-auto pb-4">
        {[1, 2, 3, 4, 5].map(i => <div key={i} className="h-[500px] min-w-[300px] w-full bg-slate-800 rounded-xl flex-shrink-0"></div>)}
      </div>
    </div>
  )

  if (error) return <div className="p-8 text-red-400 bg-red-900/20 rounded-xl border border-red-900/50">Erreur : {error}</div>

  // Fake logs for columns other than completed/failed to demonstrate pipeline
  const pendingLogs = [
    { id: 'fake1', task_description: 'Audit de sécurité', agent_name: 'Dev', created_at: new Date().toISOString(), status: 'pending' },
    { id: 'fake2', task_description: 'Analyse marché IA', agent_name: 'Sacha', created_at: new Date().toISOString(), status: 'pending' }
  ]
  const thinkingLogs = [
    { id: 'fake3', task_description: 'Scraping LinkedIn', agent_name: 'Sacha', created_at: new Date().toISOString(), status: 'thinking' }
  ]
  const executingLogs = [
    { id: 'fake4', task_description: 'Déploiement V2', agent_name: 'Dev', created_at: new Date().toISOString(), status: 'executing' }
  ]

  const columns = [
    { id: 'pending', title: 'Pending', icon: <Clock className="w-4 h-4 text-neutral-400" />, items: pendingLogs, color: 'border-neutral-500/30 bg-neutral-500/5 text-neutral-400' },
    { id: 'thinking', title: 'Thinking', icon: <HelpCircle className="w-4 h-4 text-blue-400" />, items: thinkingLogs, color: 'border-blue-500/30 bg-blue-500/5 text-blue-400' },
    { id: 'executing', title: 'Executing', icon: <Loader2 className="w-4 h-4 text-yellow-400 animate-spin" />, items: executingLogs, color: 'border-yellow-500/30 bg-yellow-500/5 text-yellow-400' },
    { id: 'completed', title: 'Completed', icon: <CheckCircle2 className="w-4 h-4 text-emerald-400" />, items: logs.filter(l => l.status === 'completed').slice(0, 10), color: 'border-emerald-500/30 bg-emerald-500/5 text-emerald-400' },
    { id: 'failed', title: 'Failed', icon: <XCircle className="w-4 h-4 text-red-400" />, items: logs.filter(l => l.status === 'failed').slice(0, 10), color: 'border-red-500/30 bg-red-500/5 text-red-400' }
  ]

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col">
       <div className="flex items-center justify-between mb-6 flex-shrink-0">
         <h2 className="text-2xl font-semibold tracking-tight text-neutral-100 flex items-center gap-3">
           <Layers className="w-6 h-6 text-blue-500" />
           Pipeline Tâches
         </h2>
       </div>

       <div className="flex-1 flex gap-4 overflow-x-auto pb-4 snap-x">
         {columns.map(col => (
           <div key={col.id} className="flex-1 min-w-[300px] max-w-[350px] bg-[#050505]/80 backdrop-blur-2xl border border-white/[0.05] rounded-2xl flex flex-col snap-center shadow-2xl transition-all duration-300">
             {/* Column Header */}
             <div className={`p-4 border-b border-white/[0.05] flex items-center justify-between sticky top-0 bg-[#050505]/95 z-10 rounded-t-2xl`}>
                <div className="flex items-center gap-2">
                  {col.icon}
                  <span className="font-semibold text-sm tracking-wide text-neutral-200">{col.title}</span>
                </div>
                <span className={`text-xs font-mono px-2 py-0.5 rounded-md border ${col.color}`}>{col.items.length}</span>
             </div>
             
             {/* Cards */}
             <div className="flex-1 p-4 overflow-y-auto space-y-3">
                {col.items.length === 0 ? (
                  <div className="text-center text-neutral-600 text-sm py-8 border border-dashed border-white/[0.05] rounded-xl">Aucune tâche</div>
                ) : (
                  col.items.map((item: { id: string, agent_name: string, created_at: string, task_description: string, model_used?: string }) => (
                    <div key={item.id} className="bg-white/[0.03] hover:bg-white/[0.05] border border-white/[0.05] rounded-xl p-4 cursor-grab active:cursor-grabbing transition-all duration-200 hover:-translate-y-0.5 group">
                      <div className="flex justify-between items-start mb-2">
                        <span className={`text-[10px] font-bold uppercase px-1.5 py-0.5 rounded-md border backdrop-blur-sm ${
                          item.agent_name.toLowerCase() === 'dev' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' :
                          item.agent_name.toLowerCase() === 'sacha' ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' :
                          'bg-purple-500/20 text-purple-400 border-purple-500/30'
                        }`}>
                          {item.agent_name}
                        </span>
                        <span className="text-[10px] text-neutral-500 font-mono">
                          {new Date(item.created_at).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      <p className="text-sm text-neutral-200 leading-snug line-clamp-3 mb-3 group-hover:text-white transition-colors">{item.task_description}</p>
                      
                      {item.model_used && (
                        <div className="flex justify-end">
                           <span className="text-[9px] text-neutral-500 font-mono border border-white/[0.05] px-1.5 py-0.5 rounded bg-black/50 group-hover:border-white/[0.1] transition-colors">{item.model_used}</span>
                        </div>
                      )}
                    </div>
                  ))
                )}
             </div>
           </div>
         ))}
       </div>
    </div>
  )
}
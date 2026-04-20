import { useAgentLogs } from '../hooks/useAgentLogs'
import { AgentCard } from '../components/Agents/AgentCard'

export function AgentsPage() {
  const { logs, isLoading, error } = useAgentLogs()

  if (isLoading) return (
    <div className="p-8 space-y-8 animate-pulse">
      <div>
        <div className="h-8 w-48 bg-slate-800 rounded mb-6"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map(i => <div key={i} className="h-48 bg-slate-800 rounded-xl"></div>)}
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 h-96 bg-slate-800 rounded-xl"></div>
        <div className="space-y-6">
          <div className="h-48 bg-slate-800 rounded-xl"></div>
          <div className="h-48 bg-slate-800 rounded-xl"></div>
        </div>
      </div>
    </div>
  )
  if (error) return <div className="p-8 text-red-400 bg-red-900/20 rounded-xl border border-red-900/50">Erreur : {error}</div>

  const today = new Date().toISOString().split('T')[0]
  const weekAgo = new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000).toISOString()

  const todayLogs = logs.filter(l => l.created_at.startsWith(today))
  const weekLogs = logs.filter(l => l.created_at >= weekAgo)
  
  const sachaLogs = logs.filter(l => l.agent_name.toLowerCase() === 'sacha')
  const edithLogs = logs.filter(l => l.agent_name.toLowerCase() === 'edith')
  const devLogs = logs.filter(l => l.agent_name.toLowerCase() === 'dev')

  const activeAgent = [
    { name: 'Sacha', count: sachaLogs.length },
    { name: 'Edith', count: edithLogs.length },
    { name: 'Dev', count: devLogs.length }
  ].sort((a, b) => b.count - a.count)[0]

  const successRate = logs.length > 0 
    ? Math.round((logs.filter(l => l.status === 'completed').length / logs.length) * 100) 
    : 0

  const modelUsage: Record<string, number> = {}
  todayLogs.forEach(l => {
    const key = `${l.agent_name} - ${l.model_used}`
    modelUsage[key] = (modelUsage[key] || 0) + 1
  })

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight text-neutral-100 mb-8">Équipe d'Agents</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <AgentCard name="Sacha" role="Analyste de Recherche" color="#3B82F6" logs={logs} />
          <AgentCard name="Edith" role="Rédactrice & Stratège" color="#7C3AED" logs={logs} />
          <AgentCard name="Dev" role="Développeur Full Stack" color="#10B981" logs={logs} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white/[0.02] backdrop-blur-2xl border border-white/[0.05] rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 hover:bg-white/[0.03]">
          <div className="p-6 border-b border-white/[0.05] bg-[#050505]/50">
            <h3 className="text-sm font-medium uppercase tracking-wide text-neutral-500">Flux d'Activité Récente</h3>
          </div>
          <div className="divide-y divide-white/[0.02] max-h-96 overflow-y-auto p-4">
            {logs.slice(0, 50).map(log => (
              <div key={log.id} className="py-4 flex gap-4 items-start group">
                <div className={`w-2 h-2 mt-2 rounded-full flex-shrink-0 transition-all ${log.status === 'completed' ? 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.4)]' : 'bg-red-400 shadow-[0_0_8px_rgba(248,113,113,0.4)]'}`} />
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`px-2.5 py-1 rounded-md text-[10px] font-semibold uppercase tracking-wider text-white ${
                      log.agent_name.toLowerCase() === 'sacha' ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' : 
                      log.agent_name.toLowerCase() === 'edith' ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    }`}>
                      {log.agent_name}
                    </span>
                    <span className="text-xs font-mono text-neutral-600">{new Date(log.created_at).toLocaleString('fr-FR')}</span>
                    <span className="text-[10px] font-mono text-neutral-500 ml-auto bg-white/[0.03] border border-white/[0.05] px-2 py-1 rounded-md group-hover:bg-white/[0.05] transition-colors">{log.model_used}</span>
                  </div>
                  <p className="text-sm text-neutral-300 leading-relaxed">{log.task_description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white/[0.02] backdrop-blur-2xl border border-white/[0.05] rounded-2xl shadow-2xl p-6 transition-all duration-300 hover:bg-white/[0.03]">
            <h3 className="text-sm font-medium uppercase tracking-wide text-neutral-500 mb-6">Statistiques Globales</h3>
            <dl className="grid grid-cols-2 gap-4">
              <div className="bg-[#030303]/50 p-5 rounded-xl border border-white/[0.03] backdrop-blur-sm transition-colors hover:bg-white/[0.02]">
                <dt className="text-xs font-medium uppercase tracking-wide text-neutral-600">Tâches (Jour)</dt>
                <dd className="mt-2 text-2xl font-light tracking-tight text-neutral-200">{todayLogs.length}</dd>
              </div>
              <div className="bg-[#030303]/50 p-5 rounded-xl border border-white/[0.03] backdrop-blur-sm transition-colors hover:bg-white/[0.02]">
                <dt className="text-xs font-medium uppercase tracking-wide text-neutral-600">Tâches (Semaine)</dt>
                <dd className="mt-2 text-2xl font-light tracking-tight text-neutral-200">{weekLogs.length}</dd>
              </div>
              <div className="bg-[#030303]/50 p-5 rounded-xl border border-white/[0.03] backdrop-blur-sm transition-colors hover:bg-white/[0.02]">
                <dt className="text-xs font-medium uppercase tracking-wide text-neutral-600">Agent Plus Actif</dt>
                <dd className="mt-2 text-xl font-medium tracking-tight text-neutral-300">{activeAgent?.name || 'N/A'}</dd>
              </div>
              <div className="bg-[#030303]/50 p-5 rounded-xl border border-white/[0.03] backdrop-blur-sm transition-colors hover:bg-white/[0.02]">
                <dt className="text-xs font-medium uppercase tracking-wide text-neutral-600">Taux Réussite</dt>
                <dd className="mt-2 text-xl font-medium tracking-tight text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.3)]">{successRate}%</dd>
              </div>
            </dl>
          </div>

          <div className="bg-white/[0.02] backdrop-blur-2xl border border-white/[0.05] rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 hover:bg-white/[0.03]">
            <div className="p-6 border-b border-white/[0.05] bg-[#050505]/50">
              <h3 className="text-sm font-medium uppercase tracking-wide text-neutral-500">Utilisation Modèles</h3>
            </div>
            <ul className="divide-y divide-white/[0.02] px-6">
              {Object.entries(modelUsage).map(([key, count]) => {
                const [agent, model] = key.split(' - ')
                return (
                  <li key={key} className="py-4 flex justify-between items-center group">
                    <div className="flex items-center gap-3">
                      <span className="font-medium text-neutral-300 text-sm">{agent}</span>
                      <span className="text-neutral-500 text-xs font-mono truncate max-w-[150px] group-hover:text-neutral-400 transition-colors" title={model}>{model}</span>
                    </div>
                    <span className="text-xs font-semibold text-neutral-300 bg-white/[0.05] px-2.5 py-1 rounded-md border border-white/[0.05]">{count}</span>
                  </li>
                )
              })}
              {Object.keys(modelUsage).length === 0 && (
                <li className="py-6 text-center text-sm text-neutral-600">Aucune donnée aujourd'hui</li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

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
        <h2 className="text-2xl font-bold leading-tight text-slate-100 mb-6">Équipe d'Agents</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <AgentCard name="Sacha" role="Analyste de Recherche" color="#3B82F6" logs={logs} />
          <AgentCard name="Edith" role="Rédactrice & Stratège" color="#7C3AED" logs={logs} />
          <AgentCard name="Dev" role="Développeur Full Stack" color="#10B981" logs={logs} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-slate-900 rounded-xl shadow-xl border border-slate-800 overflow-hidden">
          <div className="p-6 border-b border-slate-800">
            <h3 className="text-lg font-medium text-slate-200">Flux d'Activité Récente (50 derniers)</h3>
          </div>
          <div className="divide-y divide-slate-800 max-h-96 overflow-y-auto p-4">
            {logs.slice(0, 50).map(log => (
              <div key={log.id} className="py-4 flex gap-4 items-start">
                <div className={`w-2 h-2 mt-2 rounded-full flex-shrink-0 ${log.status === 'completed' ? 'bg-green-500' : 'bg-red-500'}`} />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`px-2 py-0.5 rounded text-xs font-medium text-white ${
                      log.agent_name.toLowerCase() === 'sacha' ? 'bg-blue-500' : 
                      log.agent_name.toLowerCase() === 'edith' ? 'bg-purple-500' : 'bg-emerald-500'
                    }`}>
                      {log.agent_name}
                    </span>
                    <span className="text-xs text-slate-400">{new Date(log.created_at).toLocaleString('fr-FR')}</span>
                    <span className="text-xs text-slate-500 ml-auto bg-slate-100 px-2 py-1 rounded">{log.model_used}</span>
                  </div>
                  <p className="text-sm text-slate-300">{log.task_description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-900 rounded-xl shadow-xl border border-slate-800 p-6">
            <h3 className="text-lg font-medium text-slate-200 mb-4">Statistiques Globales</h3>
            <dl className="grid grid-cols-2 gap-4">
              <div className="bg-[#0f111a] p-4 rounded-lg border border-slate-800/50">
                <dt className="text-sm font-medium text-slate-500">Tâches (Jour)</dt>
                <dd className="mt-1 text-2xl font-semibold text-indigo-400">{todayLogs.length}</dd>
              </div>
              <div className="bg-[#0f111a] p-4 rounded-lg border border-slate-800/50">
                <dt className="text-sm font-medium text-slate-500">Tâches (Semaine)</dt>
                <dd className="mt-1 text-2xl font-semibold text-indigo-400">{weekLogs.length}</dd>
              </div>
              <div className="bg-[#0f111a] p-4 rounded-lg border border-slate-800/50">
                <dt className="text-sm font-medium text-slate-500">Agent Plus Actif</dt>
                <dd className="mt-1 text-xl font-semibold text-slate-200">{activeAgent?.name || 'N/A'}</dd>
              </div>
              <div className="bg-[#0f111a] p-4 rounded-lg border border-slate-800/50">
                <dt className="text-sm font-medium text-slate-500">Taux Réussite</dt>
                <dd className="mt-1 text-xl font-semibold text-emerald-400">{successRate}%</dd>
              </div>
            </dl>
          </div>

          <div className="bg-slate-900 rounded-xl shadow-xl border border-slate-800 overflow-hidden">
            <div className="p-6 border-b border-slate-800">
              <h3 className="text-lg font-medium text-slate-200">Utilisation Modèles (Aujourd'hui)</h3>
            </div>
            <ul className="divide-y divide-slate-800 px-6">
              {Object.entries(modelUsage).map(([key, count]) => {
                const [agent, model] = key.split(' - ')
                return (
                  <li key={key} className="py-3 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-slate-300 text-sm">{agent}</span>
                      <span className="text-slate-500 text-sm truncate max-w-[150px]" title={model}>{model}</span>
                    </div>
                    <span className="font-semibold text-indigo-400 bg-indigo-500/10 px-2 py-1 rounded border border-indigo-500/20">{count}</span>
                  </li>
                )
              })}
              {Object.keys(modelUsage).length === 0 && (
                <li className="py-4 text-center text-sm text-slate-500">Aucune donnée aujourd'hui</li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

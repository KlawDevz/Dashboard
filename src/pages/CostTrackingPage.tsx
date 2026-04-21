import { DollarSign, Clock, Zap, Target } from 'lucide-react'

export function CostTrackingPage() {
  return (
    <div className="space-y-8 h-full flex flex-col">
       <div className="flex items-center justify-between">
         <h2 className="text-2xl font-semibold tracking-tight text-neutral-100 flex items-center gap-3">
           <DollarSign className="w-6 h-6 text-emerald-500" />
           Cost Tracking & Metrics
         </h2>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
         {/* KPI 1 */}
         <div className="bg-white/[0.02] backdrop-blur-2xl border border-white/[0.05] rounded-2xl p-6 shadow-2xl relative overflow-hidden group transition-all duration-300 hover:bg-white/[0.04] hover:-translate-y-1">
           <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-bl-full -mr-4 -mt-4 transition-transform duration-500 group-hover:scale-110"></div>
           <div className="flex justify-between items-start mb-4 relative">
             <div className="p-2.5 bg-white/[0.03] backdrop-blur-md rounded-xl border border-white/[0.05] group-hover:border-emerald-500/30 transition-colors">
               <DollarSign className="w-5 h-5 text-neutral-400 group-hover:text-emerald-400 transition-colors" />
             </div>
           </div>
           <div>
             <h3 className="text-neutral-500 text-xs font-medium tracking-wide uppercase">Coût LiteLLM (Jour)</h3>
             <div className="flex items-baseline gap-2 mt-2">
               <p className="text-3xl font-light tracking-tight text-neutral-200">$0.45</p>
               <p className="text-emerald-400/90 text-xs font-medium bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20 shadow-[0_0_10px_rgba(52,211,153,0.1)]">-12%</p>
             </div>
           </div>
         </div>

         {/* KPI 2 */}
         <div className="bg-white/[0.02] backdrop-blur-2xl border border-white/[0.05] rounded-2xl p-6 shadow-2xl relative overflow-hidden group transition-all duration-300 hover:bg-white/[0.04] hover:-translate-y-1">
           <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-bl-full -mr-4 -mt-4 transition-transform duration-500 group-hover:scale-110"></div>
           <div className="flex justify-between items-start mb-4 relative">
             <div className="p-2.5 bg-white/[0.03] backdrop-blur-md rounded-xl border border-white/[0.05] group-hover:border-blue-500/30 transition-colors">
               <Zap className="w-5 h-5 text-neutral-400 group-hover:text-blue-400 transition-colors" />
             </div>
           </div>
           <div>
             <h3 className="text-neutral-500 text-xs font-medium tracking-wide uppercase">Latence Moyenne (Sacha)</h3>
             <div className="flex items-baseline gap-2 mt-2">
               <p className="text-3xl font-light tracking-tight text-neutral-200">1.2s</p>
               <p className="text-emerald-400/90 text-xs font-medium bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20 shadow-[0_0_10px_rgba(52,211,153,0.1)]">rapide</p>
             </div>
           </div>
         </div>

         {/* KPI 3 */}
         <div className="bg-white/[0.02] backdrop-blur-2xl border border-white/[0.05] rounded-2xl p-6 shadow-2xl relative overflow-hidden group transition-all duration-300 hover:bg-white/[0.04] hover:-translate-y-1">
           <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 rounded-bl-full -mr-4 -mt-4 transition-transform duration-500 group-hover:scale-110"></div>
           <div className="flex justify-between items-start mb-4 relative">
             <div className="p-2.5 bg-white/[0.03] backdrop-blur-md rounded-xl border border-white/[0.05] group-hover:border-indigo-500/30 transition-colors">
               <Clock className="w-5 h-5 text-neutral-400 group-hover:text-indigo-400 transition-colors" />
             </div>
           </div>
           <div>
             <h3 className="text-neutral-500 text-xs font-medium tracking-wide uppercase">Temps d'exécution (Dev)</h3>
             <div className="flex items-baseline gap-2 mt-2">
               <p className="text-3xl font-light tracking-tight text-neutral-200">35s</p>
               <p className="text-yellow-400/90 text-xs font-medium bg-yellow-500/10 px-2 py-0.5 rounded-full border border-yellow-500/20 shadow-[0_0_10px_rgba(250,204,21,0.1)]">moyen</p>
             </div>
           </div>
         </div>

         {/* KPI 4 */}
         <div className="bg-white/[0.02] backdrop-blur-2xl border border-white/[0.05] rounded-2xl p-6 shadow-2xl relative overflow-hidden group transition-all duration-300 hover:bg-white/[0.04] hover:-translate-y-1">
           <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/5 rounded-bl-full -mr-4 -mt-4 transition-transform duration-500 group-hover:scale-110"></div>
           <div className="flex justify-between items-start mb-4 relative">
             <div className="p-2.5 bg-white/[0.03] backdrop-blur-md rounded-xl border border-white/[0.05] group-hover:border-purple-500/30 transition-colors">
               <Target className="w-5 h-5 text-neutral-400 group-hover:text-purple-400 transition-colors" />
             </div>
           </div>
           <div>
             <h3 className="text-neutral-500 text-xs font-medium tracking-wide uppercase">Token Efficiency (Yield)</h3>
             <div className="flex items-baseline gap-2 mt-2">
               <p className="text-3xl font-light tracking-tight text-neutral-200">92%</p>
               <p className="text-emerald-400/90 text-xs font-medium bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20 shadow-[0_0_10px_rgba(52,211,153,0.1)]">Excellent</p>
             </div>
           </div>
         </div>
       </div>

       {/* Charts / Tables Placeholder */}
       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1">
         <div className="bg-[#050505]/80 backdrop-blur-2xl border border-white/[0.05] rounded-2xl shadow-2xl p-6 min-h-[400px] flex flex-col">
            <h3 className="text-sm font-medium uppercase tracking-wide text-neutral-500 mb-6">Répartition Coûts par Agent</h3>
            <div className="flex-1 flex flex-col justify-center items-center text-neutral-600 gap-4">
              <div className="w-32 h-32 rounded-full border-[12px] border-emerald-500/20 flex items-center justify-center relative">
                 <div className="absolute inset-0 rounded-full border-[12px] border-emerald-500/80 shadow-[0_0_20px_rgba(16,185,129,0.3)]" style={{ clipPath: 'polygon(50% 50%, 50% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 50%)' }}></div>
                 <div className="absolute inset-0 rounded-full border-[12px] border-blue-500/80 shadow-[0_0_20px_rgba(59,130,246,0.3)]" style={{ clipPath: 'polygon(50% 50%, 0% 50%, 0% 0%, 50% 0%)' }}></div>
              </div>
              <div className="flex gap-4 text-xs font-mono mt-4">
                 <div className="flex items-center gap-2"><div className="w-3 h-3 bg-emerald-500 rounded-sm"></div>Dev (65%)</div>
                 <div className="flex items-center gap-2"><div className="w-3 h-3 bg-blue-500 rounded-sm"></div>Sacha (25%)</div>
                 <div className="flex items-center gap-2"><div className="w-3 h-3 bg-neutral-700 rounded-sm"></div>Edith (10%)</div>
              </div>
            </div>
         </div>

         <div className="bg-white/[0.02] backdrop-blur-2xl border border-white/[0.05] rounded-2xl shadow-2xl p-6 overflow-hidden">
            <h3 className="text-sm font-medium uppercase tracking-wide text-neutral-500 mb-6">Consommation Récente (Top 5 Tâches)</h3>
            <div className="space-y-4">
              {[
                { task: 'Refactor Dashboard UI', agent: 'Dev', model: 'gemini-3.1-pro', cost: '$0.12', tokens: '45k' },
                { task: 'OSINT on AgentOps', agent: 'Sacha', model: 'gemini-3.1-flash', cost: '$0.04', tokens: '22k' },
                { task: 'Supabase API Integration', agent: 'Dev', model: 'gemini-3.1-pro', cost: '$0.09', tokens: '38k' },
                { task: 'Daily Summary', agent: 'Edith', model: 'gemini-3.1-flash', cost: '$0.01', tokens: '5k' },
                { task: 'Debug TaskFlow Node', agent: 'Dev', model: 'deepseek-r1', cost: '$0.08', tokens: '29k' }
              ].map((t, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/[0.03] hover:bg-white/[0.04] transition-colors group">
                  <div>
                    <div className="text-sm text-neutral-300 font-medium group-hover:text-white transition-colors">{t.task}</div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`text-[10px] font-bold uppercase px-1.5 py-0.5 rounded-md ${
                        t.agent === 'Dev' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                        t.agent === 'Sacha' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' :
                        'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                      }`}>{t.agent}</span>
                      <span className="text-[10px] text-neutral-500 font-mono">{t.model}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-neutral-200 font-mono">{t.cost}</div>
                    <div className="text-[10px] text-neutral-500">{t.tokens} tokens</div>
                  </div>
                </div>
              ))}
            </div>
         </div>
       </div>
    </div>
  )
}
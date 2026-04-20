import { Server, Activity, Database, MessageSquare } from 'lucide-react'

export function InfraPage() {
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-semibold tracking-tight text-neutral-100 mb-8 flex items-center gap-3">
        <Server className="w-5 h-5 text-neutral-500" />
        Infrastructure & Services
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* VPS */}
        <div className="bg-white/[0.02] backdrop-blur-2xl border border-white/[0.05] rounded-2xl p-6 shadow-2xl relative overflow-hidden group transition-all duration-300 hover:bg-white/[0.04] hover:-translate-y-1">
          <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-bl-full -mr-4 -mt-4 transition-transform duration-500 group-hover:scale-110"></div>
          <div className="flex justify-between items-start mb-6 relative">
            <div className="flex items-center gap-4">
              <div className="p-2.5 bg-white/[0.03] backdrop-blur-md rounded-xl border border-white/[0.05] group-hover:border-blue-500/30 transition-colors">
                <Server className="w-5 h-5 text-neutral-400 group-hover:text-blue-400 transition-colors" />
              </div>
              <div>
                <h3 className="text-neutral-200 font-medium tracking-tight">VPS Hostinger</h3>
                <p className="text-neutral-500 text-xs font-mono mt-1">srv1582495.hstgr.cloud</p>
              </div>
            </div>
            <span className="flex items-center gap-2 bg-emerald-500/10 backdrop-blur-md text-emerald-400 px-3 py-1 rounded-full text-xs font-medium border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]"></span>
              En Ligne
            </span>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-6 border-t border-white/[0.05] pt-5">
            <div>
              <p className="text-neutral-600 text-xs uppercase tracking-wider font-medium">OS</p>
              <p className="text-neutral-300 text-sm mt-1.5">Ubuntu 22.04 LTS</p>
            </div>
            <div>
              <p className="text-neutral-600 text-xs uppercase tracking-wider font-medium">Localisation</p>
              <p className="text-neutral-300 text-sm mt-1.5">Europe (France)</p>
            </div>
          </div>
        </div>

        {/* OpenClaw */}
        <div className="bg-white/[0.02] backdrop-blur-2xl border border-white/[0.05] rounded-2xl p-6 shadow-2xl relative overflow-hidden group transition-all duration-300 hover:bg-white/[0.04] hover:-translate-y-1">
          <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 rounded-bl-full -mr-4 -mt-4 transition-transform duration-500 group-hover:scale-110"></div>
          <div className="flex justify-between items-start mb-6 relative">
            <div className="flex items-center gap-4">
              <div className="p-2.5 bg-white/[0.03] backdrop-blur-md rounded-xl border border-white/[0.05] group-hover:border-indigo-500/30 transition-colors">
                <Activity className="w-5 h-5 text-neutral-400 group-hover:text-indigo-400 transition-colors" />
              </div>
              <div>
                <h3 className="text-neutral-200 font-medium tracking-tight">OpenClaw</h3>
                <p className="text-neutral-500 text-xs mt-1">Agent OS / Core</p>
              </div>
            </div>
            <span className="flex items-center gap-2 bg-indigo-500/10 backdrop-blur-md text-indigo-400 px-3 py-1 rounded-full text-xs font-medium border border-indigo-500/20 shadow-[0_0_15px_rgba(99,102,241,0.1)]">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse shadow-[0_0_8px_rgba(129,140,248,0.8)]"></span>
              En cours
            </span>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-6 border-t border-white/[0.05] pt-5">
            <div>
              <p className="text-neutral-600 text-xs uppercase tracking-wider font-medium">Agents Actifs</p>
              <p className="text-neutral-300 text-sm mt-1.5">Edith, Sacha, Dev</p>
            </div>
            <div>
              <p className="text-neutral-600 text-xs uppercase tracking-wider font-medium">Runtime</p>
              <p className="text-neutral-300 text-sm mt-1.5">Node.js</p>
            </div>
          </div>
        </div>

        {/* LiteLLM */}
        <div className="bg-white/[0.02] backdrop-blur-2xl border border-white/[0.05] rounded-2xl p-6 shadow-2xl relative overflow-hidden group transition-all duration-300 hover:bg-white/[0.04] hover:-translate-y-1">
          <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/5 rounded-bl-full -mr-4 -mt-4 transition-transform duration-500 group-hover:scale-110"></div>
          <div className="flex justify-between items-start mb-6 relative">
            <div className="flex items-center gap-4">
              <div className="p-2.5 bg-white/[0.03] backdrop-blur-md rounded-xl border border-white/[0.05] group-hover:border-purple-500/30 transition-colors">
                <Database className="w-5 h-5 text-neutral-400 group-hover:text-purple-400 transition-colors" />
              </div>
              <div>
                <h3 className="text-neutral-200 font-medium tracking-tight">LiteLLM Proxy</h3>
                <p className="text-neutral-500 text-xs font-mono mt-1">http://litellm:4000</p>
              </div>
            </div>
            <span className="flex items-center gap-2 bg-emerald-500/10 backdrop-blur-md text-emerald-400 px-3 py-1 rounded-full text-xs font-medium border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]"></span>
              Connecté
            </span>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-6 border-t border-white/[0.05] pt-5">
            <div>
              <p className="text-neutral-600 text-xs uppercase tracking-wider font-medium">Provider Principal</p>
              <p className="text-neutral-300 text-sm mt-1.5">Vertex AI (GCP)</p>
            </div>
            <div>
              <p className="text-neutral-600 text-xs uppercase tracking-wider font-medium">Modèles Dispos</p>
              <p className="text-neutral-300 text-sm mt-1.5">50+</p>
            </div>
          </div>
        </div>

        {/* Telegram Bot */}
        <div className="bg-white/[0.02] backdrop-blur-2xl border border-white/[0.05] rounded-2xl p-6 shadow-2xl relative overflow-hidden group transition-all duration-300 hover:bg-white/[0.04] hover:-translate-y-1">
          <div className="absolute top-0 right-0 w-24 h-24 bg-sky-500/5 rounded-bl-full -mr-4 -mt-4 transition-transform duration-500 group-hover:scale-110"></div>
          <div className="flex justify-between items-start mb-6 relative">
            <div className="flex items-center gap-4">
              <div className="p-2.5 bg-white/[0.03] backdrop-blur-md rounded-xl border border-white/[0.05] group-hover:border-sky-500/30 transition-colors">
                <MessageSquare className="w-5 h-5 text-neutral-400 group-hover:text-sky-400 transition-colors" />
              </div>
              <div>
                <h3 className="text-neutral-200 font-medium tracking-tight">Telegram Bot</h3>
                <p className="text-neutral-500 text-xs mt-1">Interface Utilisateur</p>
              </div>
            </div>
            <span className="flex items-center gap-2 bg-emerald-500/10 backdrop-blur-md text-emerald-400 px-3 py-1 rounded-full text-xs font-medium border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]"></span>
              Actif
            </span>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-6 border-t border-white/[0.05] pt-5">
            <div>
              <p className="text-neutral-600 text-xs uppercase tracking-wider font-medium">Handle</p>
              <p className="text-neutral-300 text-sm mt-1.5 font-mono">@KlawEdith_bot</p>
            </div>
            <div>
              <p className="text-neutral-600 text-xs uppercase tracking-wider font-medium">Utilisateur Principal</p>
              <p className="text-neutral-300 text-sm mt-1.5">Kram</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
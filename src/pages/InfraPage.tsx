import { Server, Activity, Database, MessageSquare } from 'lucide-react'

export function InfraPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-slate-200 mb-6 flex items-center gap-2">
        <Server className="w-5 h-5 text-indigo-400" />
        Infrastructure & Services
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* VPS */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
          <div className="flex justify-between items-start mb-4 relative">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <Server className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <h3 className="text-slate-200 font-medium">VPS Hostinger</h3>
                <p className="text-slate-500 text-sm font-mono mt-0.5">srv1582495.hstgr.cloud</p>
              </div>
            </div>
            <span className="flex items-center gap-1.5 bg-emerald-500/10 text-emerald-400 px-2.5 py-1 rounded-full text-xs font-medium border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              En Ligne
            </span>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-6 border-t border-slate-800/50 pt-4">
            <div>
              <p className="text-slate-500 text-xs">OS</p>
              <p className="text-slate-300 text-sm mt-1">Ubuntu 22.04 LTS</p>
            </div>
            <div>
              <p className="text-slate-500 text-xs">Localisation</p>
              <p className="text-slate-300 text-sm mt-1">Europe (France)</p>
            </div>
          </div>
        </div>

        {/* OpenClaw */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/10 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
          <div className="flex justify-between items-start mb-4 relative">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-500/20 rounded-lg">
                <Activity className="w-6 h-6 text-indigo-400" />
              </div>
              <div>
                <h3 className="text-slate-200 font-medium">OpenClaw</h3>
                <p className="text-slate-500 text-sm mt-0.5">Agent OS / Core</p>
              </div>
            </div>
            <span className="flex items-center gap-1.5 bg-indigo-500/10 text-indigo-400 px-2.5 py-1 rounded-full text-xs font-medium border border-indigo-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse"></span>
              En cours
            </span>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-6 border-t border-slate-800/50 pt-4">
            <div>
              <p className="text-slate-500 text-xs">Agents Actifs</p>
              <p className="text-slate-300 text-sm mt-1">Edith, Sacha, Dev</p>
            </div>
            <div>
              <p className="text-slate-500 text-xs">Runtime</p>
              <p className="text-slate-300 text-sm mt-1">Node.js</p>
            </div>
          </div>
        </div>

        {/* LiteLLM */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/10 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
          <div className="flex justify-between items-start mb-4 relative">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-500/20 rounded-lg">
                <Database className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <h3 className="text-slate-200 font-medium">LiteLLM Proxy</h3>
                <p className="text-slate-500 text-sm font-mono mt-0.5">http://litellm:4000</p>
              </div>
            </div>
            <span className="flex items-center gap-1.5 bg-emerald-500/10 text-emerald-400 px-2.5 py-1 rounded-full text-xs font-medium border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              Connecté
            </span>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-6 border-t border-slate-800/50 pt-4">
            <div>
              <p className="text-slate-500 text-xs">Provider Principal</p>
              <p className="text-slate-300 text-sm mt-1">Vertex AI (GCP)</p>
            </div>
            <div>
              <p className="text-slate-500 text-xs">Modèles Disponibles</p>
              <p className="text-slate-300 text-sm mt-1">50+</p>
            </div>
          </div>
        </div>

        {/* Telegram Bot */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-sky-500/10 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
          <div className="flex justify-between items-start mb-4 relative">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-sky-500/20 rounded-lg">
                <MessageSquare className="w-6 h-6 text-sky-400" />
              </div>
              <div>
                <h3 className="text-slate-200 font-medium">Telegram Bot</h3>
                <p className="text-slate-500 text-sm mt-0.5">Interface Utilisateur</p>
              </div>
            </div>
            <span className="flex items-center gap-1.5 bg-emerald-500/10 text-emerald-400 px-2.5 py-1 rounded-full text-xs font-medium border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              Actif
            </span>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-6 border-t border-slate-800/50 pt-4">
            <div>
              <p className="text-slate-500 text-xs">Handle</p>
              <p className="text-slate-300 text-sm mt-1 font-mono">@KlawEdith_bot</p>
            </div>
            <div>
              <p className="text-slate-500 text-xs">Utilisateur Principal</p>
              <p className="text-slate-300 text-sm mt-1">Kram</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
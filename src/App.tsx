import { LayoutDashboard, Settings, Bell, Search, LogOut, Menu, X, Users, TerminalSquare, DollarSign, ListTodo } from 'lucide-react'
import { useState } from 'react'
import { AgentsPage } from './pages/AgentsPage'
import { OverviewPage } from './pages/OverviewPage'
import { InfraPage } from './pages/InfraPage'
import { GodModePage } from './pages/GodModePage'
import { CostTrackingPage } from './pages/CostTrackingPage'
import { TasksPage } from './pages/TasksPage'

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState<'dashboard' | 'agents' | 'infra' | 'godmode' | 'costs' | 'tasks'>('dashboard')
  
  // Dashboard logic preserved
  // const { logs, isLoading, error } = useAgentLogs()
  // const [filter, setFilter] = useState('all')

  // const filteredLogs = logs.filter(log => {
  //   if (filter === 'all') return true
  //   if (filter === 'completed') return log.status === 'completed'
  //   if (filter === 'failed') return log.status === 'failed'
  //   return log.agent_name.toLowerCase() === filter.toLowerCase()
  // })

  return (
    <div className="min-h-screen bg-[#030303] flex text-neutral-200 font-sans">
      {/* Sidebar - Mobile */}
      <div className={`fixed inset-0 z-40 lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`}>
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
        <div className="fixed inset-y-0 left-0 w-64 bg-[#0a0a0a] border-r border-white/[0.05] p-4 transform transition-transform duration-300">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-xl font-medium tracking-tight text-white flex items-center gap-2">
              <LayoutDashboard className="w-5 h-5 text-neutral-400" />
              Klaw Logs
            </h1>
            <button onClick={() => setSidebarOpen(false)} className="text-neutral-500 hover:text-white transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
          <nav className="space-y-1">
            <button onClick={() => { setCurrentPage('dashboard'); setSidebarOpen(false) }} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300 ${currentPage === 'dashboard' ? 'text-white bg-white/[0.04] border border-white/[0.05]' : 'text-neutral-500 hover:text-neutral-300 hover:bg-white/[0.02]'}`}>
              <LayoutDashboard className="w-4 h-4" />
              <span className="text-sm font-medium">Vue Générale</span>
            </button>
            <button onClick={() => { setCurrentPage('tasks'); setSidebarOpen(false) }} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300 ${currentPage === 'tasks' ? 'text-white bg-white/[0.04] border border-white/[0.05]' : 'text-neutral-500 hover:text-neutral-300 hover:bg-white/[0.02]'}`}>
              <ListTodo className="w-4 h-4" />
              <span className="text-sm font-medium">Tâches</span>
            </button>
            <button onClick={() => { setCurrentPage('agents'); setSidebarOpen(false) }} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300 ${currentPage === 'agents' ? 'text-white bg-white/[0.04] border border-white/[0.05]' : 'text-neutral-500 hover:text-neutral-300 hover:bg-white/[0.02]'}`}>
              <Users className="w-4 h-4" />
              <span className="text-sm font-medium">Équipe d'Agents</span>
            </button>
            <button onClick={() => { setCurrentPage('costs'); setSidebarOpen(false) }} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300 ${currentPage === 'costs' ? 'text-white bg-white/[0.04] border border-white/[0.05]' : 'text-neutral-500 hover:text-neutral-300 hover:bg-white/[0.02]'}`}>
              <DollarSign className="w-4 h-4" />
              <span className="text-sm font-medium">Cost Tracking</span>
            </button>
            <button onClick={() => { setCurrentPage('godmode'); setSidebarOpen(false) }} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300 ${currentPage === 'godmode' ? 'text-white bg-white/[0.04] border border-white/[0.05]' : 'text-neutral-500 hover:text-neutral-300 hover:bg-white/[0.02]'}`}>
              <TerminalSquare className="w-4 h-4" />
              <span className="text-sm font-medium">God Mode</span>
            </button>
            <button onClick={() => { setCurrentPage('infra'); setSidebarOpen(false) }} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300 ${currentPage === 'infra' ? 'text-white bg-white/[0.04] border border-white/[0.05]' : 'text-neutral-500 hover:text-neutral-300 hover:bg-white/[0.02]'}`}>
              <Settings className="w-4 h-4" />
              <span className="text-sm font-medium">Infrastructure</span>
            </button>
          </nav>
        </div>
      </div>

      {/* Sidebar - Desktop */}
      <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0 bg-[#050505] border-r border-white/[0.02] z-20">
        <div className="flex-1 flex flex-col pt-8 pb-4 overflow-y-auto">
          <div className="flex items-center flex-shrink-0 px-6">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-neutral-800 to-neutral-900 border border-white/[0.05] flex items-center justify-center mr-3 shadow-lg">
               <LayoutDashboard className="w-4 h-4 text-neutral-300" />
            </div>
            <h1 className="text-lg font-semibold tracking-tight text-neutral-100">
              Klaw<span className="text-neutral-500 font-normal">Logs</span>
            </h1>
          </div>
          <nav className="mt-10 flex-1 px-4 space-y-1.5">
            <button onClick={() => setCurrentPage('dashboard')} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300 ${currentPage === 'dashboard' ? 'text-white bg-white/[0.04] border border-white/[0.05] shadow-sm' : 'text-neutral-500 hover:text-neutral-300 hover:bg-white/[0.02]'}`}>
              <LayoutDashboard className="w-4 h-4" />
              <span className="text-sm font-medium">Vue Générale</span>
            </button>
            <button onClick={() => setCurrentPage('tasks')} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300 ${currentPage === 'tasks' ? 'text-white bg-white/[0.04] border border-white/[0.05] shadow-sm' : 'text-neutral-500 hover:text-neutral-300 hover:bg-white/[0.02]'}`}>
              <ListTodo className="w-4 h-4" />
              <span className="text-sm font-medium">Tâches</span>
            </button>
            <button onClick={() => setCurrentPage('agents')} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300 ${currentPage === 'agents' ? 'text-white bg-white/[0.04] border border-white/[0.05] shadow-sm' : 'text-neutral-500 hover:text-neutral-300 hover:bg-white/[0.02]'}`}>
              <Users className="w-4 h-4" />
              <span className="text-sm font-medium">Équipe d'Agents</span>
            </button>
            <button onClick={() => setCurrentPage('costs')} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300 ${currentPage === 'costs' ? 'text-white bg-white/[0.04] border border-white/[0.05] shadow-sm' : 'text-neutral-500 hover:text-neutral-300 hover:bg-white/[0.02]'}`}>
              <DollarSign className="w-4 h-4" />
              <span className="text-sm font-medium">Cost Tracking</span>
            </button>
            <button onClick={() => setCurrentPage('godmode')} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300 ${currentPage === 'godmode' ? 'text-white bg-white/[0.04] border border-white/[0.05] shadow-sm' : 'text-neutral-500 hover:text-neutral-300 hover:bg-white/[0.02]'}`}>
              <TerminalSquare className="w-4 h-4" />
              <span className="text-sm font-medium">God Mode</span>
            </button>
            <button onClick={() => setCurrentPage('infra')} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300 ${currentPage === 'infra' ? 'text-white bg-white/[0.04] border border-white/[0.05] shadow-sm' : 'text-neutral-500 hover:text-neutral-300 hover:bg-white/[0.02]'}`}>
              <Settings className="w-4 h-4" />
              <span className="text-sm font-medium">Infrastructure</span>
            </button>
          </nav>
        </div>
        <div className="flex-shrink-0 flex border-t border-white/[0.02] p-4">
          <a href="#" className="flex-shrink-0 w-full group block px-2 py-2 rounded-xl transition-colors hover:bg-white/[0.02]">
            <div className="flex items-center">
              <div>
                <div className="w-8 h-8 rounded-full bg-neutral-900 border border-white/[0.05] flex items-center justify-center text-neutral-400 font-medium text-sm">
                  K
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-neutral-300 group-hover:text-white transition-colors">Kram</p>
              </div>
              <LogOut className="ml-auto w-4 h-4 text-neutral-600 group-hover:text-neutral-400 transition-colors" />
            </div>
          </a>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 lg:pl-64 flex flex-col min-w-0">
        <div className="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-[#030303]/80 backdrop-blur-xl border-b border-white/[0.02]">
          <button
            type="button"
            className="px-4 border-r border-white/[0.02] text-neutral-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-neutral-800 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <Menu className="h-5 w-5" aria-hidden="true" />
          </button>
          
          <div className="flex-1 px-4 flex justify-between sm:px-8 lg:max-w-7xl lg:mx-auto">
            <div className="flex-1 flex items-center">
              <div className="w-full flex md:ml-0 max-w-md">
                <label htmlFor="search-field" className="sr-only">
                  Search
                </label>
                <div className="relative w-full text-neutral-500 focus-within:text-neutral-300 transition-colors">
                  <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none pl-3">
                    <Search className="h-4 w-4" aria-hidden="true" />
                  </div>
                  <input
                    id="search-field"
                    className="block w-full h-9 pl-10 pr-3 py-2 bg-white/[0.02] border border-white/[0.05] rounded-xl text-neutral-200 placeholder-neutral-600 focus:outline-none focus:bg-white/[0.04] focus:border-white/[0.1] transition-all sm:text-sm"
                    placeholder="Rechercher..."
                    type="search"
                    name="search"
                  />
                </div>
              </div>
            </div>
            <div className="ml-4 flex items-center md:ml-6">
              <button className="bg-transparent p-1.5 rounded-full text-neutral-500 hover:text-neutral-300 hover:bg-white/[0.04] transition-all focus:outline-none">
                <span className="sr-only">View notifications</span>
                <Bell className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>

        <main className="flex-1 pb-12 pt-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-8">
            {currentPage === 'dashboard' && <OverviewPage />}
            {currentPage === 'agents' && <AgentsPage />}
            {currentPage === 'infra' && <InfraPage />}
            {currentPage === 'godmode' && <GodModePage />}
            {currentPage === 'costs' && <CostTrackingPage />}
            {currentPage === 'tasks' && <TasksPage />}
          </div>
        </main>
      </div>
    </div>
  )
}

export default App

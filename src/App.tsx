import { 
  LayoutDashboard, 
  Settings, 
  Bell, 
  Search,
  LogOut,
  Menu,
  X,
  Users
} from 'lucide-react'
import { useState } from 'react'
import { AgentsPage } from './pages/AgentsPage'
import { OverviewPage } from './pages/OverviewPage'
import { InfraPage } from './pages/InfraPage'

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState<'dashboard' | 'agents' | 'infra'>('dashboard')
  
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
    <div className="min-h-screen bg-[#0a0a0a] flex">
      {/* Sidebar - Mobile */}
      <div className={`fixed inset-0 z-40 lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`}>
        <div className="fixed inset-0 bg-slate-900/80" onClick={() => setSidebarOpen(false)} />
        <div className="fixed inset-y-0 left-0 w-64 bg-slate-900 p-4 transform transition-transform duration-300">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-xl font-bold text-white flex items-center gap-2">
              <LayoutDashboard className="w-6 h-6 text-indigo-400" />
              Klaw Logs
            </h1>
            <button onClick={() => setSidebarOpen(false)} className="text-slate-400 hover:text-white">
              <X className="w-6 h-6" />
            </button>
          </div>
          <nav className="space-y-2">
            <button onClick={() => { setCurrentPage('dashboard'); setSidebarOpen(false) }} className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg ${currentPage === 'dashboard' ? 'text-indigo-400 bg-slate-800/50' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'}`}>
              <LayoutDashboard className="w-5 h-5" />
              Vue Générale
            </button>
            <button onClick={() => { setCurrentPage('agents'); setSidebarOpen(false) }} className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg ${currentPage === 'agents' ? 'text-indigo-400 bg-slate-800/50' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'}`}>
              <Users className="w-5 h-5" />
              Équipe d'Agents
            </button>
            <button onClick={() => { setCurrentPage('infra'); setSidebarOpen(false) }} className={`w-full flex items-center gap-3 px-3 py-2 text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 rounded-lg ${currentPage === 'infra' ? 'text-indigo-400 bg-slate-800/50' : ''}`}>
              <Settings className="w-5 h-5" />
              Infrastructure
            </button>
          </nav>
        </div>
      </div>

      {/* Sidebar - Desktop */}
      <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0 bg-slate-900">
        <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
          <div className="flex items-center flex-shrink-0 px-4">
            <h1 className="text-xl font-bold text-white flex items-center gap-2">
              <LayoutDashboard className="w-6 h-6 text-indigo-400" />
              Klaw Logs
            </h1>
          </div>
          <nav className="mt-8 flex-1 px-4 space-y-2">
            <button onClick={() => setCurrentPage('dashboard')} className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg ${currentPage === 'dashboard' ? 'text-indigo-400 bg-slate-800/50' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'}`}>
              <LayoutDashboard className="w-5 h-5" />
              Vue Générale
            </button>
            <button onClick={() => setCurrentPage('agents')} className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg ${currentPage === 'agents' ? 'text-indigo-400 bg-slate-800/50' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'}`}>
              <Users className="w-5 h-5" />
              Équipe d'Agents
            </button>
            <button onClick={() => setCurrentPage('infra')} className={`w-full flex items-center gap-3 px-3 py-2 text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 rounded-lg ${currentPage === 'infra' ? 'text-indigo-400 bg-slate-800/50' : ''}`}>
              <Settings className="w-5 h-5" />
              Infrastructure
            </button>
          </nav>
        </div>
        <div className="flex-shrink-0 flex border-t border-slate-800 p-4">
          <a href="#" className="flex-shrink-0 w-full group block">
            <div className="flex items-center">
              <div>
                <div className="w-9 h-9 rounded-full bg-slate-700 flex items-center justify-center text-slate-300 font-bold">
                  K
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-white">Kram</p>
                <p className="text-xs font-medium text-slate-400 group-hover:text-slate-300">
                  View profile
                </p>
              </div>
              <LogOut className="ml-auto w-5 h-5 text-slate-500 group-hover:text-slate-300" />
            </div>
          </a>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 lg:pl-64 flex flex-col">
        <div className="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-slate-900 border-b border-slate-800">
          <button
            type="button"
            className="px-4 border-r border-slate-800 text-slate-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
          
          <div className="flex-1 px-4 flex justify-between sm:px-6 lg:max-w-7xl lg:mx-auto lg:px-8">
            <div className="flex-1 flex">
              <div className="w-full flex md:ml-0">
                <label htmlFor="search-field" className="sr-only">
                  Search
                </label>
                <div className="relative w-full text-slate-400 focus-within:text-slate-600">
                  <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none">
                    <Search className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <input
                    id="search-field"
                    className="block w-full h-full pl-8 pr-3 py-2 bg-transparent border-transparent text-slate-200 placeholder-slate-400 focus:outline-none focus:placeholder-slate-300 focus:ring-0 focus:border-transparent sm:text-sm"
                    placeholder="Search..."
                    type="search"
                    name="search"
                  />
                </div>
              </div>
            </div>
            <div className="ml-4 flex items-center md:ml-6">
              <button className="bg-slate-900 p-1 rounded-full text-slate-400 hover:text-slate-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-indigo-500">
                <span className="sr-only">View notifications</span>
                <Bell className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>

        <main className="flex-1 pb-8">
          <div className="mt-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {currentPage === 'dashboard' && <OverviewPage />}
            {currentPage === 'agents' && <AgentsPage />}
            {currentPage === 'infra' && <InfraPage />}
          </div>
        </main>
      </div>
    </div>
  )
}

export default App

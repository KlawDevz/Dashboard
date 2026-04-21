import { Terminal, Power, Database, Cpu } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'

type CommandHistory = {
  id: string
  cmd: string
  output: string
  type: 'success' | 'error' | 'info'
}

export function GodModePage() {
  const [input, setInput] = useState('')
  const [history, setHistory] = useState<CommandHistory[]>([
    { id: '0', cmd: 'whoami', output: 'root@klaw-os', type: 'info' },
    { id: '1', cmd: 'systemctl status agents', output: 'Active: active (running)', type: 'success' }
  ])
  const [toast, setToast] = useState<{ msg: string; visible: boolean }>({ msg: '', visible: false })
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [history])

  const showToast = (msg: string) => {
    setToast({ msg, visible: true })
    setTimeout(() => setToast({ msg: '', visible: false }), 3000)
  }

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const newCmd = input.trim()
    let output = 'Command not found.'
    let type: 'success' | 'error' | 'info' = 'error'

    if (newCmd.startsWith('@dev restart task') || newCmd === 'restart dev') {
      output = 'Restarting Dev agent task... OK'
      type = 'success'
    } else if (newCmd === 'clear' || newCmd === 'cls') {
      setHistory([])
      setInput('')
      return
    } else if (newCmd === 'ping') {
      output = 'PONG 1ms'
      type = 'success'
    } else if (newCmd.startsWith('@sacha')) {
      output = 'Sacha acknowledged command.'
      type = 'info'
    }

    setHistory([...history, { id: Date.now().toString(), cmd: newCmd, output, type }])
    setInput('')
  }

  return (
    <div className="space-y-8 h-full flex flex-col">
      <div className="flex items-center justify-between">
         <h2 className="text-2xl font-semibold tracking-tight text-neutral-100 flex items-center gap-3">
           <Terminal className="w-6 h-6 text-red-500" />
           God Mode
         </h2>
         <div className="flex gap-3">
            <button 
              onClick={() => showToast('All Agents force stopped!')}
              className="flex items-center gap-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 px-4 py-2 rounded-xl text-sm font-medium border border-red-500/20 transition-all duration-300 shadow-[0_0_15px_rgba(239,68,68,0.1)] hover:shadow-[0_0_20px_rgba(239,68,68,0.2)]"
            >
               <Power className="w-4 h-4" /> Force Stop All
            </button>
            <button 
              onClick={() => showToast('Supabase Cache cleared successfully!')}
              className="flex items-center gap-2 bg-orange-500/10 hover:bg-orange-500/20 text-orange-400 px-4 py-2 rounded-xl text-sm font-medium border border-orange-500/20 transition-all duration-300"
            >
               <Database className="w-4 h-4" /> Clear Cache
            </button>
            <button 
               onClick={() => showToast('LiteLLM ping: 42ms OK')}
               className="flex items-center gap-2 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 px-4 py-2 rounded-xl text-sm font-medium border border-indigo-500/20 transition-all duration-300"
            >
               <Cpu className="w-4 h-4" /> Ping LiteLLM
            </button>
         </div>
      </div>

      {/* Terminal Window */}
      <div className="flex-1 bg-black/90 backdrop-blur-2xl border border-white/[0.1] rounded-2xl shadow-2xl overflow-hidden flex flex-col min-h-[500px]">
        {/* Header */}
        <div className="bg-white/[0.05] border-b border-white/[0.1] p-3 flex items-center justify-between">
           <div className="flex gap-2">
             <div className="w-3 h-3 rounded-full bg-red-500/80 border border-red-500/50"></div>
             <div className="w-3 h-3 rounded-full bg-yellow-500/80 border border-yellow-500/50"></div>
             <div className="w-3 h-3 rounded-full bg-green-500/80 border border-green-500/50"></div>
           </div>
           <span className="text-neutral-500 text-xs font-mono uppercase tracking-widest font-bold">root@klaw-os ~ /god-mode</span>
           <div className="w-12"></div>
        </div>
        
        {/* Output */}
        <div className="flex-1 p-6 overflow-y-auto font-mono text-sm space-y-4 text-green-400">
           {history.map(h => (
             <div key={h.id} className="space-y-1">
               <div className="flex gap-2 text-neutral-300">
                 <span className="text-blue-400">root@klaw-os</span>
                 <span className="text-neutral-500">❯</span>
                 <span>{h.cmd}</span>
               </div>
               <div className={`pl-4 ${h.type === 'error' ? 'text-red-400' : h.type === 'info' ? 'text-blue-300' : 'text-green-400'}`}>
                 {h.output}
               </div>
             </div>
           ))}
           <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-white/[0.05] bg-black">
          <form onSubmit={handleCommand} className="flex gap-2 items-center">
             <span className="text-blue-400 font-mono text-sm">root@klaw-os</span>
             <span className="text-neutral-500 font-mono text-sm">❯</span>
             <input 
               type="text" 
               value={input}
               onChange={e => setInput(e.target.value)}
               className="flex-1 bg-transparent border-none outline-none text-green-400 font-mono text-sm placeholder-neutral-700"
               placeholder="Type a command (e.g. @dev restart task)..."
               autoFocus
             />
          </form>
        </div>
      </div>

      {/* Toast Notification */}
      {toast.visible && (
        <div className="fixed bottom-6 right-6 bg-neutral-900 border border-white/[0.1] text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4 z-50">
           <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.8)]"></div>
           <span className="font-medium text-sm">{toast.msg}</span>
        </div>
      )}
    </div>
  )
}
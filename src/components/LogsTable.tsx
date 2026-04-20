import { format } from 'date-fns'
import { CheckCircle2, XCircle, Clock, Bot, Cpu } from 'lucide-react'
import { cn } from '../lib/utils'
import type { AgentLog } from '../lib/supabase'

export function LogsTable({ logs, isLoading }: { logs: AgentLog[], isLoading: boolean }) {
  if (isLoading) {
    return (
      <div className="w-full space-y-4">
        <div className="h-12 bg-slate-200 animate-pulse rounded-md w-full"></div>
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="h-16 bg-slate-100 animate-pulse rounded-md w-full"></div>
        ))}
      </div>
    )
  }

  if (logs.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg border border-slate-200">
        <Bot className="mx-auto h-12 w-12 text-slate-300" />
        <h3 className="mt-4 text-sm font-medium text-slate-900">No logs found</h3>
        <p className="mt-1 text-sm text-slate-500">The agents haven't done anything yet.</p>
      </div>
    )
  }

  return (
    <div className="overflow-hidden bg-white shadow ring-1 ring-slate-200 sm:rounded-lg">
      <table className="min-w-full divide-y divide-slate-300">
        <thead className="bg-slate-50">
          <tr>
            <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-slate-900 sm:pl-6">
              Time
            </th>
            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-slate-900">
              Agent
            </th>
            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-slate-900">
              Task
            </th>
            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-slate-900">
              Model
            </th>
            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-slate-900">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 bg-white">
          {logs.map((log) => (
            <tr key={log.id} className="hover:bg-slate-50 transition-colors">
              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-slate-500 sm:pl-6">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-slate-400" />
                  {format(new Date(log.created_at), 'MMM d, HH:mm:ss')}
                </div>
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm font-medium text-slate-900">
                <div className="flex items-center gap-2">
                  <div className={cn(
                    "w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white",
                    log.agent_name.toLowerCase() === 'edith' ? "bg-purple-500" :
                    log.agent_name.toLowerCase() === 'sacha' ? "bg-blue-500" :
                    log.agent_name.toLowerCase() === 'dev' ? "bg-emerald-500" :
                    "bg-slate-500"
                  )}>
                    {log.agent_name.charAt(0).toUpperCase()}
                  </div>
                  {log.agent_name}
                </div>
              </td>
              <td className="px-3 py-4 text-sm text-slate-600 max-w-md truncate" title={log.task_description}>
                {log.task_description}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-slate-500">
                <div className="flex items-center gap-1.5">
                  <Cpu className="w-4 h-4 text-slate-400" />
                  <span className="truncate max-w-[120px]" title={log.model_used}>{log.model_used}</span>
                </div>
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm">
                <span className={cn(
                  "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium",
                  log.status === 'completed' ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                )}>
                  {log.status === 'completed' ? (
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  ) : (
                    <XCircle className="w-3.5 h-3.5" />
                  )}
                  {log.status.charAt(0).toUpperCase() + log.status.slice(1)}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
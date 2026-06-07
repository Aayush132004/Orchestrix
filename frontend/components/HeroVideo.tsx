import React from 'react'

export const HeroVideo = () => {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 mt-4">
      {/* Container simulating a premium web application window */}
      <div className="relative rounded-2xl border border-slate-200 bg-slate-900/5 shadow-2xl overflow-hidden backdrop-blur-sm p-2 sm:p-4">
        
        {/* Window Top Bar (Mac style buttons) */}
        <div className="flex items-center gap-2 pb-3 px-2 border-b border-slate-200/60 sm:pb-4">
          <div className="w-3 h-3 rounded-full bg-slate-300" />
          <div className="w-3 h-3 rounded-full bg-slate-300" />
          <div className="w-3 h-3 rounded-full bg-slate-300" />
          <div className="ml-4 text-xs font-medium text-slate-400 bg-slate-100 px-3 py-1 rounded-md border border-slate-200/40">
            orchestrix.com/dashboard/workflows
          </div>
        </div>

        {/* Dashboard Canvas Simulation */}
        <div className="bg-slate-950 rounded-xl min-h-[300px] sm:min-h-[380px] p-6 text-left flex flex-col justify-between relative overflow-hidden group">
          
          {/* Decorative Grid Overlay for Automation Canvas feeling */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20" />

          {/* Simulated Automation Nodes */}
          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-around gap-8 my-auto w-full">
            
            {/* Node 1: Trigger */}
            <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl shadow-lg w-full sm:w-48 text-center">
              <div className="text-[10px] font-bold tracking-wider text-slate-400 uppercase mb-1">Catch Trigger</div>
              <div className="text-sm font-semibold text-white">Webhook Received</div>
              <div className="mt-2 inline-flex items-center gap-1.5 text-[10px] text-emerald-400 bg-emerald-950/50 px-2 py-0.5 rounded-full font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> 200 OK
              </div>
            </div>

            {/* Connecting line spacer 1 */}
            <div className="hidden sm:block h-0.5 flex-1 bg-gradient-to-r from-slate-800 via-amber-600 to-amber-700 relative">
              <div className="absolute top-1/2 left-0 bg-amber-500 w-2 h-2 rounded-full animate-ping" style={{ animationDuration: '2s' }} />
            </div>

            {/* Node 2: Central Router / Orchestrator */}
            <div className="bg-slate-900 border-2 border-amber-700 p-5 rounded-xl shadow-xl w-full sm:w-52 text-center ring-4 ring-amber-950/40">
              <div className="text-[10px] font-bold tracking-wider text-amber-500 uppercase mb-1">Orchestrator</div>
              <div className="text-sm font-bold text-white">Filter & Map Data</div>
              <div className="mt-2 text-[11px] text-amber-200/80 bg-amber-950/60 py-1 px-2 rounded font-mono border border-amber-900/50">
                payload.id → user_id
              </div>
            </div>

            {/* Connecting line spacer 2 */}
            <div className="hidden sm:block h-0.5 flex-1 bg-gradient-to-r from-amber-700 via-slate-800 to-slate-800 relative">
              <div className="absolute top-1/2 left-0 bg-amber-500 w-2 h-2 rounded-full animate-ping" style={{ animationDuration: '2s', animationDelay: '1s' }} />
            </div>

            {/* Node 3: Action */}
            <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl shadow-lg w-full sm:w-48 text-center">
              <div className="text-[10px] font-bold tracking-wider text-slate-400 uppercase mb-1">Execute Action</div>
              <div className="text-sm font-semibold text-white">Sync Database Table</div>
              <div className="mt-2 inline-flex items-center gap-1.5 text-[10px] text-slate-400 bg-slate-950 px-2 py-0.5 rounded-full font-mono">
                Success
              </div>
            </div>

          </div>

          {/* Bottom Execution Live-Log Status bar */}
          <div className="relative z-10 bg-slate-900 border border-slate-800/80 rounded-lg p-3 flex items-center justify-between w-full max-w-xl mx-auto mt-auto shadow-2xl font-mono text-xs">
            <div className="flex items-center gap-3 text-slate-300">
              <span className="text-amber-600 font-bold">&gt;_</span>
              <span className="text-slate-400">Workflow live:</span>
              <span className="text-slate-200 animate-pulse">Processed 1,420 tasks/min</span>
            </div>
            <div className="text-[11px] font-semibold text-amber-500 bg-amber-950/40 px-2 py-0.5 rounded border border-amber-900/30">
              Active
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
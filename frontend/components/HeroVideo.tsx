import React from 'react'

export const HeroVideo = () => {
  return (
    <div className="w-full max-w-2xl mx-auto px-4 mt-8">
      {/* Container simulating a premium web application window */}
      <div className="relative rounded-3xl border border-[#e8e4df]/85 bg-[#faf9f6]/40 shadow-2xl overflow-hidden backdrop-blur-md p-2 sm:p-4">
        
        {/* Window Top Bar (Mac style buttons) */}
        <div className="flex items-center gap-2 pb-3 px-2 border-b border-[#e8e4df]/60 sm:pb-4">
          <div className="w-3 h-3 rounded-full bg-red-400/80 border border-red-500/10" />
          <div className="w-3 h-3 rounded-full bg-yellow-400/80 border border-yellow-500/10" />
          <div className="w-3 h-3 rounded-full bg-green-400/80 border border-green-500/10" />
          <div className="ml-4 text-[10px] sm:text-xs font-mono text-slate-400 bg-[#faf9f6] px-3 py-1 rounded-md border border-[#e8e4df]/60">
            orchestrix.com/zap/create
          </div>
        </div>

        {/* Dashboard Canvas Simulation */}
        <div className="bg-white rounded-2xl min-h-[340px] sm:min-h-[380px] p-6 text-left flex flex-col justify-between relative overflow-hidden group border border-[#e8e4df]/60 mt-3 sm:mt-4 shadow-[0_12px_40px_rgba(0,0,0,0.02)]">
          
          {/* Decorative Grid Overlay for Automation Canvas feeling */}
          <div className="absolute inset-0 bg-[radial-gradient(#e8e4df_1.2px,transparent_1.2px)] bg-[size:24px_24px] opacity-75" />

          {/* Simulated Automation Nodes */}
          <div className="relative z-10 flex flex-col items-center gap-2 py-4 my-auto w-full">
            
            {/* Step 1: Webhook Trigger */}
            <div className="relative w-full max-w-[340px] p-4 bg-white border border-[#e8e4df] rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.015)] flex items-center gap-4 transition-transform group-hover:scale-[1.01] duration-300">
              <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#4a7c59] rounded-l-2xl"></div>
              <div className="w-7 h-7 rounded-xl bg-[#e8f0eb] text-[#3d6b4a] border border-[#a3c4ab]/30 flex items-center justify-center font-bold text-xs shrink-0">1</div>
              <div className="flex-1 min-w-0">
                <div className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Trigger Source</div>
                <div className="text-sm font-bold text-slate-800">Webhook</div>
              </div>
              <img 
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVQtyw3YP4pW8owoHsGyCI2o8POL2m7Hf9NA&s" 
                className="w-7 h-7 object-contain rounded shrink-0 shadow-sm border border-slate-100" 
                alt="Webhook logo" 
              />
            </div>

            {/* Down Connector */}
            <div className="h-6 w-[2px] bg-slate-300 relative">
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 border-t-[5px] border-t-slate-400 border-x-[3px] border-x-transparent w-0 h-0"></div>
            </div>

            {/* Step 2: AI Action */}
            <div className="relative w-full max-w-[340px] p-4 bg-white border border-[#e8e4df] rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.015)] flex items-center gap-4 transition-transform group-hover:scale-[1.01] duration-300 delay-75">
              <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#78a085] rounded-l-2xl"></div>
              <div className="w-7 h-7 rounded-xl bg-[#e8f0eb]/50 text-[#4a7c59] border border-[#a3c4ab]/20 flex items-center justify-center font-bold text-xs shrink-0">2</div>
              <div className="flex-1 min-w-0">
                <div className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Action Step</div>
                <div className="text-sm font-bold text-slate-800">AI Block</div>
              </div>
              <img 
                src="https://cdn-icons-png.flaticon.com/512/4616/4616734.png" 
                className="w-7 h-7 object-contain rounded shrink-0 shadow-sm border border-slate-100" 
                alt="AI Block logo"
              />
            </div>

            {/* Down Connector */}
            <div className="h-6 w-[2px] bg-slate-300 relative">
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 border-t-[5px] border-t-slate-400 border-x-[3px] border-x-transparent w-0 h-0"></div>
            </div>

            {/* Step 3: Send Email */}
            <div className="relative w-full max-w-[340px] p-4 bg-white border border-[#e8e4df] rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.015)] flex items-center gap-4 transition-transform group-hover:scale-[1.01] duration-300 delay-150">
              <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#78a085] rounded-l-2xl"></div>
              <div className="w-7 h-7 rounded-xl bg-[#e8f0eb]/50 text-[#4a7c59] border border-[#a3c4ab]/20 flex items-center justify-center font-bold text-xs shrink-0">3</div>
              <div className="flex-1 min-w-0">
                <div className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Action Step</div>
                <div className="text-sm font-bold text-slate-800">Send Email</div>
              </div>
              <img 
                src="https://thumbs.dreamstime.com/b/gmail-email-logo-icon-beautiful-meticulously-designed-225149202.jpg" 
                className="w-7 h-7 object-contain rounded shrink-0 shadow-sm border border-slate-100" 
                alt="Gmail logo"
              />
            </div>

          </div>

        </div>
      </div>
    </div>
  )
}
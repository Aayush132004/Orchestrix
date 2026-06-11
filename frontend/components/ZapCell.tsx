export default function ZapCell({
    name,
    onClick,
    index
}:{
    name?: string,
    index: number
    onClick: () => void
}){
    const isTrigger = index === 1;

    return (
        <div 
            onClick={onClick}  
            className={`
                relative w-[340px] p-6 bg-white border border-[#e8e4df] rounded-2xl cursor-pointer
                shadow-[0_4px_12px_rgba(0,0,0,0.01)] hover:shadow-[0_12px_24px_rgba(0,0,0,0.05)]
                hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99]
                transition-all duration-200 select-none overflow-hidden group
            `}
        >
            {/* Visual Left Accent Border */}
            <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${isTrigger ? "bg-[#4a7c59]" : "bg-[#78a085]"}`}></div>
 
            <div className="flex items-center gap-4 pl-2">
                {/* Visual Step Indicator Badge */}
                <div className={`
                    w-8 h-8 rounded-xl flex items-center justify-center font-bold text-sm shadow-sm
                    ${isTrigger 
                        ? "bg-[#e8f0eb] text-[#3d6b4a] border border-[#a3c4ab]/30" 
                        : "bg-[#e8f0eb]/50 text-[#4a7c59] border border-[#a3c4ab]/20"}
                `}>
                    {index}
                </div>
                
                <div className="flex-1 min-w-0">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        {isTrigger ? "Trigger source" : `Action step ${index - 1}`}
                    </div>
                    <div className="text-base font-bold text-slate-800 truncate group-hover:text-slate-950 transition-colors">
                        {name || (isTrigger ? "Select a trigger..." : "Select an action...")}
                    </div>
                </div>

                <div className="text-slate-400 group-hover:text-slate-600 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                </div>
            </div>
        </div>
    );
}
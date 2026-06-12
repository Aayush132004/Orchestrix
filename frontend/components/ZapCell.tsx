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
                relative w-[340px] p-5 bg-[#111711] border border-[rgba(163,230,53,0.12)] rounded-2xl cursor-pointer
                hover:border-[rgba(163,230,53,0.3)] hover:shadow-[0_0_30px_rgba(163,230,53,0.07)]
                hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99]
                transition-all duration-200 select-none overflow-hidden group
            `}
        >
            {/* Accent Left Border */}
            <div className={`absolute left-0 top-0 bottom-0 w-1 ${isTrigger ? "bg-[#a3e635]" : "bg-[rgba(163,230,53,0.4)]"} rounded-l-2xl`}></div>

            <div className="flex items-center gap-4 pl-2">
                {/* Step Badge */}
                <div className={`
                    w-8 h-8 rounded-xl flex items-center justify-center font-bold text-sm shadow-sm
                    ${isTrigger
                        ? "bg-[rgba(163,230,53,0.15)] text-[#a3e635] border border-[rgba(163,230,53,0.3)]"
                        : "bg-[rgba(163,230,53,0.06)] text-[#6b8c6b] border border-[rgba(163,230,53,0.12)]"}
                `}>
                    {index}
                </div>

                <div className="flex-1 min-w-0">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-[#4a6a4a]">
                        {isTrigger ? "Trigger source" : `Action step ${index - 1}`}
                    </div>
                    <div className="text-base font-bold text-white truncate group-hover:text-[#e8f8d0] transition-colors">
                        {name || (isTrigger ? "Select a trigger..." : "Select an action...")}
                    </div>
                </div>

                <div className="text-[#2a4a2a] group-hover:text-[#a3e635] transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                </div>
            </div>
        </div>
    );
}
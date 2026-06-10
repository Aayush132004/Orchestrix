"use client"
import Appbar from "@/components/Appbar";
import DarkButton from "@/components/buttons/DarkButton";
import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL,HOOKS_URL } from "../config";
import LinkButton from "@/components/buttons/LinkButton";
import { useRouter } from "next/navigation";

interface Zap {
    "id": string,
    "triggerId": string,
    "userId": number,
    "actions": {
        "id": string,
        "zapId": string,
        "actionId": string,
        "sortingOrder": number,
        "type": {
            "id": string,
            "name": string,
            "image": string
        }
    }[],
    "trigger": {
        "id": string,
        "zapId": string,
        "triggerId": string,
        "type": {
            "id": string,
            "name": string,
            "image": string
        }
    }
}

function useZaps() {
    const [loading, setLoading] = useState(true);
    const [zaps, setZaps] = useState<Zap[]>([]);

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/zap`, {
            headers: {
                "Authorization": localStorage.getItem("token")
            }
        })
        .then(res => {
            setZaps(res.data.zaps);
            setLoading(false);
        })
        .catch(err => {
            console.error("Error fetching zaps:", err);
            setLoading(false);
        });
    }, []);

    return { loading, zaps };
}

export default function MyZapsPage() {
    const { loading, zaps } = useZaps();
    const router = useRouter();
    
    return (
        <div className="min-h-screen bg-[#FAF9F6] text-slate-900 flex flex-col">
            <div className="bg-white border-b border-slate-200/50">
                <Appbar />
            </div>
            
            <div className="flex justify-center pt-12">
                <div className="max-w-screen-lg w-full px-8">
                    <div className="flex justify-between items-center border-b border-slate-200/60 pb-6 mb-4">
                        <div className="text-3xl font-extrabold tracking-tight text-slate-900">
                            My Zaps
                        </div>
                        <DarkButton onClick={() => {
                            router.push("/zap/create");
                        }}>Create</DarkButton>
                    </div>
                </div>
            </div>
            
            {loading ? (
                <div className="flex justify-center pt-12 text-slate-400 font-medium text-sm animate-pulse">
                    Loading Zaps...
                </div>
            ) : zaps.length === 0 ? (
                <div className="flex justify-center pt-4">
                    <div className="max-w-screen-lg w-full px-8">
                        <div className="flex flex-col items-center justify-center border border-dashed border-slate-200 bg-white rounded-2xl py-16 px-4 text-center shadow-sm">
                            <div className="bg-amber-50 text-amber-700 p-3 rounded-full mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                                </svg>
                            </div>
                            <p className="text-slate-800 font-bold text-lg">No Zaps exist yet</p>
                            <p className="text-sm text-slate-500 mt-2 max-w-sm leading-relaxed">
                                Get started by creating your <span className="bg-amber-100/70 text-amber-950 px-1.5 py-0.5 rounded font-medium">first automation workflow</span> to run tasks automatically.
                            </p>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex justify-center"> 
                    <ZapTable zaps={zaps} /> 
                </div>
            )}
        </div>
    );
}

function ZapTable({ zaps }: { zaps: Zap[] }) {
    const router = useRouter();

    // Reusable grid layout structure for perfect column alignment
    const gridLayout = "grid grid-cols-[2.5fr_1fr_1fr_1.2fr_1fr_1.3fr_0.5fr] items-center gap-4 px-6 py-4";

    return (
        <div className="p-8 max-w-screen-lg w-full">
            <div className="w-full border border-slate-200/70 rounded-xl shadow-sm overflow-hidden bg-white">
                
                {/* Table Header */}
                <div className={`${gridLayout} bg-slate-50/70 border-b border-slate-200/70 text-xs font-bold uppercase tracking-wider text-slate-500`}>
                    <div>Workflow Steps</div>
                    <div>Last Edit</div>
                    <div>Status</div>
                    <div>Zap ID</div>
                    <div>Created at</div>
                    <div>Webhook URL</div>
                    <div className="text-right pr-4">Go</div>
                </div>
                
                {/* Table Body */}
                <div className="divide-y divide-slate-100">
                    {zaps.map(z => (
                        <div key={z.id} className={`${gridLayout} text-sm text-slate-600 hover:bg-slate-50/40 transition-colors duration-150`}>
                            
                            {/* 1. Workflow steps with clear visual structure */}
                            <div className="flex items-center gap-3 overflow-hidden">
                                {/* Trigger Icon block */}
                                <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 pl-1.5 pr-2 py-1 rounded-lg shrink-0">
                                    <img 
                                        src={z.trigger.type.image} 
                                        className="w-[20px] h-[20px] object-contain rounded" 
                                        alt={z.trigger.type.name}
                                    /> 
                                    <span className="text-[11px] font-medium text-slate-500">Trigger</span>
                                </div>

                                <span className="text-slate-400 text-xs shrink-0">➔</span>
                                
                                {/* Actions Array block */}
                                <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
                                    {z.actions.map((x, index) => (
                                        <div key={x.id} className="flex items-center gap-1 bg-amber-50/60 border border-amber-200/70 pl-1.5 pr-2 py-1 rounded-lg shrink-0">
                                            <img 
                                                src={x.type.image} 
                                                className="w-[20px] h-[20px] object-contain rounded" 
                                                alt={x.type.name}
                                            />
                                            <span className="text-[11px] font-medium text-amber-800">Action {index + 1}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            
                            {/* 2. Last Edit */}
                            <div className="text-slate-500 text-xs">Nov 13, 2023</div>
                            
                            {/* 3. Running Status */}
                            <div>
                                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-200">
                                    Active
                                </span>
                            </div>
                            
                            {/* 4. ID */}
                            <div className="font-mono text-xs text-slate-400 truncate" title={z.id}>
                                {z.id}
                            </div>
                            
                            {/* 5. Created At */}
                            <div className="text-slate-500 text-xs">Nov 13, 2023</div>
                            
                            {/* 6. Webhook URL */}
                            <div className="font-mono text-xs text-slate-400 truncate">
                                <span className="bg-slate-100 px-1.5 py-0.5 rounded text-[11px]">/{`${HOOKS_URL}/hooks/catch/1/${z.id}`}</span>
                            </div>
                            
                            {/* 7. Action Link Button */}
                            <div className="text-right">
                                <LinkButton onClick={() => {
                                    router.push("/zap/" + z.id);
                                }}>Go</LinkButton>
                            </div>

                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
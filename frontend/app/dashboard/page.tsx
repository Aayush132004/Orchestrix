"use client"
import Appbar from "@/components/Appbar";
import DarkButton from "@/components/buttons/DarkButton";
import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL, HOOKS_URL } from "../config";
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

function useZaps(token: string | null) {
    const [loading, setLoading] = useState(true);
    const [zaps, setZaps] = useState<Zap[]>([]);

    useEffect(() => {
        if (!token) return;
        axios.get(`${BACKEND_URL}/api/v1/zap`, {
            headers: {
                "Authorization": token
            }
        })
        .then(res => {
            setZaps(res.data.zaps || []);
            setLoading(false);
        })
        .catch(err => {
            console.error("Error fetching zaps:", err);
            setLoading(false);
        });
    }, [token]);

    return { loading, zaps };
}

export default function MyZapsPage() {
    const router = useRouter();
    const [token, setToken] = useState<string | null>(null);
    const [checkingAuth, setCheckingAuth] = useState(true);

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (!storedToken) {
            router.push("/login");
        } else {
            setToken(storedToken);
            setCheckingAuth(false);
        }
    }, [router]);

    const { loading, zaps } = useZaps(token);
    const validZaps = zaps.filter(z => z.trigger && z.actions && z.actions.length > 0);

    if (checkingAuth) {
        return (
          <div className="min-h-screen bg-[#faf9f6] flex items-center justify-center">
            <div className="flex flex-col items-center gap-3">
              <div className="w-10 h-10 border-4 border-[#4a7c59] border-t-transparent rounded-full animate-spin"></div>
              <p className="text-slate-500 text-sm font-semibold tracking-wider">Loading your dashboard...</p>
            </div>
          </div>
        );
    }
    
    return (
        <div className="min-h-screen bg-[#faf9f6] text-slate-900 flex flex-col">
            <Appbar />
            
            <main className="flex-1 max-w-6xl w-full mx-auto px-6 py-10">
                <div className="flex justify-between items-end border-b border-slate-200/60 pb-6 mb-8">
                    <div className="space-y-1">
                        <h1 className="text-3xl font-black tracking-tight text-slate-900">
                            My Workflows
                        </h1>
                        <p className="text-sm text-slate-400">Manage, launch, and monitor your custom active automations.</p>
                    </div>
                    <DarkButton onClick={() => {
                        router.push("/zap/create");
                    }}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        <span>Create Zap</span>
                    </DarkButton>
                </div>
                
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20 gap-4">
                        <div className="w-8 h-8 border-3 border-[#4a7c59] border-t-transparent rounded-full animate-spin"></div>
                        <p className="text-[#4a7c59] text-sm font-medium animate-pulse">Fetching your workflows...</p>
                    </div>
                ) : validZaps.length === 0 ? (
                    <div className="flex flex-col items-center justify-center border border-[#e8e4df]/60 bg-white rounded-3xl py-20 px-6 text-center shadow-[0_10px_30px_rgba(0,0,0,0.02)]">
                        <div className="bg-[#e8f0eb] text-[#3d6b4a] p-4 rounded-2xl mb-5 shadow-inner">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-slate-800">No active workflows</h3>
                        <p className="text-sm text-slate-400 mt-2 max-w-sm leading-relaxed">
                            Create your first automation workflow to run tasks across multiple applications instantly.
                        </p>
                        <div className="mt-6">
                            <DarkButton onClick={() => router.push("/zap/create")}>Build a Zap</DarkButton>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col gap-6"> 
                        <ZapTable zaps={validZaps} /> 
                    </div>
                )}
            </main>
        </div>
    );
}

function ZapTable({ zaps }: { zaps: Zap[] }) {
    const router = useRouter();

    return (
        <div className="grid grid-cols-1 gap-4">
            {zaps.map(z => (
                <div key={z.id} className="bg-white border border-[#e8e4df]/60 rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:border-[#a3c4ab]/55 transition-all duration-300 p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 group">
                    
                    {/* Left: Workflow Visual Sequence */}
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-3">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                                Active
                            </span>
                            <span className="text-xs font-mono text-slate-400 truncate" title={z.id}>
                                ID: {z.id.substring(0, 8)}...
                            </span>
                        </div>
                        
                        <div className="flex flex-wrap items-center gap-2.5">
                            {/* Trigger Badge */}
                            <div className="inline-flex items-center gap-2 bg-slate-50 border border-slate-200/80 pl-2 pr-3 py-1.5 rounded-xl shrink-0">
                                {z.trigger?.type?.image ? (
                                    <img 
                                        src={z.trigger.type.image} 
                                        className="w-5 h-5 object-contain rounded" 
                                        alt={z.trigger.type.name}
                                    /> 
                                ) : (
                                    <div className="w-5 h-5 rounded bg-slate-200 flex items-center justify-center text-[10px] font-bold">T</div>
                                )}
                                <span className="text-xs font-semibold text-slate-700">{z.trigger?.type?.name || "No Trigger"}</span>
                            </div>

                            <div className="text-slate-300">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                </svg>
                            </div>
                            
                            {/* Actions Sequence */}
                            <div className="flex items-center flex-wrap gap-2.5">
                                {z.actions.map((x, idx) => (
                                    <div key={x.id} className="flex items-center gap-2">
                                        <div className="inline-flex items-center gap-2 bg-[#e8f0eb] border border-[#a3c4ab]/20 pl-2 pr-3 py-1.5 rounded-xl shrink-0">
                                            {x.type?.image ? (
                                                <img 
                                                    src={x.type.image} 
                                                    className="w-5 h-5 object-contain rounded" 
                                                    alt={x.type.name}
                                                />
                                            ) : (
                                                <div className="w-5 h-5 rounded bg-[#a3c4ab] flex items-center justify-center text-[10px] font-bold">A</div>
                                            )}
                                            <span className="text-xs font-semibold text-[#3d6b4a]">{x.type?.name || "No Action"}</span>
                                        </div>
                                        {idx < z.actions.length - 1 && (
                                            <span className="text-slate-300">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                                                </svg>
                                            </span>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    
                    {/* Right: Copy Webhook & Go Actions */}
                    <div className="flex items-center gap-4 shrink-0 border-t border-slate-100 pt-4 md:border-t-0 md:pt-0">
                        <div className="flex flex-col gap-1 items-end">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 pr-1">Webhook endpoint</span>
                            <WebhookCopyButton url={`${HOOKS_URL}/hooks/catch/1/${z.id}`} />
                        </div>
                        
                        <div className="h-10 w-[1px] bg-slate-100 hidden md:block"></div>

                        <LinkButton onClick={() => {
                            router.push("/zap/" + z.id);
                        }}>
                            <span className="flex items-center gap-1">
                                <span>Inspect</span>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                                </svg>
                            </span>
                        </LinkButton>
                    </div>

                </div>
            ))}
        </div>
    );
}

function WebhookCopyButton({ url }: { url: string }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <button 
            onClick={handleCopy}
            className="flex items-center gap-2 bg-slate-50 hover:bg-slate-100 active:scale-[0.98] border border-slate-200/80 rounded-xl px-3 py-1.5 font-mono text-[11px] text-slate-600 transition-all duration-150 cursor-pointer"
        >
            <span className="max-w-[150px] truncate">{url.replace(/^https?:\/\//, '')}</span>
            {copied ? (
                <span className="text-green-600 font-semibold flex items-center gap-0.5 animate-scale-in">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-3.5 h-3.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    <span>Copied</span>
                </span>
            ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5 text-slate-400">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H5.4m1.5 13.5h9.75a1.125 1.125 0 001.125-1.125V7.875a1.125 1.125 0 00-1.125-1.125H9.75a1.125 1.125 0 00-1.125 1.125V18a1.125 1.125 0 001.125 1.125z" />
                </svg>
            )}
        </button>
    );
}
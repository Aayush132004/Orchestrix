"use client"
import Appbar from "@/components/Appbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "@/app/config";
import { useParams, useRouter } from "next/navigation";
import SecondaryButton from "@/components/buttons/SecondaryButton";
import LinkButton from "@/components/buttons/LinkButton";

interface ZapRun {
    id: string;
    zapId: string;
    metadata: any;
    createdAt: string;
}

interface Action {
    id: string;
    sortingOrder: number;
    type: {
        id: string;
        name: string;
        image: string;
    }
}

interface Trigger {
    id: string;
    type: {
        id: string;
        name: string;
        image: string;
    }
}

interface ZapDetails {
    id: string;
    userId: number;
    trigger: Trigger;
    actions: Action[];
    zapRuns: ZapRun[];
}

export default function ZapInspectPage() {
    const router = useRouter();
    const params = useParams();
    const zapId = params.id as string;
    
    const [token, setToken] = useState<string | null>(null);
    const [checkingAuth, setCheckingAuth] = useState(true);
    const [loading, setLoading] = useState(true);
    const [zap, setZap] = useState<ZapDetails | null>(null);
    const [expandedRunId, setExpandedRunId] = useState<string | null>(null);

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (!storedToken) {
            router.push("/login");
        } else {
            setToken(storedToken);
            setCheckingAuth(false);
        }
    }, [router]);

    useEffect(() => {
        if (!token || !zapId) return;
        
        axios.get(`${BACKEND_URL}/api/v1/zap/${zapId}`, {
            headers: { Authorization: token }
        })
        .then(res => {
            setZap(res.data.zap);
            setLoading(false);
        })
        .catch(err => {
            console.error("Error fetching zap details:", err);
            setLoading(false);
        });
    }, [token, zapId]);

    if (checkingAuth) {
        return (
            <div className="min-h-screen bg-[#faf9f6] flex items-center justify-center">
                <div className="flex flex-col items-center gap-3">
                    <div className="w-10 h-10 border-4 border-[#4a7c59] border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-slate-500 text-sm font-semibold tracking-wider">Securing workspace...</p>
                </div>
            </div>
        );
    }

    // Determine status of a specific run
    const getRunStatus = (run: ZapRun, totalActions: number) => {
        const steps = run.metadata?.steps || {};
        const stepsArray = Object.values(steps) as any[];
        
        const hasError = stepsArray.some(s => s?.error !== undefined);
        if (hasError) return { label: "Failed", className: "bg-red-50 text-red-700 border-red-200/50" };
        
        const completedStepsCount = stepsArray.filter(s => s?.error === undefined).length;
        if (completedStepsCount >= totalActions) {
            return { label: "Success", className: "bg-green-50 text-green-700 border-green-200/50" };
        }
        
        return { label: "In Progress", className: "bg-amber-50 text-amber-700 border-amber-200/50 animate-pulse" };
    };

    return (
        <div className="min-h-screen bg-[#faf9f6] text-slate-900 flex flex-col">
            <Appbar />
            
            <main className="flex-1 max-w-6xl w-full mx-auto px-6 py-10">
                {/* Back Link & Header */}
                <div className="flex justify-between items-end border-b border-[#e8e4df]/60 pb-6 mb-8">
                    <div className="space-y-2">
                        <LinkButton onClick={() => router.push("/dashboard")}>
                            <span className="flex items-center gap-1">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                                </svg>
                                <span>Back to Dashboard</span>
                            </span>
                        </LinkButton>
                        <h1 className="text-3xl font-black tracking-tight text-slate-900">
                            Inspect Workflow
                        </h1>
                        <p className="text-sm text-slate-400">View configuration details and execution history log.</p>
                    </div>
                    
                    {zap && (
                        <div className="text-right text-xs text-slate-400 font-mono">
                            ID: {zap.id}
                        </div>
                    )}
                </div>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20 gap-4">
                        <div className="w-8 h-8 border-3 border-[#4a7c59] border-t-transparent rounded-full animate-spin"></div>
                        <p className="text-[#4a7c59] text-sm font-medium animate-pulse">Loading Zap details...</p>
                    </div>
                ) : !zap ? (
                    <div className="flex flex-col items-center justify-center border border-[#e8e4df] bg-white rounded-3xl py-20 px-6 text-center">
                        <h3 className="text-xl font-bold text-slate-800">Workflow not found</h3>
                        <p className="text-sm text-slate-400 mt-2">Could not load details for this Zap.</p>
                    </div>
                ) : (
                    <div className="space-y-8">
                        {/* Section 1: Visual Flow Configuration */}
                        <div className="bg-white border border-[#e8e4df]/60 rounded-3xl p-6 shadow-[0_4px_12px_rgba(0,0,0,0.01)]">
                            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-6">Workflow Blueprint</h2>
                            
                            <div className="flex flex-col md:flex-row items-center gap-4 justify-center md:justify-start overflow-x-auto pb-2">
                                {/* Trigger */}
                                <div className="flex items-center gap-3 bg-[#e8f0eb] border border-[#a3c4ab]/30 p-3.5 rounded-2xl shrink-0 w-64 shadow-sm">
                                    <div className="w-10 h-10 bg-white border border-[#e8e4df] rounded-xl flex items-center justify-center shrink-0">
                                        <img src={zap.trigger?.type?.image} className="w-6 h-6 object-contain rounded" alt={zap.trigger?.type?.name} />
                                    </div>
                                    <div className="min-w-0">
                                        <span className="text-[10px] font-bold text-[#3d6b4a] uppercase tracking-wider block">Trigger</span>
                                        <span className="text-sm font-bold text-slate-800 truncate block">{zap.trigger?.type?.name}</span>
                                    </div>
                                </div>

                                {zap.actions.map((action, idx) => (
                                    <div key={action.id} className="flex flex-col md:flex-row items-center gap-4 shrink-0">
                                        {/* Connector */}
                                        <div className="text-slate-300">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 rotate-90 md:rotate-0">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                                            </svg>
                                        </div>
                                        
                                        {/* Action Cell */}
                                        <div className="flex items-center gap-3 bg-white border border-[#e8e4df] p-3.5 rounded-2xl w-64 shadow-sm hover:border-[#a3c4ab]/50 transition-colors">
                                            <div className="w-10 h-10 bg-slate-50 border border-[#e8e4df] rounded-xl flex items-center justify-center shrink-0">
                                                <img src={action.type.image} className="w-6 h-6 object-contain rounded" alt={action.type.name} />
                                            </div>
                                            <div className="min-w-0">
                                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Step {idx + 1}</span>
                                                <span className="text-sm font-bold text-slate-800 truncate block">{action.type.name}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Section 2: Execution Runs List */}
                        <div className="bg-white border border-[#e8e4df]/60 rounded-3xl p-6 shadow-[0_4px_12px_rgba(0,0,0,0.01)]">
                            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-6">Execution Runs History</h2>
                            
                            {zap.zapRuns.length === 0 ? (
                                <div className="border border-dashed border-[#e8e4df] rounded-2xl p-12 text-center text-slate-400 text-sm">
                                    <div className="text-3xl mb-2">🚀</div>
                                    No runs recorded yet. Send requests to the webhook to trigger executions!
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {zap.zapRuns.map((run) => {
                                        const status = getRunStatus(run, zap.actions.length);
                                        const isExpanded = expandedRunId === run.id;
                                        const dateStr = new Date(run.createdAt).toLocaleString();
                                        
                                        return (
                                            <div 
                                                key={run.id}
                                                className="border border-[#e8e4df]/80 rounded-2xl overflow-hidden hover:border-[#a3c4ab]/40 transition-colors"
                                            >
                                                {/* Run Header */}
                                                <div 
                                                    onClick={() => setExpandedRunId(isExpanded ? null : run.id)}
                                                    className="p-4 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer select-none"
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <span className={`text-[10px] font-bold uppercase tracking-wider border px-2 py-0.5 rounded-full shrink-0 ${status.className}`}>
                                                            {status.label}
                                                        </span>
                                                        <span className="text-xs font-mono font-bold text-slate-700">
                                                            Run: {run.id.substring(0, 18)}...
                                                        </span>
                                                    </div>
                                                    
                                                    <div className="flex items-center gap-4 text-xs text-slate-500">
                                                        <span>{dateStr}</span>
                                                        <svg 
                                                            xmlns="http://www.w3.org/2000/svg" 
                                                            fill="none" 
                                                            viewBox="0 0 24 24" 
                                                            strokeWidth={2.5} 
                                                            stroke="currentColor" 
                                                            className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${isExpanded ? "rotate-90" : ""}`}
                                                        >
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                                                        </svg>
                                                    </div>
                                                </div>

                                                {/* Run Details (Expanded JSON payload view) */}
                                                {isExpanded && (
                                                    <div className="p-5 border-t border-[#e8e4df]/80 bg-white space-y-4 animate-scale-in">
                                                        {/* Trigger Input Data */}
                                                        <div className="space-y-2">
                                                            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Trigger Inputs (Body Payload)</div>
                                                            <pre className="p-4 bg-slate-950 text-slate-200 rounded-xl text-xs font-mono overflow-auto max-h-[180px] shadow-inner">
                                                                {JSON.stringify(run.metadata?.body || run.metadata, null, 2)}
                                                            </pre>
                                                        </div>

                                                        {/* Action Steps Executions Details */}
                                                        {zap.actions.map((action, idx) => {
                                                            const stepIndex = idx + 1;
                                                            const stepDetails = run.metadata?.steps?.[String(idx)] || run.metadata?.steps?.[idx];
                                                            
                                                            return (
                                                                <div key={action.id} className="space-y-2 pt-2 border-t border-slate-100">
                                                                    <div className="flex justify-between items-center">
                                                                        <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                                                            Step {stepIndex} ({action.type.name}) Output
                                                                        </div>
                                                                        {stepDetails?.error ? (
                                                                            <span className="text-[9px] font-bold uppercase text-red-600 bg-red-50 border border-red-200 px-1.5 py-0.5 rounded">Error</span>
                                                                        ) : stepDetails ? (
                                                                            <span className="text-[9px] font-bold uppercase text-green-600 bg-green-50 border border-green-200 px-1.5 py-0.5 rounded">Completed</span>
                                                                        ) : (
                                                                            <span className="text-[9px] font-bold uppercase text-slate-400 bg-slate-100 border border-slate-200 px-1.5 py-0.5 rounded">Pending</span>
                                                                        )}
                                                                    </div>
                                                                    
                                                                    <pre className={`p-4 rounded-xl text-xs font-mono overflow-auto max-h-[180px] shadow-inner ${stepDetails?.error ? 'bg-red-950/20 text-red-400' : 'bg-slate-950 text-green-400'}`}>
                                                                        {stepDetails 
                                                                            ? JSON.stringify(stepDetails, null, 2) 
                                                                            : "{\n  \"status\": \"Waiting for preceding steps to complete\"\n}"}
                                                                    </pre>
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}

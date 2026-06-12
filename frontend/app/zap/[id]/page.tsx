"use client"
import Appbar from "@/components/Appbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "@/app/config";
import { useParams, useRouter } from "next/navigation";
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

function getSafeImage(id: string, image: string): string {
    if (id === 'http' || id === 'http-request' || (image && image.includes('postman'))) {
        return 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjYTNlNjM1IiBzdHJva2Utd2lkdGg9IjIiPjxwYXRoIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgZD0iTTEyIDIxYTkuMDA0IDkuMDA0IDAgMDA4LjcxNi02Ljc0N00xMiAyMWE5LjAwNCA5LjAwNCAwIDAxLTguNzE2LTYuNzQ3TTE0LjUgMy4xNzVBOSA5IDAgMDExMiAzYTkgOSAwIDAwLTIuNS4xNzVNMyAxMmg0bTEwIDBoNE0xMiAzYy0xLjM1NiAyLjAyLTIuMjUgNS4xNDktMi4yNSA5czAuODk0IDYuOTggMi4yNSA5TTE2LjI1IDguNzVBNS45ODQgNS45ODQgMCAwMTEyIDhhNS45ODQgNS45ODQgMCAwMC00LjI1IDEuNzVNMy40NSA3LjVoMTcuMU0zLjQ1IDE2LjVoMTcuMSIvPjwvc3ZnPg==';
    }
    return image;
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
            <div className="min-h-screen bg-[#0a0f0a] flex items-center justify-center">
                <div className="flex flex-col items-center gap-3">
                    <div className="w-10 h-10 border-4 border-[#a3e635] border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-[#6b8c6b] text-sm font-semibold tracking-wider">Loading...</p>
                </div>
            </div>
        );
    }

    const getRunStatus = (run: ZapRun, totalActions: number) => {
        const steps = run.metadata?.steps || {};
        const stepsArray = Object.values(steps) as any[];
        const hasError = stepsArray.some(s => s?.error !== undefined);
        if (hasError) return { label: "Failed", className: "bg-red-950/60 text-red-400 border-red-800/50" };
        const completedStepsCount = stepsArray.filter(s => s?.error === undefined).length;
        if (completedStepsCount >= totalActions) {
            return { label: "Success", className: "bg-green-950/60 text-green-400 border-green-800/50" };
        }
        return { label: "In Progress", className: "bg-amber-950/60 text-amber-400 border-amber-800/50 animate-pulse" };
    };

    return (
        <div className="min-h-screen bg-[#0a0f0a] text-white flex flex-col">
            <Appbar />

            <main className="flex-1 max-w-6xl w-full mx-auto px-6 py-10">
                {/* Header */}
                <div className="flex justify-between items-end border-b border-[rgba(163,230,53,0.1)] pb-6 mb-8">
                    <div className="space-y-2">
                        <LinkButton onClick={() => router.push("/dashboard")}>
                            <span className="flex items-center gap-1">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                                </svg>
                                <span>Back to My Zaps</span>
                            </span>
                        </LinkButton>
                        <h1 className="text-3xl font-black tracking-tight text-white">
                            Inspect Zap
                        </h1>
                        <p className="text-sm text-[#4a6a4a]">View configuration and execution run history.</p>
                    </div>

                    {zap && (
                        <div className="text-right text-xs text-[#4a6a4a] font-mono">
                            ID: {zap.id}
                        </div>
                    )}
                </div>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20 gap-4">
                        <div className="w-8 h-8 border-2 border-[#a3e635] border-t-transparent rounded-full animate-spin"></div>
                        <p className="text-[#6b8c6b] text-sm font-medium">Loading zap details...</p>
                    </div>
                ) : !zap ? (
                    <div className="flex flex-col items-center justify-center border border-[rgba(163,230,53,0.08)] bg-[#111711] rounded-3xl py-20 px-6 text-center">
                        <h3 className="text-xl font-bold text-white">Zap not found</h3>
                        <p className="text-sm text-[#4a6a4a] mt-2">Could not load details for this zap.</p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {/* Section 1: Workflow Blueprint */}
                        <div className="bg-[#111711] border border-[rgba(163,230,53,0.1)] rounded-2xl p-6">
                            <h2 className="text-xs font-bold uppercase tracking-wider text-[#4a6a4a] mb-5">Zap Blueprint</h2>

                            <div className="flex flex-col md:flex-row items-center gap-3 justify-center md:justify-start overflow-x-auto pb-2">
                                {/* Trigger */}
                                <div className="flex items-center gap-3 bg-[rgba(163,230,53,0.06)] border border-[rgba(163,230,53,0.15)] p-3.5 rounded-xl shrink-0 w-60">
                                    <div className="w-9 h-9 bg-[#0a0f0a] border border-[rgba(163,230,53,0.15)] rounded-xl flex items-center justify-center shrink-0">
                                        <img src={getSafeImage(zap.trigger?.type?.id || '', zap.trigger?.type?.image || '')} className="w-5 h-5 object-contain rounded" alt={zap.trigger?.type?.name} />
                                    </div>
                                    <div className="min-w-0">
                                        <span className="text-[9px] font-bold text-[#a3e635] uppercase tracking-wider block">Trigger</span>
                                        <span className="text-sm font-bold text-white truncate block">{zap.trigger?.type?.name}</span>
                                    </div>
                                </div>

                                {zap.actions.map((action, idx) => (
                                    <div key={action.id} className="flex flex-col md:flex-row items-center gap-3 shrink-0">
                                        {/* Arrow */}
                                        <div className="text-[#2a4a2a]">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 rotate-90 md:rotate-0">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                                            </svg>
                                        </div>

                                        {/* Action Cell */}
                                        <div className="flex items-center gap-3 bg-[#0a0f0a] border border-[rgba(163,230,53,0.08)] p-3.5 rounded-xl w-60 hover:border-[rgba(163,230,53,0.2)] transition-colors">
                                            <div className="w-9 h-9 bg-[#111711] border border-[rgba(163,230,53,0.1)] rounded-xl flex items-center justify-center shrink-0">
                                                <img src={getSafeImage(action.type.id, action.type.image)} className="w-5 h-5 object-contain rounded" alt={action.type.name} />
                                            </div>
                                            <div className="min-w-0">
                                                <span className="text-[9px] font-bold text-[#4a6a4a] uppercase tracking-wider block">Step {idx + 1}</span>
                                                <span className="text-sm font-bold text-white truncate block">{action.type.name}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Section 2: Execution Runs History */}
                        <div className="bg-[#111711] border border-[rgba(163,230,53,0.1)] rounded-2xl p-6">
                            <h2 className="text-xs font-bold uppercase tracking-wider text-[#4a6a4a] mb-5">Execution History</h2>

                            {zap.zapRuns.length === 0 ? (
                                <div className="border border-dashed border-[rgba(163,230,53,0.1)] rounded-xl p-10 text-center">
                                    <p className="text-[#4a6a4a] text-sm font-medium">No zap instances run yet.</p>
                                    <p className="text-[#2a3a2a] text-xs mt-1">Send a request to the webhook endpoint to trigger your first run.</p>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {zap.zapRuns.map((run) => {
                                        const status = getRunStatus(run, zap.actions.length);
                                        const isExpanded = expandedRunId === run.id;
                                        const dateStr = new Date(run.createdAt).toLocaleString();

                                        return (
                                            <div
                                                key={run.id}
                                                className="border border-[rgba(163,230,53,0.08)] rounded-xl overflow-hidden hover:border-[rgba(163,230,53,0.18)] transition-colors"
                                            >
                                                {/* Run Header */}
                                                <div
                                                    onClick={() => setExpandedRunId(isExpanded ? null : run.id)}
                                                    className="p-4 bg-[#0a0f0a] flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer select-none"
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <span className={`text-[9px] font-bold uppercase tracking-wider border px-2 py-0.5 rounded-full shrink-0 ${status.className}`}>
                                                            {status.label}
                                                        </span>
                                                        <span className="text-xs font-mono font-bold text-[#6b8c6b]">
                                                            {run.id.substring(0, 18)}...
                                                        </span>
                                                    </div>

                                                    <div className="flex items-center gap-3 text-xs text-[#4a6a4a]">
                                                        <span>{dateStr}</span>
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            strokeWidth={2.5}
                                                            stroke="currentColor"
                                                            className={`w-4 h-4 text-[#4a6a4a] transition-transform duration-200 ${isExpanded ? "rotate-90" : ""}`}
                                                        >
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                                                        </svg>
                                                    </div>
                                                </div>

                                                {/* Run Details */}
                                                {isExpanded && (
                                                    <div className="p-5 border-t border-[rgba(163,230,53,0.06)] bg-[#0d120d] space-y-4 animate-scale-in">
                                                        {/* Trigger Input */}
                                                        <div className="space-y-2">
                                                            <div className="text-[9px] font-bold uppercase tracking-wider text-[#4a6a4a]">Trigger Payload</div>
                                                            <pre className="p-4 bg-[#060a06] border border-[rgba(163,230,53,0.06)] text-[#a3e635] rounded-xl text-xs font-mono overflow-auto max-h-[180px]">
                                                                {JSON.stringify(run.metadata?.body || run.metadata, null, 2)}
                                                            </pre>
                                                        </div>

                                                        {/* Action Steps */}
                                                        {zap.actions.map((action, idx) => {
                                                            const stepIndex = idx + 1;
                                                            const stepDetails = run.metadata?.steps?.[String(idx)] || run.metadata?.steps?.[idx];

                                                            return (
                                                                <div key={action.id} className="space-y-2 pt-3 border-t border-[rgba(163,230,53,0.04)]">
                                                                    <div className="flex justify-between items-center">
                                                                        <div className="text-[9px] font-bold uppercase tracking-wider text-[#4a6a4a]">
                                                                            Step {stepIndex} — {action.type.name}
                                                                        </div>
                                                                        {stepDetails?.error ? (
                                                                            <span className="text-[9px] font-bold uppercase text-red-400 bg-red-950/50 border border-red-800/40 px-1.5 py-0.5 rounded">Error</span>
                                                                        ) : stepDetails ? (
                                                                            <span className="text-[9px] font-bold uppercase text-green-400 bg-green-950/50 border border-green-800/40 px-1.5 py-0.5 rounded">Completed</span>
                                                                        ) : (
                                                                            <span className="text-[9px] font-bold uppercase text-[#4a6a4a] bg-[#0a0f0a] border border-[rgba(163,230,53,0.08)] px-1.5 py-0.5 rounded">Pending</span>
                                                                        )}
                                                                    </div>

                                                                    <pre className={`p-4 rounded-xl text-xs font-mono overflow-auto max-h-[180px] border ${stepDetails?.error ? 'bg-red-950/20 border-red-900/30 text-red-400' : 'bg-[#060a06] border-[rgba(163,230,53,0.06)] text-[#a3e635]'}`}>
                                                                        {stepDetails
                                                                            ? JSON.stringify(stepDetails, null, 2)
                                                                            : "{\n  \"status\": \"Waiting for preceding steps...\"\n}"}
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

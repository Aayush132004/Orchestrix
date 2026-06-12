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

// Returns a safe image URL for action types — replaces Postman logo with HTTP icon
function getSafeImage(actionId: string, image: string): string {
    if (actionId === 'http' || actionId === 'http-request' ||
        (image && image.includes('postman'))) {
        return 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjYTNlNjM1IiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PHBhdGggZD0iTTE2IDRsNCA0LTQgNCIvPjxwYXRoIGQ9Ik0yMCA4SDQiLz48cGF0aCBkPSJNOCAyMGwtNC00IDQtNCIvPjxwYXRoIGQ9Ik00IDE2aDE2Ii8+PC9zdmc+';
    }
    return image;
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
          <div className="min-h-screen bg-[#0a0f0a] flex items-center justify-center">
            <div className="flex flex-col items-center gap-3">
              <div className="w-10 h-10 border-4 border-[#a3e635] border-t-transparent rounded-full animate-spin"></div>
              <p className="text-[#6b8c6b] text-sm font-semibold tracking-wider">Loading your dashboard...</p>
            </div>
          </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0a0f0a] text-white flex flex-col">
            <Appbar />

            <main className="flex-1 max-w-6xl w-full mx-auto px-6 py-10">
                <div className="flex justify-between items-end border-b border-[rgba(163,230,53,0.1)] pb-6 mb-8">
                    <div className="space-y-1">
                        <h1 className="text-3xl font-black tracking-tight text-white">
                            My Zaps
                        </h1>
                        <p className="text-sm text-[#4a6a4a]">Manage, launch, and monitor your active webhook automations.</p>
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
                        <div className="w-8 h-8 border-2 border-[#a3e635] border-t-transparent rounded-full animate-spin"></div>
                        <p className="text-[#6b8c6b] text-sm font-medium">Fetching your zaps...</p>
                    </div>
                ) : validZaps.length === 0 ? (
                    <div className="flex flex-col items-center justify-center border border-[rgba(163,230,53,0.08)] bg-[#111711] rounded-3xl py-20 px-6 text-center">
                        <div className="w-12 h-12 rounded-2xl border border-[rgba(163,230,53,0.15)] bg-[rgba(163,230,53,0.05)] flex items-center justify-center mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#a3e635" className="w-6 h-6 opacity-60">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-bold text-white">No zap instances run yet</h3>
                        <p className="text-sm text-[#4a6a4a] mt-2 max-w-sm leading-relaxed">
                            Create your first zap to start automating webhook-triggered workflows.
                        </p>
                        <div className="mt-6">
                            <DarkButton onClick={() => router.push("/zap/create")}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                </svg>
                                Build a Zap
                            </DarkButton>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col gap-4">
                        <ZapTable zaps={validZaps} getSafeImage={getSafeImage} />
                    </div>
                )}
            </main>
        </div>
    );
}

function ZapTable({ zaps, getSafeImage }: { zaps: Zap[], getSafeImage: (id: string, img: string) => string }) {
    const router = useRouter();

    return (
        <div className="grid grid-cols-1 gap-3">
            {zaps.map(z => (
                <div key={z.id} className="bg-[#111711] border border-[rgba(163,230,53,0.1)] rounded-2xl hover:border-[rgba(163,230,53,0.25)] hover:shadow-[0_0_30px_rgba(163,230,53,0.04)] transition-all duration-300 p-5 flex flex-col md:flex-row md:items-center justify-between gap-5 group">

                    {/* Left: Zap Visual Flow */}
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-3">
                            <span className="text-[9px] font-bold uppercase tracking-wider text-[#a3e635] bg-[rgba(163,230,53,0.1)] px-2 py-0.5 rounded-full border border-[rgba(163,230,53,0.2)]">
                                Active
                            </span>
                            <span className="text-xs font-mono text-[#4a6a4a] truncate" title={z.id}>
                                {z.id.substring(0, 8)}...
                            </span>
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                            {/* Trigger Badge */}
                            <div className="inline-flex items-center gap-2 bg-[rgba(163,230,53,0.06)] border border-[rgba(163,230,53,0.15)] pl-2 pr-3 py-1.5 rounded-xl shrink-0">
                                {z.trigger?.type?.image ? (
                                    <img
                                        src={getSafeImage(z.trigger.triggerId, z.trigger.type.image)}
                                        className="w-5 h-5 object-contain rounded"
                                        alt={z.trigger.type.name}
                                    />
                                ) : (
                                    <div className="w-5 h-5 rounded bg-[rgba(163,230,53,0.2)] flex items-center justify-center text-[10px] font-bold text-[#a3e635]">T</div>
                                )}
                                <span className="text-xs font-semibold text-[#c8e6a0]">{z.trigger?.type?.name || "No Trigger"}</span>
                            </div>

                            <div className="text-[#2a4a2a]">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                </svg>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center flex-wrap gap-2">
                                {z.actions.map((x, idx) => (
                                    <div key={x.id} className="flex items-center gap-2">
                                        <div className="inline-flex items-center gap-2 bg-[#0a0f0a] border border-[rgba(163,230,53,0.08)] pl-2 pr-3 py-1.5 rounded-xl shrink-0">
                                            {x.type?.image ? (
                                                <img
                                                    src={getSafeImage(x.actionId, x.type.image)}
                                                    className="w-5 h-5 object-contain rounded"
                                                    alt={x.type.name}
                                                />
                                            ) : (
                                                <div className="w-5 h-5 rounded bg-[rgba(163,230,53,0.1)] flex items-center justify-center text-[10px] font-bold text-[#a3e635]">A</div>
                                            )}
                                            <span className="text-xs font-semibold text-[#9ca3a0]">{x.type?.name || "No Action"}</span>
                                        </div>
                                        {idx < z.actions.length - 1 && (
                                            <span className="text-[#2a4a2a]">
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

                    {/* Right: Copy Webhook & Actions */}
                    <div className="flex items-center gap-4 shrink-0 border-t border-[rgba(163,230,53,0.06)] pt-4 md:border-t-0 md:pt-0">
                        <div className="flex flex-col gap-1 items-end">
                            <span className="text-[9px] font-bold uppercase tracking-wider text-[#4a6a4a] pr-1">Webhook endpoint</span>
                            <WebhookCopyButton url={`${HOOKS_URL}/hooks/catch/1/${z.id}`} />
                        </div>

                        <div className="h-8 w-[1px] bg-[rgba(163,230,53,0.08)] hidden md:block"></div>

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
            className="flex items-center gap-2 bg-[#0a0f0a] hover:bg-[rgba(163,230,53,0.05)] active:scale-[0.98] border border-[rgba(163,230,53,0.12)] hover:border-[rgba(163,230,53,0.25)] rounded-xl px-3 py-1.5 font-mono text-[11px] text-[#6b8c6b] transition-all duration-150 cursor-pointer"
        >
            <span className="max-w-[150px] truncate">{url.replace(/^https?:\/\//, '')}</span>
            {copied ? (
                <span className="text-[#a3e635] font-semibold flex items-center gap-0.5 animate-scale-in">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-3.5 h-3.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    <span>Copied</span>
                </span>
            ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H5.4m1.5 13.5h9.75a1.125 1.125 0 001.125-1.125V7.875a1.125 1.125 0 00-1.125-1.125H9.75a1.125 1.125 0 00-1.125 1.125V18a1.125 1.125 0 001.125 1.125z" />
                </svg>
            )}
        </button>
    );
}
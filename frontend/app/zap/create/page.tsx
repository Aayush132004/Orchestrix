"use client"
import Appbar from "@/components/Appbar";
import { useEffect, useState } from "react";
import ZapCell from "@/components/ZapCell";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import SecondaryButton from "@/components/buttons/SecondaryButton";
import { BACKEND_URL, HOOKS_URL } from "@/app/config";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Input } from "@/components/Input";

// Hook to fetch available triggers and actions
function useAvailableActionsAndTriggers(token: string | null) {
    const [availableActions, setAvailableActions] = useState([]);
    const [availableTriggers, setAvailableTriggers] = useState([]);

    useEffect(() => {
        if (!token) return;
        axios.get(`${BACKEND_URL}/api/v1/trigger/available`).then((x: { data: { availableTriggers: any } }) => setAvailableTriggers(x.data.availableTriggers));
        axios.get(`${BACKEND_URL}/api/v1/action/available`).then((x: { data: { availableActions: any } }) => setAvailableActions(x.data.availableActions));
    }, [token]);

    return {
        availableActions,
        availableTriggers
    }
}

export default function CreateZap() {
    const router = useRouter();
    const [token, setToken] = useState<string | null>(null);
    const [checkingAuth, setCheckingAuth] = useState(true);
    const [zapId, setZapId] = useState("");
    const [testPayload, setTestPayload] = useState<any>(null);
    const [fetchingPayload, setFetchingPayload] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (!storedToken) {
            router.push("/login");
        } else {
            setToken(storedToken);
            setZapId(crypto.randomUUID());
            setCheckingAuth(false);
        }
    }, [router]);

    const { availableActions, availableTriggers } = useAvailableActionsAndTriggers(token);

    const [selectedTrigger, setSelectedTrigger] = useState<{
        id: string,
        name: string;
    }>();

    const [selectedActions, setSelectedActions] = useState<{
        index: number,
        availableActionId: string,
        availableActionName: string,
        metadata: any
    }[]>([]);

    const [selectedModalIndex, setSelectedModalIndex] = useState<null | number>(null);
    const [isPublishing, setIsPublishing] = useState(false);

    const fetchLatestPayload = async () => {
        if (!zapId) return;
        setFetchingPayload(true);
        try {
            const res = await axios.get(`${BACKEND_URL}/api/v1/zap/${zapId}/test-payload`, {
                headers: { Authorization: token }
            });
            if (res.data.testPayload) {
                setTestPayload(res.data.testPayload);
            } else {
                alert("No test payload received yet. Please hit the test webhook first.");
            }
        } catch (e) {
            console.error("Error fetching test payload:", e);
        } finally {
            setFetchingPayload(false);
        }
    };

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

    const handlePublish = async () => {
        if (!selectedTrigger?.id) {
            alert("Please select a trigger to publish the workflow.");
            return;
        }
        if (selectedActions.length === 0) {
            alert("Please add at least one action to publish the workflow.");
            return;
        }
        const emptyActions = selectedActions.filter(a => !a.availableActionId || a.availableActionId.trim() === "");
        if (emptyActions.length > 0) {
            alert("Please configure all action steps (or remove empty ones) before publishing.");
            return;
        }
        setIsPublishing(true);
        try {
            await axios.post(`${BACKEND_URL}/api/v1/zap`, {
                zapId,
                "availableTriggerId": selectedTrigger.id,
                "triggerMetadata": {},
                "actions": selectedActions.map(a => ({
                    availableActionId: a.availableActionId,
                    actionMetadata: a.metadata || {}
                }))
            }, {
                headers: {
                    Authorization: token
                }
            });
            router.push("/dashboard");
        } catch (e) {
            console.error("Error publishing workflow:", e);
            alert("Failed to publish the Zap workflow.");
        } finally {
            setIsPublishing(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0a0f0a] flex flex-col relative">
            <Appbar />

            {/* Control Header */}
            <div className="bg-[#111711] border-b border-[rgba(163,230,53,0.1)] px-8 py-4 flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => router.push("/dashboard")}
                        className="text-[#4a6a4a] hover:text-[#a3e635] transition-colors p-1.5 hover:bg-[rgba(163,230,53,0.08)] rounded-lg"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                        </svg>
                    </button>
                    <div>
                        <h1 className="text-lg font-bold text-white tracking-tight">Create Zap</h1>
                        <p className="text-xs text-[#4a6a4a]">Design your sequential automation step-by-step.</p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <SecondaryButton onClick={() => setSidebarOpen(!sidebarOpen)}>
                        <span className="flex items-center gap-1.5">
                            <span className={`w-2 h-2 rounded-full ${testPayload ? 'bg-green-500' : 'bg-red-400 animate-pulse'}`}></span>
                            <span>{testPayload ? 'Test Data Loaded' : 'Test Trigger'}</span>
                        </span>
                    </SecondaryButton>
                    <SecondaryButton onClick={() => router.push("/dashboard")}>Cancel</SecondaryButton>
                    <PrimaryButton onClick={handlePublish}>
                        {isPublishing ? "Publishing..." : "Publish Zap"}
                    </PrimaryButton>
                </div>
            </div>

            {/* Split Screen Design: Main Canvas and Test Trigger Sidebar */}
            <div className="flex-1 flex overflow-hidden">
                {/* Visual Workflow Canvas */}
                <div className="flex-1 flex flex-col items-center justify-center p-8 relative overflow-y-auto bg-[radial-gradient(rgba(163,230,53,0.08)_1px,transparent_1px)] [background-size:28px_28px]">
                    <div className="flex flex-col items-center w-full max-w-xl">

                        {/* Node 1: Trigger */}
                        <div className="flex flex-col items-center w-full">
                            <ZapCell
                                onClick={() => setSelectedModalIndex(1)}
                                name={selectedTrigger?.name ? selectedTrigger.name : undefined}
                                index={1}
                            />
                        </div>

                        {/* Actions and Connectors */}
                        {selectedActions.map((action, index) => {
                            const cellIndex = action.index || (index + 2);
                            return (
                                <div key={action.index || index} className="w-full flex flex-col items-center relative group/cell">
                                    {/* Vertical Connector Line */}
                                    <div className="h-10 w-[2px] bg-[rgba(163,230,53,0.2)] relative my-1">
                                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 border-t-[6px] border-t-[rgba(163,230,53,0.4)] border-x-[4px] border-x-transparent w-0 h-0"></div>
                                    </div>

                                    <div className="relative flex items-center justify-center w-full">
                                        <ZapCell
                                            onClick={() => setSelectedModalIndex(cellIndex)}
                                            name={action.availableActionName ? action.availableActionName : undefined}
                                            index={cellIndex}
                                        />
                                        <button
                                            type="button"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setSelectedActions(actions => {
                                                    const filtered = actions.filter((_, idx) => idx !== index);
                                                    // Re-index remaining actions to be sequential
                                                    return filtered.map((act, idx) => ({
                                                        ...act,
                                                        index: idx + 2
                                                    }));
                                                });
                                            }}
                                            className="absolute right-[calc(50%-182px)] top-[22px] w-7 h-7 bg-red-50 hover:bg-red-100 text-red-500 rounded-full flex items-center justify-center border border-red-200/50 opacity-0 group-hover/cell:opacity-100 transition-opacity shadow-sm hover:scale-105 active:scale-95 cursor-pointer z-10"
                                            title="Remove action step"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            );
                        })}

                        {/* Vertical Connector before Add Button */}
                        <div className="h-10 w-[2px] bg-[rgba(163,230,53,0.2)] relative my-1">
                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 border-t-[6px] border-t-[rgba(163,230,53,0.4)] border-x-[4px] border-x-transparent w-0 h-0"></div>
                        </div>

                        {/* Add Action Action Node */}
                        <button
                            onClick={() => {
                                setSelectedActions(a => [...a, {
                                    index: a.length + 2,
                                    availableActionId: "",
                                    availableActionName: "",
                                    metadata: {}
                                }])
                            }}
                            className="w-11 h-11 bg-[rgba(163,230,53,0.1)] hover:bg-[rgba(163,230,53,0.18)] border border-[rgba(163,230,53,0.25)] hover:border-[rgba(163,230,53,0.5)] rounded-full flex items-center justify-center text-[#a3e635] hover:shadow-[0_0_20px_rgba(163,230,53,0.2)] active:scale-95 transition-all duration-200 cursor-pointer"
                            title="Add action step"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Sidebar */}
                {sidebarOpen && (
                    <div className="w-[380px] bg-[#111711] border-l border-[rgba(163,230,53,0.1)] shadow-xl flex flex-col animate-slide-in relative z-45">
                        <div className="p-6 border-b border-[rgba(163,230,53,0.08)] flex justify-between items-center bg-[#0d120d]">
                            <div>
                                <h3 className="font-bold text-white text-sm">Test Webhook Trigger</h3>
                                <p className="text-[11px] text-[#4a6a4a]">Capture test requests to your webhook</p>
                            </div>
                            <button
                                onClick={() => setSidebarOpen(false)}
                                className="text-[#4a6a4a] hover:text-[#a3e635] p-1 hover:bg-[rgba(163,230,53,0.08)] rounded-lg"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="p-6 flex-1 overflow-y-auto space-y-5">
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-wider text-[#4a6a4a]">Test Webhook URL</label>
                                <div className="p-3 bg-[#0a0f0a] border border-[rgba(163,230,53,0.12)] rounded-xl font-mono text-xs text-[#6b8c6b] select-all break-all">
                                    {`${HOOKS_URL}/hooks/catch/1/${zapId}/test`}
                                </div>
                                <p className="text-[11px] text-[#4a6a4a] leading-normal">Send a POST request with any JSON payload using curl or a custom script to populate test variables.</p>
                            </div>

                            <div className="pt-2">
                                <SecondaryButton onClick={fetchLatestPayload} size="small">
                                    {fetchingPayload ? "Listening..." : "Fetch Latest Payload"}
                                </SecondaryButton>
                            </div>

                            {testPayload ? (
                                <div className="space-y-2 animate-scale-in">
                                    <div className="flex justify-between items-center">
                                        <label className="text-[10px] font-bold uppercase tracking-wider text-[#4a6a4a]">Last Received Payload</label>
                                        <span className="text-[10px] font-semibold text-green-400 bg-green-950/50 border border-green-800/40 px-1.5 py-0.5 rounded">Received</span>
                                    </div>
                                    <pre className="p-4 bg-[#060a06] border border-[rgba(163,230,53,0.06)] text-[#a3e635] rounded-xl text-[11px] font-mono overflow-auto max-h-[200px]">
                                        {JSON.stringify(testPayload, null, 2)}
                                    </pre>
                                    <div className="text-[11px] text-[#4a6a4a] leading-normal">
                                        Reference keys in later steps as <code className="bg-[rgba(163,230,53,0.08)] px-1 py-0.5 rounded text-[#a3e635] font-bold">{`{body.your_key}`}</code>.
                                    </div>
                                </div>
                            ) : (
                                <div className="border border-dashed border-[rgba(163,230,53,0.1)] rounded-2xl p-6 text-center text-[#4a6a4a] text-xs">
                                    Waiting for webhook hits...
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* Modal Layer */}
            {selectedModalIndex !== null && (
                <Modal
                    availableItems={selectedModalIndex === 1 ? availableTriggers : availableActions}
                    index={selectedModalIndex}
                    testPayload={testPayload}
                    selectedActions={selectedActions}
                    onSelect={(props: null | { name: string; id: string; metadata: any }) => {
                        if (props === null) {
                            setSelectedModalIndex(null);
                            return;
                        }
                        if (selectedModalIndex === 1) {
                            setSelectedTrigger({
                                id: props.id,
                                name: props.name,
                            })
                        } else {
                            setSelectedActions(a => {
                                let newActions = [...a];
                                newActions[selectedModalIndex - 2] = {
                                    index: selectedModalIndex,
                                    availableActionId: props.id,
                                    availableActionName: props.name,
                                    metadata: props.metadata
                                }
                                return newActions;
                            })
                        }
                        setSelectedModalIndex(null);
                    }}
                />
            )}
        </div>
    )
}

function Modal({ index, onSelect, availableItems, testPayload, selectedActions }: { index: number, onSelect: (props: null | { name: string; id: string; metadata: any }) => void, availableItems: { id: string, name: string, image: string; }[], testPayload: any, selectedActions: any[] }) {
    const [step, setStep] = useState(0)
    const isTrigger = index === 1
    const [selectedAction, setSelectedAction] = useState<{
        name: string,
        id: string,
    }>();

    const prevActions = selectedActions.filter(a => a.index < index);

    return (
        <div className="fixed inset-0 z-[100] bg-[rgba(10,15,10,0.7)] backdrop-blur-md flex justify-center items-center p-4">
            <div className="relative bg-[#111711] rounded-3xl shadow-[0_25px_70px_rgba(0,0,0,0.8)] w-full max-w-xl overflow-hidden border border-[rgba(163,230,53,0.12)] animate-scale-in">

                {/* Modal Header */}
                <div className="flex items-center justify-between p-6 border-b border-[rgba(163,230,53,0.1)]">
                    <div>
                        <h3 className="text-lg font-bold text-white">
                            Select {index === 1 ? "Trigger Source" : "Workflow Action"}
                        </h3>
                        <p className="text-xs text-[#6b8c6b] mt-0.5">
                            {step === 0 ? "Select from available integrations." : `Configure ${selectedAction?.name}`}
                        </p>
                    </div>
                    <button
                        onClick={() => onSelect(null)}
                        className="text-[#4a6a4a] hover:text-[#a3e635] p-1.5 hover:bg-[rgba(163,230,53,0.08)] rounded-xl transition-all"
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Modal Content */}
                <div className="p-6 overflow-y-auto max-h-[500px]">
                    {/* Action Form Configure Step */}
                    {step === 1 && selectedAction?.id === "send-email" && (
                        <EmailSelector testPayload={testPayload} previousActions={prevActions} setMetadata={(metadata) => {
                            onSelect({
                                ...selectedAction,
                                metadata
                            })
                        }} />
                    )}

                    {step === 1 && selectedAction?.id === "http-request" && (
                        <HttpSelector testPayload={testPayload} previousActions={prevActions} setMetadata={(metadata) => {
                            onSelect({
                                ...selectedAction,
                                metadata
                            })
                        }} />
                    )}

                    {step === 1 && selectedAction?.id === "ai-action" && (
                        <AISelector testPayload={testPayload} previousActions={prevActions} setMetadata={(metadata) => {
                            onSelect({
                                ...selectedAction,
                                metadata
                            })
                        }} />
                    )}

                    {step === 1 && selectedAction?.id === "discord-webhook" && (
                        <DiscordSelector testPayload={testPayload} previousActions={prevActions} setMetadata={(metadata) => {
                            onSelect({
                                ...selectedAction,
                                metadata
                            })
                        }} />
                    )}

                    {/* Step 0: Choose App */}
                    {step === 0 && (
                        <div className="grid grid-cols-1 gap-2.5 max-h-[350px] overflow-y-auto pr-1">
                            {availableItems.map(({ id, name, image }) => (
                                <div
                                    key={id}
                                    onClick={() => {
                                        if (isTrigger) {
                                            onSelect({
                                                id,
                                                name,
                                                metadata: {}
                                            })
                                        } else {
                                            setStep(1)
                                            setSelectedAction({
                                                id,
                                                name
                                            })
                                        }
                                    }}
                                    className="flex border border-[rgba(163,230,53,0.08)] rounded-2xl p-4 cursor-pointer bg-[rgba(163,230,53,0.02)] hover:bg-[rgba(163,230,53,0.05)] hover:border-[rgba(163,230,53,0.25)] active:scale-[0.99] transition-all items-center gap-4 group"
                                >
                                    <div className="w-10 h-10 rounded-xl bg-[#0a0f0a] border border-[rgba(163,230,53,0.1)] flex items-center justify-center shadow-inner shrink-0 group-hover:scale-105 transition-transform">
                                        <img src={image} className="w-6 h-6 object-contain rounded" alt={name} />
                                    </div>
                                    <div className="flex-1">
                                        <div className="font-bold text-white text-sm group-hover:text-[#a3e635] transition-colors">{name}</div>
                                        <div className="text-xs text-[#4a6a4a]">Click to connect this service</div>
                                    </div>
                                    <div className="text-[#4a6a4a] group-hover:text-[#a3e635] transition-colors">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                                        </svg>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

// Custom Variable Helper for configuration screens
function getPaths(obj: any, prefix = ""): string[] {
    if (!obj || typeof obj !== "object") return [];
    let paths: string[] = [];
    Object.entries(obj).forEach(([key, val]) => {
        const path = prefix ? `${prefix}.${key}` : key;
        paths.push(path);
        if (val && typeof val === "object" && !Array.isArray(val)) {
            paths = paths.concat(getPaths(val, path));
        }
    });
    return paths;
}

function VariablesHelper({ testPayload, previousActions }: { testPayload: any; previousActions?: any[] }) {
    const suggestions: string[] = [];

    // Trigger variables
    if (testPayload && typeof testPayload === "object") {
        Object.keys(testPayload).forEach(key => {
            suggestions.push(`body.${key}`);
        });
    }

    // Previous actions variables
    if (previousActions && Array.isArray(previousActions)) {
        previousActions.forEach(action => {
            const stepNum = action.index - 1;
            const stepPrefix = `step${stepNum}`;
            const sampleOutput = action.metadata?.sampleOutput;
            if (sampleOutput) {
                const paths = getPaths(sampleOutput);
                paths.forEach(p => suggestions.push(`${stepPrefix}.${p}`));
            } else {
                if (action.availableActionId === "http-request") {
                    suggestions.push(`${stepPrefix}.status`);
                    suggestions.push(`${stepPrefix}.body`);
                } else if (action.availableActionId === "ai-action") {
                    suggestions.push(`${stepPrefix}.output`);
                } else {
                    suggestions.push(`${stepPrefix}.success`);
                }
            }
        });
    }

    if (suggestions.length === 0) return null;

    return (
        <div className="bg-[#0a0f0a] border border-[rgba(163,230,53,0.12)] rounded-xl p-3.5 space-y-1.5">
            <div className="text-[10px] font-bold uppercase tracking-wider text-[#4a6a4a]">Available Variables (Click to copy):</div>
            <div className="flex flex-wrap gap-1.5 max-h-[120px] overflow-y-auto">
                {suggestions.map(variable => (
                    <code 
                        key={variable} 
                        onClick={() => {
                            navigator.clipboard.writeText(`{${variable}}`);
                        }}
                        className="bg-[#111711] hover:bg-[rgba(163,230,53,0.08)] hover:text-[#a3e635] hover:border-[rgba(163,230,53,0.3)] border border-[rgba(163,230,53,0.1)] px-1.5 py-0.5 rounded text-[10px] font-mono text-[#6b8c6b] select-all cursor-pointer transition-all" 
                        title={`Click to copy {${variable}}`}
                    >
                        {`{${variable}}`}
                    </code>
                ))}
            </div>
        </div>
    );
}

function EmailSelector({ setMetadata, testPayload, previousActions }: { setMetadata: (params: any) => void, testPayload: any, previousActions: any[] }) {
    const [email, setEmail] = useState("");
    const [body, setBody] = useState("");

    return (
        <div className="space-y-4">
            <VariablesHelper testPayload={testPayload} previousActions={previousActions} />
            <Input onChange={(e) => setEmail(e.target.value)} label="Recipient Email" type="text" placeholder="customer@domain.com" />
            <Input onChange={(e) => setBody(e.target.value)} label="Email Body Text" type="text" placeholder="Hi {body.name}, thank you!" />

            <div className="pt-4 flex justify-end">
                <PrimaryButton onClick={() => setMetadata({ email, body })}>
                    Confirm Email Step
                </PrimaryButton>
            </div>
        </div>
    );
}

function HttpSelector({ testPayload, setMetadata, previousActions }: { testPayload: any, setMetadata: (params: any) => void, previousActions: any[] }) {
    const [method, setMethod] = useState("GET");
    const [url, setUrl] = useState("");
    const [authType, setAuthType] = useState("None");
    const [authToken, setAuthToken] = useState("");
    const [authUsername, setAuthUsername] = useState("");
    const [authPassword, setAuthPassword] = useState("");
    const [authKey, setAuthKey] = useState("");
    const [authValue, setAuthValue] = useState("");
    const [headers, setHeaders] = useState("{}");
    const [body, setBody] = useState("");

    const [testResult, setTestResult] = useState<any>(null);
    const [testing, setTesting] = useState(false);

    const handleTest = async () => {
        setTesting(true);
        setTestResult(null);
        try {
            let parsedHeaders = {};
            try { parsedHeaders = JSON.parse(headers); } catch (e) { }

            const auth: any = { type: authType };
            if (authType === "Bearer") auth.token = authToken;
            else if (authType === "Basic") { auth.username = authUsername; auth.password = authPassword; }
            else if (authType === "APIKey") { auth.key = authKey; auth.value = authValue; }

            const res = await axios.post(`${BACKEND_URL}/api/v1/action/test-http`, {
                method,
                url,
                auth,
                headers: parsedHeaders,
                body,
                testPayload
            }, {
                headers: { Authorization: localStorage.getItem("token") }
            });
            setTestResult(res.data);
        } catch (e: any) {
            setTestResult({ error: e.response?.data?.message || e.message });
        } finally {
            setTesting(false);
        }
    };

    const handleConfirm = () => {
        let parsedHeaders = {};
        try { parsedHeaders = JSON.parse(headers); } catch (e) { }

        const auth: any = { type: authType };
        if (authType === "Bearer") auth.token = authToken;
        else if (authType === "Basic") { auth.username = authUsername; auth.password = authPassword; }
        else if (authType === "APIKey") { auth.key = authKey; auth.value = authValue; }

        setMetadata({
            method,
            url,
            auth,
            headers: parsedHeaders,
            body,
            sampleOutput: testResult || null
        });
    };

    return (
        <div className="space-y-4">
            <VariablesHelper testPayload={testPayload} previousActions={previousActions} />

            <div className="grid grid-cols-3 gap-3">
                <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-[#6b8c6b]">Method</label>
                    <select
                        value={method}
                        onChange={(e) => setMethod(e.target.value)}
                        className="w-full mt-1.5 px-3 py-2.5 text-sm bg-[#0a0f0a] text-white border border-[rgba(163,230,53,0.15)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#a3e635]/30 focus:border-[#a3e635] transition-all duration-200"
                    >
                        <option value="GET">GET</option>
                        <option value="POST">POST</option>
                        <option value="PUT">PUT</option>
                        <option value="DELETE">DELETE</option>
                    </select>
                </div>
                <div className="col-span-2">
                    <Input onChange={(e) => setUrl(e.target.value)} label="URL" type="text" placeholder="https://api.github.com/repos/{body.user}" />
                </div>
            </div>

            {/* Auth section */}
            <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#6b8c6b]">Auth Method</label>
                <select
                    value={authType}
                    onChange={(e) => setAuthType(e.target.value)}
                    className="w-full mt-1.5 px-3 py-2.5 text-sm bg-[#0a0f0a] text-white border border-[rgba(163,230,53,0.15)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#a3e635]/30 focus:border-[#a3e635] transition-all duration-200"
                >
                    <option value="None">None</option>
                    <option value="Bearer">Bearer Token</option>
                    <option value="Basic">Basic Auth</option>
                    <option value="APIKey">API Key Header</option>
                </select>
            </div>

            {authType === "Bearer" && (
                <Input onChange={(e) => setAuthToken(e.target.value)} label="Bearer Token" type="text" placeholder="Token value" />
            )}

            {authType === "Basic" && (
                <div className="grid grid-cols-2 gap-3">
                    <Input onChange={(e) => setAuthUsername(e.target.value)} label="Username" type="text" placeholder="Username" />
                    <Input onChange={(e) => setAuthPassword(e.target.value)} label="Password" type="password" placeholder="Password" />
                </div>
            )}

            {authType === "APIKey" && (
                <div className="grid grid-cols-2 gap-3">
                    <Input onChange={(e) => setAuthKey(e.target.value)} label="Header Key Name" type="text" placeholder="X-API-Key" />
                    <Input onChange={(e) => setAuthValue(e.target.value)} label="Key Value" type="text" placeholder="api_key_value" />
                </div>
            )}

            <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-wider text-[#6b8c6b]">JSON Headers</label>
                <textarea
                    value={headers}
                    onChange={(e) => setHeaders(e.target.value)}
                    placeholder='{"Content-Type": "application/json"}'
                    className="w-full mt-1.5 px-4 py-3 text-sm bg-[#0a0f0a] text-white border border-[rgba(163,230,53,0.15)] placeholder-[#4a6a4a] rounded-xl focus:outline-none focus:ring-4 focus:ring-[#a3e635]/10 focus:border-[#a3e635] h-[60px] transition-all duration-200"
                />
            </div>

            {(method !== "GET" && method !== "DELETE") && (
                <div className="space-y-1">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#6b8c6b]">Request Body</label>
                    <textarea
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        placeholder='{"title": "Bug: {body.issue}"}'
                        className="w-full mt-1.5 px-4 py-3 text-sm bg-[#0a0f0a] text-white border border-[rgba(163,230,53,0.15)] placeholder-[#4a6a4a] rounded-xl focus:outline-none focus:ring-4 focus:ring-[#a3e635]/10 focus:border-[#a3e635] h-[80px] transition-all duration-200"
                    />
                </div>
            )}

            {/* Sandbox Tester Output */}
            {testResult && (
                <div className="p-4 bg-[#060a06] border border-[rgba(163,230,53,0.08)] rounded-2xl text-[11px] font-mono text-[#a3e635] overflow-auto max-h-[150px] space-y-1">
                    <div className="text-[10px] font-bold text-[#4a6a4a]">Response output:</div>
                    <pre>{JSON.stringify(testResult, null, 2)}</pre>
                </div>
            )}

            <div className="pt-4 flex justify-between">
                <SecondaryButton onClick={handleTest}>
                    {testing ? "Testing..." : "Test HTTP Request"}
                </SecondaryButton>
                <PrimaryButton onClick={handleConfirm}>
                    Confirm Action
                </PrimaryButton>
            </div>
        </div>
    );
}

function AISelector({ testPayload, setMetadata, previousActions }: { testPayload: any, setMetadata: (params: any) => void, previousActions: any[] }) {
    const [prompt, setPrompt] = useState("");
    const [schema, setSchema] = useState("");
    const [testResult, setTestResult] = useState<any>(null);
    const [testing, setTesting] = useState(false);

    const handleTest = async () => {
        setTesting(true);
        setTestResult(null);
        try {
            let parsedSchema = {};
            if (schema.trim()) {
                try {
                    parsedSchema = JSON.parse(schema);
                } catch (e) {
                    alert("Invalid JSON format in Output JSON Schema. Please make sure it is valid JSON (e.g. key-value pairs with double quotes, separated by commas, and enclosed in curly braces).");
                    setTesting(false);
                    return;
                }
            }

            const res = await axios.post(`${BACKEND_URL}/api/v1/action/test-ai`, {
                prompt,
                schema: parsedSchema,
                testPayload
            }, {
                headers: { Authorization: localStorage.getItem("token") }
            });
            setTestResult(res.data);
        } catch (e: any) {
            setTestResult({ error: e.response?.data?.message || e.message });
        } finally {
            setTesting(false);
        }
    };

    const handleConfirm = () => {
        let parsedSchema = {};
        if (schema.trim()) {
            try {
                parsedSchema = JSON.parse(schema);
            } catch (e) {
                alert("Invalid JSON format in Output JSON Schema. Please fix it before confirming.");
                return;
            }
        }

        setMetadata({
            prompt,
            schema: parsedSchema,
            sampleOutput: testResult || null
        });
    };

    return (
        <div className="space-y-4">
            <VariablesHelper testPayload={testPayload} previousActions={previousActions} />

            <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-wider text-[#6b8c6b]">AI Prompt Instruction</label>
                <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Extract sentiment and key tags from: {body.comment}"
                    className="w-full mt-1.5 px-4 py-3 text-sm bg-[#0a0f0a] text-white border border-[rgba(163,230,53,0.15)] placeholder-[#4a6a4a] rounded-xl focus:outline-none focus:ring-4 focus:ring-[#a3e635]/10 focus:border-[#a3e635] h-[80px] transition-all duration-200"
                />
            </div>

            <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-wider text-[#6b8c6b]">Output JSON Schema (Key: Description)</label>
                <textarea
                    value={schema}
                    onChange={(e) => setSchema(e.target.value)}
                    placeholder='{"sentiment": "Classification (positive/negative)", "tags": "Comma-separated topics"}'
                    className="w-full mt-1.5 px-4 py-3 text-sm bg-[#0a0f0a] text-white border border-[rgba(163,230,53,0.15)] placeholder-[#4a6a4a] rounded-xl focus:outline-none focus:ring-4 focus:ring-[#a3e635]/10 focus:border-[#a3e635] h-[80px] transition-all duration-200"
                />
            </div>

            {testResult && (
                <div className="p-4 bg-[#060a06] border border-[rgba(163,230,53,0.08)] rounded-2xl text-[11px] font-mono text-[#a3e635] overflow-auto max-h-[150px]">
                    <div className="text-[10px] font-bold text-[#4a6a4a]">Response output:</div>
                    <pre>{JSON.stringify(testResult, null, 2)}</pre>
                </div>
            )}

            <div className="pt-4 flex justify-between">
                <SecondaryButton onClick={handleTest}>
                    {testing ? "Testing..." : "Test AI Model"}
                </SecondaryButton>
                <PrimaryButton onClick={handleConfirm}>
                    Confirm Action
                </PrimaryButton>
            </div>
        </div>
    );
}

function DiscordSelector({ setMetadata, testPayload, previousActions }: { setMetadata: (params: any) => void, testPayload: any, previousActions: any[] }) {
    const [webhookUrl, setWebhookUrl] = useState("");
    const [content, setContent] = useState("");
    const [testResult, setTestResult] = useState<any>(null);
    const [testing, setTesting] = useState(false);

    const handleTest = async () => {
        if (!webhookUrl) {
            alert("Please enter a Discord Webhook URL first.");
            return;
        }
        setTesting(true);
        setTestResult(null);
        try {
            const res = await axios.post(`${BACKEND_URL}/api/v1/action/test-discord`, {
                webhookUrl,
                content,
                testPayload
            }, {
                headers: { Authorization: localStorage.getItem("token") }
            });
            setTestResult(res.data);
        } catch (e: any) {
            setTestResult({ error: e.response?.data?.message || e.message });
        } finally {
            setTesting(false);
        }
    };

    return (
        <div className="space-y-4">
            <VariablesHelper testPayload={testPayload} previousActions={previousActions} />
            <Input onChange={(e) => setWebhookUrl(e.target.value)} label="Discord Webhook URL" type="text" placeholder="https://discord.com/api/webhooks/..." />
            <Input onChange={(e) => setContent(e.target.value)} label="Webhook Content Message" type="text" placeholder="Incoming trigger notification alert: {body.text}" />

            {testResult && (
                <div className="p-4 bg-[#060a06] border border-[rgba(163,230,53,0.08)] rounded-2xl text-[11px] font-mono text-[#a3e635] overflow-auto max-h-[150px] space-y-1">
                    {testResult.success ? (
                        <div className="text-[#a3e635] font-semibold">Message sent successfully to Discord!</div>
                    ) : (
                        <>
                            <div className="text-red-400 font-semibold">Error testing Discord webhook:</div>
                            <pre>{JSON.stringify(testResult, null, 2)}</pre>
                        </>
                    )}
                </div>
            )}

            <div className="pt-4 flex justify-between">
                <SecondaryButton onClick={handleTest}>
                    {testing ? "Testing..." : "Test Discord Webhook"}
                </SecondaryButton>
                <PrimaryButton onClick={() => setMetadata({ webhookUrl, content })}>
                    Confirm Action
                </PrimaryButton>
            </div>
        </div>
    );
}



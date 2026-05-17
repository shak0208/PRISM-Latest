import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  User,
  CheckCircle2,
  XCircle,
  FileWarning,
} from "lucide-react";
import { cn } from "../lib/utils";
import { usePrism } from "../context/PrismContext";

const initialSequence = [
  {
    id: 1,
    role: "CEO",
    text: "Thank you all for joining. We are here to discuss the LATAM market entry. The opportunity is clear, but the capital requirements are substantial. CMO, how confident are we in the brand translation?",
    time: "00:01",
    alignments: { CEO: 90, CFO: 50, COO: 80, CMO: 75, CRO: 60 },
    thinking: "Balancing growth opportunity against capital constraints. Need to ensure marketing isn't minimizing the localization costs.",
  },
  {
    id: 2,
    role: "CMO",
    text: "Brand resonance testing indicates a 68% favorability score, which is on par with our domestic launch. However, localized marketing spend will need to be 15% higher than modeled to combat entrenched local players.",
    time: "00:15",
    alignments: { CEO: 85, CFO: 40, COO: 75, CMO: 80, CRO: 60 },
    thinking: "The product translates well, but CAC will be high early on. Must set realistic expectations on customer acquisition budget.",
  },
  {
    id: 3,
    role: "CFO",
    text: "That 15% variance immediately compresses our Year 1 margin. If we proceed with the aggressive timeline, we will need to draw down on the revolver facility. I am uncomfortable with that risk profile given current interest rates.",
    time: "00:42",
    alignments: { CEO: 80, CFO: 30, COO: 60, CMO: 70, CRO: 50 },
    thinking: "Protecting liquidity is paramount. The cost of debt right now erodes the projected IRR. Need to push back on the aggressive timeline.",
  },
  {
    id: 4,
    role: "COO",
    text: "From an supply chain perspective, the infrastructure is ready. We have letters of intent from key distributors. Delaying means we lose our exclusivity windows with them.",
    time: "01:10",
    alignments: { CEO: 85, CFO: 25, COO: 90, CMO: 75, CRO: 45 },
    thinking: "Operational momentum is hard to rebuild. If we pause, competitors will lock up these distributors. I must defend the timeline.",
  },
  {
    id: 5,
    role: "CRO",
    text: "The regulatory compliance costs have just been revised upwards. If we don't factor in a 12-month compliance buffer, we could face operational bans.",
    time: "01:35",
    alignments: { CEO: 75, CFO: 20, COO: 70, CMO: 65, CRO: 80 },
    thinking: "Recent shifts in foreign data laws are not fully priced into the CFO's model. Must flag the catastrophic risk of non-compliance.",
  },
];

export function ExecutiveDebate() {
  const { decisionData, setActiveModule } = usePrism();
  const [sequence, setSequence] = useState(initialSequence);
  const [activeDialogueIndex, setActiveDialogueIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [initStage, setInitStage] = useState(0);
  const [expandedThinking, setExpandedThinking] = useState<Record<string | number, boolean>>({});
  const scrollRef = useRef<HTMLDivElement>(null);

  const toggleThinking = (id: string | number) => {
    setExpandedThinking(prev => ({...prev, [id]: !prev[id]}));
  };

  useEffect(() => {
    const timers: any[] = [];
    
    // Stage 1: Initializing Decision Engine
    timers.push(setTimeout(() => setInitStage(1), 300));
    
    // Stage 2: Simulating Executive Discourse
    timers.push(setTimeout(() => setInitStage(2), 2500));
    
    // Stage 3: Complete, show debate map
    timers.push(setTimeout(() => {
      setInitStage(3);
      setIsPlaying(true); // Auto-play when ready
    }, 4800));
    
    return () => timers.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    let interval: any;
    if (isPlaying && activeDialogueIndex < sequence.length - 1 && initStage === 3) {
      interval = setInterval(() => {
        setActiveDialogueIndex((prev) => prev + 1);
      }, 4000);
    } else if (activeDialogueIndex >= sequence.length - 1) {
      setIsPlaying(false);
    }
    return () => clearInterval(interval);
  }, [isPlaying, activeDialogueIndex, sequence.length, initStage]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [activeDialogueIndex, sequence]);

  const activeDialogue = sequence[activeDialogueIndex];
  const activeSpeaker = activeDialogue?.role;
  const currentAlignments = activeDialogue?.alignments || {
    CEO: 50,
    CFO: 50,
    COO: 50,
    CMO: 50,
    CRO: 50,
  };

  const AnimatedDots = () => (
    <span className="inline-flex w-8 tracking-widest">
      <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1.5, times: [0, 0.5, 1] }}>.</motion.span>
      <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.2, times: [0, 0.5, 1] }}>.</motion.span>
      <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.4, times: [0, 0.5, 1] }}>.</motion.span>
    </span>
  );

  if (initStage < 3) {
    return (
      <div className="h-full flex flex-col items-center justify-center pb-20">
        <AnimatePresence mode="wait">
          {initStage === 1 && (
            <motion.div
              key="stage1"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center gap-6"
            >
              <div className="relative w-16 h-16 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border-2 border-amber-500/20 border-t-amber-500 animate-spin" />
                <div className="w-8 h-8 rounded-full bg-amber-500/10 flex items-center justify-center shadow-[0_0_15px_rgba(245,158,11,0.2)]">
                  <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                </div>
              </div>
              <h2 className="text-xl font-serif text-gray-300 tracking-widest uppercase">
                Initializing Decision Engine<AnimatedDots />
              </h2>
            </motion.div>
          )}
          {initStage === 2 && (
            <motion.div
              key="stage2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center gap-6"
            >
              <div className="relative w-16 h-16 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border-2 border-blue-500/20 border-t-blue-500 animate-spin" />
                <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                  <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                </div>
              </div>
              <h2 className="text-xl font-serif text-gray-300 tracking-widest uppercase">
                Simulating Executive Discourse<AnimatedDots />
              </h2>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, filter: 'blur(10px)' }}
      animate={{ opacity: 1, filter: 'blur(0px)' }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="h-full flex flex-col max-w-[1400px] mx-auto pt-4 pb-0 overflow-hidden"
    >
      <div className="flex justify-between items-center mb-6 px-4">
        <div className="flex items-center gap-4">
          <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
          <h1 className="text-2xl font-serif text-white tracking-widest uppercase truncate max-w-lg">
            Executive Debate: {decisionData?.title || "Unknown Decision"}
          </h1>
        </div>
        <button
          onClick={() => setActiveModule("outcome")}
          className="bg-amber-600 hover:bg-amber-500 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          Force Consensus
        </button>
      </div>

      <div className="flex-1 grid grid-cols-12 gap-6 min-h-0 mb-6">
        {/* Left Column: Node Map & Alignment */}
        <div className="col-span-5 flex flex-col gap-6">
          {/* Node Map */}
          <div className="flex-1 relative bg-[#0a0a0a] border border-[#222] rounded-2xl overflow-hidden shadow-inner">
            <div className="absolute top-4 left-4 text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold">
              RESOLUTION
            </div>

            {/* Center Hub */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[140px] rounded-[100%] bg-gradient-to-b from-[#111] to-[#000] border border-amber-500/30 flex items-center justify-center flex-col z-10 shadow-[0_0_50px_rgba(247,144,29,0.15)]">
              <h2 className="text-3xl font-serif text-amber-500 glow-text drop-shadow-[0_0_10px_rgba(247,144,29,0.5)]">
                PRISM Decision Engine
              </h2>
              <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-amber-600/80 mt-2">
                EXECUTIVE BOARDROOM
              </p>
            </div>

            {/* Nodes */}
            {[
              {
                role: "CEO",
                focus: "SYNTHESIS",
                pos: "top-8 left-1/2 -translate-x-1/2",
                icon: User,
              },
              {
                role: "CFO",
                focus: "CAPITAL",
                pos: "top-1/3 left-6",
                icon: User,
              },
              {
                role: "COO",
                focus: "OPERATIONS",
                pos: "top-1/3 right-6",
                icon: User,
              },
              {
                role: "CMO",
                focus: "MARKET",
                pos: "bottom-16 left-12",
                icon: User,
              },
              {
                role: "CRO",
                focus: "RISK",
                pos: "bottom-16 right-12",
                icon: User,
              },
            ].map((node) => {
              const stanceVal =
                currentAlignments[
                  node.role as keyof typeof currentAlignments
                ] || 50;
              const stance =
                stanceVal > 60
                  ? {
                      label: "SUPPORT",
                      color: "text-green-500",
                      border: "border-green-500/50",
                      glow: "shadow-[0_0_20px_rgba(34,197,94,0.1)]",
                    }
                  : stanceVal > 40
                    ? {
                        label: "NEUTRAL",
                        color: "text-gray-400",
                        border: "border-amber-500/50",
                        glow: "shadow-[0_0_20px_rgba(247,144,29,0.15)]",
                      }
                    : {
                        label: "CONCERN",
                        color: "text-red-500",
                        border: "border-red-500/50",
                        glow: "shadow-[0_0_20px_rgba(239,68,68,0.1)]",
                      };

              const isSpeaking = activeSpeaker === node.role;

              return (
                <div
                  key={node.role}
                  className={`absolute ${node.pos} w-24 h-32 bg-[#111]/90 rounded-2xl border ${isSpeaking ? "border-amber-500 bg-amber-500/10" : "border-[#333]"} flex flex-col items-center justify-center p-2 z-20 backdrop-blur-md transition-all duration-500`}
                >
                  <div
                    className={`absolute -inset-0.5 rounded-2xl ${stance.border} opacity-50 blur p-1 -z-10 ${stance.glow}`}
                  ></div>
                  <div
                    className={`w-8 h-8 rounded-full border ${stance.border} flex items-center justify-center mb-2 bg-black`}
                  >
                    <node.icon size={14} className={stance.color} />
                  </div>
                  <div className="font-bold text-white text-sm mb-0.5">
                    {node.role}
                  </div>
                  <div className="text-[8px] uppercase tracking-wider text-gray-500 mb-2">
                    {node.focus}
                  </div>
                  <div
                    className={`text-[8px] px-2 py-0.5 rounded font-bold uppercase tracking-wider bg-[#111] border border-[#222] ${stance.color}`}
                  >
                    {stance.label}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Alignment Bottom Panel */}
          <div className="bg-[#0a0a0a] border border-[#222] rounded-2xl p-6 min-h-[220px]">
            <div className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold mb-4">
              BOARDROOM ALIGNMENT
            </div>
            <div className="space-y-3">
              {["CEO", "CFO", "COO", "CMO", "CRO"].map((role) => {
                const val =
                  currentAlignments[role as keyof typeof currentAlignments] ||
                  50;
                const stance =
                  val > 60 ? "SUPPORT" : val > 40 ? "NEUTRAL" : "CONCERN";
                const color =
                  val > 60
                    ? "bg-green-500"
                    : val > 40
                      ? "bg-amber-500"
                      : "bg-red-500";
                const segments = [val > 0, val > 25, val > 50, val > 75];
                return (
                  <div key={role} className="flex items-center gap-4">
                    <div className="w-8 text-xs font-bold text-gray-300">
                      {role}
                    </div>
                    <div className="flex-1 flex gap-1 h-3">
                      {segments.map((active, i) => (
                        <div
                          key={i}
                          className={`flex-1 rounded-sm ${active ? color : "bg-[#222]"} transition-colors duration-500`}
                        ></div>
                      ))}
                    </div>
                    <div
                      className={`w-16 text-right text-[10px] font-bold ${val > 60 ? "text-green-500" : val > 40 ? "text-amber-500" : "text-red-500"}`}
                    >
                      {stance}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Center Column: Live Feed */}
        <div className="col-span-4 flex flex-col glass-panel border border-[#222] rounded-2xl p-4 overflow-hidden relative">
          <div className="flex justify-between items-center mb-4 border-b border-[#333] pb-2">
            <span className="text-[10px] text-amber-500 font-bold uppercase tracking-widest">
              Speech Feed
            </span>
            <span className="text-[10px] text-gray-500 font-mono">
              {activeDialogueIndex + 1} / {sequence.length} events
            </span>
          </div>

          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto scroll-smooth pr-2 space-y-4 pb-20"
          >
            <AnimatePresence initial={false}>
              {sequence
                .slice(0, activeDialogueIndex + 1)
                .map((dialogue, idx) => {
                  const stanceVal = dialogue.alignments
                    ? dialogue.alignments[
                        dialogue.role as keyof typeof dialogue.alignments
                      ]
                    : 50;
                  const topBorder =
                    stanceVal > 60
                      ? "border-t-green-500"
                      : stanceVal > 40
                        ? "border-t-amber-500"
                        : "border-t-red-500";
                  const stanceLabel =
                    stanceVal > 60
                      ? "SUPPORT"
                      : stanceVal > 40
                        ? "NEUTRAL"
                        : "CONCERN";

                  return (
                    <motion.div
                      key={dialogue.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className={`flex flex-col mb-4`}
                    >
                      <div className="text-[8px] text-gray-500 tracking-wider uppercase mb-1 font-bold">
                        R1 ·{" "}
                        {dialogue.role === "CEO" ? "CONTEXT" : "PERSPECTIVE"}
                      </div>
                      <div
                        className={`border-t-2 ${topBorder} border border-[#333] rounded-xl p-4 bg-[#111]`}
                      >
                        <div className="flex justify-between items-center mb-3">
                          <div className={`flex items-center gap-2 text-white`}>
                            <User size={14} className="text-amber-500" />
                            <span className="font-bold text-sm tracking-widest text-[#DBDBDB]">
                              {dialogue.role}
                            </span>
                          </div>
                          <div className="px-2 py-0.5 bg-[#1A1A1A] rounded text-[8px] font-bold text-gray-400 border border-[#333] uppercase tracking-wider">
                            {stanceLabel}
                          </div>
                        </div>
                        <p className="text-sm text-gray-300 leading-relaxed font-light">
                          {dialogue.text}
                        </p>
                        {/* Thinking toggle */}
                        {(dialogue as any).thinking && (
                          <div 
                            className="mt-4 flex items-center gap-1 text-[9px] text-gray-500 uppercase tracking-widest cursor-pointer hover:text-white transition-colors select-none"
                            onClick={() => toggleThinking(dialogue.id)}
                          >
                            <svg
                              className="w-3 h-3"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                              ></path>
                            </svg>
                            THINKING
                            <svg
                              className={cn("w-3 h-3 ml-0.5 transition-transform", expandedThinking[dialogue.id] ? "-rotate-90" : "")}
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M19 9l-7 7-7-7"
                              ></path>
                            </svg>
                          </div>
                        )}
                        <AnimatePresence>
                          {expandedThinking[dialogue.id] && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden"
                            >
                              <div className="mt-3 p-3 bg-[#0a0a0a] border border-[#222] rounded text-xs text-amber-500/80 font-mono">
                                {(dialogue as any).thinking}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </motion.div>
                  );
                })}
            </AnimatePresence>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#111] to-transparent pointer-events-none"></div>
        </div>

        {/* Right Column: Scratchpad & Logic */}
        <div className="col-span-3 flex flex-col gap-4">
          <div className="glass-panel p-5 rounded-2xl flex-1 border border-[#222] flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xs uppercase tracking-widest text-amber-500 font-bold">
                Strategic Tension
              </h3>
              <div className="flex items-center gap-1 text-[10px] text-red-500 bg-red-500/10 px-2 py-0.5 rounded">
                <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />{" "}
                Live
              </div>
            </div>

            <div className="space-y-4 flex-1">
              <AnimatePresence mode="popLayout">
                {currentAlignments.CFO < 50 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="p-3 bg-red-950/30 border border-red-500/20 rounded-lg"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-red-400">
                        Margin Warning
                      </span>
                      <FileWarning size={14} className="text-red-400" />
                    </div>
                    <p className="text-xs text-gray-400">
                      CFO requires baseline margin defense. Current trajectory
                      breaches threshold.
                    </p>
                  </motion.div>
                )}

                {currentAlignments.COO > 70 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="p-3 bg-white/5 border border-white/10 rounded-lg"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-gray-400">
                        Timeline Push
                      </span>
                      <User size={14} className="text-gray-400" />
                    </div>
                    <p className="text-xs text-gray-400">
                      COO pushing to accelerate due to distribution exclusivity
                      windows.
                    </p>
                  </motion.div>
                )}

                {currentAlignments.CRO > 70 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="p-3 bg-amber-950/30 border border-amber-500/20 rounded-lg"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-amber-400">
                        Compliance Alert
                      </span>
                      <User size={14} className="text-amber-400" />
                    </div>
                    <p className="text-xs text-gray-400">
                      CRO citing elevated compliance buffer requirements.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="pt-4 border-t border-[#333]">
              <h3 className="text-xs uppercase tracking-widest text-gray-500 mb-3">
                Predicted Option Survival
              </h3>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between items-center text-xs mb-1">
                    <span className="text-gray-400">M&A Acquisition</span>
                    <span className="text-green-400">75%</span>
                  </div>
                  <div className="w-full h-1 bg-[#222] rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 w-[75%] transition-all duration-1000"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center text-xs mb-1">
                    <span className="text-gray-400 text-decoration-line-through">
                      Greenfield Entry
                    </span>
                    <span className="text-red-400">Eliminated</span>
                  </div>
                  <div className="w-full h-1 bg-[#222] rounded-full overflow-hidden">
                    <div className="h-full bg-red-500 w-[15%] transition-all duration-1000"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


    </motion.div>
  );
}

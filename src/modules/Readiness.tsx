import React, { useState } from 'react';
import { ShieldAlert, BarChart3, Users2, Activity, Play, UploadCloud, Edit2, AlertTriangle, ShieldCheck, Download, Mail, Sparkles, Check, X } from 'lucide-react';
import { usePrism } from '../context/PrismContext';

export function Readiness() {
  const { decisionData, setActiveModule } = usePrism();

  const [options, setOptions] = useState([
    { id: 1, title: "Controlled Regional Pilot Launch", desc: "Enter one priority geography with controlled capital allocation to validate market demand before scaling." },
    { id: 2, title: "Operating Margin Optimization Before Market Entry", desc: "Focus on internal efficiencies and cost reduction to build a war chest before attempting aggressive expansion." },
    { id: 3, title: "Phased Multi-Region Expansion Strategy", desc: "Establish presence in two adjacent markets simultaneously to realize economies of scale without over-extending." },
    { id: 4, title: "Immediate Full-Scale Competitive Expansion", desc: "Deploy maximum available capital to secure land grab across all target geographies before competitors react." }
  ]);
  const [isRegenerating, setIsRegenerating] = useState(false);

  const handleRegenerateOptions = () => {
    setIsRegenerating(true);
    // Simulate AI generation delay
    setTimeout(() => {
      setOptions([
        { id: 1, title: "Targeted Micro-Acquisition Strategy", desc: "Acquire established local operators in priority regions to drastically reduce time-to-market and mitigate regulatory risk." },
        { id: 2, title: "Platform-First Partnership Model", desc: "Delay physical expansion. Launch localized digital platforms via white-label partnerships to test market elasticity off-balance-sheet." },
        { id: 3, title: "Staggered Tier-1 City Rollout", desc: "Focus capital exclusively on top-tier metropolitan centers sequentially, establishing flagship dominance before evaluating suburban networks." },
        { id: 4, title: "Preemptive Price-War Penetration", desc: "Enter all markets simultaneously with aggressive loss-leader pricing to rapidly capture market share and destabilize incumbents." }
      ]);
      setIsRegenerating(false);
    }, 1500);
  };

  const handleUpdateOption = (id: number, newTitle: string, newDesc: string) => {
    setOptions(options.map(opt => opt.id === id ? { ...opt, title: newTitle, desc: newDesc } : opt));
  };

  const handleConvene = () => {
    setActiveModule('rehearsal');
  };

  const readinessScore = decisionData ? 88 : 0;
  
  // Calculate complexity based on decisionData length of stakeholders etc.
  const stakeholderCount = decisionData?.stakeholders?.length || 0;
  const complexityLevel = stakeholderCount > 3 ? "Very High" : stakeholderCount > 1 ? "Moderate" : "Low";
  const confidenceScore = decisionData ? 75 : 0; // Mock derived from data completeness

  return (
    <div className="h-full flex flex-col max-w-7xl mx-auto py-8">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-4xl font-serif mb-2">Readiness Cockpit</h1>
          <p className="text-gray-400">Pre-simulation assessment & context overview.</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-[#333] text-gray-300 hover:text-white hover:bg-white/5 transition-colors text-sm">
            <Download size={14} />
            Download Pre-read
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-[#333] text-gray-300 hover:text-white hover:bg-white/5 transition-colors text-sm">
            <Mail size={14} />
            Send Email to CXOs
          </button>
          <button onClick={handleConvene} className="flex items-center gap-2 bg-amber-600 hover:bg-amber-500 text-white px-5 py-2.5 rounded-lg font-medium shadow-[0_0_20px_rgba(247,144,29,0.3)] transition-all text-sm ml-2">
            <Play fill="currentColor" size={14} />
            Convene Boardroom
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 flex-1 overflow-y-auto pb-8 pr-2">
        {/* Left Column */}
        <div className="md:col-span-8 flex flex-col gap-6">
          
          <div className="glass-panel p-6 rounded-2xl border border-[#2A2A2A] relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500 to-amber-700"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <div className="flex justify-between items-start mb-4">
                   <h3 className="text-sm uppercase tracking-widest text-amber-500 font-semibold">Decision Summary</h3>
                   <div className="bg-amber-500/10 border border-amber-500/30 text-amber-500 text-[10px] font-bold uppercase px-2 py-1 rounded">
                     {decisionData?.type || "Unknown Type"}
                   </div>
                </div>
                {decisionData ? (
                  <>
                    <h4 className="text-2xl text-white font-light tracking-tight mb-2">{decisionData.title}</h4>
                    <p className="text-gray-400 leading-relaxed text-sm mb-4">{decisionData.problemStatement}</p>
                    <div className="text-xs text-gray-500 flex justify-between border-t border-[#2A2A2A] pt-4">
                      <span>Objective: <span className="text-gray-300 font-medium">{decisionData.objective || 'N/A'}</span></span>
                      <span>Horizon: <span className="text-gray-300 font-medium">{decisionData.timeHorizon || 'N/A'}</span></span>
                    </div>
                  </>
                ) : (
                  <p className="text-gray-500 italic">No decision context provided. Go back to Intake.</p>
                )}
              </div>
              
              <div className="border-l border-[#2A2A2A] pl-0 md:pl-8">
                <h3 className="text-sm uppercase tracking-widest text-gray-400 font-semibold mb-6 flex items-center justify-between">
                  Stakeholder Impact Map
                  <Users2 size={16} className="text-amber-500" />
                </h3>
                <div className="flex flex-wrap gap-2">
                  {(decisionData?.stakeholders || ['Customers', 'Employees', 'Investors']).map(sh => (
                    <div key={sh} className="px-3 py-1.5 border border-amber-500/30 bg-amber-500/10 text-amber-500 text-xs rounded-full flex items-center gap-2">
                      <Users2 size={12} /> {sh}
                    </div>
                  ))}
                  {!decisionData?.stakeholders?.includes('Regulators') && (
                    <div className="px-3 py-1.5 border border-[#333] bg-black/40 text-gray-500 text-xs rounded-full">Regulators</div>
                  )}
                  {!decisionData?.stakeholders?.includes('Vendors') && (
                    <div className="px-3 py-1.5 border border-[#333] bg-black/40 text-gray-500 text-xs rounded-full">Vendors</div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-[#2A2A2A]">
             <div className="flex justify-between items-center mb-4">
               <h3 className="text-sm uppercase tracking-widest text-gray-400 font-semibold">Suggested Strategic Options</h3>
               <button 
                 onClick={handleRegenerateOptions} 
                 disabled={isRegenerating}
                 className="flex items-center gap-1.5 text-xs text-amber-500 hover:text-amber-400 transition-colors disabled:opacity-50"
               >
                 {isRegenerating ? <span className="animate-spin text-lg">◌</span> : <Sparkles size={14} />}
                 Regenerate Options
               </button>
             </div>
             <div className={`grid grid-cols-1 sm:grid-cols-2 gap-4 transition-opacity duration-300 ${isRegenerating ? 'opacity-50' : 'opacity-100'}`}>
               {options.map(opt => (
                 <OptionCard 
                   key={opt.id}
                   option={opt}
                   onSave={handleUpdateOption}
                 />
               ))}
             </div>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-[#2A2A2A]">
            <h3 className="text-sm uppercase tracking-widest text-gray-400 font-semibold mb-4 flex items-center gap-2">
               <AlertTriangle size={16} className="text-red-500" />
               Missing Data Warnings
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3 p-3 bg-red-950/20 rounded-lg border border-red-500/20">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 shrink-0"></div>
                <p className="text-sm text-gray-300">Competitive cost assumptions incomplete. Missing Target X valuation multiples. Detailed peer analysis required for high-confidence output.</p>
              </div>
              <div className="flex items-start gap-3 p-3 bg-amber-950/20 rounded-lg border border-amber-500/20">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 shrink-0"></div>
                <p className="text-sm text-gray-300">Regulatory compliance barrier timelines are estimated, not verified. Simulation may underrepresent procedural delays in specific jurisdictions.</p>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column (now serving as the shorter secondary column) */}
        <div className="md:col-span-4 space-y-6">
          <div className="glass-panel p-6 rounded-2xl border border-[#2A2A2A] flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-sm uppercase tracking-widest text-gray-400 font-semibold">Complexity Score</h3>
              <span className="text-xs bg-[#222] px-2 py-1 rounded text-white font-mono">{complexityLevel}</span>
            </div>
            
            <div className="flex items-center justify-center mb-8 relative">
              <div className="w-32 h-32 rounded-full border-4 border-[#222] flex items-center justify-center relative">
                <svg className="absolute inset-0 w-full h-full -rotate-90">
                  <circle cx="64" cy="64" r="60" fill="transparent" stroke="#F7901D" strokeWidth="4" strokeDasharray="377" strokeDashoffset={377 - (377 * 82) / 100} strokeLinecap="round" className="transition-all duration-1000" />
                </svg>
                <div className="text-center">
                  <span className="text-3xl font-serif font-light text-white">82</span>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <MetricItem icon={Activity} label="Confidence" value={`${confidenceScore}%`} />
              <MetricItem icon={ShieldAlert} label="Urgency" value={decisionData?.urgency || "Unknown"} />
            </div>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-[#2A2A2A]">
             <h3 className="text-sm uppercase tracking-widest text-gray-400 font-semibold mb-4 text-center">Executive Readiness</h3>
             <div className="flex items-center gap-3 bg-green-500/10 border border-green-500/30 p-4 rounded-xl">
               <ShieldCheck className="text-green-500 shrink-0" />
               <div>
                  <div className="text-green-500 font-bold uppercase tracking-wider text-xs">Ready For Rehearsal</div>
                  <div className="text-[10px] text-gray-400 mt-1">Sufficient data depth.</div>
               </div>
             </div>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-[#2A2A2A]">
            <h3 className="text-sm uppercase tracking-widest text-gray-400 font-semibold mb-6">Risk Heatmap</h3>
            <div className="space-y-4">
              <RiskItem label="Financial" level="High" score={85} color="bg-red-500" />
              <RiskItem label="Operational" level="Med" score={60} color="bg-amber-500" />
              <RiskItem label="Regulatory" level="High" score={75} color="bg-red-500" />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

function MetricItem({ icon: Icon, label, value }: any) {
  return (
    <div className="bg-[#111] border border-[#222] p-4 rounded-xl flex flex-col items-center justify-center text-center">
      <Icon size={18} className="text-amber-500 mb-2" />
      <span className="text-xs text-gray-500 uppercase tracking-wider block mb-1">{label}</span>
      <span className="text-sm font-medium text-white">{value}</span>
    </div>
  );
}

function RiskItem({ label, level, score, color }: any) {
  return (
    <div className="flex items-center gap-4">
      <div className="w-24 text-xs text-gray-400 truncate">{label}</div>
      <div className="flex-1 h-1.5 bg-[#222] rounded-full overflow-hidden">
        <div className={`h-full ${color} opacity-80`} style={{ width: `${score}%` }}></div>
      </div>
      <div className="w-8 text-right text-xs font-mono text-gray-500">{level}</div>
    </div>
  );
}

function OptionCard({ option, onSave }: any) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(option.title);
  const [desc, setDesc] = useState(option.desc);

  const handleSave = () => {
    onSave(option.id, title, desc);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTitle(option.title);
    setDesc(option.desc);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="bg-[#111] border border-amber-500/50 p-5 rounded-xl flex flex-col gap-3 h-full">
        <input 
          value={title} 
          onChange={e => setTitle(e.target.value)}
          className="bg-black/50 border border-[#333] rounded px-3 py-2 text-white font-serif focus:outline-none focus:border-amber-500"
          placeholder="Option Title"
        />
        <textarea 
          value={desc}
          onChange={e => setDesc(e.target.value)}
          rows={3}
          className="bg-black/50 border border-[#333] rounded px-3 py-2 text-gray-300 text-xs resize-none focus:outline-none focus:border-amber-500 flex-1"
          placeholder="Strategic rationale"
        />
        <div className="flex justify-end gap-2 mt-2">
          <button onClick={handleCancel} className="p-1.5 text-gray-400 hover:text-white bg-[#222] hover:bg-[#333] rounded transition-colors">
            <X size={14} />
          </button>
          <button onClick={handleSave} className="p-1.5 text-black hover:text-black bg-amber-500 hover:bg-amber-400 rounded transition-colors">
            <Check size={14} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#111] border border-[#333] hover:border-[#444] transition-colors p-5 rounded-xl flex flex-col group relative h-full">
       <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
         <button onClick={() => setIsEditing(true)} className="text-gray-500 hover:text-amber-500 transition-colors">
           <Edit2 size={14} />
         </button>
       </div>
       <div className="font-serif text-white mb-2 pr-6">{option.title}</div>
       <p className="text-xs text-gray-400 leading-relaxed flex-1">{option.desc}</p>
    </div>
  )
}


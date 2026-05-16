import { useState } from 'react';
import { 
  BarChart, 
  Activity, 
  Target, 
  ShieldAlert, 
  CheckCircle2, 
  XOctagon, 
  Users, 
  AlertTriangle,
  ArrowRight,
  Mail,
  FileText
} from 'lucide-react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
} from 'recharts';
import { usePrism } from '../context/PrismContext';
import { cn } from '../lib/utils';
import { BoardPackReport } from '../components/reports/BoardPackReport';

export function PostDebateAnalysis() {
  const { decisionData, setActiveModule } = usePrism();
  const [activeOptionTab, setActiveOptionTab] = useState('phased');
  const [showReport, setShowReport] = useState(false);

  const handleExportPDF = () => {
    setShowReport(true);
  };

  return (
    <>
      {showReport && (
        <BoardPackReport 
          onClose={() => setShowReport(false)} 
          data={{ decisionData }} 
        />
      )}
      <div className="h-full flex flex-col max-w-7xl mx-auto py-8">
      {/* Header */}
      <div className="mb-8 flex justify-between items-end shrink-0">
        <div>
          <h1 className="text-4xl font-serif mb-2 text-[#F2EFE9]">Post-Debate Analysis</h1>
          <p className="text-gray-400 font-medium tracking-wide">Simulated Executive Decision Intelligence Report</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pr-4 pb-12 space-y-8">
        
        {/* Section 1: Overview & Section 8: Decision Recap */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 bg-[#161616] border border-[#2A2A2A] rounded-2xl p-6 lg:p-8 flex flex-col">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-1.5 h-1.5 rounded-full bg-amber-500"></div>
              <h2 className="text-sm uppercase tracking-widest font-bold text-gray-500">Decision Summary</h2>
            </div>
            <h3 className="text-2xl font-serif text-[#F2EFE9] mb-4 leading-snug">
              The board converged on phased entry to balance strategic urgency with capital preservation.
            </h3>
            <p className="text-gray-400 leading-relaxed font-medium">
              We will commit $20M to establish a European presence while preserving runway. The strategy addresses immediate market share threats while deferring major CapEx until compliance and integration risks are fully mapped in Phase 1.
            </p>
          </div>
          
          <div className="lg:col-span-4 bg-[#161616] border border-[#2A2A2A] rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-1.5 h-1.5 rounded-full bg-amber-500"></div>
              <h2 className="text-sm uppercase tracking-widest font-bold text-gray-500">Overview</h2>
            </div>
            <div className="space-y-4">
              <div>
                <div className="text-[10px] uppercase font-bold text-gray-600 mb-1">Scenario</div>
                <div className="text-sm text-gray-300 font-medium">{decisionData?.title || 'Invest $50M to enter the European market in 2026 amidst margin pressure'}</div>
              </div>
              <div className="h-px w-full bg-[#2A2A2A]"></div>
              <div>
                <div className="text-[10px] uppercase font-bold text-gray-600 mb-1">Decision Outcome</div>
                <div className="text-sm text-amber-500 font-medium">Phased Entry ($20M Phase 1)</div>
              </div>
              <div className="h-px w-full bg-[#2A2A2A]"></div>
              <div>
                <div className="text-[10px] uppercase font-bold text-gray-600 mb-1">Active Signals</div>
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className="px-2 py-1 bg-white/5 border border-white/10 rounded text-[10px] text-gray-400">Hybrid compute</span>
                  <span className="px-2 py-1 bg-white/5 border border-white/10 rounded text-[10px] text-gray-400">External market stress</span>
                  <span className="px-2 py-1 bg-white/5 border border-white/10 rounded text-[10px] text-gray-400">Competitor aggression</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 7: Alignment Analytics & Section 2: CXO Influence Map */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="bg-[#161616] border border-[#2A2A2A] rounded-2xl p-6 flex flex-col items-center justify-center relative overflow-hidden">
              <div className="absolute top-0 w-full h-1 bg-amber-500"></div>
              <h2 className="text-sm uppercase tracking-widest font-bold text-gray-500 mb-6 text-center w-full">Executive Alignment</h2>
              
              <div className="text-6xl font-serif text-white mb-2">60%</div>
               <div className="text-amber-500 text-sm font-bold uppercase tracking-wider mb-6">Partial Consensus</div>
               
               <div className="w-full space-y-3">
                 <div className="flex justify-between items-center text-xs">
                   <span className="text-gray-400">Consensus</span>
                   <span className="text-white font-mono">60%</span>
                 </div>
                 <div className="w-full h-1 bg-[#222] rounded-full overflow-hidden"><div className="w-[60%] h-full bg-green-500"></div></div>
                 
                 <div className="flex justify-between items-center text-xs pt-2">
                   <span className="text-gray-400">Dissent</span>
                   <span className="text-white font-mono">40%</span>
                 </div>
                 <div className="w-full h-1 bg-[#222] rounded-full overflow-hidden"><div className="w-[40%] h-full bg-red-500"></div></div>
               </div>
               
               <div className="mt-8 p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl text-xs text-amber-500/90 leading-relaxed text-center">
                 Significant compromise required between growth and survivability positions. Human overrides detected.
               </div>
            </div>
          </div>

          <div className="lg:col-span-8 bg-[#161616] border border-[#2A2A2A] rounded-2xl p-6 lg:p-8 relative overflow-hidden">
            <h2 className="text-sm uppercase tracking-widest font-bold text-gray-500 mb-8">CXO Influence</h2>
            
            <div className="space-y-6">
              {[
                { role: 'CFO', name: 'Marcus', score: 92, insight: 'Constrained aggressive expansion through capital survival framing.', highlight: true },
                { role: 'COO', name: 'James', score: 78, insight: 'Forced pivot to partnerships due to severe timeline integration concerns.' },
                { role: 'CEO', name: 'Eleanor', score: 75, insight: 'Mediated dispute; favored growth but conceded to capital realities.' },
                { role: 'CMO', name: 'Sarah', score: 45, insight: 'Secured localized DACH marketing budget but lost broader launch scale.' },
                { role: 'CTO', name: 'David', score: 30, insight: 'Technical debt warnings acknowledged but largely bypassed in Phase 1.' }
              ].map((cxo, i) => (
                <div key={i} className={`flex items-center gap-4 ${cxo.highlight ? 'bg-white/5 p-4 rounded-xl border border-white/10 -mx-4' : ''}`}>
                  <div className="w-12 text-center shrink-0">
                    <div className="text-xs font-bold text-white mb-1">{cxo.role}</div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1.5">
                      <div className="flex-1 h-1.5 bg-[#222] rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${cxo.highlight ? 'bg-amber-500' : 'bg-gray-600'}`}
                          style={{ width: `${cxo.score}%` }}
                        ></div>
                      </div>
                      <span className="text-xs font-mono text-gray-500 w-8 text-right">{cxo.score}</span>
                    </div>
                    <div className="text-xs text-gray-400 font-medium">{cxo.insight}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Section 3: Option Scorecard & Section 5: Decision Radar */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
          <div className="xl:col-span-7 bg-[#161616] border border-[#2A2A2A] rounded-2xl p-6 overflow-hidden">
            <h2 className="text-sm uppercase tracking-widest font-bold text-gray-500 mb-6">Strategic Option Scorecard</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-[#111]">
                  <tr>
                    <th className="p-3 font-medium text-gray-400 border-b border-[#2A2A2A]">Option</th>
                    <th className="p-3 font-medium text-gray-400 border-b border-[#2A2A2A]">Financial</th>
                    <th className="p-3 font-medium text-gray-400 border-b border-[#2A2A2A]">Risk</th>
                    <th className="p-3 font-medium text-gray-400 border-b border-[#2A2A2A]">Market Impact</th>
                    <th className="p-3 font-medium text-gray-400 border-b border-[#2A2A2A]">Feasibility</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#2A2A2A]">
                  {[
                    { name: 'Immediate Expansion', fin: 'Poor', risk: 'High', mkt: 'High', feas: 'Low' },
                    { name: 'Phased Entry', fin: 'Good', risk: 'Moderate', mkt: 'Moderate', feas: 'High', highlight: true },
                    { name: 'Delayed Expansion', fin: 'Excellent', risk: 'Low', mkt: 'Low', feas: 'High' },
                  ].map((row, i) => (
                    <tr key={i} className={row.highlight ? 'bg-amber-900/10' : ''}>
                      <td className="p-3 text-white font-medium flex items-center gap-2">
                        {row.highlight && <div className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0"></div>}
                        {row.name}
                      </td>
                      <ScoreCell score={row.fin} />
                      <ScoreCell score={row.risk} inverted />
                      <ScoreCell score={row.mkt} />
                      <ScoreCell score={row.feas} />
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="xl:col-span-5 bg-[#161616] border border-[#2A2A2A] rounded-2xl p-6">
            <h2 className="text-sm uppercase tracking-widest font-bold text-gray-500 mb-2">Decision Radar Analysis</h2>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={[
                  { subject: 'Profitability', A: 30, B: 75, Selected: 60 },
                  { subject: 'Risk (Inv)', A: 20, B: 90, Selected: 65 },
                  { subject: 'Market Impact', A: 90, B: 30, Selected: 70 },
                  { subject: 'Feasibility', A: 30, B: 85, Selected: 80 },
                  { subject: 'Confidence', A: 40, B: 60, Selected: 85 }
                ]}>
                  <PolarGrid stroke="#333" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#888', fontSize: 10 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                  <RechartsTooltip 
                    contentStyle={{ backgroundColor: '#111', borderColor: '#333', borderRadius: '8px' }}
                    itemStyle={{ fontSize: '12px' }}
                    labelStyle={{ color: '#888', marginBottom: '4px' }}
                  />
                  <Radar name="Immediate Exp" dataKey="A" stroke="#444" fill="#444" fillOpacity={0.2} />
                  <Radar name="Delayed Exp" dataKey="B" stroke="#666" fill="#666" fillOpacity={0.2} />
                  <Radar name="Phased Entry" dataKey="Selected" stroke="#F7901D" fill="#F7901D" fillOpacity={0.4} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-4 mt-2">
              <div className="flex items-center gap-1.5 text-xs text-gray-400">
                <div className="w-2 h-2 bg-[#444] rounded"></div> Immediate
              </div>
              <div className="flex items-center gap-1.5 text-xs text-gray-400">
                <div className="w-2 h-2 bg-[#666] rounded"></div> Delayed
              </div>
              <div className="flex items-center gap-1.5 text-xs text-amber-500">
                <div className="w-2 h-2 bg-amber-500 rounded"></div> Phased
              </div>
            </div>
          </div>
        </div>

        {/* Section 4: CXO Stance Matrix */}
        <div className="bg-[#161616] border border-[#2A2A2A] rounded-2xl overflow-hidden">
          <div className="p-6 border-b border-[#2A2A2A]">
            <h2 className="text-sm uppercase tracking-widest font-bold text-gray-500">Executive Stance Matrix</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#111]">
                <tr>
                  <th className="p-4 font-medium text-gray-400 border-b border-[#2A2A2A]">Strategic Option</th>
                  <th className="p-4 font-medium text-gray-400 border-b border-[#2A2A2A] text-center">CEO</th>
                  <th className="p-4 font-medium text-gray-400 border-b border-[#2A2A2A] text-center">CFO</th>
                  <th className="p-4 font-medium text-gray-400 border-b border-[#2A2A2A] text-center">COO</th>
                  <th className="p-4 font-medium text-gray-400 border-b border-[#2A2A2A] text-center">CMO</th>
                  <th className="p-4 font-medium text-gray-400 border-b border-[#2A2A2A] text-center">CTO</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2A2A2A]">
                {[
                  { name: 'Immediate Expansion ($50M)', ceo: 'Support', cfo: 'Oppose', coo: 'Oppose', cmo: 'Support', cto: 'Concern' },
                  { name: 'Phased Entry ($20M Phase 1)', border: true, ceo: 'Support', cfo: 'Support', coo: 'Concern', cmo: 'Concern', cto: 'Neutral' },
                  { name: 'Delayed Expansion (2027)', ceo: 'Oppose', cfo: 'Support', coo: 'Support', cmo: 'Oppose', cto: 'Neutral' },
                ].map((row, i) => (
                  <tr key={i} className={row.border ? 'bg-amber-900/10' : ''}>
                    <td className="p-4 text-white font-medium flex items-center gap-2">
                      {row.border && <div className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0"></div>}
                      {row.name}
                    </td>
                    <StatusCell status={row.ceo} />
                    <StatusCell status={row.cfo} />
                    <StatusCell status={row.coo} />
                    <StatusCell status={row.cmo} />
                    <StatusCell status={row.cto} />
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Section 6: Elimination Summary & Section 9: Decision Logic SUMMARY */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-[#161616] border border-[#2A2A2A] rounded-2xl p-6 lg:p-8">
            <h2 className="text-sm uppercase tracking-widest font-bold text-gray-500 mb-8">Option Elimination Rationale</h2>
            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-[11px] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-px before:bg-gradient-to-b before:from-transparent before:via-[#333] before:to-transparent">
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-6 h-6 rounded-full border border-red-500/50 bg-[#111] shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-[0_0_10px_rgba(239,68,68,0.2)] z-10">
                  <XOctagon size={12} className="text-red-500" />
                </div>
                <div className="w-[calc(100%-2.5rem)] md:w-[calc(50%-1.5rem)] p-4 rounded-xl border border-[#2A2A2A] bg-[#111]">
                  <div className="text-xs font-bold text-white mb-2">Immediate Expansion</div>
                  <p className="text-xs text-gray-400 mb-3">Rejected due to unacceptable cash depletion risk.</p>
                  <div className="text-[10px] text-gray-500 font-mono">Drove elimination: CFO, COO</div>
                </div>
              </div>

              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                 <div className="flex items-center justify-center w-6 h-6 rounded-full border border-red-500/50 bg-[#111] shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-[0_0_10px_rgba(239,68,68,0.2)] z-10">
                  <XOctagon size={12} className="text-red-500" />
                </div>
                <div className="w-[calc(100%-2.5rem)] md:w-[calc(50%-1.5rem)] p-4 rounded-xl border border-[#2A2A2A] bg-[#111]">
                  <div className="text-xs font-bold text-white mb-2">Delayed Expansion</div>
                  <p className="text-xs text-gray-400 mb-3">Rejected due to strategic market-share loss risk.</p>
                  <div className="text-[10px] text-gray-500 font-mono">Drove elimination: CEO, CMO</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#161616] border border-[#2A2A2A] rounded-2xl p-6 lg:p-8">
            <h2 className="text-sm uppercase tracking-widest font-bold text-gray-500 mb-6">Decision Logic Formulation</h2>
            <div className="space-y-4">
              <LogicItem 
                title="Optimization Logic"
                desc="Maximize market footprint while minimizing Year 1 burn rate."
              />
              <LogicItem 
                title="Dominant Constraints"
                desc="Capital ceiling set at $25M; Timeline hard-stop for Q4 launch."
              />
              <LogicItem 
                title="Veto Conditions Triggered"
                desc="CFO vetoed any proposal exceeding $30M initial CapEx."
              />
              <LogicItem 
                title="Trade-off Drivers"
                desc="Accepted partnership margin dilution in exchange for execution velocity."
              />
            </div>
          </div>
        </div>

        {/* Section 11 & 12: Failure & Sensitivity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-[#161616] border border-[#2A2A2A] rounded-2xl p-6 lg:p-8">
             <div className="flex items-center gap-2 mb-6">
               <AlertTriangle size={16} className="text-amber-500" />
               <h2 className="text-sm uppercase tracking-widest font-bold text-amber-500">Failure Scenario Assessment</h2>
             </div>
             
             <div className="mb-6">
               <div className="text-xs text-gray-500 uppercase tracking-wider mb-2 font-bold">Most Likely Failure Mode</div>
               <div className="text-xl font-serif text-white mb-2">"Death by Half-Measures"</div>
               <p className="text-sm text-gray-400 leading-relaxed">
                 Phased entry starves the marketing machine, resulting in weak initial penetration against highly capitalized local incumbents. 
               </p>
             </div>
             
             <div className="bg-red-950/20 border border-red-500/20 rounded-xl p-4">
               <div className="text-xs text-red-500/80 uppercase tracking-wider mb-3 font-bold">Early Warning Signals</div>
               <ul className="space-y-2">
                 <li className="flex items-center gap-2 text-sm text-red-100/70">
                   <div className="w-1 h-1 bg-red-500 rounded-full"></div>
                   CAC spikes &gt;30% above modeled baseline in Month 2
                 </li>
                 <li className="flex items-center gap-2 text-sm text-red-100/70">
                   <div className="w-1 h-1 bg-red-500 rounded-full"></div>
                   Aggressive pricing retaliation from top 3 competitors
                 </li>
                 <li className="flex items-center gap-2 text-sm text-red-100/70">
                   <div className="w-1 h-1 bg-red-500 rounded-full"></div>
                   Partner integration delays exceed 14 days
                 </li>
               </ul>
             </div>
          </div>

          <div className="bg-[#161616] border border-[#2A2A2A] rounded-2xl p-6 lg:p-8">
             <h2 className="text-sm uppercase tracking-widest font-bold text-gray-500 mb-8">Sensitivity Analysis</h2>
             <div className="space-y-6">
               <SensitivityBar label="Available Capital" impact={95} />
               <SensitivityBar label="Competitor Aggression" impact={82} />
               <SensitivityBar label="Execution Readiness" impact={65} />
               <SensitivityBar label="Regulatory Burden" impact={40} />
             </div>
             <div className="mt-8 pt-6 border-t border-[#2A2A2A] text-xs text-gray-500 leading-relaxed">
               * Indicates which underlying assumptions most drastically alter the recommended outcome if varied by ±20%. Capital availability is the hyper-critical dependency.
             </div>
          </div>
        </div>

        {/* Section 10: Executive Snapshot */}
        <div className="bg-amber-900/10 border border-amber-500/20 rounded-2xl p-12 text-center relative overflow-hidden flex flex-col items-center justify-center min-h-[250px]">
           <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-[100px]"></div>
           <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-500/5 rounded-full blur-[100px]"></div>
           <div className="text-6xl font-serif text-amber-500/20 absolute top-4 left-6 leading-none">"</div>
           <blockquote className="text-3xl md:text-4xl font-serif text-[#F2EFE9] leading-tight max-w-4xl mx-auto italic relative z-10">
             We will commit $20M to establish a European presence while preserving runway. The remaining $30M is contingent on Q1 traction metrics.
           </blockquote>
           <div className="text-sm uppercase tracking-widest font-bold text-amber-500 mt-8 relative z-10">
             — CEO Final Directive
           </div>
        </div>

        {/* Section 13: Action Panel */}
        <div className="sticky bottom-0 left-0 w-full bg-[#111]/80 backdrop-blur-md border-t border-[#2A2A2A] p-4 flex flex-col sm:flex-row gap-4 justify-between items-center z-50 rounded-2xl mt-8">
           <div className="flex flex-wrap gap-3 w-full sm:w-auto justify-center">
             <button 
               onClick={() => setActiveModule('rehearsal')}
               className="px-4 md:px-5 py-2.5 bg-[#161616] border border-[#333] hover:border-gray-500 rounded-lg font-medium text-white transition-all shadow-sm"
             >
               Replay Simulation
             </button>
             <button 
               onClick={handleExportPDF}
               className="px-4 md:px-5 py-2.5 bg-[#161616] border border-[#333] hover:border-gray-500 rounded-lg font-medium text-white transition-all shadow-sm flex items-center gap-2"
             >
               <FileText size={16} />
               <span className="hidden lg:inline">Generate Board Pack</span>
             </button>
             <button 
               className="px-4 md:px-5 py-2.5 bg-[#161616] border border-[#333] hover:border-amber-500/50 hover:text-amber-500 rounded-lg font-medium text-white transition-all shadow-sm flex items-center gap-2"
             >
               <Mail size={16} />
               <span className="hidden md:inline">Email CEO</span>
             </button>
           </div>
           <div className="flex gap-3 w-full sm:w-auto mt-2 sm:mt-0">
             <button 
               onClick={() => setActiveModule('whatif')}
               className="w-full sm:w-auto justify-center px-6 py-2.5 bg-amber-600 hover:bg-amber-500 rounded-lg font-medium text-white transition-all shadow-lg shadow-amber-500/20 flex items-center gap-2"
             >
               Explore What-if Analysis <ArrowRight size={16} />
             </button>
           </div>
        </div>

      </div>
    </div>
    </>
  );
}

function ScoreCell({ score, inverted }: { score: string, inverted?: boolean }) {
  let colorClass = '';
  
  if (score === 'Excellent' || score === 'High') {
    colorClass = inverted ? 'text-red-400' : 'text-green-400';
  } else if (score === 'Good' || score === 'Moderate') {
    colorClass = 'text-amber-400';
  } else {
    colorClass = inverted ? 'text-green-400' : 'text-red-400';
  }

  return (
    <td className="p-3">
      <span className={`text-xs font-bold uppercase tracking-wider ${colorClass}`}>
        {score}
      </span>
    </td>
  );
}

function StatusCell({ status }: { status: string }) {
  let colorClass = '';
  let dotClass = '';
  
  if (status === 'Support') {
    colorClass = 'bg-green-500/10 text-green-500 border-green-500/20';
    dotClass = 'bg-green-500';
  } else if (status === 'Oppose') {
    colorClass = 'bg-red-500/10 text-red-500 border-red-500/20';
    dotClass = 'bg-red-500';
  } else if (status === 'Concern') {
    colorClass = 'bg-amber-500/10 text-amber-500 border-amber-500/20';
    dotClass = 'bg-amber-500';
  } else {
    colorClass = 'bg-[#222] text-gray-400 border-[#333]';
    dotClass = 'bg-gray-500';
  }

  return (
    <td className="p-4 text-center">
      <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-medium ${colorClass}`}>
        <div className={`w-1.5 h-1.5 rounded-full ${dotClass}`}></div>
        {status}
      </div>
    </td>
  );
}

function LogicItem({ title, desc }: { title: string, desc: string }) {
  return (
    <div className="bg-[#111] p-4 rounded-xl border border-[#2A2A2A]">
      <div className="text-xs font-bold text-white mb-1.5">{title}</div>
      <div className="text-sm text-gray-400">{desc}</div>
    </div>
  );
}

function SensitivityBar({ label, impact }: { label: string, impact: number }) {
  return (
     <div>
       <div className="flex justify-between text-xs mb-2">
         <span className="text-white font-medium">{label}</span>
         <span className="text-amber-500 font-mono">{impact}%</span>
       </div>
       <div className="w-full h-2 bg-[#111] rounded-full overflow-hidden border border-[#2A2A2A]">
         <div 
           className="h-full bg-gradient-to-r from-amber-700 to-amber-500 rounded-full"
           style={{ width: `${impact}%` }}
         ></div>
       </div>
     </div>
  );
}

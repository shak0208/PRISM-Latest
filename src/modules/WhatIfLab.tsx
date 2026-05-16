import { useState } from 'react';
import { ArrowRightLeft, Sparkles, TrendingDown, TrendingUp, Loader2, Save, History, LineChart as LineChartIcon, Activity } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';

export function WhatIfLab() {
  const [query, setQuery] = useState('');
  const [isSimulating, setIsSimulating] = useState(false);
  const [hasSimulated, setHasSimulated] = useState(false);
  const [activeTab, setActiveTab] = useState<'variables' | 'chart'>('variables');

  // Stats
  const [targetValuation, setTargetValuation] = useState(25);
  const [regulatoryDelay, setRegulatoryDelay] = useState(6);
  const [competitorSpend, setCompetitorSpend] = useState(15);
  const [synergyRealization, setSynergyRealization] = useState(60);

  const applyScenario = (name: string, val: number, reg: number, comp: number, syn: number) => {
    setQuery(name);
    setTargetValuation(val);
    setRegulatoryDelay(reg);
    setCompetitorSpend(comp);
    setSynergyRealization(syn);
    setHasSimulated(false);
  };

  const handleSimulate = () => {
    setIsSimulating(true);
    setTimeout(() => {
      setIsSimulating(false);
      setHasSimulated(true);
    }, 1500);
  };

  return (
    <div className="h-full flex flex-col max-w-7xl mx-auto py-8">
      <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-serif mb-2">What-if Lab</h1>
          <p className="text-gray-400">Stress test assumptions & run sensitivity analysis.</p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <button className="flex-1 sm:flex-none justify-center flex items-center gap-2 px-4 py-2 border border-[#333] hover:bg-white/5 rounded-lg text-sm text-gray-300 transition-colors">
            <History size={16} /> <span className="hidden md:inline">Saved Scenarios</span>
          </button>
          <button className="flex-1 sm:flex-none justify-center flex items-center gap-2 px-4 py-2 border border-amber-500/50 hover:bg-amber-500/10 rounded-lg text-sm text-amber-500 transition-colors">
            <Save size={16} /> Save Current
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 min-h-0 overflow-y-auto lg:overflow-hidden px-4">
        
        {/* Left Column: Input & Variables */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="glass-panel p-6 rounded-2xl border border-[#2A2A2A] flex flex-col flex-1 overflow-y-auto">
            <div className="relative flex items-center bg-[#111] border border-[#333] rounded-xl p-1 mb-4 focus-within:border-amber-500/50 transition-colors">
              <div className="pl-3 text-amber-500">
                <Sparkles size={16} />
              </div>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Describe scenario (e.g. Rate spike by 150bps)"
                className="w-full bg-transparent border-none outline-none px-3 py-2 text-sm placeholder-gray-600 text-white"
              />
            </div>
            
            <div className="mb-6">
              <div className="text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-3">Quick Scenarios</div>
              <div className="flex flex-wrap gap-2">
                <ScenarioChip 
                  label="Hostile Regulator" 
                  onClick={() => applyScenario('Strict GDPR Enforcement', 20, 12, 10, 40)} 
                />
                <ScenarioChip 
                  label="Competitor Pivot" 
                  onClick={() => applyScenario('Local Rival Price War', 15, 2, 45, 80)} 
                />
                <ScenarioChip 
                  label="Market Bull Run" 
                  onClick={() => applyScenario('Aggressive Tech Rally', 45, 4, 25, 95)} 
                />
              </div>
            </div>

            <div className="flex border-b border-[#333] mb-6">
              <button 
                onClick={() => setActiveTab('variables')}
                className={`pb-3 px-2 text-sm font-medium border-b-2 transition-colors ${activeTab === 'variables' ? 'border-amber-500 text-amber-500' : 'border-transparent text-gray-400 hover:text-white'}`}
              >
                Model Variables
              </button>
            </div>

            {activeTab === 'variables' && (
              <div className="space-y-6 flex-1">
                <SliderControl label="Target Valuation Premium" value={targetValuation} onChange={setTargetValuation} unit="%" max={100} />
                <SliderControl label="Regulatory Timeline Delay" value={regulatoryDelay} onChange={setRegulatoryDelay} unit="mo" max={24} />
                <SliderControl label="Competitor Counter-Spend" value={competitorSpend} onChange={setCompetitorSpend} unit="M" max={100} />
                <SliderControl label="Synergy Realization" value={synergyRealization} onChange={setSynergyRealization} unit="%" max={100} />
              </div>
            )}
            
          </div>

          <button 
            onClick={handleSimulate}
            disabled={isSimulating}
            className="flex items-center justify-center gap-2 bg-amber-600 text-white hover:bg-amber-500 py-4 rounded-xl font-medium shadow-[0_0_20px_rgba(247,144,29,0.2)] transition-colors mt-auto disabled:opacity-50"
          >
            {isSimulating ? <Loader2 size={18} className="animate-spin" /> : "Run Stress Test"}
          </button>
        </div>

        {/* Right Column: Comparison */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div className="glass-panel p-6 rounded-2xl border border-[#2A2A2A] flex flex-col relative min-h-[360px]">
            <h3 className="text-sm uppercase tracking-widest text-white mb-6 flex items-center gap-2">
              Base vs. Scenario Delta
            </h3>

            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 relative gap-10 transition-opacity duration-500" style={{ opacity: isSimulating ? 0.3 : 1 }}>
            {/* Divider */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#444] to-transparent -translate-x-1/2"></div>
            <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#111] border border-[#333] items-center justify-center text-gray-500">
              <ArrowRightLeft size={14} />
            </div>

            {/* Base Column */}
            <div className="space-y-6 md:pr-4 relative z-10">
              <h4 className="font-serif text-2xl text-gray-400 mb-6 flex items-center gap-2">Base Case</h4>
              
              <div className="space-y-6">
                <div className="bg-[#111] p-4 rounded-xl border border-[#222]">
                   <p className="text-[10px] text-gray-500 uppercase mb-1 font-bold">Board Confidence</p>
                   <p className="text-3xl font-light text-white">74%</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                     <p className="text-xs text-gray-500 uppercase mb-1">CFO Stance</p>
                     <p className="text-sm font-medium text-amber-500 border-l-2 border-amber-500 pl-2">Conditional</p>
                  </div>
                  <div>
                     <p className="text-xs text-gray-500 uppercase mb-1">Time to Value</p>
                     <p className="text-sm text-white font-mono">18 months</p>
                  </div>
                </div>
                <div>
                   <p className="text-[10px] text-gray-500 uppercase mb-1 font-bold">Primary Risk</p>
                   <p className="text-sm text-gray-300">Regulatory compliance costs scale beyond projection.</p>
                </div>
              </div>
            </div>

            {/* Scenario Column */}
            {hasSimulated ? (
              <div className="space-y-6 md:pl-4 animate-in fade-in zoom-in duration-500 relative z-10 border-t md:border-t-0 border-[#333] pt-6 md:pt-0">
                <h4 className="font-serif text-2xl text-amber-500 mb-6 truncate" title={query || "Scenario"}>{query || "Custom Scenario"}</h4>
                
                <div className="space-y-6">
                  <div className="bg-amber-900/10 border border-amber-500/20 p-4 rounded-xl">
                     <p className="text-[10px] text-amber-500/80 uppercase mb-1 font-bold">Board Confidence</p>
                     <div className="flex items-center gap-3">
                       <p className="text-3xl font-light text-white">{Math.max(0, 74 - targetValuation / 2 - regulatoryDelay * 1.5).toFixed(0)}%</p>
                       <div className="flex items-center gap-1 text-red-500 text-[10px] bg-red-500/10 px-2 py-1 rounded font-bold uppercase tracking-widest">
                         <TrendingDown size={12} />
                         <span>-{Math.floor(targetValuation / 2 + regulatoryDelay * 1.5)}%</span>
                       </div>
                     </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                       <p className="text-xs text-gray-500 uppercase mb-1">CFO Stance</p>
                       <p className={`text-sm font-medium border-l-2 pl-2 ${targetValuation > 20 || competitorSpend > 30 ? 'text-red-500 border-red-500' : 'text-amber-500 border-amber-500'}`}>
                         {targetValuation > 20 || competitorSpend > 30 ? 'Dissent' : 'Concerned'}
                       </p>
                    </div>
                    <div>
                       <p className="text-xs text-gray-500 uppercase mb-1">Time to Value</p>
                       <div className="flex items-center gap-2">
                         <p className="text-sm text-white font-mono">{18 + Math.floor(regulatoryDelay)} mo</p>
                         <div className="flex items-center text-red-500 text-[10px] font-bold">
                           <TrendingUp size={10} className="mr-0.5" />+{Math.floor(regulatoryDelay)}m
                         </div>
                       </div>
                    </div>
                  </div>
                  <div>
                     <p className="text-[10px] text-gray-500 uppercase mb-1 font-bold">Emerging Risk</p>
                     <p className="text-sm text-amber-500">
                       {competitorSpend > 25 ? 'Competitor pricing attack threatens Y1 margins.' : targetValuation > 30 ? 'Debt servicing costs breach covenant thresholds.' : 'Synergy delays push break-even to Y3.'}
                     </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center p-8 text-center bg-[#111] border border-[#222] rounded-xl h-full md:ml-4 mt-4 md:mt-0">
                <Activity size={32} className="text-gray-600 mb-4" />
                <p className="text-sm text-gray-500 font-medium">Configure variables and run the stress test to simulate the scenario outcome.</p>
              </div>
            )}
          </div>
          </div>

          {/* Cashflow Impact Chart */}
          {hasSimulated && (
            <div className="glass-panel p-6 rounded-2xl border border-[#2A2A2A] animate-in fade-in slide-in-from-bottom-4 duration-500">
               <h3 className="text-sm uppercase tracking-widest text-white mb-6 flex items-center gap-2">
                 <LineChartIcon size={16} className="text-amber-500" /> Projected Cash Flow Impact
               </h3>
               <div className="h-[200px] w-full">
                 <ResponsiveContainer width="100%" height="100%">
                   <AreaChart data={generateChartData(targetValuation, competitorSpend, regulatoryDelay)}>
                     <defs>
                       <linearGradient id="colorBase" x1="0" y1="0" x2="0" y2="1">
                         <stop offset="5%" stopColor="#444" stopOpacity={0.8}/>
                         <stop offset="95%" stopColor="#444" stopOpacity={0}/>
                       </linearGradient>
                       <linearGradient id="colorScenario" x1="0" y1="0" x2="0" y2="1">
                         <stop offset="5%" stopColor="#F7901D" stopOpacity={0.3}/>
                         <stop offset="95%" stopColor="#F7901D" stopOpacity={0}/>
                       </linearGradient>
                     </defs>
                     <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
                     <XAxis dataKey="month" stroke="#666" tick={{fill: '#666', fontSize: 12}} axisLine={false} tickLine={false} />
                     <YAxis stroke="#666" tick={{fill: '#666', fontSize: 12}} axisLine={false} tickLine={false} tickFormatter={(val) => `$${val}M`} />
                     <RechartsTooltip 
                       contentStyle={{backgroundColor: '#111', borderColor: '#333', borderRadius: '8px'}}
                       itemStyle={{fontSize: '12px'}}
                     />
                     <Area type="monotone" name="Base Case" dataKey="base" stroke="#666" fillOpacity={1} fill="url(#colorBase)" />
                     <Area type="monotone" name="Scenario" dataKey="scenario" stroke="#F7901D" fillOpacity={1} fill="url(#colorScenario)" />
                   </AreaChart>
                 </ResponsiveContainer>
               </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function SliderControl({ label, value, unit, onChange, max = 100 }: { label: string, value: number, unit: string, onChange?: (val: number) => void, max?: number }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-xs">
        <span className="text-gray-400 capitalize">{label}</span>
        <span className="text-white font-mono">{value}{unit}</span>
      </div>
      <input 
        type="range" 
        className="w-full h-1.5 bg-[#222] rounded-lg appearance-none cursor-pointer accent-amber-500"
        value={value}
        max={max}
        onChange={(e) => onChange?.(Number(e.target.value))}
      />
    </div>
  );
}

function ScenarioChip({ label, onClick }: { label: string, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className="px-3 py-1.5 bg-[#1A1A1A] border border-[#333] hover:border-amber-500/50 hover:bg-amber-500/10 hover:text-amber-500 text-gray-400 text-[11px] rounded-full transition-colors whitespace-nowrap font-medium"
    >
      {label}
    </button>
  );
}

function generateChartData(val: number, comp: number, reg: number) {
  const data = [];
  let baseCash = 20;
  let scenarioCash = 20;

  for (let i = 0; i <= 12; i += 2) {
    if (i > 0) {
      baseCash += 2;
      scenarioCash += (2 - (val * 0.05) - (comp * 0.02) - (i <= reg ? 1.5 : 0));
    }
    data.push({
      month: `M${i}`,
      base: Number(baseCash.toFixed(1)),
      scenario: Number(scenarioCash.toFixed(1))
    });
  }
  return data;
}

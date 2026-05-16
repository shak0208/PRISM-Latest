import React, { useState, FormEvent, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Sparkles, Upload } from 'lucide-react';
import { usePrism } from '../context/PrismContext';

const suggestions = [
  'Market Expansion',
  'Pricing War',
  'M&A',
  'Product Launch',
  'Crisis Response',
  'Regulatory Response',
  'Vendor Selection'
];

export function DecisionIntake() {
  const { decisionData, setDecisionData, setActiveModule } = usePrism();
  const [isStructured, setIsStructured] = useState(!!decisionData);
  const [inputValue, setInputValue] = useState(decisionData?.title || '');

  // Form state
  const [title, setTitle] = useState(decisionData?.title || '');
  const [type, setType] = useState(decisionData?.type || 'M&A');
  const [objective, setObjective] = useState(decisionData?.objective || 'Growth');
  const [problemStatement, setProblemStatement] = useState(decisionData?.problemStatement || '');
  const [urgency, setUrgency] = useState(decisionData?.urgency || 'High');
  const [timeHorizon, setTimeHorizon] = useState(decisionData?.timeHorizon || '30 days');
  const [stakeholders, setStakeholders] = useState<string[]>(decisionData?.stakeholders || ['Customers']);
  const [simulationMode, setSimulationMode] = useState(decisionData?.simulationMode || 'Full Boardroom');
  const [isRefining, setIsRefining] = useState(false);

  useEffect(() => {
    if (!decisionData) {
      setIsStructured(false);
      setInputValue('');
      setTitle('');
      setProblemStatement('');
    }
  }, [decisionData]);

  useEffect(() => {
    if (inputValue && !problemStatement) {
      setProblemStatement(`How should we approach "${inputValue}" given the current market conditions?`);
    }
    if (inputValue && !title) {
      setTitle(inputValue);
    }
  }, [inputValue]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      setIsStructured(true);
      if (!title) setTitle(inputValue);
      if (!problemStatement) setProblemStatement(`How should we approach "${inputValue}" given the current market conditions?`);
    }
  };

  const handleSaveAndContinue = () => {
    setDecisionData({
      title: title || inputValue,
      type,
      objective,
      problemStatement,
      urgency,
      timeHorizon,
      stakeholders,
      simulationMode
    });
    setActiveModule('readiness');
  };

  const handleStakeholderToggle = (sh: string) => {
    setStakeholders(prev => 
      prev.includes(sh) ? prev.filter(s => s !== sh) : [...prev, sh]
    );
  };

  const availableStakeholders = ['Customers', 'Partners', 'Regulators', 'Investors', 'Employees', 'Vendors'];

  const handleRefineWithAI = async () => {
    if (!problemStatement || !title) return;
    setIsRefining(true);
    try {
      const response = await fetch('/api/refine-problem', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ problemStatement, title }),
      });
      const data = await response.json();
      if (data.refinedText) {
        setProblemStatement(data.refinedText);
      }
    } catch (error) {
      console.error("Failed to refine:", error);
    } finally {
      setIsRefining(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      alert(`Simulated Upload: ${file.name} attached to context.`);
    }
  };

  return (
    <div className="h-full flex flex-col justify-center max-w-4xl mx-auto py-12 px-4">
      <AnimatePresence mode="wait">
        {!isStructured ? (
          <motion.div
            key="conversational"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="space-y-12 w-full"
          >
            <div className="space-y-4 text-center">
              <h1 className="text-5xl md:text-6xl font-serif glow-text tracking-tight pb-2">
                Ask PRISM
              </h1>
              <p className="text-xl text-gray-400 font-light">
                Describe the strategic decision or context you want to simulate.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-amber-500/20 to-amber-700/20 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-500"></div>
              <div className="relative flex items-center bg-[#1A1A1A] border border-[#333] rounded-2xl p-2 shadow-2xl">
                <div className="pl-4 text-amber-500">
                  <Sparkles size={24} />
                </div>
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Describe the context..."
                  className="w-full bg-transparent border-none outline-none px-4 py-4 text-xl placeholder-gray-600 font-light text-white"
                  autoFocus
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim()}
                  className="bg-amber-600 hover:bg-amber-500 disabled:bg-gray-800 disabled:text-gray-500 text-white rounded-xl px-6 py-3 font-medium transition-all flex items-center gap-2"
                >
                  Analyze
                  <ArrowRight size={18} />
                </button>
              </div>
            </form>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-8">
              {suggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => setInputValue(suggestion)}
                  className="px-4 py-2 rounded-full border border-[#333] text-gray-400 hover:text-white hover:border-amber-500/50 hover:bg-amber-500/10 transition-colors text-sm"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="structured"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full"
          >
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-serif mb-2">Strategic Briefing</h2>
                <p className="text-gray-400">Structuring the analytic approach</p>
              </div>
              <button 
                onClick={() => setIsStructured(false)}
                className="text-sm px-4 py-2 border border-[#333] rounded-lg hover:bg-white/5 transition-colors"
              >
                Start Over
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#1A1A1A] p-6 md:p-8 rounded-2xl border border-[#333]">
              <div className="space-y-4">
                <label className="block text-sm text-gray-400 uppercase tracking-wider font-semibold">Decision Title</label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full bg-black/50 border border-[#333] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-amber-500" />
              </div>
              
              <div className="space-y-4">
                <label className="block text-sm text-gray-400 uppercase tracking-wider font-semibold">Strategic Decision Type</label>
                <select value={type} onChange={(e) => setType(e.target.value)} className="w-full bg-black/50 border border-[#333] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-amber-500 appearance-none">
                  <option>Market Expansion</option>
                  <option>M&A</option>
                  <option>Pricing Strategy</option>
                  <option>Crisis Response</option>
                  <option>Product Launch</option>
                  <option>Cost Transformation</option>
                </select>
              </div>

              <div className="space-y-4">
                <label className="block text-sm text-gray-400 uppercase tracking-wider font-semibold">Decision Objective</label>
                <select value={objective} onChange={(e) => setObjective(e.target.value)} className="w-full bg-black/50 border border-[#333] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-amber-500 appearance-none">
                  <option>Growth</option>
                  <option>Profitability</option>
                  <option>Risk mitigation</option>
                  <option>Market defense</option>
                  <option>Innovation</option>
                  <option>Cost optimization</option>
                </select>
              </div>

              <div className="md:col-span-2 space-y-4">
                <div className="flex justify-between items-center">
                  <label className="block text-sm text-gray-400 uppercase tracking-wider font-semibold">Problem Statement</label>
                  <button 
                    onClick={handleRefineWithAI}
                    disabled={isRefining || !problemStatement}
                    className="flex items-center gap-1.5 text-xs text-amber-500 hover:text-amber-400 transition-colors disabled:opacity-50"
                  >
                    {isRefining ? <span className="animate-spin text-lg">◌</span> : <Sparkles size={14} />}
                    Refine with AI
                  </button>
                </div>
                <div className="border border-[#333] rounded-lg overflow-hidden bg-black/50 focus-within:border-amber-500 transition-colors">
                  <textarea rows={4} value={problemStatement} onChange={(e) => setProblemStatement(e.target.value)} className="w-full bg-transparent p-4 text-white focus:outline-none resize-none"></textarea>
                </div>
              </div>

              <div className="space-y-4">
                <label className="block text-sm text-gray-400 uppercase tracking-wider font-semibold">Decision Urgency</label>
                <div className="pt-2 pb-6 px-1">
                  <input type="range" min="1" max="4" value={urgency === 'Low' ? 1 : urgency === 'Medium' ? 2 : urgency === 'High' ? 3 : 4} 
                    onChange={(e) => {
                      const val = parseInt(e.target.value);
                      setUrgency(val === 1 ? 'Low' : val === 2 ? 'Medium' : val === 3 ? 'High' : 'Immediate');
                    }}
                    className="w-full accent-amber-500" 
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-2">
                    <span>Low</span>
                    <span>Medium</span>
                    <span>High</span>
                    <span className="text-amber-500">Immediate</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <label className="block text-sm text-gray-400 uppercase tracking-wider font-semibold">Time Horizon</label>
                <select value={timeHorizon} onChange={(e) => setTimeHorizon(e.target.value)} className="w-full bg-black/50 border border-[#333] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-amber-500 appearance-none">
                  <option>30 days</option>
                  <option>90 days</option>
                  <option>6 months</option>
                  <option>1 year</option>
                  <option>multi-year</option>
                </select>
              </div>

              <div className="md:col-span-2 space-y-4">
                <label className="block text-sm text-gray-400 uppercase tracking-wider font-semibold">Stakeholders Impacted</label>
                <div className="flex flex-wrap gap-3">
                  {availableStakeholders.map(sh => (
                    <label key={sh} className={`flex items-center gap-2 px-4 py-2 rounded-lg border cursor-pointer transition-colors ${stakeholders.includes(sh) ? 'border-amber-500 bg-amber-500/10 text-amber-500' : 'border-[#333] bg-black/50 text-gray-400 hover:border-gray-500'}`}>
                      <input type="checkbox" checked={stakeholders.includes(sh)} onChange={() => handleStakeholderToggle(sh)} className="hidden" />
                      <span className="text-sm">{sh}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div className="md:col-span-2 space-y-4 pt-4 border-t border-[#333]">
                <label className="block text-sm text-gray-400 uppercase tracking-wider font-semibold">Simulation Mode</label>
                <div className="flex flex-col sm:flex-row gap-4">
                  <label className={`flex-1 p-4 rounded-xl border cursor-pointer transition-all ${simulationMode === 'Quick Rehearsal' ? 'border-amber-500 bg-amber-500/10' : 'border-[#333] bg-black/50 hover:bg-white/5'}`}>
                    <input type="radio" value="Quick Rehearsal" checked={simulationMode === 'Quick Rehearsal'} onChange={() => setSimulationMode('Quick Rehearsal')} className="hidden" />
                    <div className="font-medium text-white mb-1">Quick Rehearsal</div>
                    <div className="text-xs text-gray-400">10-15 minute accelerated simulation.</div>
                  </label>
                  <label className={`flex-1 p-4 rounded-xl border cursor-pointer transition-all ${simulationMode === 'Full Boardroom' ? 'border-amber-500 bg-amber-500/10' : 'border-[#333] bg-black/50 hover:bg-white/5'}`}>
                    <input type="radio" value="Full Boardroom" checked={simulationMode === 'Full Boardroom'} onChange={() => setSimulationMode('Full Boardroom')} className="hidden" />
                    <div className="font-medium text-white mb-1">Full Boardroom</div>
                    <div className="text-xs text-gray-400">Comprehensive, multi-turn rigorous analysis.</div>
                  </label>
                </div>
              </div>

              <div className="md:col-span-2 pt-4 border-t border-[#333] flex flex-col sm:flex-row gap-4 justify-between items-center">
                <label className="flex items-center gap-2 text-amber-500 hover:text-amber-400 transition-colors cursor-pointer w-full sm:w-auto justify-center">
                  <Upload size={18} />
                  <span>Upload Supporting Data</span>
                  <input type="file" className="hidden" onChange={handleFileUpload} />
                </label>
                <button onClick={handleSaveAndContinue} className="bg-white text-black hover:bg-gray-200 rounded-lg px-8 py-3 font-medium transition-colors w-full sm:w-auto">
                  Prepare Decision Context
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

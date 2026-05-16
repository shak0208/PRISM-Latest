import React, { useState, useEffect } from 'react';
import { Settings2, Cpu, User, Trash2, Sparkles } from 'lucide-react';
import { cn } from '../lib/utils';
import { usePrism } from '../context/PrismContext';

const presets = ['Balanced', 'Conservative', 'Growth', 'Risk-sensitive', 'Custom'];

export function CXOPersonas() {
  const { personas, updatePersona, deletePersona, setActiveModule } = usePrism();
  const [activeRole, setActiveRole] = useState('CFO');
  const [newRoleName, setNewRoleName] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [traits, setTraits] = useState<string[]>([]);
  const [isGeneratingTraits, setIsGeneratingTraits] = useState(false);

  // Initialize traits on mount or activeRole change
  useEffect(() => {
    setTraits([
      "Highly skeptical of unproven revenue projections.",
      "Prioritizes free cash flow over market share capture.",
      "Will demand contingency plans for downside scenarios.",
      "Uses defensive, structured language in boardroom dialogue."
    ]);
  }, [activeRole]);

  const roles = Object.keys(personas);
  const persona = personas[activeRole] || { preset: 'Balanced', financialAggressiveness: 50, riskAppetite: 50, marketOptimism: 50, executionConfidence: 50 };

  // Local state for sliders so it doesn't jump immediately until saved, or we can just bind directly.
  // We'll bind directly with immediate feedback.
  
  const handlePresetChange = (preset: string) => {
    let presetData: any = { preset };
    if (preset === 'Conservative') presetData = { ...presetData, financialAggressiveness: 30, riskAppetite: 20, marketOptimism: 40 };
    if (preset === 'Growth') presetData = { ...presetData, financialAggressiveness: 80, riskAppetite: 70, marketOptimism: 85 };
    if (preset === 'Risk-sensitive') presetData = { ...presetData, financialAggressiveness: 40, riskAppetite: 10, marketOptimism: 40 };
    if (preset === 'Balanced') presetData = { ...presetData, financialAggressiveness: 55, riskAppetite: 50, marketOptimism: 60 };
    updatePersona(activeRole, presetData);
  };

  const handleSliderChange = (key: string, value: number) => {
    updatePersona(activeRole, { [key]: value, preset: 'Custom' });
  };

  const proceedToReadiness = () => {
    setActiveModule('readiness');
  };

  const handleAddRole = (e: React.FormEvent) => {
    e.preventDefault();
    if (newRoleName.trim() && !personas[newRoleName.trim()]) {
      const roleName = newRoleName.trim();
      updatePersona(roleName, {
        role: roleName,
        preset: 'Balanced',
        financialAggressiveness: 50,
        riskAppetite: 50,
        marketOptimism: 50,
        executionConfidence: 50,
      });
      setActiveRole(roleName);
      setNewRoleName('');
      setIsAdding(false);
    }
  };

  const handleDeleteRole = (roleToDelete: string, e: React.MouseEvent) => {
    e.stopPropagation();
    deletePersona(roleToDelete);
    if (activeRole === roleToDelete) {
      const remainingRoles = roles.filter(r => r !== roleToDelete);
      if (remainingRoles.length > 0) {
        setActiveRole(remainingRoles[0]);
      } else {
        setActiveRole('');
      }
    }
  };

  const handleComputeTraits = async () => {
    setIsGeneratingTraits(true);
    try {
      const response = await fetch('/api/compute-traits', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          role: activeRole,
          financialAggressiveness: persona.financialAggressiveness,
          riskAppetite: persona.riskAppetite,
          marketOptimism: persona.marketOptimism,
          executionConfidence: persona.executionConfidence
        })
      });
      const data = await response.json();
      if (data.traits) {
        setTraits(data.traits);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsGeneratingTraits(false);
    }
  };

  return (
    <div className="h-full flex flex-col max-w-6xl mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-serif mb-2">CXO Personas</h1>
        <p className="text-gray-400">Configure behavioral archetypes for boardroom simulation.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 h-full min-h-[500px] overflow-y-auto lg:overflow-hidden pl-1 pr-3 pb-8 lg:pb-0">
        {/* Left Column: Role Selector */}
        <div className="w-full lg:w-64 flex flex-col shrink-0">
          <div className="flex lg:flex-col gap-2 flex-1 overflow-x-auto lg:overflow-y-auto pr-2 pb-2 lg:pb-0">
            {roles.map(role => (
              <button
                key={role}
                onClick={() => setActiveRole(role)}
                className={cn(
                  "lg:w-full min-w-[120px] lg:min-w-0 text-left px-4 lg:px-5 py-3 lg:py-4 rounded-xl border transition-all flex items-center gap-2 justify-between group",
                  activeRole === role
                    ? "bg-amber-500/10 border-amber-500/30 text-amber-500"
                    : "bg-white/5 border-white/5 text-gray-400 hover:text-white hover:bg-white/10"
                )}
              >
                <div className="flex items-center gap-2 overflow-hidden">
                  <User size={18} opacity={activeRole === role ? 1 : 0.5} className="shrink-0" />
                  <span className="font-serif text-base lg:text-lg whitespace-nowrap truncate">{role}</span>
                </div>
                <div 
                  onClick={(e) => handleDeleteRole(role, e)}
                  className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-500/20 hover:text-red-400 rounded transition-all cursor-pointer"
                  title="Delete Persona"
                >
                  <Trash2 size={14} />
                </div>
              </button>
            ))}
            
            {isAdding ? (
              <form onSubmit={handleAddRole} className="p-3 bg-white/5 rounded-xl border border-white/10 mt-0 lg:mt-2 min-w-[200px]">
                <input
                  type="text"
                  autoFocus
                  placeholder="Role (e.g. CISO)"
                  value={newRoleName}
                  onChange={e => setNewRoleName(e.target.value)}
                  className="w-full bg-black/50 border border-[#333] text-sm text-white px-3 py-2 rounded mb-2 outline-none focus:border-amber-500/50"
                />
                <div className="flex gap-2">
                  <button type="submit" className="flex-1 bg-amber-600 hover:bg-amber-500 text-white text-xs py-1.5 rounded transition-colors">Add</button>
                  <button type="button" onClick={() => setIsAdding(false)} className="flex-1 bg-gray-800 hover:bg-gray-700 text-white text-xs py-1.5 rounded transition-colors">Cancel</button>
                </div>
              </form>
            ) : (
              <button
                onClick={() => setIsAdding(true)}
                className="min-w-[140px] lg:w-full mt-0 lg:mt-2 text-left px-5 py-3 rounded-xl border border-dashed border-[#333] text-gray-500 hover:text-white hover:border-gray-500 hover:bg-white/5 transition-all text-sm font-medium flex items-center justify-center gap-2"
              >
                + Add CXO
              </button>
            )}
          </div>
        </div>

        {/* Right Column: Configuration Panel */}
        <div className="flex-1 bg-[#151515] border border-[#2A2A2A] rounded-2xl p-8 flex flex-col relative overflow-hidden">
          {/* Subtle amber glow top right */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-[80px]"></div>

          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-10">
            <div>
              <h2 className="text-3xl font-serif text-white mb-2">{activeRole} Profile</h2>
              <p className="text-sm text-gray-400">Primary focus: Capital allocation & margin protection.</p>
            </div>
            <div className="flex flex-wrap bg-[#222] rounded-lg p-1 gap-1">
              {presets.map(preset => (
                <button
                  key={preset}
                  onClick={() => handlePresetChange(preset)}
                  className={cn(
                    "px-4 py-1.5 rounded-md text-sm transition-colors",
                    persona.preset === preset 
                      ? "bg-[#333] text-white" 
                      : "text-gray-400 hover:text-white"
                  )}
                >
                  {preset}
                </button>
              ))}
            </div>
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 flex-1">
            <div className="space-y-8">
              <Slider 
                label="Financial Aggressiveness" 
                value={persona.financialAggressiveness} 
                onChange={(v) => handleSliderChange('financialAggressiveness', v)} 
              />
              <Slider 
                label="Risk Appetite" 
                value={persona.riskAppetite} 
                onChange={(v) => handleSliderChange('riskAppetite', v)} 
              />
              <Slider 
                label="Market Optimism" 
                value={persona.marketOptimism} 
                onChange={(v) => handleSliderChange('marketOptimism', v)} 
              />
              <Slider 
                label="Execution Confidence" 
                value={persona.executionConfidence} 
                onChange={(v) => handleSliderChange('executionConfidence', v)} 
              />
            </div>

            <div className="bg-[#1A1A1A] p-6 rounded-xl border border-[#2A2A2A] space-y-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3 text-amber-500">
                  <Cpu size={20} />
                  <h3 className="font-medium text-sm tracking-widest uppercase">Behavioral Traits</h3>
                </div>
                <button 
                  onClick={handleComputeTraits}
                  disabled={isGeneratingTraits}
                  className="flex items-center gap-1.5 text-xs text-amber-500 hover:text-amber-400 disabled:opacity-50 transition-colors"
                >
                  {isGeneratingTraits ? <span className="animate-spin text-lg">◌</span> : <Sparkles size={14} />}
                  Synthesize Traits
                </button>
              </div>
              
              <ul className="space-y-4 text-sm text-gray-300">
                {traits.map((trait, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="text-[#333]">&mdash;</span>
                    {trait}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="relative z-10 mt-8 pt-6 border-t border-[#2A2A2A] flex justify-end">
            <button onClick={proceedToReadiness} className="flex items-center gap-2 bg-white text-black hover:bg-gray-200 px-6 py-2.5 rounded-lg font-medium transition-colors">
              <Settings2 size={18} />
              Continue to Readiness
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Slider({ label, value, onChange }: { label: string, value: number, onChange: (v: number) => void }) {
  return (
    <div className="space-y-3">
      <div className="flex justify-between text-sm">
        <span className="text-gray-300">{label}</span>
        <span className="text-amber-500 font-mono">{value}%</span>
      </div>
      <input 
        type="range" 
        min="0" max="100" 
        value={value} 
        onChange={e => onChange(Number(e.target.value))}
        className="w-full h-1.5 bg-[#222] rounded-full appearance-none cursor-pointer accent-amber-500"
      />
      <div className="flex justify-between text-xs text-gray-600">
        <span>Low</span>
        <span>High</span>
      </div>
    </div>
  );
}

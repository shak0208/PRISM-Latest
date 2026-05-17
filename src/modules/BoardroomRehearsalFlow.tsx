import React, { useEffect } from 'react';
import { usePrism } from '../context/PrismContext';
import { DecisionIntake } from './DecisionIntake';
import { Readiness } from './Readiness';
import { ExecutiveDebate } from './ExecutiveDebate';
import { Outcome } from './Outcome';
import { PostDebateAnalysis } from './PostDebateAnalysis';
import { WhatIfLab } from './WhatIfLab';
import { Check, FileText, Target, PlayCircle, CheckCircle2, BarChart3, TestTube } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

const steps = [
  { id: 'intake', label: 'Strategic Briefing', icon: FileText },
  { id: 'readiness', label: 'Decision Readiness Assessment', icon: Target },
  { id: 'executive-debate', label: 'Executive Debate', icon: PlayCircle },
  { id: 'outcome', label: 'Strategic Resolution', icon: CheckCircle2 },
  { id: 'analysis', label: 'Post-Debate Analysis', icon: BarChart3 },
  { id: 'whatif', label: 'What-if Analysis', icon: TestTube },
];

export function BoardroomRehearsalFlow() {
  const { activeModule, setActiveModule } = usePrism();

  // If entry point is purely "rehearsal", default to the first step.
  useEffect(() => {
    if (activeModule === 'rehearsal') {
      setActiveModule('landing');
    }
  }, [activeModule, setActiveModule]);

  const currentIndex = steps.findIndex(s => s.id === activeModule);
  // Safely fallback to 0 if not found, though should be found
  const activeStepIndex = currentIndex === -1 ? 0 : currentIndex;

  const renderStepContent = () => {
    switch (activeModule) {
      case 'landing': return <DecisionIntake />;
      case 'intake': return <DecisionIntake />;
      case 'readiness': return <Readiness />;
      case 'executive-debate': return <ExecutiveDebate />;
      case 'outcome': return <Outcome />;
      case 'analysis': return <PostDebateAnalysis />;
      case 'whatif': return <WhatIfLab />;
      default: return <DecisionIntake />;
    }
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Progress Indicator Header */}
      {activeModule !== 'landing' && (
        <div className="shrink-0 pb-10 pt-4 mb-4">
          <div className="text-center mb-8 flex justify-center items-center gap-2">
            <span className="text-3xl md:text-4xl font-serif tracking-tight text-[#FAF9F6]">
              Executive Decision
            </span>
            <span className="text-3xl md:text-4xl font-serif glow-text tracking-tight text-[#F7901D]">
              Journey
            </span>
          </div>
          <div className="flex items-center justify-between max-w-4xl mx-auto px-4 relative">
            {/* Connecting Line */}
            <div className="absolute top-1/2 left-10 right-10 h-px bg-[#222] -translate-y-1/2 z-0" />
            <div 
              className="absolute top-1/2 left-10 h-px bg-amber-900/50 -translate-y-1/2 z-0 transition-all duration-700 ease-in-out"
              style={{ width: `calc(${(activeStepIndex / (steps.length - 1)) * 100}% - 5rem)` }}
            />

            {steps.map((step, idx) => {
              const isActive = idx === activeStepIndex;
              const isCompleted = idx < activeStepIndex;
              const Icon = step.icon;

              return (
                <button
                  key={step.id}
                  onClick={() => setActiveModule(step.id as any)}
                  className="relative z-10 flex flex-col items-center gap-2 group"
                >
                  <div 
                    className={cn(
                      "w-10 h-10 rounded-full border flex items-center justify-center transition-all bg-bg-dark",
                      isActive 
                        ? "border-amber-500 text-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.15)] bg-amber-500/5" 
                        : isCompleted 
                          ? "border-amber-900/50 text-amber-600 bg-amber-900/10" 
                          : "border-[#222] text-[#444] group-hover:border-[#333] group-hover:text-[#666]"
                    )}
                  >
                    {isCompleted ? <Check size={16} /> : <Icon size={16} strokeWidth={isActive ? 2 : 1.5} />}
                  </div>
                  <span 
                    className={cn(
                      "absolute top-14 text-[9px] uppercase font-semibold tracking-widest whitespace-nowrap transition-colors",
                      isActive ? "text-amber-500" : isCompleted ? "text-amber-700/70" : "text-gray-700 group-hover:text-gray-500"
                    )}
                  >
                    {step.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      <div className="flex-1 overflow-hidden relative">
        {/* We use an internal AnimatePresence here so only the step content animates, not the whole flow */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeModule}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="h-full overflow-y-auto pr-2"
          >
            {renderStepContent()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

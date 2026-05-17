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
        <div className="shrink-0 pb-6 pt-4">
          <div className="text-center mb-4 flex justify-center items-center gap-2">
            <span className="text-3xl md:text-4xl font-serif tracking-tight text-[#FAF9F6]">
              Executive Decision
            </span>
            <span className="text-3xl md:text-4xl font-serif glow-text tracking-tight text-[#F7901D]">
              Journey
            </span>
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

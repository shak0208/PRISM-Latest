/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Sidebar, type ModuleType } from './components/Sidebar';
import { AnimatePresence, motion } from 'motion/react';
import { PrismProvider, usePrism } from './context/PrismContext';

// Placeholders for modules
import { DecisionIntake } from './modules/DecisionIntake';
import { CXOPersonas } from './modules/CXOPersonas';
import { Readiness } from './modules/Readiness';
import { BoardroomRehearsal } from './modules/BoardroomRehearsal';
import { Outcome } from './modules/Outcome';
import { WhatIfLab } from './modules/WhatIfLab';
import { Integrations } from './modules/Integrations';
import { MyWorkspace } from './modules/MyWorkspace';
import { PostDebateAnalysis } from './modules/PostDebateAnalysis';

function AppContent() {
  const { activeModule, setActiveModule } = usePrism();

  const renderModule = () => {
    switch (activeModule) {
      case 'intake': return <DecisionIntake />;
      case 'personas': return <CXOPersonas />;
      case 'readiness': return <Readiness />;
      case 'rehearsal': return <BoardroomRehearsal />;
      case 'outcome': return <Outcome />;
      case 'analysis': return <PostDebateAnalysis />;
      case 'whatif': return <WhatIfLab />;
      case 'integrations': return <Integrations />;
      case 'workspace': return <MyWorkspace />;
      default: return <DecisionIntake />;
    }
  };

  return (
    <div className="h-screen w-screen flex bg-bg-dark text-white overflow-hidden">
      <Sidebar activeModule={activeModule} setActiveModule={setActiveModule} />
      
      <main className="flex-1 relative h-full flex flex-col">
        {/* Subtle background glow */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        
        <div className="flex-1 overflow-y-auto p-4 md:p-8 relative z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeModule}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="h-full max-w-7xl mx-auto"
            >
              {renderModule()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <PrismProvider>
      <AppContent />
    </PrismProvider>
  );
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Sidebar, type ModuleType } from './components/Sidebar';
import { AnimatePresence, motion } from 'motion/react';
import { PrismProvider, usePrism } from './context/PrismContext';

// Placeholders for modules
import { CXOPersonas } from './modules/CXOPersonas';
import { Integrations } from './modules/Integrations';
import { MyWorkspace } from './modules/MyWorkspace';
import { BoardroomRehearsalFlow } from './modules/BoardroomRehearsalFlow';

function AppContent() {
  const { activeModule, setActiveModule } = usePrism();

  const renderModule = () => {
    switch (activeModule) {
      case 'personas': return <CXOPersonas />;
      case 'integrations': return <Integrations />;
      case 'workspace': return <MyWorkspace />;
      
      // All these steps are handled inside the BoardroomRehearsalFlow container
      case 'rehearsal':
      case 'landing':
      case 'intake':
      case 'readiness':
      case 'executive-debate':
      case 'outcome':
      case 'analysis':
      case 'whatif':
        return <BoardroomRehearsalFlow />;
        
      default: return <BoardroomRehearsalFlow />;
    }
  };

  return (
    <div className="h-screen w-screen flex bg-bg-dark text-white overflow-hidden">
      <Sidebar activeModule={activeModule} setActiveModule={setActiveModule} />
      
      <main className="flex-1 relative h-full flex flex-col">
        {/* Subtle background glow */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        
        <div className="flex-1 overflow-y-auto p-4 md:p-8 relative z-10 h-full">
          {/* We do not animate the top level module changes when inside the flow to avoid double animation,
              Wait, since App.tsx is rendering BoardroomRehearsalFlow for all these, AnimatePresence here will not trigger 
              re-mounts because the key will just be activeModule.
              To prevent double animations during the flow, the key here should be just "flow" for any of the flow states, 
              so it doesn't unmount BoardroomRehearsalFlow between steps. */}
          <AnimatePresence mode="wait">
            <motion.div
              key={['personas', 'integrations', 'workspace'].includes(activeModule) ? activeModule : 'flow'}
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

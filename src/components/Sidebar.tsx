import React, { useState } from 'react';
import { FileText, Users, PlayCircle, Link, LayoutGrid, ChevronLeft, ChevronRight, Target, CheckCircle2, BarChart3, TestTube, ChevronDown } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

export type ModuleType = 'landing' | 'intake' | 'personas' | 'readiness' | 'rehearsal' | 'executive-debate' | 'outcome' | 'analysis' | 'whatif' | 'integrations' | 'workspace';

interface SidebarProps {
  activeModule: ModuleType;
  setActiveModule: (module: ModuleType) => void;
}

const rehearsalSteps = [
  { id: 'intake', label: 'Briefing', icon: FileText },
  { id: 'readiness', label: 'Readiness', icon: Target },
  { id: 'executive-debate', label: 'Debate', icon: PlayCircle },
  { id: 'outcome', label: 'Resolution', icon: CheckCircle2 },
  { id: 'analysis', label: 'Analysis', icon: BarChart3 },
  { id: 'whatif', label: 'What-if', icon: TestTube },
] as const;

const modules: { id: ModuleType; label: string; icon: React.ElementType }[] = [
  { id: 'rehearsal', label: 'Boardroom Rehearsal', icon: PlayCircle },
  { id: 'personas', label: 'CXO Personas', icon: Users },
  { id: 'integrations', label: 'Integrations', icon: Link },
  { id: 'workspace', label: 'My Workspace', icon: LayoutGrid },
];

export function Sidebar({ activeModule, setActiveModule }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [rehearsalExpanded, setRehearsalExpanded] = useState(true);
  
  // Consider rehearsal as active if any of its sub-steps are active
  const isRehearsalActive = ['landing', 'rehearsal', 'intake', 'readiness', 'executive-debate', 'outcome', 'analysis', 'whatif'].includes(activeModule);

  // Automatically expand if a rehearsal substep is active
  React.useEffect(() => {
    if (isRehearsalActive) {
      setRehearsalExpanded(true);
    }
  }, [isRehearsalActive]);

  return (
    <motion.div 
      initial={false}
      animate={{ width: collapsed ? 80 : 256 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="bg-bg-dark border-r border-[#2A2A2A] flex flex-col p-4 shrink-0 h-full overflow-y-auto relative"
    >
      <button 
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-6 bg-[#1A1A1A] border border-[#333] hover:border-amber-500 hover:text-amber-500 rounded-full p-1 text-gray-400 z-50 transition-colors"
      >
        {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>

      <button 
        onClick={() => setActiveModule('landing')}
        className={cn("flex items-center gap-2 mb-8 cursor-pointer focus:outline-none", collapsed ? "px-0 justify-center" : "px-2")}
      >
        <div className="w-8 h-8 rounded bg-amber-500 flex items-center justify-center font-serif font-bold text-black border border-amber-400/50 shadow-[0_0_15px_rgba(245,158,11,0.2)] shrink-0">
          P
        </div>
        <AnimatePresence>
          {!collapsed && (
            <motion.span 
              key="logo-text"
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "auto" }}
              exit={{ opacity: 0, width: 0 }}
              className="font-serif text-lg tracking-widest uppercase bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-amber-200 overflow-hidden whitespace-nowrap text-left"
            >
              Prism
            </motion.span>
          )}
        </AnimatePresence>
      </button>

      <nav className="flex flex-col gap-1 flex-1">
        {modules.map((mod) => {
          const isRehearsal = mod.id === 'rehearsal';
          const isActive = isRehearsal ? isRehearsalActive : activeModule === mod.id;
          const Icon = mod.icon;
          
          return (
            <div key={mod.id} className="flex flex-col">
              <button
                onClick={() => {
                  if (isRehearsal) {
                    if (isRehearsalActive) {
                      setRehearsalExpanded(!rehearsalExpanded);
                    } else {
                      setActiveModule('landing');
                    }
                  } else {
                    setActiveModule(mod.id);
                  }
                }}
                className={cn(
                  "flex items-center justify-between py-2.5 rounded-lg text-sm transition-all relative group text-left",
                  collapsed ? "justify-center px-0" : "px-3",
                  isActive 
                    ? "text-amber-500 bg-amber-500/10"
                    : "text-gray-400 hover:text-gray-200 hover:bg-white/5"
                )}
                title={collapsed ? mod.label : undefined}
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  {isActive && (
                    <motion.div
                      layoutId="sidebar-active"
                      className="absolute left-0 top-0 bottom-0 w-1 bg-amber-500 rounded-r-full"
                      initial={false}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <Icon size={18} className={cn("shrink-0", isActive ? "opacity-100" : "opacity-70 group-hover:opacity-100")} />
                  <AnimatePresence>
                    {!collapsed && (
                      <motion.span 
                        key="label"
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: "auto" }}
                        exit={{ opacity: 0, width: 0 }}
                        className="truncate whitespace-nowrap overflow-hidden"
                      >
                        {mod.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>
                {!collapsed && isRehearsal && (
                  <ChevronDown size={14} className={cn("transition-transform", rehearsalExpanded ? "rotate-180" : "")} />
                )}
              </button>

              {/* Sub-steps for rehearsal */}
              <AnimatePresence>
                {isRehearsal && !collapsed && rehearsalExpanded && isRehearsalActive && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="flex flex-col gap-1 overflow-hidden ml-6 mt-1 border-l border-[#333] pl-2"
                  >
                    {rehearsalSteps.map((step) => {
                      const StepIcon = step.icon;
                      const isStepActive = activeModule === step.id;
                      
                      return (
                        <button
                          key={step.id}
                          onClick={() => setActiveModule(step.id as any)}
                          className={cn(
                            "flex items-center gap-3 py-2 px-3 rounded-lg text-xs transition-colors text-left",
                            isStepActive
                              ? "text-amber-500 bg-amber-500/10"
                              : "text-gray-400 hover:text-gray-200 hover:bg-white/5"
                          )}
                        >
                          <StepIcon size={14} className={cn("shrink-0", isStepActive ? "opacity-100" : "opacity-70")} />
                          <span className="truncate">{step.label}</span>
                        </button>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </nav>
    </motion.div>
  );
}

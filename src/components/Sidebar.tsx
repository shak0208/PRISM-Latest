import React, { useState } from 'react';
import { FileText, Users, PlayCircle, Link, LayoutGrid, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

export type ModuleType = 'intake' | 'personas' | 'readiness' | 'rehearsal' | 'executive-debate' | 'outcome' | 'analysis' | 'whatif' | 'integrations' | 'workspace';

interface SidebarProps {
  activeModule: ModuleType;
  setActiveModule: (module: ModuleType) => void;
}

const modules: { id: ModuleType; label: string; icon: React.ElementType }[] = [
  { id: 'rehearsal', label: 'Boardroom Rehearsal', icon: PlayCircle },
  { id: 'personas', label: 'CXO Personas', icon: Users },
  { id: 'integrations', label: 'Integrations', icon: Link },
  { id: 'workspace', label: 'My Workspace', icon: LayoutGrid },
];

export function Sidebar({ activeModule, setActiveModule }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  
  // Consider rehearsal as active if any of its sub-steps are active
  const isRehearsalActive = ['rehearsal', 'intake', 'readiness', 'executive-debate', 'outcome', 'analysis', 'whatif'].includes(activeModule);

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

      <div className={cn("flex items-center gap-2 mb-8", collapsed ? "px-0 justify-center" : "px-2")}>
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
              className="font-serif text-lg tracking-widest uppercase bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-amber-200 overflow-hidden whitespace-nowrap"
            >
              Prism
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      <nav className="flex flex-col gap-1 flex-1">
        {modules.map((mod) => {
          const isActive = mod.id === 'rehearsal' ? isRehearsalActive : activeModule === mod.id;
          const Icon = mod.icon;
          
          return (
            <button
              key={mod.id}
              onClick={() => setActiveModule(mod.id)}
              className={cn(
                "flex items-center gap-3 py-2.5 rounded-lg text-sm transition-all relative group text-left",
                collapsed ? "justify-center px-0" : "px-3",
                isActive 
                  ? "text-amber-500 bg-amber-500/10"
                  : "text-gray-400 hover:text-gray-200 hover:bg-white/5"
              )}
              title={collapsed ? mod.label : undefined}
            >
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
            </button>
          );
        })}
      </nav>
    </motion.div>
  );
}

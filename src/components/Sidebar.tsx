import React from 'react';
import { FileText, Users, Target, PlayCircle, BarChart3, TestTube, Link, LayoutGrid, CheckCircle2 } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';

export type ModuleType = 'intake' | 'personas' | 'readiness' | 'rehearsal' | 'outcome' | 'analysis' | 'whatif' | 'integrations' | 'workspace';

interface SidebarProps {
  activeModule: ModuleType;
  setActiveModule: (module: ModuleType) => void;
}

const modules: { id: ModuleType; label: string; icon: React.ElementType }[] = [
  { id: 'intake', label: 'Decision Intake', icon: FileText },
  { id: 'personas', label: 'CXO Personas', icon: Users },
  { id: 'readiness', label: 'Readiness Eval', icon: Target },
  { id: 'rehearsal', label: 'Boardroom Sim', icon: PlayCircle },
  { id: 'outcome', label: 'Outcome Review', icon: CheckCircle2 },
  { id: 'analysis', label: 'Post-Debate', icon: BarChart3 },
  { id: 'whatif', label: 'What-If Lab', icon: TestTube },
  { id: 'integrations', label: 'Integrations', icon: Link },
  { id: 'workspace', label: 'My Workspace', icon: LayoutGrid },
];

export function Sidebar({ activeModule, setActiveModule }: SidebarProps) {
  return (
    <div className="w-64 bg-bg-dark border-r border-[#2A2A2A] flex flex-col p-4 shrink-0 h-full overflow-y-auto">
      <div className="flex items-center gap-2 mb-8 px-2">
        <div className="w-8 h-8 rounded bg-amber-500 flex items-center justify-center font-serif font-bold text-black border border-amber-400/50 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
          P
        </div>
        <span className="font-serif text-lg tracking-widest uppercase bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-amber-200">
          Prism
        </span>
      </div>

      <nav className="flex flex-col gap-1 flex-1">
        {modules.map((mod) => {
          const isActive = activeModule === mod.id;
          const Icon = mod.icon;
          
          return (
            <button
              key={mod.id}
              onClick={() => setActiveModule(mod.id)}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all relative group text-left",
                isActive 
                  ? "text-amber-500 bg-amber-500/10"
                  : "text-gray-400 hover:text-gray-200 hover:bg-white/5"
              )}
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
              <span className="truncate">{mod.label}</span>
            </button>
          );
        })}
      </nav>
      
      <div className="mt-8 px-2">
        <div className="text-xs text-gray-600 font-mono flex items-center gap-2">
          <span>v1.0.0</span>
          <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
          <span>Online</span>
        </div>
      </div>
    </div>
  );
}

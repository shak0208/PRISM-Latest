import React, { createContext, useContext, useState, ReactNode } from 'react';
import type { ModuleType } from '../components/Sidebar';

export interface DecisionData {
  title: string;
  type: string;
  objective?: string;
  problemStatement: string;
  urgency: string;
  timeHorizon: string;
  stakeholders: string[];
  simulationMode?: string;
}

export interface PersonaData {
  role: string;
  preset: string;
  financialAggressiveness: number;
  riskAppetite: number;
  marketOptimism: number;
  executionConfidence: number;
}

export const defaultPersonas: Record<string, PersonaData> = {
  CEO: { role: 'CEO', preset: 'Balanced', financialAggressiveness: 60, riskAppetite: 50, marketOptimism: 70, executionConfidence: 80 },
  CFO: { role: 'CFO', preset: 'Conservative', financialAggressiveness: 30, riskAppetite: 20, marketOptimism: 40, executionConfidence: 85 },
  COO: { role: 'COO', preset: 'Execution-focused', financialAggressiveness: 50, riskAppetite: 40, marketOptimism: 60, executionConfidence: 90 },
  CMO: { role: 'CMO', preset: 'Growth', financialAggressiveness: 70, riskAppetite: 60, marketOptimism: 85, executionConfidence: 75 },
  CRO: { role: 'CRO', preset: 'Risk-sensitive', financialAggressiveness: 40, riskAppetite: 10, marketOptimism: 40, executionConfidence: 95 },
};

export interface SavedScenario {
  id: string;
  title: string;
  query: string;
  timestamp: number;
  stats: {
    targetValuation: number;
    regulatoryDelay: number;
    competitorSpend: number;
    synergyRealization: number;
  };
  recommendation: string;
  decisionTitle: string;
}

interface PrismContextType {
  activeModule: ModuleType;
  setActiveModule: (module: ModuleType) => void;
  decisionData: DecisionData | null;
  setDecisionData: (data: DecisionData | null) => void;
  personas: Record<string, PersonaData>;
  updatePersona: (role: string, data: Partial<PersonaData>) => void;
  deletePersona: (role: string) => void;
  simulationStatus: 'idle' | 'running' | 'completed';
  setSimulationStatus: (status: 'idle' | 'running' | 'completed') => void;
  savedScenarios: SavedScenario[];
  saveScenario: (scenario: Omit<SavedScenario, 'id' | 'timestamp'>) => void;
  deleteScenario: (id: string) => void;
}

const PrismContext = createContext<PrismContextType | undefined>(undefined);

export function PrismProvider({ children }: { children: ReactNode }) {
  const [activeModule, setActiveModule] = useState<ModuleType>('intake');
  const [decisionData, setDecisionData] = useState<DecisionData | null>(null);
  const [personas, setPersonas] = useState<Record<string, PersonaData>>(defaultPersonas);
  const [simulationStatus, setSimulationStatus] = useState<'idle' | 'running' | 'completed'>('idle');
  const [savedScenarios, setSavedScenarios] = useState<SavedScenario[]>([]);

  const updatePersona = (role: string, data: Partial<PersonaData>) => {
    setPersonas(prev => ({
      ...prev,
      [role]: { ...prev[role], ...data }
    }));
  };

  const deletePersona = (role: string) => {
    setPersonas(prev => {
      const newPersonas = { ...prev };
      delete newPersonas[role];
      return newPersonas;
    });
  };

  const saveScenario = (scenario: Omit<SavedScenario, 'id' | 'timestamp'>) => {
    setSavedScenarios(prev => [
      {
        ...scenario,
        id: Math.random().toString(36).substring(7),
        timestamp: Date.now()
      },
      ...prev
    ]);
  };

  const deleteScenario = (id: string) => {
    setSavedScenarios(prev => prev.filter(s => s.id !== id));
  };

  return (
    <PrismContext.Provider value={{
      activeModule,
      setActiveModule,
      decisionData,
      setDecisionData,
      personas,
      updatePersona,
      deletePersona,
      simulationStatus,
      setSimulationStatus,
      savedScenarios,
      saveScenario,
      deleteScenario
    }}>
      {children}
    </PrismContext.Provider>
  );
}

export function usePrism() {
  const context = useContext(PrismContext);
  if (!context) {
    throw new Error('usePrism must be used within a PrismProvider');
  }
  return context;
}

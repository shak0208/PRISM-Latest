import React, { useState } from 'react';
import { UploadCloud, CheckCircle2, Search, Filter, History, ChevronRight, Play, GitCompare, Archive, Loader2, FileText } from 'lucide-react';
import { cn } from '../lib/utils';
import { usePrism } from '../context/PrismContext';

const initialDecisions = [
  { id: '1', title: 'Q4 Pricing Strategy', status: 'Draft', date: '2 days ago', isArchive: false },
  { id: '2', title: 'Board Retreat Agenda', status: 'Draft', date: '5 days ago', isArchive: false },
  { id: '3', title: 'Vendor Y Acquisition', status: 'Resolved', date: 'Last Month', isArchive: true },
  { id: '4', title: 'EU HQ Relocation', status: 'Resolved', date: '3 months ago', isArchive: true },
];

export function MyWorkspace() {
  const { decisionData, setActiveModule } = usePrism();
  const [decisions, setDecisions] = useState(initialDecisions);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedHistoryId, setSelectedHistoryId] = useState('3');
  const [uploadState, setUploadState] = useState<'idle' | 'uploading' | 'complete'>('idle');

  const handleUpload = () => {
    setUploadState('uploading');
    setTimeout(() => {
      setUploadState('complete');
    }, 2000);
  };

  const handleArchive = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setDecisions(prev => prev.map(d => d.id === id ? { ...d, status: 'Resolved', isArchive: true } : d));
  };

  const handleReplay = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveModule('rehearsal');
  };

  let activeDecisions = decisions.filter(d => !d.isArchive);
  let archivedDecisions = decisions.filter(d => d.isArchive);
  
  if (searchTerm) {
    activeDecisions = activeDecisions.filter(d => d.title.toLowerCase().includes(searchTerm.toLowerCase()));
    archivedDecisions = archivedDecisions.filter(d => d.title.toLowerCase().includes(searchTerm.toLowerCase()));
  }
  if (statusFilter !== 'All') {
    activeDecisions = activeDecisions.filter(d => d.status === statusFilter);
    archivedDecisions = archivedDecisions.filter(d => d.status === statusFilter);
  }

  const selectedDecision = decisions.find(d => d.id === selectedHistoryId);

  return (
    <div className="h-full flex flex-col max-w-[1200px] mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-serif mb-2">Command Center</h1>
        <p className="text-gray-400">Manage active simulations and calibrate AI accuracy against historical realities.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 min-h-0">
        {/* Left Col: Active & History list */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          <div className="flex items-center gap-4 mb-2">
            <div className="flex-1 relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input 
                type="text" 
                placeholder="Search decisions..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-[#111] border border-[#2A2A2A] rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-amber-500 text-white"
              />
            </div>
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-[#111] border border-[#2A2A2A] rounded-lg px-4 py-2.5 text-sm text-gray-400 hover:text-white transition-colors focus:outline-none appearance-none cursor-pointer text-center"
            >
              <option value="All">All Status</option>
              <option value="Simulating">Simulating</option>
              <option value="Draft">Draft</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>

          <div className="flex-1 bg-[#111] border border-[#2A2A2A] rounded-2xl overflow-y-auto pb-4">
            <div className="p-4 border-b border-[#222]">
              <h3 className="text-xs uppercase tracking-widest text-amber-500 font-bold">Active Decisions</h3>
            </div>
            {decisionData && (statusFilter === 'All' || statusFilter === 'Simulating') && (!searchTerm || decisionData.title.toLowerCase().includes(searchTerm.toLowerCase())) && (
              <DecisionRow 
                title={decisionData.title} 
                status="Simulating" 
                date="Just now" 
                onClick={() => setActiveModule('rehearsal')}
              />
            )}
            {!decisionData && (statusFilter === 'All' || statusFilter === 'Simulating') && (!searchTerm || "LATAM Market Entry".toLowerCase().includes(searchTerm.toLowerCase())) && (
              <DecisionRow 
                title="LATAM Market Entry" 
                status="Simulating" 
                date="Today" 
                onClick={() => setActiveModule('rehearsal')}
              />
            )}
            
            {activeDecisions.map(d => (
              <DecisionRow 
                key={d.id} 
                title={d.title} 
                status={d.status} 
                date={d.date} 
                onArchive={(e: any) => handleArchive(d.id, e)} 
              />
            ))}
            
            <div className="p-4 border-y border-[#222] mt-4 bg-black/20 flex items-center gap-2">
              <History size={16} className="text-gray-500" />
              <h3 className="text-xs uppercase tracking-widest text-gray-500 font-bold">Historical Archive & Calibration</h3>
            </div>
            
            {archivedDecisions.map(d => (
              <DecisionRow 
                key={d.id} 
                title={d.title} 
                status={d.status} 
                date={d.date} 
                isActive={selectedHistoryId === d.id} 
                onClick={() => setSelectedHistoryId(d.id)}
                onReplay={handleReplay}
                onCompare={() => setSelectedHistoryId(d.id)}
              />
            ))}
          </div>
        </div>

        {/* Right Col: Feedback Loop & Calibration */}
        <div className="lg:col-span-4 flex flex-col glass-panel rounded-2xl border border-[#2A2A2A] overflow-hidden">
          <div className="p-6 bg-gradient-to-b from-[#1a1a1a] to-transparent border-b border-[#2A2A2A]">
            <h3 className="text-sm uppercase tracking-widest text-white mb-1">Calibration Engine</h3>
            <p className="text-xs text-gray-400 mb-6">{selectedDecision?.title || 'Select a decision'}</p>
            
            <button 
              onClick={handleUpload}
              disabled={uploadState !== 'idle' || !selectedDecision}
              className="w-full relative group overflow-hidden bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 flex flex-col items-center justify-center gap-3 hover:bg-amber-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-500 group-hover:scale-110 transition-transform">
                {uploadState === 'idle' && <UploadCloud size={20} />}
                {uploadState === 'uploading' && <Loader2 size={20} className="animate-spin" />}
                {uploadState === 'complete' && <FileText size={20} />}
              </div>
              <div className="text-center">
                <p className="text-sm text-amber-500 font-medium">
                  {uploadState === 'idle' ? 'Upload Boardroom Transcript' : uploadState === 'uploading' ? 'Parsing Transcript...' : 'Transcript Parsed'}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  {uploadState === 'complete' ? 'Deviation analysis ready.' : '.txt, .pdf, or Teams/Zoom format'}
                </p>
              </div>
            </button>
          </div>

          <div className="p-6 flex-1 overflow-y-auto space-y-6">
            {uploadState === 'complete' ? (
              <>
                <div>
                  <h4 className="text-sm font-serif text-white mb-4 border-b border-[#333] pb-2">AI vs Actual Reality</h4>
                  
                  <div className="space-y-4">
                    <div className="bg-[#111] p-3 rounded-lg border border-[#222]">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-bold text-gray-400">CFO Prediction</span>
                        <span className="text-[10px] uppercase font-bold text-green-500 bg-green-500/10 px-2 py-0.5 rounded">Accurate</span>
                      </div>
                      <p className="text-xs text-gray-300">Model predicted strong dissent on DD timeline. Transcript confirms CFO mandated independent audit.</p>
                    </div>

                    <div className="bg-[#111] p-3 rounded-lg border border-amber-500/30 shadow-[inset_2px_0_0_0_#F7901D]">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-bold text-gray-400">CRO Deviation</span>
                        <span className="text-[10px] uppercase font-bold text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded">Missed Risk</span>
                      </div>
                      <p className="text-xs text-gray-300 mb-2">Model assumed CRO would support based on compliance record. Transcript shows CRO rejected due to unmodeled geopolitical cyber-risk.</p>
                      <button className="text-[10px] uppercase font-bold text-white bg-[#333] hover:bg-[#444] px-2 py-1 rounded transition-colors w-full">Update CRO Persona</button>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-serif text-white mb-4 border-b border-[#333] pb-2">Decision Alignment Score</h4>
                  <div className="flex items-end gap-2 text-amber-500">
                    <span className="text-4xl font-light font-serif">82%</span>
                    <span className="text-sm mb-1 text-gray-500">Predictive Accuracy</span>
                  </div>
                </div>
              </>
            ) : (
              <div className="h-full flex items-center justify-center text-center px-4">
                <p className="text-sm text-gray-500">Upload a transcript of the actual decision meeting to calibrate PRISM's predictive models.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function DecisionRow({ title, status, date, isActive = false, onClick, onArchive, onReplay, onCompare }: any) {
  return (
    <div onClick={onClick} className={cn(
      "group p-4 border-b border-[#222] flex items-center justify-between cursor-pointer transition-colors",
      isActive ? "bg-white/5" : "hover:bg-white/5"
    )}>
      <div className="flex items-center gap-4">
        {status === 'Resolved' 
          ? <CheckCircle2 size={18} className="text-gray-600" />
          : <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse ml-1 mr-1.5" />
        }
        <div>
          <h4 className="text-white text-sm font-medium">{title}</h4>
          <span className="text-xs text-gray-500">{date}</span>
        </div>
      </div>
      <div className="flex items-center gap-4">
        {onArchive && status !== 'Resolved' && (
          <button onClick={onArchive} className="opacity-0 group-hover:opacity-100 p-1.5 text-gray-500 hover:text-white transition-all bg-[#222] hover:bg-[#333] rounded">
            <Archive size={14} />
          </button>
        )}
        {onReplay && status === 'Resolved' && (
          <button onClick={onReplay} className="opacity-0 group-hover:opacity-100 p-1.5 text-gray-500 hover:text-white transition-all bg-[#222] hover:bg-[#333] rounded" title="Replay Simulation">
            <Play size={14} />
          </button>
        )}
        {onCompare && status === 'Resolved' && (
          <button onClick={(e) => { e.stopPropagation(); onCompare(); }} className="opacity-0 group-hover:opacity-100 p-1.5 text-gray-500 hover:text-white transition-all bg-[#222] hover:bg-[#333] rounded" title="Compare Calibration">
            <GitCompare size={14} />
          </button>
        )}
        <span className={cn(
          "text-[10px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-md border",
          status === 'Simulating' ? "border-amber-500/30 text-amber-500 bg-amber-500/10" : "border-[#333] text-gray-500"
        )}>
          {status}
        </span>
        <ChevronRight size={16} className="text-gray-600 group-hover:text-amber-500 transition-colors" />
      </div>
    </div>
  );
}

import { useState } from 'react';
import { ArrowUpRight, Download, Check, AlertCircle, FileText } from 'lucide-react';
import { usePrism } from '../context/PrismContext';
import { FinalResolutionReport } from '../components/reports/FinalResolutionReport';

export function Outcome() {
  const { decisionData, setActiveModule } = usePrism();
  const [showReport, setShowReport] = useState(false);

  const targetValuation = 25;
  const regulatoryDelay = 6;
  const competitorSpend = 40;
  const synergyRealization = 75;

  const handleExportPDF = () => {
    setShowReport(true);
  };

  return (
    <>
      {showReport && (
        <FinalResolutionReport 
          onClose={() => setShowReport(false)} 
          data={{ decisionData, targetValuation, regulatoryDelay, competitorSpend, synergyRealization }} 
        />
      )}
      <div className="h-full flex flex-col max-w-6xl mx-auto py-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-[0.2em] text-amber-600 mb-3">
            <div className="w-1.5 h-1.5 rounded-full bg-amber-600"></div>
            Strategic Resolution
          </div>
          <h1 className="text-4xl font-serif text-[#F2EFE9] mb-3">
            {decisionData?.title || 'Phased European Market Entry'}
          </h1>
          <div className="text-sm text-gray-400 font-medium">
            Resolution #4092 • Reached in 12 Turns • Confirmed by CEO
          </div>
        </div>
        <div className="sm:text-right">
          <div className="text-[10px] uppercase font-bold tracking-widest text-gray-500 mb-1">
            Confidence Score
          </div>
          <div className="text-5xl font-bold text-green-500">
            82%
          </div>
        </div>
      </div>

      {/* Summary Banner */}
      <div className="bg-[#161616] border border-[#2A2A2A] rounded-xl p-6 mb-8 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0">
        <div className="flex-1">
          <div className="text-[10px] uppercase tracking-wider text-gray-500 mb-2 font-bold">Strategic Option</div>
          <div className="text-white font-medium text-sm">
            $50M Expansion
          </div>
        </div>
        <div className="flex-1 md:border-l border-[#2A2A2A] md:pl-6">
          <div className="text-[10px] uppercase tracking-wider text-gray-500 mb-2 font-bold">Approved Budget</div>
          <div className="text-amber-500 font-medium text-sm">
            $20M (Phase 1)
          </div>
        </div>
        <div className="flex-1 md:border-l border-[#2A2A2A] md:pl-6">
          <div className="text-[10px] uppercase tracking-wider text-gray-500 mb-2 font-bold">Timeline</div>
          <div className="text-white font-medium text-sm">
            18 Months to Phase 2
          </div>
        </div>
        <div className="flex-1 md:border-l border-[#2A2A2A] md:pl-6">
          <div className="text-[10px] uppercase tracking-wider text-gray-500 mb-2 font-bold">Primary Risk</div>
          <div className="text-red-500 font-medium text-sm">
            Regulatory (GDPR)
          </div>
        </div>
      </div>

      {/* Main Content Areas */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 flex-1 pb-8 overflow-y-auto pr-2">
        {/* Left Column */}
        <div className="md:col-span-8 bg-[#161616] border border-[#2A2A2A] rounded-2xl p-6 lg:p-8 h-fit">
          {/* Executive Summary */}
          <div className="mb-10">
            <h2 className="text-xl font-serif text-[#F2EFE9] mb-4 border-b border-[#2A2A2A] pb-3">
              Executive Summary
            </h2>
            <div className="space-y-4 text-sm text-[#ceccc7] leading-relaxed font-medium">
              <p>The board has resolved to proceed with the European expansion, but explicitly rejects the proposed $50M upfront capital allocation. Due to compounding concerns over 14% operating margins and a $4M technical debt in GDPR compliance, the strategy has been pivoted to a phased entry approach.</p>
              <p>Phase 1 limits exposure to $20M for the first year. $15M is ring-fenced for the CMO's localized marketing blitz in DACH regions, while $5M is allocated to the CTO for immediate compliance retrofitting.</p>
              <p>To offset operational risks cited by the COO, we will pursue a heavy-partnership model with established local distributors, accepting lower initial unit economics in exchange for speed and reduced cap-ex.</p>
            </div>
          </div>

          {/* Action Items */}
          <div>
            <h2 className="text-xl font-serif text-[#F2EFE9] mb-6 border-b border-[#2A2A2A] pb-3">
              Action Items
            </h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-7 h-7 rounded-full border border-amber-600/50 text-amber-500 flex items-center justify-center text-xs font-bold bg-amber-900/20 shrink-0">1</div>
                <div>
                  <div className="text-[#F2EFE9] font-medium text-sm mb-1">Execute GDPR Compliance Audit</div>
                  <div className="text-xs text-gray-500">Owner: CTO & Legal | Deadline: 30 days</div>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-7 h-7 rounded-full border border-amber-600/50 text-amber-500 flex items-center justify-center text-xs font-bold bg-amber-900/20 shrink-0">2</div>
                <div>
                  <div className="text-[#F2EFE9] font-medium text-sm mb-1">Shortlist DACH Distribution Partners</div>
                  <div className="text-xs text-gray-500">Owner: COO | Deadline: 45 days</div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-7 h-7 rounded-full border border-amber-600/50 text-amber-500 flex items-center justify-center text-xs font-bold bg-amber-900/20 shrink-0">3</div>
                <div>
                  <div className="text-[#F2EFE9] font-medium text-sm mb-1">Revise FY26 Financial Projections for Phased Capital Call</div>
                  <div className="text-xs text-gray-500">Owner: CFO | Deadline: 14 days</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="md:col-span-4 flex flex-col gap-6">
          <div className="bg-[#161616] border border-[#2A2A2A] rounded-2xl p-6">
            <h3 className="text-[10px] uppercase font-bold tracking-widest text-gray-500 mb-6">
              Board Alignment
            </h3>
            <div className="space-y-5">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded border border-green-800 bg-green-900/20 flex items-center justify-center shrink-0 mt-0.5">
                  <Check size={14} className="text-green-500" />
                </div>
                <div>
                  <div className="text-sm font-bold text-[#F2EFE9]">CEO (Eleanor)</div>
                  <div className="text-xs text-gray-400 mt-0.5">Consented to phased approach</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded border border-green-800 bg-green-900/20 flex items-center justify-center shrink-0 mt-0.5">
                  <Check size={14} className="text-green-500" />
                </div>
                <div>
                  <div className="text-sm font-bold text-[#F2EFE9]">CFO (Marcus)</div>
                  <div className="text-xs text-gray-400 mt-0.5">Approved $20M ceiling</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded border border-green-800 bg-green-900/20 flex items-center justify-center shrink-0 mt-0.5">
                  <Check size={14} className="text-green-500" />
                </div>
                <div>
                  <div className="text-sm font-bold text-[#F2EFE9]">CMO (Sarah)</div>
                  <div className="text-xs text-gray-400 mt-0.5">Budget secured for DACH</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded border border-amber-800 bg-amber-900/20 flex items-center justify-center shrink-0 mt-0.5">
                  <AlertCircle size={14} className="text-amber-600" />
                </div>
                <div>
                  <div className="text-sm font-bold text-[#F2EFE9]">CTO (David)</div>
                  <div className="text-xs text-gray-400 mt-0.5">Reluctant consent; needs resources</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded border border-amber-800 bg-amber-900/20 flex items-center justify-center shrink-0 mt-0.5">
                  <AlertCircle size={14} className="text-amber-600" />
                </div>
                <div>
                  <div className="text-sm font-bold text-[#F2EFE9]">COO (James)</div>
                  <div className="text-xs text-gray-400 mt-0.5">Warns of partner dependency risks</div>
                </div>
              </div>
            </div>
          </div>

          <button 
            onClick={() => setActiveModule('analysis')}
            className="w-full bg-[#161616] hover:bg-[#201D1A] border border-[#2A2A2A] text-white py-4 rounded-xl flex items-center justify-center gap-2 text-sm font-bold transition-colors"
          >
            View Post-Debate Analysis
            <ArrowUpRight size={16} className="text-gray-400" />
          </button>

          <button onClick={handleExportPDF} className="w-full text-gray-400 hover:text-white py-2 flex items-center justify-center gap-2 text-sm font-medium transition-colors">
            <FileText size={16} />
            Generate Final Resolution
          </button>
        </div>
      </div>
    </div>
    </>
  );
}

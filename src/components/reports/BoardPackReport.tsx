import React from 'react';
import { ReportLayout } from './ReportLayout';
import { SectionHeader } from './SectionHeader';

export function BoardPackReport({ 
  onClose,
  data
}: { 
  onClose: () => void,
  data: any
}) {
  const { decisionData } = data;

  return (
    <ReportLayout 
      title="EXECUTIVE BOARD PACK" 
      subtitle={decisionData?.title || "Board Strategy Briefing"}
      onClose={onClose}
    >
      <SectionHeader title="Strategic Analysis Recap" />
      <p className="text-sm text-gray-800 leading-relaxed font-medium mb-8">
        This definitive board pack encapsulates critical strategic intelligence derived from the recent executive boardroom simulation concerning {decisionData?.title || "Key Strategic Decisions"}. 
        It details executive stance variations, scenario modelling outputs, eliminated options, and forward-looking risk assessments to prepare the board for final strategy endorsement.
      </p>

      <SectionHeader title="Decision Intelligence" />
      <div className="border border-gray-200 rounded-lg overflow-hidden mb-8 text-sm">
        <ul className="divide-y divide-gray-200">
          <li className="flex">
            <div className="w-1/3 bg-gray-50 py-3 px-4 font-bold text-gray-700 border-r border-gray-200">Decision Outcome</div>
            <div className="w-2/3 py-3 px-4 font-semibold text-gray-900 bg-white">Phased Entry ($20M Phase 1 Cap)</div>
          </li>
          <li className="flex">
            <div className="w-1/3 bg-gray-50 py-3 px-4 font-bold text-gray-700 border-r border-gray-200">Active Signals Influencing Decision</div>
             <div className="w-2/3 py-3 px-4 text-gray-800 bg-white leading-relaxed">
               • Hybrid compute constraints<br />
               • External market capital stress<br />
               • Competitor aggression indices
             </div>
          </li>
          <li className="flex">
            <div className="w-1/3 bg-gray-50 py-3 px-4 font-bold text-gray-700 border-r border-gray-200">Core Logic Formulation</div>
            <div className="w-2/3 py-3 px-4 text-gray-800 bg-white">Maximize market footprint while minimizing Year 1 operational burn rate.</div>
          </li>
          <li className="flex">
            <div className="w-1/3 bg-gray-50 py-3 px-4 font-bold text-gray-700 border-r border-gray-200">Primary Strategic Trade-off</div>
            <div className="w-2/3 py-3 px-4 text-amber-700 font-medium bg-amber-50">Accepted partnership margin dilution to secure execution velocity.</div>
          </li>
        </ul>
      </div>

      <SectionHeader title="Top Executive Analytics" />
      <div className="border border-gray-200 rounded-lg overflow-hidden mb-8">
        <table className="w-full text-left text-sm">
          <thead className="bg-[#111] text-white">
            <tr>
              <th className="py-3 px-4 font-bold uppercase tracking-wider text-xs w-1/5">Executive</th>
              <th className="py-3 px-4 font-bold uppercase tracking-wider text-xs">Influence</th>
              <th className="py-3 px-4 font-bold uppercase tracking-wider text-xs">Stance</th>
              <th className="py-3 px-4 font-bold uppercase tracking-wider text-xs">Strategic Insight / Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            <tr>
              <td className="py-3 px-4 font-bold text-gray-900">CFO (Marcus)</td>
              <td className="py-3 px-4 font-mono text-gray-600">92 / 100</td>
              <td className="py-3 px-4"><span className="text-amber-600 font-bold text-xs uppercase tracking-wider">Support</span></td>
              <td className="py-3 px-4 text-gray-700">Constrained aggressive expansion through capital survival framing.</td>
            </tr>
            <tr>
              <td className="py-3 px-4 font-bold text-gray-900">COO (James)</td>
              <td className="py-3 px-4 font-mono text-gray-600">78 / 100</td>
              <td className="py-3 px-4"><span className="text-red-600 font-bold text-xs uppercase tracking-wider">Concern</span></td>
              <td className="py-3 px-4 text-gray-700">Forced pivot to partnerships due to severe timeline integration concerns.</td>
            </tr>
            <tr>
              <td className="py-3 px-4 font-bold text-gray-900">CEO (Eleanor)</td>
              <td className="py-3 px-4 font-mono text-gray-600">75 / 100</td>
              <td className="py-3 px-4"><span className="text-amber-600 font-bold text-xs uppercase tracking-wider">Support</span></td>
              <td className="py-3 px-4 text-gray-700">Mediated dispute; favored growth but conceded to capital realities.</td>
            </tr>
            <tr>
              <td className="py-3 px-4 font-bold text-gray-900">CMO (Sarah)</td>
              <td className="py-3 px-4 font-mono text-gray-600">45 / 100</td>
              <td className="py-3 px-4"><span className="text-amber-600 font-bold text-xs uppercase tracking-wider">Support</span></td>
              <td className="py-3 px-4 text-gray-700">Secured localized DACH marketing budget but lost broader launch scale.</td>
            </tr>
            <tr>
              <td className="py-3 px-4 font-bold text-gray-900">CTO (David)</td>
              <td className="py-3 px-4 font-mono text-gray-600">30 / 100</td>
              <td className="py-3 px-4"><span className="text-gray-500 font-bold text-xs uppercase tracking-wider">Neutral</span></td>
              <td className="py-3 px-4 text-gray-700 font-medium">Technical debt warnings acknowledged but largely bypassed in Phase 1.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <SectionHeader title="Strategic Option Scorecard" />
      <div className="border border-gray-200 rounded-lg overflow-hidden mb-8">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="py-3 px-4 font-bold text-gray-900">Option Considered</th>
              <th className="py-3 px-4 font-bold text-gray-900 text-center">Financial</th>
              <th className="py-3 px-4 font-bold text-gray-900 text-center">Risk</th>
              <th className="py-3 px-4 font-bold text-gray-900 text-center">Impact</th>
              <th className="py-3 px-4 font-bold text-gray-900 text-center">Feasibility</th>
              <th className="py-3 px-4 font-bold text-gray-900">Final Outcome</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            <tr>
              <td className="py-3 px-4 font-medium text-gray-800">Immediate Expansion</td>
              <td className="py-3 px-4 text-center text-red-600 font-bold">Poor</td>
              <td className="py-3 px-4 text-center text-red-600 font-bold">High</td>
              <td className="py-3 px-4 text-center text-green-600 font-bold">High</td>
              <td className="py-3 px-4 text-center text-red-600 font-bold">Low</td>
              <td className="py-3 px-4 text-gray-500 font-medium italic">Eliminated (CFO, COO Block)</td>
            </tr>
            <tr>
              <td className="py-3 px-4 font-medium text-gray-800">Delayed Expansion</td>
              <td className="py-3 px-4 text-center text-green-600 font-bold">Excellent</td>
              <td className="py-3 px-4 text-center text-green-600 font-bold">Low</td>
              <td className="py-3 px-4 text-center text-red-600 font-bold">Low</td>
              <td className="py-3 px-4 text-center text-green-600 font-bold">High</td>
              <td className="py-3 px-4 text-gray-500 font-medium italic">Eliminated (CEO, CMO Block)</td>
            </tr>
            <tr className="bg-amber-50">
              <td className="py-3 px-4 font-bold text-gray-900 border-l-4 border-amber-500">Phased Entry</td>
              <td className="py-3 px-4 text-center text-amber-600 font-bold">Good</td>
              <td className="py-3 px-4 text-center text-amber-600 font-bold">Moderate</td>
              <td className="py-3 px-4 text-center text-amber-600 font-bold">Moderate</td>
              <td className="py-3 px-4 text-center text-green-600 font-bold">High</td>
              <td className="py-3 px-4 text-gray-900 font-bold">SELECTED / RESOLVED</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Force page break for printing */}
      <div className="print:break-before-page"></div>

      <div className="mt-8 print:mt-0">
        <SectionHeader title="Risk Intelligence: Failure Scenarios" />
        <div className="bg-white border border-red-200 rounded-lg p-6 mb-8 shadow-sm">
          <h4 className="font-serif text-xl text-red-900 font-bold mb-3 border-b border-red-100 pb-3">Primary Failure Scenario: "Death by Half-Measures"</h4>
          <p className="text-sm text-gray-800 leading-relaxed mb-6">
            <span className="font-bold">Hypothesis:</span> Phased entry starves the marketing machine, resulting in weak initial penetration against highly capitalized local incumbents, leading to a stalled phase 2.
          </p>
          
          <h5 className="text-xs uppercase tracking-widest text-red-700 font-bold mb-3">Key Sensitivity Drivers & Early Warning Signals</h5>
          <table className="w-full text-left text-sm">
            <thead className="bg-red-50 text-red-900 border-b border-red-200">
              <tr>
                <th className="py-2 px-3 font-semibold w-2/3">Early Warning Signal Indicator</th>
                <th className="py-2 px-3 font-semibold">Primary Sensitivity Driver</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-red-100">
              <tr>
                <td className="py-3 px-3 text-gray-800">CAC spikes &gt;30% above modeled baseline in Month 2</td>
                <td className="py-3 px-3 font-mono text-red-700 font-medium">Available Capital (95%)</td>
              </tr>
              <tr>
                <td className="py-3 px-3 text-gray-800">Aggressive pricing retaliation from top 3 active competitors</td>
                <td className="py-3 px-3 font-mono text-red-700 font-medium">Competitor Aggr. (82%)</td>
              </tr>
              <tr>
                <td className="py-3 px-3 text-gray-800">Local partner integration timelines exceed 14 days SLA</td>
                <td className="py-3 px-3 font-mono text-red-700 font-medium">Execution Ready (65%)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </ReportLayout>
  );
}

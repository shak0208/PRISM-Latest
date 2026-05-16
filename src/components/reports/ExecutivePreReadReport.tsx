import React from 'react';
import { ReportLayout } from './ReportLayout';
import { SectionHeader } from './SectionHeader';

export function ExecutivePreReadReport({ 
  onClose,
  data
}: { 
  onClose: () => void,
  data: any
}) {
  const { decisionData, options, complexityLevel, confidenceScore, readinessScore } = data;

  return (
    <ReportLayout 
      title="EXECUTIVE PRE-READ" 
      subtitle={decisionData?.title || "Strategic Decision"}
      onClose={onClose}
    >
      
      <SectionHeader title="Decision Framing" />
      <div className="border border-gray-200 rounded-lg overflow-hidden mb-8">
        <table className="w-full text-left text-sm">
          <tbody className="divide-y divide-gray-200">
            <tr>
              <th className="bg-gray-50 py-3 px-4 font-semibold text-gray-700 w-1/4 border-r border-gray-200">Strategic Context</th>
              <td className="py-3 px-4 text-gray-900 leading-relaxed">{decisionData?.problemStatement || "N/A"}</td>
            </tr>
            <tr>
              <th className="bg-gray-50 py-3 px-4 font-semibold text-gray-700 border-r border-gray-200">Objective</th>
              <td className="py-3 px-4 text-gray-900">{decisionData?.objective || "N/A"}</td>
            </tr>
            <tr>
              <th className="bg-gray-50 py-3 px-4 font-semibold text-gray-700 border-r border-gray-200">Timeline / Horizon</th>
              <td className="py-3 px-4 text-gray-900">{decisionData?.timeHorizon || "N/A"}</td>
            </tr>
            <tr>
              <th className="bg-gray-50 py-3 px-4 font-semibold text-gray-700 border-r border-gray-200">Urgency Lever</th>
              <td className="py-3 px-4 text-gray-900">{decisionData?.urgency || "N/A"}</td>
            </tr>
            <tr>
              <th className="bg-gray-50 py-3 px-4 font-semibold text-gray-700 border-r border-gray-200">Stakeholder Impact</th>
              <td className="py-3 px-4 text-gray-900 flex flex-wrap gap-2">
                {decisionData?.stakeholders?.map((sh: string) => (
                  <span key={sh} className="bg-gray-100 px-2 py-1 rounded text-xs font-medium text-gray-700">{sh}</span>
                ))}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-2 gap-8 mb-8">
        <div>
          <SectionHeader title="Assessment Metrics" />
          <div className="grid grid-cols-3 gap-4">
            <div className="border border-gray-200 rounded-lg p-4 text-center">
              <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Complexity</div>
              <div className="text-xl font-bold text-gray-900">{complexityLevel}</div>
            </div>
            <div className="border border-gray-200 rounded-lg p-4 text-center">
              <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Confidence</div>
              <div className="text-xl font-bold text-gray-900">{confidenceScore}%</div>
            </div>
            <div className="border border-gray-200 rounded-lg p-4 text-center">
              <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Readiness</div>
              <div className="text-xl font-bold text-gray-900">{readinessScore}/100</div>
            </div>
          </div>
        </div>

        <div>
          <SectionHeader title="Risk Profile" />
          <div className="space-y-3">
             <div className="flex items-center justify-between p-3 border border-red-200 bg-red-50 rounded-lg">
                <span className="font-semibold text-red-900 text-sm">Financial Risk</span>
                <span className="text-xs font-bold bg-red-100 text-red-800 px-2 py-1 rounded">HIGH - 85%</span>
             </div>
             <div className="flex items-center justify-between p-3 border border-amber-200 bg-amber-50 rounded-lg">
                <span className="font-semibold text-amber-900 text-sm">Operational Risk</span>
                <span className="text-xs font-bold bg-amber-100 text-amber-800 px-2 py-1 rounded">MODERATE - 60%</span>
             </div>
             <div className="flex items-center justify-between p-3 border border-red-200 bg-red-50 rounded-lg">
                <span className="font-semibold text-red-900 text-sm">Regulatory Risk</span>
                <span className="text-xs font-bold bg-red-100 text-red-800 px-2 py-1 rounded">HIGH - 75%</span>
             </div>
          </div>
        </div>
      </div>

      <SectionHeader title="Missing Data Warnings" />
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-5 mb-8 space-y-4">
        <div className="flex items-start gap-3">
          <div className="w-2 h-2 rounded-full bg-red-500 mt-1.5 shrink-0"></div>
          <p className="text-sm font-medium text-gray-800">Competitive cost assumptions incomplete. Missing Target X valuation multiples. Detailed peer analysis required for high-confidence output.</p>
        </div>
        <div className="flex items-start gap-3">
          <div className="w-2 h-2 rounded-full bg-amber-500 mt-1.5 shrink-0"></div>
          <p className="text-sm font-medium text-gray-800">Regulatory compliance barrier timelines are estimated, not verified. Simulation may underrepresent procedural delays in specific jurisdictions.</p>
        </div>
      </div>

      <SectionHeader title="Generated Strategic Options" />
      <div className="space-y-4 mb-8">
        {options.map((opt: any, index: number) => (
          <div key={opt.id} className="border border-gray-200 rounded-lg p-5">
            <h4 className="text-lg font-bold text-gray-900 mb-2 font-serif">Option {index + 1}: {opt.title}</h4>
            <p className="text-sm text-gray-700 leading-relaxed">{opt.desc}</p>
          </div>
        ))}
      </div>

      <SectionHeader title="Leadership Preparation Agenda" />
      <div className="border border-gray-200 rounded-lg p-6 bg-[#111] text-white">
        <p className="text-sm leading-relaxed mb-6 font-medium text-gray-300">
          The executive committee is advised to review these strategic choices against primary constraints. A collaborative simulation session is scheduled to debate and refine the options prior to formal board endorsement. Missing data regarding competitive cost assumptions and regulatory timelines should be acknowledged and discussed during the session.
        </p>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <h5 className="text-xs uppercase tracking-widest text-amber-500 font-bold mb-3">Key Discussion Questions</h5>
            <ul className="list-disc list-inside text-sm text-gray-300 space-y-2">
              <li>How does the timeline impact our capital reserves?</li>
              <li>Are we prepared for immediate competitive retaliation?</li>
              <li>Can technical debt be managed in parallel?</li>
            </ul>
          </div>
          <div>
            <h5 className="text-xs uppercase tracking-widest text-amber-500 font-bold mb-3">Required Next Steps</h5>
            <ul className="list-disc list-inside text-sm text-gray-300 space-y-2">
              <li>Convene executive boardroom simulation</li>
              <li>Quantify regulatory delays</li>
              <li>Establish hard budgetary ceilings</li>
            </ul>
          </div>
        </div>
      </div>

    </ReportLayout>
  );
}

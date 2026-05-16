import React from 'react';
import { ReportLayout } from './ReportLayout';
import { SectionHeader } from './SectionHeader';

export function FinalResolutionReport({ 
  onClose,
  data
}: { 
  onClose: () => void,
  data: any
}) {
  const { decisionData, targetValuation, regulatoryDelay, competitorSpend, synergyRealization } = data;

  return (
    <ReportLayout 
      title="STRATEGIC RESOLUTION MEMO" 
      subtitle={decisionData?.title || "Resolution Memo"}
      onClose={onClose}
    >
      <SectionHeader title="Executive Summary" />
      <p className="text-sm text-gray-800 leading-relaxed font-medium mb-8">
        The executive leadership team has successfully resolved the strategic debate regarding {decisionData?.title || "the initiative"}. 
        The board has resolved to proceed with the initiative, explicitly pivoting to a phased entry approach, 
        balancing strategic urgency with capital preservation and deliberately managing technical debt risks.
      </p>

      <div className="grid grid-cols-2 gap-8 mb-8">
        <div>
          <SectionHeader title="Decision Metadata" />
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <table className="w-full text-left text-sm">
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <th className="bg-gray-50 py-3 px-4 font-semibold text-gray-700 w-1/2">Strategic Directive</th>
                  <td className="py-3 px-4 text-gray-900 font-bold">Phased Entry</td>
                </tr>
                <tr>
                  <th className="bg-gray-50 py-3 px-4 font-semibold text-gray-700">Confidence Score</th>
                  <td className="py-3 px-4 text-gray-900 font-bold">82%</td>
                </tr>
                <tr>
                  <th className="bg-gray-50 py-3 px-4 font-semibold text-gray-700">Resolution Status</th>
                  <td className="py-3 px-4 text-gray-900 font-bold text-amber-600">Approved for Execution</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <SectionHeader title="Governing Parameters" />
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <table className="w-full text-left text-sm">
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <th className="bg-gray-50 py-3 px-4 font-semibold text-gray-700">Valuation Impact Allocation</th>
                  <td className="py-3 px-4 text-gray-900 font-mono">${targetValuation}M Ceiling</td>
                </tr>
                <tr>
                  <th className="bg-gray-50 py-3 px-4 font-semibold text-gray-700">Regulatory Delay Risk</th>
                  <td className="py-3 px-4 text-gray-900 font-mono">{regulatoryDelay} Months</td>
                </tr>
                <tr>
                  <th className="bg-gray-50 py-3 px-4 font-semibold text-gray-700">Expected Competitor Spend</th>
                  <td className="py-3 px-4 text-gray-900 font-mono">${competitorSpend}M</td>
                </tr>
                <tr>
                  <th className="bg-gray-50 py-3 px-4 font-semibold text-gray-700">Synergy Realization</th>
                  <td className="py-3 px-4 text-gray-900 font-mono">{synergyRealization}%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <SectionHeader title="Executive Alignment Matrix" />
      <div className="border border-gray-200 rounded-lg overflow-hidden mb-8">
        <table className="w-full text-left text-sm">
          <thead className="bg-[#111] text-white">
            <tr>
              <th className="py-3 px-4 font-bold uppercase tracking-wider text-xs">Executive</th>
              <th className="py-3 px-4 font-bold uppercase tracking-wider text-xs">Final Stance</th>
              <th className="py-3 px-4 font-bold uppercase tracking-wider text-xs">Dissent / Notes</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            <tr>
              <td className="py-3 px-4 font-semibold text-gray-900">CEO</td>
              <td className="py-3 px-4"><span className="bg-amber-100 text-amber-800 px-2 py-1 rounded text-xs font-bold uppercase">Consented</span></td>
              <td className="py-3 px-4 text-gray-700">Consented to phased approach over immediate expansion.</td>
            </tr>
            <tr>
              <td className="py-3 px-4 font-semibold text-gray-900">CFO</td>
              <td className="py-3 px-4"><span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-bold uppercase">Approved</span></td>
              <td className="py-3 px-4 text-gray-700">Approved absolute maximum $20M ceiling for Phase 1.</td>
            </tr>
            <tr>
              <td className="py-3 px-4 font-semibold text-gray-900">CMO</td>
              <td className="py-3 px-4"><span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-bold uppercase">Secured</span></td>
              <td className="py-3 px-4 text-gray-700">Secured guaranteed budget for localized DACH region push.</td>
            </tr>
            <tr>
              <td className="py-3 px-4 font-semibold text-gray-900">CTO</td>
              <td className="py-3 px-4"><span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs font-bold uppercase">Reluctant</span></td>
              <td className="py-3 px-4 text-gray-700 font-medium">Critical warning: Additional resources required for compliance debt.</td>
            </tr>
            <tr>
              <td className="py-3 px-4 font-semibold text-gray-900">COO</td>
              <td className="py-3 px-4"><span className="bg-amber-100 text-amber-800 px-2 py-1 rounded text-xs font-bold uppercase">Concern</span></td>
              <td className="py-3 px-4 text-gray-700">Warns of severe partner dependency risks in Year 1.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <SectionHeader title="Execution Strategy & Next Steps" />
      <div className="border border-gray-200 rounded-lg overflow-hidden mb-8">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="py-3 px-4 font-bold text-gray-900">Key Action Item</th>
              <th className="py-3 px-4 font-bold text-gray-900">Executive Owner</th>
              <th className="py-3 px-4 font-bold text-gray-900">Required Timeline</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            <tr>
              <td className="py-3 px-4 text-gray-800 font-medium">Execute GDPR and regional compliance audit</td>
              <td className="py-3 px-4 text-gray-600 font-semibold">CTO & Legal</td>
              <td className="py-3 px-4 text-gray-900">30 Days</td>
            </tr>
            <tr>
              <td className="py-3 px-4 text-gray-800 font-medium">Shortlist and finalize DACH distribution partners</td>
              <td className="py-3 px-4 text-gray-600 font-semibold">COO & Region Head</td>
              <td className="py-3 px-4 text-gray-900">45 Days</td>
            </tr>
            <tr>
              <td className="py-3 px-4 text-gray-800 font-medium">Revise Q3 projections for phased capital call</td>
              <td className="py-3 px-4 text-gray-600 font-semibold">CFO Office</td>
              <td className="py-3 px-4 text-gray-900">14 Days</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="bg-[#111] p-6 rounded-lg text-white border-l-4 border-amber-500">
        <h4 className="font-bold text-amber-500 uppercase tracking-widest text-xs mb-2">Executive Recommendation</h4>
        <p className="text-sm font-medium leading-relaxed">
          The PMO is authorized to begin mobilization immediately across the defined Phase 1 scope.
          The CTO must present a revised capacity plan addressing compliance debt within 14 days to unblock engineering.
        </p>
      </div>

    </ReportLayout>
  );
}

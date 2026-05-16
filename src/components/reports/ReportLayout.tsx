import React from 'react';
import { Printer, X } from 'lucide-react';

export function ReportLayout({ 
  title, 
  subtitle, 
  onClose, 
  children 
}: { 
  title: string, 
  subtitle?: string, 
  onClose: () => void, 
  children: React.ReactNode 
}) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-[100] bg-gray-100 overflow-y-auto print:bg-white print:p-0">
      {/* Report Container */}
      <div className="bg-white text-gray-900 w-full max-w-5xl mx-auto shadow-xl relative print:shadow-none print:max-w-none min-h-screen flex flex-col my-0 sm:my-8">
        
        {/* Print / Close Actions (Hidden when printing) */}
        <div className="absolute top-4 right-4 flex items-center gap-2 print:hidden z-10">
          <button 
            onClick={handlePrint}
            className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded text-sm font-medium transition-colors border border-gray-300"
          >
            <Printer size={16} /> Print / Save PDF
          </button>
          <button 
            onClick={onClose}
            className="p-1.5 bg-gray-100 hover:bg-gray-200 text-gray-500 rounded transition-colors border border-gray-300"
          >
            <X size={16} />
          </button>
        </div>

        {/* Fortune 500 Executive Header */}
        <div className="border-b-4 border-[#111] pb-6 pt-12 px-12 print:pt-8 relative">
          <div className="absolute top-0 left-0 w-full h-2 bg-amber-500"></div>
          
          <div className="flex justify-between items-end mb-6">
            <div>
              <h1 className="text-4xl font-serif font-bold text-[#111] tracking-tight">P R I S M</h1>
              <p className="text-xs uppercase tracking-widest text-gray-500 mt-1 font-semibold">Strategic Intelligence Platform</p>
            </div>
            <div className="text-right">
              <h2 className="text-2xl font-bold text-[#111] leading-tight">{title}</h2>
              {subtitle && <p className="text-sm font-medium text-gray-500 mt-1 max-w-md">{subtitle}</p>}
            </div>
          </div>
          
          <div className="flex justify-between items-center text-xs font-semibold text-gray-400 uppercase tracking-widest pt-4 border-t border-gray-200">
            <span>Confidential - Internal Executive Use Only</span>
            <span>Generated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
          </div>
        </div>

        {/* Report Content */}
        <div className="px-12 py-8 print:px-8 flex-grow">
          {children}
        </div>

        {/* Footer */}
        <div className="px-12 pb-8 pt-4 print:px-8 print:pb-4 border-t border-gray-200 text-xs text-gray-400 font-semibold uppercase tracking-wider flex justify-between">
          <span>PRISM Strategic Intelligence</span>
          <span>End of Report</span>
        </div>
      </div>
    </div>
  );
}

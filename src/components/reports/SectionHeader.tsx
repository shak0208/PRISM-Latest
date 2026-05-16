import React from 'react';

export function SectionHeader({ title }: { title: string }) {
  return (
    <div className="mb-6 mt-10 first:mt-0">
      <h3 className="text-xl font-bold text-[#111] uppercase tracking-wide mb-2">
        {title}
      </h3>
      <div className="w-16 h-1 bg-amber-500 rounded-full"></div>
    </div>
  );
}

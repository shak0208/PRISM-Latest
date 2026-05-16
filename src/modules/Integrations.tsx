import { useState } from 'react';
import { Database, Link2, AlertCircle, RefreshCw, CheckCircle2, Search, Filter } from 'lucide-react';

const initialSources = [
  { name: 'SAP S/4HANA', category: 'ERP', status: 'Live', time: '10m ago' },
  { name: 'Salesforce', category: 'CRM', status: 'Live', time: '2m ago' },
  { name: 'Power BI', category: 'Analytics', status: 'Syncing', time: 'In progress' },
  { name: 'Oracle NetSuite', category: 'ERP', status: 'Disconnected', time: '-' },
  { name: 'MS Dynamics 365', category: 'CRM', status: 'Auth Required', time: '-' },
  { name: 'HubSpot', category: 'CRM', status: 'Live', time: '1h ago' },
  { name: 'Tableau', category: 'Analytics', status: 'Live', time: '5m ago' },
  { name: 'Google Drive', category: 'Documents', status: 'Live', time: 'Just now' },
  { name: 'SharePoint', category: 'Documents', status: 'Live', time: 'Just now' },
  { name: 'Confluence', category: 'Knowledge', status: 'Syncing', time: 'In progress' },
  { name: 'Slack', category: 'Communications', status: 'Live', time: 'Active' },
  { name: 'MS Teams', category: 'Communications', status: 'Auth Required', time: '-' },
];

export function Integrations() {
  const [sources, setSources] = useState([...initialSources]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');

  const categories = ['All', ...Array.from(new Set(initialSources.map(s => s.category)))];

  const filteredSources = sources.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'All' || s.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const liveCount = filteredSources.filter(s => s.status === 'Live').length;
  const syncingCount = filteredSources.filter(s => s.status === 'Syncing').length;
  const authCount = filteredSources.filter(s => s.status === 'Auth Required').length;
  const disconnectedCount = filteredSources.filter(s => s.status === 'Disconnected').length;

  const handleCardClick = (targetName: string) => {
    setSources(current => current.map(s => {
      if (s.name !== targetName) return s;
      
      if (s.status === 'Live') return { ...s, status: 'Disconnected', time: '-' };
      if (s.status === 'Disconnected' || s.status === 'Auth Required') return { ...s, status: 'Syncing', time: 'In progress' };
      if (s.status === 'Syncing') return { ...s, status: 'Live', time: 'Just now' };
      
      return s;
    }));

    const source = sources.find(s => s.name === targetName);
    if (source && (source.status === 'Disconnected' || source.status === 'Auth Required')) {
      setTimeout(() => {
        setSources(curr => curr.map(s => 
          s.name === targetName ? { ...s, status: 'Live', time: 'Just now' } : s
        ));
      }, 2500);
    }
  };

  return (
    <div className="h-full flex flex-col max-w-6xl mx-auto py-8">
      <div className="flex justify-between items-start md:items-end flex-col md:flex-row gap-4 mb-8">
        <div>
          <h1 className="text-4xl font-serif mb-2">Enterprise Connections</h1>
          <p className="text-gray-400">Ground simulations in real-time cross-functional data.</p>
        </div>
        <div className="flex flex-wrap items-center gap-4 w-full md:w-auto">
          <div className="flex w-full sm:w-auto items-center gap-3">
            <div className="relative flex-1 sm:flex-none">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input 
                type="text" 
                placeholder="Search Integrations..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full sm:w-64 bg-[#111] border border-[#2A2A2A] rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-amber-500 text-white"
              />
            </div>
            <select 
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="bg-[#111] border border-[#2A2A2A] rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-amber-500 text-white appearance-none min-w-[120px]"
            >
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <button className="flex items-center gap-2 bg-[#222] hover:bg-[#333] text-white px-5 py-2.5 rounded-lg text-sm transition-colors border border-[#444]">
            <Link2 size={16} />
            Add Connection
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <SummaryCard label="Connected" value={liveCount} color="text-green-500" />
        <SummaryCard label="Syncing" value={syncingCount} color="text-blue-500" />
        <SummaryCard label="Auth Required" value={authCount} color="text-amber-500" />
        <SummaryCard label="Disconnected" value={disconnectedCount} color="text-red-500" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 overflow-y-auto pb-8 pr-2">
        {filteredSources.map(s => (
          <IntegrationCard key={s.name} {...s} onClick={() => handleCardClick(s.name)} />
        ))}
      </div>
    </div>
  );
}

function SummaryCard({ label, value, color }: any) {
  return (
    <div className="bg-[#111] p-5 rounded-2xl border border-[#222]">
      <span className="text-xs uppercase tracking-widest text-gray-500 font-bold block mb-2">{label}</span>
      <span className={`text-4xl font-light font-serif ${color}`}>{value}</span>
    </div>
  );
}

function IntegrationCard({ name, category, status, time, onClick }: any) {
  let statusIcon;
  let statusColor;

  switch (status) {
    case 'Live':
      statusIcon = <CheckCircle2 size={14} className="text-green-400" />;
      statusColor = 'text-green-400 bg-green-400/10 border-green-400/20';
      break;
    case 'Syncing':
      statusIcon = <RefreshCw size={14} className="text-blue-400 animate-spin" />;
      statusColor = 'text-blue-400 bg-blue-400/10 border-blue-400/20';
      break;
    case 'Auth Required':
      statusIcon = <AlertCircle size={14} className="text-amber-400" />;
      statusColor = 'text-amber-400 bg-amber-400/10 border-amber-400/20';
      break;
    case 'Disconnected':
      statusIcon = <AlertCircle size={14} className="text-red-400" />;
      statusColor = 'text-red-400 bg-red-400/10 border-red-400/20';
      break;
  }

  return (
    <div onClick={onClick} className="glass-panel p-5 rounded-2xl border border-[#222] hover:border-[#444] transition-all flex flex-col group cursor-pointer">
      <div className="flex justify-between items-start mb-6">
        <div className="w-10 h-10 rounded-lg bg-[#1A1A1A] border border-[#333] flex items-center justify-center text-gray-400 group-hover:text-amber-500 transition-colors">
          <Database size={20} />
        </div>
        <span className="text-xs font-mono text-gray-600">{category}</span>
      </div>
      
      <h3 className="text-lg text-white font-medium mb-4 truncate">{name}</h3>
      
      <div className="mt-auto flex items-center justify-between">
        <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] uppercase tracking-wider font-bold border ${statusColor}`}>
          {statusIcon}
          {status}
        </div>
        <span className="text-xs text-gray-600">{time}</span>
      </div>
    </div>
  );
}

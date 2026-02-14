
import React from 'react';
import { OT_CURRICULUM } from '../constants';
import { Module } from '../types';

interface SidebarProps {
  selectedYear: number;
  onSelectYear: (year: number) => void;
  activeModuleId: string | null;
  onSelectModule: (id: string) => void;
  completedIds: string[];
}

const Sidebar: React.FC<SidebarProps> = ({ 
  selectedYear, 
  onSelectYear, 
  activeModuleId, 
  onSelectModule,
  completedIds 
}) => {
  const years = [1, 2, 3]; // Updated to 3 years
  const filteredModules = OT_CURRICULUM.filter(m => m.year === selectedYear);

  return (
    <div className="w-80 h-screen bg-white border-r border-slate-200 flex flex-col fixed left-0 top-0 z-10">
      <div className="p-6 border-b border-slate-100 bg-indigo-50/30">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-indigo-600 rounded-lg">
            <i className="fas fa-graduation-cap text-white text-xl"></i>
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-800">OT Pathway</h1>
            <p className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">3-Year Intensive</p>
          </div>
        </div>
        
        <div className="flex gap-2 p-1 bg-slate-100 rounded-lg">
          {years.map(y => (
            <button
              key={y}
              onClick={() => onSelectYear(y)}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-all ${
                selectedYear === y 
                  ? 'bg-white text-indigo-600 shadow-sm' 
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              Year {y}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-hide">
        <h2 className="px-2 text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
          Clinical Power Modules
        </h2>
        {filteredModules.map(module => {
          const isCompleted = completedIds.includes(module.id);
          const isActive = activeModuleId === module.id;

          return (
            <button
              key={module.id}
              onClick={() => onSelectModule(module.id)}
              className={`w-full text-left p-3 rounded-xl border transition-all duration-200 group relative ${
                isActive 
                  ? 'bg-indigo-50 border-indigo-200 shadow-sm' 
                  : 'bg-white border-slate-100 hover:border-indigo-100 hover:shadow-sm'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className={`text-xs font-medium mb-1 ${isActive ? 'text-indigo-600' : 'text-slate-500'}`}>
                    {module.category}
                  </p>
                  <h3 className={`text-sm font-bold leading-tight ${isActive ? 'text-indigo-900' : 'text-slate-800'}`}>
                    {module.title}
                  </h3>
                </div>
                {isCompleted && (
                  <i className="fas fa-check-circle text-emerald-500 ml-2"></i>
                )}
              </div>
              <div className="mt-3 flex items-center gap-3 text-[10px] text-slate-400">
                <span className="flex items-center gap-1">
                  <i className="far fa-clock"></i> {module.estimatedHours}h
                </span>
                <span className={`px-2 py-0.5 rounded-full ${
                  module.difficulty === 'High' ? 'bg-orange-50 text-orange-600' :
                  module.difficulty === 'Medium' ? 'bg-blue-50 text-blue-600' : 'bg-emerald-50 text-emerald-600'
                }`}>
                  {module.difficulty}
                </span>
              </div>
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-indigo-600 rounded-r-full" />
              )}
            </button>
          );
        })}
      </div>

      <div className="p-4 border-t border-slate-100 bg-slate-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
            JD
          </div>
          <div>
            <p className="text-sm font-bold text-slate-800">Jane Doe</p>
            <p className="text-xs text-slate-500">7 Day Intensive Streak 🔥</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;


import React, { useState, useEffect, useMemo } from 'react';
import Sidebar from './components/Sidebar';
import FocusTools from './components/FocusTools';
import ModuleDetail from './components/ModuleDetail';
import { OT_CURRICULUM } from './constants';
import { UserProgress } from './types';

const App: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState<number>(1);
  const [activeModuleId, setActiveModuleId] = useState<string | null>(OT_CURRICULUM[0].id);
  const [progress, setProgress] = useState<UserProgress>(() => {
    const saved = localStorage.getItem('ot_pathway_progress');
    return saved ? JSON.parse(saved) : {
      completedTopics: [],
      activeModuleId: OT_CURRICULUM[0].id,
      dailyStreak: 0,
      lastActive: new Date().toISOString()
    };
  });

  useEffect(() => {
    localStorage.setItem('ot_pathway_progress', JSON.stringify(progress));
  }, [progress]);

  const activeModule = useMemo(() => 
    OT_CURRICULUM.find(m => m.id === activeModuleId) || OT_CURRICULUM[0],
    [activeModuleId]
  );

  const completedModuleIds = useMemo(() => {
    return OT_CURRICULUM.filter(m => 
      m.topics.every(t => progress.completedTopics.includes(t))
    ).map(m => m.id);
  }, [progress.completedTopics]);

  const handleCompleteTopic = (topic: string) => {
    setProgress(prev => {
      const isAlreadyCompleted = prev.completedTopics.includes(topic);
      return {
        ...prev,
        completedTopics: isAlreadyCompleted 
          ? prev.completedTopics.filter(t => t !== topic)
          : [...prev.completedTopics, topic]
      };
    });
  };

  return (
    <div className="min-h-screen flex bg-[#f8fafc]">
      {/* Sidebar - Fixed */}
      <Sidebar 
        selectedYear={selectedYear}
        onSelectYear={setSelectedYear}
        activeModuleId={activeModuleId}
        onSelectModule={setActiveModuleId}
        completedIds={completedModuleIds}
      />

      {/* Main Content Area */}
      <main className="flex-1 ml-80 p-8 lg:p-12">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12">
          
          {/* Main View */}
          <div className="flex-1">
            <header className="mb-12 flex items-center justify-between">
              <div>
                <p className="text-indigo-600 font-bold text-xs uppercase tracking-widest mb-1">3-Year Intensive Bachelor of Occupational Therapy</p>
                <div className="flex items-center gap-4">
                  <h2 className="text-3xl font-black text-slate-900 tracking-tight">Clinical Pathway</h2>
                  <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></div>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-100 rounded-xl text-sm font-bold text-slate-600 hover:shadow-sm transition-all">
                  <i className="fas fa-chart-line text-indigo-500"></i>
                  Progress
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all">
                  <i className="fas fa-wand-magic-sparkles"></i>
                  Clinical AI
                </button>
              </div>
            </header>

            <ModuleDetail 
              module={activeModule} 
              completedTopics={progress.completedTopics}
              onCompleteTopic={handleCompleteTopic}
            />
          </div>

          {/* Right Sidebar - Focus Tools */}
          <aside className="w-full lg:w-80 space-y-8 sticky top-12 self-start">
            <FocusTools />
            
            <div className="bg-indigo-600 rounded-3xl p-6 text-white overflow-hidden relative">
                <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
                <h4 className="text-lg font-bold mb-2">Fast-Track Tip</h4>
                <p className="text-sm opacity-90 leading-relaxed mb-4">
                    Since this is a 3-year intensive, your brain needs more "sensory snacks." Try using a fidget spinner while reviewing these clinical cases.
                </p>
                <div className="flex justify-between items-center mt-6">
                    <span className="text-[10px] uppercase font-bold tracking-widest bg-white/20 px-2 py-1 rounded">Intensive Note</span>
                    <button className="w-8 h-8 flex items-center justify-center bg-white/20 rounded-lg hover:bg-white/30 transition-all">
                        <i className="fas fa-chevron-right text-xs"></i>
                    </button>
                </div>
            </div>

            <div className="p-6 bg-white rounded-3xl border border-slate-100">
                <h4 className="font-bold text-slate-800 mb-4">Classmates Online</h4>
                <div className="space-y-4">
                    {[
                        { name: 'Sarah', status: 'In Neuro Lab', color: 'bg-emerald-500' },
                        { name: 'Marcus', status: 'Studying ADLs', color: 'bg-indigo-500' },
                        { name: 'Li', status: 'Practicing Splinting', color: 'bg-orange-500' }
                    ].map((user, i) => (
                        <div key={i} className="flex items-center gap-3">
                            <div className={`w-2 h-2 rounded-full ${user.color}`}></div>
                            <div className="flex-1">
                                <p className="text-xs font-bold text-slate-800">{user.name}</p>
                                <p className="text-[10px] text-slate-500">{user.status}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default App;


import React, { useState, useEffect } from 'react';
import { Module } from '../types';
import { getExplanation } from '../services/gemini';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

interface ModuleDetailProps {
  module: Module;
  onCompleteTopic: (topic: string) => void;
  completedTopics: string[];
}

const ModuleDetail: React.FC<ModuleDetailProps> = ({ module, onCompleteTopic, completedTopics }) => {
  const [aiResponse, setAiResponse] = useState<string>('');
  const [isAiLoading, setIsAiLoading] = useState<boolean>(false);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  const handleExplainTopic = async (topic: string) => {
    setSelectedTopic(topic);
    setIsAiLoading(true);
    const result = await getExplanation(topic, `Module: ${module.title}. Focus on practical, hands-on clinic advice for a student with ADHD.`);
    setAiResponse(result);
    setIsAiLoading(false);
  };

  const progressPercent = Math.round((completedTopics.filter(t => module.topics.includes(t)).length / module.topics.length) * 100);

  const data = [
    { name: 'Mon', progress: 10 },
    { name: 'Tue', progress: 15 },
    { name: 'Wed', progress: 30 },
    { name: 'Thu', progress: progressPercent },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header Card */}
      <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full -mr-20 -mt-20 opacity-50 blur-3xl"></div>
        <div className="relative">
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-emerald-100 text-emerald-700 text-[10px] font-black uppercase px-2 py-1 rounded">
              Clinical Track: Year {module.year}
            </span>
            <span className="bg-indigo-100 text-indigo-700 text-[10px] font-black uppercase px-2 py-1 rounded">
              {module.category}
            </span>
          </div>
          <h1 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">
            {module.title}
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl leading-relaxed italic">
            " {module.description} "
          </p>
          
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Clinical Competency</span>
              <div className="flex items-center gap-4">
                <div className="flex-1 h-3 bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-emerald-500 rounded-full transition-all duration-1000" 
                    style={{ width: `${progressPercent}%` }}
                  ></div>
                </div>
                <span className="text-lg font-bold text-slate-800">{progressPercent}%</span>
              </div>
            </div>
            <div className="bg-indigo-50/50 p-4 rounded-2xl border border-indigo-100 flex flex-col justify-center">
                <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-1">Practical Goal</span>
                <p className="text-xs font-bold text-indigo-800 leading-tight">
                  {module.practicalGoal}
                </p>
            </div>
            <div className="flex items-center justify-end gap-2">
                <button className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-slate-800 transition-all shadow-lg">
                    <i className="fas fa-play"></i> Start Lab
                </button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Topic List */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xl font-bold text-slate-800 mb-4">Clinical Skills to Master</h2>
          <div className="grid grid-cols-1 gap-3">
            {module.topics.map((topic, i) => {
              const isDone = completedTopics.includes(topic);
              const isSelected = selectedTopic === topic;
              
              return (
                <div 
                  key={i}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                    isSelected ? 'bg-indigo-50 border-indigo-300 ring-2 ring-indigo-100' : 'bg-white border-slate-100 hover:border-indigo-200'
                  }`}
                  onClick={() => handleExplainTopic(topic)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <button 
                        onClick={(e) => { e.stopPropagation(); onCompleteTopic(topic); }}
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                          isDone ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-slate-200'
                        }`}
                      >
                        {isDone && <i className="fas fa-check text-[10px]"></i>}
                      </button>
                      <div>
                        <h3 className={`font-bold ${isDone ? 'text-slate-400' : 'text-slate-800'}`}>
                          {topic}
                        </h3>
                        <p className="text-[10px] text-slate-400 font-bold uppercase mt-0.5">Clinical Technique</p>
                      </div>
                    </div>
                    <i className={`fas fa-chevron-right text-slate-300 transition-transform ${isSelected ? 'rotate-90 text-indigo-400' : ''}`}></i>
                  </div>
                </div>
              );
            })}
          </div>

          {/* AI Explanation Area */}
          {(isAiLoading || aiResponse) && (
            <div className="mt-8 bg-white rounded-3xl p-8 border border-indigo-100 shadow-xl shadow-indigo-50/50 animate-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center">
                    <i className="fas fa-user-md text-white"></i>
                  </div>
                  <div>
                    <h4 className="font-black text-slate-900">Mentor Clinical Notes</h4>
                    <p className="text-xs text-indigo-500 font-bold uppercase tracking-tight">Skill: {selectedTopic}</p>
                  </div>
                </div>
                {isAiLoading && <div className="animate-spin h-5 w-5 border-2 border-indigo-500 border-t-transparent rounded-full"></div>}
              </div>
              
              <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-4">
                {isAiLoading ? (
                  <div className="space-y-3">
                    <div className="h-4 bg-slate-100 rounded w-3/4 animate-pulse"></div>
                    <div className="h-4 bg-slate-100 rounded w-full animate-pulse"></div>
                  </div>
                ) : (
                  <div className="whitespace-pre-wrap font-medium text-sm md:text-base">
                    {aiResponse}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Action Sidebar */}
        <div className="space-y-6">
            <div className="bg-emerald-600 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden">
                <i className="fas fa-hand-sparkles absolute -right-4 -top-4 text-8xl opacity-10 rotate-12"></i>
                <h4 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <i className="fas fa-stethoscope"></i>
                    Hands-On Lab
                </h4>
                <div className="p-4 bg-white/10 rounded-2xl mb-6 backdrop-blur-sm border border-white/10">
                    <p className="text-sm font-bold leading-relaxed">
                        Today's Physical Challenge:
                    </p>
                    <p className="text-xs mt-2 opacity-90 italic leading-tight">
                        {module.practicalGoal}
                    </p>
                </div>
                <button className="w-full py-4 bg-white text-emerald-700 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-emerald-50 transition-all shadow-lg">
                    I Did This! (+50 XP)
                </button>
            </div>

            <div className="bg-slate-900 rounded-3xl p-6 text-white border border-slate-800">
                <h4 className="text-slate-400 font-bold text-xs uppercase tracking-widest mb-4 flex items-center gap-2">
                    <i className="fas fa-lightbulb text-yellow-400"></i>
                    ADHD Focus Tip
                </h4>
                <p className="text-sm font-medium leading-relaxed mb-4">
                    "If your brain is buzzing, stand up. OT is a physical job. Try reading while walking or standing at a counter. It helps the neuro-chemistry settle."
                </p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ModuleDetail;

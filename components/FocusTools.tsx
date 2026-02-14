
import React, { useState, useEffect, useRef } from 'react';

const FocusTools: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState<'Work' | 'Break'>('Work');
  
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      timerRef.current = window.setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      if (mode === 'Work') {
        setMode('Break');
        setTimeLeft(5 * 60);
      } else {
        setMode('Work');
        setTimeLeft(25 * 60);
      }
      setIsActive(false);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [isActive, timeLeft, mode]);

  const toggleTimer = () => setIsActive(!isActive);
  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(mode === 'Work' ? 25 * 60 : 5 * 60);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold text-slate-800 flex items-center gap-2">
          <i className="fas fa-brain text-indigo-500"></i>
          Focus Flow
        </h3>
        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
          mode === 'Work' ? 'bg-rose-50 text-rose-600' : 'bg-emerald-50 text-emerald-600'
        }`}>
          {mode} Session
        </span>
      </div>

      <div className="text-center mb-6">
        <div className="text-5xl font-black text-slate-800 tabular-nums tracking-tight">
          {formatTime(timeLeft)}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={toggleTimer}
          className={`py-3 rounded-xl font-bold transition-all ${
            isActive 
              ? 'bg-slate-100 text-slate-600 hover:bg-slate-200' 
              : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md shadow-indigo-100'
          }`}
        >
          {isActive ? 'Pause' : 'Start'}
        </button>
        <button
          onClick={resetTimer}
          className="py-3 rounded-xl bg-slate-50 text-slate-600 font-bold hover:bg-slate-100 transition-all"
        >
          Reset
        </button>
      </div>

      <div className="mt-8">
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Quick ADHD Strategies</h4>
        <ul className="space-y-2">
          {[
            { icon: 'fa-shoe-prints', text: '5-min Movement Break' },
            { icon: 'fa-tint', text: 'Drink Water' },
            { icon: 'fa-wind', text: 'Box Breathing' }
          ].map((item, i) => (
            <li key={i} className="flex items-center gap-3 text-sm text-slate-600 p-2 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer border border-transparent hover:border-slate-100">
              <i className={`fas ${item.icon} text-indigo-400 w-4`}></i>
              {item.text}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FocusTools;

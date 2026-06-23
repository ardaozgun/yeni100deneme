'use client';
import { useState } from 'react';
import { useData } from '@/providers/DataProvider';
import { ChevronDown, ChevronUp } from 'lucide-react';

const DERSLER = [
  { key: 'turkce', label: 'Türkçe', total: 46 },
  { key: 'matematik', label: 'Matematik', total: 81 },
  { key: 'tarih', label: 'Tarih', total: 60 },
  { key: 'cografya', label: 'Coğrafya', total: 34 },
  { key: 'vatandaslik', label: 'Vatandaşlık', total: 48 },
];

export default function VideolarPage() {
  const { videos, setVideos } = useData();
  const [open, setOpen] = useState<string | null>(null);

  function toggle(key: string, idx: number) {
    const cur = videos[key] ?? [];
    const next = cur.includes(idx) ? cur.filter(i => i !== idx) : [...cur, idx];
    setVideos({ ...videos, [key]: next });
  }

  function markAll(key: string, total: number) {
    setVideos({ ...videos, [key]: Array.from({ length: total }, (_, i) => i + 1) });
  }

  function clearAll(key: string) {
    setVideos({ ...videos, [key]: [] });
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-white mb-6">Videolar</h1>
      <div className="space-y-3">
        {DERSLER.map(d => {
          const watched = videos[d.key]?.length ?? 0;
          const pct = Math.round((watched / d.total) * 100);
          const isOpen = open === d.key;
          return (
            <div key={d.key} className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
              <button
                onClick={() => setOpen(isOpen ? null : d.key)}
                className="w-full flex items-center justify-between p-4 text-left"
              >
                <div>
                  <span className="text-white font-medium">{d.label}</span>
                  <span className="text-gray-400 text-sm ml-3">{watched}/{d.total} ({pct}%)</span>
                </div>
                {isOpen ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
              </button>
              {isOpen && (
                <div className="px-4 pb-4">
                  <div className="flex gap-2 mb-3">
                    <button onClick={() => markAll(d.key, d.total)} className="text-xs bg-violet-700 hover:bg-violet-600 text-white px-3 py-1 rounded-lg">Tümünü İşaretle</button>
                    <button onClick={() => clearAll(d.key)} className="text-xs bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded-lg">Temizle</button>
                  </div>
                  <div className="grid grid-cols-6 sm:grid-cols-10 gap-1.5">
                    {Array.from({ length: d.total }, (_, i) => i + 1).map(idx => {
                      const checked = (videos[d.key] ?? []).includes(idx);
                      return (
                        <button
                          key={idx}
                          onClick={() => toggle(d.key, idx)}
                          className={`text-xs py-1.5 rounded font-medium transition ${
                            checked ? 'bg-violet-600 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                          }`}
                        >
                          {idx}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

"use client";
import { useEffect, useState } from "react";
import { ChevronDown, ChevronUp, CheckSquare, Square } from "lucide-react";
import { getVideoProgress, setVideoProgress } from "@/lib/storage";

const DERSLER = [
  { key: "turkce", label: "Türkçe", emoji: "📖", toplam: 46, renk: "violet" },
  { key: "matematik", label: "Matematik", emoji: "🔢", toplam: 81, renk: "blue" },
  { key: "tarih", label: "Tarih", emoji: "🏛️", toplam: 60, renk: "orange" },
  { key: "cografya", label: "Coğrafya", emoji: "🗺️", toplam: 34, renk: "green" },
  { key: "vatandaslik", label: "Vatandaşlık", emoji: "⚖️", toplam: 48, renk: "pink" },
];

const renkMap: Record<string, { bar: string; badge: string; check: string; border: string }> = {
  violet: { bar: "bg-violet-500", badge: "bg-violet-500/15 text-violet-400", check: "text-violet-400", border: "border-violet-500/20" },
  blue: { bar: "bg-blue-500", badge: "bg-blue-500/15 text-blue-400", check: "text-blue-400", border: "border-blue-500/20" },
  orange: { bar: "bg-orange-500", badge: "bg-orange-500/15 text-orange-400", check: "text-orange-400", border: "border-orange-500/20" },
  green: { bar: "bg-emerald-500", badge: "bg-emerald-500/15 text-emerald-400", check: "text-emerald-400", border: "border-emerald-500/20" },
  pink: { bar: "bg-pink-500", badge: "bg-pink-500/15 text-pink-400", check: "text-pink-400", border: "border-pink-500/20" },
};

export default function VideolarPage() {
  const [progress, setProgress] = useState<Record<string, boolean[]>>({});
  const [acik, setAcik] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setProgress(getVideoProgress()); setMounted(true); }, []);

  const toggle = (key: string, idx: number) => {
    const updated = { ...progress };
    if (!updated[key]) updated[key] = [];
    const arr = [...updated[key]];
    while (arr.length <= idx) arr.push(false);
    arr[idx] = !arr[idx];
    updated[key] = arr;
    setProgress(updated);
    setVideoProgress(updated);
  };

  const toggleAll = (key: string, toplam: number, val: boolean) => {
    const updated = { ...progress, [key]: Array(toplam).fill(val) };
    setProgress(updated);
    setVideoProgress(updated);
  };

  if (!mounted) return null;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white mb-1">Video Takip</h1>
        <p className="text-sm text-gray-500">Benim Hocam 2026 Ortaöğretim Serisi</p>
      </div>
      <div className="space-y-3">
        {DERSLER.map((ders) => {
          const checked = progress[ders.key] || [];
          const izlenen = checked.filter(Boolean).length;
          const yuzde = (izlenen / ders.toplam) * 100;
          const c = renkMap[ders.renk];
          const isAcik = acik === ders.key;
          return (
            <div key={ders.key} className={`rounded-2xl border ${c.border} overflow-hidden`} style={{ background: "rgba(255,255,255,0.02)" }}>
              <button onClick={() => setAcik(isAcik ? null : ders.key)} className="w-full flex items-center gap-4 p-5 hover:bg-white/5">
                <span className="text-2xl">{ders.emoji}</span>
                <div className="flex-1 text-left">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-semibold text-white">{ders.label}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${c.badge}`}>{izlenen}/{ders.toplam}</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                    <div className={`h-full rounded-full ${c.bar} transition-all`} style={{ width: `${yuzde}%` }} />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">%{yuzde.toFixed(0)} tamamlandı</p>
                </div>
                {isAcik ? <ChevronUp size={20} className="text-gray-400" /> : <ChevronDown size={20} className="text-gray-400" />}
              </button>
              {isAcik && (
                <div className="border-t border-white/5 px-5 pb-5 pt-4">
                  <div className="flex gap-3 mb-4">
                    <button onClick={() => toggleAll(ders.key, ders.toplam, true)} className="text-xs px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10">Tümünü İşaretle</button>
                    <button onClick={() => toggleAll(ders.key, ders.toplam, false)} className="text-xs px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10">Temizle</button>
                  </div>
                  <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 gap-2">
                    {Array.from({ length: ders.toplam }, (_, i) => {
                      const ok = checked[i] === true;
                      return (
                        <button key={i} onClick={() => toggle(ders.key, i)} className={`flex flex-col items-center gap-1 p-2 rounded-xl border ${ok ? `${c.border} bg-white/5` : "border-white/5 hover:border-white/15"}`}>
                          {ok ? <CheckSquare size={16} className={c.check} /> : <Square size={16} className="text-gray-600" />}
                          <span className={`text-[10px] font-medium ${ok ? "text-gray-200" : "text-gray-500"}`}>{i + 1}</span>
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

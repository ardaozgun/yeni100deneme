"use client";
import { createContext, useContext, useEffect, useState } from "react";

export type DenemeKayit = {
  id: string; ad: string; tarih: string; puan: number; toplamNet: number;
  dersler: {
    turkce: { dogru: number; yanlis: number; net: number };
    matematik: { dogru: number; yanlis: number; net: number };
    tarih: { dogru: number; yanlis: number; net: number };
    cografya: { dogru: number; yanlis: number; net: number };
    vatandaslik: { dogru: number; yanlis: number; net: number };
  };
};

interface DataCtx {
  videos: Record<string, boolean[]>;
  denemeler: DenemeKayit[];
  loaded: boolean;
  setVideos: (v: Record<string, boolean[]>) => void;
  addDeneme: (d: DenemeKayit) => void;
  deleteDeneme: (id: string) => void;
}

const Ctx = createContext<DataCtx | null>(null);

function syncServer(videos: Record<string, boolean[]>, denemeler: DenemeKayit[]) {
  fetch("/api/data", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ videos, denemeler }),
  }).catch(() => {});
}

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [videos, setVid] = useState<Record<string, boolean[]>>({});
  const [denemeler, setDen] = useState<DenemeKayit[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch("/api/data")
      .then(r => r.json())
      .then(d => { setVid(d.videos || {}); setDen(d.denemeler || []); })
      .catch(() => {})
      .finally(() => setLoaded(true));
  }, []);

  const setVideos = (v: Record<string, boolean[]>) => {
    setVid(v);
    syncServer(v, denemeler);
  };

  const addDeneme = (d: DenemeKayit) => {
    const nd = [...denemeler, d];
    setDen(nd);
    syncServer(videos, nd);
  };

  const deleteDeneme = (id: string) => {
    const nd = denemeler.filter(d => d.id !== id);
    setDen(nd);
    syncServer(videos, nd);
  };

  if (!loaded) return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <Ctx.Provider value={{ videos, denemeler, loaded, setVideos, addDeneme, deleteDeneme }}>
      {children}
    </Ctx.Provider>
  );
}

export function useData() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useData must be used within DataProvider");
  return ctx;
}

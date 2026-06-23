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

export function getVideoProgress(): Record<string, boolean[]> {
  if (typeof window === "undefined") return {};
  try { return JSON.parse(localStorage.getItem("kpss_video_progress") || "{}"); } catch { return {}; }
}

export function setVideoProgress(data: Record<string, boolean[]>) {
  if (typeof window === "undefined") return;
  localStorage.setItem("kpss_video_progress", JSON.stringify(data));
}

export function getDenemeKayitlari(): DenemeKayit[] {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(localStorage.getItem("kpss_denemeler") || "[]"); } catch { return []; }
}

export function saveDenemeKayit(kayit: DenemeKayit) {
  const m = getDenemeKayitlari(); m.push(kayit);
  localStorage.setItem("kpss_denemeler", JSON.stringify(m));
}

export function deleteDenemeKayit(id: string) {
  localStorage.setItem("kpss_denemeler", JSON.stringify(getDenemeKayitlari().filter(k => k.id !== id)));
}

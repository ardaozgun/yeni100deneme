"use client";
import { useState } from "react";
import { Calculator, Save, CheckCircle, AlertCircle } from "lucide-react";
import { saveDenemeKayit, DenemeKayit } from "@/lib/storage";

const DERSLER = [
  { key: "turkce", label: "Türkçe", soru: 30, renk: "violet" },
  { key: "matematik", label: "Matematik", soru: 30, renk: "blue" },
  { key: "tarih", label: "Tarih", soru: 15, renk: "orange" },
  { key: "cografya", label: "Coğrafya", soru: 10, renk: "green" },
  { key: "vatandaslik", label: "Vatandaşlık", soru: 15, renk: "pink" },
] as const;

type DersKey = "turkce" | "matematik" | "tarih" | "cografya" | "vatandaslik";
type Scores = Record<DersKey, { dogru: string; yanlis: string }>;

const renkMap: Record<string, string> = {
  violet: "border-violet-500/30 focus:border-violet-500",
  blue: "border-blue-500/30 focus:border-blue-500",
  orange: "border-orange-500/30 focus:border-orange-500",
  green: "border-emerald-500/30 focus:border-emerald-500",
  pink: "border-pink-500/30 focus:border-pink-500",
};

const init: Scores = { turkce: { dogru: "", yanlis: "" }, matematik: { dogru: "", yanlis: "" }, tarih: { dogru: "", yanlis: "" }, cografya: { dogru: "", yanlis: "" }, vatandaslik: { dogru: "", yanlis: "" } };

export default function HesaplaPage() {
  const [scores, setScores] = useState<Scores>(init);
  const [sinavAdi, setSinavAdi] = useState("");
  const [mesaj, setMesaj] = useState<"ok" | "err" | null>(null);

  const update = (ders: DersKey, alan: "dogru" | "yanlis", val: string) => {
    setScores(p => ({ ...p, [ders]: { ...p[ders], [alan]: val.replace(/[^0-9]/g, "") } }));
  };

  const sonuclar = DERSLER.map(d => {
    const dogru = parseInt(scores[d.key].dogru) || 0;
    const yanlis = parseInt(scores[d.key].yanlis) || 0;
    const net = dogru - yanlis / 4;
    return { ...d, dogru, yanlis, bos: Math.max(0, d.soru - dogru - yanlis), net };
  });

  const toplamNet = sonuclar.reduce((a, d) => a + d.net, 0);
  const puan = 50 + toplamNet * 0.65;
  const puanRengi = puan >= 80 ? "text-emerald-400" : puan >= 60 ? "text-yellow-400" : "text-red-400";

  const kaydet = () => {
    if (!sinavAdi.trim()) { setMesaj("err"); setTimeout(() => setMesaj(null), 3000); return; }
    const kayit: DenemeKayit = {
      id: Date.now().toString(), ad: sinavAdi.trim(),
      tarih: new Date().toLocaleDateString("tr-TR"),
      puan: parseFloat(puan.toFixed(2)), toplamNet: parseFloat(toplamNet.toFixed(2)),
      dersler: {
        turkce: { dogru: sonuclar[0].dogru, yanlis: sonuclar[0].yanlis, net: sonuclar[0].net },
        matematik: { dogru: sonuclar[1].dogru, yanlis: sonuclar[1].yanlis, net: sonuclar[1].net },
        tarih: { dogru: sonuclar[2].dogru, yanlis: sonuclar[2].yanlis, net: sonuclar[2].net },
        cografya: { dogru: sonuclar[3].dogru, yanlis: sonuclar[3].yanlis, net: sonuclar[3].net },
        vatandaslik: { dogru: sonuclar[4].dogru, yanlis: sonuclar[4].yanlis, net: sonuclar[4].net },
      },
    };
    saveDenemeKayit(kayit);
    setMesaj("ok"); setTimeout(() => setMesaj(null), 3000);
    setSinavAdi(""); setScores(init);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white mb-1">Net & Puan Hesapla</h1>
        <p className="text-sm text-gray-500">KPSS Ortaöğretim P94 — 4 yanlış 1 doğruyu götürür</p>
      </div>
      <div className="rounded-2xl p-6 border border-white/5" style={{ background: "rgba(255,255,255,0.02)" }}>
        <div className="flex items-center gap-2 mb-4">
          <Calculator size={18} className="text-violet-400" />
          <h2 className="font-semibold text-white">Cevap Girişi</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-xs text-gray-500 border-b border-white/5">
                <th className="text-left py-2">Ders</th>
                <th className="text-center py-2">Soru</th>
                <th className="text-center py-2">Doğru</th>
                <th className="text-center py-2">Yanlış</th>
                <th className="text-center py-2">Boş</th>
                <th className="text-right py-2">Net</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {sonuclar.map(d => (
                <tr key={d.key}>
                  <td className="py-3 text-sm font-medium text-gray-200">{d.label}</td>
                  <td className="py-3 text-center text-sm text-gray-500">{d.soru}</td>
                  <td className="py-3 px-2"><input type="number" min={0} max={d.soru} value={scores[d.key].dogru} onChange={e => update(d.key, "dogru", e.target.value)} placeholder="0" className={`w-full text-center bg-white/5 border rounded-lg py-1.5 text-sm text-white outline-none ${renkMap[d.renk]}`} /></td>
                  <td className="py-3 px-2"><input type="number" min={0} max={d.soru} value={scores[d.key].yanlis} onChange={e => update(d.key, "yanlis", e.target.value)} placeholder="0" className={`w-full text-center bg-white/5 border rounded-lg py-1.5 text-sm text-white outline-none ${renkMap[d.renk]}`} /></td>
                  <td className="py-3 text-center text-sm text-gray-500">{d.bos}</td>
                  <td className="py-3 text-right text-sm font-semibold"><span className={d.net >= 0 ? "text-emerald-400" : "text-red-400"}>{d.net.toFixed(2)}</span></td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t border-violet-500/20">
                <td colSpan={4} className="py-3 text-sm text-gray-400">Toplam Net</td>
                <td /><td className="py-3 text-right font-bold text-violet-300">{toplamNet.toFixed(2)}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
      <div className="rounded-2xl p-6 border border-violet-500/30" style={{ background: "rgba(124,58,237,0.05)" }}>
        <p className="text-sm text-gray-400 mb-2">Tahmini KPSS P94 Puanınız</p>
        <p className={`text-5xl font-black mb-1 ${puanRengi}`}>{puan.toFixed(2)}</p>
        <p className="text-xs text-gray-500">Formül: 50 + ({toplamNet.toFixed(2)} × 0.65)</p>
      </div>
      <div className="rounded-2xl p-6 border border-white/5" style={{ background: "rgba(255,255,255,0.02)" }}>
        <div className="flex items-center gap-2 mb-4"><Save size={18} className="text-violet-400" /><h2 className="font-semibold text-white">Denemeyi Kaydet</h2></div>
        <div className="flex gap-3">
          <input type="text" placeholder="Sınav adı (örn: TG-1)" value={sinavAdi} onChange={e => setSinavAdi(e.target.value)} onKeyDown={e => e.key === "Enter" && kaydet()} className="flex-1 bg-white/5 border border-white/10 focus:border-violet-500 rounded-xl px-4 py-2.5 text-sm text-white outline-none placeholder:text-gray-600" />
          <button onClick={kaydet} className="px-6 py-2.5 bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold rounded-xl">Kaydet</button>
        </div>
        {mesaj === "ok" && <div className="flex items-center gap-2 text-emerald-400 text-sm mt-3"><CheckCircle size={16} /> Kaydedildi!</div>}
        {mesaj === "err" && <div className="flex items-center gap-2 text-red-400 text-sm mt-3"><AlertCircle size={16} /> Sınav adı girin.</div>}
      </div>
    </div>
  );
}

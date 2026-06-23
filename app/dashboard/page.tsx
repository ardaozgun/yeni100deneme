"use client";
import { useEffect, useState } from "react";
import { StatCard } from "@/components/StatCard";
import { Video, Trophy, BookOpen, TrendingUp, Calendar, Target } from "lucide-react";
import { getVideoProgress, getDenemeKayitlari } from "@/lib/storage";

const DERSLER = [
  { key: "turkce", label: "Türkçe", toplam: 46 },
  { key: "matematik", label: "Matematik", toplam: 81 },
  { key: "tarih", label: "Tarih", toplam: 60 },
  { key: "cografya", label: "Coğrafya", toplam: 34 },
  { key: "vatandaslik", label: "Vatandaşlık", toplam: 48 },
];
const TOPLAM_VIDEO = 269;

export default function DashboardPage() {
  const [izlenenVideo, setIzlenenVideo] = useState(0);
  const [sonPuan, setSonPuan] = useState<number | null>(null);
  const [denemeCount, setDenemeCount] = useState(0);
  const [dersIlerlemeleri, setDersIlerlemeleri] = useState<{ label: string; yuzde: number }[]>([]);

  useEffect(() => {
    const progress = getVideoProgress();
    let toplam = 0;
    const ilerleme = DERSLER.map((d) => {
      const checked = progress[d.key] || [];
      const izlenen = checked.filter(Boolean).length;
      toplam += izlenen;
      return { label: d.label, yuzde: (izlenen / d.toplam) * 100 };
    });
    setIzlenenVideo(toplam);
    setDersIlerlemeleri(ilerleme);
    const denemeler = getDenemeKayitlari();
    setDenemeCount(denemeler.length);
    if (denemeler.length > 0) setSonPuan(denemeler[denemeler.length - 1].puan);
  }, []);

  const videoYuzde = (izlenenVideo / TOPLAM_VIDEO) * 100;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white mb-1">Dashboard</h1>
        <p className="text-sm text-gray-500">KPSS 2026 Ortaöğretim — Genel Durumun</p>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="İzlenen Video" value={izlenenVideo} subtitle={`Toplam ${TOPLAM_VIDEO} videodan`} icon={Video} color="violet" progress={videoYuzde} />
        <StatCard title="Son Deneme Puanı" value={sonPuan !== null ? sonPuan.toFixed(2) : "—"} subtitle="KPSS P94" icon={Trophy} color="orange" />
        <StatCard title="Kayıtlı Deneme" value={denemeCount} subtitle="Toplam deneme sayısı" icon={BookOpen} color="blue" />
        <StatCard title="Video İlerleme" value={`%${videoYuzde.toFixed(1)}`} subtitle="Tüm dersler" icon={TrendingUp} color="green" progress={videoYuzde} />
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="rounded-2xl p-6 border border-white/5" style={{ background: "rgba(255,255,255,0.02)" }}>
          <div className="flex items-center gap-2 mb-5">
            <Target size={18} className="text-violet-400" />
            <h2 className="font-semibold text-white">Ders Bazlı İlerleme</h2>
          </div>
          <div className="space-y-4">
            {dersIlerlemeleri.map((d) => (
              <div key={d.label}>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="text-gray-300">{d.label}</span>
                  <span className="text-violet-400 font-medium">%{d.yuzde.toFixed(0)}</span>
                </div>
                <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                  <div className="h-full rounded-full bg-gradient-to-r from-violet-600 to-violet-400" style={{ width: `${d.yuzde}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-2xl p-6 border border-white/5" style={{ background: "rgba(255,255,255,0.02)" }}>
          <div className="flex items-center gap-2 mb-5">
            <Calendar size={18} className="text-violet-400" />
            <h2 className="font-semibold text-white">Hızlı Bilgiler</h2>
          </div>
          <div className="space-y-3">
            {[
              { label: "Sınav Türü", value: "KPSS Ortaöğretim" },
              { label: "Puan Türü", value: "P94" },
              { label: "Toplam Soru", value: "100 Soru" },
              { label: "Süre", value: "120 Dakika" },
              { label: "Net Kuralı", value: "4 Yanlış → 1 Doğru" },
              { label: "Puan Formülü", value: "50 + (Net × 0.65)" },
            ].map(({ label, value }) => (
              <div key={label} className="flex justify-between py-2 border-b border-white/5 last:border-0">
                <span className="text-gray-500 text-sm">{label}</span>
                <span className="text-gray-200 text-sm font-medium">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

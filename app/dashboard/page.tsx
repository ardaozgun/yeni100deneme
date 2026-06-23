'use client';
import { useData } from '@/providers/DataProvider';

const DERSLER = [
  { key: 'turkce', label: 'Türkçe', total: 46 },
  { key: 'matematik', label: 'Matematik', total: 81 },
  { key: 'tarih', label: 'Tarih', total: 60 },
  { key: 'cografya', label: 'Coğrafya', total: 34 },
  { key: 'vatandaslik', label: 'Vatandaşlık', total: 48 },
];

export default function DashboardPage() {
  const { videos, denemeler } = useData();

  const totalVideos = DERSLER.reduce((a, d) => a + d.total, 0);
  const watchedVideos = DERSLER.reduce((a, d) => a + (videos[d.key]?.length ?? 0), 0);
  const lastPuan = denemeler[0]?.puan?.toFixed(2) ?? '-';

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-white mb-6">Dashboard</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <StatCard label="İzlenen Video" value={`${watchedVideos}/${totalVideos}`} color="violet" />
        <StatCard label="Son Puan" value={lastPuan} color="green" />
        <StatCard label="Kayıtlı Deneme" value={String(denemeler.length)} color="blue" />
        <StatCard label="Video İlerleme" value={`${Math.round((watchedVideos / totalVideos) * 100)}%`} color="yellow" />
      </div>
      <div className="space-y-3">
        {DERSLER.map(d => {
          const watched = videos[d.key]?.length ?? 0;
          const pct = Math.round((watched / d.total) * 100);
          return (
            <div key={d.key} className="bg-gray-900 rounded-xl p-4 border border-gray-800">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-white font-medium">{d.label}</span>
                <span className="text-gray-400">{watched}/{d.total} video</span>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-2">
                <div className="bg-violet-500 h-2 rounded-full transition-all" style={{ width: `${pct}%` }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function StatCard({ label, value, color }: { label: string; value: string; color: string }) {
  const colors: Record<string, string> = {
    violet: 'text-violet-400 border-violet-800',
    green: 'text-green-400 border-green-800',
    blue: 'text-blue-400 border-blue-800',
    yellow: 'text-yellow-400 border-yellow-800',
  };
  return (
    <div className={`bg-gray-900 border rounded-xl p-4 ${colors[color]}`}>
      <p className="text-xs text-gray-500 mb-1">{label}</p>
      <p className={`text-2xl font-bold ${colors[color].split(' ')[0]}`}>{value}</p>
    </div>
  );
}

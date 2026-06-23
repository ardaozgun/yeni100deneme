'use client';
import { useData } from '@/providers/DataProvider';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Trash2 } from 'lucide-react';

export default function AnalizPage() {
  const { denemeler, deleteDeneme } = useData();

  const chartData = [...denemeler].reverse().map((d, i) => ({
    name: `Deneme ${i + 1}`,
    puan: parseFloat(d.puan.toFixed(2)),
  }));

  const puanlar = denemeler.map(d => d.puan);
  const max = puanlar.length ? Math.max(...puanlar).toFixed(2) : '-';
  const min = puanlar.length ? Math.min(...puanlar).toFixed(2) : '-';
  const avg = puanlar.length ? (puanlar.reduce((a, b) => a + b, 0) / puanlar.length).toFixed(2) : '-';

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-white mb-6">Analiz</h1>
      {denemeler.length === 0 ? (
        <p className="text-gray-400">Henüz deneme kaydedilmedi.</p>
      ) : (
        <>
          <div className="grid grid-cols-3 gap-4 mb-6">
            <StatCard label="En Yüksek" value={max} color="green" />
            <StatCard label="Ortalama" value={avg} color="violet" />
            <StatCard label="En Düşük" value={min} color="red" />
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 mb-6">
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" stroke="#6b7280" tick={{ fontSize: 11 }} />
                <YAxis domain={['auto', 'auto']} stroke="#6b7280" tick={{ fontSize: 11 }} />
                <Tooltip contentStyle={{ backgroundColor: '#111827', border: '1px solid #374151', borderRadius: 8 }} />
                <Line type="monotone" dataKey="puan" stroke="#8b5cf6" strokeWidth={2} dot={{ fill: '#8b5cf6' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-3">
            {denemeler.map(d => (
              <div key={d.id} className="bg-gray-900 border border-gray-800 rounded-xl p-4 flex items-center justify-between">
                <div>
                  <p className="text-white font-medium">{d.tarih}</p>
                  <p className="text-gray-400 text-sm">Net: {d.toplamNet.toFixed(2)} | Puan: <span className="text-violet-400 font-semibold">{d.puan.toFixed(2)}</span></p>
                </div>
                <button onClick={() => deleteDeneme(d.id)} className="text-gray-600 hover:text-red-400 transition">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function StatCard({ label, value, color }: { label: string; value: string; color: string }) {
  const colors: Record<string, string> = {
    green: 'text-green-400 border-green-800',
    violet: 'text-violet-400 border-violet-800',
    red: 'text-red-400 border-red-800',
  };
  return (
    <div className={`bg-gray-900 border rounded-xl p-4 ${colors[color]}`}>
      <p className="text-xs text-gray-500 mb-1">{label}</p>
      <p className={`text-xl font-bold ${colors[color].split(' ')[0]}`}>{value}</p>
    </div>
  );
}

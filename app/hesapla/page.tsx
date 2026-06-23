'use client';
import { useState } from 'react';
import { useData } from '@/providers/DataProvider';
import type { DenemeKayit } from '@/providers/DataProvider';

const DERSLER = [
  { key: 'turkce', label: 'Türkçe', soru: 30 },
  { key: 'matematik', label: 'Matematik', soru: 30 },
  { key: 'tarih', label: 'Tarih', soru: 15 },
  { key: 'cografya', label: 'Coğrafya', soru: 10 },
  { key: 'vatandaslik', label: 'Vatandaşlık', soru: 15 },
];

type Inputs = Record<string, { dogru: string; yanlis: string }>;

export default function HesaplaPage() {
  const { addDeneme } = useData();
  const [inputs, setInputs] = useState<Inputs>(
    Object.fromEntries(DERSLER.map(d => [d.key, { dogru: '', yanlis: '' }]))
  );
  const [saved, setSaved] = useState(false);

  function set(key: string, field: 'dogru' | 'yanlis', val: string) {
    setInputs(prev => ({ ...prev, [key]: { ...prev[key], [field]: val } }));
    setSaved(false);
  }

  const nets = DERSLER.map(d => ({
    ...d,
    net: (Number(inputs[d.key].dogru) || 0) - (Number(inputs[d.key].yanlis) || 0) / 4,
  }));
  const toplamNet = nets.reduce((a, d) => a + d.net, 0);
  const puan = 50 + toplamNet * 0.65;

  function save() {
    const kayit: DenemeKayit = {
      id: Date.now().toString(),
      tarih: new Date().toLocaleDateString('tr-TR'),
      dersler: Object.fromEntries(
        DERSLER.map(d => [d.key, { dogru: Number(inputs[d.key].dogru) || 0, yanlis: Number(inputs[d.key].yanlis) || 0 }])
      ),
      toplamNet,
      puan,
    };
    addDeneme(kayit);
    setSaved(true);
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-white mb-6">Puan Hesapla</h1>
      <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden mb-4">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-800">
              <th className="text-left p-3 text-gray-400">Ders</th>
              <th className="p-3 text-gray-400">Doğru</th>
              <th className="p-3 text-gray-400">Yanlış</th>
              <th className="p-3 text-gray-400">Net</th>
            </tr>
          </thead>
          <tbody>
            {nets.map(d => (
              <tr key={d.key} className="border-b border-gray-800">
                <td className="p-3 text-white">{d.label}</td>
                <td className="p-3">
                  <input
                    type="number" min="0" max={d.soru}
                    value={inputs[d.key].dogru}
                    onChange={e => set(d.key, 'dogru', e.target.value)}
                    className="w-16 bg-gray-800 border border-gray-700 rounded px-2 py-1 text-white text-center focus:outline-none focus:border-violet-500"
                  />
                </td>
                <td className="p-3">
                  <input
                    type="number" min="0" max={d.soru}
                    value={inputs[d.key].yanlis}
                    onChange={e => set(d.key, 'yanlis', e.target.value)}
                    className="w-16 bg-gray-800 border border-gray-700 rounded px-2 py-1 text-white text-center focus:outline-none focus:border-violet-500"
                  />
                </td>
                <td className="p-3 text-center font-medium text-violet-300">{d.net.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="bg-gray-900 border border-violet-800 rounded-xl p-4 mb-4 flex items-center justify-between">
        <div>
          <p className="text-gray-400 text-sm">Toplam Net</p>
          <p className="text-2xl font-bold text-white">{toplamNet.toFixed(2)}</p>
        </div>
        <div className="text-right">
          <p className="text-gray-400 text-sm">Tahmini Puan (P94)</p>
          <p className="text-3xl font-bold text-violet-400">{puan.toFixed(2)}</p>
        </div>
      </div>
      <button
        onClick={save}
        className="w-full bg-violet-600 hover:bg-violet-500 text-white font-semibold py-2.5 rounded-xl transition"
      >
        {saved ? 'Kaydedildi!' : 'Denemeyi Kaydet'}
      </button>
    </div>
  );
}

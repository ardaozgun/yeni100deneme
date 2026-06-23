"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { GraduationCap, Lock, User } from "lucide-react";

export default function LoginPage() {
  const [u, setU] = useState("");
  const [p, setP] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const login = async () => {
    setLoading(true); setErr("");
    const res = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: u, password: p }),
    });
    if (res.ok) {
      router.push("/dashboard");
      router.refresh();
    } else {
      const d = await res.json();
      setErr(d.error);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: "#050505" }}>
      <div className="w-full max-w-sm">
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-violet-600 flex items-center justify-center shadow-2xl shadow-violet-900/50">
            <GraduationCap size={32} className="text-white" />
          </div>
        </div>
        <h1 className="text-2xl font-bold text-white text-center mb-1">KPSS 2026</h1>
        <p className="text-sm text-gray-500 text-center mb-8">Ortaöğretim Premium Takip</p>
        <div className="rounded-2xl p-6 border border-white/5" style={{ background: "rgba(255,255,255,0.02)" }}>
          <div className="space-y-4">
            <div>
              <label className="text-xs text-gray-400 mb-1.5 block">Kullanıcı Adı</label>
              <div className="relative">
                <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                <input type="text" value={u} onChange={e => setU(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && login()} placeholder="kullanıcı adı"
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white outline-none focus:border-violet-500 placeholder:text-gray-600" />
              </div>
            </div>
            <div>
              <label className="text-xs text-gray-400 mb-1.5 block">Şifre</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                <input type="password" value={p} onChange={e => setP(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && login()} placeholder="••••••"
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white outline-none focus:border-violet-500 placeholder:text-gray-600" />
              </div>
            </div>
            {err && <p className="text-red-400 text-xs text-center">{err}</p>}
            <button onClick={login} disabled={loading}
              className="w-full py-2.5 bg-violet-600 hover:bg-violet-500 disabled:opacity-50 text-white text-sm font-semibold rounded-xl transition-colors">
              {loading ? "Giriş yapılıyor..." : "Giriş Yap"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

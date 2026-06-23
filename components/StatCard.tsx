import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string; value: string | number; subtitle?: string;
  icon: LucideIcon; color?: "violet" | "blue" | "green" | "orange"; progress?: number;
}

const colorMap = {
  violet: { icon: "text-violet-400", bg: "bg-violet-500/10", border: "border-violet-500/20", bar: "bg-violet-500" },
  blue: { icon: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/20", bar: "bg-blue-500" },
  green: { icon: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20", bar: "bg-emerald-500" },
  orange: { icon: "text-orange-400", bg: "bg-orange-500/10", border: "border-orange-500/20", bar: "bg-orange-500" },
};

export function StatCard({ title, value, subtitle, icon: Icon, color = "violet", progress }: StatCardProps) {
  const c = colorMap[color];
  return (
    <div className={`rounded-2xl p-5 border ${c.border} hover:scale-[1.02] transition-all`}
      style={{ background: "rgba(255,255,255,0.02)", boxShadow: "0 4px 32px rgba(0,0,0,0.4)" }}>
      <div className={`w-10 h-10 rounded-xl ${c.bg} flex items-center justify-center mb-3`}>
        <Icon size={20} className={c.icon} />
      </div>
      <p className="text-3xl font-bold text-white mb-1">{value}</p>
      <p className="text-sm font-medium text-gray-300 mb-1">{title}</p>
      {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
      {progress !== undefined && (
        <div className="mt-3">
          <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
            <div className={`h-full rounded-full ${c.bar} transition-all`} style={{ width: `${Math.min(100, progress)}%` }} />
          </div>
          <p className="text-xs text-gray-500 mt-1">{progress.toFixed(1)}% tamamlandı</p>
        </div>
      )}
    </div>
  );
}

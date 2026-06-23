"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Video, Calculator, BarChart3 } from "lucide-react";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/videolar", label: "Videolar", icon: Video },
  { href: "/hesapla", label: "Hesapla", icon: Calculator },
  { href: "/analiz", label: "Analiz", icon: BarChart3 },
];

export function MobileNav() {
  const pathname = usePathname();
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around px-2 py-2"
      style={{ background: "rgba(10,10,10,0.97)", borderTop: "1px solid rgba(124,58,237,0.2)", backdropFilter: "blur(16px)" }}>
      {navItems.map(({ href, label, icon: Icon }) => {
        const active = pathname === href;
        return (
          <Link key={href} href={href} className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl ${active ? "text-violet-400" : "text-gray-500"}`}>
            <Icon size={20} />
            <span className="text-[10px] font-medium">{label}</span>
            {active && <div className="w-1 h-1 rounded-full bg-violet-400" />}
          </Link>
        );
      })}
    </nav>
  );
}

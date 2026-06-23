'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Video, Calculator, BarChart2 } from 'lucide-react';

const links = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/videolar', icon: Video, label: 'Videolar' },
  { href: '/hesapla', icon: Calculator, label: 'Hesapla' },
  { href: '/analiz', icon: BarChart2, label: 'Analiz' },
];

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="hidden md:flex flex-col fixed left-0 top-0 h-full w-64 bg-gray-900 border-r border-gray-800 p-4">
      <div className="mb-8">
        <h1 className="text-xl font-bold text-violet-400">KPSS 2026</h1>
        <p className="text-xs text-gray-500">Ortaöğretim Takip</p>
      </div>
      <nav className="flex-1 space-y-1">
        {links.map(({ href, icon: Icon, label }) => (
          <Link
            key={href}
            href={href}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition text-sm font-medium ${
              pathname === href
                ? 'bg-violet-600 text-white'
                : 'text-gray-400 hover:text-white hover:bg-gray-800'
            }`}
          >
            <Icon className="w-4 h-4" />
            {label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}

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

export default function MobileNav() {
  const pathname = usePathname();
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800 flex justify-around py-2 z-50">
      {links.map(({ href, icon: Icon, label }) => (
        <Link
          key={href}
          href={href}
          className={`flex flex-col items-center gap-1 px-3 py-1 text-xs ${
            pathname === href ? 'text-violet-400' : 'text-gray-500'
          }`}
        >
          <Icon className="w-5 h-5" />
          {label}
        </Link>
      ))}
    </nav>
  );
}

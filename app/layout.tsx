import type { Metadata } from 'next';
import './globals.css';
import { DataProvider } from '@/providers/DataProvider';
import Sidebar from '@/components/Sidebar';
import MobileNav from '@/components/MobileNav';

export const metadata: Metadata = {
  title: 'KPSS 2026 Takip',
  description: 'KPSS Ortaöğretim Premium Takip',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" className="dark">
      <body>
        <DataProvider>
          <div className="flex min-h-screen">
            <Sidebar />
            <main className="flex-1 md:ml-64 pb-20 md:pb-0">
              {children}
            </main>
          </div>
          <MobileNav />
        </DataProvider>
      </body>
    </html>
  );
}

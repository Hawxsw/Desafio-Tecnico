import { HeaderMenu } from '@/components/shared/header-menu';
import { Menu } from '@/components/shared/menu';
import { Toaster } from 'sonner';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden">
      <Menu />
      <div className="flex flex-col flex-1 min-w-0">
        <HeaderMenu />
        <main className="flex-1 p-3 sm:p-4 md:p-6 bg-white dark:bg-background overflow-auto">
          {children}
          <Toaster />
        </main>
      </div>
    </div>
  );
}

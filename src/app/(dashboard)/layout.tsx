import { HeaderMenu } from '@/components/shared/header-menu';
import { Menu } from '@/components/shared/menu';

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
        <main className="flex-1 p-3 sm:p-4 md:p-6 bg-gray-100 dark:bg-gray-900 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

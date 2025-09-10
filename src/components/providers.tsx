'use client';

import dynamic from 'next/dynamic';

const ThemeProvider = dynamic(
  () => import('@/lib/hooks/useTheme').then((mod) => mod.ThemeProvider),
  { ssr: false }
);

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      {children}
    </ThemeProvider>
  );
}
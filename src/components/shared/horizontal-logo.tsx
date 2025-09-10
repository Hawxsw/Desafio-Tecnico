'use client';

import React from 'react';
import Image from 'next/image';
import logo_black from '../../../public/horizontal_logo_black.png';
import logo_white from '../../../public/horizontal_logo_white.png';
import { cn } from '@/lib/utils/shadcn.helper';
import { useTheme } from '@/lib/hooks/useTheme';

export function HorizontalLogo({
  className,
  style,
  inverted = false,
}: {
  className?: string;
  style?: React.CSSProperties;
  inverted?: boolean;
}) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const logoSrc =
    (isDark && !inverted) || (!isDark && inverted) ? logo_white : logo_black;

  return (
    <Image
      src={logoSrc}
      alt="Horizontal Logo"
      className={cn(className)}
      style={{
        ...style,
      }}
    />
  );
}
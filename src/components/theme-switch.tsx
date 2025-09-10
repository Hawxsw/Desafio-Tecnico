'use client';
import React from 'react';
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/dropdown";
import { IoIosSunny, IoMdMoon } from 'react-icons/io';
import { Button } from '@heroui/button';
import { useTheme } from '@/lib/hooks/useTheme';

interface ThemeSwitchProps {
  className?: string;
}

export function ThemeSwitch({ className }: ThemeSwitchProps) {
  const { setTheme } = useTheme();

  return (
    <Dropdown>
      <DropdownTrigger asChild>
        <Button
          variant="faded"
          size="sm"
          className={className}
        >
          <IoIosSunny className="h-[1rem] w-[1rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <IoMdMoon className="absolute h-[1rem] w-[1rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Trocar tema</span>
        </Button>
      </DropdownTrigger>
      <DropdownMenu className='w-40 text-sm top-[-1rem] font-medium text-center text-foreground bg-white dark:bg-background border border-gray-200 dark:border-background shadow-md'>
        <DropdownItem key="light" onClick={() => setTheme('light')}>
          Claro
        </DropdownItem>
        <DropdownItem key="dark" onClick={() => setTheme('dark')}>
          Escuro
        </DropdownItem>
        <DropdownItem key="system" onClick={() => setTheme('system')}>
          Sistema
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
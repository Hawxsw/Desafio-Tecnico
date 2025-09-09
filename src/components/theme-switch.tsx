'use client';
import React from 'react';
import { useTheme } from '../hooks/useTheme';
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/dropdown";
import { IoIosSunny, IoMdMoon } from 'react-icons/io';
import { Button } from '@heroui/button';

export function ThemeSwitch() {
  const { setTheme } = useTheme();

  return (
    <Dropdown>
      <DropdownTrigger asChild>
        <Button
          variant="faded"
          size="sm"
          className="fixed top-2 right-2 h-[2rem] w-[2rem]"
        >
          <IoIosSunny className="h-[1rem] w-[1rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <IoMdMoon className="absolute h-[1rem] w-[1rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Trocar tema</span>
        </Button>
      </DropdownTrigger>
      <DropdownMenu>
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
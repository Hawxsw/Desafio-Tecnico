"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/utils/shadcn.helper";
import { useState } from "react";
import {
  Squares2X2Icon,
  CubeIcon,
  UsersIcon,
  Cog6ToothIcon, 
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@heroui/button";

interface MenuItem {
  href: string;
  label: string;
  icon: React.ReactNode;
}

const menuItems: MenuItem[] = [
  { href: "/dashboard", label: "Dashboard", icon: <Squares2X2Icon className="h-5 w-5" /> },
  { href: "/dashboard/products", label: "Products", icon: <CubeIcon className="h-5 w-5" /> },
  { href: "/dashboard/users", label: "Users", icon: <UsersIcon className="h-5 w-5" /> },
  { href: "/dashboard/settings", label: "Settings", icon: <Cog6ToothIcon className="h-5 w-5" /> },
];

export function Menu() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(true);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={cn(
        "relative h-full transition-all duration-300 ease-in-out",
        "lg:block hidden",
        isOpen ? "w-64" : "w-20"
      )}
    >
      <aside
        className={cn(
          "flex flex-col h-full bg-card text-card-foreground p-2 sm:p-4 border-r border-border",
          isOpen ? "w-64" : "w-20 items-center"
        )}
      >
        <div className="flex items-center justify-between mb-6">
          {isOpen && <h2 className="text-xl font-semibold">Menu</h2>}
          <Button
            onPress={toggleMenu}
            className="p-2 rounded-md hover:bg-muted transition-colors"
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? (
              <ChevronLeftIcon className="h-6 w-6" />
            ) : (
              <ChevronRightIcon className="h-6 w-6" />
            )}
          </Button>
        </div>

        <nav className="flex-1 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-muted-foreground",
                pathname === item.href
                  ? "bg-primary text-primary-foreground"
                  : "text-foreground",
                !isOpen && "justify-center px-0"
              )}
            >
              {item.icon}
              {isOpen && <span>{item.label}</span>}
            </Link>
          ))}
        </nav>
      </aside>
    </div>
  );
}

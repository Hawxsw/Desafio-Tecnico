"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils/shadcn.helper";
import {
  Squares2X2Icon,
  CubeIcon,
  UsersIcon,
  Cog6ToothIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@heroui/button";
import { motion, AnimatePresence } from "framer-motion";

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

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const pathname = usePathname();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={onClose}
          />
          
          {/* Menu */}
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed left-0 top-0 h-full w-80 max-w-[85vw] bg-card text-card-foreground border-r border-border z-50 lg:hidden"
          >
            <div className="flex flex-col h-full p-4">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Menu</h2>
                <Button
                  onPress={onClose}
                  className="p-2 rounded-md hover:bg-muted transition-colors"
                  aria-label="Fechar menu"
                >
                  <XMarkIcon className="h-6 w-6" />
                </Button>
              </div>

              {/* Navigation */}
              <nav className="flex-1 space-y-2">
                {menuItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onClose}
                    className={cn(
                      "flex items-center gap-3 rounded-md px-3 py-3 text-sm font-medium transition-colors hover:bg-muted hover:text-muted-foreground",
                      pathname === item.href
                        ? "bg-primary text-primary-foreground"
                        : "text-foreground"
                    )}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </Link>
                ))}
              </nav>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

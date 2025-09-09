import { BellIcon, Bars3Icon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { Button } from "@heroui/button";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/auth.slice";
import { HorizontalLogo } from "./horizontal-logo";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/dropdown";
import { motion, AnimatePresence } from "framer-motion";
import { RootState } from "../../store";
import { useState } from "react";
import { MobileMenu } from "./mobile-menu";
import { useRouter } from "next/navigation";

export const HeaderMenu = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const token = useSelector((state: RootState) => state.auth.token);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    router.push("/signin");
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="px-3 sm:px-4 lg:px-6">
          <div className="flex h-14 sm:h-16 items-center justify-between">
            <div className="flex items-center gap-3">
              <Button
                className="lg:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
                onPress={toggleMobileMenu}
                aria-label="Abrir menu"
              >
                <Bars3Icon className="h-5 w-5" />
              </Button>
              
              <div className="flex-shrink-0">
                <HorizontalLogo className="w-32 sm:w-40 lg:w-48 object-contain" />
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-4">
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button type="button" className="relative p-2 text-gray-400">
                  <BellIcon className="h-5 w-5 sm:h-6 sm:w-6" />
                  <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500" />
                </Button>
              </motion.div>

              {token && (
                <Dropdown>
                  <DropdownTrigger>
                    <motion.div
                      className="flex items-center gap-2 sm:gap-3 cursor-pointer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Image
                        className="h-7 w-7 sm:h-8 sm:w-8 rounded-full"
                        src="https://i.pravatar.cc/150?u=a04258a2462d826712d"
                        alt="User Avatar"
                        width={32}
                        height={32}
                      />
                      <div className="hidden sm:flex sm:flex-col">
                        <span className="text-sm font-medium text-foreground">
                          Usuário
                        </span>
                        <span className="text-xs text-muted-foreground">Cargo</span>
                      </div>
                    </motion.div>
                  </DropdownTrigger>
                  <AnimatePresence>
                    <DropdownMenu>
                      <DropdownItem key="logout" onClick={handleLogout}>
                        Sair
                      </DropdownItem>
                    </DropdownMenu>
                  </AnimatePresence>
                </Dropdown>
              )}
            </div>
          </div>
        </div>
      </header>
      
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </>
  );
};

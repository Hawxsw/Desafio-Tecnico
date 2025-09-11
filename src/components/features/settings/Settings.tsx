"use client";

import { motion } from "framer-motion";
import { DashboardHeader } from "../dashboard/dashboard-header";
import { ThemeSwitch } from "@/components/theme-switch";
import { User, Bell, Palette } from "lucide-react";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { CardContent } from "@/components/shadcn/ui/card";

export default function Settings() {
  return (
    <motion.div
      className="bg-background min-h-screen p-4 sm:p-6 lg:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <DashboardHeader title="Settings" description="Manage your account and application settings." />
      </motion.div>

      <motion.div
        className="grid gap-6 mt-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="bg-card text-card-foreground rounded-lg shadow-lg">
          <div className="p-6 flex flex-row items-center gap-4">
            <User className="w-8 h-8" />
            <div>
              <h3 className="text-xl font-semibold">Profile</h3>
              <p className="text-muted-foreground">Update your profile information.</p>
            </div>
          </div>
          <div className="p-6 pt-0 space-y-4">
            <div className="space-y-2">
              <span className="text-sm font-medium">Name</span>
              <Input id="name" defaultValue="John Doe" />
            </div>
            <div className="space-y-2">
              <span className="text-sm font-medium">Email</span>
              <Input id="email" type="email" defaultValue="john.doe@example.com" readOnly />
            </div>
            <Button>Save Changes</Button>
          </div>
        </div>

        <div className="bg-card text-card-foreground rounded-lg shadow-lg">
          <div className="p-6 flex flex-row items-center gap-4">
            <Palette className="w-8 h-8" />
            <div>
              <h3 className="text-xl font-semibold">Appearance</h3>
              <p className="text-muted-foreground">Customize the look and feel of the application.</p>
            </div>
          </div>
          <div className="p-6 pt-0 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <p className="text-sm text-muted-foreground">
                Select a light or dark theme.
              </p>
            </div>
            <ThemeSwitch />
            </div>
        </div>

        <div className="bg-card text-card-foreground rounded-lg shadow-lg">
          <div className="p-6 flex flex-row items-center gap-4">
            <Bell className="w-8 h-8" />
            <div>
              <h3 className="text-xl font-semibold">Notifications</h3>
              <p className="text-muted-foreground">Manage your notification settings.</p>
            </div>
          </div>
          <div className="p-6 pt-0 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm font-medium">Product Updates</span>
                <p className="text-sm text-muted-foreground">
                  Receive emails about new product features and updates.
                </p>
              </div>
              <input type="checkbox" id="product-updates" defaultChecked className="sr-only peer" />
              <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border after:border-gray-300 after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm font-medium">Weekly Reports</span>
                <p className="text-sm text-muted-foreground">
                  Get a summary of your weekly sales and performance.
                </p>
              </div>
              <input type="checkbox" id="weekly-reports" className="sr-only peer" />
              <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border after:border-gray-300 after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
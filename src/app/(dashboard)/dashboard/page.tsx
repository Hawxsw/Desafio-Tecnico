"use client";
import { useEffect } from "react";
import { useAuthStore } from "@/stores/auth.store";
import { useRouter } from "next/navigation";
import Home from "@/components/features/dashboard/home";

export default function DashboardPage() {
  const router = useRouter();
  const { token } = useAuthStore();

  useEffect(() => {
    if (!token) {
      router.push("/signin");
    }
  }, [token, router]);

  if (!token) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="flex flex-col flex-1 min-w-0">
        <main className="flex-1 p-3 sm:p-4 md:p-6 bg-gray-100 dark:bg-gray-900 overflow-auto">
          <Home />
        </main>
      </div>
    </div>
  );
}

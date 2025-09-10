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
    <div>
      <Home />
    </div>
  );
}

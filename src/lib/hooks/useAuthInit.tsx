"use client";

import { useAuthStore } from "@/stores/auth.store";
import { useEffect } from "react";

export const useAuthInit = () => {
  const { setToken, markInitialized } = useAuthStore();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    
    if (storedToken) {
      setToken(storedToken);
    }
    // Always mark initialized after checking storage to prevent UI flicker
    markInitialized();
  }, [setToken, markInitialized]);
};
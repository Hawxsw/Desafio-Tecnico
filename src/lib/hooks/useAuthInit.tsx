"use client";

import { useAuthStore } from "@/stores/auth.store";
import { useEffect } from "react";

export const useAuthInit = () => {
  const { setToken } = useAuthStore();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    
    if (storedToken) {
      setToken(storedToken);
    }
  }, [setToken]);
};
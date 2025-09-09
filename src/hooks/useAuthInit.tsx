"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { setToken } from "../store/auth.slice";

export const useAuthInit = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    
    if (storedToken) {
      dispatch(setToken(storedToken));
    }
  }, [dispatch]);
};

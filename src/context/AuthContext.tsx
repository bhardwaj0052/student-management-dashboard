/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { clearAuth, getAuth } from "../services/authService";

export type Admin = {
  role: "admin" | "student";
  mobilenumber?: number;
  Password?: string;
  studentId?: string;
};

type AuthContextValue = {
  admin: Admin | null;
  setAdmin: (admin: Admin | null) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [admin, setAdmin] = useState<Admin | null>(null);

  useEffect(() => {
    const storedAuth = getAuth();
    if (!storedAuth) return;

    try {
      setAdmin(JSON.parse(storedAuth) as Admin);
    } catch {
      clearAuth();
    }
  }, []);

  const logout = () => {
    clearAuth();
    setAdmin(null);
  };

  return (
    <AuthContext.Provider value={{ admin, setAdmin, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
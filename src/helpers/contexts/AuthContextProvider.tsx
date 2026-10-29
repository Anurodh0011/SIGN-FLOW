"use client";

import React, { createContext, useContext, useState, type ReactNode } from "react";
import { CURRENT_USER } from "@/constants/navigation.constants";

interface User {
  name: string;
  initials: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: CURRENT_USER,
  isAuthenticated: true,
  login: () => {},
  logout: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(CURRENT_USER);

  const login = (email: string) => {
    setUser({
      name: email.split("@")[0] || "User",
      initials: (email[0] || "U").toUpperCase(),
      email,
    });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

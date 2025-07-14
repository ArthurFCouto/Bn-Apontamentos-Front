"use client";

import { authClient } from "@/services/auth";
import type { User } from "@/types/user";
import { createContext, useCallback, useEffect, useState } from "react";

export interface UserContextData {
  user: User | null;
  error: string | null;
  isLoading: boolean;
  checkSession?: () => Promise<void>;
}

export const UserContext = createContext<UserContextData>({
  user: null,
  error: null,
  isLoading: true,
  checkSession: undefined,
});

export const UserProvider = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const [state, setState] = useState<{
    user: User | null;
    error: string | null;
    isLoading: boolean;
  }>({
    user: null,
    error: null,
    isLoading: true,
  });

  const checkSession = useCallback(async () => {
    setState((prev) => ({
      ...prev,
      isLoading: true,
    }));
    const { data, error } = await authClient.getUser();
    if (error) {
      setState((prev) => ({
        ...prev,
        user: null,
        error: error,
        isLoading: false,
      }));
      return;
    }
    setState((prev) => ({
      ...prev,
      user: data ?? null,
      error: null,
      isLoading: false,
    }));
  }, [setState]);

  useEffect(() => {
    checkSession();
  }, []);

  return (
    <UserContext.Provider value={{ ...state, checkSession }}>
      {children}
    </UserContext.Provider>
  );
};

export const UserConsumer = UserContext.Consumer;

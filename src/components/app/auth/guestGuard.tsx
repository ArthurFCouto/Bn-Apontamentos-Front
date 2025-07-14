"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { paths } from "@/paths";
import { useUser } from "@/hooks/useUser";

export interface GuestGuardProps {
  children: React.ReactNode;
}

const GuestGuard = () => {
  const router = useRouter();
  const { user, error, isLoading } = useUser();

  const checkPermissions = async (): Promise<void> => {
    if (isLoading) {
      return;
    }

    if (user) {
      router.replace(paths.home);
      return;
    }
  };

  useEffect(() => {
    checkPermissions();
  }, [user, error, isLoading]);

  return <></>;
};

export default GuestGuard;

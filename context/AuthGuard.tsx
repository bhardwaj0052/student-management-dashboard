"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { getAuth } from "@/services/authService";

interface AuthGuardProps {
  children: React.ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter();
  const pathname = usePathname();

  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    if (pathname === "/") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCheckingAuth(false);
      return;
    }
    if (!auth) {
      router.replace("/");
      return;
    }
    setCheckingAuth(false);
  }, [pathname, router]);

  if (checkingAuth) {
    return null;
  }

  return <>{children}</>;
}
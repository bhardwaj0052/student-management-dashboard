"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { clearAuth, getAuth } from "../services/authService";
import { useAuth } from "./AuthContext";

interface AuthGuardProps {
  children: React.ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { setAdmin } = useAuth();

  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    if (pathname === "/") {
      clearAuth();
      setAdmin(null);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCheckingAuth(false);
      return;
    }
    if (!auth) {
      router.replace("/");
      return;
    }

    try {
      const user = JSON.parse(auth) as { role?: string; studentId?: string };
      if (user.role === "student") {
        const isEventsRoute = pathname === "/events";
        const studentRoute = pathname?.match(/^\/students\/([^/]+)(\/edit)?$/);
        const isStudentsRoute = pathname === "/students";
        const ownsStudentRoute = studentRoute?.[1] === user.studentId;

        if (isStudentsRoute) {
          router.replace(`/students/${user.studentId}`);
          return;
        }

        if (!isEventsRoute && !ownsStudentRoute) {
          router.replace(`/students/${user.studentId}`);
          return;
        }
      }
    } catch {
      router.replace("/");
      return;
    }
    setCheckingAuth(false);
  }, [pathname, router, setAdmin]);

  if (checkingAuth) {
    return null;
  }

  return <>{children}</>;
}
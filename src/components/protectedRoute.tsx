import { useAuth } from "../contexts/authContext";
import { useRouter } from "next/router";
import { useEffect, ReactNode } from "react";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  return <>{children}</>;
}
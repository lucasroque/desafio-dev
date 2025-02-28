import { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../config/auth";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "firebase/auth";
import { UserDto } from "@/dtos/user";
import { findUserRequest } from "@/services/user";
import Router from "next/router";

interface AuthContextType {
  user: UserDto | null;
  loginWithEmail: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserDto | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {

      if (!user) {
        return;
      }

      const idTokenResult = await user.getIdTokenResult();
      const claims = idTokenResult.claims;

      const authenticatedUser = await findUserRequest(claims.user_id as string);

      setUser(authenticatedUser);
      Router.push("/transactions");
    });
    return () => unsubscribe();
  }, []);

  const loginWithEmail = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const logout = async () => {
    setUser(null)
    await signOut(auth);
    Router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, loginWithEmail, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth deve ser usado dentro de AuthProvider");
  return context;
}

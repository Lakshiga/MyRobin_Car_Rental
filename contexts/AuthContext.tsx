"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useLazyQuery } from "@apollo/client";
import { gql } from "@apollo/client";

const LOGIN_MUTATION = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      token
      user {
        id
        email
        name
        role
      }
    }
  }
`;

const ME_QUERY = gql`
  query Me {
    me {
      id
      email
      name
      role
    }
  }
`;

interface User {
  id: string;
  email: string;
  name: string;
  role: "ADMIN" | "USER";
  imageUrl?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const [loginMutation] = useMutation(LOGIN_MUTATION);
  const [loadMe] = useLazyQuery(ME_QUERY);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      loadMe({
        context: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
        onCompleted: (data) => {
          if (data?.me) {
            setUser(data.me);
          } else {
            localStorage.removeItem("token");
          }
          setIsLoading(false);
        },
        onError: () => {
          localStorage.removeItem("token");
          setIsLoading(false);
        },
      });
    } else {
      setIsLoading(false);
    }
  }, [loadMe]);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const result = await loginMutation({
        variables: { 
          input: { email, password }
        },
      });

      if (result.data?.login) {
        const { token, user } = result.data.login;
        localStorage.setItem("token", token);
        setUser(user);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    router.push("/auth/signin");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

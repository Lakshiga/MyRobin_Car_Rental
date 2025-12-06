"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { Login } from "./Login";

export default function SignInPage() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSignIn = async (email: string, password: string) => {
    setError("");
    setIsLoading(true);

    try {
      const success = await login(email, password);
      if (success) {
        // Check user role after login
        const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
        if (currentUser?.role === "ADMIN") {
          router.push("/admin");
        } else {
          router.push("/");
        }
      } else {
        setError("Invalid email or password");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (name: string, email: string, password: string, confirmPassword: string) => {
    setError("");
    
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setIsLoading(true);

    try {
      // For signup, we use the login method which creates a user
      const success = await login(email, password);
      if (success) {
        // Update the user name in localStorage
        const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
        currentUser.name = name;
        localStorage.setItem("user", JSON.stringify(currentUser));
        
        router.push("/");
      } else {
        setError("Registration failed. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Login
      onSignIn={handleSignIn}
      onSignUp={handleSignUp}
      error={error}
      isLoading={isLoading}
    />
  );
}

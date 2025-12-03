"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Alert,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { Login, Visibility, VisibilityOff } from "@mui/icons-material";
import { useAuth } from "@/contexts/AuthContext";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login, user } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const success = await login(email, password);
      if (success) {
        // Check user role after login
        const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
        if (currentUser?.role === "admin") {
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

  return (
    <Box className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-slate-50 py-12 px-4">
      <Card className="max-w-md w-full !rounded-3xl !shadow-2xl">
        <CardContent className="!p-8">
          {/* Header */}
          <Box className="text-center mb-8">
            <Box className="flex justify-center mb-4">
              <Box className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 text-white font-bold text-2xl shadow-lg">
                M
              </Box>
            </Box>
            <Typography variant="h4" className="!font-bold !text-slate-900">
              Welcome Back
            </Typography>
            <Typography variant="body2" className="!text-slate-600 !mt-2">
              Sign in to your account to continue
            </Typography>
          </Box>

          {/* Form */}
          <Box component="form" onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <Alert severity="error" className="!rounded-xl">
                {error}
              </Alert>
            )}

            <TextField
              fullWidth
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="!rounded-xl"
              variant="outlined"
            />

            <TextField
              fullWidth
              label="Password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="!rounded-xl"
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <Button
                    onClick={() => setShowPassword(!showPassword)}
                    className="!min-w-0 !p-1"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </Button>
                ),
              }}
            />

            <Box className="flex items-center justify-between">
              <FormControlLabel
                control={<Checkbox />}
                label="Remember me"
                className="!text-sm"
              />
              <Link href="#" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                Forgot password?
              </Link>
            </Box>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={isLoading}
              startIcon={<Login />}
              className="!bg-gradient-to-r !from-blue-500 !to-blue-600 hover:!from-blue-600 hover:!to-blue-700 !shadow-lg !py-3 !rounded-xl"
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </Box>

          {/* Admin Credentials Hint */}
          <Box className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
            <Typography variant="caption" className="!font-semibold !text-blue-900 !mb-2 !block">
              Demo Admin Credentials:
            </Typography>
            <Typography variant="caption" className="!text-blue-700 !block">
              Email: admin@myrobin.com
            </Typography>
            <Typography variant="caption" className="!text-blue-700 !block">
              Password: admin123
            </Typography>
          </Box>

          {/* Sign Up Link */}
          <Box className="mt-6 text-center">
            <Typography variant="body2" className="!text-slate-600">
              Don't have an account?{" "}
              <Link href="/auth/signup" className="!font-semibold !text-blue-600 hover:!text-blue-700">
                Sign up
              </Link>
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}


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
import { PersonAdd, Visibility, VisibilityOff } from "@mui/icons-material";
import { useAuth } from "@/contexts/AuthContext";

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setIsLoading(true);

    try {
      const success = await login(formData.email, formData.password);
      if (success) {
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
              Create Account
            </Typography>
            <Typography variant="body2" className="!text-slate-600 !mt-2">
              Sign up to get started with MyRobin
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
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="!rounded-xl"
              variant="outlined"
            />

            <TextField
              fullWidth
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="!rounded-xl"
              variant="outlined"
            />

            <TextField
              fullWidth
              label="Password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
              required
              className="!rounded-xl"
              variant="outlined"
              helperText="Must be at least 6 characters"
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

            <TextField
              fullWidth
              label="Confirm Password"
              name="confirmPassword"
              type={showPassword ? "text" : "password"}
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="!rounded-xl"
              variant="outlined"
            />

            <FormControlLabel
              control={<Checkbox required />}
              label={
                <Typography variant="body2">
                  I agree to the{" "}
                  <Link href="#" className="!text-blue-600 hover:!text-blue-700 !font-medium">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="#" className="!text-blue-600 hover:!text-blue-700 !font-medium">
                    Privacy Policy
                  </Link>
                </Typography>
              }
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={isLoading}
              startIcon={<PersonAdd />}
              className="!bg-gradient-to-r !from-blue-500 !to-blue-600 hover:!from-blue-600 hover:!to-blue-700 !shadow-lg !py-3 !rounded-xl"
            >
              {isLoading ? "Creating account..." : "Create Account"}
            </Button>
          </Box>

          {/* Sign In Link */}
          <Box className="mt-6 text-center">
            <Typography variant="body2" className="!text-slate-600">
              Already have an account?{" "}
              <Link href="/auth/signin" className="!font-semibold !text-blue-600 hover:!text-blue-700">
                Sign in
              </Link>
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}


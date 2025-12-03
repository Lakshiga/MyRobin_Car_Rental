"use client";

import { useState } from "react";
import "./Login.css";
import { Person, PersonAdd, Email, Lock } from "@mui/icons-material";

interface NavButtonProps {
  onClick: () => void;
  isActive: boolean;
  label: string;
  icon: string;
}

const NavButton = ({ onClick, isActive, label, icon }: NavButtonProps) => (
  <button
    type="button"
    className={isActive ? "active" : ""}
    onClick={onClick}
  >
    {icon === "person" ? <Person /> : <PersonAdd />}
    <span>{label}</span>
  </button>
);

interface CardNavProps {
  view: "signin" | "signup";
  toggleView: () => void;
}

const CardNav = ({ view, toggleView }: CardNavProps) => {
  const navButtons = [
    { name: "signin", icon: "person", label: "Sign In" },
    { name: "signup", icon: "person-add", label: "Sign Up" },
  ];

  return (
    <ul className="card-nav">
      <li>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "16px" }}>
          <div style={{ 
            width: "40px", 
            height: "40px", 
            borderRadius: "8px", 
            background: "var(--color-primary)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            fontWeight: "bold",
            fontSize: "18px"
          }}>
            M
          </div>
        </div>
      </li>
      <span
        className="active-bar"
        style={{ top: view === "signin" ? "33.33%" : "66.66%" }}
      ></span>
      {navButtons.map((btn) => (
        <li key={btn.name}>
          <NavButton
            icon={btn.icon}
            label={btn.label}
            isActive={view === btn.name}
            onClick={() => {
              if (view !== btn.name) {
                toggleView();
              }
            }}
          />
        </li>
      ))}
    </ul>
  );
};

interface CardHeroProps {
  view: "signin" | "signup";
}

const CardHero = ({ view }: CardHeroProps) => (
  <div className="card-hero">
    <div
      className="card-hero-inner"
      style={{ top: view === "signin" ? 0 : "-100%" }}
    >
      <div className="card-hero-content signin">
        <h2>Welcome Back.</h2>
        <h3>Please enter your credentials.</h3>
      </div>
      <div className="card-hero-content signup">
        <h2>Create Account.</h2>
        <h3>Sign up to get started.</h3>
      </div>
    </div>
  </div>
);

interface CardFormsProps {
  view: "signin" | "signup";
  onSignIn: (email: string, password: string) => Promise<void>;
  onSignUp: (name: string, email: string, password: string, confirmPassword: string) => Promise<void>;
  error: string;
  isLoading: boolean;
  toggleView: () => void;
}

const CardForms = ({ view, onSignIn, onSignUp, error, isLoading, toggleView }: CardFormsProps) => {
  const [signInData, setSignInData] = useState({ email: "", password: "" });
  const [signUpData, setSignUpData] = useState({ 
    name: "", 
    email: "", 
    password: "", 
    confirmPassword: "" 
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleSignInSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSignIn(signInData.email, signInData.password);
  };

  const handleSignUpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSignUp(
      signUpData.name,
      signUpData.email,
      signUpData.password,
      signUpData.confirmPassword
    );
  };

  return (
    <div className="card-form">
      <div
        className="forms"
        style={{ 
          top: view === "signin" ? "0" : "-620px"
        }}
      >
        {/* Sign In Form */}
        <form onSubmit={handleSignInSubmit} style={{ width: "100%" }}>
          <div className="form-header">
            <h2>Sign In</h2>
            <p>
              Don't have an account?{" "}
              <a href="#" onClick={(e) => { e.preventDefault(); toggleView(); }}>
                Sign Up.
              </a>
            </p>
          </div>

          {error && <div className="error-message">{error}</div>}

          <div className="form-group">
            <label htmlFor="signin-email">Email</label>
            <div className="input-icon">
              <Email className="icon" />
              <input
                id="signin-email"
                type="email"
                placeholder="youremail@gmail.com"
                value={signInData.email}
                onChange={(e) => setSignInData({ ...signInData, email: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="signin-password">Password</label>
            <div className="input-icon">
              <Lock className="icon" />
              <input
                id="signin-password"
                type={showPassword ? "text" : "password"}
                placeholder="*********"
                value={signInData.password}
                onChange={(e) => setSignInData({ ...signInData, password: e.target.value })}
                required
              />
            </div>
          </div>

          <button type="submit" className="submit-button" disabled={isLoading}>
            {isLoading ? "Signing in..." : "SIGN IN"}
          </button>

          <div className="form-footer">
            By clicking Sign In you agree to our terms and conditions, privacy policy and reusability rules.
          </div>
        </form>

        {/* Sign Up Form */}
        <form onSubmit={handleSignUpSubmit} style={{ width: "100%" }}>
          <div className="form-header">
            <h2>Sign Up</h2>
            <p>
              Already have an account?{" "}
              <a href="#" onClick={(e) => { e.preventDefault(); toggleView(); }}>
                Sign In
              </a>
            </p>
          </div>

          {error && <div className="error-message">{error}</div>}

          <div className="form-group">
            <label htmlFor="signup-name">Full Name</label>
            <div className="input-icon">
              <Person className="icon" />
              <input
                id="signup-name"
                type="text"
                placeholder="Your Name"
                value={signUpData.name}
                onChange={(e) => setSignUpData({ ...signUpData, name: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="signup-email">Email</label>
            <div className="input-icon">
              <Email className="icon" />
              <input
                id="signup-email"
                type="email"
                placeholder="youremail@gmail.com"
                value={signUpData.email}
                onChange={(e) => setSignUpData({ ...signUpData, email: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="signup-password">Password</label>
            <div className="input-icon">
              <Lock className="icon" />
              <input
                id="signup-password"
                type={showPassword ? "text" : "password"}
                placeholder="*********"
                value={signUpData.password}
                onChange={(e) => setSignUpData({ ...signUpData, password: e.target.value })}
                required
                minLength={6}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="signup-confirm-password">Confirm Password</label>
            <div className="input-icon">
              <Lock className="icon" />
              <input
                id="signup-confirm-password"
                type={showPassword ? "text" : "password"}
                placeholder="*********"
                value={signUpData.confirmPassword}
                onChange={(e) => setSignUpData({ ...signUpData, confirmPassword: e.target.value })}
                required
              />
            </div>
          </div>

          <button type="submit" className="submit-button" disabled={isLoading}>
            {isLoading ? "Creating account..." : "SIGN UP"}
          </button>

          <div className="form-footer">
            By clicking Sign Up you agree to our terms and conditions, privacy policy and reusability rules.
          </div>
        </form>
      </div>
    </div>
  );
};

interface LoginProps {
  onSignIn: (email: string, password: string) => Promise<void>;
  onSignUp: (name: string, email: string, password: string, confirmPassword: string) => Promise<void>;
  error: string;
  isLoading: boolean;
}

export const Login = ({ onSignIn, onSignUp, error, isLoading }: LoginProps) => {
  const [view, setView] = useState<"signin" | "signup">("signin");
  const toggleView = () => setView(view === "signin" ? "signup" : "signin");

  return (
    <div className="login">
      <div className="card">
        <CardNav view={view} toggleView={toggleView} />
        <CardHero view={view} />
        <CardForms 
          view={view} 
          onSignIn={onSignIn} 
          onSignUp={onSignUp}
          error={error}
          isLoading={isLoading}
          toggleView={toggleView}
        />
      </div>
    </div>
  );
};


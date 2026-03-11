"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Building2,
  Users,
  CheckCircle,
  IndianRupee,
  ArrowRight,
} from "lucide-react";
import styles from "./login.module.css";
import { useAuth } from "@/context/AuthContext";

type AccountType = "warrior" | "organization";

const floatingStats = [
  { icon: IndianRupee, value: "₹2.5 Lakh", label: "Donated This Month" },
  { icon: Building2, value: "120+", label: "Verified NGOs" },
  { icon: Users, value: "10K+", label: "Active Volunteers" },
];

export default function LoginPage() {
  const [accountType, setAccountType] = useState<AccountType>("warrior");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: 'include', // Include cookies
      });

      const data = await res.json();

      if (res.ok) {
        login(data.user);
        router.push("/dashboard");
      } else {
        setError(data.error || "Login failed");
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.authContainer}>
      {/* Left Side - Form */}
      <motion.div
        className={styles.formSide}
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className={styles.formWrapper}>
          {/* Logo */}
          <Link href="/" className={styles.logo}>
            <div className={styles.logoMark}>
              <Heart size={20} />
            </div>
            <span className={styles.logoText}>HelpSphere</span>
          </Link>

          {/* Header */}
          <motion.div
            className={styles.header}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <h1 className={styles.title}>
              Welcome Back to <span className={styles.highlight}>HelpSphere</span>
            </h1>
            <p className={styles.subtitle}>Continue making an impact.</p>
          </motion.div>

          {/* Account Type Toggle */}
          <motion.div
            className={styles.toggleContainer}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <div className={styles.toggle}>
              <motion.div
                className={styles.toggleSlider}
                animate={{ x: accountType === "warrior" ? 0 : "100%" }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
              <button
                className={`${styles.toggleBtn} ${accountType === "warrior" ? styles.active : ""}`}
                onClick={() => setAccountType("warrior")}
                data-testid="toggle-warrior"
              >
                <Users size={16} />
                Warrior (User)
              </button>
              <button
                className={`${styles.toggleBtn} ${accountType === "organization" ? styles.active : ""}`}
                onClick={() => setAccountType("organization")}
                data-testid="toggle-organization"
              >
                <Building2 size={16} />
                Organization
              </button>
            </div>
          </motion.div>

          {/* Form */}
          <motion.form
            className={styles.form}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            onSubmit={handleLogin}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={accountType}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className={styles.fieldsGroup}
              >
                <div className={styles.inputGroup}>
                  <label className={styles.label}>
                    {accountType === "warrior" ? "Email Address" : "Organization Email"}
                  </label>
                  <div className={styles.inputWrapper}>
                    <Mail className={styles.inputIcon} size={18} />
                    <input
                      type="email"
                      placeholder={
                        accountType === "warrior"
                          ? "you@example.com"
                          : "contact@organization.org"
                      }
                      className={styles.input}
                      data-testid="email-input"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className={styles.inputGroup}>
                  <label className={styles.label}>Password</label>
                  <div className={styles.inputWrapper}>
                    <Lock className={styles.inputIcon} size={18} />
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      className={styles.input}
                      data-testid="password-input"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      className={styles.eyeBtn}
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label="Toggle password visibility"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
                {error && <p className="text-red-500 text-xs mt-2 font-bold">{error}</p>}
              </motion.div>
            </AnimatePresence>

            {/* Remember + Forgot */}
            <div className={styles.formMeta}>
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className={styles.checkbox}
                />
                <span className={styles.checkboxCustom}>
                  {rememberMe && <CheckCircle size={14} />}
                </span>
                Remember me
              </label>
              <Link href="#" className={styles.forgotLink}>
                Forgot Password?
              </Link>
            </div>

            {/* Submit */}
            <motion.button
              type="submit"
              className={styles.submitBtn}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              disabled={isLoading}
              data-testid="login-submit"
            >
              {isLoading ? "Logging in..." : "Login to HelpSphere"}
              <ArrowRight size={18} />
            </motion.button>

            {/* Divider */}
            <div className={styles.divider}>
              <span className={styles.dividerLine} />
              <span className={styles.dividerText}>OR</span>
              <span className={styles.dividerLine} />
            </div>

            {/* Social Login */}
            <div className={styles.socialBtns}>
              <motion.button
                type="button"
                className={styles.socialBtn}
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                Continue with Google
              </motion.button>
              <motion.button
                type="button"
                className={styles.socialBtn}
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                </svg>
                Continue with Apple
              </motion.button>
            </div>
          </motion.form>

          {/* Footer */}
          <motion.p
            className={styles.footerText}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            New here?{" "}
            <Link href="/signup" className={styles.footerLink}>
              Create an account
            </Link>
          </motion.p>
        </div>
      </motion.div>

      {/* Right Side - Image */}
      <motion.div
        className={styles.imageSide}
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className={styles.imageContainer}>
          <img
            src="/login-hero.png"
            alt="Volunteers and donors in a community center"
            className={styles.heroImage}
          />
          <div className={styles.imageOverlay} />

          {/* Bottom overlay text */}
          <div className={styles.imageBottomContent}>
            <h2 className={styles.imageTitle}>
              Welcome back, changemaker
            </h2>
            <p className={styles.imageSubtitle}>
              Your community is waiting — continue making real impact today
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

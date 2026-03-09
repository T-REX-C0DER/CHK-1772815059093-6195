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
  User,
  MapPin,
  Globe,
  FileText,
  Shield,
  CheckCircle,
  ArrowRight,
  IndianRupee,
} from "lucide-react";
import styles from "./signup.module.css";

type AccountType = "warrior" | "organization";

const floatingStats = [
  { icon: IndianRupee, value: "₹5L+", label: "Donated This Month" },
  { icon: CheckCircle, value: "100+", label: "NGOs Verified" },
  { icon: Users, value: "10K+", label: "Volunteers Active" },
];

export default function SignupPage() {
  const [accountType, setAccountType] = useState<AccountType | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const router = useRouter();

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (accountType === "organization") {
      router.push("/organization/dashboard");
    } else {
      router.push("/dashboard");
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
              Join <span className={styles.highlight}>HelpSphere</span> and Start
              Creating Impact
            </h1>
            <p className={styles.subtitle}>
              Choose your role and begin your journey.
            </p>
          </motion.div>

          {/* Role Selection Cards */}
          <motion.div
            className={styles.roleCards}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <motion.button
              className={`${styles.roleCard} ${accountType === "warrior" ? styles.roleActive : ""}`}
              onClick={() => setAccountType("warrior")}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.98 }}
              data-testid="role-warrior"
            >
              <div className={styles.roleIconWrapper}>
                <Heart
                  size={24}
                  className={styles.roleIcon}
                />
              </div>
              <div className={styles.roleInfo}>
                <span className={styles.roleName}>Warrior (User)</span>
                <span className={styles.roleDesc}>
                  Donate, volunteer, and track your impact.
                </span>
              </div>
              <div className={styles.roleCheck}>
                {accountType === "warrior" && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <CheckCircle size={22} />
                  </motion.div>
                )}
              </div>
            </motion.button>

            <motion.button
              className={`${styles.roleCard} ${accountType === "organization" ? styles.roleActive : ""}`}
              onClick={() => setAccountType("organization")}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.98 }}
              data-testid="role-organization"
            >
              <div className={styles.roleIconWrapper}>
                <Building2
                  size={24}
                  className={styles.roleIcon}
                />
              </div>
              <div className={styles.roleInfo}>
                <span className={styles.roleName}>Organization</span>
                <span className={styles.roleDesc}>
                  Run campaigns and receive transparent donations.
                </span>
              </div>
              <div className={styles.roleCheck}>
                {accountType === "organization" && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <CheckCircle size={22} />
                  </motion.div>
                )}
              </div>
            </motion.button>
          </motion.div>

          {/* Dynamic Form */}
          <AnimatePresence mode="wait">
            {accountType && (
              <motion.form
                key={accountType}
                className={styles.form}
                initial={{ opacity: 0, y: 20, height: 0 }}
                animate={{ opacity: 1, y: 0, height: "auto" }}
                exit={{ opacity: 0, y: -10, height: 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                onSubmit={handleSignup}
              >
                <div className={styles.fieldsGroup}>
                  {accountType === "warrior" ? (
                    <>
                      {/* Warrior Fields */}
                      <div className={styles.inputGroup}>
                        <label className={styles.label}>Full Name</label>
                        <div className={styles.inputWrapper}>
                          <User className={styles.inputIcon} size={18} />
                          <input
                            type="text"
                            placeholder="Enter your full name"
                            className={styles.input}
                          />
                        </div>
                      </div>

                      <div className={styles.inputGroup}>
                        <label className={styles.label}>Email Address</label>
                        <div className={styles.inputWrapper}>
                          <Mail className={styles.inputIcon} size={18} />
                          <input
                            type="email"
                            placeholder="you@example.com"
                            className={styles.input}
                          />
                        </div>
                      </div>

                      <div className={styles.inputRow}>
                        <div className={styles.inputGroup}>
                          <label className={styles.label}>Password</label>
                          <div className={styles.inputWrapper}>
                            <Lock className={styles.inputIcon} size={18} />
                            <input
                              type={showPassword ? "text" : "password"}
                              placeholder="Create password"
                              className={styles.input}
                            />
                            <button
                              type="button"
                              className={styles.eyeBtn}
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                          </div>
                        </div>

                        <div className={styles.inputGroup}>
                          <label className={styles.label}>Confirm Password</label>
                          <div className={styles.inputWrapper}>
                            <Lock className={styles.inputIcon} size={18} />
                            <input
                              type={showConfirmPassword ? "text" : "password"}
                              placeholder="Confirm password"
                              className={styles.input}
                            />
                            <button
                              type="button"
                              className={styles.eyeBtn}
                              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                              {showConfirmPassword ? (
                                <EyeOff size={18} />
                              ) : (
                                <Eye size={18} />
                              )}
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className={styles.inputGroup}>
                        <label className={styles.label}>City / Location</label>
                        <div className={styles.inputWrapper}>
                          <MapPin className={styles.inputIcon} size={18} />
                          <input
                            type="text"
                            placeholder="Enter your city"
                            className={styles.input}
                          />
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      {/* Organization Fields */}
                      <div className={styles.inputGroup}>
                        <label className={styles.label}>Organization Name</label>
                        <div className={styles.inputWrapper}>
                          <Building2 className={styles.inputIcon} size={18} />
                          <input
                            type="text"
                            placeholder="Enter organization name"
                            className={styles.input}
                          />
                        </div>
                      </div>

                      <div className={styles.inputGroup}>
                        <label className={styles.label}>Official Email</label>
                        <div className={styles.inputWrapper}>
                          <Mail className={styles.inputIcon} size={18} />
                          <input
                            type="email"
                            placeholder="contact@organization.org"
                            className={styles.input}
                          />
                        </div>
                      </div>

                      <div className={styles.inputRow}>
                        <div className={styles.inputGroup}>
                          <label className={styles.label}>Password</label>
                          <div className={styles.inputWrapper}>
                            <Lock className={styles.inputIcon} size={18} />
                            <input
                              type={showPassword ? "text" : "password"}
                              placeholder="Create password"
                              className={styles.input}
                            />
                            <button
                              type="button"
                              className={styles.eyeBtn}
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                          </div>
                        </div>

                        <div className={styles.inputGroup}>
                          <label className={styles.label}>Confirm Password</label>
                          <div className={styles.inputWrapper}>
                            <Lock className={styles.inputIcon} size={18} />
                            <input
                              type={showConfirmPassword ? "text" : "password"}
                              placeholder="Confirm password"
                              className={styles.input}
                            />
                            <button
                              type="button"
                              className={styles.eyeBtn}
                              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                              {showConfirmPassword ? (
                                <EyeOff size={18} />
                              ) : (
                                <Eye size={18} />
                              )}
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className={styles.inputRow}>
                        <div className={styles.inputGroup}>
                          <label className={styles.label}>
                            Website{" "}
                            <span className={styles.optional}>(optional)</span>
                          </label>
                          <div className={styles.inputWrapper}>
                            <Globe className={styles.inputIcon} size={18} />
                            <input
                              type="url"
                              placeholder="https://your-ngo.org"
                              className={styles.input}
                            />
                          </div>
                        </div>

                        <div className={styles.inputGroup}>
                          <label className={styles.label}>
                            NGO Registration ID
                          </label>
                          <div className={styles.inputWrapper}>
                            <FileText className={styles.inputIcon} size={18} />
                            <input
                              type="text"
                              placeholder="REG-XXXXX"
                              className={styles.input}
                            />
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>

                {/* Terms */}
                <label className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className={styles.checkbox}
                  />
                  <span className={styles.checkboxCustom}>
                    {agreed && <CheckCircle size={14} />}
                  </span>
                  <span className={styles.termsText}>
                    I agree to the{" "}
                    <Link href="#" className={styles.termsLink}>
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="#" className={styles.termsLink}>
                      Privacy Policy
                    </Link>
                  </span>
                </label>

                {/* Submit */}
                <motion.button
                  type="submit"
                  className={styles.submitBtn}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  data-testid="signup-submit"
                >
                  {accountType === "warrior"
                    ? "Create Warrior Account"
                    : "Create Organization Account"}
                  <ArrowRight size={18} />
                </motion.button>

                {/* Divider */}
                <div className={styles.divider}>
                  <span className={styles.dividerLine} />
                  <span className={styles.dividerText}>OR</span>
                  <span className={styles.dividerLine} />
                </div>

                {/* Social Signup */}
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
            )}
          </AnimatePresence>

          {/* Trust Indicators */}
          <motion.div
            className={styles.trustSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <div className={styles.trustItems}>
              <div className={styles.trustItem}>
                <Shield size={16} className={styles.trustIcon} />
                <span>Verified NGOs Only</span>
              </div>
              <div className={styles.trustItem}>
                <Lock size={16} className={styles.trustIcon} />
                <span>Secure Donations</span>
              </div>
              <div className={styles.trustItem}>
                <CheckCircle size={16} className={styles.trustIcon} />
                <span>Transparent Tracking</span>
              </div>
            </div>
          </motion.div>

          {/* Footer */}
          <motion.p
            className={styles.footerText}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            Already have an account?{" "}
            <Link href="/login" className={styles.footerLink}>
              Login
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
            src="/auth-hero.png"
            alt="Making impact through volunteering"
            className={styles.heroImage}
          />
          <div className={styles.imageOverlay} />

          {/* Bottom overlay text */}
          <div className={styles.imageBottomContent}>
            <h2 className={styles.imageTitle}>
              Start your journey to create meaningful change
            </h2>
            <p className={styles.imageSubtitle}>
              Every small action adds up to something extraordinary
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

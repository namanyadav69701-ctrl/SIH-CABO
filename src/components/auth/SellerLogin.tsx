import React, { useState } from 'react';
import {
  ArrowLeft,
  Sun,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  Activity,
  Cpu,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { authApi } from '../../services/authApi';
import { User } from '../../types/auth';

interface SellerLoginProps {
  onSuccess: (user: User) => void;
  onNavigateToRegister: () => void;
  onNavigateToTypeSelect: () => void;
  onOpenGoogleAuth: () => void;
  onOpenForgotPassword: () => void;
}

export const SellerLogin: React.FC<SellerLoginProps> = ({
  onSuccess,
  onNavigateToRegister,
  onNavigateToTypeSelect,
  onOpenGoogleAuth,
  onOpenForgotPassword,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<{ email?: string; password?: string }>({});

  const [googleNotice, setGoogleNotice] = useState<string | null>(null);

  const validate = () => {
    const errs: { email?: string; password?: string } = {};
    const emailTrim = email.trim();
    if (!emailTrim) {
      errs.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailTrim)) {
      errs.email = 'Please enter a valid email format (e.g. name@domain.com)';
    }

    if (!password) {
      errs.password = 'Password is required';
    } else if (password.length < 6) {
      errs.password = 'Password must be at least 6 characters';
    }

    setFieldErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setGoogleNotice(null);
    if (!validate()) return;

    setLoading(true);
    try {
      const res = await authApi.login({
        email: email.trim(),
        password,
        role: 'seller',
        rememberMe,
      });

      if (res.success && res.user) {
        onSuccess(res.user);
      } else {
        setError(res.error || 'Authentication failed. Please verify credentials.');
        if (res.field === 'email') {
          setFieldErrors((prev) => ({ ...prev, email: res.error }));
        } else if (res.field === 'password') {
          setFieldErrors((prev) => ({ ...prev, password: res.error }));
        }
      }
    } catch (err: any) {
      setError('An unexpected error occurred during login. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleClick = () => {
    setGoogleNotice('Google Sign-In — Coming Soon. Please use Email and Password for prototype access.');
  };

  return (
    <div className="min-h-screen bg-[#F5F4EF] text-[#1A1A1A] font-sans selection:bg-[#2D4F36] selection:text-white flex flex-col">
      {/* Top Header */}
      <div className="border-b border-[#1A1A1A]/15 bg-[#F5F4EF] px-6 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onNavigateToTypeSelect}
            className="flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-wider text-[#1A1A1A]/70 hover:text-[#1A1A1A] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>CHOOSE ACCOUNT TYPE</span>
          </button>
          <span className="text-[#1A1A1A]/30">|</span>
          <span className="px-2 py-0.5 bg-[#E5A84B]/20 text-[#8F5B1E] border border-[#E5A84B]/40 font-mono text-[9px] font-bold uppercase tracking-wider">
            DEMO MODE
          </span>
        </div>

        <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-[#2D4F36] font-bold">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00FF00]"></span>
          <span>SELLER PORTAL AUTHENTICATION</span>
        </div>
      </div>

      {/* Main Split-Screen Container */}
      <div className="flex-grow lg:flex">
        {/* LEFT COLUMN: LOGIN FORM */}
        <div className="w-full lg:w-[48%] xl:w-[45%] p-6 sm:p-10 xl:p-14 flex flex-col justify-between border-r border-[#1A1A1A]/15">
          <div className="max-w-md w-full mx-auto my-auto py-4">
            {/* Form Eyebrow & Title */}
            <div className="mb-7">
              <div className="flex items-center gap-2 font-mono text-[10px] font-bold tracking-widest text-[#2D4F36] uppercase mb-1.5">
                <Sun className="w-3.5 h-3.5 text-[#E5A84B]" />
                <span>SOLAR ASSET OWNER ACCESS</span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-[#1A1A1A] uppercase font-sans">
                SELLER LOGIN
              </h1>
              <p className="mt-2 text-xs sm:text-sm text-[#1A1A1A]/70 font-sans leading-relaxed">
                Enter your credentials to monitor your rooftop solar telemetry and claim verified carbon revenues.
              </p>
            </div>

            {/* Global Error Banner */}
            {error && (
              <div className="mb-5 p-3.5 bg-red-50 border border-red-300 text-red-800 text-xs font-mono flex flex-col gap-2">
                <div className="flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                  <div className="leading-snug">{error}</div>
                </div>
                {error.includes('not found') && (
                  <button
                    type="button"
                    onClick={onNavigateToRegister}
                    className="self-start mt-1 px-3 py-1.5 bg-[#2D4F36] text-white text-[10px] font-bold uppercase tracking-wider hover:bg-[#1F3927] transition-colors shadow-sm"
                  >
                    CREATE ACCOUNT →
                  </button>
                )}
              </div>
            )}

            {/* Google notice */}
            {googleNotice && (
              <div className="mb-5 p-3.5 bg-amber-50 border border-amber-300 text-amber-900 text-xs font-mono flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div className="leading-snug">{googleNotice}</div>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Field: Email */}
              <div>
                <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-[#1A1A1A] mb-1.5">
                  EMAIL ADDRESS
                </label>
                <input
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (fieldErrors.email) setFieldErrors((p) => ({ ...p, email: undefined }));
                  }}
                  placeholder="e.g. rajesh.sharma@indoresolar.in"
                  className={`w-full px-3.5 py-3 bg-white border ${
                    fieldErrors.email ? 'border-red-500 ring-1 ring-red-500' : 'border-[#1A1A1A]/20 focus:border-[#2D4F36]'
                  } text-[#1A1A1A] font-mono text-sm placeholder:text-[#1A1A1A]/40 focus:outline-none transition-colors`}
                />
                {fieldErrors.email && (
                  <p className="mt-1 text-[11px] font-mono text-red-600">{fieldErrors.email}</p>
                )}
              </div>

              {/* Field: Password */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#1A1A1A]">
                    PASSWORD
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-[10px] font-mono text-[#1A1A1A]/60 hover:text-[#1A1A1A] uppercase tracking-wider flex items-center gap-1"
                  >
                    {showPassword ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                    <span>{showPassword ? 'HIDE' : 'SHOW'}</span>
                  </button>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (fieldErrors.password) setFieldErrors((p) => ({ ...p, password: undefined }));
                    }}
                    placeholder="Enter account password (min. 8 characters)"
                    className={`w-full px-3.5 py-3 bg-white border ${
                      fieldErrors.password ? 'border-red-500 ring-1 ring-red-500' : 'border-[#1A1A1A]/20 focus:border-[#2D4F36]'
                    } text-[#1A1A1A] font-mono text-sm placeholder:text-[#1A1A1A]/40 focus:outline-none transition-colors`}
                  />
                </div>
                {fieldErrors.password && (
                  <p className="mt-1 text-[11px] font-mono text-red-600">{fieldErrors.password}</p>
                )}
              </div>

              {/* Checkbox: Remember Me & Forgot Password */}
              <div className="flex items-center justify-between pt-1 font-mono text-xs">
                <label className="flex items-center gap-2 cursor-pointer select-none text-[#1A1A1A]/80 hover:text-[#1A1A1A]">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded-none accent-[#2D4F36] border-[#1A1A1A]/30"
                  />
                  <span>Remember me</span>
                </label>

                <button
                  type="button"
                  onClick={onOpenForgotPassword}
                  className="text-[11px] uppercase tracking-wider text-[#1A1A1A]/60 hover:text-[#2D4F36] transition-colors underline underline-offset-2"
                >
                  Forgot password?
                </button>
              </div>

              {/* Primary Button */}
              <button
                type="submit"
                id="btn-seller-login"
                disabled={loading}
                className="w-full py-3.5 px-4 bg-[#2D4F36] hover:bg-[#1F3927] disabled:opacity-50 text-white font-mono font-bold text-sm tracking-wider uppercase flex items-center justify-center gap-2 transition-all shadow-sm active:scale-[0.99] mt-2 cursor-pointer"
              >
                {loading ? (
                  <span className="inline-flex items-center gap-2">
                    <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    <span>AUTHENTICATING...</span>
                  </span>
                ) : (
                  <span>LOGIN AS SELLER</span>
                )}
              </button>
            </form>

            {/* Quick Demo Seed Hint */}
            <div className="mt-3 p-2.5 bg-[#2D4F36]/5 border border-[#2D4F36]/20 font-mono text-[11px] text-[#1A1A1A]/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1.5">
              <span>Demo: <strong className="text-[#1A1A1A]">seller@cabo.demo</strong> / <span className="text-[#2D4F36]">demo123</span></span>
              <button
                type="button"
                id="btn-autofill-seller-demo"
                onClick={() => {
                  setEmail('seller@cabo.demo');
                  setPassword('demo123');
                }}
                className="text-[#2D4F36] font-bold hover:underline uppercase text-[10px] bg-white px-2 py-0.5 border border-[#2D4F36]/30"
              >
                Auto-fill
              </button>
            </div>

            {/* Sign-up Link */}
            <div className="mt-5 text-center font-mono text-xs">
              <span className="text-[#1A1A1A]/60">Don't have an account? </span>
              <button
                type="button"
                id="btn-goto-seller-register"
                onClick={onNavigateToRegister}
                className="font-bold uppercase text-[#2D4F36] hover:underline decoration-2 underline-offset-4 ml-1 cursor-pointer"
              >
                CREATE SELLER ACCOUNT
              </button>
            </div>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#1A1A1A]/15"></div>
              </div>
              <div className="relative flex justify-center text-[10px] uppercase font-mono tracking-widest text-[#1A1A1A]/50">
                <span className="bg-[#F5F4EF] px-3">──────── OR ────────</span>
              </div>
            </div>

            {/* Google Authentication Button */}
            <button
              type="button"
              id="btn-seller-google-auth"
              onClick={handleGoogleClick}
              className="w-full py-3 px-4 bg-white hover:bg-[#F2ECE1] border border-[#1A1A1A]/20 text-[#1A1A1A] font-mono font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2.5 transition-colors shadow-sm cursor-pointer"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>GOOGLE SIGN-IN (COMING SOON)</span>
            </button>
          </div>

          <div className="pt-4 border-t border-[#1A1A1A]/10 flex items-center justify-between font-mono text-[10px] text-[#1A1A1A]/50 uppercase">
            <span>SELLER ENCLAVE v2.4</span>
            <span>END-TO-END SILICON SIGNED</span>
          </div>
        </div>

        {/* RIGHT COLUMN: SELLER SYSTEM INFO & SOLAR MONITORING VISUAL */}
        <div className="w-full lg:w-[52%] xl:w-[55%] bg-[#1A1A1A] text-[#F5F4EF] p-8 xl:p-14 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-8">
              <div className="flex items-center gap-2 font-mono text-xs text-[#00FF00]">
                <span className="w-2 h-2 rounded-full bg-[#00FF00] animate-pulse"></span>
                <span className="font-bold">CABO SOLAR REVENUE PIPELINE</span>
              </div>
              <span className="font-mono text-[10px] text-white/40 uppercase tracking-widest">
                STAGE 01 / SELLER NETWORK
              </span>
            </div>

            {/* Requested Pipeline: SOLAR → MEASURE → VERIFY → AGGREGATE → MONETIZE */}
            <div className="mb-10">
              <div className="text-[10px] font-mono text-[#E5A84B] font-bold uppercase tracking-widest mb-2">
                ■ 5-STAGE ASSET REVENUE PIPELINE
              </div>
              <div className="font-mono font-black text-xs sm:text-sm tracking-wider text-white bg-white/5 border border-white/15 p-4 flex flex-wrap items-center gap-2">
                <span className="text-[#00FF00]">SOLAR</span>
                <span className="text-white/40">→</span>
                <span>MEASURE</span>
                <span className="text-white/40">→</span>
                <span>VERIFY</span>
                <span className="text-white/40">→</span>
                <span>AGGREGATE</span>
                <span className="text-white/40">→</span>
                <span className="text-[#E5A84B]">MONETIZE</span>
              </div>
            </div>

            {/* Live Telemetry Snapshot Card */}
            <div className="border border-white/15 bg-white/5 p-6 mb-8 font-mono">
              <div className="flex items-center justify-between text-xs text-white/60 mb-4 pb-3 border-b border-white/10">
                <div className="flex items-center gap-2 text-white">
                  <Cpu className="w-4 h-4 text-[#00FF00]" />
                  <span className="font-bold">TELEMETRY NODE: CABO-MP-0247</span>
                </div>
                <span className="text-[10px] text-[#00FF00] font-bold">ONLINE · 99.84% SENSING</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div>
                  <div className="text-[10px] text-white/50 uppercase">RATED CAPACITY</div>
                  <div className="text-lg font-bold text-white mt-0.5">6.0 kW</div>
                  <div className="text-[9px] text-white/40">Dual Bifacial Array</div>
                </div>
                <div>
                  <div className="text-[10px] text-white/50 uppercase">HOST SHARE</div>
                  <div className="text-lg font-bold text-[#00FF00] mt-0.5">96.0%</div>
                  <div className="text-[9px] text-white/40">Zero Intermediary Fees</div>
                </div>
                <div>
                  <div className="text-[10px] text-white/50 uppercase">VERIFIED ACCRUED</div>
                  <div className="text-lg font-bold text-[#E5A84B] mt-0.5">0.485 tCO₂e</div>
                  <div className="text-[9px] text-white/40">ATECC608A Signed</div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-white/70">
                <span>Direct UPI Weekly Settlement</span>
                <span className="font-bold text-white">₹3,880.00 Scheduled</span>
              </div>
            </div>

            {/* Explanatory Industrial Points */}
            <div className="space-y-3 font-sans text-xs text-white/70 leading-relaxed">
              <div className="flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#00FF00] shrink-0 mt-0.5" />
                <p>
                  <strong className="text-white font-mono uppercase">Multi-Source Verification: </strong>
                  Class 0.5S optical CT pulse metering cross-referenced against inverter registers prevents tampering and guarantees carbon additionality.
                </p>
              </div>
              <div className="flex items-start gap-2.5">
                <Zap className="w-4 h-4 text-[#E5A84B] shrink-0 mt-0.5" />
                <p>
                  <strong className="text-white font-mono uppercase">Zero Upfront Hardware: </strong>
                  CABO gateways are supplied at zero capital expense to rooftop hosts, funded strictly through a 4% network clearing fee upon carbon sale.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-white/10 flex items-center justify-between font-mono text-[10px] text-white/40 uppercase">
            <span>MADHYA PRADESH DISCOM PILOT</span>
            <span>MPPKVVCL CERTIFIED</span>
          </div>
        </div>
      </div>
    </div>
  );
};

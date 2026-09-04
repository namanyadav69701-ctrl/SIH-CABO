import React, { useState } from 'react';
import { ArrowLeft, Sun, Eye, EyeOff, AlertCircle, ShieldCheck, Zap } from 'lucide-react';
import { authApi } from '../../services/authApi';
import { User } from '../../types/auth';

interface SellerRegisterProps {
  onSuccess: (user: User) => void;
  onNavigateToLogin: () => void;
  onNavigateToTypeSelect: () => void;
  onOpenGoogleAuth: () => void;
}

export const SellerRegister: React.FC<SellerRegisterProps> = ({
  onSuccess,
  onNavigateToLogin,
  onNavigateToTypeSelect,
  onOpenGoogleAuth,
}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const [googleNotice, setGoogleNotice] = useState<string | null>(null);

  const validate = () => {
    const errs: Record<string, string> = {};

    if (!fullName.trim()) {
      errs.fullName = 'Full Name is required';
    }

    const emailTrim = email.trim();
    if (!emailTrim) {
      errs.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailTrim)) {
      errs.email = 'Please enter a valid email address (e.g. name@domain.com)';
    }

    if (!phone.trim()) {
      errs.phone = 'Contact number is required';
    }

    if (!password) {
      errs.password = 'Password is required';
    } else if (password.length < 6) {
      errs.password = 'Password must be at least 6 characters long';
    }

    if (password !== confirmPassword) {
      errs.confirmPassword = 'Passwords do not match';
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
      const res = await authApi.register({
        fullName: fullName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        password,
        role: 'seller',
      });

      if (res.success && res.user) {
        onSuccess(res.user);
      } else {
        setError(res.error || 'Registration failed. Please check form entries.');
        if (res.field) {
          setFieldErrors((p) => ({ ...p, [res.field!]: res.error || 'Invalid' }));
        }
      }
    } catch (err: any) {
      setError('An error occurred during account creation. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleClick = () => {
    setGoogleNotice('Google Sign-In is coming soon. Please use the form above for prototype access.');
  };

  return (
    <div className="min-h-screen bg-[#F5F4EF] text-[#1A1A1A] font-sans selection:bg-[#2D4F36] selection:text-white flex flex-col">
      {/* Top Header */}
      <div className="border-b border-[#1A1A1A]/15 bg-[#F5F4EF] px-6 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onNavigateToLogin}
            className="flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-wider text-[#1A1A1A]/70 hover:text-[#1A1A1A] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>BACK TO SELLER LOGIN</span>
          </button>
          <span className="text-[#1A1A1A]/30">|</span>
          <span className="px-2 py-0.5 bg-[#E5A84B]/20 text-[#8F5B1E] border border-[#E5A84B]/40 font-mono text-[9px] font-bold uppercase tracking-wider">
            DEMO MODE
          </span>
        </div>

        <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-[#2D4F36] font-bold">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00FF00]"></span>
          <span>NEW SELLER REGISTRATION</span>
        </div>
      </div>

      {/* Main Split Container */}
      <div className="flex-grow lg:flex">
        {/* LEFT COLUMN: FORM */}
        <div className="w-full lg:w-[50%] xl:w-[46%] p-6 sm:p-10 xl:p-14 flex flex-col justify-between border-r border-[#1A1A1A]/15">
          <div className="max-w-md w-full mx-auto my-auto py-2">
            <div className="mb-6">
              <div className="flex items-center gap-2 font-mono text-[10px] font-bold tracking-widest text-[#2D4F36] uppercase mb-1.5">
                <Sun className="w-3.5 h-3.5 text-[#E5A84B]" />
                <span>ROOFTOP SOLAR ASSET OWNER</span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-[#1A1A1A] uppercase font-sans">
                CREATE SELLER ACCOUNT
              </h1>
              <p className="mt-1.5 text-xs sm:text-sm text-[#1A1A1A]/70 font-sans leading-relaxed">
                Connect your rooftop solar system to CABO's decentralized MRV network and claim verified carbon revenue.
              </p>
            </div>

            {error && (
              <div className="mb-5 p-3.5 bg-red-50 border border-red-300 text-red-800 text-xs font-mono flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                <div className="leading-snug">{error}</div>
              </div>
            )}

            {googleNotice && (
              <div className="mb-5 p-3.5 bg-amber-50 border border-amber-300 text-amber-900 text-xs font-mono flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div className="leading-snug">{googleNotice}</div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3.5">
              {/* Account Type Locked Badge */}
              <div className="p-2.5 bg-[#2D4F36]/10 border border-[#2D4F36]/30 flex items-center justify-between font-mono text-xs">
                <span className="text-[#2D4F36] font-bold uppercase tracking-wider">
                  ACCOUNT TYPE: SELLER
                </span>
                <span className="text-[10px] text-[#1A1A1A]/60 uppercase">FIXED ROLE</span>
              </div>

              {/* Full Name */}
              <div>
                <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-[#1A1A1A] mb-1">
                  FULL NAME
                </label>
                <input
                  type="text"
                  autoComplete="name"
                  required
                  value={fullName}
                  onChange={(e) => {
                    setFullName(e.target.value);
                    if (fieldErrors.fullName) setFieldErrors((p) => ({ ...p, fullName: '' }));
                  }}
                  placeholder="e.g. Rajesh Sharma"
                  className={`w-full px-3.5 py-2.5 bg-white border ${
                    fieldErrors.fullName ? 'border-red-500' : 'border-[#1A1A1A]/20 focus:border-[#2D4F36]'
                  } text-[#1A1A1A] font-mono text-sm placeholder:text-[#1A1A1A]/40 focus:outline-none transition-colors`}
                />
                {fieldErrors.fullName && (
                  <p className="mt-1 text-[11px] font-mono text-red-600">{fieldErrors.fullName}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-[#1A1A1A] mb-1">
                  EMAIL ADDRESS
                </label>
                <input
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (fieldErrors.email) setFieldErrors((p) => ({ ...p, email: '' }));
                  }}
                  placeholder="e.g. rajesh@domain.in"
                  className={`w-full px-3.5 py-2.5 bg-white border ${
                    fieldErrors.email ? 'border-red-500' : 'border-[#1A1A1A]/20 focus:border-[#2D4F36]'
                  } text-[#1A1A1A] font-mono text-sm placeholder:text-[#1A1A1A]/40 focus:outline-none transition-colors`}
                />
                {fieldErrors.email && (
                  <p className="mt-1 text-[11px] font-mono text-red-600">{fieldErrors.email}</p>
                )}
              </div>

              {/* Contact Number */}
              <div>
                <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-[#1A1A1A] mb-1">
                  CONTACT NUMBER
                </label>
                <input
                  type="tel"
                  autoComplete="tel"
                  required
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    if (fieldErrors.phone) setFieldErrors((p) => ({ ...p, phone: '' }));
                  }}
                  placeholder="e.g. +91 98260 14820"
                  className={`w-full px-3.5 py-2.5 bg-white border ${
                    fieldErrors.phone ? 'border-red-500' : 'border-[#1A1A1A]/20 focus:border-[#2D4F36]'
                  } text-[#1A1A1A] font-mono text-sm placeholder:text-[#1A1A1A]/40 focus:outline-none transition-colors`}
                />
                {fieldErrors.phone && (
                  <p className="mt-1 text-[11px] font-mono text-red-600">{fieldErrors.phone}</p>
                )}
              </div>

              {/* Password & Confirm Password */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#1A1A1A]">
                      PASSWORD
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-[9px] font-mono text-[#1A1A1A]/60 hover:text-[#1A1A1A] uppercase"
                    >
                      {showPassword ? 'HIDE' : 'SHOW'}
                    </button>
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="new-password"
                    required
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (fieldErrors.password) setFieldErrors((p) => ({ ...p, password: '' }));
                    }}
                    placeholder="Min. 8 chars"
                    className={`w-full px-3.5 py-2.5 bg-white border ${
                      fieldErrors.password ? 'border-red-500' : 'border-[#1A1A1A]/20 focus:border-[#2D4F36]'
                    } text-[#1A1A1A] font-mono text-sm placeholder:text-[#1A1A1A]/40 focus:outline-none transition-colors`}
                  />
                  {fieldErrors.password && (
                    <p className="mt-1 text-[10px] font-mono text-red-600">{fieldErrors.password}</p>
                  )}
                </div>

                <div>
                  <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-[#1A1A1A] mb-1">
                    CONFIRM PASSWORD
                  </label>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="new-password"
                    required
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      if (fieldErrors.confirmPassword) setFieldErrors((p) => ({ ...p, confirmPassword: '' }));
                    }}
                    placeholder="Repeat password"
                    className={`w-full px-3.5 py-2.5 bg-white border ${
                      fieldErrors.confirmPassword ? 'border-red-500' : 'border-[#1A1A1A]/20 focus:border-[#2D4F36]'
                    } text-[#1A1A1A] font-mono text-sm placeholder:text-[#1A1A1A]/40 focus:outline-none transition-colors`}
                  />
                  {fieldErrors.confirmPassword && (
                    <p className="mt-1 text-[10px] font-mono text-red-600">{fieldErrors.confirmPassword}</p>
                  )}
                </div>
              </div>

              {/* Checkbox: Terms */}
              <div className="pt-1">
                <label className="flex items-start gap-2 cursor-pointer font-mono text-xs text-[#1A1A1A]/80">
                  <input
                    type="checkbox"
                    checked={agreedToTerms}
                    onChange={(e) => {
                      setAgreedToTerms(e.target.checked);
                      if (fieldErrors.terms) setFieldErrors((p) => ({ ...p, terms: '' }));
                    }}
                    className="w-4 h-4 mt-0.5 rounded-none accent-[#2D4F36] border-[#1A1A1A]/30"
                  />
                  <span>
                    I agree to CABO's <span className="underline">Terms</span> and{' '}
                    <span className="underline">Privacy Policy</span>
                  </span>
                </label>
                {fieldErrors.terms && (
                  <p className="mt-1 text-[11px] font-mono text-red-600">{fieldErrors.terms}</p>
                )}
              </div>

              {/* Primary Button */}
              <button
                type="submit"
                id="btn-seller-register"
                disabled={loading}
                className="w-full py-3.5 px-4 bg-[#2D4F36] hover:bg-[#1F3927] disabled:opacity-50 text-white font-mono font-bold text-sm tracking-wider uppercase flex items-center justify-center gap-2 transition-all shadow-sm active:scale-[0.99] mt-2 cursor-pointer"
              >
                {loading ? (
                  <span className="inline-flex items-center gap-2">
                    <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    <span>CREATING ACCOUNT...</span>
                  </span>
                ) : (
                  <span>CREATE SELLER ACCOUNT</span>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-5">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#1A1A1A]/15"></div>
              </div>
              <div className="relative flex justify-center text-[10px] uppercase font-mono tracking-widest text-[#1A1A1A]/50">
                <span className="bg-[#F5F4EF] px-3">──────── OR ────────</span>
              </div>
            </div>

            {/* Google Signup */}
            <button
              type="button"
              id="btn-seller-register-google"
              onClick={handleGoogleClick}
              className="w-full py-2.5 px-4 bg-white hover:bg-[#F2ECE1] border border-[#1A1A1A]/20 text-[#1A1A1A] font-mono font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2.5 transition-colors shadow-sm cursor-pointer"
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

            {/* Bottom Login Link */}
            <div className="mt-5 text-center font-mono text-xs">
              <span className="text-[#1A1A1A]/60">Already have an account? </span>
              <button
                type="button"
                id="btn-goto-seller-login"
                onClick={onNavigateToLogin}
                className="font-bold uppercase text-[#2D4F36] hover:underline decoration-2 underline-offset-4 ml-1 cursor-pointer"
              >
                LOGIN
              </button>
            </div>
          </div>

          <div className="pt-3 border-t border-[#1A1A1A]/10 flex items-center justify-between font-mono text-[10px] text-[#1A1A1A]/50 uppercase">
            <span>SELLER ONBOARDING PROTOCOL</span>
            <span>SECURE SALTED SCRYPT STORAGE</span>
          </div>
        </div>

        {/* RIGHT COLUMN: BENEFITS & HARDWARE OVERVIEW */}
        <div className="w-full lg:w-[50%] xl:w-[54%] bg-[#1A1A1A] text-[#F5F4EF] p-8 xl:p-14 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-8">
              <div className="flex items-center gap-2 font-mono text-xs text-[#00FF00]">
                <span className="w-2 h-2 rounded-full bg-[#00FF00] animate-pulse"></span>
                <span className="font-bold">SELLER ONBOARDING & MRV ENCLAVE</span>
              </div>
              <span className="font-mono text-[10px] text-white/40 uppercase tracking-widest">
                VERIFIED ASSET REGISTRY
              </span>
            </div>

            <div className="mb-8">
              <div className="text-[10px] font-mono text-[#E5A84B] font-bold uppercase tracking-widest mb-2">
                ■ ROOFTOP HOST GUARANTEES
              </div>
              <h2 className="text-2xl font-black font-sans uppercase tracking-tight text-white mb-3">
                TURN ROOFTOP SUNLIGHT INTO DIRECT DISCOM REVENUES
              </h2>
              <p className="text-sm text-white/70 font-sans leading-relaxed">
                By joining CABO, your solar generation is verified via edge sensor concordance, packaged into verified micro-credits, and sold to ESG buyers with 96% direct payout to your bank or UPI.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 font-mono">
              <div className="p-4 bg-white/5 border border-white/10">
                <div className="text-[10px] text-[#00FF00] font-bold uppercase">PAYOUT RATIO</div>
                <div className="text-2xl font-bold text-white mt-1">96% HOST SHARE</div>
                <div className="text-xs text-white/50 mt-1">Only 4% network clearing fee</div>
              </div>

              <div className="p-4 bg-white/5 border border-white/10">
                <div className="text-[10px] text-[#E5A84B] font-bold uppercase">HARDWARE DEPLOYMENT</div>
                <div className="text-2xl font-bold text-white mt-1">₹0 CAPITAL COST</div>
                <div className="text-xs text-white/50 mt-1">DISCOM-certified installation</div>
              </div>
            </div>

            <div className="space-y-3 font-sans text-xs text-white/70 leading-relaxed border-t border-white/10 pt-6">
              <div className="flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#00FF00] shrink-0 mt-0.5" />
                <p>
                  <strong className="text-white font-mono uppercase">Cryptographic Hardware Key: </strong>
                  Every registered solar installation receives an on-site hardware node with embedded ATECC608A cryptographic secure element.
                </p>
              </div>
              <div className="flex items-start gap-2.5">
                <Zap className="w-4 h-4 text-[#E5A84B] shrink-0 mt-0.5" />
                <p>
                  <strong className="text-white font-mono uppercase">Automated DISCOM Sync: </strong>
                  Readings are auto-harmonized with state electricity board feeders to eliminate fraudulent offset claims.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-white/10 flex items-center justify-between font-mono text-[10px] text-white/40 uppercase">
            <span>CENTRAL REGION PILOT: MADHYA PRADESH</span>
            <span>247 ROOFTOPS OPERATING</span>
          </div>
        </div>
      </div>
    </div>
  );
};

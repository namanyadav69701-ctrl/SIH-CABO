import React, { useState, useEffect } from 'react';
import {
  Sun,
  Zap,
  ShieldCheck,
  Layers,
  TrendingUp,
  Activity,
  CheckCircle2,
  Radio,
  ArrowRight,
  Lock,
  Mail,
  User as UserIcon,
  Building2,
  Phone,
  Eye,
  EyeOff,
  AlertCircle,
  KeyRound,
  ShieldAlert,
  Sparkles,
} from 'lucide-react';
import { GoogleAuthModal } from './auth/GoogleAuthModal';
import { ForgotPasswordModal } from './auth/ForgotPasswordModal';
import { User, UserRole, LoginPayload, RegisterPayload } from '../types/auth';
import { authApi } from '../services/authApi';

interface LoginPageProps {
  currentUser: User | null;
  onLogin: (user: User) => void;
  onLogout: () => void;
  onNavigateToMonitor?: () => void;
  onNavigateToProcess?: () => void;
  initialRole?: UserRole | null;
}

export const LoginPage: React.FC<LoginPageProps> = ({
  currentUser,
  onLogin,
  onLogout,
  onNavigateToMonitor,
  onNavigateToProcess,
  initialRole = 'seller',
}) => {
  // Authentication mode & role states
  const [role, setRole] = useState<UserRole>(initialRole || 'seller');
  const [mode, setMode] = useState<'login' | 'register'>('login');

  // Form input states
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  // Signup input states
  const [fullName, setFullName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // UX Feedback states
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [googleNotice, setGoogleNotice] = useState<string | null>(null);

  // Modals
  const [googleModalOpen, setGoogleModalOpen] = useState(false);
  const [forgotModalOpen, setForgotModalOpen] = useState(false);

  // Live Left-Side Telemetry Simulation State (MP-0247)
  const [telemetry, setTelemetry] = useState({
    solarOutput: 4.82,
    todayKwh: 24.8,
    co2Avoided: 18.7,
    gridFrequency: 50.01,
  });

  // URL Hash synchronization
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash.includes('seller-register') || hash.includes('seller/register')) {
        setRole('seller');
        setMode('register');
      } else if (hash.includes('buyer-register') || hash.includes('buyer/register')) {
        setRole('buyer');
        setMode('register');
      } else if (hash.includes('buyer')) {
        setRole('buyer');
        setMode('login');
      } else if (hash.includes('seller')) {
        setRole('seller');
        setMode('login');
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  // Sync hash when role or mode changes internally
  const handleRoleSwitch = (newRole: UserRole) => {
    setRole(newRole);
    setErrorMessage(null);
    setFieldErrors({});
    setGoogleNotice(null);

    if (mode === 'register') {
      window.location.hash = `#login/${newRole}-register`;
    } else {
      window.location.hash = `#login/${newRole}`;
    }
  };

  const handleModeSwitch = (newMode: 'login' | 'register') => {
    setMode(newMode);
    setErrorMessage(null);
    setFieldErrors({});
    setGoogleNotice(null);

    if (newMode === 'register') {
      window.location.hash = `#login/${role}-register`;
    } else {
      window.location.hash = `#login/${role}`;
    }
  };

  // Subtle live number fluctuation for the left-side telemetry card
  useEffect(() => {
    const interval = setInterval(() => {
      setTelemetry((prev) => {
        // Natural small jitter in instantaneous kW output (4.79kW ~ 4.86kW)
        const jitter = (Math.random() - 0.49) * 0.03;
        const newOutput = Math.max(4.78, Math.min(4.86, prev.solarOutput + jitter));
        // Slow realistic increment in today's cumulative generation
        const newToday = prev.todayKwh + 0.01;
        // Estimated avoided CO2 calculated proportionally (~0.75 kg per kWh)
        const newCo2 = 18.7 + (newToday - 24.8) * 0.75;
        // Minor grid frequency fluctuation around 50.00 Hz
        const newFreq = 50.0 + (Math.random() - 0.5) * 0.03;

        return {
          solarOutput: parseFloat(newOutput.toFixed(2)),
          todayKwh: parseFloat(newToday.toFixed(2)),
          co2Avoided: parseFloat(newCo2.toFixed(1)),
          gridFrequency: parseFloat(newFreq.toFixed(2)),
        };
      });
    }, 3200);

    return () => clearInterval(interval);
  }, []);

  // Quick Demo Auto-fill Helper for Evaluators
  const handleAutofillDemo = (targetRole: UserRole) => {
    setRole(targetRole);
    setMode('login');
    setErrorMessage(null);
    setFieldErrors({});
    setGoogleNotice(null);

    if (targetRole === 'seller') {
      setLoginEmail('seller@cabo.demo');
      setLoginPassword('demo123');
      window.location.hash = '#login/seller';
    } else {
      setLoginEmail('buyer@cabo.demo');
      setLoginPassword('demo123');
      window.location.hash = '#login/buyer';
    }
  };

  // Login handler
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setGoogleNotice(null);

    const errors: Record<string, string> = {};
    if (!loginEmail.trim()) {
      errors.email = 'Email address is required';
    } else if (!loginEmail.includes('@') || !loginEmail.includes('.')) {
      errors.email = 'Please enter a valid email address';
    }

    if (!loginPassword) {
      errors.password = 'Password is required';
    } else if (loginPassword.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setFieldErrors({});
    setLoading(true);

    try {
      const payload: LoginPayload = {
        email: loginEmail.trim().toLowerCase(),
        password: loginPassword,
        role: role,
        rememberMe: rememberMe,
      };

      const res = await authApi.login(payload);
      if (res.success && res.user) {
        onLogin(res.user);
      } else {
        setErrorMessage(
          res.error || 'Authentication failed. Verify email and password or use Auto-fill demo credentials.'
        );
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Unexpected connection error during login.');
    } finally {
      setLoading(false);
    }
  };

  // Register handler
  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setGoogleNotice(null);

    const errors: Record<string, string> = {};
    if (!fullName.trim()) errors.fullName = 'Full Name is required';
    if (role === 'buyer' && !companyName.trim()) {
      errors.companyName = 'Company / Organization name is required';
    }

    if (!registerEmail.trim()) {
      errors.email = 'Email address is required';
    } else if (!registerEmail.includes('@') || !registerEmail.includes('.')) {
      errors.email = 'Please enter a valid email address';
    }

    if (!phone.trim()) errors.phone = 'Contact number is required';

    if (!registerPassword) {
      errors.password = 'Password is required';
    } else if (registerPassword.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }

    if (!confirmPassword) {
      errors.confirmPassword = 'Confirm password is required';
    } else if (registerPassword !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setFieldErrors({});
    setLoading(true);

    try {
      const payload: RegisterPayload = {
        fullName: fullName.trim(),
        email: registerEmail.trim().toLowerCase(),
        phone: phone.trim(),
        password: registerPassword,
        role: role,
        companyName: role === 'buyer' ? companyName.trim() : undefined,
      };

      const res = await authApi.register(payload);
      if (res.success && res.user) {
        onLogin(res.user);
      } else {
        setErrorMessage(res.error || 'Registration failed. Please check your information.');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Unexpected connection error during registration.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuthClick = () => {
    setGoogleNotice('Google Sign-In is coming soon. Please use Email and Password for prototype access.');
  };

  return (
    <div
      id="cabo-split-screen-auth"
      className="w-full min-h-screen lg:h-screen lg:overflow-hidden flex flex-col lg:flex-row bg-[#0E1310] selection:bg-[#2D4F36] selection:text-white"
    >
      {/* ========================================================================= */}
      {/* LEFT SIDE — 60%: WHAT CABO IS, HOW IT WORKS, & LIVE TELEMETRY             */}
      {/* ========================================================================= */}
      <div
        id="cabo-intro-panel"
        className="w-full lg:w-[60%] h-full flex flex-col justify-between bg-[#0E1310] text-[#F5F4EF] p-6 sm:p-8 lg:p-10 xl:p-12 border-b lg:border-b-0 lg:border-r border-[#222E25] overflow-y-auto relative"
      >
        {/* Subtle technical background grid overlay */}
        <div className="absolute inset-0 dark-grid-pattern opacity-40 pointer-events-none" />

        <div className="relative z-10 flex flex-col space-y-8">
          {/* Top Brand & Status Ribbon */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-[#222E25]">
            <div className="flex items-center gap-3">
              <span className="font-sans font-black text-2xl tracking-tighter text-[#F5F4EF]">
                CABO
              </span>
              <span className="h-4 w-px bg-[#2C3830]" />
              <span className="font-mono text-[10px] tracking-widest text-[#E5A84B] font-bold uppercase">
                DISTRIBUTED SOLAR MRV INFRASTRUCTURE
              </span>
            </div>

            <div className="flex items-center gap-2 font-mono text-[10px] text-[#A3B3A7] bg-[#161D18] px-2.5 py-1 border border-[#243027]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
              <span>CORE dMRV ENGINE ACTIVE</span>
            </div>
          </div>

          {/* Main Headline & Supporting Copy */}
          <div className="space-y-4 pt-2">
            <h1 className="font-serif-editorial text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-normal tracking-tight text-[#F5F4EF] leading-[1.08] uppercase">
              TURNING DISTRIBUTED<br />
              SOLAR INTO<br />
              MEASURABLE<br />
              <span className="text-[#E5A84B] italic">CLIMATE IMPACT.</span>
            </h1>

            <p className="font-sans text-sm sm:text-base text-[#C4D1C7] max-w-2xl leading-relaxed font-normal">
              “CABO is a digital MRV infrastructure platform for distributed rooftop solar. It helps
              households, MSMEs and institutions measure clean-energy generation, verify the data, estimate
              emissions impact and aggregate eligible projects for carbon-market workflows.”
            </p>
          </div>

          {/* ===================================================================== */}
          {/* HOW CABO WORKS: Clean Visual Flow (5 Stages)                          */}
          {/* ===================================================================== */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[11px] uppercase tracking-wider text-[#A3B3A7] font-semibold flex items-center gap-2">
                <Layers className="w-3.5 h-3.5 text-[#E5A84B]" />
                HOW CABO WORKS
              </span>
              <span className="font-mono text-[9px] text-[#7B8C80] uppercase tracking-wider">
                END-TO-END METHODOLOGY
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 font-mono">
              {/* STAGE 1: SOLAR */}
              <div className="bg-[#141A16] border border-[#222E25] p-3 flex flex-col justify-between hover:border-[#E5A84B]/40 transition-colors">
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#E5A84B]">01. SOLAR</span>
                    <Sun className="w-3 h-3 text-[#E5A84B]/70" />
                  </div>
                  <p className="font-sans text-[11px] text-[#A3B3A7] leading-tight">
                    Rooftop solar generates clean electricity.
                  </p>
                </div>
                <div className="text-[9px] text-[#7B8C80] pt-2 flex items-center justify-between">
                  <span>PV SOURCE</span>
                  <span className="text-[#E5A84B]">→</span>
                </div>
              </div>

              {/* STAGE 2: MEASURE */}
              <div className="bg-[#141A16] border border-[#222E25] p-3 flex flex-col justify-between hover:border-[#E5A84B]/40 transition-colors">
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#E5A84B]">02. MEASURE</span>
                    <Zap className="w-3 h-3 text-[#E5A84B]/70" />
                  </div>
                  <p className="font-sans text-[11px] text-[#A3B3A7] leading-tight">
                    IoT devices or compatible energy sources capture generation data.
                  </p>
                </div>
                <div className="text-[9px] text-[#7B8C80] pt-2 flex items-center justify-between">
                  <span>TELEMETRY</span>
                  <span className="text-[#E5A84B]">→</span>
                </div>
              </div>

              {/* STAGE 3: VERIFY */}
              <div className="bg-[#141A16] border border-[#222E25] p-3 flex flex-col justify-between hover:border-[#E5A84B]/40 transition-colors">
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#E5A84B]">03. VERIFY</span>
                    <ShieldCheck className="w-3 h-3 text-[#E5A84B]/70" />
                  </div>
                  <p className="font-sans text-[11px] text-[#A3B3A7] leading-tight">
                    CABO cross-checks readings and builds auditable MRV records.
                  </p>
                </div>
                <div className="text-[9px] text-[#7B8C80] pt-2 flex items-center justify-between">
                  <span>AUDIT TRAIL</span>
                  <span className="text-[#E5A84B]">→</span>
                </div>
              </div>

              {/* STAGE 4: AGGREGATE */}
              <div className="bg-[#141A16] border border-[#222E25] p-3 flex flex-col justify-between hover:border-[#E5A84B]/40 transition-colors">
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#E5A84B]">04. AGGREGATE</span>
                    <Layers className="w-3 h-3 text-[#E5A84B]/70" />
                  </div>
                  <p className="font-sans text-[11px] text-[#A3B3A7] leading-tight">
                    Distributed installations can be combined into larger project datasets.
                  </p>
                </div>
                <div className="text-[9px] text-[#7B8C80] pt-2 flex items-center justify-between">
                  <span>DATASETS</span>
                  <span className="text-[#E5A84B]">→</span>
                </div>
              </div>

              {/* STAGE 5: MONETIZE */}
              <div className="bg-[#141A16] border border-[#222E25] p-3 flex flex-col justify-between hover:border-[#E5A84B]/40 transition-colors">
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#E5A84B]">05. MONETIZE</span>
                    <TrendingUp className="w-3 h-3 text-[#E5A84B]/70" />
                  </div>
                  <p className="font-sans text-[11px] text-[#A3B3A7] leading-tight">
                    Eligible verified projects can participate in carbon-market workflows.
                  </p>
                </div>
                <div className="text-[9px] text-[#7B8C80] pt-2 flex items-center justify-between">
                  <span>MARKET OFFTAKE</span>
                  <span className="text-[#10B981]">●</span>
                </div>
              </div>
            </div>

            <p className="font-mono text-[9px] text-[#7B8C80] leading-tight">
              *Note: CABO provides auditable dMRV telemetry datasets; credit verification and issuance follow
              official carbon registry methodologies.
            </p>
          </div>

          {/* ===================================================================== */}
          {/* TWO TECHNICAL PANELS: Live Node Telemetry + Architecture Flow         */}
          {/* ===================================================================== */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 pt-2">
            {/* LEFT-SIDE LIVE VISUAL: CABO NODE MP-0247 */}
            <div
              id="cabo-live-node-telemetry"
              className="xl:col-span-6 bg-[#131915] border border-[#222E25] p-4 font-mono relative"
            >
              <div className="flex items-center justify-between border-b border-[#222E25] pb-2.5 mb-3">
                <div className="flex items-center gap-2">
                  <Activity className="w-3.5 h-3.5 text-[#10B981]" />
                  <span className="text-xs font-bold text-white tracking-wider">
                    CABO NODE MP-0247
                  </span>
                </div>
                <span className="text-[9px] font-bold text-[#E5A84B] px-1.5 py-0.5 border border-[#E5A84B]/40 bg-[#E5A84B]/10 tracking-widest uppercase">
                  DEMO DATA
                </span>
              </div>

              <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-xs">
                <div>
                  <div className="text-[10px] text-[#7B8C80] uppercase tracking-wider">
                    SOLAR OUTPUT
                  </div>
                  <div className="text-lg font-bold text-white tabular-nums">
                    {telemetry.solarOutput.toFixed(2)}{' '}
                    <span className="text-xs font-normal text-[#E5A84B]">kW</span>
                  </div>
                </div>

                <div>
                  <div className="text-[10px] text-[#7B8C80] uppercase tracking-wider">TODAY</div>
                  <div className="text-lg font-bold text-white tabular-nums">
                    {telemetry.todayKwh.toFixed(1)}{' '}
                    <span className="text-xs font-normal text-[#A3B3A7]">kWh</span>
                  </div>
                </div>

                <div>
                  <div className="text-[10px] text-[#7B8C80] uppercase tracking-wider">
                    EST. CO₂ AVOIDED
                  </div>
                  <div className="text-base font-bold text-[#10B981] tabular-nums">
                    {telemetry.co2Avoided.toFixed(1)}{' '}
                    <span className="text-xs font-normal text-[#A3B3A7]">kg</span>
                  </div>
                </div>

                <div>
                  <div className="text-[10px] text-[#7B8C80] uppercase tracking-wider">
                    DATA STATUS
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#10B981] pt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>VERIFIED</span>
                  </div>
                </div>

                <div>
                  <div className="text-[10px] text-[#7B8C80] uppercase tracking-wider">
                    CONNECTION
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-[#F5F4EF] pt-0.5">
                    <span>CELLULAR</span>
                    <span className="inline-block w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
                  </div>
                </div>

                <div>
                  <div className="text-[10px] text-[#7B8C80] uppercase tracking-wider">
                    MRV STATUS
                  </div>
                  <div className="text-xs font-bold text-[#10B981] tracking-wider pt-0.5">
                    ACTIVE
                  </div>
                </div>
              </div>

              {/* Sub-strip footer inside telemetry block */}
              <div className="mt-3 pt-2 border-t border-[#222E25] flex items-center justify-between text-[9px] text-[#7B8C80]">
                <span>GRID: {telemetry.gridFrequency} Hz</span>
                <span>LATENCY: 42ms</span>
                <span>RSSI: -68 dBm</span>
              </div>
            </div>

            {/* SYSTEM FLOW VISUAL (Architecture Pipeline Documentation) */}
            <div
              id="cabo-system-flow"
              className="xl:col-span-6 bg-[#131915] border border-[#222E25] p-4 font-mono flex flex-col justify-between"
            >
              <div className="flex items-center justify-between border-b border-[#222E25] pb-2 mb-2.5">
                <span className="text-[10px] font-bold text-[#A3B3A7] uppercase tracking-wider">
                  SYSTEM FLOW ARCHITECTURE
                </span>
                <span className="text-[9px] text-[#7B8C80]">IEC 62053-22</span>
              </div>

              <div className="space-y-1.5 text-[11px] text-[#C4D1C7]">
                <div className="flex items-center gap-2">
                  <span className="w-4 text-center text-[#E5A84B] font-bold text-[10px]">01</span>
                  <span className="font-semibold text-white">ROOFTOP SOLAR</span>
                  <span className="text-[9px] text-[#7B8C80] ml-auto">PV Source</span>
                </div>
                <div className="text-[#7B8C80] pl-3 text-[10px] leading-none">↓</div>

                <div className="flex items-center gap-2">
                  <span className="w-4 text-center text-[#E5A84B] font-bold text-[10px]">02</span>
                  <span className="font-semibold text-white">CABO METER</span>
                  <span className="text-[9px] text-[#7B8C80] ml-auto">IoT Edge</span>
                </div>
                <div className="text-[#7B8C80] pl-3 text-[10px] leading-none">↓</div>

                <div className="flex items-center gap-2">
                  <span className="w-4 text-center text-[#E5A84B] font-bold text-[10px]">03</span>
                  <span className="font-semibold text-white">DATA VERIFICATION</span>
                  <span className="text-[9px] text-[#10B981] ml-auto">Algorithmic</span>
                </div>
                <div className="text-[#7B8C80] pl-3 text-[10px] leading-none">↓</div>

                <div className="flex items-center gap-2">
                  <span className="w-4 text-center text-[#E5A84B] font-bold text-[10px]">04</span>
                  <span className="font-semibold text-white">DIGITAL MRV</span>
                  <span className="text-[9px] text-[#7B8C80] ml-auto">Audit Ledger</span>
                </div>
                <div className="text-[#7B8C80] pl-3 text-[10px] leading-none">↓</div>

                <div className="flex items-center gap-2">
                  <span className="w-4 text-center text-[#E5A84B] font-bold text-[10px]">05</span>
                  <span className="font-semibold text-white">PROJECT AGGREGATION</span>
                  <span className="text-[9px] text-[#7B8C80] ml-auto">Decentralized</span>
                </div>
                <div className="text-[#7B8C80] pl-3 text-[10px] leading-none">↓</div>

                <div className="flex items-center gap-2">
                  <span className="w-4 text-center text-[#10B981] font-bold text-[10px]">06</span>
                  <span className="font-semibold text-[#10B981]">CARBON MARKET WORKFLOW</span>
                  <span className="text-[9px] text-[#10B981] ml-auto">Registry</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Left Technical Strip */}
        <div className="relative z-10 pt-6 mt-6 border-t border-[#222E25] flex flex-wrap items-center justify-between gap-3 font-mono text-[10px] text-[#7B8C80]">
          <div>DISCOM INTERFACE: MPPKVVCL · BESCOM · MSEDCL</div>
          <div className="flex items-center gap-4">
            <span>NODES ONLINE: 1,482</span>
            <span>CAPACITY: 8.89 MW</span>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* RIGHT SIDE — 40%: SELLER / BUYER AUTHENTICATION (QUIETER & HIGH CONTRAST) */}
      {/* ========================================================================= */}
      <div
        id="cabo-auth-panel"
        className="w-full lg:w-[40%] h-full flex flex-col justify-center bg-[#F5F4EF] text-[#1A1A1A] p-6 sm:p-8 lg:p-10 xl:p-12 overflow-y-auto"
      >
        <div className="w-full max-w-md mx-auto space-y-6">
          {/* Header Brand & Titles */}
          <div className="space-y-1.5 text-left">
            <div className="font-mono text-[11px] font-bold uppercase tracking-widest text-[#2D4F36]">
              CABO NETWORK ACCESS
            </div>
            <h2 className="text-3xl font-black tracking-tight text-[#1A1A1A] uppercase font-sans">
              WELCOME TO CABO
            </h2>
            <p className="text-xs text-[#1A1A1A]/70 font-sans">
              Choose how you want to access the network.
            </p>
          </div>

          {/* SELLER / BUYER SWITCH TABS */}
          <div
            id="auth-role-switch"
            className="grid grid-cols-2 p-1 bg-[#EBE8E1] border-2 border-[#1A1A1A] gap-1"
          >
            <button
              type="button"
              id="tab-seller"
              onClick={() => handleRoleSwitch('seller')}
              className={`py-2.5 px-3 font-mono text-xs font-bold tracking-wider uppercase transition-all flex items-center justify-center gap-2 cursor-pointer ${
                role === 'seller'
                  ? 'bg-[#1A1A1A] text-white shadow-sm'
                  : 'text-[#1A1A1A]/70 hover:text-[#1A1A1A] bg-transparent'
              }`}
            >
              <Sun className={`w-3.5 h-3.5 ${role === 'seller' ? 'text-[#E5A84B]' : ''}`} />
              <span>SELLER</span>
            </button>

            <button
              type="button"
              id="tab-buyer"
              onClick={() => handleRoleSwitch('buyer')}
              className={`py-2.5 px-3 font-mono text-xs font-bold tracking-wider uppercase transition-all flex items-center justify-center gap-2 cursor-pointer ${
                role === 'buyer'
                  ? 'bg-[#1A1A1A] text-white shadow-sm'
                  : 'text-[#1A1A1A]/70 hover:text-[#1A1A1A] bg-transparent'
              }`}
            >
              <TrendingUp className={`w-3.5 h-3.5 ${role === 'buyer' ? 'text-[#10B981]' : ''}`} />
              <span>BUYER</span>
            </button>
          </div>

          {/* Quick Demo Pre-seed Shortcuts for Easy Testing */}
          <div className="bg-[#EBE8E1]/80 border border-[#1A1A1A]/20 p-2.5 flex items-center justify-between font-mono text-[11px]">
            <div className="flex items-center gap-1.5 text-[#1A1A1A]/80 truncate">
              <KeyRound className="w-3.5 h-3.5 text-[#2D4F36] shrink-0" />
              <span className="truncate">
                Demo: {role === 'seller' ? 'seller@cabo.demo' : 'buyer@cabo.demo'}
              </span>
            </div>
            <button
              type="button"
              onClick={() => handleAutofillDemo(role)}
              className="text-[#2D4F36] hover:text-[#1A1A1A] font-bold uppercase underline shrink-0 cursor-pointer ml-2"
            >
              AUTO-FILL
            </button>
          </div>

          {/* Error Banner */}
          {errorMessage && (
            <div className="p-3 bg-red-50 border-2 border-red-600 text-red-800 font-mono text-xs flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <div className="flex-1 leading-snug">
                <span className="font-bold block uppercase">AUTHENTICATION NOTICE</span>
                <span>{errorMessage}</span>
              </div>
            </div>
          )}

          {/* Google Notice */}
          {googleNotice && (
            <div className="p-3 bg-[#E5A84B]/15 border-2 border-[#E5A84B] text-[#1A1A1A] font-mono text-xs flex items-start gap-2">
              <Sparkles className="w-4 h-4 text-[#C88C32] shrink-0 mt-0.5" />
              <div className="flex-1 leading-snug">
                <span className="font-bold block uppercase text-[#C88C32]">GOOGLE SIGN-IN NOTICE</span>
                <span>{googleNotice}</span>
              </div>
            </div>
          )}

          {/* =================================================================== */}
          {/* MODE: LOGIN (Default)                                               */}
          {/* =================================================================== */}
          {mode === 'login' && (
            <form onSubmit={handleLoginSubmit} className="space-y-4 text-left">
              {/* Context Label & Description */}
              <div className="border-l-2 border-[#2D4F36] pl-3 py-0.5">
                <div className="font-mono text-xs font-bold uppercase tracking-wider text-[#2D4F36]">
                  {role === 'seller' ? 'SELLER ACCESS' : 'BUYER ACCESS'}
                </div>
                <div className="text-xs text-[#1A1A1A]/70 font-sans mt-0.5">
                  {role === 'seller'
                    ? 'For solar owners, households, MSMEs and participating institutions.'
                    : 'For organizations exploring verified carbon projects and procurement opportunities.'}
                </div>
              </div>

              {/* Email Address */}
              <div className="space-y-1.5">
                <label
                  htmlFor="login-email"
                  className="block font-mono text-[11px] uppercase tracking-wider font-bold text-[#1A1A1A]"
                >
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#1A1A1A]/40">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    id="login-email"
                    type="email"
                    value={loginEmail}
                    onChange={(e) => {
                      setLoginEmail(e.target.value);
                      if (fieldErrors.email) {
                        setFieldErrors((prev) => ({ ...prev, email: '' }));
                      }
                    }}
                    placeholder={role === 'seller' ? 'seller@cabo.demo' : 'buyer@cabo.demo'}
                    className={`w-full pl-9 pr-3 py-2.5 bg-white border-2 text-sm text-[#1A1A1A] font-mono placeholder:text-[#1A1A1A]/30 focus:outline-none transition-colors ${
                      fieldErrors.email
                        ? 'border-red-600 focus:border-red-600'
                        : 'border-[#1A1A1A] focus:border-[#2D4F36] focus:ring-1 focus:ring-[#2D4F36]'
                    }`}
                  />
                </div>
                {fieldErrors.email && (
                  <p className="font-mono text-[10px] text-red-600 font-bold">{fieldErrors.email}</p>
                )}
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <label
                  htmlFor="login-password"
                  className="block font-mono text-[11px] uppercase tracking-wider font-bold text-[#1A1A1A]"
                >
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#1A1A1A]/40">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    id="login-password"
                    type={showLoginPassword ? 'text' : 'password'}
                    value={loginPassword}
                    onChange={(e) => {
                      setLoginPassword(e.target.value);
                      if (fieldErrors.password) {
                        setFieldErrors((prev) => ({ ...prev, password: '' }));
                      }
                    }}
                    placeholder="••••••••"
                    className={`w-full pl-9 pr-10 py-2.5 bg-white border-2 text-sm text-[#1A1A1A] font-mono placeholder:text-[#1A1A1A]/30 focus:outline-none transition-colors ${
                      fieldErrors.password
                        ? 'border-red-600 focus:border-red-600'
                        : 'border-[#1A1A1A] focus:border-[#2D4F36] focus:ring-1 focus:ring-[#2D4F36]'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowLoginPassword(!showLoginPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#1A1A1A]/50 hover:text-[#1A1A1A] cursor-pointer"
                  >
                    {showLoginPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {fieldErrors.password && (
                  <p className="font-mono text-[10px] text-red-600 font-bold">
                    {fieldErrors.password}
                  </p>
                )}
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded-none border-2 border-[#1A1A1A] text-[#2D4F36] focus:ring-0 cursor-pointer"
                  />
                  <span className="font-mono text-[11px] text-[#1A1A1A]/80">Remember me</span>
                </label>

                <button
                  type="button"
                  onClick={() => setForgotModalOpen(true)}
                  className="font-mono text-[11px] text-[#2D4F36] hover:text-[#1A1A1A] underline uppercase font-bold cursor-pointer"
                >
                  Forgot password?
                </button>
              </div>

              {/* Primary Login Button */}
              <button
                type="submit"
                id={`btn-login-${role}`}
                disabled={loading}
                className="w-full py-3 bg-[#1A1A1A] text-white font-mono text-xs font-bold tracking-widest uppercase hover:bg-[#2D4F36] active:translate-y-0.5 transition-all shadow-[4px_4px_0px_0px_#2D4F36] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>AUTHENTICATING...</span>
                  </>
                ) : (
                  <>
                    <span>{role === 'seller' ? 'LOGIN AS SELLER' : 'LOGIN AS BUYER'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>

              {/* In-place Sign Up Switch */}
              <div className="text-center pt-2 font-mono text-xs text-[#1A1A1A]/80">
                <span>Don’t have an account? </span>
                <button
                  type="button"
                  id={`btn-switch-register-${role}`}
                  onClick={() => handleModeSwitch('register')}
                  className="font-bold text-[#2D4F36] hover:text-[#1A1A1A] underline uppercase cursor-pointer ml-1"
                >
                  {role === 'seller' ? 'CREATE SELLER ACCOUNT' : 'CREATE BUYER ACCOUNT'}
                </button>
              </div>

              {/* Divider */}
              <div className="relative flex items-center justify-center py-2">
                <div className="w-full border-t border-[#1A1A1A]/20" />
                <span className="bg-[#F5F4EF] px-3 font-mono text-[10px] text-[#1A1A1A]/50 tracking-widest uppercase">
                  OR
                </span>
              </div>

              {/* Google Sign-in */}
              <button
                type="button"
                id="btn-google-auth-login"
                onClick={handleGoogleAuthClick}
                className="w-full py-2.5 bg-white border-2 border-[#1A1A1A] text-[#1A1A1A] font-mono text-xs font-bold uppercase hover:bg-[#EBE8E1] transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17Z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.34 24 12 24Z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.98 0 12s.45 3.82 1.25 5.42l4.03-3.15Z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98Z"
                  />
                </svg>
                <span>CONTINUE WITH GOOGLE</span>
              </button>
            </form>
          )}

          {/* =================================================================== */}
          {/* MODE: SIGN UP (In-Place, Left 60% stays visible)                    */}
          {/* =================================================================== */}
          {mode === 'register' && (
            <form onSubmit={handleRegisterSubmit} className="space-y-3.5 text-left">
              {/* Context Label & Description */}
              <div className="border-l-2 border-[#2D4F36] pl-3 py-0.5">
                <div className="font-mono text-xs font-bold uppercase tracking-wider text-[#2D4F36]">
                  {role === 'seller' ? 'CREATE SELLER ACCOUNT' : 'CREATE BUYER ACCOUNT'}
                </div>
                <div className="text-xs text-[#1A1A1A]/70 font-sans mt-0.5">
                  {role === 'seller'
                    ? 'For solar owners, households, MSMEs and participating institutions.'
                    : 'For organizations exploring verified carbon projects and procurement opportunities.'}
                </div>
              </div>

              {/* Full Name */}
              <div className="space-y-1">
                <label
                  htmlFor="register-fullname"
                  className="block font-mono text-[11px] uppercase tracking-wider font-bold text-[#1A1A1A]"
                >
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#1A1A1A]/40">
                    <UserIcon className="w-4 h-4" />
                  </div>
                  <input
                    id="register-fullname"
                    type="text"
                    value={fullName}
                    onChange={(e) => {
                      setFullName(e.target.value);
                      if (fieldErrors.fullName) {
                        setFieldErrors((prev) => ({ ...prev, fullName: '' }));
                      }
                    }}
                    placeholder="e.g. Rajesh Sharma"
                    className={`w-full pl-9 pr-3 py-2 bg-white border-2 text-sm text-[#1A1A1A] font-sans placeholder:text-[#1A1A1A]/30 focus:outline-none transition-colors ${
                      fieldErrors.fullName
                        ? 'border-red-600 focus:border-red-600'
                        : 'border-[#1A1A1A] focus:border-[#2D4F36] focus:ring-1 focus:ring-[#2D4F36]'
                    }`}
                  />
                </div>
                {fieldErrors.fullName && (
                  <p className="font-mono text-[10px] text-red-600 font-bold">{fieldErrors.fullName}</p>
                )}
              </div>

              {/* Company / Organization (Buyer Only) */}
              {role === 'buyer' && (
                <div className="space-y-1">
                  <label
                    htmlFor="register-company"
                    className="block font-mono text-[11px] uppercase tracking-wider font-bold text-[#1A1A1A]"
                  >
                    Company / Organization
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#1A1A1A]/40">
                      <Building2 className="w-4 h-4" />
                    </div>
                    <input
                      id="register-company"
                      type="text"
                      value={companyName}
                      onChange={(e) => {
                        setCompanyName(e.target.value);
                        if (fieldErrors.companyName) {
                          setFieldErrors((prev) => ({ ...prev, companyName: '' }));
                        }
                      }}
                      placeholder="e.g. Tata Cleantech ESG Desk"
                      className={`w-full pl-9 pr-3 py-2 bg-white border-2 text-sm text-[#1A1A1A] font-sans placeholder:text-[#1A1A1A]/30 focus:outline-none transition-colors ${
                        fieldErrors.companyName
                          ? 'border-red-600 focus:border-red-600'
                          : 'border-[#1A1A1A] focus:border-[#2D4F36] focus:ring-1 focus:ring-[#2D4F36]'
                      }`}
                    />
                  </div>
                  {fieldErrors.companyName && (
                    <p className="font-mono text-[10px] text-red-600 font-bold">
                      {fieldErrors.companyName}
                    </p>
                  )}
                </div>
              )}

              {/* Email Address */}
              <div className="space-y-1">
                <label
                  htmlFor="register-email"
                  className="block font-mono text-[11px] uppercase tracking-wider font-bold text-[#1A1A1A]"
                >
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#1A1A1A]/40">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    id="register-email"
                    type="email"
                    value={registerEmail}
                    onChange={(e) => {
                      setRegisterEmail(e.target.value);
                      if (fieldErrors.email) {
                        setFieldErrors((prev) => ({ ...prev, email: '' }));
                      }
                    }}
                    placeholder="user@example.com"
                    className={`w-full pl-9 pr-3 py-2 bg-white border-2 text-sm text-[#1A1A1A] font-mono placeholder:text-[#1A1A1A]/30 focus:outline-none transition-colors ${
                      fieldErrors.email
                        ? 'border-red-600 focus:border-red-600'
                        : 'border-[#1A1A1A] focus:border-[#2D4F36] focus:ring-1 focus:ring-[#2D4F36]'
                    }`}
                  />
                </div>
                {fieldErrors.email && (
                  <p className="font-mono text-[10px] text-red-600 font-bold">{fieldErrors.email}</p>
                )}
              </div>

              {/* Contact Number */}
              <div className="space-y-1">
                <label
                  htmlFor="register-phone"
                  className="block font-mono text-[11px] uppercase tracking-wider font-bold text-[#1A1A1A]"
                >
                  Contact Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#1A1A1A]/40">
                    <Phone className="w-4 h-4" />
                  </div>
                  <input
                    id="register-phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      if (fieldErrors.phone) {
                        setFieldErrors((prev) => ({ ...prev, phone: '' }));
                      }
                    }}
                    placeholder="+91 98765 43210"
                    className={`w-full pl-9 pr-3 py-2 bg-white border-2 text-sm text-[#1A1A1A] font-mono placeholder:text-[#1A1A1A]/30 focus:outline-none transition-colors ${
                      fieldErrors.phone
                        ? 'border-red-600 focus:border-red-600'
                        : 'border-[#1A1A1A] focus:border-[#2D4F36] focus:ring-1 focus:ring-[#2D4F36]'
                    }`}
                  />
                </div>
                {fieldErrors.phone && (
                  <p className="font-mono text-[10px] text-red-600 font-bold">{fieldErrors.phone}</p>
                )}
              </div>

              {/* Password & Confirm Password in 2 Columns */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label
                    htmlFor="register-password"
                    className="block font-mono text-[11px] uppercase tracking-wider font-bold text-[#1A1A1A]"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="register-password"
                      type={showRegisterPassword ? 'text' : 'password'}
                      value={registerPassword}
                      onChange={(e) => {
                        setRegisterPassword(e.target.value);
                        if (fieldErrors.password) {
                          setFieldErrors((prev) => ({ ...prev, password: '' }));
                        }
                      }}
                      placeholder="Min. 6 chars"
                      className={`w-full px-3 pr-8 py-2 bg-white border-2 text-sm text-[#1A1A1A] font-mono placeholder:text-[#1A1A1A]/30 focus:outline-none transition-colors ${
                        fieldErrors.password
                          ? 'border-red-600 focus:border-red-600'
                          : 'border-[#1A1A1A] focus:border-[#2D4F36] focus:ring-1 focus:ring-[#2D4F36]'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowRegisterPassword(!showRegisterPassword)}
                      className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-[#1A1A1A]/50 hover:text-[#1A1A1A] cursor-pointer"
                    >
                      {showRegisterPassword ? (
                        <EyeOff className="w-3.5 h-3.5" />
                      ) : (
                        <Eye className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                  {fieldErrors.password && (
                    <p className="font-mono text-[10px] text-red-600 font-bold">
                      {fieldErrors.password}
                    </p>
                  )}
                </div>

                <div className="space-y-1">
                  <label
                    htmlFor="register-confirm-password"
                    className="block font-mono text-[11px] uppercase tracking-wider font-bold text-[#1A1A1A]"
                  >
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      id="register-confirm-password"
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => {
                        setConfirmPassword(e.target.value);
                        if (fieldErrors.confirmPassword) {
                          setFieldErrors((prev) => ({ ...prev, confirmPassword: '' }));
                        }
                      }}
                      placeholder="Repeat password"
                      className={`w-full px-3 pr-8 py-2 bg-white border-2 text-sm text-[#1A1A1A] font-mono placeholder:text-[#1A1A1A]/30 focus:outline-none transition-colors ${
                        fieldErrors.confirmPassword
                          ? 'border-red-600 focus:border-red-600'
                          : 'border-[#1A1A1A] focus:border-[#2D4F36] focus:ring-1 focus:ring-[#2D4F36]'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-[#1A1A1A]/50 hover:text-[#1A1A1A] cursor-pointer"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="w-3.5 h-3.5" />
                      ) : (
                        <Eye className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                  {fieldErrors.confirmPassword && (
                    <p className="font-mono text-[10px] text-red-600 font-bold">
                      {fieldErrors.confirmPassword}
                    </p>
                  )}
                </div>
              </div>

              {/* Primary Register Button */}
              <button
                type="submit"
                id={`btn-register-submit-${role}`}
                disabled={loading}
                className="w-full py-3 bg-[#1A1A1A] text-white font-mono text-xs font-bold tracking-widest uppercase hover:bg-[#2D4F36] active:translate-y-0.5 transition-all shadow-[4px_4px_0px_0px_#2D4F36] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed mt-2"
              >
                {loading ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>CREATING ACCOUNT...</span>
                  </>
                ) : (
                  <>
                    <span>
                      {role === 'seller' ? 'CREATE SELLER ACCOUNT' : 'CREATE BUYER ACCOUNT'}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>

              {/* Back to Login Switch */}
              <div className="text-center pt-2 font-mono text-xs text-[#1A1A1A]/80">
                <span>Already registered? </span>
                <button
                  type="button"
                  id="btn-back-to-login"
                  onClick={() => handleModeSwitch('login')}
                  className="font-bold text-[#2D4F36] hover:text-[#1A1A1A] underline uppercase cursor-pointer ml-1"
                >
                  LOGIN
                </button>
              </div>

              {/* Divider */}
              <div className="relative flex items-center justify-center py-1">
                <div className="w-full border-t border-[#1A1A1A]/20" />
                <span className="bg-[#F5F4EF] px-3 font-mono text-[10px] text-[#1A1A1A]/50 tracking-widest uppercase">
                  OR
                </span>
              </div>

              {/* Google Sign-in */}
              <button
                type="button"
                id="btn-google-auth-register"
                onClick={handleGoogleAuthClick}
                className="w-full py-2.5 bg-white border-2 border-[#1A1A1A] text-[#1A1A1A] font-mono text-xs font-bold uppercase hover:bg-[#EBE8E1] transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17Z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.34 24 12 24Z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.98 0 12s.45 3.82 1.25 5.42l4.03-3.15Z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98Z"
                  />
                </svg>
                <span>CONTINUE WITH GOOGLE</span>
              </button>
            </form>
          )}

          {/* Discreet footer on right panel */}
          <div className="pt-4 text-center font-mono text-[10px] text-[#1A1A1A]/50">
            <span>SECURE AES-256 SESSION PERSISTENCE · CABO MRV v2.4</span>
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      <ForgotPasswordModal
        isOpen={forgotModalOpen}
        onClose={() => setForgotModalOpen(false)}
      />

      {/* Google Sign-in Modal */}
      <GoogleAuthModal
        role={role}
        isOpen={googleModalOpen}
        onClose={() => setGoogleModalOpen(false)}
        onSuccess={(user) => {
          setGoogleModalOpen(false);
          onLogin(user);
        }}
      />
    </div>
  );
};

import React, { useState } from 'react';
import {
  User,
  ShieldCheck,
  Building2,
  Lock,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Sparkles,
  Zap,
  Banknote,
  Home,
  LogOut,
  ChevronRight
} from 'lucide-react';
import { DEMO_PROFILES, UserProfile } from '../types/auth';

interface LoginPageProps {
  currentUser: UserProfile | null;
  onLogin: (profile: UserProfile) => void;
  onLogout: () => void;
  onNavigateToMonitor: () => void;
  onNavigateToProcess: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({
  currentUser,
  onLogin,
  onLogout,
  onNavigateToMonitor,
  onNavigateToProcess,
}) => {
  const [activeTab, setActiveTab] = useState<'demo' | 'email'>('demo');
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [authSuccess, setAuthSuccess] = useState(false);

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput) return;

    // Construct profile from input or pick default
    const customUser: UserProfile = {
      id: `usr_${Date.now()}`,
      name: emailInput.split('@')[0].toUpperCase(),
      email: emailInput,
      role: 'rooftop_host',
      roleLabel: 'Verified Solar Host',
      avatarInitials: emailInput.slice(0, 2).toUpperCase(),
      city: 'Indore, Madhya Pradesh',
      nodeId: 'CABO-MP-0247',
      systemCapacityKw: 6.0,
      walletBalanceInr: 3880,
      totalEarningsInr: 18450,
      verifiedCreditsAccrued: 0.485,
      discomZone: 'MPPKVVCL (West Discom)',
      bio: 'Rooftop solar generator authenticated via local silicon hardware token.',
    };

    onLogin(customUser);
    setAuthSuccess(true);
    setTimeout(() => setAuthSuccess(false), 3000);
  };

  return (
    <div className="bg-[#F5F2ED] text-[#1F2421] min-h-[calc(100vh-140px)] py-10 sm:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Editorial Eyebrow & Headline */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#2B4736]/10 text-[#2B4736] font-mono text-[11px] font-bold uppercase tracking-widest mb-3 border border-[#2B4736]/20">
            <ShieldCheck className="w-3.5 h-3.5 text-[#C86D3B]" />
            <span>NON-CUSTODIAL GATEWAY ACCESS</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#1F2421] tracking-tight leading-tight">
            Sign In to the CABO Gateway
          </h1>
          <p className="mt-3 text-sm sm:text-base text-[#555047] font-sans leading-relaxed">
            One open infrastructure for rooftop solar hosts, institutional carbon buyers, and DISCOM grid auditors. We never buy or speculate on credits — 96% of credit revenue routes straight to host bank accounts.
          </p>
        </div>

        {/* If User Is Already Logged In: Show Active Account Dashboard */}
        {currentUser ? (
          <div className="bg-[#FAF8F5] border-2 border-[#1F2421] p-6 sm:p-8 shadow-sm">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[#D8D0C5]">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-[#2B4736] text-white flex items-center justify-center font-mono font-bold text-xl border-2 border-[#1F2421]">
                  {currentUser.avatarInitials}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-bold font-serif text-[#1F2421]">
                      {currentUser.name}
                    </h2>
                    <span className="px-2 py-0.5 bg-[#2B4736] text-white font-mono text-[10px] font-bold uppercase">
                      ACTIVE SESSION
                    </span>
                  </div>
                  <p className="text-xs font-mono text-[#706B63] mt-0.5">
                    {currentUser.roleLabel} · {currentUser.email}
                  </p>
                  <p className="text-xs text-[#555047] font-sans mt-1">
                    {currentUser.city} {currentUser.nodeId ? `(Node: ${currentUser.nodeId})` : ''}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 font-mono text-xs w-full sm:w-auto">
                <button
                  type="button"
                  onClick={onLogout}
                  className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-3.5 py-2 border border-[#1F2421] bg-white hover:bg-[#1F2421] hover:text-white transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>SIGN OUT</span>
                </button>
              </div>
            </div>

            {/* Quick Stats Row for Authenticated User */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-6 font-mono">
              <div className="p-4 bg-white border border-[#D8D0C5]">
                <span className="text-[10px] uppercase text-[#706B63] font-bold block mb-1">
                  CURRENT WALLET BALANCE (UNPAID)
                </span>
                <div className="text-2xl font-black text-[#2B4736]">
                  ₹{currentUser.walletBalanceInr?.toLocaleString() || '0'}
                </div>
                <span className="text-[10px] text-[#706B63]">Direct UPI on Monday</span>
              </div>

              <div className="p-4 bg-white border border-[#D8D0C5]">
                <span className="text-[10px] uppercase text-[#706B63] font-bold block mb-1">
                  LIFETIME REVENUE SETTLED
                </span>
                <div className="text-2xl font-black text-[#1F2421]">
                  ₹{currentUser.totalEarningsInr?.toLocaleString() || '0'}
                </div>
                <span className="text-[10px] text-[#2B4736] font-bold">96% Net to Host</span>
              </div>

              <div className="p-4 bg-white border border-[#D8D0C5]">
                <span className="text-[10px] uppercase text-[#706B63] font-bold block mb-1">
                  VERIFIED CARBON ASSETS
                </span>
                <div className="text-2xl font-black text-[#C86D3B]">
                  {currentUser.verifiedCreditsAccrued?.toFixed(3) || '0.000'} <span className="text-xs font-normal">tCO₂e</span>
                </div>
                <span className="text-[10px] text-[#706B63]">ATECC608A Silicon Signed</span>
              </div>
            </div>

            {/* Navigation Shortcuts */}
            <div className="pt-4 border-t border-[#D8D0C5] flex flex-wrap gap-3 font-mono text-xs">
              <button
                type="button"
                onClick={onNavigateToMonitor}
                className="flex items-center gap-2 px-4 py-2.5 bg-[#1F2421] text-white hover:bg-black transition-colors font-bold"
              >
                <span>OPEN LIVE TELEMETRY DASHBOARD →</span>
              </button>
              <button
                type="button"
                onClick={onNavigateToProcess}
                className="flex items-center gap-2 px-4 py-2.5 bg-[#2B4736] text-white hover:bg-[#355742] transition-colors font-bold"
              >
                <span>HOW IT WORKS (7 STAGES) →</span>
              </button>
            </div>
          </div>
        ) : (
          /* Login Card with Tabs */
          <div className="bg-[#FAF8F5] border-2 border-[#1F2421] shadow-sm overflow-hidden">
            {/* Tab Selection */}
            <div className="flex border-b-2 border-[#1F2421] bg-[#EFEAE1] font-mono text-xs font-bold">
              <button
                type="button"
                onClick={() => setActiveTab('demo')}
                className={`flex-1 py-3 px-4 text-center transition-colors uppercase tracking-wider ${
                  activeTab === 'demo'
                    ? 'bg-[#FAF8F5] text-[#1F2421] border-b-2 border-[#2B4736]'
                    : 'text-[#706B63] hover:text-[#1F2421]'
                }`}
              >
                01 / Quick-Auth Profiles (Instant Trial)
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('email')}
                className={`flex-1 py-3 px-4 text-center transition-colors uppercase tracking-wider border-l border-[#D8D0C5] ${
                  activeTab === 'email'
                    ? 'bg-[#FAF8F5] text-[#1F2421] border-b-2 border-[#2B4736]'
                    : 'text-[#706B63] hover:text-[#1F2421]'
                }`}
              >
                02 / Email & Password Login
              </button>
            </div>

            {/* Content Tab 1: Instant Demo Profiles */}
            {activeTab === 'demo' && (
              <div className="p-6 sm:p-8 space-y-6">
                <div>
                  <h3 className="text-lg font-serif font-bold text-[#1F2421]">
                    Select a Sandbox Role to Sign In Instantly:
                  </h3>
                  <p className="text-xs text-[#555047] font-sans mt-0.5">
                    Click any role below to test the platform as an active solar generator, corporate buyer, or DISCOM inspector.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.values(DEMO_PROFILES).map((profile) => (
                    <div
                      key={profile.id}
                      onClick={() => onLogin(profile)}
                      className="group cursor-pointer p-4 bg-white border border-[#D8D0C5] hover:border-[#1F2421] hover:bg-[#F2ECE1] transition-all flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 bg-[#2B4736]/10 text-[#2B4736]">
                            {profile.roleLabel}
                          </span>
                          <div className="w-6 h-6 bg-[#1F2421] text-white flex items-center justify-center font-mono text-xs font-bold">
                            {profile.avatarInitials}
                          </div>
                        </div>
                        <h4 className="text-base font-bold font-serif text-[#1F2421] group-hover:text-[#2B4736]">
                          {profile.name}
                        </h4>
                        <p className="text-xs text-[#555047] font-sans mt-1 line-clamp-2">
                          {profile.bio}
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-[#EFEAE1] flex items-center justify-between font-mono text-[11px]">
                        <span className="text-[#706B63]">{profile.city}</span>
                        <span className="font-bold text-[#2B4736] flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                          <span>SIGN IN</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Content Tab 2: Manual Credentials */}
            {activeTab === 'email' && (
              <div className="p-6 sm:p-8">
                <form onSubmit={handleCustomSubmit} className="max-w-md mx-auto space-y-4">
                  <div>
                    <label className="block text-xs font-mono font-bold uppercase text-[#1F2421] mb-1">
                      Registered Email or Solar Consumer No. (MPPKVVCL / MPMKVVCL)
                    </label>
                    <input
                      type="email"
                      required
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      placeholder="e.g. rajesh.sharma@indoresolar.in"
                      className="w-full text-xs font-mono bg-white border border-[#D8D0C5] p-3 focus:outline-none focus:border-[#1F2421]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-bold uppercase text-[#1F2421] mb-1">
                      Password or Hardware Token PIN
                    </label>
                    <input
                      type="password"
                      required
                      value={passwordInput}
                      onChange={(e) => setPasswordInput(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full text-xs font-mono bg-white border border-[#D8D0C5] p-3 focus:outline-none focus:border-[#1F2421]"
                    />
                  </div>

                  <div className="flex items-center justify-between text-xs font-sans text-[#706B63] pt-1">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" defaultChecked className="accent-[#2B4736]" />
                      <span>Remember hardware device</span>
                    </label>
                    <a href="#forgot" className="text-[#2B4736] hover:underline">
                      Forgot PIN?
                    </a>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-[#1F2421] hover:bg-black text-white font-mono font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
                  >
                    <Lock className="w-3.5 h-3.5" />
                    <span>AUTHENTICATE & ENTER PORTAL</span>
                  </button>
                </form>
              </div>
            )}

            {/* Gateway Guarantee Banner at bottom of Login */}
            <div className="bg-[#EFEAE1] p-4 border-t border-[#D8D0C5] text-xs font-mono text-[#555047] flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="flex items-center gap-2 text-[#2B4736] font-bold">
                <ShieldCheck className="w-4 h-4" />
                <span>Zero Custody: You retain 100% legal ownership of your generation data</span>
              </span>
              <span className="text-[10px] uppercase text-[#706B63]">
                4% CLEARING FEE · 96% HOST PAYOUT
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

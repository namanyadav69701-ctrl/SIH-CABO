import React, { useState, useRef, useEffect } from 'react';
import {
  Activity,
  ShieldCheck,
  Terminal,
  Menu,
  X,
  ArrowUpRight,
  Cpu,
  User,
  LogIn,
  ChevronDown,
  LayoutDashboard,
  LogOut,
  UserCheck,
  Sun,
  Building2,
} from 'lucide-react';
import { User as UserType } from '../types/auth';

interface HeaderProps {
  onOpenTerminal?: () => void;
  currentPage?: 'monitor' | 'process' | 'login' | 'seller_dashboard' | 'buyer_dashboard';
  onSelectPage?: (page: 'monitor' | 'process' | 'login' | 'seller_dashboard' | 'buyer_dashboard') => void;
  currentUser?: UserType | null;
  onLogout?: () => void;
  onOpenProfile?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenTerminal,
  currentPage = 'monitor',
  onSelectPage,
  currentUser,
  onLogout,
  onOpenProfile,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setUserDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const firstName = currentUser ? currentUser.fullName.trim().split(' ')[0].toUpperCase() : '';

  const handleDashboardClick = () => {
    setUserDropdownOpen(false);
    if (!currentUser) {
      onSelectPage?.('login');
      return;
    }
    if (currentUser.role === 'seller') {
      onSelectPage?.('seller_dashboard');
    } else {
      onSelectPage?.('buyer_dashboard');
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#F5F2ED]/95 backdrop-blur-md border-b border-[#1A1A1A]/20">
      {/* Top Status Bar for SIH & Regulatory Review */}
      <div className="bg-[#1A1A1A] text-[#F5F4EF] px-4 py-1.5 text-[10px] font-mono uppercase tracking-widest flex flex-wrap items-center justify-between border-b border-[#1A1A1A]">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-[#00FF00]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00FF00] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00FF00]"></span>
            </span>
            <span>PILOT TELEMETRY ACTIVE</span>
          </span>
          <span className="text-[#1A1A1A]/40 hidden sm:inline">|</span>
          <span className="text-[#F5F2ED]/70 hidden sm:inline">
            CENTRAL REGION: MADHYA PRADESH · 247 NODES ONLINE
          </span>
        </div>
        <div className="flex items-center gap-4 text-[#F5F2ED]/70">
          <span className="hidden md:inline">CEA BASELINE: 0.716 kg CO₂/kWh</span>
          <span className="text-[#C88C32] font-bold">[ PILOT VERIFIED ]</span>
        </div>
      </div>

      {/* Main Header Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo & Tagline */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => onSelectPage?.('monitor')}
              className="flex items-center gap-2 text-left focus:outline-none group"
            >
              <div className="w-8 h-8 bg-[#2D4F36] text-white flex items-center justify-center font-mono font-black text-base border border-[#1A1A1A] group-hover:bg-[#1A1A1A] transition-colors">
                C
              </div>
              <div className="flex flex-col">
                <span className="font-mono font-black text-lg tracking-wider text-[#1A1A1A] leading-tight">
                  CABO
                </span>
                <span className="font-mono text-[9px] uppercase tracking-widest text-[#1A1A1A]/60">
                  DISTRIBUTED MRV
                </span>
              </div>
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2 font-mono text-xs">
            {currentUser?.role === 'seller' ? (
              <>
                {/* 1. SELLER DASHBOARD FIRST */}
                <button
                  type="button"
                  id="nav-seller-dashboard"
                  onClick={() => onSelectPage?.('seller_dashboard')}
                  className={`flex items-center gap-2 px-3 py-2 transition-all font-bold ${
                    currentPage === 'seller_dashboard'
                      ? 'bg-[#1A1A1A] text-white border-b-2 border-[#00FF00]'
                      : 'bg-white/80 text-[#1A1A1A]/70 hover:text-[#1A1A1A] hover:bg-white border border-[#1A1A1A]/20'
                  }`}
                >
                  <span className={`w-2 h-2 ${currentPage === 'seller_dashboard' ? 'bg-[#00FF00]' : 'bg-[#1A1A1A]/40'}`}></span>
                  <span>01 / DASHBOARD</span>
                </button>

                {/* 2. LIVE MONITOR SECOND */}
                <button
                  type="button"
                  id="nav-seller-monitor"
                  onClick={() => onSelectPage?.('monitor')}
                  className={`flex items-center gap-2 px-3 py-2 transition-all font-bold ${
                    currentPage === 'monitor'
                      ? 'bg-[#1A1A1A] text-white border-b-2 border-[#00FF00]'
                      : 'bg-white/80 text-[#1A1A1A]/70 hover:text-[#1A1A1A] hover:bg-white border border-[#1A1A1A]/20'
                  }`}
                >
                  <span className="relative flex h-2 w-2">
                    {currentPage === 'monitor' && (
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00FF00] opacity-75"></span>
                    )}
                    <span className={`relative inline-flex rounded-full h-2 w-2 ${currentPage === 'monitor' ? 'bg-[#00FF00]' : 'bg-[#1A1A1A]/40'}`}></span>
                  </span>
                  <span>02 / LIVE MONITOR</span>
                </button>

                {/* 3. HOW IT WORKS */}
                <button
                  type="button"
                  onClick={() => onSelectPage?.('process')}
                  className={`flex items-center gap-2 px-3 py-2 transition-all font-bold ${
                    currentPage === 'process'
                      ? 'bg-[#2D4F36] text-white border-b-2 border-[#E5A84B]'
                      : 'bg-white/80 text-[#1A1A1A]/70 hover:text-[#1A1A1A] hover:bg-white border border-[#1A1A1A]/20'
                  }`}
                >
                  <span className={`w-2 h-2 ${currentPage === 'process' ? 'bg-[#E5A84B]' : 'bg-[#1A1A1A]/40'}`}></span>
                  <span>03 / HOW IT WORKS</span>
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => onSelectPage?.('monitor')}
                  className={`flex items-center gap-2 px-3 py-2 transition-all font-bold ${
                    currentPage === 'monitor'
                      ? 'bg-[#1A1A1A] text-white border-b-2 border-[#00FF00]'
                      : 'bg-white/80 text-[#1A1A1A]/70 hover:text-[#1A1A1A] hover:bg-white border border-[#1A1A1A]/20'
                  }`}
                >
                  <span className="relative flex h-2 w-2">
                    {currentPage === 'monitor' && (
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00FF00] opacity-75"></span>
                    )}
                    <span className={`relative inline-flex rounded-full h-2 w-2 ${currentPage === 'monitor' ? 'bg-[#00FF00]' : 'bg-[#1A1A1A]/40'}`}></span>
                  </span>
                  <span>01 / LIVE MONITOR</span>
                </button>

                <button
                  type="button"
                  onClick={() => onSelectPage?.('process')}
                  className={`flex items-center gap-2 px-3 py-2 transition-all font-bold ${
                    currentPage === 'process'
                      ? 'bg-[#2D4F36] text-white border-b-2 border-[#E5A84B]'
                      : 'bg-white/80 text-[#1A1A1A]/70 hover:text-[#1A1A1A] hover:bg-white border border-[#1A1A1A]/20'
                  }`}
                >
                  <span className={`w-2 h-2 ${currentPage === 'process' ? 'bg-[#E5A84B]' : 'bg-[#1A1A1A]/40'}`}></span>
                  <span>02 / HOW IT WORKS</span>
                </button>
              </>
            )}

            {/* AUTH BUTTON / USER ACCOUNT MENU */}
            {!currentUser ? (
              <button
                type="button"
                onClick={() => onSelectPage?.('login')}
                className={`flex items-center gap-2 px-3.5 py-2 transition-all font-bold ${
                  currentPage === 'login'
                    ? 'bg-[#2B4736] text-white border-b-2 border-[#E5A84B]'
                    : 'bg-white/80 text-[#1A1A1A]/70 hover:text-[#1A1A1A] hover:bg-white border border-[#1A1A1A]/20'
                }`}
              >
                <LogIn className="w-3.5 h-3.5 text-[#2B4736]" />
                <span>LOGIN</span>
              </button>
            ) : (
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className={`flex items-center gap-2 px-3 py-2 transition-all font-bold ${
                    currentPage === 'seller_dashboard' || currentPage === 'buyer_dashboard'
                      ? 'bg-[#1A1A1A] text-white border-b-2 border-[#00FF00]'
                      : 'bg-white text-[#1A1A1A] border border-[#1A1A1A]/30 hover:bg-[#F5F4EF]'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${currentUser.role === 'seller' ? 'bg-[#E5A84B]' : 'bg-[#00FF00]'}`}></span>
                  <span>{firstName} ▼</span>
                </button>

                {/* Dropdown Menu */}
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-1 w-64 bg-white border-2 border-[#1A1A1A] shadow-[4px_4px_0px_0px_#1A1A1A] z-50 p-2 font-mono text-xs">
                    {/* User header info */}
                    <div className="p-2.5 bg-[#F5F4EF] border-b border-[#1A1A1A]/10 mb-1">
                      <div className="font-bold text-[#1A1A1A] truncate">{currentUser.fullName}</div>
                      <div className="text-[10px] text-[#1A1A1A]/60 truncate">{currentUser.email}</div>
                      
                      {/* Account Type Badge */}
                      <div className="mt-2 pt-2 border-t border-[#1A1A1A]/10 flex items-center justify-between">
                        <span className="text-[10px] text-[#1A1A1A]/60 uppercase">Account Type:</span>
                        <span className={`px-2 py-0.5 text-[10px] font-bold uppercase ${
                          currentUser.role === 'seller' ? 'bg-[#2D4F36] text-white' : 'bg-[#1A1A1A] text-white'
                        }`}>
                          {currentUser.role === 'seller' ? 'Seller' : 'Buyer'}
                        </span>
                      </div>
                    </div>

                    {/* Menu Items */}
                    <div className="space-y-1">
                      <button
                        type="button"
                        onClick={handleDashboardClick}
                        className="w-full text-left px-2.5 py-2 hover:bg-[#2D4F36] hover:text-white flex items-center gap-2 transition-colors font-bold uppercase tracking-wider text-[#1A1A1A]"
                      >
                        <LayoutDashboard className="w-3.5 h-3.5" />
                        <span>Dashboard</span>
                      </button>

                      {currentUser.role === 'seller' && (
                        <button
                          type="button"
                          onClick={() => {
                            setUserDropdownOpen(false);
                            onSelectPage?.('monitor');
                          }}
                          className="w-full text-left px-2.5 py-2 hover:bg-[#F5F4EF] flex items-center gap-2 transition-colors uppercase tracking-wider text-[#1A1A1A]"
                        >
                          <Activity className="w-3.5 h-3.5 text-[#00FF00]" />
                          <span>Live Monitor</span>
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={() => {
                          setUserDropdownOpen(false);
                          onOpenProfile?.();
                        }}
                        className="w-full text-left px-2.5 py-2 hover:bg-[#F5F4EF] flex items-center gap-2 transition-colors uppercase tracking-wider text-[#1A1A1A]"
                      >
                        <UserCheck className="w-3.5 h-3.5 text-[#2D4F36]" />
                        <span>Profile</span>
                      </button>

                      <div className="border-t border-[#1A1A1A]/10 my-1"></div>

                      <button
                        type="button"
                        onClick={() => {
                          setUserDropdownOpen(false);
                          onLogout?.();
                        }}
                        className="w-full text-left px-2.5 py-2 hover:bg-red-50 text-red-700 flex items-center gap-2 transition-colors uppercase tracking-wider font-bold"
                      >
                        <LogOut className="w-3.5 h-3.5 text-red-600" />
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2.5">
            {currentUser && (
              <button
                type="button"
                onClick={handleDashboardClick}
                className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 bg-[#2B4736]/10 border border-[#2B4736]/30 text-[#2B4736] font-mono text-[10px] font-bold"
                title="Active account type"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#00FF00]"></span>
                <span>{currentUser.role === 'seller' ? 'SELLER ACTIVE' : 'BUYER ACTIVE'}</span>
              </button>
            )}

            {onOpenTerminal && (
              <button
                type="button"
                onClick={onOpenTerminal}
                className="hidden sm:inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest px-3 py-1.5 bg-white hover:bg-[#1A1A1A] text-[#1A1A1A] hover:text-white border border-[#1A1A1A]/20 transition-colors"
                title="Open Telemetry Inspector"
              >
                <Terminal className="w-3.5 h-3.5 text-[#2D4F36]" />
                <span>INSPECT PACKET</span>
              </button>
            )}

            {currentPage === 'monitor' ? (
              currentUser?.role === 'seller' ? (
                <button
                  type="button"
                  id="btn-nav-seller-dashboard"
                  onClick={() => onSelectPage?.('seller_dashboard')}
                  className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#2D4F36] text-white text-[10px] font-mono uppercase tracking-widest hover:bg-[#233f2b] transition-colors"
                >
                  <span>← DASHBOARD</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => onSelectPage?.('process')}
                  className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#2D4F36] text-white text-[10px] font-mono uppercase tracking-widest hover:bg-[#233f2b] transition-colors"
                >
                  <span>HOW IT WORKS →</span>
                </button>
              )
            ) : (
              <button
                type="button"
                id="btn-nav-live-monitor"
                onClick={() => onSelectPage?.('monitor')}
                className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#1A1A1A] text-white text-[10px] font-mono uppercase tracking-widest hover:bg-black transition-colors"
              >
                <Activity className="w-3.5 h-3.5 text-[#00FF00]" />
                <span>LIVE MONITOR →</span>
              </button>
            )}

            {/* Mobile menu button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[#1A1A1A] hover:text-black focus:outline-none"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#1A1A1A]/20 bg-[#F5F2ED] px-4 pt-4 pb-6 space-y-3 font-mono text-xs">
          <div className="text-[10px] uppercase font-bold text-[#1A1A1A]/50 tracking-widest">
            NAVIGATION
          </div>
          <div className="grid grid-cols-1 gap-2">
            {currentUser?.role === 'seller' ? (
              <>
                <button
                  type="button"
                  onClick={() => {
                    onSelectPage?.('seller_dashboard');
                    setMobileMenuOpen(false);
                  }}
                  className={`p-3 text-left border flex items-center justify-between font-bold uppercase tracking-wider ${
                    currentPage === 'seller_dashboard'
                      ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]'
                      : 'bg-white text-[#1A1A1A] border-[#1A1A1A]/20'
                  }`}
                >
                  <span>01 / DASHBOARD</span>
                  <span className="text-[10px] text-[#00FF00]">● SELLER OVERVIEW</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    onSelectPage?.('monitor');
                    setMobileMenuOpen(false);
                  }}
                  className={`p-3 text-left border flex items-center justify-between font-bold uppercase tracking-wider ${
                    currentPage === 'monitor'
                      ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]'
                      : 'bg-white text-[#1A1A1A] border-[#1A1A1A]/20'
                  }`}
                >
                  <span>02 / LIVE MONITOR & METRICS</span>
                  <span className="text-[10px] text-[#00FF00]">● REAL-TIME</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    onSelectPage?.('process');
                    setMobileMenuOpen(false);
                  }}
                  className={`p-3 text-left border flex items-center justify-between font-bold uppercase tracking-wider ${
                    currentPage === 'process'
                      ? 'bg-[#2D4F36] text-white border-[#1A1A1A]'
                      : 'bg-white text-[#1A1A1A] border-[#1A1A1A]/20'
                  }`}
                >
                  <span>03 / HOW IT WORKS</span>
                  <span className="text-[10px] text-[#E5A84B]">→ PIPELINE</span>
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => {
                    onSelectPage?.('monitor');
                    setMobileMenuOpen(false);
                  }}
                  className={`p-3 text-left border flex items-center justify-between font-bold uppercase tracking-wider ${
                    currentPage === 'monitor'
                      ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]'
                      : 'bg-white text-[#1A1A1A] border-[#1A1A1A]/20'
                  }`}
                >
                  <span>01 / LIVE MONITOR & METRICS</span>
                  <span className="text-[10px] text-[#00FF00]">● SCREENSHOT UI</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    onSelectPage?.('process');
                    setMobileMenuOpen(false);
                  }}
                  className={`p-3 text-left border flex items-center justify-between font-bold uppercase tracking-wider ${
                    currentPage === 'process'
                      ? 'bg-[#2D4F36] text-white border-[#1A1A1A]'
                      : 'bg-white text-[#1A1A1A] border-[#1A1A1A]/20'
                  }`}
                >
                  <span>02 / HOW IT WORKS</span>
                  <span className="text-[10px] text-[#E5A84B]">→ 7-STAGE PIPELINE</span>
                </button>
              </>
            )}

            {!currentUser ? (
              <button
                type="button"
                onClick={() => {
                  onSelectPage?.('login');
                  setMobileMenuOpen(false);
                }}
                className={`p-3 text-left border flex items-center justify-between font-bold uppercase tracking-wider ${
                  currentPage === 'login'
                    ? 'bg-[#2B4736] text-white border-[#1A1A1A]'
                    : 'bg-white text-[#1A1A1A] border-[#1A1A1A]/20'
                }`}
              >
                <span>03 / LOGIN</span>
                <span className="text-[10px] text-[#E5A84B]">→ SELECT ROLE</span>
              </button>
            ) : (
              <div className="border border-[#1A1A1A] bg-white p-3 space-y-2">
                <div className="flex items-center justify-between border-b border-[#1A1A1A]/10 pb-2">
                  <div>
                    <div className="font-bold text-[#1A1A1A]">{currentUser.fullName}</div>
                    <div className="text-[10px] text-[#1A1A1A]/60">Account Type: {currentUser.role.toUpperCase()}</div>
                  </div>
                  <span className={`px-2 py-0.5 text-[9px] font-bold text-white ${
                    currentUser.role === 'seller' ? 'bg-[#2D4F36]' : 'bg-[#1A1A1A]'
                  }`}>
                    {currentUser.role.toUpperCase()}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      handleDashboardClick();
                    }}
                    className="p-2 bg-[#2D4F36] text-white text-center font-bold text-[11px] uppercase"
                  >
                    Dashboard
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenProfile?.();
                    }}
                    className="p-2 bg-[#F5F4EF] border border-[#1A1A1A]/20 text-center font-bold text-[11px] uppercase"
                  >
                    Profile
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onLogout?.();
                  }}
                  className="w-full py-2 bg-red-50 text-red-700 border border-red-200 text-center font-bold text-[11px] uppercase mt-1"
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          <div className="pt-2 flex flex-col gap-2 font-mono text-[10px] uppercase tracking-widest">
            {onOpenTerminal && (
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenTerminal();
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 bg-white text-[#1A1A1A] border border-[#1A1A1A]/20 font-bold"
              >
                <Terminal className="w-4 h-4 text-[#2D4F36]" />
                <span>INSPECT RAW NODE PACKET</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

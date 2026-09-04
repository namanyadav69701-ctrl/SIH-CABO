import React, { useState } from 'react';
import { Activity, ShieldCheck, Terminal, Menu, X, ArrowUpRight, Cpu, User, LogIn } from 'lucide-react';
import { UserProfile } from '../types/auth';

interface HeaderProps {
  onOpenTerminal?: () => void;
  currentPage?: 'monitor' | 'process' | 'network' | 'login';
  onSelectPage?: (page: 'monitor' | 'process' | 'network' | 'login') => void;
  currentUser?: UserProfile | null;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenTerminal,
  currentPage = 'monitor',
  onSelectPage,
  currentUser,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const processNavLinks = [
    { label: 'The Problem', href: '#problem' },
    { label: 'Architecture', href: '#system' },
    { label: 'CABO Meter', href: '#hardware' },
    { label: 'CABO Verify', href: '#verify' },
    { label: 'MRV Pipeline', href: '#pipeline' },
    { label: 'Technology', href: '#technology' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#F5F2ED]/95 backdrop-blur-md border-b border-[#1A1A1A]/20">
      {/* Top Status Bar for SIH & Regulatory Review */}
      <div className="bg-[#1A1A1A] text-[#F5F2ED] px-4 py-1.5 text-[10px] font-mono uppercase tracking-widest flex flex-wrap items-center justify-between border-b border-[#1A1A1A]">
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
          <span className="text-[#C88C32] font-bold">[ DEMO DATA ]</span>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          {/* Logo & Identity */}
          <div className="flex items-center gap-3">
            <a href="#" className="flex items-baseline gap-3 group">
              <span className="text-2xl font-black tracking-tighter text-[#1A1A1A]">
                CABO
              </span>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#1A1A1A]/60 hidden sm:inline">
                Energy Infrastructure / Carbon MRV
              </span>
            </a>
          </div>

          {/* Desktop Primary Page Switcher Tabs */}
          <div className="hidden md:flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider">
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

            <button
              type="button"
              onClick={() => onSelectPage?.('network')}
              className={`flex items-center gap-2 px-3 py-2 transition-all font-bold ${
                currentPage === 'network'
                  ? 'bg-[#1A1A1A] text-white border-b-2 border-[#E5A84B]'
                  : 'bg-white/80 text-[#1A1A1A]/70 hover:text-[#1A1A1A] hover:bg-white border border-[#1A1A1A]/20'
              }`}
            >
              <span className={`w-2 h-2 ${currentPage === 'network' ? 'bg-[#E5A84B]' : 'bg-[#1A1A1A]/40'}`}></span>
              <span>03 / MP NETWORK & PORTAL</span>
            </button>

            <button
              type="button"
              onClick={() => onSelectPage?.('login')}
              className={`flex items-center gap-2 px-3 py-2 transition-all font-bold ${
                currentPage === 'login'
                  ? 'bg-[#2B4736] text-white border-b-2 border-[#E5A84B]'
                  : 'bg-white/80 text-[#1A1A1A]/70 hover:text-[#1A1A1A] hover:bg-white border border-[#1A1A1A]/20'
              }`}
            >
              <User className={`w-3.5 h-3.5 ${currentPage === 'login' ? 'text-[#E5A84B]' : 'text-[#2B4736]'}`} />
              <span>{currentUser ? `04 / ${currentUser.name.split(' ')[0].toUpperCase()} (${currentUser.avatarInitials})` : '04 / SIGN IN'}</span>
            </button>
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2.5">
            {currentUser && (
              <button
                type="button"
                onClick={() => onSelectPage?.('login')}
                className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 bg-[#2B4736]/10 border border-[#2B4736]/30 text-[#2B4736] font-mono text-[10px] font-bold"
                title="Active session details"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#00FF00]"></span>
                <span>₹{currentUser.walletBalanceInr?.toLocaleString()} DUE</span>
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
              <button
                type="button"
                onClick={() => onSelectPage?.('process')}
                className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#2D4F36] text-white text-[10px] font-mono uppercase tracking-widest hover:bg-[#233f2b] transition-colors"
              >
                <span>HOW IT WORKS →</span>
              </button>
            ) : (
              <button
                type="button"
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
            SELECT VIEWPORT
          </div>
          <div className="grid grid-cols-1 gap-2">
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

            <button
              type="button"
              onClick={() => {
                onSelectPage?.('network');
                setMobileMenuOpen(false);
              }}
              className={`p-3 text-left border flex items-center justify-between font-bold uppercase tracking-wider ${
                currentPage === 'network'
                  ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]'
                  : 'bg-white text-[#1A1A1A] border-[#1A1A1A]/20'
              }`}
            >
              <span>03 / MP PILOT NETWORK & PORTAL</span>
              <span className="text-[10px] text-[#00FF00]">● 247 ROOFTOPS</span>
            </button>

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
              <span>{currentUser ? `04 / ${currentUser.name} (${currentUser.roleLabel})` : '04 / SIGN IN & PORTAL'}</span>
              <span className="text-[10px] text-[#E5A84B]">→ GATEWAY LOGIN</span>
            </button>
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
            <div className="text-[9px] text-[#1A1A1A]/50 text-center pt-1">
              Madhya Pradesh Pilot Infrastructure · SIH Prototype
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

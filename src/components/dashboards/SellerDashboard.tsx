import React from 'react';
import {
  Sun,
  Zap,
  Activity,
  Terminal,
  LogOut,
  User as UserIcon,
} from 'lucide-react';
import { User } from '../../types/auth';

interface SellerDashboardProps {
  user: User;
  onLogout: () => void;
  onNavigateHome: () => void;
  onOpenTerminal?: () => void;
  onOpenProfile?: () => void;
}

export const SellerDashboard: React.FC<SellerDashboardProps> = ({
  user,
  onLogout,
  onNavigateHome,
  onOpenTerminal,
  onOpenProfile,
}) => {
  const capacity = user.systemCapacityKw || 6.0;
  const nodeId = user.nodeId || 'CABO-MP-0247';
  const balance = user.walletBalanceInr ?? 3880;
  const totalEarned = user.totalEarningsInr ?? 18450;
  const availableCredits = user.verifiedCreditsAccrued ?? 0.485;
  const soldCredits = user.carbonSoldTco2e ?? 12.4;

  return (
    <div className="min-h-screen bg-[#F5F4EF] text-[#1A1A1A] font-sans selection:bg-[#2D4F36] selection:text-white flex flex-col justify-between">
      {/* Top Bar / Enclave Strip */}
      <div className="border-b border-[#1A1A1A]/15 bg-[#F5F4EF] px-6 py-3 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onNavigateHome}
            className="font-mono text-xs font-bold uppercase tracking-wider text-[#1A1A1A]/70 hover:text-[#1A1A1A] transition-colors flex items-center gap-1.5"
          >
            <Activity className="w-3.5 h-3.5 text-[#00FF00]" />
            <span>LIVE MONITOR →</span>
          </button>
          <span className="text-[#1A1A1A]/30">|</span>
          <span className="font-mono text-xs font-black tracking-widest text-[#2D4F36] uppercase">
            CABO SELLER ENCLAVE
          </span>
        </div>

        <div className="flex items-center gap-3">
          {onOpenTerminal && (
            <button
              type="button"
              onClick={onOpenTerminal}
              className="px-3 py-1.5 bg-white border border-[#1A1A1A]/20 font-mono text-[10px] uppercase tracking-wider font-bold hover:bg-[#1A1A1A] hover:text-white transition-colors flex items-center gap-1.5"
            >
              <Terminal className="w-3.5 h-3.5 text-[#2D4F36]" />
              <span>NODE TELEMETRY</span>
            </button>
          )}

          {onOpenProfile && (
            <button
              type="button"
              onClick={onOpenProfile}
              className="px-3 py-1.5 bg-white border border-[#1A1A1A]/20 font-mono text-[10px] uppercase tracking-wider font-bold hover:bg-[#1A1A1A] hover:text-white transition-colors flex items-center gap-1.5"
            >
              <UserIcon className="w-3.5 h-3.5 text-[#2D4F36]" />
              <span>PROFILE</span>
            </button>
          )}

          <button
            type="button"
            id="btn-seller-logout"
            onClick={onLogout}
            className="px-3 py-1.5 bg-[#1A1A1A] text-white font-mono text-[10px] uppercase tracking-wider font-bold hover:bg-red-700 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>LOGOUT</span>
          </button>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 py-6 sm:py-8 flex-grow">
        {/* Welcome Header & Summary Content */}
        <div className="bg-white border-2 border-[#1A1A1A] p-6 sm:p-8 shadow-[4px_4px_0px_0px_#1A1A1A]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#1A1A1A]/10">
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 bg-[#2D4F36]/10 border border-[#2D4F36]/20 font-mono text-[10px] font-bold text-[#2D4F36] uppercase tracking-widest mb-2">
                <Sun className="w-3 h-3 text-[#E5A84B]" />
                <span>Account Type: Seller</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-black font-sans uppercase tracking-tight text-[#1A1A1A]">
                SELLER DASHBOARD
              </h1>
              <p className="mt-1 text-sm text-[#1A1A1A]/70 font-sans">
                Overview of your solar generation, carbon impact and market activity.
              </p>
            </div>

            <div className="flex flex-col sm:items-end font-mono text-xs">
              <div className="text-[10px] text-[#1A1A1A]/50 uppercase tracking-widest">
                VERIFIED HARDWARE NODE
              </div>
              <div className="text-base font-black text-[#2D4F36] flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#00FF00]"></span>
                <span>{nodeId}</span>
              </div>
              <div className="text-[10px] text-[#1A1A1A]/60">Class 0.5S Dual CT + Optical OCR</div>
            </div>
          </div>

          {/* Seller In-Dashboard Navigation */}
          <div className="pt-4 pb-4 border-b border-[#1A1A1A]/10 flex flex-wrap items-center gap-2 font-mono text-xs">
            <span className="text-[10px] text-[#1A1A1A]/50 uppercase font-bold tracking-widest mr-1">
              NAVIGATE:
            </span>

            {/* 1. Dashboard */}
            <button
              type="button"
              id="seller-nav-dashboard"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="px-3 py-1.5 bg-[#1A1A1A] text-white font-bold uppercase tracking-wider text-xs border border-[#1A1A1A]"
            >
              Dashboard
            </button>

            {/* 2. Live Monitor */}
            <button
              type="button"
              id="seller-nav-live-monitor"
              onClick={onNavigateHome}
              className="px-3 py-1.5 bg-white text-[#1A1A1A] border border-[#1A1A1A]/30 hover:bg-[#1A1A1A] hover:text-white font-bold uppercase tracking-wider text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Activity className="w-3 h-3 text-[#00FF00]" />
              <span>Live Monitor</span>
            </button>

            {/* 3. Profile */}
            {onOpenProfile && (
              <button
                type="button"
                id="seller-nav-profile"
                onClick={onOpenProfile}
                className="px-3 py-1.5 bg-white text-[#1A1A1A] border border-[#1A1A1A]/30 hover:bg-[#1A1A1A] hover:text-white font-bold uppercase tracking-wider text-xs transition-colors"
              >
                Profile
              </button>
            )}
          </div>

          {/* 4 Core Seller Metrics: Generated, Carbon Impact, Available, Sold */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-6 font-mono">
            {/* METRIC 1: SOLAR GENERATION */}
            <div className="p-4 bg-[#F5F4EF] border-2 border-[#1A1A1A] flex flex-col justify-between shadow-[2px_2px_0px_0px_#1A1A1A]">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-[#1A1A1A]/60 uppercase font-bold tracking-wider">
                    SOLAR GENERATION
                  </span>
                  <Sun className="w-4 h-4 text-[#E5A84B]" />
                </div>
                <div className="mt-3 flex items-baseline gap-1.5">
                  <span className="text-3xl font-black text-[#1A1A1A]">24.8</span>
                  <span className="text-sm font-bold text-[#1A1A1A]/70">kWh</span>
                </div>
                <div className="text-[11px] font-bold text-[#2D4F36] mt-0.5">Today</div>
              </div>
              <div className="mt-4 pt-3 border-t border-[#1A1A1A]/10 flex items-center justify-between text-xs">
                <span className="text-[#1A1A1A]/60">This Month:</span>
                <span className="font-black text-[#1A1A1A]">642 kWh</span>
              </div>
            </div>

            {/* METRIC 2: EST. CO₂ AVOIDED */}
            <div className="p-4 bg-[#F5F4EF] border-2 border-[#1A1A1A] flex flex-col justify-between shadow-[2px_2px_0px_0px_#1A1A1A]">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-[#1A1A1A]/60 uppercase font-bold tracking-wider">
                    EST. CO₂ AVOIDED
                  </span>
                  <Zap className="w-4 h-4 text-[#2D4F36]" />
                </div>
                <div className="mt-3 flex items-baseline gap-1.5">
                  <span className="text-3xl font-black text-[#2D4F36]">18.7</span>
                  <span className="text-sm font-bold text-[#2D4F36]">kg</span>
                </div>
                <div className="text-[11px] font-bold text-[#2D4F36] mt-0.5">Today</div>
              </div>
              <div className="mt-4 pt-3 border-t border-[#1A1A1A]/10 flex items-center justify-between text-xs">
                <span className="text-[#1A1A1A]/60">This Month:</span>
                <span className="font-black text-[#1A1A1A]">486 kg</span>
              </div>
            </div>

            {/* METRIC 3: CARBON AVAILABLE */}
            <div className="p-4 bg-[#F5F4EF] border-2 border-[#1A1A1A] flex flex-col justify-between shadow-[2px_2px_0px_0px_#1A1A1A]">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-[#1A1A1A]/60 uppercase font-bold tracking-wider">
                    CARBON AVAILABLE
                  </span>
                  <span className="px-1.5 py-0.5 bg-[#2D4F36]/10 text-[#2D4F36] text-[9px] font-bold uppercase">
                    ELIGIBLE
                  </span>
                </div>
                <div className="mt-3 flex items-baseline gap-1.5">
                  <span className="text-3xl font-black text-[#1A1A1A]">{availableCredits.toFixed(3)}</span>
                  <span className="text-sm font-bold text-[#1A1A1A]/70">tCO₂e</span>
                </div>
                <div className="text-[11px] font-bold text-[#C88C32] mt-0.5">Eligible Aggregated Amount</div>
              </div>
              <div className="mt-4 pt-3 border-t border-[#1A1A1A]/10 flex items-center justify-between text-xs">
                <span className="text-[#1A1A1A]/60">Pool Status:</span>
                <span className="font-bold text-[#2D4F36]">Ready for Offtake</span>
              </div>
            </div>

            {/* METRIC 4: SOLD (REPLACING MRV STATUS WITH SOLD) */}
            <div className="p-4 bg-[#F5F4EF] border-2 border-[#1A1A1A] flex flex-col justify-between shadow-[2px_2px_0px_0px_#1A1A1A]">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-[#1A1A1A]/60 uppercase font-bold tracking-wider">
                    SOLD
                  </span>
                  <span className="px-1.5 py-0.5 bg-[#1A1A1A] text-[#00FF00] text-[9px] font-bold uppercase">
                    DEMO DATA
                  </span>
                </div>
                <div className="mt-3 flex items-baseline gap-1.5">
                  <span className="text-3xl font-black text-[#1A1A1A]">{soldCredits.toFixed(1)}</span>
                  <span className="text-sm font-bold text-[#1A1A1A]/70">tCO₂e</span>
                </div>
                <div className="text-[11px] font-bold text-[#1A1A1A]/70 mt-0.5">Total Sold So Far</div>
              </div>
              <div className="mt-4 pt-3 border-t border-[#1A1A1A]/10 flex items-center justify-between text-xs">
                <span className="text-[#1A1A1A]/60">Settled Revenue:</span>
                <span className="font-black text-[#2D4F36]">₹{totalEarned.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Strip */}
      <div className="border-t border-[#1A1A1A]/15 bg-[#F5F4EF] px-6 py-3 flex items-center justify-between font-mono text-[10px] text-[#1A1A1A]/50 uppercase">
        <span>AUTHENTICATED AS: {user.email} (SELLER)</span>
        <span>GATEWAY ID: {nodeId}</span>
      </div>
    </div>
  );
};

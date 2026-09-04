import React from 'react';
import {
  Building2,
  FileCheck2,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  LogOut,
  Download,
  Terminal,
  ExternalLink,
} from 'lucide-react';
import { User } from '../../types/auth';

interface BuyerDashboardProps {
  user: User;
  onLogout: () => void;
  onNavigateHome: () => void;
  onOpenTerminal?: () => void;
}

export const BuyerDashboard: React.FC<BuyerDashboardProps> = ({
  user,
  onLogout,
  onNavigateHome,
  onOpenTerminal,
}) => {
  const company = user.companyName || 'Institutional ESG Desk';
  const balance = user.walletBalanceInr ?? 450000;
  const verifiedCredits = user.verifiedCreditsAccrued ?? 480.0;

  return (
    <div className="min-h-screen bg-[#F5F4EF] text-[#1A1A1A] font-sans selection:bg-[#1A1A1A] selection:text-white flex flex-col">
      {/* Top Bar */}
      <div className="border-b border-[#1A1A1A]/15 bg-[#F5F4EF] px-6 py-3.5 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onNavigateHome}
            className="font-mono text-xs font-bold uppercase tracking-wider text-[#1A1A1A]/70 hover:text-[#1A1A1A] transition-colors"
          >
            ← LIVE MONITOR
          </button>
          <span className="text-[#1A1A1A]/30">|</span>
          <span className="font-mono text-xs font-black tracking-widest text-[#1A1A1A] uppercase">
            CABO BUYER DESK
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
              <span>INSPECT VERIFICATION</span>
            </button>
          )}

          <button
            type="button"
            id="btn-buyer-logout"
            onClick={onLogout}
            className="px-3 py-1.5 bg-[#1A1A1A] text-white font-mono text-[10px] uppercase tracking-wider font-bold hover:bg-red-700 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>LOGOUT</span>
          </button>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto w-full px-6 py-8 flex-grow space-y-8">
        {/* Welcome Header */}
        <div className="bg-white border-2 border-[#1A1A1A] p-6 sm:p-8 shadow-[4px_4px_0px_0px_#1A1A1A]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#1A1A1A]/10">
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 bg-[#1A1A1A]/10 border border-[#1A1A1A]/20 font-mono text-[10px] font-bold text-[#1A1A1A] uppercase tracking-widest mb-2">
                <Building2 className="w-3 h-3 text-[#00FF00]" />
                <span>Account Type: Buyer</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-black font-sans uppercase tracking-tight text-[#1A1A1A]">
                CABO BUYER DASHBOARD
              </h1>
              <p className="mt-1 text-sm text-[#1A1A1A]/70 font-sans">
                Welcome, <strong className="text-[#1A1A1A]">{user.fullName}</strong> · {company}
              </p>
            </div>

            <div className="flex flex-col sm:items-end font-mono text-xs">
              <div className="text-[10px] text-[#1A1A1A]/50 uppercase tracking-widest">
                AUDITED REGISTRY DESK
              </div>
              <div className="text-base font-black text-[#1A1A1A] flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#00FF00]"></span>
                <span>SEBI BRSR COMPLIANT</span>
              </div>
              <div className="text-[10px] text-[#1A1A1A]/60">Scope 2 Market-Based Accounting</div>
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 font-mono">
            <div className="p-3 bg-[#F5F4EF] border border-[#1A1A1A]/10">
              <div className="text-[10px] text-[#1A1A1A]/50 uppercase">ACTIVE INVENTORY</div>
              <div className="text-xl font-bold text-[#1A1A1A] mt-1">{verifiedCredits.toFixed(1)} tCO₂e</div>
              <div className="text-[9px] text-[#1A1A1A]/60">Batch MP-2025-Q4</div>
            </div>

            <div className="p-3 bg-[#F5F4EF] border border-[#1A1A1A]/10">
              <div className="text-[10px] text-[#1A1A1A]/50 uppercase">PROCUREMENT BALANCE</div>
              <div className="text-xl font-bold text-[#2D4F36] mt-1">₹{balance.toLocaleString()}</div>
              <div className="text-[9px] text-[#1A1A1A]/60">NEFT / Escrow Ready</div>
            </div>

            <div className="p-3 bg-[#F5F4EF] border border-[#1A1A1A]/10">
              <div className="text-[10px] text-[#1A1A1A]/50 uppercase">INTERMEDIARY MARKUP</div>
              <div className="text-xl font-bold text-[#00FF00] bg-[#1A1A1A] px-1 inline-block mt-1">0% DIRECT</div>
              <div className="text-[9px] text-[#1A1A1A]/60">Peer-to-Peer Clearing</div>
            </div>

            <div className="p-3 bg-[#F5F4EF] border border-[#1A1A1A]/10">
              <div className="text-[10px] text-[#1A1A1A]/50 uppercase">AUDIT CONCORDANCE</div>
              <div className="text-xl font-bold text-[#1A1A1A] mt-1">99.84%</div>
              <div className="text-[9px] text-[#1A1A1A]/60">Class 0.5S + Optical CT</div>
            </div>
          </div>
        </div>

        {/* 4 Core Mandated Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* SECTION 1: AVAILABLE PROJECTS */}
          <div className="bg-white border-2 border-[#1A1A1A] p-6 shadow-[3px_3px_0px_0px_#1A1A1A]">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#1A1A1A]/10">
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-[#1A1A1A]" />
                <h2 className="font-mono font-bold text-sm uppercase tracking-wider text-[#1A1A1A]">
                  1. Available Projects
                </h2>
              </div>
              <span className="font-mono text-[10px] text-[#00FF00] bg-[#1A1A1A] px-2 py-0.5 font-bold uppercase">
                247 ROOFTOPS ACTIVE
              </span>
            </div>

            <div className="space-y-3 font-mono text-xs">
              <div className="flex justify-between py-1.5 border-b border-[#1A1A1A]/5">
                <span className="text-[#1A1A1A]/60">Project Name:</span>
                <span className="font-bold text-[#1A1A1A]">Madhya Pradesh Decentralized Solar MRV #1</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[#1A1A1A]/5">
                <span className="text-[#1A1A1A]/60">Geographic Coverage:</span>
                <span className="font-bold text-[#1A1A1A]">Indore City & Sanwer Industrial Belt</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[#1A1A1A]/5">
                <span className="text-[#1A1A1A]/60">Grid Interconnection:</span>
                <span className="font-bold text-[#1A1A1A]">MPPKVVCL (West Discom 11kV Feeders)</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[#1A1A1A]/5">
                <span className="text-[#1A1A1A]/60">Verification Standard:</span>
                <span className="font-bold text-[#2D4F36]">CABO dMRV Protocol v2.4 (CEA Baseline)</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-[#1A1A1A]/60">Host Beneficiaries:</span>
                <span className="font-bold text-[#1A1A1A]">96% Direct Rooftop Host Financial Split</span>
              </div>
            </div>
          </div>

          {/* SECTION 2: VERIFIED CARBON SUPPLY */}
          <div className="bg-white border-2 border-[#1A1A1A] p-6 shadow-[3px_3px_0px_0px_#1A1A1A]">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#1A1A1A]/10">
              <div className="flex items-center gap-2">
                <FileCheck2 className="w-4 h-4 text-[#2D4F36]" />
                <h2 className="font-mono font-bold text-sm uppercase tracking-wider text-[#1A1A1A]">
                  2. Verified Carbon Supply
                </h2>
              </div>
              <span className="font-mono text-[10px] text-[#2D4F36] font-bold uppercase bg-[#2D4F36]/10 px-2 py-0.5">
                READY FOR RETIREMENT
              </span>
            </div>

            <div className="space-y-3 font-mono text-xs">
              <div className="flex justify-between py-1.5 border-b border-[#1A1A1A]/5">
                <span className="text-[#1A1A1A]/60">Current Open Pool:</span>
                <span className="font-bold text-[#2D4F36]">480.000 tCO₂e Certified</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[#1A1A1A]/5">
                <span className="text-[#1A1A1A]/60">Baseline Emission Factor:</span>
                <span className="font-bold text-[#1A1A1A]">0.716 kg CO₂/kWh (CEA Ver 20.0)</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[#1A1A1A]/5">
                <span className="text-[#1A1A1A]/60">Audit Provenance:</span>
                <span className="font-bold text-[#1A1A1A]">Substation Feeder Net-Meter Concordance</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[#1A1A1A]/5">
                <span className="text-[#1A1A1A]/60">Cryptographic Signature:</span>
                <span className="font-bold text-[#1A1A1A]">ATECC608A Hardware Silicon Root</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-[#1A1A1A]/60">Batch Serial Numbers:</span>
                <span className="font-mono text-[10px] text-[#1A1A1A]/70">CABO-MP-2025-0001 → 0480</span>
              </div>
            </div>
          </div>

          {/* SECTION 3: PURCHASE HISTORY */}
          <div className="bg-white border-2 border-[#1A1A1A] p-6 shadow-[3px_3px_0px_0px_#1A1A1A]">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#1A1A1A]/10">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-[#E5A84B]" />
                <h2 className="font-mono font-bold text-sm uppercase tracking-wider text-[#1A1A1A]">
                  3. Purchase History
                </h2>
              </div>
              <span className="font-mono text-[10px] text-[#1A1A1A]/60 uppercase">
                SETTLED TRANSACTIONS
              </span>
            </div>

            <div className="space-y-2 font-mono text-xs">
              <div className="p-2.5 bg-[#F5F4EF] border border-[#1A1A1A]/10 flex items-center justify-between">
                <div>
                  <div className="font-bold text-[#1A1A1A]">ORDER #CABO-TX-8821</div>
                  <div className="text-[10px] text-[#1A1A1A]/60">50.0 tCO₂e · Indore West Feeder</div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] font-bold text-[#00FF00] bg-[#1A1A1A] px-1.5 py-0.5">SETTLED</div>
                  <div className="text-[10px] text-[#1A1A1A]/60 mt-0.5">₹47,500.00</div>
                </div>
              </div>

              <div className="p-2.5 bg-[#F5F4EF] border border-[#1A1A1A]/10 flex items-center justify-between">
                <div>
                  <div className="font-bold text-[#1A1A1A]">ORDER #CABO-TX-7910</div>
                  <div className="text-[10px] text-[#1A1A1A]/60">120.0 tCO₂e · Sanwer Industrial Area</div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] font-bold text-[#00FF00] bg-[#1A1A1A] px-1.5 py-0.5">SETTLED</div>
                  <div className="text-[10px] text-[#1A1A1A]/60 mt-0.5">₹114,000.00</div>
                </div>
              </div>

              <div className="pt-2 text-center text-[10px] text-[#1A1A1A]/50">
                GST-compliant tax invoices attached to all completed orders
              </div>
            </div>
          </div>

          {/* SECTION 4: PORTFOLIO */}
          <div className="bg-white border-2 border-[#1A1A1A] p-6 shadow-[3px_3px_0px_0px_#1A1A1A]">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#1A1A1A]/10">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#00FF00]" />
                <h2 className="font-mono font-bold text-sm uppercase tracking-wider text-[#1A1A1A]">
                  4. Portfolio
                </h2>
              </div>
              <span className="font-mono text-[10px] text-[#00FF00] bg-[#1A1A1A] px-2 py-0.5 font-bold uppercase">
                ACTIVE HOLDINGS
              </span>
            </div>

            <div className="space-y-3 font-mono text-xs">
              <div className="flex justify-between py-1.5 border-b border-[#1A1A1A]/5">
                <span className="text-[#1A1A1A]/60">Total Retired to Date:</span>
                <span className="font-bold text-[#2D4F36]">170.0 tCO₂e (Permanently Extinguished)</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[#1A1A1A]/5">
                <span className="text-[#1A1A1A]/60">Pending Allocation:</span>
                <span className="font-bold text-[#1A1A1A]">310.0 tCO₂e in Escrow Reserve</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[#1A1A1A]/5">
                <span className="text-[#1A1A1A]/60">Audit Trail Certificate:</span>
                <span className="font-bold text-[#1A1A1A] flex items-center gap-1 text-[#2D4F36] cursor-pointer hover:underline">
                  <Download className="w-3.5 h-3.5" />
                  <span>Download DNV / EY Packet</span>
                </span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[#1A1A1A]/5">
                <span className="text-[#1A1A1A]/60">Corporate Registry:</span>
                <span className="font-bold text-[#1A1A1A]">{company}</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-[#1A1A1A]/60">Target Scope:</span>
                <span className="font-bold text-[#1A1A1A]">FY2025-26 BRSR Core Requirement</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Strip */}
      <div className="border-t border-[#1A1A1A]/15 bg-[#F5F4EF] px-6 py-3 flex items-center justify-between font-mono text-[10px] text-[#1A1A1A]/50 uppercase">
        <span>AUTHENTICATED AS: {user.email} (BUYER)</span>
        <span>DESK: {company}</span>
      </div>
    </div>
  );
};

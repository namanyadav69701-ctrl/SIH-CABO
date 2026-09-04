import React from 'react';
import { ArrowRight, Sun, Building2, ShieldCheck, ChevronRight, Activity, ArrowLeft } from 'lucide-react';

interface AccountTypeSelectProps {
  onSelectRole?: (role: 'seller' | 'buyer') => void;
  onSelectSeller?: () => void;
  onSelectBuyer?: () => void;
  onNavigateHome?: () => void;
  onBackToMonitor?: () => void;
}

export const AccountTypeSelect: React.FC<AccountTypeSelectProps> = ({
  onSelectRole,
  onSelectSeller,
  onSelectBuyer,
  onNavigateHome,
  onBackToMonitor,
}) => {
  const handleExit = () => {
    if (onBackToMonitor) onBackToMonitor();
    else if (onNavigateHome) onNavigateHome();
  };

  const handleSeller = () => {
    if (onSelectSeller) onSelectSeller();
    else if (onSelectRole) onSelectRole('seller');
  };

  const handleBuyer = () => {
    if (onSelectBuyer) onSelectBuyer();
    else if (onSelectRole) onSelectRole('buyer');
  };

  return (
    <div className="min-h-screen bg-[#F5F4EF] text-[#1A1A1A] font-sans flex flex-col justify-between selection:bg-[#2D4F36] selection:text-white">
      {/* Top Header Strip */}
      <div className="border-b border-[#1A1A1A]/15 bg-[#F5F4EF] px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleExit}
            className="flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-wider text-[#1A1A1A]/70 hover:text-[#1A1A1A] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>EXIT TO MONITOR</span>
          </button>
          <span className="text-[#1A1A1A]/30">|</span>
          <span className="font-mono text-xs font-black tracking-widest text-[#2D4F36] uppercase">
            CABO GATEWAY AUTH
          </span>
          <span className="px-2 py-0.5 bg-[#E5A84B]/20 text-[#8F5B1E] border border-[#E5A84B]/40 font-mono text-[9px] font-bold uppercase tracking-wider">
            DEMO MODE
          </span>
        </div>

        <div className="flex items-center gap-2 font-mono text-[10px] text-[#1A1A1A]/60 uppercase tracking-widest">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00FF00] animate-pulse"></span>
          <span>PILOT NETWORK ACTIVE</span>
        </div>
      </div>

      {/* Main Account Selection Body */}
      <div className="max-w-4xl mx-auto w-full px-6 py-12 lg:py-16 my-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-[#2D4F36]/10 border border-[#2D4F36]/20 font-mono text-[10px] font-bold text-[#2D4F36] uppercase tracking-widest mb-4">
            <span>■ ROLE SPECIFICATION / DUAL-SIDED MARKETPLACE</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-sans uppercase tracking-tight text-[#1A1A1A] leading-[1.1]">
            Choose how you use CABO
          </h1>

          <p className="mt-3 text-sm sm:text-base text-[#1A1A1A]/70 font-sans leading-relaxed">
            Select your account type to access dedicated telemetry monitoring, verification pipelines, and market settlement registries.
          </p>
        </div>

        {/* 2 Dedicated Account Selection Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {/* OPTION 1: SELLER */}
          <div className="bg-white border-2 border-[#1A1A1A] p-7 sm:p-8 flex flex-col justify-between hover:border-[#2D4F36] transition-all group relative shadow-[4px_4px_0px_0px_#1A1A1A]">
            <div className="absolute top-0 right-0 bg-[#1A1A1A] text-white px-3 py-1 font-mono text-[9px] font-bold uppercase tracking-widest">
              ASSET OWNER
            </div>

            <div>
              <div className="w-12 h-12 bg-[#2D4F36] text-white flex items-center justify-center mb-5 border border-[#1A1A1A]">
                <Sun className="w-6 h-6 text-[#E5A84B]" />
              </div>

              <div className="font-mono text-xs font-bold text-[#2D4F36] uppercase tracking-widest mb-1">
                ROLE 01
              </div>

              <h2 className="text-2xl font-black font-mono tracking-tight text-[#1A1A1A] uppercase mb-3">
                SELLER
              </h2>

              <p className="text-sm text-[#1A1A1A]/80 leading-relaxed font-sans mb-6">
                For households, MSMEs and institutions registering solar assets and participating in CABO's MRV network.
              </p>

              {/* Technical Pipeline tags */}
              <div className="border-t border-b border-[#1A1A1A]/10 py-3 mb-6 space-y-1.5 font-mono text-[11px] text-[#1A1A1A]/70">
                <div className="font-bold text-[#1A1A1A] text-[10px] uppercase tracking-widest text-[#2D4F36]">
                  PIPELINE FLOW:
                </div>
                <div className="text-[10px] leading-relaxed text-[#1A1A1A]/80">
                  SOLAR → MEASURE → VERIFY → AGGREGATE → MONETIZE
                </div>
                <div className="flex items-center gap-2 pt-1 text-[10px] text-[#1A1A1A]/60">
                  <span>● 96% Direct Host Payout</span>
                  <span>● Zero Upfront Cost</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              id="btn-continue-as-seller"
              onClick={handleSeller}
              className="w-full py-3.5 px-4 bg-[#2D4F36] group-hover:bg-[#1F3927] text-white font-mono font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-sm cursor-pointer"
            >
              <span>CONTINUE AS SELLER</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* OPTION 2: BUYER */}
          <div className="bg-white border-2 border-[#1A1A1A] p-7 sm:p-8 flex flex-col justify-between hover:border-[#1A1A1A] transition-all group relative shadow-[4px_4px_0px_0px_#1A1A1A]">
            <div className="absolute top-0 right-0 bg-[#2D4F36] text-white px-3 py-1 font-mono text-[9px] font-bold uppercase tracking-widest">
              INSTITUTIONAL
            </div>

            <div>
              <div className="w-12 h-12 bg-[#1A1A1A] text-white flex items-center justify-center mb-5 border border-[#1A1A1A]">
                <Building2 className="w-6 h-6 text-[#00FF00]" />
              </div>

              <div className="font-mono text-xs font-bold text-[#1A1A1A]/60 uppercase tracking-widest mb-1">
                ROLE 02
              </div>

              <h2 className="text-2xl font-black font-mono tracking-tight text-[#1A1A1A] uppercase mb-3">
                BUYER
              </h2>

              <p className="text-sm text-[#1A1A1A]/80 leading-relaxed font-sans mb-6">
                For organizations interested in discovering and purchasing eligible verified carbon credits.
              </p>

              {/* Technical Pipeline tags */}
              <div className="border-t border-b border-[#1A1A1A]/10 py-3 mb-6 space-y-1.5 font-mono text-[11px] text-[#1A1A1A]/70">
                <div className="font-bold text-[#1A1A1A] text-[10px] uppercase tracking-widest text-[#1A1A1A]">
                  PIPELINE FLOW:
                </div>
                <div className="text-[10px] leading-relaxed text-[#1A1A1A]/80">
                  DISCOVER → REVIEW → PURCHASE → TRACK
                </div>
                <div className="flex items-center gap-2 pt-1 text-[10px] text-[#1A1A1A]/60">
                  <span>● Tamper-Evident Provenance</span>
                  <span>● Zero Broker Markup</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              id="btn-continue-as-buyer"
              onClick={handleBuyer}
              className="w-full py-3.5 px-4 bg-[#1A1A1A] group-hover:bg-black text-white font-mono font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-sm cursor-pointer"
            >
              <span>CONTINUE AS BUYER</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Quick Help & Demo Info */}
        <div className="mt-12 text-center font-mono text-xs text-[#1A1A1A]/60">
          <span>Need field assistance or net-metering dispatch? Contact </span>
          <span className="font-bold text-[#1A1A1A]">ops@cabo.energy</span>
          <span> · Indore West Circle</span>
        </div>
      </div>

      {/* Bottom Status Bar */}
      <div className="border-t border-[#1A1A1A]/15 bg-[#F5F4EF] px-6 py-3 flex items-center justify-between font-mono text-[10px] text-[#1A1A1A]/50 uppercase tracking-widest">
        <span>CABO DISTRIBUTED MRV PROTOCOL v2.4</span>
        <span>SECURE END-TO-END CRYPTOGRAPHIC AUDITING</span>
      </div>
    </div>
  );
};

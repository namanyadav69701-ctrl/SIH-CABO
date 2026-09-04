import React, { useState } from 'react';
import {
  User,
  Home,
  CheckCircle2,
  Clock,
  HelpCircle,
  TrendingUp,
  AlertCircle,
  FileSpreadsheet,
  Download,
  Info,
  Banknote,
  ShieldCheck,
  Building2
} from 'lucide-react';

export const UserPortal: React.FC = () => {
  const [systemTier, setSystemTier] = useState<'residential' | 'msme' | 'institution'>('residential');

  const tierConfigs = {
    residential: {
      owner: 'Sharma Residence',
      location: 'Vijay Nagar, Indore, MP',
      systemSizeKw: 5.0,
      todayKwh: 24.8,
      monthKwh: 642,
      co2AvoidedKg: 486,
      batchId: 'MP-ROOF-2026-B84',
      batchProgressPct: 82,
      estValueMin: 3200,
      estValueMax: 4800,
      nodeId: 'CABO-MP-0247',
    },
    msme: {
      owner: 'Malwa Precision Auto Components',
      location: 'Sanwer Road Industrial Area, Indore, MP',
      systemSizeKw: 25.0,
      todayKwh: 124.2,
      monthKwh: 3210,
      co2AvoidedKg: 2430,
      batchId: 'MP-MSME-2026-A12',
      batchProgressPct: 94,
      estValueMin: 16000,
      estValueMax: 24000,
      nodeId: 'CABO-MP-0188',
    },
    institution: {
      owner: 'St. Paul Higher Secondary School',
      location: 'Arera Colony, Bhopal, MP',
      systemSizeKw: 50.0,
      todayKwh: 248.5,
      monthKwh: 6420,
      co2AvoidedKg: 4860,
      batchId: 'MP-INST-2026-C04',
      batchProgressPct: 68,
      estValueMin: 32000,
      estValueMax: 48000,
      nodeId: 'CABO-MP-0193',
    },
  };

  const current = tierConfigs[systemTier];

  return (
    <section id="portal" className="py-16 lg:py-24 border-b border-[#1A1A1A]/20 bg-[#F5F2ED]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-[#2D4F36] font-bold mb-2">
            <span className="w-1.5 h-1.5 bg-[#2D4F36]"></span>
            09 / Participant Interface
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tighter text-[#1A1A1A] leading-[0.98]">
            PARTICIPANT DASHBOARD: ROOFTOP PORTAL
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#1A1A1A]/80 leading-relaxed">
            Rooftop owners access clean, auditable telemetry showing verified kilowatt-hours,
            certified avoided emissions, and the real-time aggregation status of their carbon credit lot.
          </p>
        </div>

        {/* Profile Switcher */}
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            type="button"
            onClick={() => setSystemTier('residential')}
            className={`px-4 py-2 text-[10px] font-mono font-bold uppercase tracking-widest border transition-colors flex items-center gap-2 ${
              systemTier === 'residential'
                ? 'bg-[#2D4F36] text-white border-[#2D4F36]'
                : 'bg-white text-[#1A1A1A] border-[#1A1A1A]/20 hover:bg-[#F5F2ED]'
            }`}
          >
            <Home className="w-3.5 h-3.5" />
            <span>5 kW Residential Household</span>
          </button>

          <button
            type="button"
            onClick={() => setSystemTier('msme')}
            className={`px-4 py-2 text-[10px] font-mono font-bold uppercase tracking-widest border transition-colors flex items-center gap-2 ${
              systemTier === 'msme'
                ? 'bg-[#2D4F36] text-white border-[#2D4F36]'
                : 'bg-white text-[#1A1A1A] border-[#1A1A1A]/20 hover:bg-[#F5F2ED]'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>25 kW MSME Workshop</span>
          </button>

          <button
            type="button"
            onClick={() => setSystemTier('institution')}
            className={`px-4 py-2 text-[10px] font-mono font-bold uppercase tracking-widest border transition-colors flex items-center gap-2 ${
              systemTier === 'institution'
                ? 'bg-[#2D4F36] text-white border-[#2D4F36]'
                : 'bg-white text-[#1A1A1A] border-[#1A1A1A]/20 hover:bg-[#F5F2ED]'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>50 kW School / Hospital</span>
          </button>
        </div>

        {/* Portal UI Container */}
        <div className="border-2 border-[#1A1A1A] bg-white overflow-hidden shadow-none">
          {/* Header of Simulated Portal */}
          <div className="bg-[#1A1A1A] text-white px-6 py-4 border-b border-[#1A1A1A] flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[#2D4F36] text-white flex items-center justify-center font-bold">
                {current.owner[0]}
              </div>
              <div>
                <div className="font-bold text-white text-sm uppercase tracking-tight">{current.owner}</div>
                <div className="text-[10px] text-white/70 uppercase tracking-widest">{current.location} · {current.systemSizeKw} kW Rooftop Solar</div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div>
                <span className="text-white/60 block text-[9px] uppercase tracking-widest">Telemetry Node ID</span>
                <span className="font-bold text-white text-[11px]">{current.nodeId}</span>
              </div>
              <div className="h-6 w-px bg-white/20"></div>
              <div>
                <span className="text-white/60 block text-[9px] uppercase tracking-widest">Verification Status</span>
                <span className="font-bold text-[#C88C32] flex items-center gap-1 text-[11px]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#C88C32]" />
                  DATA VERIFIED
                </span>
              </div>
            </div>
          </div>

          {/* Core Metrics Grid */}
          <div className="p-6 sm:p-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {/* Box 1: Today */}
              <div className="p-4 bg-[#F5F2ED] border border-[#1A1A1A]/20">
                <span className="text-[9px] font-mono uppercase tracking-widest text-[#1A1A1A]/60 block mb-1">
                  TODAY'S GENERATION
                </span>
                <div className="text-3xl font-mono font-bold text-[#1A1A1A] tabular-nums">
                  {current.todayKwh} <span className="text-xs font-normal text-[#1A1A1A]/60">kWh</span>
                </div>
                <span className="text-[10px] font-mono text-[#2D4F36] mt-1 block font-bold uppercase tracking-wider">
                  Class 0.5S CT Verified
                </span>
              </div>

              {/* Box 2: This Month */}
              <div className="p-4 bg-[#F5F2ED] border border-[#1A1A1A]/20">
                <span className="text-[9px] font-mono uppercase tracking-widest text-[#1A1A1A]/60 block mb-1">
                  THIS MONTH
                </span>
                <div className="text-3xl font-mono font-bold text-[#1A1A1A] tabular-nums">
                  {current.monthKwh} <span className="text-xs font-normal text-[#1A1A1A]/60">kWh</span>
                </div>
                <span className="text-[10px] font-mono text-[#1A1A1A]/70 mt-1 block uppercase tracking-wide">
                  30-day cumulative
                </span>
              </div>

              {/* Box 3: Avoided CO2 */}
              <div className="p-4 bg-[#F5F2ED] border border-[#1A1A1A]/20">
                <span className="text-[9px] font-mono uppercase tracking-widest text-[#1A1A1A]/60 block mb-1">
                  ESTIMATED CO₂ AVOIDED
                </span>
                <div className="text-3xl font-mono font-bold text-[#2D4F36] tabular-nums">
                  {current.co2AvoidedKg} <span className="text-xs font-normal text-[#1A1A1A]/60">kg</span>
                </div>
                <span className="text-[10px] font-mono text-[#2D4F36] mt-1 block font-bold uppercase tracking-wider">
                  CEA Baseline (0.716 kg/kWh)
                </span>
              </div>

              {/* Box 4: Estimated Participant Value */}
              <div className="p-4 bg-[#F5F2ED] border border-[#1A1A1A]/20">
                <span className="text-[9px] font-mono uppercase tracking-widest text-[#1A1A1A]/60 block mb-1">
                  ESTIMATED VALUE
                </span>
                <div className="text-2xl sm:text-3xl font-mono font-bold text-[#C88C32] tabular-nums">
                  ₹ {current.estValueMin.toLocaleString()} – ₹ {current.estValueMax.toLocaleString()}
                </div>
                <span className="text-[10px] font-mono text-[#1A1A1A]/60 mt-1 block uppercase tracking-wide">
                  Subject to audit & clearance
                </span>
              </div>
            </div>

            {/* Aggregation Batch Status Bar */}
            <div className="p-5 bg-[#F5F2ED] border border-[#1A1A1A]/20 mb-6">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2 text-xs font-mono">
                <div>
                  <span className="text-[#1A1A1A]/60 uppercase tracking-widest text-[10px]">CARBON PROJECT STATUS: </span>
                  <span className="font-bold text-[#1A1A1A] text-[11px] uppercase">AGGREGATION IN PROGRESS</span>
                  <span className="text-[#1A1A1A]/60 ml-2 text-[10px]">({current.batchId})</span>
                </div>
                <span className="font-bold text-[#2D4F36] text-[10px] uppercase tracking-widest">
                  {current.batchProgressPct}% POOL COMPLETE (410 kW of 500 kW Target)
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full h-3 bg-white border border-[#1A1A1A]/30">
                <div
                  className="h-full bg-[#2D4F36] transition-all"
                  style={{ width: `${current.batchProgressPct}%` }}
                ></div>
              </div>

              <div className="mt-3 flex justify-between text-[10px] font-mono text-[#1A1A1A]/70 uppercase tracking-widest">
                <span>STAGE: Merkle Leaf Ingestion</span>
                <span>EST. SUBMISSION TO AUDITOR: Q4 2026</span>
              </div>
            </div>

            {/* Mandatory Disclaimer */}
            <div className="p-4 bg-white border-2 border-[#1A1A1A] text-xs text-[#1A1A1A]/80 leading-relaxed">
              <div className="font-mono font-bold text-[#1A1A1A] uppercase tracking-widest text-[10px] mb-1 flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-[#C88C32]" />
                METHODOLOGY & VALUE REALIZATION DISCLAIMER
              </div>
              <p>
                Estimated participant value is an indicative projection based on prevailing voluntary/compliance carbon price benchmarks ($8 – $14 per tCO₂e) and net avoided grid emission calculations. CABO does <strong>not</strong> guarantee specific financial returns. Actual credit issuance and revenue settlement are contingent upon third-party verification, registry validation (VVB audit), accredited standard clearance, and market transaction prices at the time of sale.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

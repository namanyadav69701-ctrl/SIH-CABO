import React, { useState } from 'react';
import {
  ArrowLeft,
  Activity,
  Layers,
  Cpu,
  Eye,
  ShieldCheck,
  Calculator,
  Award,
  TrendingUp,
  Banknote,
  CheckCircle2,
  AlertTriangle,
  FileCheck2,
  Zap,
  Radio,
  FileSpreadsheet,
  Building,
  Home,
  Check,
  ChevronRight
} from 'lucide-react';
import { TheProblem } from './TheProblem';
import { CaboSystem } from './CaboSystem';
import { CaboMeter } from './CaboMeter';
import { CaboVerify } from './CaboVerify';
import { DataIntegrity } from './DataIntegrity';
import { CarbonPipeline } from './CarbonPipeline';
import { TechArchitecture } from './TechArchitecture';
import { ImpactAndCredibility } from './ImpactAndCredibility';

interface HowItWorksPageProps {
  onNavigateToMonitor: () => void;
  onOpenTerminal?: () => void;
}

export const HowItWorksPage: React.FC<HowItWorksPageProps> = ({
  onNavigateToMonitor,
  onOpenTerminal,
}) => {
  const [activeStepTab, setActiveStepTab] = useState<number>(0);

  const PROCESS_STAGES = [
    {
      num: '01',
      title: 'Current & Voltage Sensing',
      actor: 'CABO Meter (Hardware Clamp)',
      summary:
        'Split-core Class 0.5S Current Transformers (CTs) measure true AC output directly at inverter terminals with ±0.5% precision, independent of inverter firmware.',
      keySpec: 'ADE7953 Energy IC · 50Hz Sampling',
    },
    {
      num: '02',
      title: 'Cryptographic Silicon Attestation',
      actor: 'ATECC608A CryptoAuthentication',
      summary:
        'Every 60-second telemetry packet is signed inside a tamper-proof hardware security chip before transmission, preventing man-in-the-middle spoofing.',
      keySpec: 'ECDSA P-256 Signature · SHA-256',
    },
    {
      num: '03',
      title: 'Optical Computer Vision Corroboration',
      actor: 'ESP32-CAM Optical Node',
      summary:
        'A dedicated optical camera captures physical photographs of the inverter LCD and runs edge OCR to corroborate electrical readings against visual digits.',
      keySpec: 'Edge OCR · Contrast & Digit Filter',
    },
    {
      num: '04',
      title: 'Multi-Source Discrepancy Gate',
      actor: 'CABO Verify Engine',
      summary:
        'Cross-verifies 7 telemetry streams: CT readings, Inverter Modbus, Optical OCR, Panel Soiling CV, Satellite Solar Irradiance, NTP Timestamp, and Crypto signatures.',
      keySpec: '<2.0% Tolerance Gate · Auto-Flagging',
    },
    {
      num: '05',
      title: 'Merkle Tree Batch Rollup',
      actor: 'Scalable Aggregator Node',
      summary:
        'Individual kilowatt-hour telemetry packets from hundreds of rooftops are rolled up into Merkle trees, committing 10,000 readings into a single 32-byte cryptographic root.',
      keySpec: 'Zero-Gas Off-Chain · Public Proofs',
    },
    {
      num: '06',
      title: 'CEA Factor & Registry Certification',
      actor: 'UNFCCC AMS-I.D / BEE CCTS',
      summary:
        'The audited aggregate kilowatt-hours are multiplied by the Central Electricity Authority (CEA) baseline emission factor (0.716 kg CO₂/kWh) to mint certified Carbon Credits (CCs).',
      keySpec: '0.716 kg CO₂/kWh Factor · Registry Audit',
    },
    {
      num: '07',
      title: 'Automated Payout to Rooftop Owners',
      actor: 'Banking & Smart Settlement Layer',
      summary:
        'Revenue from institutional credit buyers is automatically cleared and distributed directly to rooftop owners’ bank accounts via UPI / NEFT.',
      keySpec: '80% Direct to Rooftop Owner · Instant UPI',
    },
  ];

  return (
    <div className="bg-[#F5F2ED] text-[#1A1A1A] min-h-screen selection:bg-[#2D4F36] selection:text-white">
      {/* Top Banner Navigation Bar */}
      <div className="bg-[#1A1A1A] text-white py-4 px-4 sm:px-6 lg:px-8 border-b border-[#2A2A2A]">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onNavigateToMonitor}
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#2D4F36] hover:bg-[#386243] text-white text-xs font-mono font-bold uppercase tracking-wider transition-colors"
            >
              <ArrowLeft className="w-4 h-4 text-[#E5A84B]" />
              <span>← RETURN TO LIVE MONITOR</span>
            </button>
            <span className="text-xs font-mono text-[#888888] hidden sm:inline">
              | ARCHITECTURE & METHODOLOGY DOSSIER
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs font-mono">
            {onOpenTerminal && (
              <button
                type="button"
                onClick={onOpenTerminal}
                className="px-3 py-1.5 border border-[#444444] text-white hover:border-white text-xs font-mono font-bold uppercase tracking-wider transition-colors"
              >
                INSPECT PACKET
              </button>
            )}
            <span className="hidden sm:inline-block px-2.5 py-1 bg-[#2D4F36] text-white text-[10px] font-mono font-bold uppercase tracking-wider">
              UNFCCC & BEE COMPLIANT
            </span>
          </div>
        </div>
      </div>

      {/* Hero Explainer Header */}
      <section className="py-14 sm:py-20 border-b border-[#1A1A1A]/20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-[#2D4F36] font-bold mb-3">
              <span className="w-2 h-2 bg-[#2D4F36] inline-block"></span>
              PROCESS EXPLAINER · END-TO-END METHODOLOGY
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#1A1A1A] leading-[1.02]">
              HOW CABO WORKS: FROM ROOFTOP KILOWATT-HOURS TO CERTIFIED CARBON REVENUE
            </h1>
            <p className="mt-6 text-base sm:text-lg text-[#1A1A1A]/80 leading-relaxed font-sans">
              Until now, 99% of rooftop solar systems in India were excluded from carbon finance due to prohibitive manual auditing costs ($15k–$40k/project) and vulnerability to firmware spoofing.
              CABO introduces zero-touch <strong>Digital Measurement, Reporting & Verification (dMRV)</strong> using multi-source hardware corroboration, computer vision, and cryptographic batch rollups.
            </p>
          </div>

          {/* Quick 3-Pillar Visual Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 pt-8 border-t border-[#1A1A1A]/10">
            <div className="border-2 border-[#1A1A1A] bg-[#F5F2ED] p-6">
              <div className="w-8 h-8 bg-[#1A1A1A] text-[#E5A84B] flex items-center justify-center font-mono font-bold text-sm mb-4">
                01
              </div>
              <h3 className="text-lg font-bold font-mono text-[#1A1A1A] uppercase tracking-tight mb-2">
                INDEPENDENT HARDWARE
              </h3>
              <p className="text-xs text-[#1A1A1A]/80 leading-relaxed">
                Class 0.5S split-core CT sensor reads current directly from inverter AC terminals, immune to inverter software hacks or firmware manipulation.
              </p>
            </div>

            <div className="border-2 border-[#1A1A1A] bg-[#F5F2ED] p-6">
              <div className="w-8 h-8 bg-[#1A1A1A] text-[#E5A84B] flex items-center justify-center font-mono font-bold text-sm mb-4">
                02
              </div>
              <h3 className="text-lg font-bold font-mono text-[#1A1A1A] uppercase tracking-tight mb-2">
                OPTICAL AI CORROBORATION
              </h3>
              <p className="text-xs text-[#1A1A1A]/80 leading-relaxed">
                An edge camera photographs the inverter LCD display and runs OCR. Any divergence between the electrical CT and the physical screen triggers immediate audit.
              </p>
            </div>

            <div className="border-2 border-[#1A1A1A] bg-[#F5F2ED] p-6">
              <div className="w-8 h-8 bg-[#1A1A1A] text-[#E5A84B] flex items-center justify-center font-mono font-bold text-sm mb-4">
                03
              </div>
              <h3 className="text-lg font-bold font-mono text-[#1A1A1A] uppercase tracking-tight mb-2">
                MERKLE BATCH SETTLEMENT
              </h3>
              <p className="text-xs text-[#1A1A1A]/80 leading-relaxed">
                Aggregates thousands of residential and MSME rooftops into 500 kW lots, anchoring cryptographic Merkle roots to registries with direct UPI monetization.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7-STAGE INTERACTIVE PROCESS PIPELINE INSPECTOR */}
      <section className="py-16 lg:py-20 border-b border-[#1A1A1A]/20 bg-[#F5F2ED]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-10">
            <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-[#2D4F36] font-bold mb-2">
              <span className="w-1.5 h-1.5 bg-[#2D4F36]"></span>
              THE 7-STAGE PIPELINE WALKTHROUGH
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-mono text-[#1A1A1A] uppercase tracking-tight">
              STEP-BY-STEP DATA & VALUE FLOW
            </h2>
            <p className="mt-2 text-sm text-[#1A1A1A]/80">
              Click any stage below to inspect the engineering mechanism, verification standard, and data artifacts generated.
            </p>
          </div>

          {/* Pipeline Stage Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 mb-6">
            {PROCESS_STAGES.map((step, idx) => {
              const isSelected = activeStepTab === idx;
              return (
                <button
                  key={step.num}
                  type="button"
                  onClick={() => setActiveStepTab(idx)}
                  className={`p-3 text-left border transition-all flex flex-col justify-between h-28 font-mono ${
                    isSelected
                      ? 'bg-[#2D4F36] text-white border-2 border-[#1A1A1A]'
                      : 'bg-white text-[#1A1A1A] border-[#1A1A1A]/20 hover:bg-[#EAE7DC]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-[9px] font-bold uppercase tracking-widest ${
                        isSelected ? 'text-[#E5A84B]' : 'text-[#888888]'
                      }`}
                    >
                      STEP {step.num}
                    </span>
                    {isSelected && <span className="w-2 h-2 rounded-full bg-[#E5A84B]"></span>}
                  </div>
                  <div className="text-xs font-bold uppercase leading-tight line-clamp-2">
                    {step.title}
                  </div>
                  <div
                    className={`text-[8px] uppercase tracking-widest ${
                      isSelected ? 'text-white/80' : 'text-[#888888]'
                    }`}
                  >
                    {isSelected ? '● ACTIVE' : 'INSPECT →'}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Stage Detailed Dossier Card */}
          <div className="border-2 border-[#1A1A1A] bg-white p-6 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#1A1A1A]/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#1A1A1A] text-[#E5A84B] flex items-center justify-center font-mono font-bold text-lg">
                  {PROCESS_STAGES[activeStepTab].num}
                </div>
                <div>
                  <span className="text-[10px] font-mono text-[#E5A84B] font-bold uppercase tracking-widest block">
                    {PROCESS_STAGES[activeStepTab].actor}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold font-mono text-[#1A1A1A] uppercase tracking-tight">
                    {PROCESS_STAGES[activeStepTab].title}
                  </h3>
                </div>
              </div>

              <div className="text-right">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#2D4F36] font-bold px-2.5 py-1 bg-[#F5F2ED] border border-[#1A1A1A]/20 block">
                  {PROCESS_STAGES[activeStepTab].keySpec}
                </span>
              </div>
            </div>

            <div className="py-6">
              <p className="text-sm sm:text-base text-[#1A1A1A]/85 leading-relaxed">
                {PROCESS_STAGES[activeStepTab].summary}
              </p>
            </div>

            <div className="pt-4 border-t border-[#1A1A1A]/10 flex items-center justify-between text-xs font-mono">
              <div className="text-[#888888] text-[10px] uppercase tracking-widest">
                STAGE {activeStepTab + 1} OF 7 · AUDIT-READY COMPLIANCE
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  disabled={activeStepTab === 0}
                  onClick={() => setActiveStepTab((prev) => Math.max(0, prev - 1))}
                  className="px-3 py-1.5 border border-[#1A1A1A]/20 bg-[#F5F2ED] text-[10px] font-mono uppercase font-bold disabled:opacity-30 hover:bg-[#1A1A1A] hover:text-white transition-colors"
                >
                  ← PREV
                </button>
                <button
                  type="button"
                  disabled={activeStepTab === PROCESS_STAGES.length - 1}
                  onClick={() => setActiveStepTab((prev) => Math.min(PROCESS_STAGES.length - 1, prev + 1))}
                  className="px-3 py-1.5 border border-[#1A1A1A] bg-[#1A1A1A] text-white text-[10px] font-mono uppercase font-bold disabled:opacity-30 hover:bg-[#2D4F36] transition-colors"
                >
                  NEXT →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CORE PROBLEM SECTION */}
      <TheProblem />

      {/* END-TO-END SYSTEM FLOW */}
      <CaboSystem />

      {/* HARDWARE ENGINEERING */}
      <CaboMeter />

      {/* MULTI-SOURCE VERIFICATION BENCH (OCR + CT + SATELLITE) */}
      <CaboVerify />

      {/* DATA INTEGRITY & MERKLE PROOFS */}
      <DataIntegrity />

      {/* FULL CARBON METHODOLOGY PIPELINE */}
      <CarbonPipeline />

      {/* TECH ARCHITECTURE */}
      <TechArchitecture />

      {/* NATIONAL POLICY ALIGNMENT & CREDIBILITY */}
      <ImpactAndCredibility />

      {/* BOTTOM ACTION BAR TO RETURN TO MONITOR */}
      <div className="bg-[#1A1A1A] text-white py-12 px-4 sm:px-6 lg:px-8 border-t border-[#2A2A2A]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-[10px] font-mono text-[#E5A84B] font-bold uppercase tracking-widest block mb-1">
              READY TO OBSERVE LIVE TELEMETRY?
            </span>
            <h3 className="text-2xl font-mono font-bold text-white uppercase tracking-tight">
              INSPECT LIVE ROOFTOP PRODUCTION & CARBON METRICS
            </h3>
            <p className="text-xs text-[#888888] mt-1">
              View active solar generation (5.07 kW), today's verified kWh, avoided emissions, and real-time CCs.
            </p>
          </div>

          <button
            type="button"
            onClick={onNavigateToMonitor}
            className="px-6 py-3 bg-[#E5A84B] hover:bg-[#d69634] text-[#141414] text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-2 transition-colors shrink-0"
          >
            <Activity className="w-4 h-4 text-[#141414]" />
            <span>VIEW LIVE MONITOR & METRICS →</span>
          </button>
        </div>
      </div>
    </div>
  );
};

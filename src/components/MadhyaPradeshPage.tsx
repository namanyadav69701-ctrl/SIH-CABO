import React from 'react';
import { ArrowLeft, MapPin, Building, ShieldCheck, Activity, Users } from 'lucide-react';
import { MadhyaPradeshNetwork } from './MadhyaPradeshNetwork';
import { LiveDashboard } from './LiveDashboard';
import { UserPortal } from './UserPortal';
import { FutureProducts } from './FutureProducts';
import { ImpactAndCredibility } from './ImpactAndCredibility';

interface MadhyaPradeshPageProps {
  onNavigateToMonitor: () => void;
  onNavigateToProcess: () => void;
  onOpenTerminal?: () => void;
}

export const MadhyaPradeshPage: React.FC<MadhyaPradeshPageProps> = ({
  onNavigateToMonitor,
  onNavigateToProcess,
  onOpenTerminal,
}) => {
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
              | MADHYA PRADESH PILOT NETWORK & PARTICIPANT PORTAL
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs font-mono">
            <button
              type="button"
              onClick={onNavigateToProcess}
              className="px-3 py-1.5 border border-[#444444] text-white hover:border-white text-xs font-mono font-bold uppercase tracking-wider transition-colors"
            >
              HOW IT WORKS →
            </button>
            {onOpenTerminal && (
              <button
                type="button"
                onClick={onOpenTerminal}
                className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white text-xs font-mono font-bold uppercase tracking-wider transition-colors"
              >
                INSPECT PACKET
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Hero Section for MP Pilot */}
      <section className="py-12 sm:py-16 border-b border-[#1A1A1A]/20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-[#2D4F36] font-bold mb-3">
              <span className="w-2 h-2 bg-[#2D4F36] inline-block"></span>
              PILOT REGION · CENTRAL INDIA DEPLOYMENT
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#1A1A1A] leading-[1.02]">
              MADHYA PRADESH 247-ROOFTOP PILOT NETWORK
            </h1>
            <p className="mt-4 text-base sm:text-lg text-[#1A1A1A]/80 leading-relaxed">
              Operating across three major state distribution companies (DISCOMs)—MPPKVVCL (West),
              MPMKVVCL (Central), and MPPoKVVCL (East)—aggregating 1.82 MW of distributed residential,
              MSME, and institutional rooftop solar capacity into audited carbon asset pools.
            </p>
          </div>

          {/* Quick Metrics Header Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-8 border-t border-[#1A1A1A]/10 font-mono">
            <div className="border-2 border-[#1A1A1A] bg-[#F5F2ED] p-4">
              <span className="text-[10px] uppercase text-[#888888] font-bold block mb-1">
                ACTIVE ROOFTOPS
              </span>
              <div className="text-3xl font-black text-[#1A1A1A]">247</div>
              <span className="text-[10px] text-[#2D4F36] font-bold">100% TELEMETRY UPTIME</span>
            </div>

            <div className="border-2 border-[#1A1A1A] bg-[#F5F2ED] p-4">
              <span className="text-[10px] uppercase text-[#888888] font-bold block mb-1">
                AGGREGATED CAPACITY
              </span>
              <div className="text-3xl font-black text-[#1A1A1A]">1.82 <span className="text-sm">MW</span></div>
              <span className="text-[10px] text-[#888888]">ACROSS 5 URBAN HUBS</span>
            </div>

            <div className="border-2 border-[#1A1A1A] bg-[#F5F2ED] p-4">
              <span className="text-[10px] uppercase text-[#888888] font-bold block mb-1">
                DISCOM TERRITORIES
              </span>
              <div className="text-3xl font-black text-[#1A1A1A]">3</div>
              <span className="text-[10px] text-[#C88C32] font-bold">WEST · CENTRAL · EAST</span>
            </div>

            <div className="border-2 border-[#1A1A1A] bg-[#F5F2ED] p-4">
              <span className="text-[10px] uppercase text-[#888888] font-bold block mb-1">
                VERIFIED CCS TO DATE
              </span>
              <div className="text-3xl font-black text-[#2D4F36]">1,280 <span className="text-sm">tCO₂</span></div>
              <span className="text-[10px] text-[#2D4F36] font-bold">CEA V19 COMPLIANT</span>
            </div>
          </div>
        </div>
      </section>

      {/* Madhya Pradesh Geographical & Cluster Network */}
      <MadhyaPradeshNetwork />

      {/* Fleet Operations Live Dashboard */}
      <LiveDashboard />

      {/* Rooftop Participant Portal (Household / MSME / Institutional) */}
      <UserPortal />

      {/* Future Products & Grid Integration Roadmap */}
      <FutureProducts />

      {/* National Policy Alignment & Credibility */}
      <ImpactAndCredibility />
    </div>
  );
};

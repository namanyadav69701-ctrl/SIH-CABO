import React from 'react';
import { Shield, ArrowUp, Activity, Terminal, Mail, MapPin } from 'lucide-react';

interface FooterProps {
  onOpenTerminal?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenTerminal }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#1A1A1A] text-[#F5F2ED] border-t border-[#1A1A1A] font-mono">
      {/* Artistic Marquee Ticker Bar from Design Spec */}
      <div className="h-14 border-b border-white/10 flex items-center px-4 sm:px-8 bg-black text-white text-[10px] uppercase tracking-[0.2em] overflow-hidden">
        <div className="flex gap-12 whitespace-nowrap animate-marquee">
          <span>Solar to Credits Pipeline: [Measure] → [Verify] → [Calculate] → [Aggregate] → [Validate] → [Monetize]</span>
          <span className="opacity-40">::</span>
          <span>Data Integrity Layer: HMAC-SHA256 Signed Device Identity</span>
          <span className="opacity-40">::</span>
          <span>Pilot Region: MP Central - Zone 4 Active</span>
          <span className="opacity-40">::</span>
          <span>CEA Grid Baseline: 0.716 kg CO₂/kWh</span>
          <span className="opacity-40">::</span>
          <span>Digital MRV Protocol v2.4 Compliant</span>
          <span className="opacity-40">::</span>
          {/* Duplicate loop for smooth continuous marquee */}
          <span>Solar to Credits Pipeline: [Measure] → [Verify] → [Calculate] → [Aggregate] → [Validate] → [Monetize]</span>
          <span className="opacity-40">::</span>
          <span>Data Integrity Layer: HMAC-SHA256 Signed Device Identity</span>
          <span className="opacity-40">::</span>
          <span>Pilot Region: MP Central - Zone 4 Active</span>
          <span className="opacity-40">::</span>
          <span>CEA Grid Baseline: 0.716 kg CO₂/kWh</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 pb-12 border-b border-white/10">
          {/* Brand & Mission */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl font-black tracking-tighter text-white">
                CABO
              </span>
              <span className="text-[10px] uppercase tracking-widest px-2 py-0.5 bg-[#2D4F36] text-white font-semibold">
                dMRV PROTOCOL
              </span>
            </div>

            <p className="text-xs text-white/70 leading-relaxed max-w-md font-sans">
              CABO builds digital measurement, reporting, and verification (dMRV) infrastructure
              connecting distributed rooftop solar across India with voluntary and compliance carbon markets.
            </p>

            <div className="text-[10px] uppercase tracking-wider text-white/50 space-y-1.5 pt-1">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#C88C32]" />
                <span>Pilot Operational Base: Indore & Bhopal, Madhya Pradesh, India</span>
              </div>
              <div className="flex items-center gap-2">
                <Activity className="w-3.5 h-3.5 text-[#00FF00]" />
                <span>Baseline Standard: CEA India CO₂ Database (0.716 kg/kWh)</span>
              </div>
            </div>
          </div>

          {/* Nav Directory */}
          <div className="md:col-span-3 space-y-2 text-xs">
            <div className="text-[10px] font-bold text-white uppercase tracking-widest pb-2 border-b border-white/10">
              SYSTEM MODULES
            </div>
            <ul className="space-y-1.5 text-[11px] text-white/60 tracking-wider">
              <li><a href="#problem" className="hover:text-white transition-colors">01 · The Market Barrier</a></li>
              <li><a href="#system" className="hover:text-white transition-colors">02 · End-to-End Flow</a></li>
              <li><a href="#hardware" className="hover:text-white transition-colors">03 · The CABO Meter</a></li>
              <li><a href="#verify" className="hover:text-white transition-colors">04 · CABO Verify (dMRV)</a></li>
              <li><a href="#dashboard" className="hover:text-white transition-colors">05 · Operations Dashboard</a></li>
              <li><a href="#pipeline" className="hover:text-white transition-colors">06 · 7-Stage Pipeline</a></li>
              <li><a href="#network" className="hover:text-white transition-colors">07 · MP Pilot Network</a></li>
              <li><a href="#portal" className="hover:text-white transition-colors">08 · Participant Portal</a></li>
              <li><a href="#technology" className="hover:text-white transition-colors">09 · SIH Tech Stack</a></li>
              <li><a href="#roadmap" className="hover:text-white transition-colors">10 · Product Roadmap</a></li>
            </ul>
          </div>

          {/* Regulatory Notice & Quick Inspect */}
          <div className="md:col-span-4 space-y-4 text-xs">
            <div className="text-[10px] font-bold text-white uppercase tracking-widest pb-2 border-b border-white/10">
              AUDIT & REGULATORY INTEGRITY
            </div>
            <p className="text-[11px] text-white/60 leading-relaxed font-sans">
              CABO does not independently certify or mint carbon credits. CABO automates physical measurement,
              data integrity, and verification workflows. All credit issuances require independent third-party
              validation (VVB audit) in accordance with accredited carbon standard registries.
            </p>

            {onOpenTerminal && (
              <button
                type="button"
                onClick={onOpenTerminal}
                className="w-full flex items-center justify-center gap-2 py-2 px-3 bg-white/10 hover:bg-[#2D4F36] text-white border border-white/20 text-[10px] font-mono uppercase tracking-widest transition-colors"
              >
                <Terminal className="w-3.5 h-3.5 text-[#00FF00]" />
                <span>INSPECT RAW NODE MP-0247 TELEMETRY</span>
              </button>
            )}

            <div className="text-[9px] uppercase tracking-widest text-white/40">
              Built for Smart India Hackathon & Indian Clean Energy Stakeholders
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-wrap items-center justify-between gap-4 text-[10px] uppercase tracking-widest text-white/50">
          <div>
            © {new Date().getFullYear()} CABO Clean Energy Infrastructure Technologies.
          </div>
          <div className="flex items-center gap-4">
            <span>DATA STATUS: DEMO TELEMETRY</span>
            <span>·</span>
            <button
              type="button"
              onClick={scrollToTop}
              className="hover:text-white flex items-center gap-1 transition-colors"
            >
              <span>BACK TO TOP</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

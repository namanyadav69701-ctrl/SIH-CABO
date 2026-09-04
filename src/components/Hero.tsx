import React, { useState, useEffect } from 'react';
import { ArrowDown, Radio, CheckCircle2, Shield, Zap, RefreshCw, Layers } from 'lucide-react';
import { INITIAL_NODE_TELEMETRY } from '../data/caboData';

interface HeroProps {
  onExploreSystem?: () => void;
  onViewDemo?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreSystem, onViewDemo }) => {
  const [telemetry, setTelemetry] = useState(INITIAL_NODE_TELEMETRY);
  const [pulseCount, setPulseCount] = useState(0);

  // Realistic subtle telemetry fluctuation every 2.5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setPulseCount((prev) => prev + 1);
      setTelemetry((prev) => {
        // Minor realistic solar variance (±0.04 kW)
        const delta = (Math.random() * 0.08 - 0.04);
        const newKw = Math.max(4.65, Math.min(5.15, Number((prev.outputKw + delta).toFixed(2))));
        const newVoltage = Number((230 + Math.random() * 3.5 - 1.5).toFixed(1));
        const newCurrent = Number((newKw * 1000 / newVoltage).toFixed(1));
        return {
          ...prev,
          outputKw: newKw,
          voltageV: newVoltage,
          currentA: newCurrent,
        };
      });
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative border-b border-[#1A1A1A]/20 bg-[#F5F2ED] overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-20">
      {/* Subtle background tech dot matrix */}
      <div className="absolute inset-0 tech-dot-pattern opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Technical Metadata Bar */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-6 border-b border-[#1A1A1A]/20 text-[10px] font-mono uppercase tracking-widest text-[#1A1A1A]/60 mb-8 lg:mb-12">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-[#2D4F36]"></span>
            <span>SYSTEM SPEC: DIGITAL MRV (dMRV) PROTOCOL V2.4</span>
          </div>
          <div className="flex items-center gap-4">
            <span>TARGET: DISTRIBUTED ROOFTOP SOLAR (1kW – 100kW)</span>
            <span className="hidden sm:inline text-[#1A1A1A]/30">/</span>
            <span className="hidden sm:inline">PILOT DEPLOYMENT: MP-DISCOM (WEST & CENTRAL)</span>
          </div>
        </div>

        {/* Hero Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Strong Editorial Typography */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-white text-[#1A1A1A] border border-[#1A1A1A]/20 text-[10px] font-mono uppercase tracking-widest font-semibold">
              <span className="w-1.5 h-1.5 bg-[#C88C32] rounded-full"></span>
              Decentralized Energy Infrastructure
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-7xl tracking-tighter text-[#1A1A1A] font-black leading-[0.92]">
              EVERY ROOFTOP<br />
              CAN BECOME<br />
              A MEASURABLE<br />
              <span className="text-[#2D4F36]">
                CLIMATE ASSET.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-[#1A1A1A]/80 leading-relaxed max-w-2xl">
              CABO builds the measurement and verification infrastructure that helps
              distributed rooftop solar participate in carbon markets. By pairing non-invasive
              IoT sensing with multi-source computer vision verification, we turn millions of
              unmonitored solar roofs into institutional-grade carbon reduction records.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <a
                href="#system"
                onClick={onExploreSystem}
                className="inline-flex items-center justify-center gap-2 text-[11px] font-mono uppercase tracking-widest px-6 py-3.5 bg-[#2D4F36] text-white hover:bg-[#233f2b] transition-colors"
              >
                <span>EXPLORE THE SYSTEM</span>
                <ArrowDown className="w-4 h-4" />
              </a>

              <a
                href="#verify"
                onClick={onViewDemo}
                className="inline-flex items-center justify-center gap-2 text-[11px] font-mono uppercase tracking-widest px-6 py-3.5 bg-transparent text-[#1A1A1A] hover:bg-white border border-[#1A1A1A] transition-colors"
              >
                <span>VIEW LIVE DEMO</span>
                <Zap className="w-4 h-4 text-[#C88C32]" />
              </a>
            </div>

            {/* Institutional Trust Footnote */}
            <div className="pt-4 grid grid-cols-3 gap-4 border-t border-[#1A1A1A]/20 text-[10px] font-mono uppercase tracking-widest text-[#1A1A1A]/60">
              <div>
                <div className="text-[#1A1A1A]/40">Data Standard</div>
                <div className="font-bold text-[#1A1A1A] mt-0.5">CEA India Grid Baseline</div>
              </div>
              <div>
                <div className="text-[#1A1A1A]/40">Target Audience</div>
                <div className="font-bold text-[#1A1A1A] mt-0.5">MSMEs, Homes, Schools</div>
              </div>
              <div>
                <div className="text-[#1A1A1A]/40">Verification</div>
                <div className="font-bold text-[#1A1A1A] mt-0.5">Multi-Source dMRV</div>
              </div>
            </div>
          </div>

          {/* Right Column: Industrial Live Solar Meter HUD */}
          <div className="lg:col-span-5">
            <div className="border-2 border-[#1A1A1A] bg-[#1A1A1A] text-[#F5F2ED] shadow-none overflow-hidden">
              {/* Meter Terminal Top Header */}
              <div className="bg-black px-4 py-2.5 border-b border-white/10 flex items-center justify-between text-[10px] font-mono uppercase tracking-widest">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#C88C32] animate-pulse"></div>
                  <span className="font-bold tracking-wider text-white">
                    CABO / NODE MP-0247
                  </span>
                </div>
                <div className="flex items-center gap-2 text-white/60">
                  <Radio className="w-3.5 h-3.5 text-[#00FF00]" />
                  <span className="text-[#00FF00] font-medium">CELLULAR ●</span>
                  <span className="text-[9px] text-white/40">(-72 dBm)</span>
                </div>
              </div>

              {/* Meter Main Display Matrix */}
              <div className="p-5 sm:p-6 space-y-6">
                {/* Instantaneous Generation Dial / Readout */}
                <div className="border border-white/10 bg-white/5 p-4">
                  <div className="flex justify-between items-baseline mb-1">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-white/60">
                      SOLAR OUTPUT
                    </span>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#00FF00] flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00FF00]"></span>
                      ACTIVE POWER (kW)
                    </span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl sm:text-5xl font-mono font-bold text-white tracking-tight tabular-nums">
                      {telemetry.outputKw.toFixed(2)}
                    </span>
                    <span className="text-lg font-mono text-[#C88C32] font-semibold">kW</span>
                  </div>

                  {/* Electrical Characteristics Bar */}
                  <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-white/10 text-[10px] font-mono text-white/70">
                    <div>
                      <span className="text-white/40 block text-[9px] uppercase tracking-wider">Voltage</span>
                      <span className="tabular-nums font-medium text-white">{telemetry.voltageV} V</span>
                    </div>
                    <div>
                      <span className="text-white/40 block text-[9px] uppercase tracking-wider">Current</span>
                      <span className="tabular-nums font-medium text-white">{telemetry.currentA} A</span>
                    </div>
                    <div>
                      <span className="text-white/40 block text-[9px] uppercase tracking-wider">Grid Freq</span>
                      <span className="tabular-nums font-medium text-white">{telemetry.gridFreqHz} Hz</span>
                    </div>
                  </div>
                </div>

                {/* Daily Cumulative & Carbon Avoided */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="border border-white/10 bg-white/5 p-3.5">
                    <span className="text-[9px] font-mono uppercase tracking-widest text-white/60 block mb-1">
                      TODAY
                    </span>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-2xl sm:text-3xl font-mono font-bold text-white tabular-nums">
                        {telemetry.kwhToday}
                      </span>
                      <span className="text-xs font-mono text-white/60">kWh</span>
                    </div>
                    <span className="text-[9px] text-white/40 font-mono block mt-1 uppercase tracking-wider">
                      Target: 26.5 kWh/day
                    </span>
                  </div>

                  <div className="border border-white/10 bg-white/5 p-3.5">
                    <span className="text-[9px] font-mono uppercase tracking-widest text-white/60 block mb-1">
                      CO₂ AVOIDED
                    </span>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-2xl sm:text-3xl font-mono font-bold text-[#00FF00] tabular-nums">
                        {telemetry.co2AvoidedKg}
                      </span>
                      <span className="text-xs font-mono text-white/60">kg</span>
                    </div>
                    <span className="text-[9px] text-white/40 font-mono block mt-1 uppercase tracking-wider">
                      CEA Baseline Factor
                    </span>
                  </div>
                </div>

                {/* Cryptographic Signature Verification Badge */}
                <div className="p-3 bg-white/5 border border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <Shield className="w-4 h-4 text-[#00FF00] shrink-0" />
                    <div>
                      <div className="text-[10px] font-mono uppercase tracking-wider font-semibold text-white flex items-center gap-2">
                        <span>SIGNATURE: VERIFIED</span>
                        <span className="text-[9px] font-normal text-[#00FF00] px-1 bg-white/10">
                          HMAC-SHA256
                        </span>
                      </div>
                      <div className="text-[9px] font-mono text-white/60 truncate max-w-[200px] sm:max-w-[240px]">
                        {telemetry.signature}
                      </div>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-[9px] font-mono uppercase tracking-wider text-[#00FF00] block">VALIDATED</span>
                    <span className="text-[8px] font-mono text-white/40">Packet #{pulseCount + 1042}</span>
                  </div>
                </div>

                {/* Subtext info */}
                <div className="pt-1 flex items-center justify-between text-[9px] font-mono uppercase tracking-widest text-white/40 border-t border-white/10">
                  <span>SANWER INDUSTRIAL ZONE, INDORE</span>
                  <span>TIME: 11:42:31 IST</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

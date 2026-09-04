import React from 'react';
import {
  Layers,
  Network,
  CreditCard,
  FileCheck,
  ArrowRight,
  TrendingUp,
  Cpu,
  ShieldCheck,
  Building
} from 'lucide-react';
import { FUTURE_PRODUCTS } from '../data/caboData';

export const FutureProducts: React.FC = () => {
  return (
    <section id="roadmap" className="py-16 lg:py-24 border-b border-[#1A1A1A]/20 bg-[#F5F2ED]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-[#2D4F36] font-bold mb-2">
            <span className="w-1.5 h-1.5 bg-[#2D4F36]"></span>
            10 / Product Lab & Future Horizons
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tighter text-[#1A1A1A] leading-[0.98]">
            FUTURE EXTENSIONS: BEYOND CARBON CREDITS
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#1A1A1A]/80 leading-relaxed">
            High-integrity digital telemetry at the inverter terminal creates an unprecedented foundation
            for modern energy infrastructure. These three initiatives represent CABO’s technical roadmap
            to empower state DISCOMs, financial institutions, and exporting MSMEs.
          </p>
          <div className="mt-4 inline-block text-[10px] font-mono uppercase tracking-widest px-3 py-1 bg-white text-[#1A1A1A] border border-[#1A1A1A]/20 font-bold">
            STATUS: ACTIVE R&D ROADMAP (NOT YET COMMERCIALLY DEPLOYED)
          </div>
        </div>

        {/* 3 Future Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {FUTURE_PRODUCTS.map((prod) => (
            <div
              key={prod.id}
              className="border-2 border-[#1A1A1A] bg-white p-6 sm:p-7 flex flex-col justify-between shadow-none"
            >
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-[#1A1A1A]/10 mb-4">
                  <span className="text-[9px] font-mono font-bold text-[#C88C32] uppercase tracking-widest">
                    {prod.tag}
                  </span>
                  <span className="w-2 h-2 bg-[#C88C32]"></span>
                </div>

                <h3 className="text-xl font-bold font-mono text-[#1A1A1A] uppercase tracking-tight mb-2">
                  {prod.name}
                </h3>

                <p className="text-xs text-[#1A1A1A]/80 leading-relaxed mb-6">
                  {prod.summary}
                </p>

                {/* Target Stakeholders */}
                <div className="mb-4">
                  <span className="text-[9px] font-mono uppercase font-bold text-[#1A1A1A]/60 tracking-widest block mb-1.5">
                    Target Stakeholders
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {prod.targetAudience.map((aud, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 bg-[#F5F2ED] border border-[#1A1A1A]/20 text-[9px] font-mono uppercase tracking-wider text-[#1A1A1A] font-bold"
                      >
                        {aud}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Technical Architecture */}
                <div className="p-3 bg-[#F5F2ED] border border-[#1A1A1A]/20 mb-4 text-xs font-mono">
                  <span className="text-[9px] text-[#1A1A1A]/60 uppercase font-bold tracking-widest block mb-1">
                    System Architecture
                  </span>
                  <p className="text-[11px] text-[#1A1A1A]/90 leading-relaxed">
                    {prod.architecture}
                  </p>
                </div>
              </div>

              {/* Key Indicators */}
              <div className="pt-4 border-t border-[#1A1A1A]/10">
                <span className="text-[9px] font-mono uppercase font-bold text-[#1A1A1A]/60 tracking-widest block mb-2">
                  Strategic Outcomes
                </span>
                <ul className="space-y-1 text-xs font-mono text-[#2D4F36]">
                  {prod.keyMetrics.map((met, i) => (
                    <li key={i} className="flex items-start gap-1.5 text-[11px]">
                      <span className="text-[#C88C32] font-bold">→</span>
                      <span>{met}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

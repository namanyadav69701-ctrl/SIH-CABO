import React, { useState } from 'react';
import {
  Cpu,
  Eye,
  Server,
  Binary,
  BarChart3,
  Monitor,
  CheckCircle2,
  Layers,
  Terminal,
  Code
} from 'lucide-react';
import { TECH_STACK } from '../data/caboData';

export const TechArchitecture: React.FC = () => {
  const [selectedLayerIndex, setSelectedLayerIndex] = useState<number>(0);

  const activeLayer = TECH_STACK[selectedLayerIndex];

  return (
    <section id="technology" className="py-16 lg:py-24 border-b border-[#1A1A1A]/20 bg-[#F5F2ED]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-[#2D4F36] font-bold mb-2">
            <span className="w-1.5 h-1.5 bg-[#2D4F36]"></span>
            11 / Full-Stack Engineering
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tighter text-[#1A1A1A] leading-[0.98]">
            BUILT FOR REAL-WORLD DEPLOYMENT
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#1A1A1A]/80 leading-relaxed">
            Every layer of the CABO infrastructure is engineered for resilience against voltage transients,
            cellular network dropouts, and strict carbon audit requirements. Designed for Smart India Hackathon
            field validation and commercial deployment.
          </p>
        </div>

        {/* Interactive Layer Selector Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mb-8">
          {TECH_STACK.map((item, idx) => {
            const isSelected = selectedLayerIndex === idx;
            return (
              <button
                key={item.layer}
                type="button"
                onClick={() => setSelectedLayerIndex(idx)}
                className={`p-3 border text-left transition-all flex flex-col justify-between h-24 font-mono ${
                  isSelected
                    ? 'bg-[#2D4F36] text-white border-2 border-[#1A1A1A] shadow-none'
                    : 'bg-white text-[#1A1A1A] border border-[#1A1A1A]/20 hover:bg-[#F5F2ED]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`text-[9px] uppercase font-bold tracking-widest ${
                      isSelected ? 'text-[#C88C32]' : 'text-[#1A1A1A]/50'
                    }`}
                  >
                    0{idx + 1}
                  </span>
                  <span
                    className={`text-[8px] uppercase tracking-widest ${
                      isSelected ? 'text-white' : 'text-[#1A1A1A]/60'
                    }`}
                  >
                    {item.layer}
                  </span>
                </div>
                <div className="text-xs font-bold leading-tight uppercase tracking-tight">
                  {item.title}
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Layer In-Depth Technical Specification Box */}
        <div className="border-2 border-[#1A1A1A] bg-white p-6 sm:p-8 shadow-none">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#1A1A1A]/10">
            <div>
              <span className="text-[10px] font-mono text-[#C88C32] font-bold uppercase tracking-widest block">
                SUBSYSTEM ARCHITECTURE SPECIFICATION · LAYER 0{selectedLayerIndex + 1}
              </span>
              <h3 className="text-xl sm:text-2xl font-bold font-mono text-[#1A1A1A] uppercase tracking-tight">
                {activeLayer.layer}: {activeLayer.title}
              </h3>
            </div>
            <span className="text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 bg-[#F5F2ED] text-[#1A1A1A] border border-[#1A1A1A]/20 font-bold">
              PRODUCTION SPECIFICATION
            </span>
          </div>

          <div className="py-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left: Technologies Tag Cloud & Role */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <span className="text-[10px] font-mono uppercase font-bold text-[#1A1A1A]/60 tracking-widest block mb-2">
                  TECHNOLOGIES & FRAMEWORKS
                </span>
                <div className="flex flex-wrap gap-2">
                  {activeLayer.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 bg-[#F5F2ED] border border-[#1A1A1A]/20 font-mono font-bold text-xs text-[#2D4F36] uppercase tracking-wider"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-[10px] font-mono uppercase font-bold text-[#1A1A1A]/60 tracking-widest block mb-1">
                  CORE RESPONSIBILITY
                </span>
                <p className="text-xs text-[#1A1A1A]/80 leading-relaxed">
                  {activeLayer.role}
                </p>
              </div>
            </div>

            {/* Right: Field Deployment Constraints & Ruggedization Notes */}
            <div className="lg:col-span-6 border border-[#1A1A1A]/20 bg-[#F5F2ED] p-5 space-y-4 font-mono text-xs">
              <div className="flex items-center gap-2 text-[#2D4F36] font-bold uppercase tracking-wider border-b border-[#1A1A1A]/10 pb-2 text-[10px]">
                <CheckCircle2 className="w-4 h-4 text-[#2D4F36]" />
                <span>FIELD HARDENING & PRODUCTION RESILIENCE</span>
              </div>
              <p className="text-[#1A1A1A]/80 leading-relaxed text-xs">
                {activeLayer.productionReadyNotes}
              </p>
              <div className="pt-2 border-t border-[#1A1A1A]/10 text-[10px] text-[#1A1A1A]/60 flex justify-between uppercase tracking-widest">
                <span>BENCH TEST: PASS</span>
                <span>FAILSAFE: AUTO-ROLLBACK</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

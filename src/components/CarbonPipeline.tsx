import React, { useState } from 'react';
import {
  Gauge,
  CheckCircle2,
  Calculator,
  Layers,
  Award,
  TrendingUp,
  Banknote,
  ArrowRight,
  ShieldAlert,
  FileCheck2
} from 'lucide-react';
import { PIPELINE_STEPS } from '../data/caboData';

export const CarbonPipeline: React.FC = () => {
  const [selectedStep, setSelectedStep] = useState<number>(0);

  const stepIcons = [Gauge, CheckCircle2, Calculator, Layers, Award, TrendingUp, Banknote];

  return (
    <section id="pipeline" className="py-16 lg:py-24 border-b border-[#1A1A1A]/20 bg-[#F5F2ED]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-[#2D4F36] font-bold mb-2">
            <span className="w-1.5 h-1.5 bg-[#2D4F36]"></span>
            07 / Carbon Methodology
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tighter text-[#1A1A1A] leading-[0.98]">
            THE 7-STAGE DIGITAL MRV & CARBON PIPELINE
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#1A1A1A]/80 leading-relaxed">
            From raw current sensing at the inverter terminals to certified carbon offset retirement
            and direct banking revenue sharing, CABO bridges small solar systems to institutional carbon finance.
          </p>
        </div>

        {/* Visual Pipeline Bar / Flow */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 mb-8">
          {PIPELINE_STEPS.map((step, idx) => {
            const Icon = stepIcons[idx];
            const isCurrent = selectedStep === idx;
            return (
              <div
                key={step.id}
                onClick={() => setSelectedStep(idx)}
                className={`cursor-pointer p-3 border transition-all flex flex-col justify-between h-32 text-left ${
                  isCurrent
                    ? 'border-2 border-[#1A1A1A] bg-[#2D4F36] text-white shadow-none'
                    : 'border border-[#1A1A1A]/20 bg-white text-[#1A1A1A] hover:bg-[#F5F2ED]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`text-[9px] font-mono font-bold uppercase tracking-widest ${
                      isCurrent ? 'text-[#C88C32]' : 'text-[#1A1A1A]/50'
                    }`}
                  >
                    STEP {step.number}
                  </span>
                  <Icon
                    className={`w-4 h-4 ${isCurrent ? 'text-[#C88C32]' : 'text-[#1A1A1A]/60'}`}
                  />
                </div>

                <div>
                  <div className="font-mono font-bold text-xs uppercase tracking-tight">
                    {step.title}
                  </div>
                  <div
                    className={`text-[10px] line-clamp-2 mt-0.5 ${
                      isCurrent ? 'text-white/80' : 'text-[#1A1A1A]/70'
                    }`}
                  >
                    {step.subtitle}
                  </div>
                </div>

                <div
                  className={`text-[8px] font-mono uppercase tracking-widest ${
                    isCurrent ? 'text-white' : 'text-[#1A1A1A]/50'
                  }`}
                >
                  {isCurrent ? '● ACTIVE' : 'VIEW →'}
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Step Detailed Dossier */}
        <div className="border-2 border-[#1A1A1A] bg-white p-6 sm:p-8 shadow-none">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#1A1A1A]/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#1A1A1A] text-[#C88C32] flex items-center justify-center font-mono font-bold text-lg">
                {PIPELINE_STEPS[selectedStep].number}
              </div>
              <div>
                <span className="text-[10px] font-mono text-[#C88C32] font-bold uppercase tracking-widest block">
                  PIPELINE STAGE SPECIFICATION
                </span>
                <h3 className="text-xl sm:text-2xl font-bold font-mono text-[#1A1A1A] uppercase tracking-tight">
                  {PIPELINE_STEPS[selectedStep].title}: {PIPELINE_STEPS[selectedStep].subtitle}
                </h3>
              </div>
            </div>

            <div className="text-right text-[10px] font-mono text-[#1A1A1A]/60 uppercase tracking-widest">
              <span>METHODOLOGY: UNFCCC AMS-I.D / ACM0002 / CEA</span>
            </div>
          </div>

          <div className="py-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-[#F5F2ED] border border-[#1A1A1A]/20">
              <div className="text-[10px] font-mono text-[#1A1A1A]/70 uppercase font-bold tracking-widest mb-1 flex items-center gap-1.5">
                <Calculator className="w-3.5 h-3.5 text-[#2D4F36]" />
                <span>Methodological Execution</span>
              </div>
              <p className="text-xs text-[#1A1A1A]/80 leading-relaxed mt-2">
                {PIPELINE_STEPS[selectedStep].methodology}
              </p>
            </div>

            <div className="p-4 bg-[#F5F2ED] border border-[#1A1A1A]/20">
              <div className="text-[10px] font-mono text-[#1A1A1A]/70 uppercase font-bold tracking-widest mb-1 flex items-center gap-1.5">
                <FileCheck2 className="w-3.5 h-3.5 text-[#2D4F36]" />
                <span>Data Artifact & Audit Trail</span>
              </div>
              <p className="text-xs text-[#2D4F36] font-mono font-medium leading-relaxed mt-2">
                {PIPELINE_STEPS[selectedStep].dataArtifact}
              </p>
            </div>

            <div className="p-4 bg-[#F5F2ED] border border-[#1A1A1A]/20">
              <div className="text-[10px] font-mono text-[#1A1A1A]/70 uppercase font-bold tracking-widest mb-1 flex items-center gap-1.5">
                <ShieldAlert className="w-3.5 h-3.5 text-[#C88C32]" />
                <span>Validation Gate & Standard</span>
              </div>
              <p className="text-xs text-[#1A1A1A]/80 leading-relaxed mt-2">
                {PIPELINE_STEPS[selectedStep].validationGate}
              </p>
            </div>
          </div>

          {/* Bottom Progress Controls */}
          <div className="pt-4 border-t border-[#1A1A1A]/10 flex items-center justify-between text-xs font-mono">
            <div className="text-[#1A1A1A]/60 text-[10px] uppercase tracking-widest">
              CABO DIGITAL MRV SUITE · AUDIT STAGE {selectedStep + 1} OF 7
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                disabled={selectedStep === 0}
                onClick={() => setSelectedStep((prev) => Math.max(0, prev - 1))}
                className="px-3 py-1.5 border border-[#1A1A1A]/20 bg-white text-[10px] font-mono uppercase tracking-widest font-bold disabled:opacity-30 hover:bg-[#1A1A1A] hover:text-white transition-colors"
              >
                ← PREV
              </button>
              <button
                type="button"
                disabled={selectedStep === PIPELINE_STEPS.length - 1}
                onClick={() => setSelectedStep((prev) => Math.min(PIPELINE_STEPS.length - 1, prev + 1))}
                className="px-3 py-1.5 border border-[#1A1A1A] bg-[#1A1A1A] text-white text-[10px] font-mono uppercase tracking-widest font-bold disabled:opacity-30 hover:bg-[#2D4F36] transition-colors"
              >
                NEXT →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

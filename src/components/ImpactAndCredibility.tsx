import React from 'react';
import {
  Sun,
  Shield,
  FileText,
  TrendingUp,
  Scale,
  CheckCircle2,
  AlertCircle,
  Building,
  Target
} from 'lucide-react';

export const ImpactAndCredibility: React.FC = () => {
  return (
    <section className="py-16 lg:py-24 border-b border-[#1A1A1A]/20 bg-[#F5F2ED]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-[#2D4F36] font-bold mb-2">
            <span className="w-1.5 h-1.5 bg-[#2D4F36]"></span>
            12 / National Context & Strategic Alignment
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tighter text-[#1A1A1A] leading-[0.98]">
            ALIGNING ROOFTOP SOLAR WITH INDIA'S CLIMATE COMMITMENTS
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#1A1A1A]/80 leading-relaxed">
            India’s clean-energy transition is accelerating through visionary initiatives like PM Surya Ghar: Muft Bijli Yojana.
            CABO provides the missing measurement layer to ensure that millions of distributed solar installations
            are accurately quantified for regional carbon accounting and long-term economic value.
          </p>
        </div>

        {/* 3 Strategic Alignments */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="border-2 border-[#1A1A1A] bg-white p-6 shadow-none">
            <div className="flex items-center gap-2 text-[9px] font-mono text-[#C88C32] font-bold uppercase tracking-widest mb-2">
              <Sun className="w-3.5 h-3.5" />
              <span>National Program</span>
            </div>
            <h3 className="text-lg font-bold font-mono text-[#1A1A1A] uppercase tracking-tight mb-2">
              PM Surya Ghar: Muft Bijli Yojana
            </h3>
            <p className="text-xs text-[#1A1A1A]/80 leading-relaxed">
              Targeting 10 million (1 Crore) residential rooftop solar systems across India. By offering
              automated, zero-cost digital MRV, CABO transforms these micro-generators into an aggregated,
              verifiable national carbon asset without burdening homeowners with paperwork.
            </p>
          </div>

          <div className="border-2 border-[#1A1A1A] bg-white p-6 shadow-none">
            <div className="flex items-center gap-2 text-[9px] font-mono text-[#C88C32] font-bold uppercase tracking-widest mb-2">
              <Scale className="w-3.5 h-3.5" />
              <span>Market Framework</span>
            </div>
            <h3 className="text-lg font-bold font-mono text-[#1A1A1A] uppercase tracking-tight mb-2">
              India's Carbon Credit Scheme (CCTS)
            </h3>
            <p className="text-xs text-[#1A1A1A]/80 leading-relaxed">
              As the Bureau of Energy Efficiency (BEE) and Ministry of Power develop India’s domestic compliance
              and voluntary carbon market, CABO’s data pipelines are structured to produce compliant,
              tamper-evident digital dossiers suitable for accredited registry integration.
            </p>
          </div>

          <div className="border-2 border-[#1A1A1A] bg-white p-6 shadow-none">
            <div className="flex items-center gap-2 text-[9px] font-mono text-[#C88C32] font-bold uppercase tracking-widest mb-2">
              <Target className="w-3.5 h-3.5" />
              <span>Emission Factor Basis</span>
            </div>
            <h3 className="text-lg font-bold font-mono text-[#1A1A1A] uppercase tracking-tight mb-2">
              CEA Baseline Database v19
            </h3>
            <p className="text-xs text-[#1A1A1A]/80 leading-relaxed">
              Every avoided carbon calculation directly uses the Central Electricity Authority’s published
              grid emission factor (0.716 kg CO₂/kWh for the Indian national grid), ensuring objective mathematical
              rigor recognized by domestic and international climate finance bodies.
            </p>
          </div>
        </div>

        {/* Clear Trust & Non-Exaggeration Statement */}
        <div className="p-6 sm:p-8 bg-white border-2 border-[#1A1A1A] shadow-none">
          <div className="flex items-center gap-2 text-[10px] font-mono font-bold text-[#1A1A1A] uppercase tracking-widest mb-3">
            <AlertCircle className="w-4 h-4 text-[#C88C32]" />
            COMMITMENT TO INSTITUTIONAL INTEGRITY
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-[#1A1A1A]/80 leading-relaxed">
            <div>
              <p>
                <strong>Transparent Claims:</strong> CABO does not claim proprietary carbon credit issuance rights or pre-mature government certification. All figures presented in the dashboard represent prototype pilot telemetry and engineering simulations from our Madhya Pradesh deployment pipeline.
              </p>
            </div>
            <div>
              <p>
                <strong>Methodology Compliance:</strong> Credit issuance requires independent third-party validation by accredited Designated Operational Entities (DOEs) and registration under approved carbon standards. CABO’s mission is solely to build the robust physical and digital telemetry that makes such verification scalable and audit-ready.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

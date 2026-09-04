import React, { useState } from 'react';
import {
  Sun,
  Cpu,
  Gauge,
  Leaf,
  ShieldCheck,
  CheckCheck,
  Layers,
  TrendingUp,
  Banknote,
  ArrowDown,
  Info
} from 'lucide-react';

export const CaboSystem: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      id: 'solar',
      title: 'ROOFTOP SOLAR',
      subtitle: 'Photovoltaic Array',
      icon: Sun,
      category: 'PHYSICAL GENERATION',
      description: 'Distributed rooftop installations (1 kW to 100 kW) across residential roofs, small industrial sheds, commercial complexes, and institutions.',
      techSpec: 'Monocrystalline / Polycrystalline panels, 415V 3-phase or 230V 1-phase AC generation through grid-tied inverter.',
      dataOutput: 'Raw alternating current output connected to customer distribution board (DB).',
    },
    {
      id: 'hardware',
      title: 'CABO IoT DEVICE',
      subtitle: 'Plug-and-Play Meter',
      icon: Cpu,
      category: 'EDGE SENSING',
      description: 'Self-contained industrial telemetry hardware equipped with non-invasive split-core current transformers (CT clamps) and 4G LTE-M / GSM cellular.',
      techSpec: 'Class 0.5S active power sampling, ATECC608 secure element, independent of client Wi-Fi.',
      dataOutput: '1-minute encrypted, signed telemetry payloads containing True RMS power, voltage, current, frequency.',
    },
    {
      id: 'measurement',
      title: 'ENERGY MEASUREMENT',
      subtitle: 'High-Precision Sampling',
      icon: Gauge,
      category: 'DIGITAL TELEMETRY',
      description: 'Continuous active energy monitoring measuring real output (kWh) with sub-second accuracy and tamper detection.',
      techSpec: '100 Hz waveform sampling, local 30-day circular buffer storage in case of cellular outage.',
      dataOutput: 'Active generation curves matched against local grid voltage variations.',
    },
    {
      id: 'calculation',
      title: 'CO₂ AVOIDED CALCULATION',
      subtitle: 'Grid Displacement Math',
      icon: Leaf,
      category: 'EMISSION METHODOLOGY',
      description: 'Converts kilowatt-hours into avoided carbon dioxide equivalent using the Central Electricity Authority (CEA) of India Baseline Emission Database.',
      techSpec: 'Standard Factor: 0.716 kg CO₂e / kWh displaced from the coal-dominated national grid.',
      dataOutput: 'Hourly and cumulative avoided emissions metrics tagged with unique system UUID.',
    },
    {
      id: 'dmrv',
      title: 'SECURE DATA / dMRV',
      subtitle: 'Digital MRV Engine',
      icon: ShieldCheck,
      category: 'DATA INTEGRITY',
      description: 'Automated ingestion engine that indexes signed packets, calculates SHA-256 hashes, and prepares tamper-evident cryptographic proofs.',
      techSpec: 'HMAC-SHA256 device key validation, TimescaleDB time-series indexing, zero manual spreadsheet entry.',
      dataOutput: 'Verifiable time-series audit trail accessible to third-party auditors.',
    },
    {
      id: 'verification',
      title: 'VERIFICATION WORKFLOW',
      subtitle: 'Multi-Source Triangulation',
      icon: CheckCheck,
      category: 'QUALITY ASSURANCE',
      description: 'Cross-checks CT clamp measurements against inverter optical display OCR, Modbus RS-485 telemetry, and satellite solar insolation models.',
      techSpec: 'OpenCV + YOLO + CRNN display text recognition; anomaly detection flagging deviations >3%.',
      dataOutput: 'Verification Confidence Score (typically >99%) attached to each daily generation lot.',
    },
    {
      id: 'aggregation',
      title: 'AGGREGATION',
      subtitle: 'Micro-Generation Pooling',
      icon: Layers,
      category: 'PORTFOLIO STRUCTURING',
      description: 'Pools hundreds of individual rooftop installations into unified regional tranches meeting institutional registry volume requirements (500 kW+).',
      techSpec: 'Merkle tree batch rollup anchoring thousands of leaf readings into an immutable batch root.',
      dataOutput: 'Standardized Project Data Dossier (PDD) with audited sub-meter allocation keys.',
    },
    {
      id: 'market',
      title: 'CARBON CREDIT MARKET',
      subtitle: 'Accredited Issuance & Sale',
      icon: TrendingUp,
      category: 'MARKET EXECUTION',
      description: 'Aggregated project dossiers enter accredited registry verification workflows (Verra / Gold Standard / GCC / Indian CCTS) for serialization and market clearance.',
      techSpec: 'Transparent serialization prevents double-claiming; trade execution with verified buyers.',
      dataOutput: 'Certified carbon reduction credits cleared and retired on public registries.',
    },
    {
      id: 'revenue',
      title: 'REVENUE SHARING',
      subtitle: 'Automated Payouts',
      icon: Banknote,
      category: 'FINANCIAL SETTLEMENT',
      description: 'Distributes carbon credit revenues directly to system owners via programmatic Indian payment rails (UPI / DBT) based on exact verified generation ratios.',
      techSpec: 'Transparent fee schedule, auditable smart accounting ledger, GST-compliant invoicing.',
      dataOutput: 'Direct financial return enhancing rooftop solar ROI for households and MSMEs.',
    },
  ];

  return (
    <section id="system" className="py-16 lg:py-24 border-b border-[#1A1A1A]/20 bg-[#F5F2ED]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-[#2D4F36] font-bold mb-2">
            <span className="w-1.5 h-1.5 bg-[#2D4F36]"></span>
            02 / The End-to-End Architecture
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tighter text-[#1A1A1A] leading-[0.98]">
            THE CABO INFRASTRUCTURE PIPELINE
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#1A1A1A]/80 leading-relaxed">
            From the physical photons striking a rooftop panel in Madhya Pradesh to verified
            revenue settlement in an owner’s bank account, CABO automates every step of
            the measurement, verification, aggregation, and monetization chain.
          </p>
        </div>

        {/* Interactive Step Navigator */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Vertical Step Flow */}
          <div className="lg:col-span-5 space-y-2">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              const isActive = activeStep === idx;
              return (
                <div
                  key={step.id}
                  onClick={() => setActiveStep(idx)}
                  className={`cursor-pointer border transition-all p-3.5 sm:p-4 rounded-none flex items-center justify-between ${
                    isActive
                      ? 'bg-[#2D4F36] text-white border-[#2D4F36] shadow-none'
                      : 'bg-white text-[#1A1A1A] border-[#1A1A1A]/20 hover:bg-[#F5F2ED]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-7 h-7 flex items-center justify-center font-mono text-xs font-bold ${
                        isActive ? 'bg-black/30 text-[#C88C32]' : 'bg-[#1A1A1A]/5 text-[#1A1A1A]'
                      }`}
                    >
                      {String(idx + 1).padStart(2, '0')}
                    </div>
                    <div>
                      <div className="font-mono font-bold text-xs sm:text-sm uppercase tracking-tight">
                        {step.title}
                      </div>
                      <div className={`text-[10px] font-mono uppercase tracking-wider ${isActive ? 'text-white/80' : 'text-[#1A1A1A]/60'}`}>
                        {step.subtitle}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[9px] uppercase font-mono tracking-widest px-2 py-0.5 border ${
                        isActive
                          ? 'border-white/30 bg-black/20 text-white'
                          : 'border-[#1A1A1A]/20 bg-[#F5F2ED] text-[#1A1A1A]/70'
                      }`}
                    >
                      {step.category}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Detailed Specification Panel for Selected Step */}
          <div className="lg:col-span-7 sticky top-24">
            <div className="border-2 border-[#1A1A1A] bg-white p-6 sm:p-8 shadow-none">
              <div className="flex items-center justify-between pb-4 border-b border-[#1A1A1A]/20">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#2D4F36] text-white flex items-center justify-center">
                    {React.createElement(steps[activeStep].icon, { className: 'w-5 h-5 text-[#C88C32]' })}
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-[#C88C32] font-bold uppercase tracking-widest block">
                      STAGE {String(activeStep + 1).padStart(2, '0')} · {steps[activeStep].category}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold font-mono text-[#1A1A1A] uppercase tracking-tight">
                      {steps[activeStep].title}
                    </h3>
                  </div>
                </div>
                <span className="text-[10px] font-mono uppercase tracking-widest px-2 py-1 bg-[#F5F2ED] text-[#1A1A1A] border border-[#1A1A1A]/20">
                  {steps[activeStep].subtitle}
                </span>
              </div>

              <div className="py-6 space-y-6">
                <div>
                  <h4 className="text-[10px] font-mono uppercase tracking-widest text-[#1A1A1A]/60 mb-1.5 font-bold">
                    Core Function
                  </h4>
                  <p className="text-sm sm:text-base text-[#1A1A1A] leading-relaxed">
                    {steps[activeStep].description}
                  </p>
                </div>

                <div className="p-4 bg-[#F5F2ED] border border-[#1A1A1A]/20 space-y-3">
                  <div>
                    <h5 className="text-[10px] font-mono uppercase tracking-widest text-[#1A1A1A]/70 font-bold">
                      Technical Specification
                    </h5>
                    <p className="text-xs font-mono text-[#1A1A1A] mt-0.5">
                      {steps[activeStep].techSpec}
                    </p>
                  </div>
                  <div className="pt-2 border-t border-[#1A1A1A]/10">
                    <h5 className="text-[10px] font-mono uppercase tracking-widest text-[#1A1A1A]/70 font-bold">
                      Audit Data Output
                    </h5>
                    <p className="text-xs font-mono text-[#2D4F36] font-bold mt-0.5">
                      {steps[activeStep].dataOutput}
                    </p>
                  </div>
                </div>
              </div>

              {/* Progress & Next/Prev Navigation */}
              <div className="pt-4 border-t border-[#1A1A1A]/20 flex items-center justify-between">
                <div className="text-[10px] font-mono uppercase tracking-widest text-[#1A1A1A]/60">
                  PIPELINE INDEX {activeStep + 1} OF {steps.length}
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    disabled={activeStep === 0}
                    onClick={() => setActiveStep((prev) => Math.max(0, prev - 1))}
                    className="px-3 py-1.5 text-[10px] font-mono uppercase tracking-widest border border-[#1A1A1A]/30 bg-white disabled:opacity-40 hover:bg-[#F5F2ED] transition-colors"
                  >
                    PREVIOUS
                  </button>
                  <button
                    type="button"
                    disabled={activeStep === steps.length - 1}
                    onClick={() => setActiveStep((prev) => Math.min(steps.length - 1, prev + 1))}
                    className="px-3 py-1.5 text-[10px] font-mono uppercase tracking-widest border border-[#2D4F36] bg-[#2D4F36] text-white disabled:opacity-40 hover:bg-[#233f2b] transition-colors"
                  >
                    NEXT STEP
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

import React from 'react';
import { AlertCircle, Check, X, ShieldAlert, ArrowRight, DollarSign, Scale, Database } from 'lucide-react';

export const TheProblem: React.FC = () => {
  return (
    <section id="problem" className="py-16 lg:py-24 border-b border-[#1A1A1A]/20 bg-[#F5F2ED]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-[#2D4F36] font-bold mb-2">
            <span className="w-1.5 h-1.5 bg-[#2D4F36]"></span>
            01 / The Structural Barrier
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tighter text-[#1A1A1A] leading-[0.98]">
            CARBON MARKETS WERE DESIGNED FOR UTILITY PROJECTS — LEAVING MILLIONS OF ROOFS BEHIND.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#1A1A1A]/80 leading-relaxed">
            In India and emerging economies, millions of households, MSMEs, schools, and hospitals
            invest in rooftop solar. Each generates real, verifiable grid-emission displacement.
            Yet, virtually none participate in carbon finance because traditional accreditation is
            prohibitive for sub-megawatt installations.
          </p>
        </div>

        {/* Comparison Data Table: Utility-Scale vs Distributed Rooftop */}
        <div className="border border-[#1A1A1A]/20 bg-white overflow-hidden mb-12 shadow-none">
          <div className="bg-[#1A1A1A] px-6 py-3 border-b border-[#1A1A1A] flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-white">
            <span className="font-bold">MARKET ACCESS COMPARISON MATRIX</span>
            <span className="text-white/60">SOURCE: VOLUNTARY & COMPLIANCE CARBON MRV AUDIT STANDARDS</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-[#1A1A1A]/20 bg-[#F5F2ED] text-[10px] font-mono uppercase tracking-wider text-[#1A1A1A]/70">
                  <th className="py-3.5 px-4 sm:px-6 w-1/4">Parameter</th>
                  <th className="py-3.5 px-4 sm:px-6 w-3/8 text-[#991B1B] bg-red-50/40">
                    Traditional Utility Solar (50MW+)
                  </th>
                  <th className="py-3.5 px-4 sm:px-6 w-3/8 text-[#2D4F36] bg-[#2D4F36]/10 font-bold">
                    Distributed Rooftop (3kW – 50kW)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1A1A1A]/10 text-[#1A1A1A]">
                <tr>
                  <td className="py-3.5 px-4 sm:px-6 font-mono font-bold text-[#1A1A1A]">
                    Verification Audit Cost (VVB)
                  </td>
                  <td className="py-3.5 px-4 sm:px-6 bg-red-50/20 text-[#1A1A1A]/80">
                    $15,000 – $45,000 per annual audit cycle. Easily absorbed across 50,000+ MWh output.
                  </td>
                  <td className="py-3.5 px-4 sm:px-6 bg-[#2D4F36]/5 font-semibold text-[#2D4F36]">
                    Economically impossible for an individual 5 kW system generating ~6,500 kWh annually.
                  </td>
                </tr>

                <tr>
                  <td className="py-3.5 px-4 sm:px-6 font-mono font-bold text-[#1A1A1A]">
                    Minimum Volume Threshold
                  </td>
                  <td className="py-3.5 px-4 sm:px-6 bg-red-50/20 text-[#1A1A1A]/80">
                    Registries prefer 10,000+ tonnes CO₂e per issuance batch.
                  </td>
                  <td className="py-3.5 px-4 sm:px-6 bg-[#2D4F36]/5 font-semibold text-[#2D4F36]">
                    A 5 kW roof abates ~4.6 tonnes CO₂e/year — requires bundling 2,000+ rooftops together.
                  </td>
                </tr>

                <tr>
                  <td className="py-3.5 px-4 sm:px-6 font-mono font-bold text-[#1A1A1A]">
                    Telemetry & Data Tamper Evidence
                  </td>
                  <td className="py-3.5 px-4 sm:px-6 bg-red-50/20 text-[#1A1A1A]/80">
                    Substation SCADA systems, bidirectional ABT fiscal meters, dedicated leased lines.
                  </td>
                  <td className="py-3.5 px-4 sm:px-6 bg-[#2D4F36]/5 font-semibold text-[#2D4F36]">
                    Uncalibrated inverter cloud apps, flaky home Wi-Fi, easily falsifiable manual logs.
                  </td>
                </tr>

                <tr>
                  <td className="py-3.5 px-4 sm:px-6 font-mono font-bold text-[#1A1A1A]">
                    Manual Site Inspections
                  </td>
                  <td className="py-3.5 px-4 sm:px-6 bg-red-50/20 text-[#1A1A1A]/80">
                    Auditor visits a single fenced plot once or twice over project lifetime.
                  </td>
                  <td className="py-3.5 px-4 sm:px-6 bg-[#2D4F36]/5 font-semibold text-[#2D4F36]">
                    Auditing 5,000 distributed rooftops physically would consume the entire credit value.
                  </td>
                </tr>

                <tr>
                  <td className="py-3.5 px-4 sm:px-6 font-mono font-bold text-[#1A1A1A]">
                    Financial Benefit to Owner
                  </td>
                  <td className="py-3.5 px-4 sm:px-6 bg-red-50/20 text-[#1A1A1A]/80">
                    100% of carbon revenue captured by multinational developers and financial funds.
                  </td>
                  <td className="py-3.5 px-4 sm:px-6 bg-[#2D4F36]/5 font-semibold text-[#2D4F36]">
                    Rooftop owner receives zero carbon revenue despite taking the upfront capital risk.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 3 Core Structural Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border border-[#1A1A1A]/20 bg-white p-6">
            <div className="w-8 h-8 bg-[#1A1A1A] text-white flex items-center justify-center mb-4 font-mono font-bold text-xs">
              01
            </div>
            <h3 className="text-base font-bold font-mono text-[#1A1A1A] mb-2 uppercase tracking-wide">
              High Cost of Manual MRV
            </h3>
            <p className="text-xs sm:text-sm text-[#1A1A1A]/70 leading-relaxed">
              Monitoring, Reporting and Verification (MRV) in traditional registries relies on manual consultants,
              physical site visits, and paper spreadsheets. For small rooftops, auditing overhead costs more than
              the value of carbon credits generated.
            </p>
          </div>

          <div className="border border-[#1A1A1A]/20 bg-white p-6">
            <div className="w-8 h-8 bg-[#1A1A1A] text-white flex items-center justify-center mb-4 font-mono font-bold text-xs">
              02
            </div>
            <h3 className="text-base font-bold font-mono text-[#1A1A1A] mb-2 uppercase tracking-wide">
              The Aggregation Deficit
            </h3>
            <p className="text-xs sm:text-sm text-[#1A1A1A]/70 leading-relaxed">
              Carbon buyers want large, standardized, institutional-grade tranches. Without automated digital aggregation,
              there is no way to harmonize telemetry across thousands of different inverter brands, panel ages,
              and geographic micro-climates.
            </p>
          </div>

          <div className="border border-[#1A1A1A]/20 bg-white p-6">
            <div className="w-8 h-8 bg-[#1A1A1A] text-white flex items-center justify-center mb-4 font-mono font-bold text-xs">
              03
            </div>
            <h3 className="text-base font-bold font-mono text-[#1A1A1A] mb-2 uppercase tracking-wide">
              Data Integrity & Fraud Risk
            </h3>
            <p className="text-xs sm:text-sm text-[#1A1A1A]/70 leading-relaxed">
              If an aggregator relies merely on manual screenshots or API feeds, bad actors can spoof generation numbers.
              Buyers and registries require tamper-evident hardware telemetry and verifiable optical proof before
              permitting credit issuance.
            </p>
          </div>
        </div>

        {/* Honest Positioning Statement (Mandatory from prompt) */}
        <div className="mt-10 p-5 bg-white border border-[#1A1A1A]/20 border-l-4 border-l-[#2D4F36] text-xs sm:text-sm text-[#1A1A1A]/80">
          <div className="font-mono font-bold text-[#1A1A1A] uppercase tracking-widest text-[10px] mb-1.5 flex items-center gap-2">
            <Scale className="w-4 h-4 text-[#2D4F36]" />
            REGULATORY & METHODOLOGY DISCLAIMER
          </div>
          <p className="leading-relaxed">
            CABO does <strong>not</strong> independently issue carbon credits. CABO provides the specialized
            digital infrastructure—hardware IoT telemetry, optical computer vision verification, cryptographic
            tamper-evidence, and programmatic aggregation—that automates MRV workflows. Official carbon credit issuance
            is strictly governed by accredited third-party validation and verification bodies (VVBs) and registered standards
            (e.g., Verra, Gold Standard, Global Carbon Council, or India’s Carbon Credit Trading Scheme).
          </p>
        </div>
      </div>
    </section>
  );
};

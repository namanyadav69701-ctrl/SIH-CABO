import React, { useState } from 'react';
import {
  Scan,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  Camera,
  Cpu,
  RefreshCw,
  Eye,
  Sliders,
  Sparkles,
  Layers,
  ArrowRight,
  Fingerprint
} from 'lucide-react';
import { INITIAL_VERIFICATION_STATE, ANOMALY_VERIFICATION_STATE } from '../data/caboData';
import { VerificationState } from '../types';

export const CaboVerify: React.FC = () => {
  const [demoMode, setDemoMode] = useState<'nominal' | 'anomaly'>('nominal');
  const [isVerifying, setIsVerifying] = useState(false);
  const [currentVerification, setCurrentVerification] = useState<VerificationState>(INITIAL_VERIFICATION_STATE);

  const handleToggleMode = (mode: 'nominal' | 'anomaly') => {
    setDemoMode(mode);
    setIsVerifying(true);
    setTimeout(() => {
      if (mode === 'nominal') {
        setCurrentVerification(INITIAL_VERIFICATION_STATE);
      } else {
        setCurrentVerification(ANOMALY_VERIFICATION_STATE);
      }
      setIsVerifying(false);
    }, 600);
  };

  return (
    <section id="verify" className="py-16 lg:py-24 border-b border-[#1A1A1A]/20 bg-[#F5F2ED]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-[#2D4F36] font-bold mb-2">
            <span className="w-1.5 h-1.5 bg-[#2D4F36]"></span>
            04 / Core Innovation
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tighter text-[#1A1A1A] leading-[0.98]">
            CABO VERIFY: MULTI-SOURCE DIGITAL MRV
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#1A1A1A]/80 leading-relaxed">
            Single-sensor telemetry can be gamed, disconnected, or misconfigured. CABO Verify solves this
            by algorithmically cross-referencing physical CT sensor data with optical computer vision (OCR
            of inverter displays), inverter registers, satellite insolation curves, and cryptographic device identities.
          </p>
        </div>

        {/* The 7 Evidence Sources Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 mb-10 text-xs font-mono">
          <div className="p-3 border border-[#1A1A1A]/20 bg-white">
            <div className="text-[9px] text-[#1A1A1A]/60 uppercase tracking-widest">Source 1</div>
            <div className="font-bold text-[#1A1A1A] mt-1 uppercase text-xs">IoT CT Meter</div>
            <div className="text-[10px] text-[#1A1A1A]/70 mt-0.5">True RMS AC Power</div>
          </div>

          <div className="p-3 border border-[#1A1A1A]/20 bg-white">
            <div className="text-[9px] text-[#1A1A1A]/60 uppercase tracking-widest">Source 2</div>
            <div className="font-bold text-[#1A1A1A] mt-1 uppercase text-xs">Inverter Modbus</div>
            <div className="text-[10px] text-[#1A1A1A]/70 mt-0.5">RS-485 Registers</div>
          </div>

          <div className="p-3 border border-[#1A1A1A]/20 bg-white">
            <div className="text-[9px] text-[#1A1A1A]/60 uppercase tracking-widest">Source 3</div>
            <div className="font-bold text-[#1A1A1A] mt-1 uppercase text-xs">Camera OCR</div>
            <div className="text-[10px] text-[#1A1A1A]/70 mt-0.5">YOLO + CRNN Recog</div>
          </div>

          <div className="p-3 border border-[#1A1A1A]/20 bg-white">
            <div className="text-[9px] text-[#1A1A1A]/60 uppercase tracking-widest">Source 4</div>
            <div className="font-bold text-[#1A1A1A] mt-1 uppercase text-xs">CV Inspection</div>
            <div className="text-[10px] text-[#1A1A1A]/70 mt-0.5">Panel Soiling & Glare</div>
          </div>

          <div className="p-3 border border-[#1A1A1A]/20 bg-white">
            <div className="text-[9px] text-[#1A1A1A]/60 uppercase tracking-widest">Source 5</div>
            <div className="font-bold text-[#1A1A1A] mt-1 uppercase text-xs">NTP Timestamps</div>
            <div className="text-[10px] text-[#1A1A1A]/70 mt-0.5">Tower Clock Sync</div>
          </div>

          <div className="p-3 border border-[#1A1A1A]/20 bg-white">
            <div className="text-[9px] text-[#1A1A1A]/60 uppercase tracking-widest">Source 6</div>
            <div className="font-bold text-[#1A1A1A] mt-1 uppercase text-xs">Device Identity</div>
            <div className="text-[10px] text-[#1A1A1A]/70 mt-0.5">Hardware Secure Chip</div>
          </div>

          <div className="p-3 border border-[#1A1A1A]/20 bg-white col-span-2 md:col-span-1">
            <div className="text-[9px] text-[#1A1A1A]/60 uppercase tracking-widest">Source 7</div>
            <div className="font-bold text-[#1A1A1A] mt-1 uppercase text-xs">IMD Irradiance</div>
            <div className="text-[10px] text-[#1A1A1A]/70 mt-0.5">Physical Solar Models</div>
          </div>
        </div>

        {/* Interactive Verification Test Bench UI */}
        <div className="border-2 border-[#1A1A1A] bg-white rounded-none shadow-none overflow-hidden">
          {/* Bench Control Bar */}
          <div className="bg-[#1A1A1A] px-4 sm:px-6 py-3 border-b border-[#1A1A1A] flex flex-wrap items-center justify-between gap-4 text-white">
            <div className="flex items-center gap-2">
              <Scan className="w-4 h-4 text-[#C88C32]" />
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-white">
                INTERACTIVE VERIFICATION BENCH · RUNTIME TEST
              </span>
            </div>

            {/* Test Case Switcher */}
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono text-white/60 mr-1 hidden sm:inline uppercase tracking-widest">
                SCENARIO:
              </span>
              <button
                type="button"
                onClick={() => handleToggleMode('nominal')}
                className={`px-3 py-1 text-[10px] font-mono uppercase tracking-widest font-bold transition-colors ${
                  demoMode === 'nominal'
                    ? 'bg-[#2D4F36] text-white'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                NOMINAL SYNCHRONIZED
              </button>
              <button
                type="button"
                onClick={() => handleToggleMode('anomaly')}
                className={`px-3 py-1 text-[10px] font-mono uppercase tracking-widest font-bold transition-colors ${
                  demoMode === 'anomaly'
                    ? 'bg-red-600 text-white'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                INJECT DISCREPANCY / TAMPER
              </button>
            </div>
          </div>

          {/* Bench Core Grid */}
          <div className="p-6 sm:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left Column: Computer Vision & Sensor Ingestion Preview */}
              <div className="lg:col-span-6 space-y-6">
                <div className="border border-[#1A1A1A] bg-[#1A1A1A] text-[#F5F2ED] p-4">
                  <div className="flex items-center justify-between pb-3 border-b border-white/10 text-[10px] font-mono uppercase tracking-widest">
                    <div className="flex items-center gap-2">
                      <Camera className="w-3.5 h-3.5 text-[#C88C32]" />
                      <span className="text-white font-bold">
                        OPTICAL RECOGNITION (YOLO + CRNN)
                      </span>
                    </div>
                    <span className="text-[#00FF00] bg-black/40 px-1.5 py-0.5 border border-[#00FF00]/30">
                      LIVE FRAME #4821
                    </span>
                  </div>

                  {/* Simulated Camera LCD Frame */}
                  <div className="my-4 p-4 border border-white/10 bg-black/40 relative font-mono">
                    {/* Bounding Box Simulation */}
                    <div className="border-2 border-dashed border-[#00FF00] p-3 relative bg-black/60">
                      <div className="absolute -top-3 left-2 bg-[#00FF00] text-black text-[9px] font-bold px-1 uppercase tracking-widest">
                        YOLO_V8_SEGMENT: INVERTER_LCD_01 (CONF 0.98)
                      </div>
                      <div className="text-right text-[10px] text-white/50 mb-1">
                        SUNGROW SG5.0RS-ADA
                      </div>
                      <div className="text-center py-3">
                        <span className="text-[10px] text-white/60 block uppercase tracking-widest">
                          Extracted Display Value (Total Yield)
                        </span>
                        <span className="text-3xl sm:text-4xl font-bold text-[#C88C32] tracking-wider">
                          {currentVerification.ocrReadingKwh.toFixed(2)}
                          <span className="text-sm text-white/60 ml-1">kWh</span>
                        </span>
                      </div>
                    </div>
                    <div className="mt-2 flex justify-between text-[9px] font-mono text-white/50 uppercase tracking-wider">
                      <span>Homography Warping (De-skewed 4.2°)</span>
                      <span>Tesseract 5.3 / CRNN</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs font-mono pt-1">
                    <div className="bg-white/5 p-2.5 border border-white/10">
                      <span className="text-white/50 block text-[9px] uppercase tracking-widest">IOT HARDWARE READING</span>
                      <span className="text-lg font-bold text-white tabular-nums">
                        {currentVerification.iotReadingKwh.toFixed(2)} kWh
                      </span>
                    </div>
                    <div className="bg-white/5 p-2.5 border border-white/10">
                      <span className="text-white/50 block text-[9px] uppercase tracking-widest">OCR OPTICAL READING</span>
                      <span className="text-lg font-bold text-[#C88C32] tabular-nums">
                        {currentVerification.ocrReadingKwh.toFixed(2)} kWh
                      </span>
                    </div>
                  </div>
                </div>

                {/* Discrepancy Equation Callout */}
                <div className="p-4 bg-[#F5F2ED] border border-[#1A1A1A]/20 font-mono text-xs space-y-1">
                  <div className="flex justify-between font-bold text-[#1A1A1A]">
                    <span className="uppercase tracking-wider text-[10px]">DISCREPANCY FORMULA:</span>
                    <span className={demoMode === 'nominal' ? 'text-[#2D4F36]' : 'text-red-600'}>
                      | IoT - OCR | / IoT = {currentVerification.differencePct.toFixed(2)}%
                    </span>
                  </div>
                  <div className="text-[10px] text-[#1A1A1A]/70 uppercase tracking-wide">
                    Acceptable tolerance threshold: &le; 3.00% (allows for display update interval & quantization).
                  </div>
                </div>
              </div>

              {/* Right Column: Verification Results & Confidence Rating */}
              <div className="lg:col-span-6 space-y-6">
                {/* Master Confidence Score Card */}
                <div
                  className={`p-6 border-2 transition-colors ${
                    currentVerification.status === 'VERIFIED'
                      ? 'border-[#2D4F36] bg-[#2D4F36]/5'
                      : 'border-red-600 bg-red-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-mono uppercase font-bold tracking-widest text-[#1A1A1A]/60 block">
                        CROSS-VERIFICATION CONFIDENCE
                      </span>
                      <div className="flex items-baseline gap-2 mt-1">
                        <span
                          className={`text-4xl sm:text-5xl font-mono font-bold tabular-nums ${
                            currentVerification.status === 'VERIFIED' ? 'text-[#2D4F36]' : 'text-red-600'
                          }`}
                        >
                          {currentVerification.overallConfidencePct.toFixed(1)}%
                        </span>
                        <span className="text-[10px] font-mono uppercase tracking-widest text-[#1A1A1A]/70 font-bold">
                          {currentVerification.status === 'VERIFIED' ? 'AUTHENTIC RECORD' : 'AUDIT REQUIRED'}
                        </span>
                      </div>
                    </div>

                    <div className="text-right">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 text-[10px] font-mono font-bold uppercase border ${
                          currentVerification.status === 'VERIFIED'
                            ? 'bg-[#2D4F36] text-white border-[#2D4F36]'
                            : 'bg-red-600 text-white border-red-600'
                        }`}
                      >
                        {currentVerification.status === 'VERIFIED' ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                            <span>VERIFIED</span>
                          </>
                        ) : (
                          <>
                            <AlertTriangle className="w-3.5 h-3.5 text-white" />
                            <span>FLAGGED</span>
                          </>
                        )}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-[#1A1A1A]/10 grid grid-cols-2 gap-4 text-xs font-mono text-[#1A1A1A]">
                    <div>
                      <span className="text-[#1A1A1A]/60 block text-[9px] uppercase tracking-widest">Cryptographic Signature</span>
                      <span className="font-bold text-[#2D4F36]">HMAC-SHA256 (VALID)</span>
                    </div>
                    <div>
                      <span className="text-[#1A1A1A]/60 block text-[9px] uppercase tracking-widest">Timestamp Status</span>
                      <span className="font-bold text-[#2D4F36]">NTP ± 420ms (VERIFIED)</span>
                    </div>
                  </div>
                </div>

                {/* Sub-check validation list */}
                <div className="space-y-2">
                  <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#1A1A1A]/70">
                    VERIFICATION PROTOCOL AUDIT LOG
                  </div>
                  {currentVerification.checks.map((check, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-[#F5F2ED] border border-[#1A1A1A]/20 flex items-center justify-between text-xs"
                    >
                      <div className="flex items-center gap-2.5">
                        {check.status === 'PASSED' ? (
                          <CheckCircle2 className="w-4 h-4 text-[#2D4F36] shrink-0" />
                        ) : check.status === 'WARNING' ? (
                          <AlertTriangle className="w-4 h-4 text-[#C88C32] shrink-0" />
                        ) : (
                          <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
                        )}
                        <div>
                          <span className="font-mono font-bold text-[#1A1A1A]">{check.name}</span>
                          <span className="text-[#1A1A1A]/70 block text-[11px] mt-0.5">{check.detail}</span>
                        </div>
                      </div>
                      {check.delta && (
                        <span className="text-[10px] font-mono text-[#1A1A1A]/60 ml-2 shrink-0">
                          {check.delta}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

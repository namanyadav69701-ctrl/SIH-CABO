import React, { useState } from 'react';
import {
  Cpu,
  Radio,
  Shield,
  HardDrive,
  Activity,
  Zap,
  CheckCircle,
  HelpCircle,
  Clock,
  Layers,
  Sliders,
  Cable
} from 'lucide-react';

export const CaboMeter: React.FC = () => {
  const [selectedSpec, setSelectedSpec] = useState<'sensing' | 'cellular' | 'security' | 'buffering'>('sensing');

  return (
    <section id="hardware" className="py-16 lg:py-24 border-b border-[#1A1A1A]/20 bg-[#F5F2ED]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-[#2D4F36] font-bold mb-2">
            <span className="w-1.5 h-1.5 bg-[#2D4F36]"></span>
            03 / Edge Hardware Engineering
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tighter text-[#1A1A1A] leading-[0.98]">
            THE CABO METER: INDUSTRIAL TELEMETRY FOR SOLAR
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#1A1A1A]/80 leading-relaxed">
            Standard residential Wi-Fi is unreliable, easily disconnected, and vulnerable to spoofing.
            The CABO Meter is an independent, DIN-rail mountable IoT telemetry unit engineered for
            rugged Indian grid environments, featuring non-invasive CT-clamp sensing, cellular connectivity,
            and hardware cryptographic attestation.
          </p>
        </div>

        {/* Industrial Device & Connection Flow Diagram */}
        <div className="border-2 border-[#1A1A1A] bg-[#1A1A1A] text-[#F5F2ED] p-6 sm:p-8 rounded-none mb-12 shadow-none">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/10 text-[10px] font-mono uppercase tracking-widest">
            <div className="flex items-center gap-2 text-[#00FF00]">
              <span className="w-2 h-2 rounded-full bg-[#00FF00]"></span>
              <span>ENGINEERING SCHEMATIC · DWG NO. CABO-HW-REV-3</span>
            </div>
            <div className="text-white/60">
              PHYSICAL INTERFACE: SPLIT-CORE CT (50A / 100A) · CELLULAR: 4G LTE-M / NB-IoT / GSM
            </div>
          </div>

          {/* Schematic Diagram Flow: Solar Panels -> Inverter -> CABO Meter -> Cellular Network -> CABO Platform */}
          <div className="py-8">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 lg:gap-2 items-center text-center">
              {/* Block 1: Solar Panels */}
              <div className="border border-white/10 bg-white/5 p-4 rounded-none text-left relative">
                <div className="text-[9px] font-mono text-[#C88C32] font-bold uppercase tracking-widest mb-1">
                  STAGE A · DC GENERATION
                </div>
                <div className="text-sm font-mono font-bold text-white uppercase">
                  Solar Array
                </div>
                <div className="text-xs text-white/70 mt-1">
                  Photovoltaic strings (330Wp – 550Wp modules)
                </div>
                <div className="mt-3 pt-2 border-t border-white/10 text-[9px] font-mono text-white/40 uppercase tracking-wider">
                  Output: 150V – 600V DC
                </div>
              </div>

              {/* Connector 1 */}
              <div className="flex flex-col items-center justify-center text-[#C88C32] font-mono text-xs">
                <span className="hidden md:inline">──────►</span>
                <span className="md:hidden">▼</span>
                <span className="text-[9px] font-mono uppercase tracking-widest text-white/40 mt-0.5">DC Line</span>
              </div>

              {/* Block 2: Inverter */}
              <div className="border border-white/10 bg-white/5 p-4 rounded-none text-left relative">
                <div className="text-[9px] font-mono text-[#C88C32] font-bold uppercase tracking-widest mb-1">
                  STAGE B · AC INVERSION
                </div>
                <div className="text-sm font-mono font-bold text-white uppercase">
                  Grid-Tie Inverter
                </div>
                <div className="text-xs text-white/70 mt-1">
                  Growatt / Sungrow / Solis / Polycab
                </div>
                <div className="mt-3 pt-2 border-t border-white/10 text-[9px] font-mono text-white/40 uppercase tracking-wider">
                  Display LCD + RS-485 port
                </div>
              </div>

              {/* Connector 2: Non-Invasive CT Sensing */}
              <div className="flex flex-col items-center justify-center text-[#00FF00] font-mono text-xs">
                <span className="hidden md:inline">──[CT]──►</span>
                <span className="md:hidden">▼ [CT Clamp]</span>
                <span className="text-[9px] font-mono uppercase tracking-widest text-[#00FF00] mt-0.5">Non-Invasive AC</span>
              </div>

              {/* Block 3: CABO Meter (Core Unit) */}
              <div className="border-2 border-[#2D4F36] bg-[#2D4F36]/40 p-4 rounded-none text-left shadow-none relative">
                <div className="absolute -top-2.5 right-3 bg-[#2D4F36] text-white text-[9px] font-mono uppercase tracking-widest px-1.5 py-0.5">
                  CABO HARDWARE
                </div>
                <div className="text-[9px] font-mono text-[#00FF00] font-bold uppercase tracking-widest mb-1">
                  STAGE C · METERING
                </div>
                <div className="text-sm font-mono font-bold text-white uppercase">
                  CABO Meter
                </div>
                <div className="text-xs text-white/90 mt-1">
                  CT sampling + Crypto signing + 4G modem
                </div>
                <div className="mt-3 pt-2 border-t border-white/20 text-[9px] font-mono text-[#00FF00] uppercase tracking-wider">
                  No home Wi-Fi required
                </div>
              </div>
            </div>

            {/* Second row of flow: CABO Meter -> Cellular -> CABO Platform */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 lg:gap-2 items-center text-center mt-6">
              <div className="hidden md:block col-span-2"></div>

              <div className="flex flex-col items-center justify-center text-[#00FF00] font-mono text-xs">
                <span className="hidden md:inline">──────►</span>
                <span className="md:hidden">▼</span>
                <span className="text-[9px] font-mono uppercase tracking-widest text-white/40 mt-0.5">Cellular Uplink</span>
              </div>

              {/* Block 4: Cellular Network */}
              <div className="border border-white/10 bg-white/5 p-4 rounded-none text-left">
                <div className="text-[9px] font-mono text-[#C88C32] font-bold uppercase tracking-widest mb-1">
                  STAGE D · TRANSMISSION
                </div>
                <div className="text-sm font-mono font-bold text-white uppercase">
                  Cellular Network
                </div>
                <div className="text-xs text-white/70 mt-1">
                  Airtel / Jio 4G LTE-M (GSM Fallback)
                </div>
                <div className="mt-3 pt-2 border-t border-white/10 text-[9px] font-mono text-white/40 uppercase tracking-wider">
                  TLS 1.3 / MQTT-SN encrypted
                </div>
              </div>

              {/* Connector */}
              <div className="flex flex-col items-center justify-center text-[#C88C32] font-mono text-xs">
                <span className="hidden md:inline">──────►</span>
                <span className="md:hidden">▼</span>
                <span className="text-[9px] font-mono uppercase tracking-widest text-white/40 mt-0.5">dMRV Ingestion</span>
              </div>

              {/* Block 5: CABO Platform */}
              <div className="border border-white/10 bg-white/5 p-4 rounded-none text-left">
                <div className="text-[9px] font-mono text-[#00FF00] font-bold uppercase tracking-widest mb-1">
                  STAGE E · VERIFICATION
                </div>
                <div className="text-sm font-mono font-bold text-white uppercase">
                  CABO Platform
                </div>
                <div className="text-xs text-white/70 mt-1">
                  Multi-source MRV & Merkle Batching
                </div>
                <div className="mt-3 pt-2 border-t border-white/10 text-[9px] font-mono text-white/40 uppercase tracking-wider">
                  TimescaleDB & Audit Root
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Deep Hardware Capabilities Tabs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4 space-y-2">
            <button
              type="button"
              onClick={() => setSelectedSpec('sensing')}
              className={`w-full text-left p-4 border rounded-none transition-colors ${
                selectedSpec === 'sensing'
                  ? 'border-[#2D4F36] bg-[#2D4F36] text-white'
                  : 'border-[#1A1A1A]/20 bg-white text-[#1A1A1A] hover:bg-[#F5F2ED]'
              }`}
            >
              <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest font-bold">
                <Cable className="w-4 h-4" />
                <span>01 · Non-Invasive CT Sensing</span>
              </div>
              <p className={`text-xs mt-1 leading-relaxed ${selectedSpec === 'sensing' ? 'text-white/80' : 'text-[#1A1A1A]/70'}`}>
                Split-core clamps install in 5 minutes without cutting existing electrical wiring or voiding inverter warranty.
              </p>
            </button>

            <button
              type="button"
              onClick={() => setSelectedSpec('cellular')}
              className={`w-full text-left p-4 border rounded-none transition-colors ${
                selectedSpec === 'cellular'
                  ? 'border-[#2D4F36] bg-[#2D4F36] text-white'
                  : 'border-[#1A1A1A]/20 bg-white text-[#1A1A1A] hover:bg-[#F5F2ED]'
              }`}
            >
              <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest font-bold">
                <Radio className="w-4 h-4" />
                <span>02 · Cellular Independence</span>
              </div>
              <p className={`text-xs mt-1 leading-relaxed ${selectedSpec === 'cellular' ? 'text-white/80' : 'text-[#1A1A1A]/70'}`}>
                Dedicated embedded SIM works across rural and urban India without relying on homeowner Wi-Fi or router reboots.
              </p>
            </button>

            <button
              type="button"
              onClick={() => setSelectedSpec('security')}
              className={`w-full text-left p-4 border rounded-none transition-colors ${
                selectedSpec === 'security'
                  ? 'border-[#2D4F36] bg-[#2D4F36] text-white'
                  : 'border-[#1A1A1A]/20 bg-white text-[#1A1A1A] hover:bg-[#F5F2ED]'
              }`}
            >
              <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest font-bold">
                <Shield className="w-4 h-4" />
                <span>03 · Cryptographic Attestation</span>
              </div>
              <p className={`text-xs mt-1 leading-relaxed ${selectedSpec === 'security' ? 'text-white/80' : 'text-[#1A1A1A]/70'}`}>
                Hardware secure element signs each 60-second telemetry payload using private keys etched into the silicon.
              </p>
            </button>

            <button
              type="button"
              onClick={() => setSelectedSpec('buffering')}
              className={`w-full text-left p-4 border rounded-none transition-colors ${
                selectedSpec === 'buffering'
                  ? 'border-[#2D4F36] bg-[#2D4F36] text-white'
                  : 'border-[#1A1A1A]/20 bg-white text-[#1A1A1A] hover:bg-[#F5F2ED]'
              }`}
            >
              <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest font-bold">
                <HardDrive className="w-4 h-4" />
                <span>04 · Offline Circular Buffering</span>
              </div>
              <p className={`text-xs mt-1 leading-relaxed ${selectedSpec === 'buffering' ? 'text-white/80' : 'text-[#1A1A1A]/70'}`}>
                Stores up to 30 days of timestamped generation records on local flash storage during mobile network blackouts.
              </p>
            </button>
          </div>

          {/* Right Detail Pane */}
          <div className="lg:col-span-8 border border-[#1A1A1A]/20 bg-white p-6 sm:p-8 rounded-none">
            {selectedSpec === 'sensing' && (
              <div className="space-y-4">
                <div className="text-[10px] font-mono text-[#C88C32] font-bold uppercase tracking-widest">
                  ELECTRICAL SENSING SPECIFICATION
                </div>
                <h3 className="text-xl font-bold font-mono text-[#1A1A1A] uppercase tracking-tight">
                  True RMS Split-Core Current Sensing (Class 0.5S)
                </h3>
                <p className="text-sm text-[#1A1A1A]/80 leading-relaxed">
                  The CABO Meter uses high-permeability magnetic core CT clamps designed to snap directly around the AC output conductor leading from the solar inverter to the main distribution board. By simultaneously sampling line voltage via a fused terminal block, the onboard dedicated metering ASIC computes active power (P), reactive power (Q), apparent power (S), power factor (cos φ), and grid frequency.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                  <div className="p-3 bg-[#F5F2ED] border border-[#1A1A1A]/10">
                    <span className="text-[9px] font-mono uppercase tracking-widest text-[#1A1A1A]/60 block">Accuracy Class</span>
                    <span className="text-xs font-mono font-bold text-[#1A1A1A]">IEC 62053-22 (0.5S)</span>
                  </div>
                  <div className="p-3 bg-[#F5F2ED] border border-[#1A1A1A]/10">
                    <span className="text-[9px] font-mono uppercase tracking-widest text-[#1A1A1A]/60 block">Current Range</span>
                    <span className="text-xs font-mono font-bold text-[#1A1A1A]">0.05A – 100A RMS</span>
                  </div>
                  <div className="p-3 bg-[#F5F2ED] border border-[#1A1A1A]/10">
                    <span className="text-[9px] font-mono uppercase tracking-widest text-[#1A1A1A]/60 block">Voltage Tolerance</span>
                    <span className="text-xs font-mono font-bold text-[#1A1A1A]">85V – 300V AC</span>
                  </div>
                  <div className="p-3 bg-[#F5F2ED] border border-[#1A1A1A]/10">
                    <span className="text-[9px] font-mono uppercase tracking-widest text-[#1A1A1A]/60 block">Surge Rating</span>
                    <span className="text-xs font-mono font-bold text-[#1A1A1A]">4 kV / 8/20 µs</span>
                  </div>
                </div>
              </div>
            )}

            {selectedSpec === 'cellular' && (
              <div className="space-y-4">
                <div className="text-[10px] font-mono text-[#C88C32] font-bold uppercase tracking-widest">
                  TELECOMMUNICATIONS ARCHITECTURE
                </div>
                <h3 className="text-xl font-bold font-mono text-[#1A1A1A] uppercase tracking-tight">
                  Zero-Configuration Cellular Connectivity
                </h3>
                <p className="text-sm text-[#1A1A1A]/80 leading-relaxed">
                  Relying on homeowner Wi-Fi is the number one cause of data dropouts in distributed energy systems. The CABO Meter embeds an industrial SIMCOM 7600/A7672 multi-band modem with pre-provisioned M2M connectivity. It automatically roams between Airtel, Jio, and Vodafone-Idea networks, guaranteeing 99.8%+ uptime even in peri-urban industrial zones and rural institutional campuses.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                  <div className="p-3 bg-[#F5F2ED] border border-[#1A1A1A]/10">
                    <span className="text-[9px] font-mono uppercase tracking-widest text-[#1A1A1A]/60 block">Bands</span>
                    <span className="text-xs font-mono font-bold text-[#1A1A1A]">LTE Cat-1 / B1/3/5/8/40</span>
                  </div>
                  <div className="p-3 bg-[#F5F2ED] border border-[#1A1A1A]/10">
                    <span className="text-[9px] font-mono uppercase tracking-widest text-[#1A1A1A]/60 block">Fallback</span>
                    <span className="text-xs font-mono font-bold text-[#1A1A1A]">2G GSM / GPRS</span>
                  </div>
                  <div className="p-3 bg-[#F5F2ED] border border-[#1A1A1A]/10">
                    <span className="text-[9px] font-mono uppercase tracking-widest text-[#1A1A1A]/60 block">Antenna</span>
                    <span className="text-xs font-mono font-bold text-[#1A1A1A]">External SMA</span>
                  </div>
                  <div className="p-3 bg-[#F5F2ED] border border-[#1A1A1A]/10">
                    <span className="text-[9px] font-mono uppercase tracking-widest text-[#1A1A1A]/60 block">Power Consumption</span>
                    <span className="text-xs font-mono font-bold text-[#1A1A1A]">&lt; 1.8W Peak</span>
                  </div>
                </div>
              </div>
            )}

            {selectedSpec === 'security' && (
              <div className="space-y-4">
                <div className="text-[10px] font-mono text-[#C88C32] font-bold uppercase tracking-widest">
                  CRYPTOGRAPHIC HARDWARE SECURITY
                </div>
                <h3 className="text-xl font-bold font-mono text-[#1A1A1A] uppercase tracking-tight">
                  Silicon-Level Hardware Attestation
                </h3>
                <p className="text-sm text-[#1A1A1A]/80 leading-relaxed">
                  Every CABO Meter integrates a Microchip ATECC608A cryptographic secure element. The private key is injected during factory provisioning inside a secure facility and can never be read from memory—even if the microcontroller firmware is extracted. Each reading payload is timestamped and signed with HMAC-SHA256, proving that telemetry originated from a genuine, un-tampered physical device.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                  <div className="p-3 bg-[#F5F2ED] border border-[#1A1A1A]/10">
                    <span className="text-[9px] font-mono uppercase tracking-widest text-[#1A1A1A]/60 block">Cryptographic Co-proc</span>
                    <span className="text-xs font-mono font-bold text-[#1A1A1A]">ATECC608A</span>
                  </div>
                  <div className="p-3 bg-[#F5F2ED] border border-[#1A1A1A]/10">
                    <span className="text-[9px] font-mono uppercase tracking-widest text-[#1A1A1A]/60 block">Key Storage</span>
                    <span className="text-xs font-mono font-bold text-[#1A1A1A]">Secure EEPROM</span>
                  </div>
                  <div className="p-3 bg-[#F5F2ED] border border-[#1A1A1A]/10">
                    <span className="text-[9px] font-mono uppercase tracking-widest text-[#1A1A1A]/60 block">Signing Algorithm</span>
                    <span className="text-xs font-mono font-bold text-[#1A1A1A]">HMAC-SHA256</span>
                  </div>
                  <div className="p-3 bg-[#F5F2ED] border border-[#1A1A1A]/10">
                    <span className="text-[9px] font-mono uppercase tracking-widest text-[#1A1A1A]/60 block">Tamper Detection</span>
                    <span className="text-xs font-mono font-bold text-[#1A1A1A]">Enclosure Switch</span>
                  </div>
                </div>
              </div>
            )}

            {selectedSpec === 'buffering' && (
              <div className="space-y-4">
                <div className="text-[10px] font-mono text-[#C88C32] font-bold uppercase tracking-widest">
                  FAULT TOLERANCE & OFFLINE RESILIENCE
                </div>
                <h3 className="text-xl font-bold font-mono text-[#1A1A1A] uppercase tracking-tight">
                  30-Day Circular Flash Buffer
                </h3>
                <p className="text-sm text-[#1A1A1A]/80 leading-relaxed">
                  Monsoon storms, cellular base station maintenance, and fiber cuts regularly interrupt rural connectivity. When network coverage drops, the CABO Meter switches seamlessly to offline buffering, logging every 1-minute signed record to onboard industrial SPI NOR Flash. Once connection is re-established, records are batched and back-filled in chronological order with original NTP/cellular timestamps preserved.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                  <div className="p-3 bg-[#F5F2ED] border border-[#1A1A1A]/10">
                    <span className="text-[9px] font-mono uppercase tracking-widest text-[#1A1A1A]/60 block">Storage Medium</span>
                    <span className="text-xs font-mono font-bold text-[#1A1A1A]">128MB SPI NOR</span>
                  </div>
                  <div className="p-3 bg-[#F5F2ED] border border-[#1A1A1A]/10">
                    <span className="text-[9px] font-mono uppercase tracking-widest text-[#1A1A1A]/60 block">Buffering Horizon</span>
                    <span className="text-xs font-mono font-bold text-[#1A1A1A]">30 Days @ 1-Min</span>
                  </div>
                  <div className="p-3 bg-[#F5F2ED] border border-[#1A1A1A]/10">
                    <span className="text-[9px] font-mono uppercase tracking-widest text-[#1A1A1A]/60 block">Time Source</span>
                    <span className="text-xs font-mono font-bold text-[#1A1A1A]">TCXO RTC + Supercap</span>
                  </div>
                  <div className="p-3 bg-[#F5F2ED] border border-[#1A1A1A]/10">
                    <span className="text-[9px] font-mono uppercase tracking-widest text-[#1A1A1A]/60 block">Backfill Mode</span>
                    <span className="text-xs font-mono font-bold text-[#1A1A1A]">Ordered Re-sync</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

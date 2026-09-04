import React, { useState } from 'react';
import {
  MapPin,
  Radio,
  Zap,
  Leaf,
  Users,
  Building,
  CheckCircle2,
  Layers,
  ArrowRight,
  Info
} from 'lucide-react';
import { PILOT_LOCATIONS } from '../data/caboData';
import { PilotNodeLocation } from '../types';

export const MadhyaPradeshNetwork: React.FC = () => {
  const [selectedCityId, setSelectedCityId] = useState<string>('indore');

  const selectedLocation = PILOT_LOCATIONS.find((loc) => loc.id === selectedCityId) || PILOT_LOCATIONS[0];

  return (
    <section id="network" className="py-16 lg:py-24 border-b border-[#1A1A1A]/20 bg-[#F5F2ED]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-[#1A1A1A]/20">
          <div>
            <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-[#2D4F36] font-bold mb-2">
              <span className="w-1.5 h-1.5 bg-[#2D4F36]"></span>
              08 / Pilot Deployment
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tighter text-[#1A1A1A] leading-[0.98]">
              MADHYA PRADESH PILOT REGION
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#1A1A1A]/80">
              Active deployment across western, central, and eastern DISCOM distribution zones.
            </p>
          </div>

          <div className="mt-4 md:mt-0 flex items-center gap-2">
            <span className="px-3 py-1 bg-white text-[#1A1A1A] border border-[#1A1A1A]/20 text-[10px] font-mono font-bold uppercase tracking-widest">
              DEMO DATA · PILOT NETWORK
            </span>
          </div>
        </div>

        {/* 4 Region-wide Aggregate Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          <div className="border border-[#1A1A1A]/20 bg-white p-4">
            <span className="text-[9px] font-mono uppercase tracking-widest text-[#1A1A1A]/60 block mb-1">
              CONNECTED SYSTEMS
            </span>
            <div className="text-3xl font-mono font-bold text-[#1A1A1A] tabular-nums">
              247 <span className="text-xs font-normal text-[#1A1A1A]/60">Roofs</span>
            </div>
            <span className="text-[10px] font-mono text-[#2D4F36] mt-1 block uppercase tracking-wider font-bold">
              Residential, MSME & Inst.
            </span>
          </div>

          <div className="border border-[#1A1A1A]/20 bg-white p-4">
            <span className="text-[9px] font-mono uppercase tracking-widest text-[#1A1A1A]/60 block mb-1">
              MONITORED CAPACITY
            </span>
            <div className="text-3xl font-mono font-bold text-[#1A1A1A] tabular-nums">
              1.82 <span className="text-xs font-normal text-[#1A1A1A]/60">MW</span>
            </div>
            <span className="text-[10px] font-mono text-[#1A1A1A]/70 mt-1 block uppercase tracking-wide">
              1,820 kW aggregate peak
            </span>
          </div>

          <div className="border border-[#1A1A1A]/20 bg-white p-4">
            <span className="text-[9px] font-mono uppercase tracking-widest text-[#1A1A1A]/60 block mb-1">
              TRACKED GENERATION
            </span>
            <div className="text-3xl font-mono font-bold text-[#1A1A1A] tabular-nums">
              2.1 <span className="text-xs font-normal text-[#1A1A1A]/60">GWh</span>
            </div>
            <span className="text-[10px] font-mono text-[#1A1A1A]/70 mt-1 block uppercase tracking-wide">
              2.1M verified kWh to date
            </span>
          </div>

          <div className="border border-[#1A1A1A]/20 bg-white p-4">
            <span className="text-[9px] font-mono uppercase tracking-widest text-[#1A1A1A]/60 block mb-1">
              EST. CO₂ AVOIDED
            </span>
            <div className="text-3xl font-mono font-bold text-[#2D4F36] tabular-nums">
              1,590 <span className="text-xs font-normal text-[#1A1A1A]/60">tCO₂e</span>
            </div>
            <span className="text-[10px] font-mono text-[#2D4F36] mt-1 block uppercase tracking-wide font-bold">
              CEA 0.716 baseline factor
            </span>
          </div>
        </div>

        {/* Madhya Pradesh Schematic Network Map + City Detail Pane */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Schematic Map of MP */}
          <div className="lg:col-span-7 border-2 border-[#1A1A1A] bg-white p-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#1A1A1A]/10 text-xs font-mono">
              <span className="font-bold text-[#1A1A1A] uppercase tracking-wider text-[11px]">
                DISTRIBUTED TELEMETRY NODES (CLICK CITY TO INSPECT)
              </span>
              <span className="text-[#2D4F36] font-bold text-[10px] uppercase tracking-widest">STATE OF MP</span>
            </div>

            {/* Schematic Territory Visualizer */}
            <div className="relative h-80 sm:h-96 w-full my-4 border border-[#1A1A1A]/20 bg-[#F5F2ED] tech-dot-pattern overflow-hidden flex items-center justify-center p-4">
              {/* Map Outline Overlay Text */}
              <div className="absolute top-3 left-3 text-[10px] font-mono text-[#1A1A1A]/60">
                <div className="font-bold uppercase tracking-wider">ZONE: MP DISCOM TERRITORY</div>
                <div className="text-[9px] uppercase tracking-widest">21°17'N – 26°52'N | 74°08'E – 82°49'E</div>
              </div>

              {/* Connecting Mesh Lines between Cities */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-[#1A1A1A]/30 stroke-dasharray-2 stroke-1">
                <line x1="28%" y1="64%" x2="44%" y2="52%" />
                <line x1="28%" y1="64%" x2="26%" y2="50%" />
                <line x1="44%" y1="52%" x2="26%" y2="50%" />
                <line x1="44%" y1="52%" x2="50%" y2="18%" />
                <line x1="44%" y1="52%" x2="70%" y2="54%" />
              </svg>

              {/* City Nodes */}
              {PILOT_LOCATIONS.map((loc) => {
                const isSelected = selectedCityId === loc.id;
                return (
                  <button
                    key={loc.id}
                    type="button"
                    onClick={() => setSelectedCityId(loc.id)}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 group focus:outline-none"
                    style={{ left: `${loc.coordinates.x}%`, top: `${loc.coordinates.y}%` }}
                  >
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-6 h-6 flex items-center justify-center border transition-all ${
                          isSelected
                            ? 'bg-[#2D4F36] border-[#1A1A1A] text-white shadow-none scale-110'
                            : 'bg-white border-[#1A1A1A] text-[#1A1A1A] group-hover:bg-[#F5F2ED]'
                        }`}
                      >
                        <span className="text-[9px] font-mono font-bold">
                          {loc.connectedSystems}
                        </span>
                      </div>
                      <span
                        className={`text-[9px] font-mono uppercase font-bold mt-1 px-1.5 py-0.5 border ${
                          isSelected
                            ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]'
                            : 'bg-white text-[#1A1A1A] border-[#1A1A1A]/30 group-hover:bg-[#F5F2ED]'
                        }`}
                      >
                        {loc.name}
                      </span>
                    </div>
                  </button>
                );
              })}

              <div className="absolute bottom-3 right-3 text-[9px] font-mono uppercase tracking-widest text-[#1A1A1A]/60 bg-white/90 px-2 py-1 border border-[#1A1A1A]/20">
                MARKERS = ACTIVE SYSTEMS COUNT
              </div>
            </div>

            {/* City Selector Pill Strip */}
            <div className="flex flex-wrap gap-2 pt-2">
              {PILOT_LOCATIONS.map((loc) => (
                <button
                  key={loc.id}
                  type="button"
                  onClick={() => setSelectedCityId(loc.id)}
                  className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider font-bold border transition-colors ${
                    selectedCityId === loc.id
                      ? 'bg-[#2D4F36] text-white border-[#2D4F36]'
                      : 'bg-white text-[#1A1A1A] border-[#1A1A1A]/20 hover:bg-[#F5F2ED]'
                  }`}
                >
                  {loc.name} ({loc.connectedSystems})
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Detailed Node Dossier */}
          <div className="lg:col-span-5 border-2 border-[#1A1A1A] bg-white p-6 shadow-none">
            <div className="flex items-center justify-between pb-4 border-b border-[#1A1A1A]/10">
              <div>
                <span className="text-[10px] font-mono text-[#C88C32] font-bold uppercase tracking-widest block">
                  DISTRICT NODE SUMMARY
                </span>
                <h3 className="text-xl sm:text-2xl font-bold font-mono text-[#1A1A1A] uppercase tracking-tight">
                  {selectedLocation.name}, MP
                </h3>
              </div>
              <span className="text-[10px] font-mono uppercase tracking-widest px-2 py-1 bg-[#F5F2ED] text-[#1A1A1A] border border-[#1A1A1A]/20 font-bold">
                {selectedLocation.discom}
              </span>
            </div>

            <div className="py-5 space-y-4 text-xs font-mono">
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-[#F5F2ED] border border-[#1A1A1A]/20">
                  <span className="text-[#1A1A1A]/60 block text-[9px] uppercase tracking-widest">Connected Capacity</span>
                  <span className="text-lg font-bold text-[#1A1A1A] tabular-nums">
                    {selectedLocation.totalCapacityKw} kW
                  </span>
                </div>
                <div className="p-3 bg-[#F5F2ED] border border-[#1A1A1A]/20">
                  <span className="text-[#1A1A1A]/60 block text-[9px] uppercase tracking-widest">Daily Generation</span>
                  <span className="text-lg font-bold text-[#2D4F36] tabular-nums">
                    {selectedLocation.dailyGenerationKwh} kWh
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-[#F5F2ED] border border-[#1A1A1A]/20">
                  <span className="text-[#1A1A1A]/60 block text-[9px] uppercase tracking-widest">Today's Avoided CO₂</span>
                  <span className="text-lg font-bold text-[#2D4F36] tabular-nums">
                    {selectedLocation.co2AvoidedTodayKg} kg
                  </span>
                </div>
                <div className="p-3 bg-[#F5F2ED] border border-[#1A1A1A]/20">
                  <span className="text-[#1A1A1A]/60 block text-[9px] uppercase tracking-widest">Average Confidence</span>
                  <span className="text-lg font-bold text-[#1A1A1A] tabular-nums">
                    {selectedLocation.avgConfidence}%
                  </span>
                </div>
              </div>

              {/* Breakdown of Installation Types */}
              <div className="p-3 bg-[#F5F2ED] border border-[#1A1A1A]/20">
                <div className="text-[10px] text-[#1A1A1A]/70 uppercase font-bold tracking-widest mb-2">
                  INSTALLATION COMPOSITION
                </div>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="p-1.5 bg-white border border-[#1A1A1A]/20">
                    <span className="block text-[9px] uppercase tracking-wider text-[#1A1A1A]/60">Res.</span>
                    <span className="font-bold text-[#1A1A1A]">{selectedLocation.installTypes.residential}</span>
                  </div>
                  <div className="p-1.5 bg-white border border-[#1A1A1A]/20">
                    <span className="block text-[9px] uppercase tracking-wider text-[#1A1A1A]/60">MSME</span>
                    <span className="font-bold text-[#1A1A1A]">{selectedLocation.installTypes.msme}</span>
                  </div>
                  <div className="p-1.5 bg-white border border-[#1A1A1A]/20">
                    <span className="block text-[9px] uppercase tracking-wider text-[#1A1A1A]/60">Inst.</span>
                    <span className="font-bold text-[#1A1A1A]">{selectedLocation.installTypes.institutions}</span>
                  </div>
                </div>
              </div>

              {/* Local Installer Partners */}
              <div className="pt-2">
                <span className="text-[10px] text-[#1A1A1A]/70 uppercase font-bold tracking-widest block mb-1">
                  AUTHORIZED INSTALLATION & EPC PARTNERS
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedLocation.activeInstallers.map((inst, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 bg-white border border-[#1A1A1A]/20 text-[10px] text-[#1A1A1A] uppercase tracking-wide font-bold"
                    >
                      {inst}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#1A1A1A]/10 text-[10px] font-mono text-[#1A1A1A]/60 flex justify-between items-center uppercase tracking-widest">
              <span>LAT: {selectedLocation.lat}° N</span>
              <span>LNG: {selectedLocation.lng}° E</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

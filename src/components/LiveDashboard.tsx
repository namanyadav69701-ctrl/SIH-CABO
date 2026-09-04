import React, { useState, useEffect } from 'react';
import {
  Activity,
  Zap,
  Leaf,
  Calendar,
  Radio,
  CheckCircle2,
  Clock,
  Layers,
  ArrowUpRight,
  Filter,
  RefreshCw,
  TrendingUp,
  Server
} from 'lucide-react';
import { HOURLY_GENERATION_CURVE, INITIAL_LIVE_EVENTS } from '../data/caboData';
import { LiveMRVEvent } from '../types';

export const LiveDashboard: React.FC = () => {
  const [selectedHour, setSelectedHour] = useState<number>(6); // 12:00 peak
  const [events, setEvents] = useState<LiveMRVEvent[]>(INITIAL_LIVE_EVENTS);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Periodic simulation of live event feed
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const timeStr = now.toTimeString().split(' ')[0];
      const nodes = ['CABO-MP-0247', 'CABO-MP-0193', 'CABO-MP-0082', 'CABO-MP-0114', 'CABO-MP-0205'];
      const cities = ['Indore', 'Bhopal', 'Ujjain', 'Gwalior', 'Jabalpur'];
      const randomIdx = Math.floor(Math.random() * nodes.length);

      const eventTemplates: Omit<LiveMRVEvent, 'id' | 'timestamp'>[] = [
        {
          nodeId: nodes[randomIdx],
          city: cities[randomIdx],
          eventType: 'METER_READING',
          description: `Meter reading received: ${(3.8 + Math.random() * 2.5).toFixed(2)} kW active power`,
          hash: '0x' + Math.random().toString(16).substring(2, 12),
          badgeType: 'info',
        },
        {
          nodeId: nodes[randomIdx],
          city: cities[randomIdx],
          eventType: 'SIGNATURE_VERIFIED',
          description: 'Hardware ATECC608 signature validated on public key ring',
          hash: '0x' + Math.random().toString(16).substring(2, 12),
          badgeType: 'success',
        },
        {
          nodeId: nodes[randomIdx],
          city: cities[randomIdx],
          eventType: 'OCR_CROSS_CHECK',
          description: `OCR cross-check completed (Confidence ${(98.5 + Math.random() * 1.3).toFixed(1)}%)`,
          hash: '0x' + Math.random().toString(16).substring(2, 12),
          badgeType: 'success',
        },
        {
          nodeId: nodes[randomIdx],
          city: cities[randomIdx],
          eventType: 'BATCH_COMMITTED',
          description: `Reading committed to dMRV Batch #MP-2026-B${Math.floor(Math.random() * 20 + 70)}`,
          hash: '0x' + Math.random().toString(16).substring(2, 12),
          badgeType: 'info',
        },
      ];

      const chosen = eventTemplates[Math.floor(Math.random() * eventTemplates.length)];
      const newEvt: LiveMRVEvent = {
        id: `EVT-${Math.floor(Math.random() * 9000 + 1000)}`,
        timestamp: timeStr,
        ...chosen,
      };

      setEvents((prev) => [newEvt, ...prev.slice(0, 7)]);
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  const triggerManualRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 500);
  };

  const activeCurvePoint = HOURLY_GENERATION_CURVE[selectedHour];

  return (
    <section id="dashboard" className="py-16 lg:py-24 border-b border-[#1A1A1A]/20 bg-[#F5F2ED]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-[#1A1A1A]/20">
          <div>
            <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-[#2D4F36] font-bold mb-2">
              <span className="w-1.5 h-1.5 bg-[#2D4F36]"></span>
              05 / Operational Telemetry
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tighter text-[#1A1A1A] leading-[0.98]">
              CABO OPERATIONS COMMAND CENTER
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#1A1A1A]/80">
              Real-time regional telemetry aggregated across active pilot rooftop nodes.
            </p>
          </div>

          <div className="mt-4 md:mt-0 flex items-center gap-3">
            <span className="text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 bg-white text-[#1A1A1A] border border-[#1A1A1A]/20 font-bold">
              DEMO DATA · PILOT RUNTIME
            </span>
            <button
              type="button"
              onClick={triggerManualRefresh}
              className="p-2 border border-[#1A1A1A]/20 bg-white hover:bg-[#1A1A1A] hover:text-white text-[#1A1A1A] transition-colors"
              title="Refresh Stream"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        {/* 5 Core Top Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-10">
          <div className="border border-[#1A1A1A]/20 bg-white p-4">
            <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-[#1A1A1A]/60 mb-1">
              <span>SOLAR GENERATION</span>
              <Zap className="w-3.5 h-3.5 text-[#C88C32]" />
            </div>
            <div className="text-2xl sm:text-3xl font-mono font-bold text-[#1A1A1A] tabular-nums">
              24.8 <span className="text-xs font-normal text-[#1A1A1A]/60">kWh</span>
            </div>
            <div className="text-[10px] font-mono text-[#2D4F36] mt-1 font-bold uppercase tracking-wider">
              Today · Node MP-0247
            </div>
          </div>

          <div className="border border-[#1A1A1A]/20 bg-white p-4">
            <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-[#1A1A1A]/60 mb-1">
              <span>EST. CO₂ AVOIDED</span>
              <Leaf className="w-3.5 h-3.5 text-[#2D4F36]" />
            </div>
            <div className="text-2xl sm:text-3xl font-mono font-bold text-[#2D4F36] tabular-nums">
              18.7 <span className="text-xs font-normal text-[#1A1A1A]/60">kg</span>
            </div>
            <div className="text-[10px] font-mono text-[#1A1A1A]/70 mt-1 uppercase tracking-wider">
              CEA 0.716 kg/kWh factor
            </div>
          </div>

          <div className="border border-[#1A1A1A]/20 bg-white p-4">
            <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-[#1A1A1A]/60 mb-1">
              <span>MONTHLY GENERATION</span>
              <Calendar className="w-3.5 h-3.5 text-[#1A1A1A]/60" />
            </div>
            <div className="text-2xl sm:text-3xl font-mono font-bold text-[#1A1A1A] tabular-nums">
              642 <span className="text-xs font-normal text-[#1A1A1A]/60">kWh</span>
            </div>
            <div className="text-[10px] font-mono text-[#1A1A1A]/70 mt-1 uppercase tracking-wider">
              Current Billing Cycle
            </div>
          </div>

          <div className="border border-[#1A1A1A]/20 bg-white p-4">
            <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-[#1A1A1A]/60 mb-1">
              <span>DEVICES ONLINE</span>
              <Radio className="w-3.5 h-3.5 text-[#2D4F36]" />
            </div>
            <div className="text-2xl sm:text-3xl font-mono font-bold text-[#1A1A1A] tabular-nums">
              247 <span className="text-xs font-normal text-[#1A1A1A]/60">/ 250</span>
            </div>
            <div className="text-[10px] font-mono text-[#2D4F36] mt-1 font-bold uppercase tracking-wider">
              98.8% Availability
            </div>
          </div>

          <div className="border border-[#1A1A1A]/20 bg-white p-4 col-span-2 lg:col-span-1">
            <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-[#1A1A1A]/60 mb-1">
              <span>VERIFIED READINGS</span>
              <CheckCircle2 className="w-3.5 h-3.5 text-[#2D4F36]" />
            </div>
            <div className="text-2xl sm:text-3xl font-mono font-bold text-[#2D4F36] tabular-nums">
              98.7%
            </div>
            <div className="text-[10px] font-mono text-[#1A1A1A]/70 mt-1 uppercase tracking-wider">
              Multi-source pass rate
            </div>
          </div>
        </div>

        {/* Dashboard Main Grid: Graph + Live Event Feed */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Energy Generation Graph with Interactive Hour Selector */}
          <div className="lg:col-span-7 border-2 border-[#1A1A1A] bg-white p-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#1A1A1A]/10 text-xs font-mono">
              <div>
                <span className="font-bold text-[#1A1A1A] uppercase tracking-wider text-[11px]">
                  SOLAR GENERATION PROFILE (24-HOUR ACTIVE POWER)
                </span>
                <span className="text-[10px] text-[#1A1A1A]/60 block mt-0.5 uppercase tracking-wide">
                  Node MP-0247 · 5.0 kW Monocrystalline · Sanwer, Indore
                </span>
              </div>
              <div className="text-right">
                <span className="text-[#C88C32] font-bold text-xs uppercase tracking-wider">
                  {activeCurvePoint.hour} IST : {activeCurvePoint.kw.toFixed(2)} kW
                </span>
              </div>
            </div>

            {/* Custom SVG Solar Curve Visualizer */}
            <div className="py-6">
              <div className="h-52 w-full relative flex items-end">
                {/* Horizontal Baseline Guides */}
                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none text-[9px] font-mono text-[#1A1A1A]/40 uppercase">
                  <div className="border-b border-dashed border-[#1A1A1A]/10 w-full pb-0.5">5.0 kW</div>
                  <div className="border-b border-dashed border-[#1A1A1A]/10 w-full pb-0.5">3.75 kW</div>
                  <div className="border-b border-dashed border-[#1A1A1A]/10 w-full pb-0.5">2.5 kW</div>
                  <div className="border-b border-dashed border-[#1A1A1A]/10 w-full pb-0.5">1.25 kW</div>
                  <div className="border-b border-[#1A1A1A]/30 w-full">0 kW</div>
                </div>

                {/* SVG Area and Bar Elements */}
                <div className="relative z-10 w-full h-full flex items-end justify-between px-2 pt-4">
                  {HOURLY_GENERATION_CURVE.map((pt, idx) => {
                    const heightPct = Math.max(4, (pt.kw / 5.5) * 100);
                    const isSelected = selectedHour === idx;
                    return (
                      <div
                        key={pt.hour}
                        onClick={() => setSelectedHour(idx)}
                        className="flex-1 flex flex-col items-center cursor-pointer group px-0.5"
                      >
                        <div
                          className={`w-full transition-all ${
                            isSelected
                              ? 'bg-[#2D4F36]'
                              : 'bg-[#1A1A1A]/20 group-hover:bg-[#1A1A1A]/40'
                          }`}
                          style={{ height: `${heightPct}%` }}
                        ></div>
                        <span
                          className={`text-[9px] font-mono mt-2 tracking-tighter ${
                            isSelected ? 'font-bold text-[#2D4F36]' : 'text-[#1A1A1A]/60'
                          }`}
                        >
                          {pt.hour.split(':')[0]}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Selected Hour Technical Readout */}
            <div className="pt-4 border-t border-[#1A1A1A]/10 grid grid-cols-3 gap-4 text-xs font-mono text-[#1A1A1A]">
              <div>
                <span className="text-[9px] text-[#1A1A1A]/60 uppercase tracking-widest block">Selected Hour</span>
                <span className="font-bold text-[#1A1A1A]">{activeCurvePoint.hour} IST</span>
              </div>
              <div>
                <span className="text-[9px] text-[#1A1A1A]/60 uppercase tracking-widest block">Instantaneous Yield</span>
                <span className="font-bold text-[#2D4F36]">{activeCurvePoint.kw} kW</span>
              </div>
              <div>
                <span className="text-[9px] text-[#1A1A1A]/60 uppercase tracking-widest block">Global Solar Insolation</span>
                <span className="font-bold text-[#C88C32]">{activeCurvePoint.insolation} W/m²</span>
              </div>
            </div>
          </div>

          {/* Right Column: Live Event Feed */}
          <div className="lg:col-span-5 border-2 border-[#1A1A1A] bg-white p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-[#1A1A1A]/10 text-xs font-mono">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-[#2D4F36]" />
                  <span className="font-bold text-[#1A1A1A] uppercase text-[11px] tracking-wider">
                    LIVE dMRV TELEMETRY STREAM
                  </span>
                </div>
                <span className="text-[10px] text-[#2D4F36] font-bold tracking-widest uppercase animate-pulse">
                  ● STREAMING
                </span>
              </div>

              {/* Event Feed List */}
              <div className="divide-y divide-[#1A1A1A]/10 mt-3 space-y-1">
                {events.map((evt) => (
                  <div key={evt.id} className="py-2.5 text-xs font-mono">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[#1A1A1A]/50 text-[10px]">{evt.timestamp}</span>
                        <span className="font-bold text-[#1A1A1A] text-xs">{evt.nodeId}</span>
                        <span className="text-[10px] text-[#1A1A1A]/60">({evt.city})</span>
                      </div>
                      <span
                        className={`text-[8px] uppercase px-1.5 py-0.5 font-bold tracking-widest border ${
                          evt.badgeType === 'success'
                            ? 'bg-[#2D4F36]/10 text-[#2D4F36] border-[#2D4F36]'
                            : 'bg-white text-[#1A1A1A] border-[#1A1A1A]/30'
                        }`}
                      >
                        {evt.eventType.replace('_', ' ')}
                      </span>
                    </div>
                    <div className="text-[#1A1A1A]/80 text-[11px] leading-snug">
                      {evt.description}
                    </div>
                    <div className="text-[9px] text-[#1A1A1A]/50 mt-0.5 truncate uppercase">
                      Payload Hash: {evt.hash}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-[#1A1A1A]/10 text-[10px] font-mono text-[#1A1A1A]/60 flex justify-between items-center uppercase tracking-widest">
              <span>BUFFER: 340ms</span>
              <span>TLS 1.3 ACTIVE</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

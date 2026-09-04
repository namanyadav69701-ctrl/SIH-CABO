import React, { useState, useEffect } from 'react';
import {
  Activity,
  ArrowRight,
  ShieldCheck,
  Zap,
  TrendingUp,
  Leaf,
  Coins,
  RefreshCw,
  Cpu,
  Radio,
  Sliders,
  CheckCircle2,
  Lock,
  ChevronRight,
  SunMedium,
  Award,
  Layers,
  FileCheck,
  Calendar,
  Banknote,
  FileText,
  Download,
  Info,
  Scale
} from 'lucide-react';
import { CEA_INDIA_GRID_FACTOR } from '../data/caboData';
import { WeeklyReportView } from './WeeklyReportView';

interface LiveMonitorPageProps {
  onNavigateToProcess: () => void;
  onNavigateToLogin?: () => void;
  onOpenTerminal?: () => void;
}

interface NodeData {
  id: string;
  name: string;
  city: string;
  category: string;
  capacityKw: number;
  outputKw: number;
  voltageV: number;
  currentA: number;
  gridFreqHz: number;
  todayKwh: number;
  targetKwh: number;
  co2AvoidedKg: number;
  ccToday: number;
  ccMonth: number;
  ccMonetizedInr: number;
  energySavedMonthKwh: number;
  billSavingsMonthInr: number;
  coalAvoidedKg: number;
  rssiDbm: number;
  discom: string;
  inverterTempC: number;
  merkleBatch: string;
  merkleBatchProgress: number;
}

const NODES_DATA: Record<string, NodeData> = {
  'MP-0247': {
    id: 'MP-0247',
    name: 'Sanwer Industrial Rooftop',
    city: 'Indore, Madhya Pradesh',
    category: 'Commercial MSME',
    capacityKw: 6.0,
    outputKw: 5.07,
    voltageV: 230.4,
    currentA: 22.0,
    gridFreqHz: 49.98,
    todayKwh: 24.8,
    targetKwh: 26.5,
    co2AvoidedKg: 18.7,
    ccToday: 0.0187,
    ccMonth: 0.485,
    ccMonetizedInr: 3880,
    energySavedMonthKwh: 678,
    billSavingsMonthInr: 5085,
    coalAvoidedKg: 1960,
    rssiDbm: -72,
    discom: 'MPPKVVCL (West Discom)',
    inverterTempC: 41.2,
    merkleBatch: 'MP-IND-2026-B08',
    merkleBatchProgress: 82,
  },
  'MP-0104': {
    id: 'MP-0104',
    name: 'Govindpura Textile Workshop',
    city: 'Bhopal, Madhya Pradesh',
    category: 'MSME Cluster',
    capacityKw: 15.0,
    outputKw: 12.84,
    voltageV: 232.1,
    currentA: 55.3,
    gridFreqHz: 50.02,
    todayKwh: 63.4,
    targetKwh: 68.0,
    co2AvoidedKg: 45.4,
    ccToday: 0.0454,
    ccMonth: 1.180,
    ccMonetizedInr: 9440,
    energySavedMonthKwh: 1648,
    billSavingsMonthInr: 12360,
    coalAvoidedKg: 4760,
    rssiDbm: -68,
    discom: 'MPMKVVCL (Central Discom)',
    inverterTempC: 43.8,
    merkleBatch: 'MP-BHP-2026-B04',
    merkleBatchProgress: 94,
  },
  'MP-0389': {
    id: 'MP-0389',
    name: 'Mahakal Nagar Residence',
    city: 'Ujjain, Madhya Pradesh',
    category: 'Residential Rooftop',
    capacityKw: 3.3,
    outputKw: 2.89,
    voltageV: 229.8,
    currentA: 12.6,
    gridFreqHz: 49.99,
    todayKwh: 14.2,
    targetKwh: 15.0,
    co2AvoidedKg: 10.2,
    ccToday: 0.0102,
    ccMonth: 0.274,
    ccMonetizedInr: 2192,
    energySavedMonthKwh: 382,
    billSavingsMonthInr: 2865,
    coalAvoidedKg: 1105,
    rssiDbm: -75,
    discom: 'MPPKVVCL (West Discom)',
    inverterTempC: 38.5,
    merkleBatch: 'MP-UJN-2026-B02',
    merkleBatchProgress: 61,
  },
};

export const LiveMonitorPage: React.FC<LiveMonitorPageProps> = ({
  onNavigateToProcess,
  onNavigateToNetwork,
  onOpenTerminal,
  onNavigateToLogin,
}) => {
  const [selectedNodeId, setSelectedNodeId] = useState<string>('MP-0247');
  const [isLiveSimulating, setIsLiveSimulating] = useState<boolean>(true);
  const [jitter, setJitter] = useState<number>(0);
  const [activeSubView, setActiveSubView] = useState<'live' | 'weekly' | 'gateway'>('live');

  // Interactive Commission Calculator State
  const [calcCapacityKw, setCalcCapacityKw] = useState<number>(6.0);
  const [creditMarketPriceInr, setCreditMarketPriceInr] = useState<number>(800);

  const node = NODES_DATA[selectedNodeId] || NODES_DATA['MP-0247'];

  // Calculate monthly solar generation estimate (125 kWh/kW/month in MP sun hours)
  const calcEstMonthlyKwh = calcCapacityKw * 125;
  const calcEstMonthlyCo2Kg = calcEstMonthlyKwh * 0.716;
  const calcEstMonthlyCredits = calcEstMonthlyCo2Kg / 1000;
  const calcGrossValue = calcEstMonthlyCredits * creditMarketPriceInr;
  const calcGatewayFee = calcGrossValue * 0.04;
  const calcHostPayout = calcGrossValue * 0.96;

  // Realistic subtle live telemetry flutter
  useEffect(() => {
    if (!isLiveSimulating) return;
    const interval = setInterval(() => {
      setJitter((Math.random() - 0.5) * 0.04);
    }, 2800);
    return () => clearInterval(interval);
  }, [isLiveSimulating]);

  const displayKw = (node.outputKw + (isLiveSimulating ? jitter : 0)).toFixed(2);
  const targetPct = Math.min(100, Math.round((node.todayKwh / node.targetKwh) * 100));

  return (
    <div className="bg-[#181A18] text-[#F5F2ED] min-h-[calc(100vh-4rem)] relative font-sans selection:bg-[#2D4F36] selection:text-white">
      {/* Subtle Dot Grid Background Pattern on Left Margin */}
      <div
        className="absolute inset-y-0 left-0 w-8 sm:w-16 pointer-events-none opacity-20"
        style={{
          backgroundImage: 'radial-gradient(#C88C32 1px, transparent 1px)',
          backgroundSize: '16px 16px',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 relative z-10">
        {/* SUB-VIEW TAB NAVIGATION: LIVE CONSOLE vs WEEKLY REPORT vs GATEWAY COMMISSION */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-[#2E332E]">
          <div className="flex items-center gap-2 font-mono text-xs">
            <button
              type="button"
              onClick={() => setActiveSubView('live')}
              className={`flex items-center gap-2 px-3.5 py-2 uppercase font-bold tracking-wider transition-colors ${
                activeSubView === 'live'
                  ? 'bg-[#F5F2ED] text-[#141414] border-b-2 border-[#00FF00]'
                  : 'bg-[#222622] text-[#AAAAAA] hover:text-white hover:bg-[#2A302A]'
              }`}
            >
              <Activity className="w-3.5 h-3.5 text-[#00FF00]" />
              <span>01 / LIVE CONSOLE</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveSubView('weekly')}
              className={`flex items-center gap-2 px-3.5 py-2 uppercase font-bold tracking-wider transition-colors ${
                activeSubView === 'weekly'
                  ? 'bg-[#F5F2ED] text-[#141414] border-b-2 border-[#C88C32]'
                  : 'bg-[#222622] text-[#AAAAAA] hover:text-white hover:bg-[#2A302A]'
              }`}
            >
              <Calendar className="w-3.5 h-3.5 text-[#C88C32]" />
              <span>02 / WEEKLY REPORTING (7-DAY AUDIT)</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveSubView('gateway')}
              className={`flex items-center gap-2 px-3.5 py-2 uppercase font-bold tracking-wider transition-colors ${
                activeSubView === 'gateway'
                  ? 'bg-[#F5F2ED] text-[#141414] border-b-2 border-[#E5A84B]'
                  : 'bg-[#222622] text-[#AAAAAA] hover:text-white hover:bg-[#2A302A]'
              }`}
            >
              <Scale className="w-3.5 h-3.5 text-[#E5A84B]" />
              <span>03 / GATEWAY COMMISSION (4% FEE)</span>
            </button>
          </div>

          <div className="flex items-center gap-3 font-mono text-xs">
            {onNavigateToLogin && (
              <button
                type="button"
                onClick={onNavigateToLogin}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#2A332C] hover:bg-[#344237] text-white border border-[#3E4E42] text-[10px] uppercase font-bold tracking-wider transition-colors"
              >
                <span>SOLAR HOST LOGIN</span>
                <ChevronRight className="w-3 h-3 text-[#E5A84B]" />
              </button>
            )}
          </div>
        </div>

        {/* CONDITION 1: IF USER SELECTS WEEKLY REPORTING TAB */}
        {activeSubView === 'weekly' && (
          <div className="mb-10">
            <WeeklyReportView
              nodeId={`CABO-${node.id}`}
              ownerName={node.name}
              city={node.city}
              systemKw={node.capacityKw}
            />
          </div>
        )}

        {/* CONDITION 2: IF USER SELECTS GATEWAY COMMISSION TAB */}
        {activeSubView === 'gateway' && (
          <div className="mb-10 bg-[#FAF8F5] text-[#1F2421] border-2 border-[#1F2421] p-6 sm:p-8">
            <div className="max-w-3xl mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#2B4736]/10 text-[#2B4736] font-mono text-[10px] font-bold uppercase tracking-widest mb-3">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C86D3B]" />
                <span>NON-CUSTODIAL GATEWAY · ZERO INVENTORY HOLDING</span>
              </div>
              <h2 className="text-3xl font-serif font-bold text-[#1F2421] tracking-tight">
                We Are a Gateway — Not a Carbon Credit Buyer or Speculative Broker
              </h2>
              <p className="mt-2 text-sm text-[#555047] font-sans leading-relaxed">
                Traditional carbon brokers buy credits from small solar owners at heavy discounts (often paying ₹150–₹200) and resell them to multinationals at ₹800–₹1,200, pocketing up to 75% margin.
                <strong> CABO does not buy or trade carbon credits as principal.</strong> We provide the digital verification gateway that connects rooftop producers directly with institutional buyers, routing 96% of proceeds to the solar owner.
              </p>
            </div>

            {/* Visual 3-Step Clearing Flow */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 font-mono text-xs">
              <div className="p-4 bg-white border border-[#D8D0C5]">
                <div className="text-[10px] text-[#706B63] uppercase font-bold mb-1">01 / SOLAR OWNER</div>
                <div className="text-lg font-bold text-[#2B4736] mb-1">96% Net Payout</div>
                <p className="text-xs text-[#555047] font-sans">
                  Gross solar generation is measured at the inverter terminal. Credits are minted directly to the owner's legal lot and paid via weekly UPI.
                </p>
              </div>

              <div className="p-4 bg-white border-2 border-[#C86D3B]">
                <div className="text-[10px] text-[#C86D3B] uppercase font-bold mb-1">02 / CABO dMRV GATEWAY</div>
                <div className="text-lg font-bold text-[#C86D3B] mb-1">4.0% Infrastructure Fee</div>
                <p className="text-xs text-[#555047] font-sans">
                  Covers edge silicon hardware attestation, eSIM cellular data, on-device TinyML optical OCR, and public registry retirement compliance.
                </p>
              </div>

              <div className="p-4 bg-white border border-[#D8D0C5]">
                <div className="text-[10px] text-[#706B63] uppercase font-bold mb-1">03 / CORPORATE BUYER</div>
                <div className="text-lg font-bold text-[#1F2421] mb-1">100% Direct Retirement</div>
                <p className="text-xs text-[#555047] font-sans">
                  Institutional ESG buyers purchase directly from verified micro-generators with tamper-evident Merkle cryptographic audit proofs.
                </p>
              </div>
            </div>

            {/* Interactive Fee & Payout Simulator */}
            <div className="p-6 bg-[#EFEAE1] border border-[#D8D0C5]">
              <h3 className="text-lg font-serif font-bold text-[#1F2421] mb-4">
                Interactive Gateway Settlement Calculator
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-xs font-mono font-bold uppercase text-[#1F2421] mb-2">
                    Rooftop Solar Capacity: {calcCapacityKw.toFixed(1)} kW
                  </label>
                  <input
                    type="range"
                    min="3.0"
                    max="50.0"
                    step="0.5"
                    value={calcCapacityKw}
                    onChange={(e) => setCalcCapacityKw(parseFloat(e.target.value))}
                    className="w-full accent-[#2B4736] cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-[#706B63] mt-1">
                    <span>3 kW (Residential)</span>
                    <span>15 kW (Workshop)</span>
                    <span>50 kW (MSME Plant)</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold uppercase text-[#1F2421] mb-2">
                    Carbon Benchmark Clearing Price: ₹{creditMarketPriceInr} / tCO₂e
                  </label>
                  <input
                    type="range"
                    min="500"
                    max="1500"
                    step="50"
                    value={creditMarketPriceInr}
                    onChange={(e) => setCreditMarketPriceInr(parseFloat(e.target.value))}
                    className="w-full accent-[#C86D3B] cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-[#706B63] mt-1">
                    <span>₹500 (Floor)</span>
                    <span>₹800 (National Average)</span>
                    <span>₹1,500 (Premium Article 6)</span>
                  </div>
                </div>
              </div>

              {/* Calculated Rupee Split */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono">
                <div className="p-3 bg-white border border-[#D8D0C5]">
                  <span className="text-[9px] uppercase text-[#706B63] block">EST. MONTHLY SOLAR</span>
                  <div className="text-lg font-bold text-[#1F2421]">{calcEstMonthlyKwh.toFixed(0)} kWh</div>
                  <span className="text-[9px] text-[#2B4736]">MP Solar Irradiance</span>
                </div>

                <div className="p-3 bg-white border border-[#D8D0C5]">
                  <span className="text-[9px] uppercase text-[#706B63] block">TOTAL TRADED VALUE</span>
                  <div className="text-lg font-bold text-[#1F2421]">₹{calcGrossValue.toFixed(0)}</div>
                  <span className="text-[9px] text-[#706B63]">Direct Buyer Wire</span>
                </div>

                <div className="p-3 bg-white border border-[#2B4736]">
                  <span className="text-[9px] uppercase text-[#2B4736] font-bold block">HOST NET REVENUE (96%)</span>
                  <div className="text-xl font-black text-[#2B4736]">₹{calcHostPayout.toFixed(0)}</div>
                  <span className="text-[9px] text-[#2B4736]">Direct Bank Transfer</span>
                </div>

                <div className="p-3 bg-white border border-[#C86D3B]">
                  <span className="text-[9px] uppercase text-[#C86D3B] font-bold block">CABO GATEWAY FEE (4%)</span>
                  <div className="text-xl font-bold text-[#C86D3B]">₹{calcGatewayFee.toFixed(0)}</div>
                  <span className="text-[9px] text-[#706B63]">0% Inventory Risk</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TOP STATUS BAR matching screenshot: ● CABO / NODE MP-0247   ((●)) CELLULAR ● (-72 DBM) */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 mb-6 border-b border-[#2A2A2A]">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-[#E5A84B] inline-block"></span>
            <div className="font-mono text-sm sm:text-base font-bold tracking-wider text-white flex items-center gap-2">
              <span>CABO / NODE</span>
              <select
                value={selectedNodeId}
                aria-label="Select Telemetry Node"
                onChange={(e) => setSelectedNodeId(e.target.value)}
                className="bg-[#1E1E1E] text-[#E5A84B] border border-[#333333] px-2 py-0.5 text-xs sm:text-sm font-mono font-bold focus:outline-none focus:border-[#E5A84B] cursor-pointer"
              >
                <option value="MP-0247">MP-0247 (Indore 6.0 kW)</option>
                <option value="MP-0104">MP-0104 (Bhopal 15.0 kW)</option>
                <option value="MP-0389">MP-0389 (Ujjain 3.3 kW)</option>
              </select>
            </div>
            <span className="hidden md:inline text-xs font-mono text-[#888888]">
              · {node.name}
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            {/* Cellular telemetry tag directly from screenshot */}
            <div className="flex items-center gap-2 text-[#00FF00] font-mono tracking-wider font-semibold">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00FF00] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00FF00]"></span>
              </span>
              <span>((●)) CELLULAR ● ({node.rssiDbm} DBM)</span>
            </div>

            {/* Live toggle */}
            <button
              type="button"
              onClick={() => setIsLiveSimulating(!isLiveSimulating)}
              className="px-2 py-0.5 border border-[#333333] text-[10px] uppercase font-mono text-[#AAAAAA] hover:text-white hover:border-white transition-colors"
              title="Toggle live telemetry tick"
            >
              {isLiveSimulating ? 'SIM: LIVE' : 'SIM: PAUSED'}
            </button>
          </div>
        </div>

        {/* PRIMARY TELEMETRY BOARD (Faithful to the attached user screenshot) */}
        <div className="space-y-4 mb-8">
          {/* Main Solar Output Box */}
          <div className="bg-[#1C1C1C] border border-[#2E2E2E] p-6 sm:p-8 relative">
            <div className="flex items-center justify-between mb-6">
              <span className="text-xs font-mono tracking-widest uppercase text-[#999999] font-bold">
                SOLAR OUTPUT
              </span>
              <div className="flex items-center gap-2 text-[11px] font-mono font-bold uppercase tracking-wider text-[#00FF00]">
                <span className="w-2 h-2 rounded-full bg-[#00FF00] inline-block animate-pulse"></span>
                <span>ACTIVE POWER (KW)</span>
              </div>
            </div>

            {/* Huge Output Value */}
            <div className="flex items-baseline gap-3 mb-8">
              <span className="text-6xl sm:text-7xl lg:text-8xl font-mono font-bold tracking-tight text-white tabular-nums">
                {displayKw}
              </span>
              <span className="text-2xl sm:text-3xl font-mono font-bold text-[#E5A84B]">
                kW
              </span>
            </div>

            {/* Bottom Sub-Metrics Row */}
            <div className="pt-6 border-t border-[#2A2A2A] grid grid-cols-3 gap-4 font-mono">
              <div>
                <div className="text-[10px] sm:text-xs text-[#888888] uppercase tracking-wider mb-1">
                  VOLTAGE
                </div>
                <div className="text-sm sm:text-lg font-bold text-white tabular-nums">
                  {node.voltageV} <span className="text-xs font-normal text-[#888888]">V</span>
                </div>
              </div>
              <div>
                <div className="text-[10px] sm:text-xs text-[#888888] uppercase tracking-wider mb-1">
                  CURRENT
                </div>
                <div className="text-sm sm:text-lg font-bold text-white tabular-nums">
                  {node.currentA} <span className="text-xs font-normal text-[#888888]">A</span>
                </div>
              </div>
              <div>
                <div className="text-[10px] sm:text-xs text-[#888888] uppercase tracking-wider mb-1">
                  GRID FREQ
                </div>
                <div className="text-sm sm:text-lg font-bold text-white tabular-nums">
                  {node.gridFreqHz} <span className="text-xs font-normal text-[#888888]">Hz</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Row matching screenshot: TODAY (24.8 kWh) & CO₂ AVOIDED (18.7 kg) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* TODAY Card */}
            <div className="bg-[#1C1C1C] border border-[#2E2E2E] p-6 sm:p-7 flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono tracking-widest uppercase text-[#999999] font-bold block mb-4">
                  TODAY
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl sm:text-6xl font-mono font-bold text-white tabular-nums">
                    {node.todayKwh}
                  </span>
                  <span className="text-xl font-mono font-medium text-[#888888]">
                    kWh
                  </span>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-[#2A2A2A] flex items-center justify-between text-xs font-mono text-[#888888]">
                <span>TARGET: {node.targetKwh} KWH/DAY</span>
                <span className="text-[#E5A84B] font-bold">{targetPct}% REACHED</span>
              </div>
            </div>

            {/* CO₂ AVOIDED Card with vibrant neon green value */}
            <div className="bg-[#1C1C1C] border border-[#2E2E2E] p-6 sm:p-7 flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono tracking-widest uppercase text-[#999999] font-bold block mb-4">
                  CO₂ AVOIDED
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl sm:text-6xl font-mono font-bold text-[#00FF00] tabular-nums">
                    {node.co2AvoidedKg}
                  </span>
                  <span className="text-xl font-mono font-medium text-[#00FF00]/80">
                    kg
                  </span>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-[#2A2A2A] flex items-center justify-between text-xs font-mono text-[#888888]">
                <span>CEA BASELINE FACTOR</span>
                <span className="text-[#00FF00] font-bold">0.716 kg CO₂/kWh</span>
              </div>
            </div>
          </div>
        </div>

        {/* CARBON CREDITS (CC) GENERATED & ENERGY SAVED SECTION */}
        <div className="mt-10 pt-10 border-t border-[#2A2A2A]">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-6">
            <div>
              <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-[#E5A84B] font-bold mb-1">
                <Coins className="w-3.5 h-3.5 text-[#E5A84B]" />
                MONETIZATION & IMPACT METRICS
              </div>
              <h2 className="text-2xl sm:text-3xl font-mono font-bold text-white tracking-tight uppercase">
                CARBON CREDITS (CC) & ENERGY SAVED
              </h2>
            </div>
            <span className="text-xs font-mono text-[#888888] mt-2 md:mt-0">
              METHODOLOGY: UNFCCC AMS-I.D · DISCOM: {node.discom}
            </span>
          </div>

          {/* 4 Specialized Impact & Carbon Monetization Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {/* 1. CC Generated Today */}
            <div className="bg-[#1C1C1C] border border-[#2E2E2E] p-5">
              <div className="flex items-center justify-between text-[10px] font-mono uppercase text-[#888888] tracking-widest mb-2">
                <span>CC GENERATED TODAY</span>
                <Award className="w-3.5 h-3.5 text-[#00FF00]" />
              </div>
              <div className="text-3xl sm:text-4xl font-mono font-bold text-white tabular-nums">
                {node.ccToday} <span className="text-sm font-normal text-[#888888]">tCO₂e</span>
              </div>
              <div className="mt-2 text-xs font-mono text-[#00FF00] flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Class 0.5S Verified</span>
              </div>
            </div>

            {/* 2. Cumulative Month CCs */}
            <div className="bg-[#1C1C1C] border border-[#2E2E2E] p-5">
              <div className="flex items-center justify-between text-[10px] font-mono uppercase text-[#888888] tracking-widest mb-2">
                <span>MONTH-TO-DATE CCs</span>
                <Layers className="w-3.5 h-3.5 text-[#E5A84B]" />
              </div>
              <div className="text-3xl sm:text-4xl font-mono font-bold text-[#E5A84B] tabular-nums">
                {node.ccMonth} <span className="text-sm font-normal text-[#888888]">Credits</span>
              </div>
              <div className="mt-2 text-xs font-mono text-[#AAAAAA]">
                Est. Value: <strong className="text-white">₹{node.ccMonetizedInr.toLocaleString()}</strong>
              </div>
            </div>

            {/* 3. Monthly Clean Energy Saved */}
            <div className="bg-[#1C1C1C] border border-[#2E2E2E] p-5">
              <div className="flex items-center justify-between text-[10px] font-mono uppercase text-[#888888] tracking-widest mb-2">
                <span>CLEAN ENERGY SAVED</span>
                <Zap className="w-3.5 h-3.5 text-white" />
              </div>
              <div className="text-3xl sm:text-4xl font-mono font-bold text-white tabular-nums">
                {node.energySavedMonthKwh} <span className="text-sm font-normal text-[#888888]">kWh</span>
              </div>
              <div className="mt-2 text-xs font-mono text-[#888888]">
                Offset from coal-heavy state grid
              </div>
            </div>

            {/* 4. Financial Bill Savings */}
            <div className="bg-[#1C1C1C] border border-[#2E2E2E] p-5">
              <div className="flex items-center justify-between text-[10px] font-mono uppercase text-[#888888] tracking-widest mb-2">
                <span>ELECTRICITY BILL SAVED</span>
                <Coins className="w-3.5 h-3.5 text-[#00FF00]" />
              </div>
              <div className="text-3xl sm:text-4xl font-mono font-bold text-[#00FF00] tabular-nums">
                ₹{node.billSavingsMonthInr.toLocaleString()}
              </div>
              <div className="mt-2 text-xs font-mono text-[#888888]">
                At ₹7.50/kWh Discom net tariff
              </div>
            </div>
          </div>

          {/* Merkle Batch Lot Status & Hardware Attestation */}
          <div className="bg-[#1A1A1A] border border-[#2E2E2E] p-6 mb-8 grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
            <div>
              <span className="text-[10px] text-[#888888] uppercase tracking-widest block mb-1">
                REGISTRY AGGREGATION LOT
              </span>
              <div className="text-base font-bold text-white mb-2 flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-[#E5A84B]" />
                <span>{node.merkleBatch}</span>
              </div>
              <div className="w-full h-2 bg-[#2E2E2E] overflow-hidden mb-1">
                <div
                  className="h-full bg-[#E5A84B]"
                  style={{ width: `${node.merkleBatchProgress}%` }}
                />
              </div>
              <span className="text-[11px] text-[#888888]">
                {node.merkleBatchProgress}% Aggregated toward 500 kW Registry Batch
              </span>
            </div>

            <div>
              <span className="text-[10px] text-[#888888] uppercase tracking-widest block mb-1">
                CRYPTOGRAPHIC INTEGRITY
              </span>
              <div className="text-sm font-bold text-white mb-1 flex items-center gap-1.5 text-[#00FF00]">
                <ShieldCheck className="w-4 h-4 text-[#00FF00]" />
                <span>ATECC608A SIGNATURE VERIFIED</span>
              </div>
              <p className="text-[11px] text-[#888888] leading-relaxed">
                Optical camera OCR correlates 100% with the CT current meter readings. Zero tampering detected.
              </p>
            </div>

            <div>
              <span className="text-[10px] text-[#888888] uppercase tracking-widest block mb-1">
                LIFETIME COAL & EMISSION AVOIDED
              </span>
              <div className="text-base font-bold text-white mb-1">
                {node.coalAvoidedKg.toLocaleString()} kg Thermal Coal
              </div>
              <p className="text-[11px] text-[#888888] leading-relaxed">
                Directly displacing high-emission coal generation in western MP through clean distributed rooftop PV.
              </p>
            </div>
          </div>
        </div>

        {/* CALL TO ACTION BANNER: NAVIGATE TO THE PROCESS EXPLANATION PAGE */}
        <div className="border-2 border-[#E5A84B] bg-[#1C1C1C] p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-[#E5A84B] font-bold mb-1">
              <span>WANT TO UNDERSTAND THE SCIENCE & PIPELINE?</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-mono font-bold text-white tracking-tight uppercase">
              HOW CABO WORKS: MULTI-SOURCE DIGITAL MRV & CARBON MONETIZATION
            </h3>
            <p className="text-xs sm:text-sm text-[#BBBBBB] mt-1 max-w-2xl leading-relaxed">
              Explore the 7-stage pipeline: from raw current sensing at the inverter terminal, optical camera OCR,
              and Merkle-tree cryptographic proofs to certified credit minting and direct bank transfers.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
            {onNavigateToLogin && (
              <button
                type="button"
                onClick={onNavigateToLogin}
                className="px-4 py-2.5 bg-transparent border border-[#00FF00]/40 hover:border-[#00FF00] text-[#00FF00] text-xs font-mono font-bold uppercase tracking-wider transition-colors text-center"
              >
                GATEWAY LOGIN →
              </button>
            )}
            {onOpenTerminal && (
              <button
                type="button"
                onClick={onOpenTerminal}
                className="px-4 py-2.5 bg-transparent border border-[#444444] text-white hover:border-white text-xs font-mono font-bold uppercase tracking-wider transition-colors"
              >
                INSPECT PACKET
              </button>
            )}
            <button
              type="button"
              onClick={onNavigateToProcess}
              className="px-6 py-2.5 bg-[#E5A84B] hover:bg-[#d69634] text-[#141414] text-xs font-mono font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors shrink-0"
            >
              <span>EXPLORE HOW IT WORKS</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

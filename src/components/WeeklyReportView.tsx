import React, { useState } from 'react';
import {
  Calendar,
  Download,
  Printer,
  CheckCircle2,
  ShieldCheck,
  TrendingUp,
  Banknote,
  FileText,
  Clock,
  ArrowUpRight,
  Info,
  ChevronLeft,
  ChevronRight,
  Zap,
  Leaf
} from 'lucide-react';

interface DailyLog {
  dayName: string;
  date: string;
  generationKwh: number;
  selfConsumedKwh: number;
  discomExportKwh: number;
  co2AvoidedKg: number;
  creditsTco2e: number;
  grossValueInr: number;
  gatewayFeeInr: number;
  netPayoutInr: number;
  concordancePct: number;
}

interface WeeklyDataset {
  weekCode: string;
  dateRange: string;
  status: 'SETTLED' | 'IN_PROGRESS' | 'AUDITED';
  totalKwh: number;
  totalCo2AvoidedKg: number;
  totalCredits: number;
  grossMarketValueInr: number;
  caboGatewayFeeInr: number;
  hostNetPayoutInr: number;
  settlementUpiRef: string;
  days: DailyLog[];
}

const WEEKLY_ARCHIVE: Record<string, WeeklyDataset> = {
  w36: {
    weekCode: 'WEEK 36 / 2026',
    dateRange: '29 AUG 2026 – 04 SEP 2026',
    status: 'IN_PROGRESS',
    totalKwh: 172.4,
    totalCo2AvoidedKg: 123.4,
    totalCredits: 0.1234,
    grossMarketValueInr: 987.2,
    caboGatewayFeeInr: 39.49,
    hostNetPayoutInr: 947.71,
    settlementUpiRef: 'PENDING_CYCLE_MON_0900',
    days: [
      { dayName: 'Monday', date: '29 Aug', generationKwh: 25.4, selfConsumedKwh: 16.2, discomExportKwh: 9.2, co2AvoidedKg: 18.2, creditsTco2e: 0.0182, grossValueInr: 145.6, gatewayFeeInr: 5.82, netPayoutInr: 139.78, concordancePct: 99.8 },
      { dayName: 'Tuesday', date: '30 Aug', generationKwh: 26.1, selfConsumedKwh: 15.8, discomExportKwh: 10.3, co2AvoidedKg: 18.7, creditsTco2e: 0.0187, grossValueInr: 149.6, gatewayFeeInr: 5.98, netPayoutInr: 143.62, concordancePct: 99.7 },
      { dayName: 'Wednesday', date: '31 Aug', generationKwh: 24.8, selfConsumedKwh: 17.1, discomExportKwh: 7.7, co2AvoidedKg: 17.8, creditsTco2e: 0.0178, grossValueInr: 142.4, gatewayFeeInr: 5.70, netPayoutInr: 136.70, concordancePct: 99.6 },
      { dayName: 'Thursday', date: '01 Sep', generationKwh: 23.9, selfConsumedKwh: 16.4, discomExportKwh: 7.5, co2AvoidedKg: 17.1, creditsTco2e: 0.0171, grossValueInr: 136.8, gatewayFeeInr: 5.47, netPayoutInr: 131.33, concordancePct: 99.9 },
      { dayName: 'Friday', date: '02 Sep', generationKwh: 25.8, selfConsumedKwh: 15.9, discomExportKwh: 9.9, co2AvoidedKg: 18.5, creditsTco2e: 0.0185, grossValueInr: 148.0, gatewayFeeInr: 5.92, netPayoutInr: 142.08, concordancePct: 99.7 },
      { dayName: 'Saturday', date: '03 Sep', generationKwh: 24.2, selfConsumedKwh: 18.5, discomExportKwh: 5.7, co2AvoidedKg: 17.3, creditsTco2e: 0.0173, grossValueInr: 138.4, gatewayFeeInr: 5.54, netPayoutInr: 132.86, concordancePct: 99.8 },
      { dayName: 'Sunday', date: '04 Sep', generationKwh: 22.2, selfConsumedKwh: 18.0, discomExportKwh: 4.2, co2AvoidedKg: 15.9, creditsTco2e: 0.0159, grossValueInr: 126.4, gatewayFeeInr: 5.06, netPayoutInr: 121.34, concordancePct: 99.6 },
    ],
  },
  w35: {
    weekCode: 'WEEK 35 / 2026',
    dateRange: '22 AUG 2026 – 28 AUG 2026',
    status: 'SETTLED',
    totalKwh: 168.9,
    totalCo2AvoidedKg: 120.9,
    totalCredits: 0.1209,
    grossMarketValueInr: 967.2,
    caboGatewayFeeInr: 38.69,
    hostNetPayoutInr: 928.51,
    settlementUpiRef: 'UPI-MP-98421048-AXIS',
    days: [
      { dayName: 'Monday', date: '22 Aug', generationKwh: 24.0, selfConsumedKwh: 15.5, discomExportKwh: 8.5, co2AvoidedKg: 17.2, creditsTco2e: 0.0172, grossValueInr: 137.6, gatewayFeeInr: 5.50, netPayoutInr: 132.10, concordancePct: 99.7 },
      { dayName: 'Tuesday', date: '23 Aug', generationKwh: 23.5, selfConsumedKwh: 16.0, discomExportKwh: 7.5, co2AvoidedKg: 16.8, creditsTco2e: 0.0168, grossValueInr: 134.4, gatewayFeeInr: 5.38, netPayoutInr: 129.02, concordancePct: 99.8 },
      { dayName: 'Wednesday', date: '24 Aug', generationKwh: 25.1, selfConsumedKwh: 16.2, discomExportKwh: 8.9, co2AvoidedKg: 18.0, creditsTco2e: 0.0180, grossValueInr: 144.0, gatewayFeeInr: 5.76, netPayoutInr: 138.24, concordancePct: 99.6 },
      { dayName: 'Thursday', date: '25 Aug', generationKwh: 24.8, selfConsumedKwh: 17.0, discomExportKwh: 7.8, co2AvoidedKg: 17.8, creditsTco2e: 0.0178, grossValueInr: 142.4, gatewayFeeInr: 5.70, netPayoutInr: 136.70, concordancePct: 99.9 },
      { dayName: 'Friday', date: '26 Aug', generationKwh: 23.2, selfConsumedKwh: 15.0, discomExportKwh: 8.2, co2AvoidedKg: 16.6, creditsTco2e: 0.0166, grossValueInr: 132.8, gatewayFeeInr: 5.31, netPayoutInr: 127.49, concordancePct: 99.7 },
      { dayName: 'Saturday', date: '27 Aug', generationKwh: 24.5, selfConsumedKwh: 18.0, discomExportKwh: 6.5, co2AvoidedKg: 17.5, creditsTco2e: 0.0175, grossValueInr: 140.0, gatewayFeeInr: 5.60, netPayoutInr: 134.40, concordancePct: 99.8 },
      { dayName: 'Sunday', date: '28 Aug', generationKwh: 23.8, selfConsumedKwh: 17.5, discomExportKwh: 6.3, co2AvoidedKg: 17.0, creditsTco2e: 0.0170, grossValueInr: 136.0, gatewayFeeInr: 5.44, netPayoutInr: 130.56, concordancePct: 99.7 },
    ],
  },
};

interface WeeklyReportViewProps {
  nodeId?: string;
  ownerName?: string;
  city?: string;
  systemKw?: number;
}

export const WeeklyReportView: React.FC<WeeklyReportViewProps> = ({
  nodeId = 'CABO-MP-0247',
  ownerName = 'Rajesh Sharma',
  city = 'Vijay Nagar, Indore, MP',
  systemKw = 6.0,
}) => {
  const [selectedWeekKey, setSelectedWeekKey] = useState<'w36' | 'w35'>('w36');
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const activeWeek = WEEKLY_ARCHIVE[selectedWeekKey];

  const handleDownload = () => {
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  return (
    <div className="bg-[#FAF8F5] text-[#1F2421] border-2 border-[#1F2421] p-5 sm:p-7 shadow-sm">
      {/* Top Header Row with Week Selector */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#D8D0C5]">
        <div>
          <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-[#2B4736] font-bold mb-1">
            <Calendar className="w-3.5 h-3.5 text-[#C86D3B]" />
            <span>WEEKLY DIGITAL MRV AUDIT STATEMENT · FORM CEA-0716</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif text-[#1F2421] font-bold tracking-tight">
            Weekly Telemetry & Gateway Clearing Report
          </h2>
          <p className="text-xs text-[#555047] font-sans mt-1">
            Hardware-certified gross generation for <strong>{ownerName}</strong> ({nodeId} · {systemKw} kW array) in {city}.
          </p>
        </div>

        {/* Week Switcher & Action Buttons */}
        <div className="flex items-center gap-2 font-mono text-xs">
          <div className="flex border border-[#1F2421] bg-white">
            <button
              type="button"
              onClick={() => setSelectedWeekKey('w36')}
              className={`px-3 py-1.5 uppercase font-bold text-[11px] transition-colors ${
                selectedWeekKey === 'w36'
                  ? 'bg-[#1F2421] text-white'
                  : 'text-[#1F2421] hover:bg-[#F2ECE1]'
              }`}
            >
              Week 36 (Current)
            </button>
            <button
              type="button"
              onClick={() => setSelectedWeekKey('w35')}
              className={`px-3 py-1.5 uppercase font-bold text-[11px] transition-colors border-l border-[#1F2421] ${
                selectedWeekKey === 'w35'
                  ? 'bg-[#1F2421] text-white'
                  : 'text-[#1F2421] hover:bg-[#F2ECE1]'
              }`}
            >
              Week 35 (Settled)
            </button>
          </div>

          <button
            type="button"
            onClick={handleDownload}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#2B4736] hover:bg-[#1F2421] text-white uppercase text-[11px] font-bold tracking-wider transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-[#E5A84B]" />
            <span>{downloadSuccess ? 'EXPORTED PDF' : 'DOWNLOAD AUDIT PDF'}</span>
          </button>
        </div>
      </div>

      {/* Gateway Commission Guarantee Card */}
      <div className="my-5 p-4 bg-[#F2ECE1] border border-[#D8D0C5] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 bg-[#2B4736] text-white flex items-center justify-center flex-shrink-0">
            <ShieldCheck className="w-5 h-5 text-[#E5A84B]" />
          </div>
          <div>
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#1F2421] flex items-center gap-2">
              <span>ZERO INVENTORY GATEWAY MODEL</span>
              <span className="text-[10px] px-2 py-0.5 bg-[#2B4736] text-white font-mono">
                96% DIRECT HOST SETTLEMENT
              </span>
            </div>
            <p className="text-xs text-[#555047] mt-1 leading-relaxed">
              CABO does <strong>not buy or trade carbon credits as principal</strong>. We are a software and hardware dMRV gateway that verifies generation and routes transactions. The rooftop host retains 96% of every settled rupee; CABO charges a transparent 4% gateway fee solely for cryptographic Merkle proofs and registry compliance.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-6 font-mono text-xs border-t md:border-t-0 md:border-l border-[#D8D0C5] pt-3 md:pt-0 md:pl-6 w-full md:w-auto justify-between md:justify-start">
          <div>
            <div className="text-[10px] text-[#706B63] uppercase">CABO GATEWAY FEE</div>
            <div className="text-lg font-bold text-[#C86D3B]">4.0%</div>
          </div>
          <div>
            <div className="text-[10px] text-[#706B63] uppercase">ROOFTOP OWNER SHARE</div>
            <div className="text-lg font-bold text-[#2B4736]">96.0%</div>
          </div>
        </div>
      </div>

      {/* 4 Quick Weekly Metric Highlight Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 my-5 font-mono">
        <div className="p-4 bg-white border border-[#D8D0C5]">
          <span className="text-[10px] uppercase text-[#706B63] font-bold block mb-1">
            GROSS GENERATION
          </span>
          <div className="text-2xl sm:text-3xl font-black text-[#1F2421]">
            {activeWeek.totalKwh.toFixed(1)} <span className="text-xs font-normal">kWh</span>
          </div>
          <span className="text-[10px] text-[#2B4736] font-bold">Class 0.5S Dual Clamped</span>
        </div>

        <div className="p-4 bg-white border border-[#D8D0C5]">
          <span className="text-[10px] uppercase text-[#706B63] font-bold block mb-1">
            VERIFIED CO₂ REDUCTION
          </span>
          <div className="text-2xl sm:text-3xl font-black text-[#2B4736]">
            {activeWeek.totalCo2AvoidedKg.toFixed(1)} <span className="text-xs font-normal">kg</span>
          </div>
          <span className="text-[10px] text-[#706B63]">0.716 kg/kWh CEA Factor</span>
        </div>

        <div className="p-4 bg-white border border-[#D8D0C5]">
          <span className="text-[10px] uppercase text-[#706B63] font-bold block mb-1">
            CERTIFIED CARBON CREDITS
          </span>
          <div className="text-2xl sm:text-3xl font-black text-[#1F2421]">
            {activeWeek.totalCredits.toFixed(4)} <span className="text-xs font-normal">tCO₂e</span>
          </div>
          <span className="text-[10px] text-[#C86D3B] font-bold">Merkle Tree Rollup</span>
        </div>

        <div className="p-4 bg-[#FAF8F5] border-2 border-[#2B4736]">
          <span className="text-[10px] uppercase text-[#2B4736] font-bold block mb-1">
            NET HOST PAYOUT (UPI)
          </span>
          <div className="text-2xl sm:text-3xl font-black text-[#2B4736]">
            ₹{activeWeek.hostNetPayoutInr.toFixed(2)}
          </div>
          <span className="text-[10px] text-[#706B63] font-mono">
            {activeWeek.status === 'SETTLED' ? 'Paid via UPI #98421048' : 'Scheduled Mon 09:00 AM'}
          </span>
        </div>
      </div>

      {/* 7-Day Day-by-Day Telemetry Breakdown */}
      <div className="mt-6 border border-[#D8D0C5] bg-white overflow-x-auto">
        <div className="p-3 bg-[#EFEAE1] border-b border-[#D8D0C5] flex items-center justify-between font-mono text-xs">
          <span className="font-bold uppercase tracking-wider text-[#1F2421] flex items-center gap-2">
            <FileText className="w-4 h-4 text-[#2B4736]" />
            <span>DAILY SENSOR AUDIT TRAILS ({activeWeek.dateRange})</span>
          </span>
          <span className="text-[10px] text-[#706B63]">
            HARDWARE CROSS-VALIDATION: ADE7953 IC + ESP32-CAM OCR
          </span>
        </div>

        <table className="w-full text-left font-mono text-xs min-w-[700px]">
          <thead className="bg-[#FAF8F5] border-b border-[#D8D0C5] text-[10px] text-[#706B63] uppercase">
            <tr>
              <th className="py-2.5 px-3">Date</th>
              <th className="py-2.5 px-3">Gross Solar (kWh)</th>
              <th className="py-2.5 px-3">Self-Use (kWh)</th>
              <th className="py-2.5 px-3">Grid Export (kWh)</th>
              <th className="py-2.5 px-3">CO₂ Avoided</th>
              <th className="py-2.5 px-3">Credit (tCO₂)</th>
              <th className="py-2.5 px-3">4% Fee (₹)</th>
              <th className="py-2.5 px-3 text-right">Host Payout (₹)</th>
              <th className="py-2.5 px-3 text-center">Audit</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#D8D0C5]/60 text-xs">
            {activeWeek.days.map((day, idx) => (
              <tr key={day.date} className={idx % 2 === 0 ? 'bg-white' : 'bg-[#FAF8F5]'}>
                <td className="py-2.5 px-3 font-bold text-[#1F2421]">
                  {day.dayName}, {day.date}
                </td>
                <td className="py-2.5 px-3 font-black text-[#1F2421]">
                  {day.generationKwh.toFixed(1)}
                </td>
                <td className="py-2.5 px-3 text-[#555047]">{day.selfConsumedKwh.toFixed(1)}</td>
                <td className="py-2.5 px-3 text-[#555047]">{day.discomExportKwh.toFixed(1)}</td>
                <td className="py-2.5 px-3 text-[#2B4736] font-bold">
                  {day.co2AvoidedKg.toFixed(1)} kg
                </td>
                <td className="py-2.5 px-3 text-[#1F2421]">{day.creditsTco2e.toFixed(4)}</td>
                <td className="py-2.5 px-3 text-[#C86D3B]">₹{day.gatewayFeeInr.toFixed(2)}</td>
                <td className="py-2.5 px-3 text-right font-black text-[#2B4736]">
                  ₹{day.netPayoutInr.toFixed(2)}
                </td>
                <td className="py-2.5 px-3 text-center">
                  <span className="inline-flex items-center gap-1 text-[10px] text-[#2B4736] font-bold">
                    <CheckCircle2 className="w-3 h-3 text-[#2B4736]" />
                    {day.concordancePct}%
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot className="bg-[#EFEAE1] border-t-2 border-[#1F2421] font-bold text-xs">
            <tr>
              <td className="py-3 px-3 uppercase text-[#1F2421]">WEEKLY TOTALS</td>
              <td className="py-3 px-3 text-[#1F2421] text-sm">
                {activeWeek.totalKwh.toFixed(1)} kWh
              </td>
              <td className="py-3 px-3 text-[#555047]">—</td>
              <td className="py-3 px-3 text-[#555047]">—</td>
              <td className="py-3 px-3 text-[#2B4736]">
                {activeWeek.totalCo2AvoidedKg.toFixed(1)} kg
              </td>
              <td className="py-3 px-3 text-[#1F2421]">
                {activeWeek.totalCredits.toFixed(4)}
              </td>
              <td className="py-3 px-3 text-[#C86D3B]">
                ₹{activeWeek.caboGatewayFeeInr.toFixed(2)}
              </td>
              <td className="py-3 px-3 text-right text-[#2B4736] text-base">
                ₹{activeWeek.hostNetPayoutInr.toFixed(2)}
              </td>
              <td className="py-3 px-3 text-center text-[10px] text-[#2B4736]">
                100% VERIFIED
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Footer Audit Attestation */}
      <div className="mt-5 pt-4 border-t border-[#D8D0C5] flex flex-col sm:flex-row items-center justify-between gap-3 text-[10px] font-mono text-[#706B63]">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#2B4736]" />
          <span>
            Cryptographically signed by ATECC608A Secure Element · Root Merkle: 0x9f83...c712
          </span>
        </div>
        <div className="text-right">
          <span>DISCOM JURISDICTION: MPPKVVCL · INDORE CIRCLE</span>
        </div>
      </div>
    </div>
  );
};

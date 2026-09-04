import React, { useState } from 'react';
import { X, Terminal, Copy, Check, ShieldCheck, RefreshCw } from 'lucide-react';
import { INITIAL_NODE_TELEMETRY } from '../data/caboData';

interface TerminalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TerminalModal: React.FC<TerminalModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [signatureVerified, setSignatureVerified] = useState(true);

  if (!isOpen) return null;

  const rawPacket = {
    protocol_version: 'CABO-dMRV-v2.4',
    telemetry_header: {
      device_uuid: 'cabo_hw_mp_0247_atecc608a',
      hardware_rev: '3.1B',
      firmware: 'v1.4.92-rtos',
      clock_source: 'NTP_CELLULAR_SYNC',
      timestamp_epoch: 1788529351,
      timestamp_ist: '2026-09-04 11:42:31.042 IST',
      cellular_modem: {
        model: 'SIMCOM_A7672S',
        operator: 'Airtel_M2M_India',
        rssi_dbm: -72,
        network_mode: '4G_LTE_CAT1',
      },
    },
    electrical_measurements: {
      sampling_rate_hz: 100,
      sensor_type: 'SPLIT_CORE_CT_CLASS_0.5S',
      active_power_kw: 4.82,
      rms_voltage_v: 231.4,
      rms_current_a: 20.8,
      grid_frequency_hz: 49.98,
      power_factor: 0.994,
      cumulative_yield_today_kwh: 24.8,
      meter_temperature_c: 34.2,
    },
    carbon_accounting: {
      grid_emission_factor_kg_co2_per_kwh: 0.716,
      emission_standard: 'CEA_INDIA_BASELINE_DATABASE_V19',
      calculated_avoided_co2_kg_today: 17.7568,
      line_loss_correction_pct: 0.0,
    },
    data_integrity: {
      crypto_coprocessor: 'ATECC608A_SLOT_0',
      key_id: 'PUBKEY_MP0247_ED25519',
      hmac_sha256_signature: '3f8a4e892c90df11a47b19808aee0b14cd76bf3845a76986221c97a89e0231df',
      merkle_leaf_hash: '0x9f1a8e02d384c7a1029384bc9102481029384910293849102938491029384910',
      tamper_switch_status: 'UNCOMPROMISED',
    },
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(rawPacket, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-none p-4">
      <div className="bg-[#1A1A1A] border-2 border-[#1A1A1A] text-white w-full max-w-3xl shadow-none overflow-hidden font-mono flex flex-col max-h-[90vh]">
        {/* Modal Top Bar */}
        <div className="bg-[#1A1A1A] px-4 py-3 border-b border-white/20 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs">
            <Terminal className="w-4 h-4 text-[#C88C32]" />
            <span className="font-bold text-white uppercase tracking-wider text-[11px]">
              NODE TELEMETRY PACKET INSPECTOR [CABO-MP-0247]
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopy}
              className="px-2.5 py-1 text-[10px] font-mono uppercase tracking-widest bg-white/10 hover:bg-white/20 text-white border border-white/20 flex items-center gap-1.5 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'COPIED' : 'COPY JSON'}</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-1 hover:bg-white/10 text-white/70 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Verification Status Banner */}
        <div className="bg-[#2D4F36] px-4 py-2 border-b border-white/10 flex items-center justify-between text-xs text-white">
          <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest font-bold">
            <ShieldCheck className="w-4 h-4 text-white" />
            <span>CRYPTOGRAPHIC ATTESTATION: VALIDATED (ATECC608A)</span>
          </div>
          <span className="text-[9px] font-mono uppercase tracking-widest text-white/80">TLS 1.3 · SHA-256</span>
        </div>

        {/* JSON Code Viewer */}
        <div className="p-4 overflow-y-auto text-xs bg-black text-[#F5F2ED] leading-relaxed flex-1">
          <pre className="font-mono text-[11px]">
            {JSON.stringify(rawPacket, null, 2)}
          </pre>
        </div>

        {/* Modal Footer */}
        <div className="bg-[#1A1A1A] px-4 py-3 border-t border-white/20 flex flex-wrap items-center justify-between text-[10px] font-mono uppercase tracking-widest text-white/70">
          <span>PAYLOAD: 512 BYTES · HASH: 0x3f8a4e...31df</span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 bg-white text-[#1A1A1A] font-bold hover:bg-[#C88C32] hover:text-white transition-colors"
          >
            CLOSE
          </button>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import {
  Shield,
  Binary,
  Layers,
  Database,
  Link,
  CheckCircle,
  FileCode,
  ArrowRight,
  Fingerprint,
  Cpu,
  Search
} from 'lucide-react';

export const DataIntegrity: React.FC = () => {
  const [activeProofLeaf, setActiveProofLeaf] = useState<number>(0);

  const sampleLeaves = [
    {
      leafIndex: 0,
      readingId: 'MP-0247_20260904_114200',
      node: 'CABO-MP-0247',
      kwh: '4.82',
      hash: '0x3f8a4e892c90df11a47b19808aee0b14cd76bf3845a76986221c97a89e0231df',
      verified: true,
    },
    {
      leafIndex: 1,
      readingId: 'MP-0193_20260904_114200',
      node: 'CABO-MP-0193',
      kwh: '7.14',
      hash: '0x88ea120349bc98124fa93010b9824c18f92471829031ba8320491029cba81920',
      verified: true,
    },
    {
      leafIndex: 2,
      readingId: 'MP-0082_20260904_114200',
      node: 'CABO-MP-0082',
      kwh: '3.45',
      hash: '0x12cba90812efaa49129481bca091248102948120491209384910293810293849',
      verified: true,
    },
    {
      leafIndex: 3,
      readingId: 'MP-0114_20260904_114200',
      node: 'CABO-MP-0114',
      kwh: '9.80',
      hash: '0x9948102938401928301928301928301928301928301928301928301928301928',
      verified: true,
    },
  ];

  return (
    <section className="py-16 lg:py-24 border-b border-[#1A1A1A]/20 bg-[#F5F2ED]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-[#2D4F36] font-bold mb-2">
            <span className="w-1.5 h-1.5 bg-[#2D4F36]"></span>
            06 / Cryptographic Ledger & Audit Trail
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tighter text-[#1A1A1A] leading-[0.98]">
            DATA INTEGRITY THROUGH MERKLE-TREE BATCH ANCHORING
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#1A1A1A]/80 leading-relaxed">
            Putting every 60-second telemetry reading on a blockchain is prohibitively expensive,
            wasteful, and impractical. Instead, CABO executes Merkle-tree rollups: thousands of
            cryptographically signed sensor readings are aggregated into a single 32-byte cryptographic root hash
            and anchored periodically onto an immutable public ledger.
          </p>
        </div>

        {/* The 8-Stage Architecture Flow Diagram */}
        <div className="border-2 border-[#1A1A1A] bg-white p-6 sm:p-8 mb-12">
          <div className="text-[10px] font-mono uppercase font-bold tracking-widest text-[#1A1A1A] mb-6 flex items-center justify-between">
            <span>DATA PROVENANCE ARCHITECTURE</span>
            <span className="text-[#1A1A1A]/50">END-TO-END CRYPTOGRAPHIC PIPELINE</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 text-xs font-mono text-center">
            <div className="p-3 bg-[#F5F2ED] border border-[#1A1A1A]/20 flex flex-col justify-between h-28">
              <span className="text-[9px] text-[#1A1A1A]/50 font-bold uppercase tracking-widest">01 · PHYS</span>
              <div className="font-bold text-[#1A1A1A] uppercase text-xs">CABO Device</div>
              <div className="text-[10px] text-[#1A1A1A]/70">CT RMS Sensor</div>
            </div>

            <div className="p-3 bg-[#F5F2ED] border border-[#1A1A1A]/20 flex flex-col justify-between h-28">
              <span className="text-[9px] text-[#1A1A1A]/50 font-bold uppercase tracking-widest">02 · HARD</span>
              <div className="font-bold text-[#2D4F36] uppercase text-xs">Signed Reading</div>
              <div className="text-[10px] text-[#1A1A1A]/70">HMAC-SHA256</div>
            </div>

            <div className="p-3 bg-[#F5F2ED] border border-[#1A1A1A]/20 flex flex-col justify-between h-28">
              <span className="text-[9px] text-[#1A1A1A]/50 font-bold uppercase tracking-widest">03 · INGEST</span>
              <div className="font-bold text-[#1A1A1A] uppercase text-xs">Verification</div>
              <div className="text-[10px] text-[#1A1A1A]/70">Key Validation</div>
            </div>

            <div className="p-3 bg-[#F5F2ED] border border-[#1A1A1A]/20 flex flex-col justify-between h-28">
              <span className="text-[9px] text-[#1A1A1A]/50 font-bold uppercase tracking-widest">04 · STORE</span>
              <div className="font-bold text-[#1A1A1A] uppercase text-xs">TimescaleDB</div>
              <div className="text-[10px] text-[#1A1A1A]/70">Time-Series Index</div>
            </div>

            <div className="p-3 bg-[#F5F2ED] border border-[#1A1A1A]/20 flex flex-col justify-between h-28">
              <span className="text-[9px] text-[#1A1A1A]/50 font-bold uppercase tracking-widest">05 · ROLLUP</span>
              <div className="font-bold text-[#C88C32] uppercase text-xs">dMRV Batch</div>
              <div className="text-[10px] text-[#1A1A1A]/70">10k Readings</div>
            </div>

            <div className="p-3 bg-[#F5F2ED] border border-[#1A1A1A]/20 flex flex-col justify-between h-28">
              <span className="text-[9px] text-[#1A1A1A]/50 font-bold uppercase tracking-widest">06 · CRYPTO</span>
              <div className="font-bold text-[#2D4F36] uppercase text-xs">Merkle Root</div>
              <div className="text-[10px] text-[#1A1A1A]/70">SHA-256 Tree</div>
            </div>

            <div className="p-3 bg-[#F5F2ED] border border-[#1A1A1A]/20 flex flex-col justify-between h-28">
              <span className="text-[9px] text-[#1A1A1A]/50 font-bold uppercase tracking-widest">07 · LEDGER</span>
              <div className="font-bold text-[#1A1A1A] uppercase text-xs">Anchor</div>
              <div className="text-[10px] text-[#1A1A1A]/70">Public L2 State</div>
            </div>

            <div className="p-3 bg-[#2D4F36] text-white border border-[#2D4F36] flex flex-col justify-between h-28">
              <span className="text-[9px] text-white/70 font-bold uppercase tracking-widest">08 · AUDIT</span>
              <div className="font-bold text-[#C88C32] uppercase text-xs">Proof Cert</div>
              <div className="text-[10px] text-white/80">VVB Registry</div>
            </div>
          </div>
        </div>

        {/* Technical Merkle Leaf & Anchor Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Interactive Leaves */}
          <div className="lg:col-span-6 space-y-3">
            <div className="text-[10px] font-mono uppercase font-bold tracking-widest text-[#1A1A1A]/70 flex justify-between">
              <span>BATCH #MP-2026-B84 LEAF NODES</span>
              <span>4 OF 10,000 SHOWN</span>
            </div>

            {sampleLeaves.map((leaf) => (
              <div
                key={leaf.leafIndex}
                onClick={() => setActiveProofLeaf(leaf.leafIndex)}
                className={`p-4 border cursor-pointer transition-colors text-xs font-mono ${
                  activeProofLeaf === leaf.leafIndex
                    ? 'border-2 border-[#1A1A1A] bg-white'
                    : 'border border-[#1A1A1A]/20 bg-white/60 hover:bg-white'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#1A1A1A]">LEAF [{leaf.leafIndex}]</span>
                    <span className="text-[#1A1A1A]/60">{leaf.node}</span>
                  </div>
                  <span className="text-[#2D4F36] font-bold">{leaf.kwh} kWh ACTIVE</span>
                </div>
                <div className="text-[11px] text-[#1A1A1A]/70 truncate">
                  Record ID: {leaf.readingId}
                </div>
                <div className="text-[10px] text-[#1A1A1A]/50 font-mono mt-1 truncate">
                  SHA-256: {leaf.hash}
                </div>
              </div>
            ))}
          </div>

          {/* Right: Merkle Proof Verification Card */}
          <div className="lg:col-span-6 border-2 border-[#1A1A1A] bg-white p-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#1A1A1A]/10 text-xs font-mono">
              <div className="flex items-center gap-2">
                <Binary className="w-4 h-4 text-[#2D4F36]" />
                <span className="font-bold text-[#1A1A1A] uppercase tracking-wider text-[11px]">
                  CRYPTOGRAPHIC PROOF VERIFIER
                </span>
              </div>
              <span className="text-[9px] bg-[#2D4F36] text-white px-2 py-0.5 font-bold uppercase tracking-widest">
                TAMPER-PROOF
              </span>
            </div>

            <div className="py-4 space-y-4 text-xs font-mono">
              <div>
                <span className="text-[9px] text-[#1A1A1A]/60 uppercase tracking-widest block">Selected Leaf Hash</span>
                <div className="p-2 bg-[#F5F2ED] border border-[#1A1A1A]/20 break-all text-[11px] text-[#1A1A1A] mt-1 font-mono">
                  {sampleLeaves[activeProofLeaf].hash}
                </div>
              </div>

              <div>
                <span className="text-[9px] text-[#1A1A1A]/60 uppercase tracking-widest block">Merkle Root Hash (Batch B84)</span>
                <div className="p-2 bg-[#F5F2ED] border border-[#1A1A1A]/20 break-all text-[11px] text-[#2D4F36] font-bold mt-1 font-mono">
                  0x7d81a9f02c91823bb94120938ac48192039481a0293849102938491029384910
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1 text-[11px]">
                <div className="p-2.5 bg-[#F5F2ED] border border-[#1A1A1A]/20">
                  <span className="text-[#1A1A1A]/60 block text-[9px] uppercase tracking-widest">Anchored Block Height</span>
                  <span className="font-bold text-[#1A1A1A]"># 48,910,238</span>
                </div>
                <div className="p-2.5 bg-[#F5F2ED] border border-[#1A1A1A]/20">
                  <span className="text-[#1A1A1A]/60 block text-[9px] uppercase tracking-widest">Public Proof Status</span>
                  <span className="font-bold text-[#2D4F36]">MATHEMATICALLY PROVEN</span>
                </div>
              </div>

              <p className="text-[11px] text-[#1A1A1A]/70 leading-relaxed pt-2 border-t border-[#1A1A1A]/10">
                Any third-party auditor can verify that this single meter reading was included in the batched
                issuance without needing access to any other homeowner’s private data or bearing high gas fees.
                If even 0.01 kWh were altered retroactively, the Merkle root would completely mismatch.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

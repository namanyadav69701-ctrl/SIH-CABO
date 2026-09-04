import React, { useState } from 'react';
import { X, Key, ShieldCheck, Mail, ArrowRight, CheckCircle2 } from 'lucide-react';

interface ForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ForgotPasswordModal: React.FC<ForgotPasswordModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-white border-2 border-[#1A1A1A] w-full max-w-md p-6 font-sans shadow-[6px_6px_0px_0px_#1A1A1A] relative">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-1 text-[#1A1A1A]/50 hover:text-[#1A1A1A]"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 font-mono text-[10px] font-bold text-[#2D4F36] uppercase tracking-widest mb-1.5">
          <Key className="w-3.5 h-3.5 text-[#E5A84B]" />
          <span>SECURITY & CREDENTIAL RECOVERY</span>
        </div>

        <h2 className="text-2xl font-black font-sans uppercase tracking-tight text-[#1A1A1A] mb-2">
          RECOVER ACCESS
        </h2>

        {submitted ? (
          <div className="space-y-4 my-4 font-mono text-xs">
            <div className="p-4 bg-[#2D4F36]/10 border border-[#2D4F36]/30 text-[#2D4F36] flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-[#2D4F36] shrink-0" />
              <div>
                <strong className="block uppercase">DISPATCH INITIATED</strong>
                <span>
                  Recovery instructions and temporary cryptographic token sent to{' '}
                  <strong>{email}</strong>. Please check your inbox.
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="w-full py-2.5 bg-[#1A1A1A] text-white font-mono font-bold text-xs uppercase"
            >
              RETURN TO LOGIN
            </button>
          </div>
        ) : (
          <div>
            <p className="text-xs text-[#1A1A1A]/70 leading-relaxed font-sans mb-4">
              Enter your registered account email. For rooftop hosts with on-site CABO hardware nodes, your node pairing key can also be re-synchronized via the DISCOM Field Officer.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (email.trim()) setSubmitted(true);
              }}
              className="space-y-3 font-mono text-xs"
            >
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-[#1A1A1A] mb-1">
                  REGISTERED ACCOUNT EMAIL
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. yourname@domain.com"
                  className="w-full px-3 py-2 bg-white border border-[#1A1A1A]/20 focus:border-[#2D4F36] focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-[#2D4F36] hover:bg-[#1F3927] text-white font-bold uppercase tracking-wider flex items-center justify-center gap-2"
              >
                <span>SEND RESET INSTRUCTIONS</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>

            <div className="mt-4 pt-3 border-t border-[#1A1A1A]/10 font-mono text-[10px] text-[#1A1A1A]/60 flex items-center justify-between">
              <span>FIELD DESK: +91 731 249 8800</span>
              <span>MP OPERATIONS</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

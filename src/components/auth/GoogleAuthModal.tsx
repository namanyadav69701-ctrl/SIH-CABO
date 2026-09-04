import React, { useState } from 'react';
import { X, ShieldCheck, AlertCircle, ArrowRight, CheckCircle2 } from 'lucide-react';
import { authApi } from '../../services/authApi';
import { User, UserRole } from '../../types/auth';

interface GoogleAuthModalProps {
  role: UserRole;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: User) => void;
}

export const GoogleAuthModal: React.FC<GoogleAuthModalProps> = ({
  role,
  isOpen,
  onClose,
  onSuccess,
}) => {
  // Pre-fill with user email from session metadata if available
  const [email, setEmail] = useState('namanyadav69701@gmail.com');
  const [name, setName] = useState('Naman Yadav');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleGoogleSignIn = async (selectedEmail: string, selectedName: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await authApi.googleAuth({
        email: selectedEmail.trim(),
        name: selectedName.trim(),
        role: role,
      });

      if (res.success && res.user) {
        onSuccess(res.user);
        onClose();
      } else {
        setError(res.error || 'Google authentication failed.');
      }
    } catch (err: any) {
      setError('Failed to complete Google authentication. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-white border-2 border-[#1A1A1A] w-full max-w-md p-6 font-sans shadow-[6px_6px_0px_0px_#1A1A1A] relative">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-1 text-[#1A1A1A]/50 hover:text-[#1A1A1A]"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Google Header */}
        <div className="flex items-center gap-3 mb-5 border-b border-[#1A1A1A]/10 pb-4">
          <svg className="w-6 h-6" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          <div>
            <h2 className="font-bold text-base text-[#1A1A1A] leading-tight">
              Sign in with Google
            </h2>
            <div className="font-mono text-[10px] text-[#1A1A1A]/60 uppercase tracking-widest">
              to continue to CABO {role.toUpperCase()}
            </div>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-300 text-red-800 text-xs font-mono flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
            <div>{error}</div>
          </div>
        )}

        <div className="space-y-3 mb-6">
          <div className="font-mono text-xs text-[#1A1A1A]/70 uppercase tracking-wider mb-1">
            SELECT ACTIVE GOOGLE IDENTITY:
          </div>

          {/* Active User Account Option (Session User) */}
          <button
            type="button"
            disabled={loading}
            onClick={() => handleGoogleSignIn('namanyadav69701@gmail.com', 'Naman Yadav')}
            className="w-full text-left p-3.5 border-2 border-[#1A1A1A] hover:bg-[#F5F4EF] flex items-center justify-between group transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#2D4F36] text-white flex items-center justify-center font-bold font-mono text-xs">
                NY
              </div>
              <div>
                <div className="font-bold text-sm text-[#1A1A1A]">Naman Yadav</div>
                <div className="font-mono text-xs text-[#1A1A1A]/60">namanyadav69701@gmail.com</div>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-[#1A1A1A]/40 group-hover:text-[#1A1A1A] group-hover:translate-x-1 transition-all" />
          </button>

          {/* Custom Google Account Option */}
          <div className="p-3.5 border border-[#1A1A1A]/20 bg-[#F5F4EF]/50 space-y-2 mt-3">
            <div className="font-mono text-[10px] font-bold text-[#1A1A1A]/70 uppercase">
              OR ENTER ANOTHER GOOGLE WORKSPACE ACCOUNT:
            </div>
            <input
              type="text"
              placeholder="Your Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-1.5 bg-white border border-[#1A1A1A]/20 font-mono text-xs focus:outline-none"
            />
            <input
              type="email"
              placeholder="Google Email (e.g. user@gmail.com)"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-1.5 bg-white border border-[#1A1A1A]/20 font-mono text-xs focus:outline-none"
            />
            <button
              type="button"
              disabled={loading || !email.trim()}
              onClick={() => handleGoogleSignIn(email, name)}
              className="w-full py-2 bg-[#1A1A1A] text-white font-mono text-xs font-bold uppercase tracking-wider hover:bg-black disabled:opacity-50 transition-colors"
            >
              {loading ? 'AUTHENTICATING...' : `SIGN IN WITH ${email.trim().toUpperCase()}`}
            </button>
          </div>
        </div>

        <div className="border-t border-[#1A1A1A]/10 pt-3 flex items-center justify-between font-mono text-[10px] text-[#1A1A1A]/50">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#2D4F36]" />
            <span>ROLE ASSIGNMENT: {role.toUpperCase()}</span>
          </div>
          <span>OAUTH v2.0</span>
        </div>
      </div>
    </div>
  );
};

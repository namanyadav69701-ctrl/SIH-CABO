import React from 'react';
import { X, User as UserIcon, Shield, Mail, Phone, Building, Calendar, LogOut } from 'lucide-react';
import { User } from '../../types/auth';

interface ProfileModalProps {
  user: User;
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  user,
  isOpen,
  onClose,
  onLogout,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-white border-2 border-[#1A1A1A] w-full max-w-lg p-6 sm:p-8 font-sans shadow-[6px_6px_0px_0px_#1A1A1A] relative">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-1 text-[#1A1A1A]/50 hover:text-[#1A1A1A]"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 font-mono text-[10px] font-bold text-[#2D4F36] uppercase tracking-widest mb-1.5">
          <Shield className="w-3.5 h-3.5 text-[#E5A84B]" />
          <span>AUTHENTICATED OPERATOR PROFILE</span>
        </div>

        <div className="flex items-center gap-4 mb-6 pb-4 border-b border-[#1A1A1A]/10">
          <div className="w-12 h-12 bg-[#1A1A1A] text-white flex items-center justify-center font-mono font-bold text-base">
            {user.avatarInitials || user.fullName.slice(0, 2).toUpperCase()}
          </div>
          <div>
            <h2 className="text-xl font-black font-sans uppercase text-[#1A1A1A]">
              {user.fullName}
            </h2>
            <div className="font-mono text-xs text-[#2D4F36] font-bold uppercase flex items-center gap-1.5 mt-0.5">
              <span className="w-2 h-2 rounded-full bg-[#00FF00]"></span>
              <span>ACCOUNT TYPE: {user.role.toUpperCase()}</span>
            </div>
          </div>
        </div>

        <div className="space-y-3 font-mono text-xs mb-6">
          <div className="flex items-center justify-between p-2.5 bg-[#F5F4EF] border border-[#1A1A1A]/10">
            <span className="text-[#1A1A1A]/60 flex items-center gap-2">
              <Mail className="w-3.5 h-3.5" />
              <span>Email:</span>
            </span>
            <span className="font-bold text-[#1A1A1A]">{user.email}</span>
          </div>

          <div className="flex items-center justify-between p-2.5 bg-[#F5F4EF] border border-[#1A1A1A]/10">
            <span className="text-[#1A1A1A]/60 flex items-center gap-2">
              <Phone className="w-3.5 h-3.5" />
              <span>Contact:</span>
            </span>
            <span className="font-bold text-[#1A1A1A]">{user.phone}</span>
          </div>

          {user.role === 'buyer' && user.companyName && (
            <div className="flex items-center justify-between p-2.5 bg-[#F5F4EF] border border-[#1A1A1A]/10">
              <span className="text-[#1A1A1A]/60 flex items-center gap-2">
                <Building className="w-3.5 h-3.5" />
                <span>Organization:</span>
              </span>
              <span className="font-bold text-[#1A1A1A]">{user.companyName}</span>
            </div>
          )}

          {user.role === 'seller' && user.nodeId && (
            <div className="flex items-center justify-between p-2.5 bg-[#F5F4EF] border border-[#1A1A1A]/10">
              <span className="text-[#1A1A1A]/60">Hardware Node:</span>
              <span className="font-bold text-[#2D4F36]">{user.nodeId}</span>
            </div>
          )}

          <div className="flex items-center justify-between p-2.5 bg-[#F5F4EF] border border-[#1A1A1A]/10">
            <span className="text-[#1A1A1A]/60 flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5" />
              <span>Member Since:</span>
            </span>
            <span className="font-bold text-[#1A1A1A]">
              {new Date(user.createdAt).toLocaleDateString()}
            </span>
          </div>

          <div className="flex items-center justify-between p-2.5 bg-[#F5F4EF] border border-[#1A1A1A]/10">
            <span className="text-[#1A1A1A]/60">Auth Provider:</span>
            <span className="font-bold text-[#1A1A1A] uppercase">{user.authProvider}</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-[#1A1A1A]/10">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-white border border-[#1A1A1A]/20 font-mono text-xs font-bold uppercase hover:bg-[#F5F4EF]"
          >
            CLOSE
          </button>

          <button
            type="button"
            onClick={() => {
              onClose();
              onLogout();
            }}
            className="px-4 py-2 bg-[#1A1A1A] text-white font-mono text-xs font-bold uppercase hover:bg-red-700 flex items-center gap-1.5 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>LOGOUT</span>
          </button>
        </div>
      </div>
    </div>
  );
};

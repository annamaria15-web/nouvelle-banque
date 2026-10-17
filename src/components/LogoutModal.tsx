import React from 'react';
import { LogOut, X, ShieldAlert } from 'lucide-react';

interface LogoutModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

export const LogoutModal: React.FC<LogoutModalProps> = ({ onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 animate-scaleIn space-y-4 text-center">
        <div className="w-12 h-12 rounded-full bg-red-50 text-[#E60028] flex items-center justify-center mx-auto">
          <LogOut className="w-6 h-6" />
        </div>

        <div>
          <h3 className="font-extrabold text-base text-slate-900">
            Déconnexion de votre espace client
          </h3>
          <p className="text-xs text-slate-500 mt-1 leading-relaxed">
            Pour votre sécurité, assurez-vous de fermer votre session si vous utilisez un appareil partagé.
          </p>
        </div>

        <div className="flex gap-2.5 pt-2">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 py-2.5 px-3 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors"
          >
            Annuler
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="flex-1 py-2.5 px-3 rounded-xl bg-[#E60028] hover:bg-red-700 text-white text-xs font-bold transition-colors shadow-sm"
          >
            Se déconnecter
          </button>
        </div>
      </div>
    </div>
  );
};

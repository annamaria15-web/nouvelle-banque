import React, { useState } from 'react';
import { Lock, FileText, ShieldAlert } from 'lucide-react';
import { BankAccount, UserProfile } from '../types';

interface BlockedAccountCardProps {
  account: BankAccount;
  user: UserProfile;
}

export const BlockedAccountCard: React.FC<BlockedAccountCardProps> = ({
  account,
  user,
}) => {
  const [showNoticeModal, setShowNoticeModal] = useState(false);

  const formattedAmount = account.balance
    ? new Intl.NumberFormat('fr-CA', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(account.balance)
    : '53 047,38';

  const currencySymbol = account.currencySymbol || '€';

  return (
    <>
      {/* Exact Card matching user's uploaded image - Permanent Freeze */}
      <div className="bg-white rounded-2xl border border-slate-300 shadow-sm p-6 max-w-xl transition-all">
        {/* Top Header Row: Red lock circle + Label + BLOQUÉ */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            {/* Red circular lock badge */}
            <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#C83B30] text-white flex items-center justify-center shrink-0 shadow-xs">
              <Lock className="w-6 h-6 stroke-[2.4]" />
            </div>

            {/* Account Label */}
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              {account.label || 'Compte chèques'}
            </h2>
          </div>

          {/* Status text */}
          <span className="text-base sm:text-lg font-bold text-slate-500 uppercase tracking-widest">
            {account.blockedStatusText || 'BLOQUÉ'}
          </span>
        </div>

        {/* Big Balance Row */}
        <div className="py-4 text-center sm:text-right">
          <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight tabular-nums font-['Plus_Jakarta_Sans',sans-serif]">
            {formattedAmount} {currencySymbol}
          </div>
        </div>

        {/* Bottom Section: Separator line + "Fonds temporairement gelés" */}
        <div className="border-t border-slate-200 pt-3.5 mt-1 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <span className="text-slate-900 text-base sm:text-lg font-medium">
            {account.blockedReason || 'Fonds temporairement gelés'}
          </span>

          <button
            onClick={() => setShowNoticeModal(true)}
            className="text-xs font-semibold text-red-600 hover:text-red-700 hover:underline inline-flex items-center gap-1"
          >
            <FileText className="w-3.5 h-3.5" /> Voir l'avis de blocage temporaire
          </button>
        </div>
      </div>

      {/* Security notice / Legal freeze modal */}
      {showNoticeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-slate-200 space-y-5 animate-scaleIn">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <div className="w-10 h-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Avis de blocage temporaire du compte
                </h3>
                <span className="text-xs text-slate-500 font-mono">
                  Réf. dossier : SUSP-TEMP-2026-99201
                </span>
              </div>
            </div>

            <div className="space-y-3 text-xs leading-relaxed text-slate-600">
              <div className="p-3.5 bg-red-50 rounded-xl border border-red-200 text-red-900 space-y-1">
                <div className="font-bold flex items-center gap-1.5 text-sm">
                  <Lock className="w-4 h-4 text-red-600" />
                  Statut : Gel conservatoire temporaire
                </div>
                <p className="text-xs text-red-800">
                  Montant temporairement immobilisé : <strong className="font-mono text-sm">{formattedAmount} {currencySymbol}</strong>
                </p>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl space-y-2 border border-slate-100">
                <div className="flex justify-between">
                  <span className="text-slate-500">Titulaire du compte :</span>
                  <span className="font-semibold text-slate-800">{user.fullName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Mesure appliquée :</span>
                  <span className="font-semibold text-slate-800">Blocage temporaire par mesure de sécurité</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Virements & Opérations :</span>
                  <span className="font-bold text-red-600">Suspendus temporairement</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Carte bancaire :</span>
                  <span className="font-bold text-red-600">Verrouillée temporairement</span>
                </div>
              </div>

              <p className="text-slate-500 text-[11px]">
                En vertu des mesures de sécurité et de contrôle bancaire, le compte et ses fonds font l'objet d'un blocage temporaire. Les débits et virements sont momentanément suspendus.
              </p>
            </div>

            <div className="pt-2 border-t border-slate-100 flex justify-end">
              <button
                type="button"
                onClick={() => setShowNoticeModal(false)}
                className="w-full py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-colors"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

import React from 'react';
import {
  Lock,
  ShieldAlert,
  AlertOctagon,
  ArrowLeftRight,
  XCircle,
  FileText,
  UserX,
} from 'lucide-react';
import { BankAccount, Beneficiary, Transaction } from '../types';

interface TransfersViewProps {
  accounts: BankAccount[];
  beneficiaries: Beneficiary[];
  onAddBeneficiary: (b: Omit<Beneficiary, 'id'>) => void;
  onExecuteTransfer: (data: {
    sourceAccountId: string;
    beneficiaryName: string;
    beneficiaryIban: string;
    amount: number;
    motif: string;
    isInstant: boolean;
  }) => void;
}

export const TransfersView: React.FC<TransfersViewProps> = ({
  accounts,
}) => {
  const currentAccount = accounts[0];

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Permanent Block Notification Screen */}
      <div className="bg-red-50 border-2 border-red-400 rounded-3xl p-6 sm:p-8 text-center space-y-5 shadow-sm">
        <div className="w-16 h-16 rounded-full bg-[#C83B30] text-white flex items-center justify-center mx-auto shadow-md">
          <Lock className="w-8 h-8 stroke-[2.4]" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-black uppercase tracking-widest text-amber-700 bg-amber-100 border border-amber-300 px-3 py-1 rounded-full inline-block">
            Accès Virement Suspendu · Blocage Temporaire
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Les virements sont temporairement suspendus
          </h1>
          <p className="text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
            Ce compte fait l’objet d’un blocage temporaire par mesure de sécurité. Aucun virement ponctuel, permanent ou international ne peut être émis tant que le compte est temporairement bloqué.
          </p>
        </div>

        {/* Account Details Box */}
        <div className="bg-white rounded-2xl p-5 border border-red-200 max-w-md mx-auto text-left space-y-2.5 shadow-2xs">
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-500 font-medium">Compte :</span>
            <span className="font-bold text-slate-900">{currentAccount?.label || 'Compte chèques'}</span>
          </div>
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-500 font-medium">Solde immobilisé :</span>
            <span className="font-mono font-black text-slate-900 text-sm">
              {currentAccount
                ? `${new Intl.NumberFormat('fr-FR', { minimumFractionDigits: 2 }).format(currentAccount.balance)} ${currentAccount.currencySymbol || '€'}`
                : '53 047,38 €'}
            </span>
          </div>
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-500 font-medium">Statut des opérations :</span>
            <span className="font-bold text-amber-700 flex items-center gap-1">
              <XCircle className="w-3.5 h-3.5" /> Suspension temporaire
            </span>
          </div>
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-500 font-medium">Motif légal :</span>
            <span className="font-semibold text-slate-700">Fonds temporairement gelés</span>
          </div>
        </div>

        {/* Notice of prohibition */}
        <div className="p-4 bg-slate-900 text-white rounded-2xl text-xs space-y-1.5 max-w-md mx-auto text-left">
          <div className="font-bold flex items-center gap-2 text-red-400">
            <ShieldAlert className="w-4 h-4 shrink-0" />
            <span>Interdiction bancaire d'émission</span>
          </div>
          <p className="text-slate-300 text-[11px] leading-relaxed">
            Le module de saisie des virements et l’ajout de nouveaux bénéficiaires ont été désactivés conformément aux ordres de restriction conservatoire.
          </p>
        </div>
      </div>
    </div>
  );
};

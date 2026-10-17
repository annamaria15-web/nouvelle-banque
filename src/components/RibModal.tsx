import React, { useState } from 'react';
import { X, Copy, Check, Printer, Download, Share2 } from 'lucide-react';
import { BankAccount, UserProfile } from '../types';
import { Logo } from './Logo';

interface RibModalProps {
  account: BankAccount;
  user: UserProfile;
  onClose: () => void;
}

export const RibModal: React.FC<RibModalProps> = ({ account, user, onClose }) => {
  const [copiedIban, setCopiedIban] = useState(false);
  const [copiedBic, setCopiedBic] = useState(false);

  const handleCopy = (text: string, type: 'iban' | 'bic') => {
    navigator.clipboard.writeText(text);
    if (type === 'iban') {
      setCopiedIban(true);
      setTimeout(() => setCopiedIban(false), 2000);
    } else {
      setCopiedBic(true);
      setTimeout(() => setCopiedBic(false), 2000);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-200 animate-scaleIn">
        {/* Header */}
        <div className="bg-[#0B131F] text-white p-5 flex items-center justify-between">
          <Logo size="sm" lightText={true} />
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* RIB Document Body */}
        <div className="p-6 space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <span className="text-[11px] font-bold tracking-widest text-[#E60028] uppercase">
              Relevé d'Identité Bancaire (RIB)
            </span>
            <h2 className="text-xl font-black text-slate-900 mt-0.5">
              {account.label}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Titulaire : <span className="font-semibold text-slate-800">{user.fullName}</span> · Domiciliation : {user.agency}
            </p>
          </div>

          {/* IBAN Section */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-bold text-slate-700">IBAN</span>
              <button
                onClick={() => handleCopy(account.iban, 'iban')}
                className="text-xs font-semibold text-red-600 hover:text-red-700 inline-flex items-center gap-1"
              >
                {copiedIban ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-600">Copié</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copier l'IBAN</span>
                  </>
                )}
              </button>
            </div>
            <div className="font-mono text-sm md:text-base font-bold text-slate-900 tracking-wider break-all">
              {account.iban}
            </div>
          </div>

          {/* BIC Section */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-bold text-slate-700">BIC / SWIFT</span>
              <button
                onClick={() => handleCopy(account.bic, 'bic')}
                className="text-xs font-semibold text-red-600 hover:text-red-700 inline-flex items-center gap-1"
              >
                {copiedBic ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-600">Copié</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copier le BIC</span>
                  </>
                )}
              </button>
            </div>
            <div className="font-mono text-sm font-bold text-slate-900 tracking-wider">
              {account.bic}
            </div>
          </div>

          {/* RIB Components Grid */}
          <div className="grid grid-cols-4 gap-2 text-center text-xs bg-slate-100/60 p-3 rounded-xl border border-slate-200">
            <div>
              <span className="text-[10px] text-slate-400 block font-semibold">Banque</span>
              <span className="font-mono font-bold text-slate-800">30003</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block font-semibold">Guichet</span>
              <span className="font-mono font-bold text-slate-800">03048</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block font-semibold">N° Compte</span>
              <span className="font-mono font-bold text-slate-800">00001234567</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block font-semibold">Clé RIB</span>
              <span className="font-mono font-bold text-slate-800">89</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              onClick={handlePrint}
              className="flex-1 py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              <Printer className="w-4 h-4" /> Imprimer le RIB
            </button>
            <button
              onClick={() => {
                alert('Téléchargement du fichier PDF sécurisé du RIB en cours...');
              }}
              className="flex-1 py-3 px-4 bg-[#E60028] hover:bg-red-700 text-white text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
              <Download className="w-4 h-4" /> Télécharger en PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

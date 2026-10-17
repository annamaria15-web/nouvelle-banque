import React from 'react';
import { X, ArrowDownLeft, ArrowUpRight, CheckCircle2, Download, Share2 } from 'lucide-react';
import { Transaction } from '../types';

interface TransactionDetailModalProps {
  transaction: Transaction | null;
  onClose: () => void;
}

export const TransactionDetailModal: React.FC<TransactionDetailModalProps> = ({
  transaction,
  onClose,
}) => {
  if (!transaction) return null;

  const isPositive = transaction.amount > 0;
  const formattedAmount = new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
  }).format(Math.abs(transaction.amount));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 animate-scaleIn space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Détail de l'opération
          </span>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-800 rounded-md"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="text-center py-2">
          <div
            className={`w-14 h-14 rounded-full mx-auto flex items-center justify-center mb-3 ${
              isPositive ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'
            }`}
          >
            {isPositive ? (
              <ArrowDownLeft className="w-7 h-7" />
            ) : (
              <ArrowUpRight className="w-7 h-7" />
            )}
          </div>
          <div
            className={`text-2xl font-black tabular-nums ${
              isPositive ? 'text-emerald-600' : 'text-red-600'
            }`}
          >
            {isPositive ? `+ ${formattedAmount}` : `- ${formattedAmount}`}
          </div>
          <h3 className="font-bold text-base text-slate-900 mt-1">
            {transaction.title}
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">{transaction.date}</p>
        </div>

        <div className="p-4 bg-slate-50 rounded-xl space-y-2 text-xs border border-slate-100">
          <div className="flex justify-between py-1 border-b border-slate-200/60">
            <span className="text-slate-500">Catégorie</span>
            <span className="font-semibold text-slate-800 capitalize">
              {transaction.category}
            </span>
          </div>
          <div className="flex justify-between py-1 border-b border-slate-200/60">
            <span className="text-slate-500">Statut</span>
            <span className="inline-flex items-center gap-1 font-semibold text-emerald-600">
              <CheckCircle2 className="w-3.5 h-3.5" /> Exécuté
            </span>
          </div>
          <div className="flex justify-between py-1 border-b border-slate-200/60">
            <span className="text-slate-500">Référence</span>
            <span className="font-mono text-slate-800">{transaction.reference}</span>
          </div>
          {transaction.subtitle && (
            <div className="flex justify-between py-1">
              <span className="text-slate-500">Libellé émetteur</span>
              <span className="text-slate-800 text-right">{transaction.subtitle}</span>
            </div>
          )}
        </div>

        <div className="flex gap-3 pt-2">
          <button
            onClick={() => alert('Téléchargement du justificatif d’opération en PDF.')}
            className="w-full py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" /> Télécharger le justificatif
          </button>
        </div>
      </div>
    </div>
  );
};

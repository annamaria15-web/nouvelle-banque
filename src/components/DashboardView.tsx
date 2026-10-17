import React, { useState } from 'react';
import {
  FileText,
  CreditCard,
  MoreHorizontal,
  Lock,
  ShieldAlert,
  AlertOctagon,
  ArrowLeftRight,
} from 'lucide-react';
import { BankAccount, Transaction, UserProfile } from '../types';
import { BlockedAccountCard } from './BlockedAccountCard';
import promoBannerImg from '../assets/images/banque_tours_ladefense_1791204869226.jpg';

interface DashboardViewProps {
  user: UserProfile;
  mainAccount: BankAccount;
  transactions: Transaction[];
  onOpenTransfer: () => void;
  onOpenRib: () => void;
  onOpenCards: () => void;
  onSelectTransaction: (tx: Transaction) => void;
  onViewAllTransactions: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  user,
  mainAccount,
  transactions,
  onOpenTransfer,
  onOpenRib,
  onOpenCards,
  onSelectTransaction,
  onViewAllTransactions,
}) => {
  const [activeTab, setActiveTab] = useState<'historique' | 'details'>('historique');

  const displayTransactions = transactions.slice(0, 5);

  const handleBlockedAction = () => {
    alert(
      'Opération impossible : Le compte fait l’objet d’un blocage temporaire. Les opérations sortantes sont momentanément suspendues.'
    );
  };

  return (
    <div className="space-y-6">
      {/* Temporary Block Security Header Notice */}
      <div className="bg-amber-50/90 border-2 border-amber-300 rounded-2xl p-4 sm:p-5 flex items-start gap-4 text-amber-950 shadow-xs">
        <div className="w-12 h-12 rounded-full bg-[#C83B30] text-white flex items-center justify-center shrink-0 shadow-sm">
          <Lock className="w-6 h-6 stroke-[2.4]" />
        </div>
        <div className="space-y-1 flex-1">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="font-black text-base text-amber-900 flex items-center gap-2">
              <span>Compte bloqué temporairement · Opérations suspendues</span>
              <span className="text-[10px] bg-amber-600 text-white px-2.5 py-0.5 rounded-full uppercase tracking-widest font-black">
                Temporaire
              </span>
            </h2>
            <span className="text-xs font-mono font-bold text-amber-900 bg-amber-100/90 border border-amber-300 px-2.5 py-0.5 rounded-lg">
              Solde immobilisé : {new Intl.NumberFormat('fr-FR', { minimumFractionDigits: 2 }).format(mainAccount.balance)} {mainAccount.currencySymbol || '€'}
            </span>
          </div>
          <p className="text-xs text-amber-900/90 leading-relaxed">
            Ce compte fait l’objet d’un blocage temporaire par mesure de sécurité. L’ensemble des opérations financières sortantes (virements bancaires, paiements, retraits DAB et prélèvements) sont momentanément suspendues par le système central.
          </p>
        </div>
      </div>

      {/* Welcome Greeting */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
            Bonjour, {user.fullName}
          </h1>
          <p className="text-sm text-slate-500 mt-1 font-medium">
            Comptes
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-red-100 text-red-700 border border-red-300 flex items-center gap-2 shadow-2xs">
            <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse" />
            <span>Fonds gelés définitivement</span>
          </div>
        </div>
      </div>

      {/* Main Grid matching the layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Account Card + Promo Banner (lg:col-span-5) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-4">
            {/* The exact Desjardins-style Blocked Card */}
            <BlockedAccountCard
              account={mainAccount}
              user={user}
            />

            {/* Blocked Account Quick Actions: Transfers are disabled */}
            <div className="bg-white rounded-2xl p-4 border border-slate-200 grid grid-cols-4 gap-2 text-center shadow-xs">
              <button
                type="button"
                onClick={handleBlockedAction}
                className="flex flex-col items-center gap-1.5 p-2 rounded-xl bg-slate-50 border border-red-100 text-red-400 cursor-not-allowed group text-center"
                title="Virement interdit sur compte gelé"
              >
                <div className="w-9 h-9 rounded-full bg-red-100 text-red-600 flex items-center justify-center">
                  <Lock className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-bold text-red-600 line-through">Virement</span>
              </button>

              <button
                onClick={onOpenRib}
                className="flex flex-col items-center gap-1.5 p-2 rounded-xl hover:bg-slate-50 transition-colors group text-center"
              >
                <div className="w-9 h-9 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center">
                  <FileText className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-medium text-slate-600">RIB</span>
              </button>

              <button
                onClick={onOpenCards}
                className="flex flex-col items-center gap-1.5 p-2 rounded-xl hover:bg-slate-50 transition-colors group text-center"
              >
                <div className="w-9 h-9 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center">
                  <CreditCard className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-medium text-slate-600">Cartes</span>
              </button>

              <button
                onClick={onViewAllTransactions}
                className="flex flex-col items-center gap-1.5 p-2 rounded-xl hover:bg-slate-50 transition-colors group text-center"
              >
                <div className="w-9 h-9 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center">
                  <MoreHorizontal className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-medium text-slate-600">Détails</span>
              </button>
            </div>
          </div>

          {/* Promo Card */}
          <div className="bg-[#0B131F] text-white rounded-2xl overflow-hidden shadow-sm border border-slate-800 flex items-stretch min-h-[110px]">
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-red-400">
                  Information Réglementaire
                </span>
                <h3 className="font-bold text-sm text-white mt-1 leading-snug">
                  Séquestre conservatoire des avoirs
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Les fonds restent consignés sans possibilité de décaissement.
                </p>
              </div>
            </div>
            <div className="w-28 shrink-0 relative hidden sm:block">
              <img
                src={promoBannerImg}
                alt="Banque"
                className="w-full h-full object-cover opacity-60"
              />
            </div>
          </div>
        </div>

        {/* Right Column: Transactions & Tabs (lg:col-span-7) */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-6">
          {/* Header tabs: Historique vs Détails */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex gap-6">
              <button
                onClick={() => setActiveTab('historique')}
                className={`text-sm font-bold pb-2 relative transition-colors ${
                  activeTab === 'historique'
                    ? 'text-slate-900 border-b-2 border-[#E60028]'
                    : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                Opérations récentes
              </button>
              <button
                onClick={() => setActiveTab('details')}
                className={`text-sm font-bold pb-2 relative transition-colors ${
                  activeTab === 'details'
                    ? 'text-slate-900 border-b-2 border-[#E60028]'
                    : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                Détails du compte
              </button>
            </div>

            <span className="text-xs text-red-600 font-semibold flex items-center gap-1">
              <Lock className="w-3.5 h-3.5" /> Compte gelé
            </span>
          </div>

          {activeTab === 'historique' ? (
            <div className="space-y-3">
              {/* Alert regarding rejected / frozen state */}
              <div className="p-3 bg-red-50/80 border border-red-200 rounded-xl text-xs text-red-900 flex items-center gap-2">
                <AlertOctagon className="w-4 h-4 text-red-600 shrink-0" />
                <span>
                  Toute nouvelle transaction débitrice est automatiquement bloquée et rejetée.
                </span>
              </div>

              {/* Transactions List */}
              <div className="divide-y divide-slate-100">
                {displayTransactions.map((tx) => (
                  <div
                    key={tx.id}
                    onClick={() => onSelectTransaction(tx)}
                    className="py-3.5 flex items-center justify-between hover:bg-slate-50 px-2 rounded-xl transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs bg-red-50 text-red-600 group-hover:scale-105 transition-transform">
                        <Lock className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-slate-900 group-hover:text-red-600 transition-colors">
                          {tx.title}
                        </div>
                        <div className="text-xs text-slate-500">
                          {tx.date} {tx.subtitle && `· ${tx.subtitle}`}
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-sm font-black text-slate-900 tabular-nums">
                        {tx.amount > 0 ? `+${tx.amount.toFixed(2)} €` : `${tx.amount.toFixed(2)} €`}
                      </div>
                      <span className="text-[10px] text-amber-700 font-semibold bg-amber-50 px-1.5 py-0.5 rounded">
                        Sous séquestre
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <button
                  onClick={onViewAllTransactions}
                  className="w-full py-2.5 text-center text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 rounded-xl transition-colors"
                >
                  Voir tout l'historique archivé
                </button>
              </div>
            </div>
          ) : (
            /* Tab: Détails du compte */
            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
                <div>
                  <span className="text-slate-500 block">Titulaire</span>
                  <span className="font-bold text-slate-900 text-sm">{user.fullName}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Statut juridique</span>
                  <span className="font-bold text-amber-700 text-sm">Blocage temporaire (Sécurité)</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Numéro de compte / IBAN</span>
                  <span className="font-mono font-semibold text-slate-800">{mainAccount.iban}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Code BIC</span>
                  <span className="font-mono font-semibold text-slate-800">{mainAccount.bic}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Solde sous séquestre</span>
                  <span className="font-mono font-bold text-slate-900 text-sm">
                    {new Intl.NumberFormat('fr-FR', { minimumFractionDigits: 2 }).format(mainAccount.balance)} {mainAccount.currencySymbol || '€'}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block">Autorisation de découvert</span>
                  <span className="font-bold text-red-600">0,00 € (Révoquée)</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

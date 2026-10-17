import React, { useState } from 'react';
import {
  Wallet,
  PiggyBank,
  TrendingUp,
  FileDown,
  Filter,
  Search,
  ChevronRight,
  ArrowUpRight,
  ArrowDownLeft,
  Calendar,
  FileText,
} from 'lucide-react';
import { BankAccount, Transaction, UserProfile } from '../types';

interface AccountsViewProps {
  accounts: BankAccount[];
  transactions: Transaction[];
  user: UserProfile;
  onOpenTransfer: () => void;
  onOpenRib: () => void;
  onSelectTransaction: (tx: Transaction) => void;
}

export const AccountsView: React.FC<AccountsViewProps> = ({
  accounts,
  transactions,
  user,
  onOpenTransfer,
  onOpenRib,
  onSelectTransaction,
}) => {
  const [selectedAccountId, setSelectedAccountId] = useState(accounts[0]?.id || '');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const currentAccount = accounts.find((a) => a.id === selectedAccountId) || accounts[0];

  const totalWealth = accounts.reduce((acc, curr) => acc + curr.balance, 0);

  const filteredTransactions = transactions.filter((tx) => {
    const matchesCategory = filterCategory === 'all' || tx.category === filterCategory;
    const matchesSearch =
      tx.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.subtitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.amount.toString().includes(searchTerm);
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Overview Card */}
      <div className="bg-[#0B131F] text-white p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm border border-slate-800">
        <div>
          <span className="text-xs uppercase font-bold tracking-wider text-slate-400">
            Situation globale de vos avoirs
          </span>
          <div className="text-3xl font-extrabold tracking-tight mt-1 text-white tabular-nums">
            {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(
              totalWealth
            )}
          </div>
          <span className="text-xs text-slate-400 mt-1 block">
            {accounts.length} comptes et livrets actifs · Société Générale
          </span>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => {
              if (currentAccount.isBlocked) {
                alert('Virement refusé : Le compte sélectionné est bloqué. Aucun virement ne peut être effectué (Fonds temporairement gelés).');
                return;
              }
              onOpenTransfer();
            }}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-colors shadow-sm ${
              currentAccount.isBlocked
                ? 'bg-slate-700 text-slate-400 cursor-not-allowed'
                : 'bg-[#E60028] hover:bg-red-700 text-white'
            }`}
          >
            {currentAccount.isBlocked ? 'Virements bloqués' : 'Nouveau virement'}
          </button>
          <button
            onClick={onOpenRib}
            className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold transition-colors border border-slate-700 flex items-center gap-2"
          >
            <FileText className="w-3.5 h-3.5" /> Télécharger RIB
          </button>
        </div>
      </div>

      {/* Account Cards Carousel / List */}
      <div>
        <h2 className="text-sm font-bold text-slate-800 mb-3 uppercase tracking-wider">
          Vos comptes bancaires & d'épargne
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {accounts.map((acc) => {
            const isSelected = acc.id === currentAccount.id;
            return (
              <div
                key={acc.id}
                onClick={() => setSelectedAccountId(acc.id)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer text-left relative ${
                  isSelected
                    ? 'bg-white border-[#E60028] shadow-md ring-1 ring-[#E60028]'
                    : 'bg-white border-slate-200/80 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-slate-900">{acc.label}</span>
                  {acc.isBlocked ? (
                    <span className="text-[10px] px-2 py-0.5 bg-red-100 text-red-700 font-bold rounded-full border border-red-200">
                      BLOQUÉ · Fonds gelés
                    </span>
                  ) : acc.type === 'courant' ? (
                    <span className="text-[10px] px-2 py-0.5 bg-red-50 text-red-700 font-bold rounded-full">
                      Courant
                    </span>
                  ) : (
                    <span className="text-[10px] px-2 py-0.5 bg-emerald-50 text-emerald-700 font-bold rounded-full">
                      Épargne
                    </span>
                  )}
                </div>

                <div className="text-xl font-black text-slate-900 tabular-nums mb-1">
                  {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(
                    acc.balance
                  )}
                </div>

                <div className="text-[11px] font-mono text-slate-400 truncate">
                  {acc.iban}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Account Operations Ledger */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Historique des opérations · {currentAccount.label}
            </h3>
            <span className="text-xs text-slate-500 font-mono">
              IBAN : {currentAccount.iban}
            </span>
          </div>

          {/* Search within transactions */}
          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Filtrer les opérations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-red-500"
            />
          </div>
        </div>

        {/* Filter categories tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          {[
            { id: 'all', label: 'Toutes' },
            { id: 'salaire', label: 'Salaires' },
            { id: 'alimentation', label: 'Alimentation' },
            { id: 'retrait', label: 'Retraits' },
            { id: 'virement', label: 'Virements' },
            { id: 'achats', label: 'Achats' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilterCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
                filterCategory === cat.id
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:text-slate-900'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Table of operations */}
        <div className="divide-y divide-slate-100">
          {filteredTransactions.length === 0 ? (
            <div className="py-8 text-center text-xs text-slate-400">
              Aucune opération ne correspond à vos critères de recherche.
            </div>
          ) : (
            filteredTransactions.map((tx) => {
              const isPositive = tx.amount > 0;
              const formattedAmount = new Intl.NumberFormat('fr-FR', {
                style: 'currency',
                currency: 'EUR',
              }).format(Math.abs(tx.amount));

              return (
                <div
                  key={tx.id}
                  onClick={() => onSelectTransaction(tx)}
                  className="py-3 flex items-center justify-between hover:bg-slate-50 -mx-3 px-3 rounded-xl transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${
                        isPositive
                          ? 'bg-emerald-50 text-emerald-600'
                          : 'bg-red-50 text-red-600'
                      }`}
                    >
                      {isPositive ? (
                        <ArrowDownLeft className="w-4 h-4" />
                      ) : (
                        <ArrowUpRight className="w-4 h-4" />
                      )}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-slate-900 group-hover:text-red-600 transition-colors">
                        {tx.title}
                      </div>
                      <div className="text-xs text-slate-400 flex items-center gap-2">
                        <span>{tx.date}</span>
                        {tx.subtitle && (
                          <>
                            <span>·</span>
                            <span>{tx.subtitle}</span>
                          </>
                        )}
                        <span>·</span>
                        <span className="font-mono">{tx.reference}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      className={`text-sm font-bold tabular-nums ${
                        isPositive ? 'text-emerald-600' : 'text-red-600'
                      }`}
                    >
                      {isPositive ? `+ ${formattedAmount}` : `- ${formattedAmount}`}
                    </span>
                    <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-600" />
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

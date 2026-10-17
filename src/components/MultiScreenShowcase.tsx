import React, { useState } from 'react';
import {
  Eye,
  EyeOff,
  ChevronRight,
  ArrowLeftRight,
  FileText,
  CreditCard,
  MoreHorizontal,
  UserPlus,
  Users,
  Globe,
  Wifi,
  Sliders,
  User,
  Lock,
  Edit2,
  Camera,
  Home,
  Wallet,
  PiggyBank,
  Percent,
  ShieldCheck,
  HelpCircle,
  ExternalLink,
  ZoomIn,
} from 'lucide-react';
import { BankAccount, BankCard, Beneficiary, Transaction, UserProfile } from '../types';
import { Logo } from './Logo';
import promoBannerImg from '../assets/images/banque_tours_ladefense_1791204869226.jpg';

interface MultiScreenShowcaseProps {
  user: UserProfile;
  mainAccount: BankAccount;
  card: BankCard;
  transactions: Transaction[];
  beneficiaries: Beneficiary[];
  onNavigateToTab: (tab: 'accueil' | 'comptes' | 'virements' | 'cartes' | 'epargne' | 'credits' | 'assurances' | 'contact') => void;
  onOpenTransfer: () => void;
  onOpenRib: () => void;
  onOpenCards: () => void;
  onSelectTransaction: (tx: Transaction) => void;
}

export const MultiScreenShowcase: React.FC<MultiScreenShowcaseProps> = ({
  user,
  mainAccount,
  card,
  transactions,
  beneficiaries,
  onNavigateToTab,
  onOpenTransfer,
  onOpenRib,
  onOpenCards,
  onSelectTransaction,
}) => {
  const [hideBalance, setHideBalance] = useState(false);
  const [recipientInput, setRecipientInput] = useState('');
  const [ibanInput, setIbanInput] = useState('');
  const [amountInput, setAmountInput] = useState('');
  const [motifInput, setMotifInput] = useState('');
  const [virementSuccess, setVirementSuccess] = useState(false);

  const formattedBalance = new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
  }).format(mainAccount.balance);

  const handleQuickTransfer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amountInput) return;
    setVirementSuccess(true);
    setTimeout(() => setVirementSuccess(false), 3000);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Top Banner introducing the multi-screen composition */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-white p-4 md:p-5 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <span className="text-xs font-bold text-[#E60028] uppercase tracking-wider">
            Vue d'ensemble architecturale · Société Générale
          </span>
          <h2 className="text-lg md:text-xl font-extrabold text-slate-900 mt-0.5">
            Écrans et parcours clients interconnectés
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Retrouvez tous les écrans du dashboard web et mobile présentés côte à côte, avec composants vivants et interactifs.
          </p>
        </div>
        <div className="shrink-0 flex items-center gap-2">
          <button
            onClick={() => onNavigateToTab('accueil')}
            className="px-4 py-2 bg-[#E60028] hover:bg-red-700 text-white rounded-xl text-xs font-bold transition-colors shadow-sm inline-flex items-center gap-1.5"
          >
            Passer en mode plein écran
          </button>
        </div>
      </div>

      {/* Row 1: Dashboard Primary + Step 1 Transfer + Step 2 Transfer */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        {/* Screen 1: Grand Dashboard (Central & Left View in image) */}
        <div className="xl:col-span-7 bg-[#F4F6F9] p-5 rounded-3xl border border-slate-200 shadow-sm space-y-5">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200/60">
            <span className="text-xs font-extrabold text-slate-700 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#E60028]" />
              Écran Principal · Tableau de bord
            </span>
            <button
              onClick={() => onNavigateToTab('accueil')}
              className="text-[11px] font-semibold text-[#E60028] hover:underline inline-flex items-center gap-1"
            >
              Agrandir <ExternalLink className="w-3 h-3" />
            </button>
          </div>

          <div>
            <h1 className="text-xl font-extrabold text-slate-900">
              Bonjour {user.fullName}
            </h1>
            <p className="text-xs text-slate-500">
              Voici la situation de vos comptes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-start">
            {/* Red Card + Promo */}
            <div className="md:col-span-6 space-y-4">
              {mainAccount.isBlocked ? (
                /* Blocked Account Card Matching Screenshot */
                <div className="bg-white rounded-2xl p-4 border border-slate-300 shadow-sm space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-[#C83B30] text-white flex items-center justify-center shrink-0">
                        <Lock className="w-4 h-4" />
                      </div>
                      <span className="text-sm font-bold text-slate-900">
                        {mainAccount.label || 'Compte chèques'}
                      </span>
                    </div>
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                      {mainAccount.blockedStatusText || 'BLOQUÉ'}
                    </span>
                  </div>

                  <div className="text-right py-2">
                    <div className="text-2xl font-black text-slate-900 tabular-nums font-mono">
                      {new Intl.NumberFormat('fr-CA', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }).format(mainAccount.balance)}{' '}
                      {mainAccount.currencySymbol || '€'}
                    </div>
                  </div>

                  <div className="border-t border-slate-200 pt-2 text-xs text-slate-900 font-medium">
                    {mainAccount.blockedReason || 'Fonds temporairement gelés'}
                  </div>
                </div>
              ) : (
                /* Carte Compte Courant */
                <div className="bg-[#E60028] text-white rounded-2xl p-5 shadow-md relative overflow-hidden">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-bold tracking-widest text-white/90 uppercase">
                      COMPTE COURANT
                    </span>
                    <button
                      onClick={() => setHideBalance(!hideBalance)}
                      className="p-1 hover:bg-white/20 rounded-full text-white/90"
                    >
                      {hideBalance ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                  </div>

                  <div className="text-[10px] font-mono text-white/80 mb-3 truncate">
                    {mainAccount.iban}
                  </div>

                  <div className="flex items-center justify-between mb-1">
                    <div className="text-2xl font-black tabular-nums">
                      {hideBalance ? '•••••• €' : formattedBalance}
                    </div>
                    <ChevronRight className="w-5 h-5 text-white/80" />
                  </div>

                  <div className="text-[10px] text-white/70 mb-4">
                    Solde au {mainAccount.lastUpdated}
                  </div>

                  <div className="grid grid-cols-4 gap-1.5 pt-2 border-t border-white/20 text-center">
                    <button
                      onClick={onOpenTransfer}
                      className="flex flex-col items-center gap-1 p-1 hover:bg-white/10 rounded-lg text-white"
                    >
                      <div className="w-7 h-7 rounded-full bg-white/15 flex items-center justify-center">
                        <ArrowLeftRight className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-[9px]">Virement</span>
                    </button>
                    <button
                      onClick={onOpenRib}
                      className="flex flex-col items-center gap-1 p-1 hover:bg-white/10 rounded-lg text-white"
                    >
                      <div className="w-7 h-7 rounded-full bg-white/15 flex items-center justify-center">
                        <FileText className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-[9px]">RIB</span>
                    </button>
                    <button
                      onClick={onOpenCards}
                      className="flex flex-col items-center gap-1 p-1 hover:bg-white/10 rounded-lg text-white"
                    >
                      <div className="w-7 h-7 rounded-full bg-white/15 flex items-center justify-center">
                        <CreditCard className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-[9px]">Cartes</span>
                    </button>
                    <button
                      onClick={() => onNavigateToTab('comptes')}
                      className="flex flex-col items-center gap-1 p-1 hover:bg-white/10 rounded-lg text-white"
                    >
                      <div className="w-7 h-7 rounded-full bg-white/15 flex items-center justify-center">
                        <MoreHorizontal className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-[9px]">Plus</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Promo Banner */}
              <div className="bg-[#0B131F] text-white rounded-2xl overflow-hidden flex items-stretch shadow-sm">
                <div className="p-3.5 flex-1 flex flex-col justify-center">
                  <h4 className="font-bold text-xs leading-snug">
                    Une banque plus proche de vous
                  </h4>
                  <p className="text-[10px] text-slate-300 mt-1">
                    Des solutions adaptées à tous vos projets.
                  </p>
                </div>
                <div className="w-24 relative shrink-0">
                  <img
                    src={promoBannerImg}
                    alt="Société Générale"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            </div>

            {/* Dernières opérations */}
            <div className="md:col-span-6 bg-white rounded-2xl p-4 border border-slate-200 space-y-3">
              <div className="flex items-center gap-4 border-b border-slate-100 pb-2 text-xs">
                <span className="font-bold text-red-600 border-b-2 border-red-600 pb-1 -mb-2">
                  Historique
                </span>
                <span className="text-slate-400">Détails</span>
              </div>

              <div className="text-xs font-bold text-slate-900 pt-1">
                Dernières opérations
              </div>

              <div className="divide-y divide-slate-100">
                {transactions.slice(0, 5).map((tx) => {
                  const isPositive = tx.amount > 0;
                  const formatted = new Intl.NumberFormat('fr-FR', {
                    style: 'currency',
                    currency: 'EUR',
                  }).format(Math.abs(tx.amount));

                  return (
                    <div
                      key={tx.id}
                      onClick={() => onSelectTransaction(tx)}
                      className="py-2.5 flex items-center justify-between text-xs hover:bg-slate-50 px-1 rounded-lg cursor-pointer"
                    >
                      <div className="min-w-0 pr-2">
                        <div className="text-[10px] text-slate-400">{tx.date}</div>
                        <div className="font-semibold text-slate-800 truncate">{tx.title}</div>
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        <span
                          className={`font-bold tabular-nums text-xs ${
                            isPositive ? 'text-emerald-600' : 'text-red-600'
                          }`}
                        >
                          {isPositive ? `+ ${formatted}` : `- ${formatted}`}
                        </span>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="pt-2 text-center border-t border-slate-100">
                <button
                  onClick={() => onNavigateToTab('comptes')}
                  className="text-[11px] font-semibold text-slate-600 hover:text-red-600 inline-flex items-center gap-1"
                >
                  Voir toutes les opérations <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Screen 2: "Compte courant / Choisissez un bénéficiaire" (Step 1) */}
        <div className="xl:col-span-3 bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <span className="text-xs font-extrabold text-slate-700 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-red-600" />
              Écran Virement · Étape 1
            </span>
            <button
              onClick={() => onNavigateToTab('virements')}
              className="text-[11px] font-semibold text-[#E60028] hover:underline"
            >
              Ouvrir
            </button>
          </div>

          <div>
            <h3 className="text-sm font-bold text-slate-900">Compte courant</h3>
            <div className="flex items-center gap-3 mt-2">
              <div className="flex items-center gap-1">
                <span className="w-5 h-5 rounded-full bg-[#E60028] text-white text-[10px] font-bold flex items-center justify-center">
                  1
                </span>
                <span className="text-[10px] font-bold text-red-600">Bénéficiaire</span>
              </div>
              <div className="w-4 h-0.5 bg-slate-200" />
              <div className="flex items-center gap-1">
                <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-400 text-[10px] font-bold flex items-center justify-center">
                  2
                </span>
                <span className="text-[10px] text-slate-400">Saisie</span>
              </div>
              <div className="w-4 h-0.5 bg-slate-200" />
              <div className="flex items-center gap-1">
                <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-400 text-[10px] font-bold flex items-center justify-center">
                  3
                </span>
                <span className="text-[10px] text-slate-400">Validation</span>
              </div>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <div className="text-xs font-bold text-slate-900">
              Choisissez un bénéficiaire
            </div>

            {/* Nouveau bénéficiaire button */}
            <div
              onClick={() => onNavigateToTab('virements')}
              className="p-3 rounded-xl border border-slate-200 hover:border-red-300 hover:bg-red-50/20 cursor-pointer transition-all flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-red-50 text-red-600 flex items-center justify-center shrink-0">
                  <UserPlus className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900 group-hover:text-red-600">
                    Nouveau bénéficiaire
                  </div>
                  <div className="text-[10px] text-slate-500">
                    Saisissez les coordonnées bancaires
                  </div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-300" />
            </div>

            {/* Mes bénéficiaires button */}
            <div
              onClick={() => onNavigateToTab('virements')}
              className="p-3 rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 cursor-pointer transition-all flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
                  <Users className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900 group-hover:text-red-600">
                    Mes bénéficiaires
                  </div>
                  <div className="text-[10px] text-slate-500">
                    Voir la liste de vos bénéficiaires
                  </div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-300" />
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100 space-y-2">
            <div className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
              Autres options
            </div>

            <div
              onClick={() => onNavigateToTab('virements')}
              className="p-3 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer flex items-center justify-between"
            >
              <div className="flex items-center gap-2.5">
                <ArrowLeftRight className="w-4 h-4 text-red-600" />
                <div>
                  <div className="text-xs font-bold text-slate-900">
                    Virement entre mes comptes
                  </div>
                  <div className="text-[10px] text-slate-500">Société Générale</div>
                </div>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
            </div>

            <div
              onClick={() => onNavigateToTab('virements')}
              className="p-3 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer flex items-center justify-between"
            >
              <div className="flex items-center gap-2.5">
                <Globe className="w-4 h-4 text-red-600" />
                <div>
                  <div className="text-xs font-bold text-slate-900">
                    Virement international
                  </div>
                  <div className="text-[10px] text-slate-500">Frais et pays éligibles</div>
                </div>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
            </div>
          </div>
        </div>

        {/* Screen 3: "Nouveau virement" (Step 2 - Saisie Form) */}
        <div className="xl:col-span-2 bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <span className="text-xs font-extrabold text-slate-700 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-red-600" />
              Écran Virement · Étape 2
            </span>
          </div>

          <h3 className="text-sm font-bold text-slate-900">Nouveau virement</h3>

          {virementSuccess ? (
            <div className="p-3 bg-emerald-50 rounded-xl text-center text-xs text-emerald-800 font-semibold border border-emerald-200">
              ✓ Virement envoyé !
            </div>
          ) : (
            <form onSubmit={handleQuickTransfer} className="space-y-3">
              <div>
                <label className="text-[11px] font-bold text-slate-700 block mb-1">
                  Bénéficiaire
                </label>
                <input
                  type="text"
                  placeholder="Nom du bénéficiaire"
                  value={recipientInput}
                  onChange={(e) => setRecipientInput(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-200 bg-white"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-700 block mb-1">
                  IBAN
                </label>
                <input
                  type="text"
                  placeholder="FR00 0000 0000 0000 00"
                  value={ibanInput}
                  onChange={(e) => setIbanInput(e.target.value)}
                  className="w-full text-xs font-mono p-2.5 rounded-lg border border-slate-200 bg-white"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-700 block mb-1">
                  Montant
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Ex : 100,00"
                    value={amountInput}
                    onChange={(e) => setAmountInput(e.target.value)}
                    className="w-full text-xs p-2.5 pr-6 rounded-lg border border-slate-200 bg-white font-semibold"
                  />
                  <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                    €
                  </span>
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-700 block mb-1">
                  Motif (optionnel)
                </label>
                <input
                  type="text"
                  placeholder="Ex : Loyer, Facture..."
                  value={motifInput}
                  onChange={(e) => setMotifInput(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-200 bg-white"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-[#E60028] hover:bg-red-700 text-white font-bold text-xs rounded-xl transition-colors shadow-sm"
              >
                Continuer
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Row 2: Mes cartes + Menu + Mon profil + Mobile Drawer */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-12 gap-6 items-start">
        {/* Screen 4: "Mes cartes" (xl:col-span-4) */}
        <div className="xl:col-span-4 bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <span className="text-xs font-extrabold text-slate-700 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-red-600" />
              Écran Mes cartes
            </span>
            <button
              onClick={() => onNavigateToTab('cartes')}
              className="text-[11px] font-semibold text-[#E60028] hover:underline"
            >
              Gérer
            </button>
          </div>

          <h3 className="text-sm font-bold text-slate-900">Mes cartes</h3>

          {/* Mini Card Graphic */}
          <div className="aspect-[1.586/1] w-full rounded-2xl p-4 bg-gradient-to-br from-[#1E2530] via-[#111620] to-[#0A0D14] text-white shadow-md relative overflow-hidden flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <Logo size="sm" lightText={true} />
              <Wifi className="w-4 h-4 text-slate-300 rotate-90" />
            </div>

            <div className="flex items-center gap-2">
              <div className="w-8 h-5 rounded-xs bg-[#E2B755] border border-[#a17c24]/50" />
            </div>

            <div className="font-mono text-sm tracking-widest text-slate-100">
              •••• 4821
            </div>

            <div className="flex justify-between items-end text-[10px] text-slate-300">
              <span>{card.type}</span>
              <span className="font-black italic text-xs">VISA</span>
            </div>
          </div>

          {/* Plafonds de ma carte */}
          <div className="space-y-3 pt-2">
            <div className="text-xs font-bold text-slate-900">
              Plafonds de ma carte
            </div>

            <div
              onClick={() => onNavigateToTab('cartes')}
              className="p-3 rounded-xl border border-slate-100 hover:bg-slate-50 cursor-pointer flex items-center justify-between"
            >
              <span className="text-xs text-slate-600">Paiements</span>
              <div className="flex items-center gap-1 text-xs font-bold text-slate-900">
                <span>3 000,00 € / jour</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              </div>
            </div>

            <div
              onClick={() => onNavigateToTab('cartes')}
              className="p-3 rounded-xl border border-slate-100 hover:bg-slate-50 cursor-pointer flex items-center justify-between"
            >
              <span className="text-xs text-slate-600">Retraits</span>
              <div className="flex items-center gap-1 text-xs font-bold text-slate-900">
                <span>500,00 € / jour</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Screen 5: "Menu" (xl:col-span-3) */}
        <div className="xl:col-span-3 bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <span className="text-xs font-extrabold text-slate-700 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-red-600" />
              Écran Menu Services
            </span>
          </div>

          <h3 className="text-sm font-bold text-slate-900">Menu</h3>

          {/* User profile capsule */}
          <div
            onClick={() => onNavigateToTab('contact')}
            className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between cursor-pointer hover:bg-slate-100 transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-xs">
                {user.initials}
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900">{user.fullName}</div>
                <div className="text-[10px] text-slate-400">Mon profil</div>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </div>

          <div className="space-y-2 pt-2">
            <div className="text-xs font-bold text-slate-900">Mes services</div>

            <div
              onClick={() => onNavigateToTab('comptes')}
              className="p-3 rounded-xl border border-slate-100 hover:bg-slate-50 cursor-pointer flex items-center justify-between"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-red-50 text-red-600 flex items-center justify-center">
                  <Wallet className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">Comptes</div>
                  <div className="text-[10px] text-slate-400">Consulter et gérer mes comptes</div>
                </div>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            </div>

            <div
              onClick={() => onNavigateToTab('virements')}
              className="p-3 rounded-xl border border-slate-100 hover:bg-slate-50 cursor-pointer flex items-center justify-between"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-red-50 text-red-600 flex items-center justify-center">
                  <ArrowLeftRight className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">Virements</div>
                  <div className="text-[10px] text-slate-400">Effectuer un virement</div>
                </div>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            </div>

            <div
              onClick={() => onNavigateToTab('cartes')}
              className="p-3 rounded-xl border border-slate-100 hover:bg-slate-50 cursor-pointer flex items-center justify-between"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-red-50 text-red-600 flex items-center justify-center">
                  <CreditCard className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">Cartes</div>
                  <div className="text-[10px] text-slate-400">Gérer mes cartes</div>
                </div>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            </div>
          </div>
        </div>

        {/* Screen 6: "Mon profil" (xl:col-span-3) */}
        <div className="xl:col-span-3 bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <span className="text-xs font-extrabold text-slate-700 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-red-600" />
              Écran Mon profil
            </span>
          </div>

          <h3 className="text-sm font-bold text-slate-900">Mon profil</h3>

          {/* Profile Circle Avatar */}
          <div className="text-center py-2">
            <div className="relative inline-block">
              <div className="w-16 h-16 rounded-full bg-slate-200 flex items-center justify-center text-lg font-black text-slate-700">
                {user.initials}
              </div>
              <div className="absolute bottom-0 right-0 p-1 bg-[#0B131F] text-white rounded-full">
                <Camera className="w-2.5 h-2.5" />
              </div>
            </div>

            <div className="mt-2 font-bold text-xs text-slate-900 flex items-center justify-center gap-1">
              <span>{user.fullName}</span>
              <Edit2 className="w-3 h-3 text-slate-400" />
            </div>
            <div className="text-[10px] text-slate-400">{user.email}</div>
          </div>

          <div className="space-y-2 pt-2 border-t border-slate-100">
            <div className="text-xs font-bold text-slate-900">
              Informations personnelles
            </div>

            <div className="p-2.5 rounded-xl border border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-slate-500" />
                <div>
                  <div className="text-xs font-bold text-slate-900">Coordonnées</div>
                  <div className="text-[10px] text-slate-400">Téléphone, email, adresse</div>
                </div>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            </div>

            <div className="p-2.5 rounded-xl border border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-slate-500" />
                <div>
                  <div className="text-xs font-bold text-slate-900">Sécurité</div>
                  <div className="text-[10px] text-slate-400">Code secret, authentification</div>
                </div>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            </div>
          </div>
        </div>

        {/* Screen 7: Mobile Drawer Preview (xl:col-span-2) */}
        <div className="xl:col-span-2 bg-[#0B131F] p-4 rounded-3xl text-white shadow-sm space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <Logo size="sm" lightText={true} />
            <span className="text-[10px] text-slate-500">Menu</span>
          </div>

          <div className="flex items-center gap-2 p-2 bg-slate-900/80 rounded-xl">
            <div className="w-7 h-7 rounded-full bg-slate-700 text-xs font-bold flex items-center justify-center">
              {user.initials}
            </div>
            <div>
              <div className="text-[11px] font-bold text-white truncate max-w-[90px]">
                {user.fullName}
              </div>
              <div className="text-[9px] text-slate-400">Mon profil</div>
            </div>
          </div>

          <div className="space-y-1 text-xs">
            <div className="p-2 rounded-lg bg-[#E60028] text-white font-bold flex items-center gap-2">
              <Home className="w-3.5 h-3.5" /> Accueil
            </div>
            <div className="p-2 rounded-lg text-slate-300 hover:text-white flex items-center gap-2">
              <Wallet className="w-3.5 h-3.5" /> Comptes
            </div>
            <div className="p-2 rounded-lg text-slate-300 hover:text-white flex items-center gap-2">
              <ArrowLeftRight className="w-3.5 h-3.5" /> Virements
            </div>
            <div className="p-2 rounded-lg text-slate-300 hover:text-white flex items-center gap-2">
              <CreditCard className="w-3.5 h-3.5" /> Cartes
            </div>
            <div className="p-2 rounded-lg text-slate-300 hover:text-white flex items-center gap-2">
              <PiggyBank className="w-3.5 h-3.5" /> Épargne
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

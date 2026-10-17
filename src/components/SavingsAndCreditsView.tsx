import React, { useState } from 'react';
import {
  PiggyBank,
  TrendingUp,
  Percent,
  ShieldCheck,
  HelpCircle,
  Phone,
  Mail,
  MessageSquare,
  ChevronRight,
  Calculator,
  AlertOctagon,
  Lock,
  ArrowRight,
} from 'lucide-react';
import { BankAccount, UserProfile } from '../types';

interface SecondaryViewProps {
  type: 'epargne' | 'credits' | 'assurances' | 'contact';
  accounts: BankAccount[];
  user: UserProfile;
  onOpenTransfer: () => void;
}

export const SecondaryView: React.FC<SecondaryViewProps> = ({
  type,
  accounts,
  user,
  onOpenTransfer,
}) => {
  // Simulator states for credits
  const [loanAmount, setLoanAmount] = useState(15000);
  const [loanDuration, setLoanDuration] = useState(36); // months
  const interestRate = 0.039; // 3.9%
  const monthlyPayment =
    (loanAmount * (interestRate / 12)) /
    (1 - Math.pow(1 + interestRate / 12, -loanDuration));

  if (type === 'epargne') {
    const savingsAccounts = accounts.filter((a) => a.type === 'epargne' || a.type === 'pel');
    const totalSavings = savingsAccounts.reduce((acc, curr) => acc + curr.balance, 0);

    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Épargne & Placements
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Gérez vos livrets réglementés, votre épargne logement et vos investissements.
          </p>
        </div>

        <div className="bg-[#0B131F] text-white p-6 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-slate-800">
          <div>
            <span className="text-xs font-semibold text-slate-400">Total de votre épargne disponible</span>
            <div className="text-3xl font-extrabold tabular-nums mt-1 text-white">
              {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(
                totalSavings
              )}
            </div>
          </div>
          <button
            onClick={onOpenTransfer}
            className="px-4 py-2.5 bg-[#E60028] hover:bg-red-700 text-white rounded-xl text-xs font-bold transition-colors"
          >
            Alimenter mon épargne
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {savingsAccounts.map((acc) => (
            <div key={acc.id} className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-bold text-slate-900 text-sm">{acc.label}</span>
                <span className="text-xs px-2 py-0.5 bg-emerald-50 text-emerald-700 font-bold rounded-full">
                  {acc.type === 'epargne' ? 'Taux : 3,00%' : 'Taux : 2,25%'}
                </span>
              </div>
              <div className="text-2xl font-black text-slate-900 tabular-nums">
                {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(
                  acc.balance
                )}
              </div>
              <div className="text-xs text-slate-400 font-mono">{acc.iban}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (type === 'credits') {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Crédits & Financements
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Simulez votre prêt personnel ou immobilier Société Générale avec accord de principe immédiat.
          </p>
        </div>

        {/* Loan simulator */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-6">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <Calculator className="w-5 h-5 text-red-600" />
            <h2 className="font-bold text-base text-slate-900">
              Simulateur de prêt personnel express
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs font-bold text-slate-700 mb-1.5">
                  <span>Montant emprunté</span>
                  <span className="text-red-600 font-black">{loanAmount} €</span>
                </div>
                <input
                  type="range"
                  min="2000"
                  max="50000"
                  step="1000"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="w-full accent-[#E60028]"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-slate-700 mb-1.5">
                  <span>Durée de remboursement</span>
                  <span className="text-red-600 font-black">{loanDuration} mois ({Math.round(loanDuration / 12)} ans)</span>
                </div>
                <input
                  type="range"
                  min="12"
                  max="84"
                  step="12"
                  value={loanDuration}
                  onChange={(e) => setLoanDuration(Number(e.target.value))}
                  className="w-full accent-[#E60028]"
                />
              </div>
            </div>

            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 flex flex-col justify-center items-center text-center space-y-3">
              <span className="text-xs text-slate-500 font-medium">Votre mensualité estimée</span>
              <div className="text-3xl font-extrabold text-[#E60028] tabular-nums">
                {monthlyPayment.toFixed(2)} € / mois
              </div>
              <p className="text-[11px] text-slate-400">
                TAEG fixe de 3,90% · Assurance facultative non incluse
              </p>
              <button
                onClick={() => alert('Demande de prêt soumise à votre conseiller.')}
                className="w-full py-2.5 px-4 bg-[#E60028] hover:bg-red-700 text-white rounded-xl text-xs font-bold transition-colors shadow-sm"
              >
                Faire une demande en ligne
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'assurances') {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Assurances & Prévoyance
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Vos contrats d'assurance et protection quotidienne.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-full bg-red-50 text-red-600 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-slate-900">Assurance Moyens de Paiement</h3>
            <p className="text-xs text-slate-500">
              Protection contre la perte, le vol de carte, de chéquier et de vos clés ou papiers.
            </p>
            <span className="inline-block text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
              Actif (Contrat N° SG-882190)
            </span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-slate-900">Assurance Habitation</h3>
            <p className="text-xs text-slate-500">
              Couverture multirisque pour votre logement avec assistance 24/7 en cas d'urgence.
            </p>
            <button
              onClick={() => alert('Devis en cours de préparation')}
              className="text-xs font-bold text-[#E60028] hover:underline"
            >
              Obtenir un devis en 3 min &rarr;
            </button>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-slate-900">Protection Juridique</h3>
            <p className="text-xs text-slate-500">
              Défense de vos droits dans vos litiges du quotidien (consommation, voisinage, travail).
            </p>
            <button
              onClick={() => alert('Devis en cours')}
              className="text-xs font-bold text-[#E60028] hover:underline"
            >
              Découvrir la formule &rarr;
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Aide & Contact
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          Aide & Contact
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Votre conseiller dédié et nos services d'assistance d'urgence à votre écoute.
        </p>
      </div>

      {/* Emergency Assistance */}
      <div className="bg-red-50 border border-red-200 p-5 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-full bg-[#E60028] text-white flex items-center justify-center shrink-0">
            <AlertOctagon className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-red-900">
              Urgence Carte bancaire (Opposition 24/7)
            </h3>
            <p className="text-xs text-red-700">
              En cas de perte, vol ou utilisation frauduleuse de votre carte bancaire.
            </p>
          </div>
        </div>
        <a
          href="tel:0969397777"
          className="px-4 py-2 bg-[#E60028] hover:bg-red-700 text-white rounded-xl text-xs font-bold text-center transition-colors whitespace-nowrap shadow-sm"
        >
          Appeler le 09 69 39 77 77
        </a>
      </div>

      {/* Advisor card */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
        <h2 className="text-base font-bold text-slate-900">
          Votre conseiller particulier
        </h2>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-slate-50 rounded-xl border border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-sm">
              HM
            </div>
            <div>
              <div className="font-bold text-sm text-slate-900">{user.advisorName}</div>
              <div className="text-xs text-slate-500">{user.agency}</div>
              <div className="text-xs text-slate-400 mt-0.5">{user.advisorEmail}</div>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => alert(`Prendre rendez-vous avec ${user.advisorName}`)}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors"
            >
              Prendre rendez-vous
            </button>
            <button
              onClick={() => alert(`Message envoyé à ${user.advisorName}`)}
              className="px-4 py-2 border border-slate-300 hover:bg-white text-slate-700 rounded-xl text-xs font-bold transition-colors"
            >
              Envoyer un message
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

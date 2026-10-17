import React, { useState } from 'react';
import {
  CreditCard,
  Lock,
  ShieldAlert,
  AlertTriangle,
  XCircle,
  Wifi,
} from 'lucide-react';
import { BankCard, UserProfile } from '../types';
import { Logo } from './Logo';

interface CardsViewProps {
  card: BankCard;
  user: UserProfile;
  onUpdateLimits: (paymentLimit: number, withdrawalLimit: number) => void;
  onToggleFeature: (feature: 'contactless' | 'online' | 'abroad' | 'lock') => void;
}

export const CardsView: React.FC<CardsViewProps> = ({
  card,
  user,
}) => {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Banner: Carte désactivée suite au blocage temporaire */}
      <div className="bg-amber-50/90 border-2 border-amber-300 rounded-2xl p-5 flex items-start gap-4 text-amber-950">
        <div className="w-12 h-12 rounded-full bg-[#C83B30] text-white flex items-center justify-center shrink-0">
          <Lock className="w-6 h-6 stroke-[2.4]" />
        </div>
        <div className="space-y-1">
          <h2 className="font-extrabold text-base text-amber-900 flex items-center gap-2">
            <span>Carte bancaire suspendue · Blocage temporaire du compte</span>
            <span className="text-[10px] bg-amber-600 text-white px-2 py-0.5 rounded-full font-bold uppercase">
              Temporaire
            </span>
          </h2>
          <p className="text-xs text-amber-900/90 leading-relaxed">
            La carte bancaire associée au compte chèques a été suspendue temporairement par mesure de sécurité. Les paiements en magasin, achats en ligne et retraits sont momentanément suspendus.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Left Column: Visual of frozen card */}
        <div className="md:col-span-5 space-y-4">
          <div className="aspect-[1.586/1] w-full rounded-2xl p-6 bg-gradient-to-br from-[#2D1B1B] via-[#1F1313] to-[#120B0B] text-white shadow-xl relative overflow-hidden flex flex-col justify-between border-2 border-red-900/60 filter grayscale-40">
            {/* Frozen Watermark Badge */}
            <div className="absolute inset-0 bg-red-950/40 flex items-center justify-center pointer-events-none">
              <div className="border-2 border-red-500/80 rounded-xl px-4 py-2 text-red-400 font-black tracking-widest text-sm uppercase -rotate-12 bg-black/60 shadow-lg">
                CARTE BLOQUÉE
              </div>
            </div>

            {/* Top row */}
            <div className="flex items-center justify-between">
              <Logo size="sm" lightText={true} />
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-red-400" />
                <Wifi className="w-4 h-4 text-slate-500 rotate-90" />
              </div>
            </div>

            {/* Chip */}
            <div className="flex items-center gap-2">
              <div className="w-11 h-8 rounded-md bg-[#8A7952] border border-[#52472F] shadow-inner" />
            </div>

            {/* Card Number */}
            <div className="font-mono text-lg sm:text-xl tracking-widest text-slate-400">
              •••• •••• •••• 9102
            </div>

            {/* Bottom Row */}
            <div className="flex justify-between items-end">
              <div>
                <span className="text-[9px] uppercase tracking-wider text-slate-400 block">
                  Titulaire
                </span>
                <span className="font-semibold text-slate-200 tracking-wider text-[11px]">
                  {user.fullName.toUpperCase()}
                </span>
              </div>
              <div className="font-black italic text-base tracking-tighter text-slate-400">
                VISA
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Status Summary */}
        <div className="md:col-span-7 bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4 text-xs">
          <h3 className="text-sm font-bold text-slate-900">
            Restrictions appliquées à la carte
          </h3>

          <div className="space-y-2.5">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
              <span className="text-slate-600">Paiements physiques & sans contact :</span>
              <span className="font-bold text-red-600 flex items-center gap-1">
                <XCircle className="w-3.5 h-3.5" /> Rejeté
              </span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
              <span className="text-slate-600">Paiements en ligne & e-commerce :</span>
              <span className="font-bold text-red-600 flex items-center gap-1">
                <XCircle className="w-3.5 h-3.5" /> Rejeté
              </span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
              <span className="text-slate-600">Retraits aux distributeurs DAB :</span>
              <span className="font-bold text-red-600 flex items-center gap-1">
                <XCircle className="w-3.5 h-3.5" /> Rejeté (Plafond 0,00 €)
              </span>
            </div>
          </div>

          <p className="text-[11px] text-slate-400 pt-2">
            La modification des plafonds et la réactivation des options de paiement sont inaccessibles tant que le gel administratif du compte chèques subsiste.
          </p>
        </div>
      </div>
    </div>
  );
};

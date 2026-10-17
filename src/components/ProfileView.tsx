import React, { useState } from 'react';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Shield,
  KeyRound,
  FileText,
  ChevronRight,
  Camera,
  Edit2,
  Check,
  Building2,
  Lock,
} from 'lucide-react';
import { UserProfile } from '../types';

interface ProfileViewProps {
  user: UserProfile;
  onUpdateProfile: (updated: Partial<UserProfile>) => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({ user, onUpdateProfile }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user.fullName);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);
  const [address, setAddress] = useState(user.address);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile({
      fullName: name,
      email,
      phone,
      address,
    });
    setIsEditing(false);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Title */}
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          Mon profil
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Gérez vos informations personnelles et vos paramètres de sécurité.
        </p>
      </div>

      {savedSuccess && (
        <div className="p-3 bg-emerald-50 text-emerald-700 text-xs rounded-xl border border-emerald-200 flex items-center gap-2">
          <Check className="w-4 h-4" /> Vos informations ont été mises à jour avec succès.
        </div>
      )}

      {/* Profile Card (Matches "Mon profil" in screenshot) */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs text-center space-y-4">
        {/* Avatar circle with camera badge */}
        <div className="relative inline-block mx-auto">
          <div className="w-24 h-24 rounded-full bg-slate-200 border-4 border-white shadow-sm flex items-center justify-center text-2xl font-black text-slate-700">
            {user.initials}
          </div>
          <button
            onClick={() => alert('Fonctionnalité photo de profil disponible')}
            className="absolute bottom-0 right-0 p-2 bg-[#0B131F] text-white rounded-full hover:bg-slate-800 transition-colors shadow-sm"
            title="Changer la photo"
          >
            <Camera className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Name and email */}
        <div>
          <div className="inline-flex items-center gap-2">
            <h2 className="text-xl font-extrabold text-slate-900">
              {user.fullName}
            </h2>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="p-1 text-slate-400 hover:text-slate-700"
              title="Modifier mes informations"
            >
              <Edit2 className="w-3.5 h-3.5" />
            </button>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">{user.email}</p>
          <span className="inline-block mt-2 px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-[11px] font-mono">
            N° Client : {user.clientNumber}
          </span>
        </div>
      </div>

      {/* Editing Modal/Form */}
      {isEditing ? (
        <form
          onSubmit={handleSave}
          className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4 animate-fadeIn"
        >
          <h3 className="text-sm font-bold text-slate-900">
            Modifier mes coordonnées
          </h3>

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              Nom complet
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-1 focus:ring-red-500"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              Adresse email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-1 focus:ring-red-500"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              Téléphone mobile
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-1 focus:ring-red-500"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              Adresse postale
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full p-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-1 focus:ring-red-500"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 text-xs text-slate-600 hover:text-slate-900"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold text-white bg-[#E60028] hover:bg-red-700 rounded-xl"
            >
              Enregistrer
            </button>
          </div>
        </form>
      ) : (
        /* Informations personnelles list (Matches screenshot) */
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4">
          <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            Informations personnelles
          </h3>

          <div className="divide-y divide-slate-100">
            {/* Coordonnées */}
            <div
              onClick={() => setIsEditing(true)}
              className="py-3.5 flex items-center justify-between hover:bg-slate-50/80 -mx-3 px-3 rounded-xl transition-colors cursor-pointer group"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center">
                  <User className="w-5 h-5 text-slate-600" />
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-900 group-hover:text-red-600 transition-colors block">
                    Coordonnées
                  </span>
                  <span className="text-[11px] text-slate-500">
                    Téléphone, email, adresse
                  </span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-700 transition-colors" />
            </div>

            {/* Sécurité */}
            <div
              onClick={() => alert('Module Pass Sécurité & Code secret actif')}
              className="py-3.5 flex items-center justify-between hover:bg-slate-50/80 -mx-3 px-3 rounded-xl transition-colors cursor-pointer group"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center">
                  <Lock className="w-5 h-5 text-slate-600" />
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-900 group-hover:text-red-600 transition-colors block">
                    Sécurité
                  </span>
                  <span className="text-[11px] text-slate-500">
                    Code secret, authentification biométrique
                  </span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-700 transition-colors" />
            </div>

            {/* Agence & Conseiller */}
            <div className="py-3.5 flex items-center justify-between hover:bg-slate-50/80 -mx-3 px-3 rounded-xl transition-colors cursor-pointer group">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-slate-600" />
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-900 group-hover:text-red-600 transition-colors block">
                    Mon agence & Conseiller
                  </span>
                  <span className="text-[11px] text-slate-500">
                    {user.agency} · {user.advisorName}
                  </span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-700 transition-colors" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

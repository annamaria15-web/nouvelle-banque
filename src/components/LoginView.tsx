import React, { useState, useEffect } from 'react';
import {
  Lock,
  ShieldCheck,
  UserPlus,
  HelpCircle,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  ArrowRight,
  User,
  Users,
  Eye,
  EyeOff,
  Check,
  X,
  Trash2,
  AlertOctagon,
} from 'lucide-react';
import { Logo } from './Logo';
import { ProjectCodeDownloadButton } from './ProjectCodeDownloadButton';
import { UserAccountData } from '../types';
import promoBannerImg from '../assets/images/banque_tours_ladefense_1791204869226.jpg';

export const MAX_AUTHORIZED_USERS = 5;

interface LoginViewProps {
  availableUsers: UserAccountData[];
  onLoginAttempt: (clientCode: string, passcode: string) => boolean;
  onRegisterUser: (data: {
    fullName: string;
    email: string;
    phone: string;
    clientCode: string;
    passcode: string;
    initialDeposit: number;
  }) => { success: boolean; error?: string };
  onDeleteUser?: (clientCode: string) => void;
  loggedOutMessage?: string | null;
}

export const LoginView: React.FC<LoginViewProps> = ({
  availableUsers,
  onLoginAttempt,
  onRegisterUser,
  onDeleteUser,
  loggedOutMessage,
}) => {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');

  // Login form state
  const [clientCode, setClientCode] = useState('');
  const [secretCode, setSecretCode] = useState('');
  const [rememberCode, setRememberCode] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [keypadNumbers, setKeypadNumbers] = useState<number[]>([]);

  // Register form state
  const [regFullName, setRegFullName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regClientCode, setRegClientCode] = useState(() =>
    generateUniqueClientCode(availableUsers)
  );
  const [regPasscode, setRegPasscode] = useState('');
  const [regDeposit, setRegDeposit] = useState('1500');
  const [registerSuccess, setRegisterSuccess] = useState(false);

  const isMaxUsersReached = availableUsers.length >= MAX_AUTHORIZED_USERS;

  // Helper to generate an 8-digit client code that is strictly unique
  function generateUniqueClientCode(existingUsers: UserAccountData[]): string {
    let code = '';
    do {
      code = Math.floor(10000000 + Math.random() * 90000000).toString();
    } while (existingUsers.some((u) => u.clientCode === code));
    return code;
  }

  // Scramble keypad on mount
  const shuffleKeypad = () => {
    const nums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    for (let i = nums.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [nums[i], nums[j]] = [nums[j], nums[i]];
    }
    setKeypadNumbers(nums);
  };

  useEffect(() => {
    shuffleKeypad();
  }, []);

  const handleKeypadClick = (num: number) => {
    if (secretCode.length < 6) {
      setSecretCode((prev) => prev + num);
      setErrorMessage('');
    }
  };

  const handleDeleteDigit = () => {
    setSecretCode((prev) => prev.slice(0, -1));
  };

  const handleClear = () => {
    setSecretCode('');
  };

  const handleSelectPreloadedAccount = (u: UserAccountData) => {
    setClientCode(u.clientCode);
    setSecretCode(u.passcode);
    setErrorMessage('');
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientCode.trim() || clientCode.trim().length < 8) {
      setErrorMessage('Veuillez saisir votre code client à 8 chiffres.');
      return;
    }
    if (secretCode.length !== 6) {
      setErrorMessage('Le code secret doit comporter exactement 6 chiffres.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const success = onLoginAttempt(clientCode.trim(), secretCode);
      if (!success) {
        setErrorMessage(
          'Identifiant ou code secret incorrect. Vérifiez vos accès ou créez un compte ci-dessous.'
        );
        setSecretCode('');
        shuffleKeypad();
      }
    }, 450);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isMaxUsersReached) {
      setErrorMessage(
        "L'ouverture de nouveaux comptes est actuellement fermée pour des raisons administratives."
      );
      return;
    }

    if (!regFullName.trim()) {
      setErrorMessage('Veuillez renseigner votre nom complet.');
      return;
    }
    if (!regEmail.trim()) {
      setErrorMessage('Veuillez renseigner une adresse email valide.');
      return;
    }

    // Check unique email
    const emailExists = availableUsers.some(
      (u) => u.profile.email.toLowerCase() === regEmail.trim().toLowerCase()
    );
    if (emailExists) {
      setErrorMessage('Cette adresse email est déjà associée à un compte existant.');
      return;
    }

    const cleanCode = regClientCode.replace(/\D/g, '');
    if (cleanCode.length !== 8) {
      setErrorMessage('Le code client doit comporter exactement 8 chiffres.');
      return;
    }

    // Check unique client code
    const codeExists = availableUsers.some((u) => u.clientCode === cleanCode);
    if (codeExists) {
      setErrorMessage('Ce code client est déjà attribué. Veuillez saisir ou générer un autre identifiant.');
      return;
    }

    if (regPasscode.length !== 6 || !/^\d{6}$/.test(regPasscode)) {
      setErrorMessage('Le code secret doit comporter exactement 6 chiffres numériques.');
      return;
    }

    const result = onRegisterUser({
      fullName: regFullName.trim(),
      email: regEmail.trim(),
      phone: regPhone.trim() || '+33 6 00 00 00 00',
      clientCode: cleanCode,
      passcode: regPasscode,
      initialDeposit: parseFloat(regDeposit) || 1000,
    });

    if (!result.success) {
      setErrorMessage(result.error || 'Erreur lors de la création du compte.');
      return;
    }

    setRegisterSuccess(true);
    setTimeout(() => {
      setClientCode(cleanCode);
      setSecretCode(regPasscode);
      setRegisterSuccess(false);
      setActiveTab('login');
      // Automatically log them into their newly created individual account
      onLoginAttempt(cleanCode, regPasscode);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#0B131F] flex flex-col justify-between relative overflow-hidden font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Background Graphic */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <img
          src={promoBannerImg}
          alt="Société Générale"
          className="w-full h-full object-cover filter blur-xs"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B131F] via-[#0B131F]/90 to-[#0B131F]" />
      </div>

      {/* Top Header */}
      <header className="relative z-10 px-6 py-5 flex items-center justify-between border-b border-slate-800/80 bg-[#0B131F]/90 backdrop-blur-md">
        <Logo size="md" lightText={true} tagline={true} />
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-3 py-1.5 rounded-full">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span className="font-semibold hidden sm:inline">Espace d'authentification SSL 256-bit</span>
            <span className="font-semibold sm:hidden">Sécurisé</span>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="relative z-10 flex-1 flex items-center justify-center p-4 py-8">
        <div className="w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-100 space-y-6">
          {/* Status Message if user just logged out */}
          {loggedOutMessage && (
            <div className="p-3.5 bg-blue-50 text-blue-900 border border-blue-200 rounded-xl text-xs flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
              <span>{loggedOutMessage}</span>
            </div>
          )}

          {/* Tab Switcher: Se connecter vs Créer mes identifiants */}
          <div className="flex p-1 bg-slate-100 rounded-xl">
            <button
              type="button"
              onClick={() => {
                setActiveTab('login');
                setErrorMessage('');
              }}
              className={`flex-1 py-2.5 text-xs font-bold rounded-lg transition-all ${
                activeTab === 'login'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Connexion à vos comptes
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab('register');
                setErrorMessage('');
                setRegClientCode(generateUniqueClientCode(availableUsers));
              }}
              className={`flex-1 py-2.5 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                activeTab === 'register'
                  ? 'bg-[#E60028] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Créer mes identifiants</span>
            </button>
          </div>

          {activeTab === 'login' ? (
            /* TAB 1: LOGIN FLOW */
            <div className="space-y-5">
              <div className="text-center space-y-1">
                <span className="text-[11px] font-bold tracking-widest text-[#E60028] uppercase">
                  Accès Client Particulier
                </span>
                <h1 className="text-xl sm:text-2xl font-black text-slate-900">
                  Identifiez-vous
                </h1>
                <p className="text-xs text-slate-500">
                  Chaque titulaire accède à son espace personnel avec ses propres identifiants.
                </p>
              </div>

              {errorMessage && (
                <div className="p-3 bg-red-50 text-red-700 border border-red-200 rounded-xl text-xs flex items-center gap-2 animate-shake">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Preloaded Accounts Quick Switcher - Identifiers only without names */}
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                <div className="flex items-center justify-between text-[11px] text-slate-500 font-bold uppercase tracking-wider">
                  <span>Comptes enregistrés sur cet appareil :</span>
                  <span className="text-slate-500 font-semibold">{availableUsers.length} profil(s)</span>
                </div>
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {availableUsers.map((u) => {
                    const isSelected = clientCode === u.clientCode;
                    return (
                      <button
                        key={u.clientCode}
                        type="button"
                        onClick={() => handleSelectPreloadedAccount(u)}
                        className={`px-3 py-1.5 rounded-xl text-left border shrink-0 transition-all font-mono text-xs ${
                          isSelected
                            ? 'bg-red-50 border-red-500 text-red-700 font-bold ring-1 ring-red-500'
                            : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                        }`}
                      >
                        Code client : <span className="font-bold">{u.clientCode}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <form onSubmit={handleLoginSubmit} className="space-y-4">
                {/* Code Client Field */}
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="text-xs font-bold text-slate-800">
                      Code client (8 chiffres)
                    </label>
                    <span className="text-[11px] text-slate-400">
                      {clientCode.length}/8 chiffres
                    </span>
                  </div>
                  <input
                    type="text"
                    maxLength={8}
                    value={clientCode}
                    onChange={(e) => setClientCode(e.target.value.replace(/\D/g, ''))}
                    placeholder="Ex : 83924912"
                    className="w-full p-3 text-sm font-mono tracking-widest font-bold rounded-xl border border-slate-200 bg-slate-50 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                  <div className="mt-1.5 flex items-center justify-between text-[11px] text-slate-500">
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={rememberCode}
                        onChange={(e) => setRememberCode(e.target.checked)}
                        className="rounded text-red-600 focus:ring-red-500 h-3.5 w-3.5 border-slate-300"
                      />
                      <span>Mémoriser mon code client</span>
                    </label>
                  </div>
                </div>

                {/* Code Secret Field with Virtual Keypad */}
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="text-xs font-bold text-slate-800">
                      Code secret (6 chiffres)
                    </label>
                    <button
                      type="button"
                      onClick={shuffleKeypad}
                      className="text-[11px] text-slate-500 hover:text-slate-900 inline-flex items-center gap-1"
                    >
                      <RefreshCw className="w-3 h-3" /> Mélanger la grille
                    </button>
                  </div>

                  {/* Secret dots display */}
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {[0, 1, 2, 3, 4, 5].map((index) => {
                        const isFilled = secretCode.length > index;
                        return (
                          <div
                            key={index}
                            className={`w-3.5 h-3.5 rounded-full transition-all ${
                              isFilled
                                ? 'bg-[#E60028] scale-110 shadow-xs'
                                : 'border-2 border-slate-300 bg-white'
                            }`}
                          />
                        );
                      })}
                    </div>
                    {secretCode.length > 0 && (
                      <button
                        type="button"
                        onClick={handleDeleteDigit}
                        className="text-xs font-bold text-slate-500 hover:text-red-600 px-2 py-0.5 rounded hover:bg-slate-200"
                      >
                        Effacer
                      </button>
                    )}
                  </div>

                  {/* Virtual keypad 10 buttons (2 rows of 5) */}
                  <div className="grid grid-cols-5 gap-2">
                    {keypadNumbers.map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => handleKeypadClick(num)}
                        disabled={secretCode.length >= 6}
                        className="h-11 rounded-xl bg-slate-100 hover:bg-slate-200 active:bg-slate-300 text-slate-900 font-bold text-base font-mono transition-colors shadow-2xs disabled:opacity-50"
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading || secretCode.length !== 6 || clientCode.length < 8}
                  className="w-full py-3 bg-[#E60028] hover:bg-red-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold text-xs rounded-xl shadow-md transition-colors flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <span>Authentification sécurisée...</span>
                  ) : (
                    <>
                      <span>Se connecter</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </div>
          ) : (
            /* TAB 2: REGISTER / NEW ACCESS */
            <div className="space-y-4">
              <div className="text-center space-y-1">
                <span className="text-[11px] font-bold tracking-widest text-[#E60028] uppercase">
                  Accès Client Particulier
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                  Créer mes identifiants
                </h2>
                <p className="text-xs text-slate-500">
                  Choisissez vos identifiants pour vous connecter avec votre propre compte.
                </p>
              </div>

              {isMaxUsersReached ? (
                /* Inscriptions fermées administrativement sans mentionner 5 personnes */
                <div className="space-y-4">
                  <div className="p-4 bg-amber-50 border-2 border-amber-300 rounded-2xl space-y-2 text-amber-950">
                    <div className="flex items-center gap-2 text-amber-900 font-extrabold text-sm">
                      <AlertOctagon className="w-5 h-5 text-amber-600 shrink-0" />
                      <span>Inscriptions temporairement suspendues</span>
                    </div>
                    <p className="text-xs text-amber-900 leading-relaxed">
                      L'ouverture de nouveaux accès est actuellement fermée pour des raisons administratives.
                    </p>
                  </div>

                  {/* List of current accounts with revocation option if management needed */}
                  <div className="space-y-2">
                    <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Profils actuellement configurés :
                    </h3>
                    <div className="divide-y divide-slate-100 border border-slate-200 rounded-2xl overflow-hidden bg-white">
                      {availableUsers.map((u) => (
                        <div
                          key={u.clientCode}
                          className="p-3 flex items-center justify-between hover:bg-slate-50 text-xs"
                        >
                          <div className="flex items-center gap-2.5">
                            <div className="w-7 h-7 rounded-full bg-slate-100 text-slate-700 font-bold flex items-center justify-center text-[11px]">
                              {u.profile.initials}
                            </div>
                            <div>
                              <div className="font-bold text-slate-900">{u.profile.fullName}</div>
                              <div className="text-[10px] text-slate-400 font-mono">
                                Code : {u.clientCode}
                              </div>
                            </div>
                          </div>

                          {onDeleteUser && availableUsers.length > 1 && (
                            <button
                              type="button"
                              onClick={() => {
                                if (
                                  confirm(
                                    `Confirmez-vous la suppression de l'accès pour ${u.profile.fullName} (${u.clientCode}) ?`
                                  )
                                ) {
                                  onDeleteUser(u.clientCode);
                                }
                              }}
                              className="px-2.5 py-1 text-[11px] font-semibold text-red-600 hover:bg-red-50 rounded-lg transition-colors flex items-center gap-1"
                              title="Supprimer ce profil"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              <span>Supprimer</span>
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : registerSuccess ? (
                <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-200 text-center space-y-3">
                  <div className="w-12 h-12 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto shadow-sm">
                    <Check className="w-6 h-6" />
                  </div>
                  <h3 className="font-extrabold text-base text-emerald-950">
                    Compte créé avec succès !
                  </h3>
                  <p className="text-xs text-emerald-800">
                    Connexion immédiate à votre nouvel Espace Client...
                  </p>
                </div>
              ) : (
                <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
                  {errorMessage && (
                    <div className="p-3 bg-red-50 text-red-700 border border-red-200 rounded-xl text-xs flex items-center gap-2 animate-shake">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <div>
                    <label className="text-xs font-bold text-slate-800 block mb-1">
                      Nom et Prénom
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ex : Claire Dufresne"
                      value={regFullName}
                      onChange={(e) => setRegFullName(e.target.value)}
                      className="w-full p-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-1 focus:ring-red-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-bold text-slate-800 block mb-1">
                        Adresse Email
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="claire.dufresne@example.com"
                        value={regEmail}
                        onChange={(e) => setRegEmail(e.target.value)}
                        className="w-full p-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-1 focus:ring-red-500"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-800 block mb-1">
                        Téléphone
                      </label>
                      <input
                        type="tel"
                        placeholder="+33 6 ..."
                        value={regPhone}
                        onChange={(e) => setRegPhone(e.target.value)}
                        className="w-full p-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-1 focus:ring-red-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-200">
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <label className="text-[11px] font-bold text-slate-800">
                          Code Client (8 chiffres)
                        </label>
                        <button
                          type="button"
                          onClick={() => setRegClientCode(generateUniqueClientCode(availableUsers))}
                          className="text-[10px] text-red-600 hover:underline"
                        >
                          Générer
                        </button>
                      </div>
                      <input
                        type="text"
                        maxLength={8}
                        required
                        value={regClientCode}
                        onChange={(e) => setRegClientCode(e.target.value.replace(/\D/g, ''))}
                        className="w-full p-2 text-xs font-mono font-bold tracking-wider rounded-lg border border-slate-300 bg-white"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-slate-800 block mb-1">
                        Code Secret (6 chiffres)
                      </label>
                      <input
                        type="password"
                        maxLength={6}
                        required
                        placeholder="Ex : 654321"
                        value={regPasscode}
                        onChange={(e) => setRegPasscode(e.target.value.replace(/\D/g, ''))}
                        className="w-full p-2 text-xs font-mono font-bold tracking-widest rounded-lg border border-slate-300 bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-800 block mb-1">
                      Dépôt initial (€)
                    </label>
                    <input
                      type="number"
                      min="50"
                      max="100000"
                      step="50"
                      value={regDeposit}
                      onChange={(e) => setRegDeposit(e.target.value)}
                      className="w-full p-2.5 text-xs font-semibold tabular-nums rounded-xl border border-slate-300 focus:outline-none focus:ring-1 focus:ring-red-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-[#E60028] hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow-md transition-colors"
                  >
                    Valider l'ouverture et se connecter
                  </button>
                </form>
              )}
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-4 px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500 border-t border-slate-800/80 bg-[#0B131F]/90">
        <p>
          © 2026 Société Générale · Espace d'authentification client sécurisé.
        </p>
        <div className="flex items-center gap-3 text-slate-500">
          <span>Sécurité</span>
          <span>·</span>
          <span>Confidentialité</span>
          <span>·</span>
          <ProjectCodeDownloadButton variant="dark" />
        </div>
      </footer>
    </div>
  );
};

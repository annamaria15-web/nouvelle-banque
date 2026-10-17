import React, { useState, useEffect } from 'react';
import {
  loadStoredUsers,
  saveStoredUsers,
  createNewUserAccount,
} from './mockData';
import {
  BankAccount,
  BankCard,
  Beneficiary,
  BankNotification,
  Transaction,
  UserProfile,
  UserAccountData,
} from './types';
import { Sidebar, NavTab } from './components/Sidebar';
import { Header } from './components/Header';
import { DashboardView } from './components/DashboardView';
import { TransfersView } from './components/TransfersView';
import { CardsView } from './components/CardsView';
import { ProfileView } from './components/ProfileView';
import { AccountsView } from './components/AccountsView';
import { SecondaryView } from './components/SavingsAndCreditsView';
import { MultiScreenShowcase } from './components/MultiScreenShowcase';
import { RibModal } from './components/RibModal';
import { TransactionDetailModal } from './components/TransactionDetailModal';
import { NotificationModal } from './components/NotificationModal';
import { LoginView } from './components/LoginView';
import { LogoutModal } from './components/LogoutModal';
import { ProjectCodeDownloadButton } from './components/ProjectCodeDownloadButton';

export default function App() {
  const [users, setUsers] = useState<UserAccountData[]>(() => loadStoredUsers());
  const [activeClientCode, setActiveClientCode] = useState<string>(() => {
    const list = loadStoredUsers();
    return list[0]?.clientCode || '83924912';
  });
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [loggedOutMessage, setLoggedOutMessage] = useState<string | null>(null);
  const [showLogoutModal, setShowLogoutModal] = useState<boolean>(false);

  const [activeTab, setActiveTab] = useState<NavTab>('accueil');
  const [viewMode, setViewMode] = useState<'app' | 'multiscreen'>('app');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Modals
  const [showRibModal, setShowRibModal] = useState(false);
  const [showNotificationsModal, setShowNotificationsModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Active user data
  const currentUser = users.find((u) => u.clientCode === activeClientCode) || users[0];
  const user = currentUser.profile;
  const accounts = currentUser.accounts;
  const transactions = currentUser.transactions;
  const beneficiaries = currentUser.beneficiaries;
  const card = currentUser.card;
  const notifications = currentUser.notifications;
  const mainAccount = accounts[0] || {
    id: 'acc_def',
    label: 'Compte courant',
    type: 'courant' as const,
    iban: 'FR76 3000 0000 0000 0000 0000 000',
    bic: 'SOGEFR2AXXX',
    balance: 0,
    lastUpdated: 'Aujourd’hui',
    holder: user.fullName,
  };

  // Helper to persist updates to the current user
  const updateCurrentUser = (updater: (prevUser: UserAccountData) => UserAccountData) => {
    setUsers((prevUsers) => {
      const updatedList = prevUsers.map((u) => {
        if (u.clientCode === activeClientCode) {
          return updater(u);
        }
        return u;
      });
      saveStoredUsers(updatedList);
      return updatedList;
    });
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setShowLogoutModal(false);
    setLoggedOutMessage(
      'Vous avez été déconnecté avec succès de votre session sécurisée Société Générale.'
    );
  };

  const handleLoginAttempt = (code: string, pass: string): boolean => {
    const found = users.find((u) => u.clientCode === code && u.passcode === pass);
    if (found) {
      setActiveClientCode(found.clientCode);
      setIsAuthenticated(true);
      setLoggedOutMessage(null);
      return true;
    }
    return false;
  };

  const handleRegisterUser = (data: {
    fullName: string;
    email: string;
    phone: string;
    clientCode: string;
    passcode: string;
    initialDeposit: number;
  }): { success: boolean; error?: string } => {
    // HARD ENFORCEMENT: Max 5 authorized people on the platform internally
    if (users.length >= 5) {
      return {
        success: false,
        error: "L'ouverture de nouveaux comptes est actuellement fermée pour des raisons administratives.",
      };
    }

    // Check unique client code
    if (users.some((u) => u.clientCode === data.clientCode)) {
      return {
        success: false,
        error: "Ce code client est déjà attribué. Chaque personne doit posséder un identifiant strictement unique.",
      };
    }

    // Check unique email
    if (users.some((u) => u.profile.email.toLowerCase() === data.email.toLowerCase())) {
      return {
        success: false,
        error: "Cette adresse email est déjà liée à un accès existant.",
      };
    }

    const newUser = createNewUserAccount({
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      clientCode: data.clientCode,
      passcode: data.passcode,
      initialDeposit: data.initialDeposit,
    });

    setUsers((prev) => {
      const updated = [...prev, newUser];
      saveStoredUsers(updated);
      return updated;
    });

    setActiveClientCode(newUser.clientCode);
    setIsAuthenticated(true);
    setLoggedOutMessage(null);
    return { success: true };
  };

  const handleDeleteUser = (codeToDelete: string) => {
    if (users.length <= 1) {
      alert("Impossible de supprimer le dernier utilisateur restant.");
      return;
    }
    setUsers((prev) => {
      const filtered = prev.filter((u) => u.clientCode !== codeToDelete);
      saveStoredUsers(filtered);
      return filtered;
    });
    if (activeClientCode === codeToDelete) {
      const remaining = users.find((u) => u.clientCode !== codeToDelete);
      if (remaining) {
        setActiveClientCode(remaining.clientCode);
      }
    }
  };

  // Transfer Handler
  const handleExecuteTransfer = ({
    sourceAccountId,
    beneficiaryName,
    beneficiaryIban,
    amount,
    motif,
    isInstant,
  }: {
    sourceAccountId: string;
    beneficiaryName: string;
    beneficiaryIban: string;
    amount: number;
    motif: string;
    isInstant: boolean;
  }) => {
    // STRICT GUARD: If account is blocked, reject any debit transaction
    const targetSource = currentUser.accounts.find((a) => a.id === sourceAccountId);
    if (targetSource?.isBlocked) {
      alert(
        'Transaction strictement interdite : Ce compte fait l’objet d’un blocage officiel de sécurité (Fonds temporairement gelés). Aucun virement, débit ou transfert n’est autorisé.'
      );
      return;
    }

    updateCurrentUser((u) => {
      // 1. Deduct from account
      const updatedAccounts = u.accounts.map((acc) => {
        if (acc.id === sourceAccountId) {
          return {
            ...acc,
            balance: Math.round((acc.balance - amount) * 100) / 100,
          };
        }
        if (acc.iban === beneficiaryIban) {
          return {
            ...acc,
            balance: Math.round((acc.balance + amount) * 100) / 100,
          };
        }
        return acc;
      });

      // 2. Add transaction to history
      const now = new Date();
      const dateFormatted = `${now.getDate()} ${now.toLocaleString('fr-FR', {
        month: 'short',
      })} ${now.getFullYear()}`;

      const newTx: Transaction = {
        id: `tx_${Date.now()}`,
        date: dateFormatted,
        title: `Virement vers ${beneficiaryName}`,
        subtitle: motif,
        amount: -amount,
        category: 'virement',
        reference: `VIR-SEPA-${Math.floor(10000 + Math.random() * 90000)}`,
        status: 'valide',
      };

      // 3. Add notification
      const newNotif: BankNotification = {
        id: `notif_${Date.now()}`,
        title: 'Virement émis',
        message: `Votre virement de ${amount.toFixed(2)} € vers ${beneficiaryName} a été exécuté.`,
        time: "À l'instant",
        unread: true,
        type: 'info',
      };

      return {
        ...u,
        accounts: updatedAccounts,
        transactions: [newTx, ...u.transactions],
        notifications: [newNotif, ...u.notifications],
      };
    });
  };

  // Add Beneficiary Handler
  const handleAddBeneficiary = (newBen: Omit<Beneficiary, 'id'>) => {
    const created: Beneficiary = {
      ...newBen,
      id: `ben_${Date.now()}`,
    };
    updateCurrentUser((u) => ({
      ...u,
      beneficiaries: [created, ...u.beneficiaries],
    }));
  };

  // Card Limit Update
  const handleUpdateCardLimits = (paymentLimit: number, withdrawalLimit: number) => {
    updateCurrentUser((u) => ({
      ...u,
      card: {
        ...u.card,
        paymentLimit,
        withdrawalLimit,
      },
    }));
  };

  // Card Toggle Feature
  const handleToggleCardFeature = (feature: 'contactless' | 'online' | 'abroad' | 'lock') => {
    updateCurrentUser((u) => {
      const current = u.card;
      let updatedCard = { ...current };
      switch (feature) {
        case 'contactless':
          updatedCard.contactlessEnabled = !current.contactlessEnabled;
          break;
        case 'online':
          updatedCard.onlinePaymentsEnabled = !current.onlinePaymentsEnabled;
          break;
        case 'abroad':
          updatedCard.abroadPaymentsEnabled = !current.abroadPaymentsEnabled;
          break;
        case 'lock':
          updatedCard.isLocked = !current.isLocked;
          break;
      }
      return { ...u, card: updatedCard };
    });
  };

  // Profile Update
  const handleUpdateProfile = (updated: Partial<UserProfile>) => {
    updateCurrentUser((u) => ({
      ...u,
      profile: {
        ...u.profile,
        ...updated,
      },
    }));
  };

  // If not authenticated, render LoginView with personal credentials system
  if (!isAuthenticated) {
    return (
      <LoginView
        availableUsers={users}
        onLoginAttempt={handleLoginAttempt}
        onRegisterUser={handleRegisterUser}
        onDeleteUser={handleDeleteUser}
        loggedOutMessage={loggedOutMessage}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#F4F6F9] text-slate-800 flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Top Header with Logout and Profile */}
      <Header
        user={user}
        notifications={notifications}
        onOpenNotifications={() => setShowNotificationsModal(true)}
        onOpenProfile={() => setActiveTab('contact')}
        onLogout={() => setShowLogoutModal(true)}
        viewMode={viewMode}
        onToggleViewMode={(mode) => setViewMode(mode)}
        searchQuery={searchQuery}
        onSearchChange={(q) => setSearchQuery(q)}
        onToggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      />

      <div className="flex-1 flex w-full">
        {/* Sidebar Navigation with Logout */}
        <Sidebar
          activeTab={activeTab}
          onSelectTab={(tab) => {
            setActiveTab(tab);
            setViewMode('app');
          }}
          onLogout={() => setShowLogoutModal(true)}
          isMobileOpen={isMobileMenuOpen}
          onCloseMobile={() => setIsMobileMenuOpen(false)}
        />

        {/* Main Content Viewport */}
        <main className="flex-1 min-w-0 p-4 md:p-8 overflow-y-auto">
          {viewMode === 'multiscreen' ? (
            /* Multi-Screen Showcase Layout */
            <MultiScreenShowcase
              user={user}
              mainAccount={mainAccount}
              card={card}
              transactions={transactions}
              beneficiaries={beneficiaries}
              onNavigateToTab={(tab) => {
                setActiveTab(tab);
                setViewMode('app');
              }}
              onOpenTransfer={() => {
                setActiveTab('virements');
                setViewMode('app');
              }}
              onOpenRib={() => setShowRibModal(true)}
              onOpenCards={() => {
                setActiveTab('cartes');
                setViewMode('app');
              }}
              onSelectTransaction={(tx) => setSelectedTransaction(tx)}
            />
          ) : (
            /* Full Single Interactive App Views */
            <>
              {activeTab === 'accueil' && (
                <DashboardView
                  user={user}
                  mainAccount={mainAccount}
                  transactions={transactions}
                  onOpenTransfer={() => setActiveTab('virements')}
                  onOpenRib={() => setShowRibModal(true)}
                  onOpenCards={() => setActiveTab('cartes')}
                  onSelectTransaction={(tx) => setSelectedTransaction(tx)}
                  onViewAllTransactions={() => setActiveTab('comptes')}
                />
              )}

              {activeTab === 'comptes' && (
                <AccountsView
                  accounts={accounts}
                  transactions={transactions}
                  user={user}
                  onOpenTransfer={() => setActiveTab('virements')}
                  onOpenRib={() => setShowRibModal(true)}
                  onSelectTransaction={(tx) => setSelectedTransaction(tx)}
                />
              )}

              {activeTab === 'virements' && (
                <TransfersView
                  accounts={accounts}
                  beneficiaries={beneficiaries}
                  onAddBeneficiary={handleAddBeneficiary}
                  onExecuteTransfer={handleExecuteTransfer}
                />
              )}

              {activeTab === 'cartes' && (
                <CardsView
                  card={card}
                  user={user}
                  onUpdateLimits={handleUpdateCardLimits}
                  onToggleFeature={handleToggleCardFeature}
                />
              )}

              {(activeTab === 'epargne' ||
                activeTab === 'credits' ||
                activeTab === 'assurances' ||
                activeTab === 'contact') && (
                <SecondaryView
                  type={activeTab}
                  accounts={accounts}
                  user={user}
                  onOpenTransfer={() => setActiveTab('virements')}
                />
              )}
            </>
          )}
        </main>
      </div>

      {/* Footer with transparent Code link */}
      <footer className="w-full bg-white border-t border-slate-200 py-3.5 px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 z-10">
        <div className="flex items-center gap-3">
          <span className="font-semibold text-slate-800">Société Générale · Espace Client</span>
          <span className="hidden sm:inline text-slate-300">|</span>
          <span className="hidden sm:inline text-[11px] text-slate-400">Authentification SSL 256-bit</span>
        </div>
        <div className="flex items-center gap-3 text-[11px] text-slate-400">
          <span>Sécurité</span>
          <span>·</span>
          <span>Confidentialité</span>
          <span>·</span>
          <ProjectCodeDownloadButton variant="light" />
        </div>
      </footer>

      {/* Global Modals */}
      {showLogoutModal && (
        <LogoutModal
          onConfirm={handleLogout}
          onCancel={() => setShowLogoutModal(false)}
        />
      )}

      {showRibModal && (
        <RibModal
          account={mainAccount}
          user={user}
          onClose={() => setShowRibModal(false)}
        />
      )}

      {selectedTransaction && (
        <TransactionDetailModal
          transaction={selectedTransaction}
          onClose={() => setSelectedTransaction(null)}
        />
      )}

      {showNotificationsModal && (
        <NotificationModal
          notifications={notifications}
          onClose={() => setShowNotificationsModal(false)}
          onMarkAllAsRead={() =>
            updateCurrentUser((u) => ({
              ...u,
              notifications: u.notifications.map((n) => ({ ...n, unread: false })),
            }))
          }
        />
      )}
    </div>
  );
}

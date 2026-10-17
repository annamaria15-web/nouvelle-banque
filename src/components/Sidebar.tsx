import React from 'react';
import {
  Home,
  Wallet,
  ArrowLeftRight,
  CreditCard,
  PiggyBank,
  Percent,
  ShieldCheck,
  HelpCircle,
  X,
  LogOut,
} from 'lucide-react';
import { Logo } from './Logo';

export type NavTab =
  | 'accueil'
  | 'comptes'
  | 'virements'
  | 'cartes'
  | 'epargne'
  | 'credits'
  | 'assurances'
  | 'contact';

interface SidebarProps {
  activeTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  onLogout?: () => void;
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onSelectTab,
  onLogout,
  isMobileOpen = false,
  onCloseMobile,
}) => {
  const navItems: { id: NavTab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'accueil', label: 'Accueil', icon: Home },
    { id: 'comptes', label: 'Comptes', icon: Wallet },
    { id: 'virements', label: 'Virements', icon: ArrowLeftRight },
    { id: 'cartes', label: 'Cartes', icon: CreditCard },
    { id: 'epargne', label: 'Épargne', icon: PiggyBank },
    { id: 'credits', label: 'Crédits', icon: Percent },
    { id: 'assurances', label: 'Assurances', icon: ShieldCheck },
    { id: 'contact', label: 'Aide & Contact', icon: HelpCircle },
  ];

  const content = (
    <div className="h-full flex flex-col justify-between py-6 px-4 bg-[#0B131F] text-slate-300 w-64 border-r border-slate-800/80">
      <div>
        {/* Top Logo & Close Button (mobile) */}
        <div className="flex items-center justify-between px-2 mb-8">
          <Logo size="md" lightText={true} />
          {onCloseMobile && (
            <button
              onClick={onCloseMobile}
              className="lg:hidden p-1 text-slate-400 hover:text-white rounded-md"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Navigation List */}
        <nav className="space-y-1.5" aria-label="Navigation principale">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onSelectTab(item.id);
                  if (onCloseMobile) onCloseMobile();
                }}
                className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-lg text-sm font-medium transition-all text-left ${
                  isActive
                    ? 'bg-[#E60028] text-white shadow-md'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Déconnexion button in navigation */}
        {onLogout && (
          <div className="pt-4 mt-4 border-t border-slate-800/60">
            <button
              onClick={() => {
                if (onCloseMobile) onCloseMobile();
                onLogout();
              }}
              className="w-full flex items-center gap-3.5 px-4 py-2.5 rounded-lg text-xs font-semibold text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors text-left"
            >
              <LogOut className="w-4 h-4 text-slate-400 group-hover:text-red-400" />
              <span>Se déconnecter</span>
            </button>
          </div>
        )}
      </div>

      {/* Sidebar Footer with Tagline */}
      <div className="pt-6 border-t border-slate-800/60 px-2">
        <Logo size="sm" lightText={true} tagline={true} />
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Fixed Sidebar */}
      <aside className="hidden lg:block shrink-0 sticky top-0 h-screen z-30">
        {content}
      </aside>

      {/* Mobile Drawer */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={onCloseMobile}
          />
          <div className="relative flex-1 flex flex-col max-w-xs w-full shadow-2xl">
            {content}
          </div>
        </div>
      )}
    </>
  );
};

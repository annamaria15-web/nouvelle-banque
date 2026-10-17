import React, { useState, useRef, useEffect } from 'react';
import { Search, Bell, User, LayoutGrid, Monitor, LogOut, ChevronDown, Shield } from 'lucide-react';
import { BankNotification, UserProfile } from '../types';

interface HeaderProps {
  user: UserProfile;
  notifications: BankNotification[];
  onOpenNotifications: () => void;
  onOpenProfile: () => void;
  onLogout: () => void;
  viewMode: 'app' | 'multiscreen';
  onToggleViewMode: (mode: 'app' | 'multiscreen') => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onToggleMobileMenu?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  user,
  notifications,
  onOpenNotifications,
  onOpenProfile,
  onLogout,
  viewMode,
  onToggleViewMode,
  searchQuery,
  onSearchChange,
  onToggleMobileMenu,
}) => {
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const unreadCount = notifications.filter((n) => n.unread).length;

  // Close user dropdown if clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="h-16 bg-[#0B131F] border-b border-slate-800/80 px-4 md:px-8 flex items-center justify-between gap-4 sticky top-0 z-40 text-white">
      {/* Mobile drawer trigger */}
      <button
        onClick={onToggleMobileMenu}
        className="lg:hidden p-2 text-slate-300 hover:text-white rounded-lg hover:bg-slate-800 focus:outline-none"
        aria-label="Ouvrir le menu"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Search Input Bar */}
      <div className="flex-1 max-w-xl relative">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              onSearchChange(e.target.value);
              setShowSearchDropdown(e.target.value.length > 0);
            }}
            onFocus={() => {
              if (searchQuery.length > 0) setShowSearchDropdown(true);
            }}
            placeholder="Rechercher une opération, un bénéficiaire, un compte..."
            className="w-full bg-[#1A2637] border border-slate-700/60 rounded-lg pl-10 pr-4 py-2 text-xs md:text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => {
                onSearchChange('');
                setShowSearchDropdown(false);
              }}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-xs text-slate-400 hover:text-white"
            >
              Effacer
            </button>
          )}
        </div>
      </div>

      {/* Right Controls: Mode Switcher, Notifications, User & Logout */}
      <div className="flex items-center gap-2 md:gap-3 shrink-0">
        {/* Toggle View Mode: Single Interactive vs Multi-Screen Showcase */}
        <div className="bg-[#1A2637] p-1 rounded-lg border border-slate-700/60 hidden sm:flex items-center gap-1">
          <button
            onClick={() => onToggleViewMode('app')}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors ${
              viewMode === 'app'
                ? 'bg-[#E60028] text-white shadow-sm'
                : 'text-slate-300 hover:text-white'
            }`}
            title="Naviguer dans l'application"
          >
            <Monitor className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Espace interactif</span>
          </button>
          <button
            onClick={() => onToggleViewMode('multiscreen')}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors ${
              viewMode === 'multiscreen'
                ? 'bg-[#E60028] text-white shadow-sm'
                : 'text-slate-300 hover:text-white'
            }`}
            title="Voir la composition de tous les écrans (comme sur l'image)"
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Écrans côte à côte</span>
          </button>
        </div>

        {/* Notification Bell */}
        <button
          onClick={onOpenNotifications}
          className="relative p-2 text-slate-300 hover:text-white rounded-full hover:bg-slate-800 transition-colors"
          aria-label="Notifications"
        >
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 w-4 h-4 bg-[#E60028] text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-[#0B131F]">
              {unreadCount}
            </span>
          )}
        </button>

        {/* User Profile & Account Dropdown */}
        <div className="relative" ref={userMenuRef}>
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-full hover:bg-slate-800/80 transition-colors focus:outline-none"
            aria-label="Menu utilisateur"
          >
            <div className="w-8 h-8 rounded-full bg-slate-700 border border-slate-600 flex items-center justify-center text-xs font-semibold text-white">
              {user.initials}
            </div>
            <span className="hidden lg:inline text-xs font-medium text-slate-200 truncate max-w-[110px]">
              {user.fullName}
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
          </button>

          {/* User Dropdown Menu */}
          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-60 bg-white rounded-2xl shadow-2xl border border-slate-200 py-2 text-slate-800 z-50 animate-scaleIn">
              <div className="px-4 py-2.5 border-b border-slate-100">
                <div className="font-bold text-xs text-slate-900">{user.fullName}</div>
                <div className="text-[11px] text-slate-400 truncate">{user.email}</div>
                <div className="text-[10px] text-slate-500 font-mono mt-0.5">
                  N° Client : {user.clientNumber}
                </div>
              </div>

              <div className="py-1">
                <button
                  onClick={() => {
                    setShowUserMenu(false);
                    onOpenProfile();
                  }}
                  className="w-full px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2.5 text-left"
                >
                  <User className="w-4 h-4 text-slate-400" />
                  <span>Mon profil & Coordonnées</span>
                </button>
              </div>

              <div className="border-t border-slate-100 pt-1">
                <button
                  onClick={() => {
                    setShowUserMenu(false);
                    onLogout();
                  }}
                  className="w-full px-4 py-2 text-xs text-red-600 hover:bg-red-50 flex items-center gap-2.5 text-left font-semibold"
                >
                  <LogOut className="w-4 h-4 text-red-600" />
                  <span>Se déconnecter</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Direct Logout Icon Button for convenience */}
        <button
          onClick={onLogout}
          className="p-2 text-slate-400 hover:text-red-400 rounded-lg hover:bg-slate-800 transition-colors"
          title="Se déconnecter"
          aria-label="Se déconnecter"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};

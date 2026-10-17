import React from 'react';
import { X, Bell, Check, Info, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { BankNotification } from '../types';

interface NotificationModalProps {
  notifications: BankNotification[];
  onClose: () => void;
  onMarkAllAsRead: () => void;
}

export const NotificationModal: React.FC<NotificationModalProps> = ({
  notifications,
  onClose,
  onMarkAllAsRead,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 animate-scaleIn space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-[#E60028]" />
            <h3 className="font-bold text-base text-slate-900">Notifications</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-800 rounded-md"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex justify-end">
          <button
            onClick={onMarkAllAsRead}
            className="text-xs font-semibold text-red-600 hover:text-red-700"
          >
            Tout marquer comme lu
          </button>
        </div>

        <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
          {notifications.map((n) => (
            <div
              key={n.id}
              className={`p-3.5 rounded-xl border text-xs transition-colors ${
                n.unread
                  ? 'bg-red-50/30 border-red-200/70'
                  : 'bg-slate-50 border-slate-200/60'
              }`}
            >
              <div className="flex items-start justify-between gap-2 mb-1">
                <span className="font-bold text-slate-900">{n.title}</span>
                <span className="text-[10px] text-slate-400 whitespace-nowrap">
                  {n.time}
                </span>
              </div>
              <p className="text-slate-600 leading-relaxed">{n.message}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

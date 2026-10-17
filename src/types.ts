export interface Transaction {
  id: string;
  date: string;
  title: string;
  subtitle?: string;
  amount: number; // positive = credit (+), negative = debit (-)
  category: 'salaire' | 'alimentation' | 'retrait' | 'virement' | 'achats' | 'abonnement' | 'sante' | 'autre';
  reference: string;
  status: 'valide' | 'en_cours';
  iban?: string;
}

export interface BankAccount {
  id: string;
  label: string;
  type: 'courant' | 'epargne' | 'pel';
  iban: string;
  bic: string;
  balance: number;
  lastUpdated: string;
  holder: string;
  isBlocked?: boolean;
  blockedReason?: string; // e.g. "Fonds temporairement gelés"
  blockedStatusText?: string; // e.g. "BLOQUÉ"
  currencySymbol?: string; // e.g. "$" or "€"
}

export interface Beneficiary {
  id: string;
  name: string;
  iban: string;
  bankName: string;
  category: 'personnel' | 'famille' | 'facture' | 'pro';
  avatarInitials: string;
}

export interface BankCard {
  id: string;
  numberMasked: string;
  cardHolder: string;
  expiration: string;
  type: string; // e.g. "Débit immédiat"
  network: string; // Visa Premier
  paymentLimit: number;
  paymentUsed: number;
  withdrawalLimit: number;
  withdrawalUsed: number;
  contactlessEnabled: boolean;
  onlinePaymentsEnabled: boolean;
  abroadPaymentsEnabled: boolean;
  isLocked: boolean;
}

export interface UserProfile {
  id: string;
  fullName: string;
  initials: string;
  email: string;
  phone: string;
  address: string;
  agency: string;
  advisorName: string;
  advisorEmail: string;
  clientNumber: string;
}

export interface UserAccountData {
  clientCode: string; // 8 digits (e.g. "83924912")
  passcode: string; // 6 digits (e.g. "123456")
  profile: UserProfile;
  accounts: BankAccount[];
  transactions: Transaction[];
  beneficiaries: Beneficiary[];
  card: BankCard;
  notifications: BankNotification[];
}

export interface BankNotification {
  id: string;
  title: string;
  message: string;
  time: string;
  unread: boolean;
  type: 'info' | 'success' | 'warning';
}

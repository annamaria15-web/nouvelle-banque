import { BankAccount, BankCard, Beneficiary, BankNotification, Transaction, UserProfile, UserAccountData } from './types';

// Default User 1: Bernard Thomas
export const userBernard: UserAccountData = {
  clientCode: '83924912',
  passcode: '123456',
  profile: {
    id: 'usr_bernard',
    fullName: 'Bernard Thomas',
    initials: 'BT',
    email: 'bernard.thomas@gmail.com',
    phone: '+33 6 42 89 12 70',
    address: '14 Rue de Rivoli, 75001 Paris',
    agency: 'Agence Paris Haussmann',
    advisorName: 'Hélène Martin-Dubois',
    advisorEmail: 'helene.martin-dubois@socgen.com',
    clientNumber: '8392 4912 04',
  },
  accounts: [
    {
      id: 'acc_bernard_courant',
      label: 'Compte chèques',
      type: 'courant',
      iban: 'FR76 3000 3048 0000 1234 5678 901',
      bic: 'SOGEFR2AXXX',
      balance: 53047.38,
      currencySymbol: '€',
      isBlocked: true,
      blockedStatusText: 'BLOQUÉ TEMPORAIREMENT',
      blockedReason: 'Fonds temporairement gelés',
      lastUpdated: '10 oct. 2025',
      holder: 'Bernard Thomas',
    },
    {
      id: 'acc_bernard_livret_a',
      label: 'Livret A',
      type: 'epargne',
      iban: 'FR76 3000 3048 0000 8899 1122 334',
      bic: 'SOGEFR2AXXX',
      balance: 14250.00,
      lastUpdated: '10 oct. 2025',
      holder: 'Bernard Thomas',
    },
    {
      id: 'acc_bernard_pel',
      label: 'Plan Épargne Logement (PEL)',
      type: 'pel',
      iban: 'FR76 3000 3048 0000 5544 3322 110',
      bic: 'SOGEFR2AXXX',
      balance: 8520.40,
      lastUpdated: '01 oct. 2025',
      holder: 'Bernard Thomas',
    },
  ],
  transactions: [
    {
      id: 'tx_b_01',
      date: '10 oct. 2025',
      title: 'Virement reçu - Salaire',
      subtitle: 'Vir. SEPA Entreprise SAS',
      amount: 1850.00,
      category: 'salaire',
      reference: 'VIR-SAL-2025-10',
      status: 'valide',
    },
    {
      id: 'tx_b_02',
      date: '08 oct. 2025',
      title: 'Paiement CB - Carrefour',
      subtitle: 'Carrefour Market Paris 11',
      amount: -62.45,
      category: 'alimentation',
      reference: 'CB-4821-CARREFOUR',
      status: 'valide',
    },
    {
      id: 'tx_b_03',
      date: '06 oct. 2025',
      title: 'Retrait DAB - Paris',
      subtitle: 'Distributeur SG Paris République',
      amount: -100.00,
      category: 'retrait',
      reference: 'DAB-SG-75011',
      status: 'valide',
    },
    {
      id: 'tx_b_04',
      date: '04 oct. 2025',
      title: 'Virement vers compte externe',
      subtitle: 'Vers Alexandre Martin',
      amount: -300.00,
      category: 'virement',
      reference: 'VIR-EXT-49021',
      status: 'valide',
    },
    {
      id: 'tx_b_05',
      date: '02 oct. 2025',
      title: 'Paiement CB - Amazon',
      subtitle: 'Amazon EU SARL',
      amount: -89.90,
      category: 'achats',
      reference: 'CB-4821-AMZN-EU',
      status: 'valide',
    },
  ],
  beneficiaries: [
    {
      id: 'ben_b_01',
      name: 'Alexandre Martin',
      iban: 'FR76 3000 4012 3344 5566 7788 990',
      bankName: 'BNP Paribas',
      category: 'personnel',
      avatarInitials: 'AM',
    },
    {
      id: 'ben_b_02',
      name: 'Sophie Lefebvre',
      iban: 'FR76 3000 2098 7766 5544 3322 110',
      bankName: 'Crédit Agricole',
      category: 'famille',
      avatarInitials: 'SL',
    },
  ],
  card: {
    id: 'card_b_01',
    numberMasked: '•••• 4821',
    cardHolder: 'BERNARD THOMAS',
    expiration: '09/28',
    type: 'Débit immédiat',
    network: 'Visa Premier',
    paymentLimit: 3000,
    paymentUsed: 1245.85,
    withdrawalLimit: 500,
    withdrawalUsed: 100.00,
    contactlessEnabled: true,
    onlinePaymentsEnabled: true,
    abroadPaymentsEnabled: true,
    isLocked: false,
  },
  notifications: [
    {
      id: 'notif_c_01',
      title: 'Virement de salaire reçu',
      message: 'Le virement de 1 850,00 € a été crédité sur votre compte courant.',
      time: '10 oct. à 08:30',
      unread: true,
      type: 'success',
    },
    {
      id: 'notif_c_02',
      title: 'Plafond de paiement',
      message: 'Vous avez utilisé 41% de votre plafond de paiement mensuel (1 245,85 € / 3 000,00 €).',
      time: '08 oct. à 14:15',
      unread: true,
      type: 'info',
    },
  ],
};

// Default User 2: Sophie Laurent
export const userSophie: UserAccountData = {
  clientCode: '54128903',
  passcode: '654321',
  profile: {
    id: 'usr_sophie',
    fullName: 'Sophie Laurent',
    initials: 'SL',
    email: 'sophie.laurent@gmail.com',
    phone: '+33 6 78 12 34 56',
    address: '8 Boulevard Saint-Germain, 75005 Paris',
    agency: 'Agence Paris Odéon',
    advisorName: 'Julien Mercier',
    advisorEmail: 'julien.mercier@socgen.com',
    clientNumber: '5412 8903 11',
  },
  accounts: [
    {
      id: 'acc_sophie_courant',
      label: 'Compte courant',
      type: 'courant',
      iban: 'FR76 3000 3048 0000 9876 5432 109',
      bic: 'SOGEFR2AXXX',
      balance: 3812.50,
      lastUpdated: '10 oct. 2025',
      holder: 'Sophie Laurent',
    },
    {
      id: 'acc_sophie_livret_a',
      label: 'Livret A',
      type: 'epargne',
      iban: 'FR76 3000 3048 0000 1122 3344 556',
      bic: 'SOGEFR2AXXX',
      balance: 9400.00,
      lastUpdated: '05 oct. 2025',
      holder: 'Sophie Laurent',
    },
  ],
  transactions: [
    {
      id: 'tx_s_01',
      date: '09 oct. 2025',
      title: 'Virement reçu - Honoraires',
      subtitle: 'Cabinet Architecture Paris',
      amount: 2450.00,
      category: 'salaire',
      reference: 'VIR-HON-9901',
      status: 'valide',
    },
    {
      id: 'tx_s_02',
      date: '07 oct. 2025',
      title: 'Paiement CB - FNAC Paris',
      subtitle: 'Matériel informatique',
      amount: -189.00,
      category: 'achats',
      reference: 'CB-7109-FNAC',
      status: 'valide',
    },
    {
      id: 'tx_s_03',
      date: '03 oct. 2025',
      title: 'Prélèvement Box Internet',
      subtitle: 'Orange France',
      amount: -39.99,
      category: 'abonnement',
      reference: 'PRLV-ORANGE-982',
      status: 'valide',
    },
  ],
  beneficiaries: [
    {
      id: 'ben_s_01',
      name: 'Bernard Thomas',
      iban: 'FR76 3000 3048 0000 1234 5678 901',
      bankName: 'Société Générale',
      category: 'personnel',
      avatarInitials: 'BT',
    },
  ],
  card: {
    id: 'card_s_01',
    numberMasked: '•••• 7109',
    cardHolder: 'SOPHIE LAURENT',
    expiration: '11/28',
    type: 'Débit différé',
    network: 'Visa Premier',
    paymentLimit: 4000,
    paymentUsed: 980.50,
    withdrawalLimit: 600,
    withdrawalUsed: 80.00,
    contactlessEnabled: true,
    onlinePaymentsEnabled: true,
    abroadPaymentsEnabled: true,
    isLocked: false,
  },
  notifications: [
    {
      id: 'notif_s_01',
      title: 'Facture électronique disponible',
      message: 'Votre relevé de compte est accessible en ligne.',
      time: '01 oct.',
      unread: true,
      type: 'info',
    },
  ],
};

// Default User 3: Alexandre Dubois
export const userAlexandre: UserAccountData = {
  clientCode: '77210945',
  passcode: '000000',
  profile: {
    id: 'usr_alexandre',
    fullName: 'Alexandre Dubois',
    initials: 'AD',
    email: 'alexandre.dubois@gmail.com',
    phone: '+33 6 11 22 33 44',
    address: '25 Rue Monge, 75005 Paris',
    agency: 'Agence Paris Sorbonne',
    advisorName: 'Hélène Martin-Dubois',
    advisorEmail: 'helene.martin-dubois@socgen.com',
    clientNumber: '7721 0945 09',
  },
  accounts: [
    {
      id: 'acc_alex_courant',
      label: 'Compte courant',
      type: 'courant',
      iban: 'FR76 3000 3048 0000 3344 5566 778',
      bic: 'SOGEFR2AXXX',
      balance: 1150.00,
      lastUpdated: '10 oct. 2025',
      holder: 'Alexandre Dubois',
    },
  ],
  transactions: [
    {
      id: 'tx_a_01',
      date: '08 oct. 2025',
      title: 'Paiement CB - Monoprix',
      subtitle: 'Alimentation',
      amount: -42.80,
      category: 'alimentation',
      reference: 'CB-3390-MONOP',
      status: 'valide',
    },
  ],
  beneficiaries: [],
  card: {
    id: 'card_a_01',
    numberMasked: '•••• 3390',
    cardHolder: 'ALEXANDRE DUBOIS',
    expiration: '05/27',
    type: 'Débit immédiat',
    network: 'Visa Classic',
    paymentLimit: 2000,
    paymentUsed: 420.00,
    withdrawalLimit: 400,
    withdrawalUsed: 50.00,
    contactlessEnabled: true,
    onlinePaymentsEnabled: true,
    abroadPaymentsEnabled: false,
    isLocked: false,
  },
  notifications: [],
};

// Default User 4: Nathalie Perreault (Blocked Account 53 047,38 € Desjardins style)
export const userNathalie: UserAccountData = {
  clientCode: '99281734',
  passcode: '123456',
  profile: {
    id: 'usr_nathalie',
    fullName: 'Nathalie Perreault',
    initials: 'NP',
    email: 'nathalie.perreault@desjardins.com',
    phone: '+1 514 555 0192',
    address: 'Montréal, QC, Canada',
    agency: 'Caisse Desjardins du Centre-ville',
    advisorName: 'Marc Tremblay',
    advisorEmail: 'marc.tremblay@desjardins.com',
    clientNumber: '9928 1734 01',
  },
  accounts: [
    {
      id: 'acc_nathalie_cheques',
      label: 'Compte chèques',
      type: 'courant',
      iban: 'CA00 8150 0001 2345 6789 001',
      bic: 'CCDQCA2MXXX',
      balance: 53047.38,
      currencySymbol: '€',
      isBlocked: true,
      blockedStatusText: 'BLOQUÉ TEMPORAIREMENT',
      blockedReason: 'Fonds temporairement gelés',
      lastUpdated: '10 oct. 2025',
      holder: 'Nathalie Perreault',
    },
  ],
  transactions: [
    {
      id: 'tx_n_01',
      date: '05 oct. 2025',
      title: 'Avis de séquestre conservatoire',
      subtitle: 'Blocage administratif des avoirs',
      amount: -53047.38,
      category: 'autre',
      reference: 'GEL-FND-2026',
      status: 'en_cours',
    },
    {
      id: 'tx_n_02',
      date: '01 oct. 2025',
      title: 'Virement international reçu',
      subtitle: 'Crédit initial',
      amount: 53047.38,
      category: 'virement',
      reference: 'VIR-INT-9921',
      status: 'valide',
    },
  ],
  beneficiaries: [],
  card: {
    id: 'card_n_01',
    numberMasked: '•••• 9102',
    cardHolder: 'NATHALIE PERREAULT',
    expiration: '08/29',
    type: 'Débit immédiat',
    network: 'Visa Premier',
    paymentLimit: 5000,
    paymentUsed: 0,
    withdrawalLimit: 1000,
    withdrawalUsed: 0,
    contactlessEnabled: false,
    onlinePaymentsEnabled: false,
    abroadPaymentsEnabled: false,
    isLocked: true,
  },
  notifications: [
    {
      id: 'notif_n_01',
      title: 'Compte bloqué temporairement',
      message: 'Votre compte chèques de 53 047,38 € fait l’objet d’un blocage temporaire. Veuillez fournir les justificatifs requis.',
      time: "À l'instant",
      unread: true,
      type: 'warning',
    },
  ],
};

const STORAGE_KEY = 'socgen_users_v11';
const ACTIVE_USER_KEY = 'socgen_active_code_v11';

export const loadStoredUsers = (): UserAccountData[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Failed to load users from storage', e);
  }
  return [userBernard, userNathalie, userSophie, userAlexandre];
};

export const saveStoredUsers = (users: UserAccountData[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
  } catch (e) {
    console.error('Failed to save users to storage', e);
  }
};

export const createNewUserAccount = (params: {
  fullName: string;
  email: string;
  phone: string;
  clientCode?: string;
  passcode: string;
  initialDeposit?: number;
}): UserAccountData => {
  const deposit = params.initialDeposit ?? 500;
  // Generate random 8-digit client code if not provided
  const clientCode =
    params.clientCode?.replace(/\D/g, '') ||
    Math.floor(10000000 + Math.random() * 90000000).toString();

  const initials = params.fullName
    .split(' ')
    .filter(Boolean)
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase() || 'SG';

  const randomDigits = Math.floor(10000000 + Math.random() * 90000000);
  const iban = `FR76 3000 3048 0000 ${randomDigits.toString().slice(0, 4)} ${randomDigits.toString().slice(4, 8)} 01`;
  const cardNumberDigits = Math.floor(1000 + Math.random() * 9000);

  const newUser: UserAccountData = {
    clientCode,
    passcode: params.passcode,
    profile: {
      id: `usr_${Date.now()}`,
      fullName: params.fullName,
      initials,
      email: params.email,
      phone: params.phone || '+33 6 00 00 00 00',
      address: 'Paris, France',
      agency: 'Agence Société Générale en Ligne',
      advisorName: 'Hélène Martin-Dubois',
      advisorEmail: 'helene.martin-dubois@socgen.com',
      clientNumber: `${clientCode.slice(0, 4)} ${clientCode.slice(4, 8)} 01`,
    },
    accounts: [
      {
        id: `acc_${Date.now()}_courant`,
        label: 'Compte courant',
        type: 'courant',
        iban,
        bic: 'SOGEFR2AXXX',
        balance: deposit,
        lastUpdated: "Aujourd'hui",
        holder: params.fullName,
      },
      {
        id: `acc_${Date.now()}_livret_a`,
        label: 'Livret A',
        type: 'epargne',
        iban: `FR76 3000 3048 0000 ${Math.floor(1000 + Math.random() * 9000)} ${Math.floor(1000 + Math.random() * 9000)} 02`,
        bic: 'SOGEFR2AXXX',
        balance: 100,
        lastUpdated: "Aujourd'hui",
        holder: params.fullName,
      },
    ],
    transactions: [
      {
        id: `tx_${Date.now()}_initial`,
        date: "Aujourd'hui",
        title: "Dépôt d'ouverture de compte",
        subtitle: 'Crédit initial d’ouverture',
        amount: deposit,
        category: 'virement',
        reference: `DEP-OUV-${Math.floor(10000 + Math.random() * 90000)}`,
        status: 'valide',
      },
    ],
    beneficiaries: [],
    card: {
      id: `card_${Date.now()}`,
      numberMasked: `•••• ${cardNumberDigits}`,
      cardHolder: params.fullName.toUpperCase(),
      expiration: '10/29',
      type: 'Débit immédiat',
      network: 'Visa Premier',
      paymentLimit: 3000,
      paymentUsed: 0,
      withdrawalLimit: 500,
      withdrawalUsed: 0,
      contactlessEnabled: true,
      onlinePaymentsEnabled: true,
      abroadPaymentsEnabled: true,
      isLocked: false,
    },
    notifications: [
      {
        id: `notif_${Date.now()}_welcome`,
        title: 'Bienvenue à la Société Générale',
        message: 'Votre compte bancaire et votre espace client sécurisé sont désormais actifs.',
        time: "À l'instant",
        unread: true,
        type: 'success',
      },
    ],
  };

  return newUser;
};

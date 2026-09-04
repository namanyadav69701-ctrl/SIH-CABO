export type UserRole = 'rooftop_host' | 'corporate_buyer' | 'discom_auditor';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  roleLabel: string;
  avatarInitials: string;
  city: string;
  nodeId?: string;
  systemCapacityKw?: number;
  walletBalanceInr?: number;
  totalEarningsInr?: number;
  verifiedCreditsAccrued?: number;
  companyOrAffiliation?: string;
  discomZone?: string;
  bio: string;
}

export const DEMO_PROFILES: Record<string, UserProfile> = {
  rajesh_host: {
    id: 'usr_001',
    name: 'Rajesh Sharma',
    email: 'rajesh.sharma@indoresolar.in',
    role: 'rooftop_host',
    roleLabel: 'Rooftop Solar Host (Residential)',
    avatarInitials: 'RS',
    city: 'Indore, Madhya Pradesh',
    nodeId: 'CABO-MP-0247',
    systemCapacityKw: 6.0,
    walletBalanceInr: 3880,
    totalEarningsInr: 18450,
    verifiedCreditsAccrued: 0.485,
    discomZone: 'MPPKVVCL (West Discom - Indore City Division)',
    bio: 'Residential rooftop host in Vijay Nagar. 6 kW bifacial solar array generating ~25 kWh/day with dual CT clamp & optical camera verification.',
  },
  anita_msme: {
    id: 'usr_002',
    name: 'Anita Deshmukh',
    email: 'anita@malwaprecision.com',
    role: 'rooftop_host',
    roleLabel: 'MSME Industrial Rooftop Host',
    avatarInitials: 'AD',
    city: 'Sanwer Industrial Area, Indore',
    nodeId: 'CABO-MP-0188',
    systemCapacityKw: 25.0,
    walletBalanceInr: 16400,
    totalEarningsInr: 82300,
    verifiedCreditsAccrued: 2.15,
    companyOrAffiliation: 'Malwa Precision Auto Components',
    discomZone: 'MPPKVVCL (Industrial Feeder 11kV)',
    bio: 'Plant Director running 25 kW rooftop solar supplying manufacturing machinery and routing certified surplus carbon offsets via CABO Gateway.',
  },
  corporate_buyer: {
    id: 'usr_003',
    name: 'Vikramaditya Singhania',
    email: 'vikram.s@mahindra-esg.com',
    role: 'corporate_buyer',
    roleLabel: 'Institutional ESG Carbon Buyer',
    avatarInitials: 'VS',
    city: 'Mumbai / Indore Office',
    companyOrAffiliation: 'Mahindra Heavy Industries ESG Desk',
    walletBalanceInr: 450000,
    totalEarningsInr: 0,
    verifiedCreditsAccrued: 480.0,
    bio: 'Corporate procurement lead buying verifiable, tamper-evident micro-solar carbon credits directly from Madhya Pradesh rooftop owners without broker markups.',
  },
  discom_auditor: {
    id: 'usr_004',
    name: 'Er. Alok Verma',
    email: 'alok.verma@mppkvvcl.gov.in',
    role: 'discom_auditor',
    roleLabel: 'DISCOM Net-Meter Verification Engineer',
    avatarInitials: 'AV',
    city: 'Indore, Madhya Pradesh',
    companyOrAffiliation: 'MPPKVVCL (Madhya Pradesh Paschim Kshetra Vidyut Vitaran Co.)',
    discomZone: 'Indore West Distribution Circle',
    bio: 'State electrical grid auditor cross-referencing gross inverter generation against substation feeder telemetry and feeder-level net meters.',
  },
};

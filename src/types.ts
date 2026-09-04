export interface TelemetryReading {
  nodeId: string;
  location: string;
  outputKw: number;
  voltageV: number;
  currentA: number;
  gridFreqHz: number;
  kwhToday: number;
  co2AvoidedKg: number;
  timestamp: string;
  signature: string;
  connectionType: '4G LTE-M' | 'GSM / 2G Fallback';
  rssiDbm: number;
  status: 'ONLINE' | 'BUFFERING' | 'MAINTENANCE';
}

export interface VerificationCheck {
  name: string;
  status: 'PASSED' | 'WARNING' | 'FLAGGED';
  detail: string;
  delta?: string;
}

export interface VerificationState {
  iotReadingKwh: number;
  ocrReadingKwh: number;
  inverterModbusKwh: number;
  differencePct: number;
  deviceSignatureValid: boolean;
  timestampVerified: boolean;
  cvGlazeIntegrity: 'CLEAR' | 'PARTIAL_SOILING' | 'OBSTRUCTED';
  overallConfidencePct: number;
  checks: VerificationCheck[];
  status: 'VERIFIED' | 'NEEDS_AUDIT' | 'REJECTED';
}

export interface LiveMRVEvent {
  id: string;
  timestamp: string;
  nodeId: string;
  city: string;
  eventType: 'METER_READING' | 'SIGNATURE_VERIFIED' | 'OCR_CROSS_CHECK' | 'BATCH_COMMITTED' | 'DISCREPANCY_FLAGGED';
  description: string;
  hash: string;
  badgeType: 'success' | 'info' | 'warning';
}

export interface PilotNodeLocation {
  id: string;
  name: string;
  district: string;
  discom: string;
  coordinates: { x: number; y: number }; // percentage on MP map
  lat: number;
  lng: number;
  connectedSystems: number;
  totalCapacityKw: number;
  dailyGenerationKwh: number;
  co2AvoidedTodayKg: number;
  avgConfidence: number;
  activeInstallers: string[];
  installTypes: {
    residential: number;
    msme: number;
    institutions: number;
  };
}

export interface PipelineStep {
  number: string;
  id: string;
  title: string;
  subtitle: string;
  methodology: string;
  dataArtifact: string;
  validationGate: string;
}

export interface TechStackItem {
  layer: string;
  title: string;
  technologies: string[];
  role: string;
  productionReadyNotes: string;
}

export interface FutureProduct {
  id: string;
  name: string;
  tag: string;
  targetAudience: string[];
  summary: string;
  architecture: string;
  keyMetrics: string[];
}

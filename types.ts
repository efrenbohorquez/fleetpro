
export enum RequestStatus {
  Pending = 'Pendiente',
  Approved = 'Aprobada',
  InProgress = 'En Progreso',
  Completed = 'Completada',
  Canceled = 'Cancelada',
}

export enum VehicleStatus {
  Available = 'Disponible',
  InUse = 'En Uso',
  Maintenance = 'Mantenimiento',
}

export enum DriverStatus {
  Available = 'Disponible',
  OnTrip = 'En Viaje',
  OnLeave = 'De Permiso',
}

export interface Driver {
  id: string;
  name: string;
  licenseNumber: string;
  contact: string;
  email?: string; // Correo electrónico del conductor
  status: DriverStatus;
}

export interface Vehicle {
  id: string;
  // Datos básicos
  plate: string; // PLACA
  make: string; // MARCA
  model: string; // LÍNEA
  year: number;
  type?: string; // TIPO (campero, camioneta, etc)
  bodyType?: string; // TIPO CARROCERÍA
  color?: string; // COLOR
  
  // Motor y mecánica
  engineNumber?: string; // NÚMERO DE MOTOR
  chassisNumber?: string; // NÚMERO DE CHASIS
  cylinderCapacity?: string; // CILINDRAJE
  serialNumber?: string; // SERIE No.
  fuelType?: string; // TIPO COMBUSTIBLE
  
  // Capacidad
  capacity?: number; // No. DE PASAJEROS
  
  // Documentación
  transitLicense?: string; // LICENCIA TRÁNSITO No.
  vin?: string; // VIN (Número de identificación vehicular)
  owner?: string; // Propietario
  insuranceCompany?: string; // Aseguradora
  insurancePolicy?: string; // Número de póliza
  soatExpiry?: string; // Fecha vencimiento SOAT
  techReviewExpiry?: string; // Fecha vencimiento revisión técnico-mecánica
  
  // Control interno
  status: VehicleStatus;
  mileage?: number; // Kilometraje actual
  historyFile?: string; // Ruta al archivo Excel de hoja de vida
}

export interface VehicleHistory {
  vehicleId: string;
  plate: string;
  fileName: string;
  filePath: string;
  lastUpdate?: string;
}

export interface TransportRequest {
  id: string;
  requester: string;
  requesterEmail?: string;
  department: string;
  departmentEmail?: string;
  date: string; // Fecha de solicitud
  departureDate?: string; // Fecha programada de salida
  origin: string;
  destination: string;
  passengers: number;
  purpose?: string; // Motivo del desplazamiento
  observations?: string; // Observaciones adicionales
  status: RequestStatus;
  vehicleId?: string;
  driverId?: string;
}

export enum MaintenanceType {
  Preventive = 'Preventivo',
  Corrective = 'Correctivo',
}

export enum MaintenanceStatus {
  Scheduled = 'Programado',
  InProgress = 'En Proceso',
  Completed = 'Completado',
  Canceled = 'Cancelado',
}

export interface MaintenanceRecord {
  id: string;
  vehicleId: string;
  type: MaintenanceType;
  status: MaintenanceStatus;
  scheduledDate: string;
  completedDate?: string;
  description: string;
  cost: number;
  mileage?: number;
  workshop?: string;
  technician?: string;
  parts?: string[];
  notes?: string;
}

export interface Survey {
  id: string;
  requestId: string;
  rating: number; // 1 to 5
  comments: string;
  date: string;
}


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
  status: DriverStatus;
}

export interface Vehicle {
  id: string;
  make: string;
  model: string;
  year: number;
  plate: string;
  status: VehicleStatus;
  historyFile?: string; // Ruta al archivo Excel de hoja de vida
  mileage?: number; // Kilometraje actual
  vin?: string; // Número de identificación vehicular
  color?: string; // Color del vehículo
  fuelType?: string; // Tipo de combustible
  capacity?: number; // Capacidad de pasajeros
  engineNumber?: string; // Número de motor
  chassisNumber?: string; // Número de chasis
  owner?: string; // Propietario
  insuranceCompany?: string; // Aseguradora
  insurancePolicy?: string; // Número de póliza
  soatExpiry?: string; // Fecha vencimiento SOAT
  techReviewExpiry?: string; // Fecha vencimiento revisión técnico-mecánica
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

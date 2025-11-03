/**
 * Servicio de Almacenamiento Local - Sistema de Gestión de Flota
 * Refactorizado para eliminar código duplicado y mejorar mantenibilidad
 */

import { Driver, Vehicle, TransportRequest, Survey, MaintenanceRecord } from '../types';
import { STORAGE_KEYS, MESSAGES } from '../constants';

// ==================== TIPOS ====================
type StorageData = Driver[] | Vehicle[] | TransportRequest[] | Survey[] | MaintenanceRecord[];

interface ExportData {
  drivers: Driver[] | null;
  vehicles: Vehicle[] | null;
  requests: TransportRequest[] | null;
  surveys: Survey[] | null;
  maintenance: MaintenanceRecord[] | null;
  exportDate: string;
  version: string;
}

// ==================== FUNCIONES GENÉRICAS ====================

/**
 * Guarda datos en localStorage de forma genérica
 * @param key - Clave de almacenamiento
 * @param data - Datos a guardar
 * @returns true si se guardó exitosamente, false si hubo error
 */
const saveToStorage = <T>(key: string, data: T): boolean => {
  try {
    const jsonString = JSON.stringify(data);
    
    // Verificar tamaño antes de guardar (límite aproximado de 5MB)
    if (jsonString.length > 5 * 1024 * 1024) {
      console.warn('Advertencia: Datos muy grandes, considere limpiar datos antiguos');
    }
    
    localStorage.setItem(key, jsonString);
    return true;
  } catch (error) {
    if (error instanceof Error) {
      // Detectar si es error de cuota excedida
      if (error.name === 'QuotaExceededError') {
        console.error(MESSAGES.ERROR_STORAGE_FULL, error);
        alert(MESSAGES.ERROR_STORAGE_FULL);
      } else {
        console.error(`${MESSAGES.ERROR_SAVE} (${key}):`, error);
      }
    }
    return false;
  }
};

/**
 * Carga datos desde localStorage de forma genérica
 * @param key - Clave de almacenamiento
 * @returns Datos parseados o null si no existen o hay error
 */
const loadFromStorage = <T>(key: string): T | null => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error(`${MESSAGES.ERROR_LOAD} (${key}):`, error);
    return null;
  }
};

/**
 * Elimina datos de localStorage
 * @param key - Clave de almacenamiento
 */
const removeFromStorage = (key: string): void => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error eliminando ${key}:`, error);
  }
};

// ==================== DRIVERS ====================
export const saveDrivers = (drivers: Driver[]): boolean => 
  saveToStorage(STORAGE_KEYS.DRIVERS, drivers);

export const loadDrivers = (): Driver[] | null => 
  loadFromStorage<Driver[]>(STORAGE_KEYS.DRIVERS);

// ==================== VEHICLES ====================
export const saveVehicles = (vehicles: Vehicle[]): boolean => 
  saveToStorage(STORAGE_KEYS.VEHICLES, vehicles);

export const loadVehicles = (): Vehicle[] | null => 
  loadFromStorage<Vehicle[]>(STORAGE_KEYS.VEHICLES);

// ==================== REQUESTS ====================
export const saveRequests = (requests: TransportRequest[]): boolean => 
  saveToStorage(STORAGE_KEYS.REQUESTS, requests);

export const loadRequests = (): TransportRequest[] | null => 
  loadFromStorage<TransportRequest[]>(STORAGE_KEYS.REQUESTS);

// ==================== REQUESTS HISTORY ====================
export const saveRequestsHistory = (history: TransportRequest[]): boolean => 
  saveToStorage('fleet_requests_history', history);

export const loadRequestsHistory = (): TransportRequest[] | null => 
  loadFromStorage<TransportRequest[]>('fleet_requests_history');

/**
 * Archiva una solicitud completada o cancelada al historial
 * @param request - Solicitud a archivar
 */
export const archiveRequest = (request: TransportRequest): boolean => {
  try {
    const history = loadRequestsHistory() || [];
    
    // Evitar duplicados
    const exists = history.find(r => r.id === request.id);
    if (!exists) {
      const archivedRequest = {
        ...request,
        archivedDate: new Date().toISOString()
      };
      history.push(archivedRequest as TransportRequest);
      return saveRequestsHistory(history);
    }
    return true;
  } catch (error) {
    console.error('Error archivando solicitud:', error);
    return false;
  }
};

// ==================== SURVEYS ====================
export const saveSurveys = (surveys: Survey[]): boolean => 
  saveToStorage(STORAGE_KEYS.SURVEYS, surveys);

export const loadSurveys = (): Survey[] | null => 
  loadFromStorage<Survey[]>(STORAGE_KEYS.SURVEYS);

// ==================== MAINTENANCE ====================
export const saveMaintenance = (maintenance: MaintenanceRecord[]): boolean => 
  saveToStorage(STORAGE_KEYS.MAINTENANCE, maintenance);

export const loadMaintenance = (): MaintenanceRecord[] | null => 
  loadFromStorage<MaintenanceRecord[]>(STORAGE_KEYS.MAINTENANCE);

// ==================== OPERACIONES GLOBALES ====================

/**
 * Limpia todos los datos del almacenamiento local
 */
export const clearAllData = (): void => {
  const keys = Object.values(STORAGE_KEYS);
  keys.forEach(key => removeFromStorage(key));
  console.info('Todos los datos han sido limpiados');
};

/**
 * Obtiene el tamaño total de datos almacenados
 * @returns Tamaño en bytes
 */
export const getStorageSize = (): number => {
  let total = 0;
  Object.values(STORAGE_KEYS).forEach(key => {
    const item = localStorage.getItem(key);
    if (item) {
      total += item.length;
    }
  });
  return total;
};

/**
 * Obtiene el tamaño de almacenamiento en formato legible
 * @returns String con el tamaño formateado
 */
export const getStorageSizeFormatted = (): string => {
  const bytes = getStorageSize();
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
};

// ==================== EXPORTAR/IMPORTAR ====================

/**
 * Exporta todos los datos a formato JSON
 * @returns String JSON con todos los datos
 */
export const exportData = (): string => {
  const data: ExportData = {
    drivers: loadDrivers(),
    vehicles: loadVehicles(),
    requests: loadRequests(),
    surveys: loadSurveys(),
    maintenance: loadMaintenance(),
    exportDate: new Date().toISOString(),
    version: '1.0.0',
  };
  return JSON.stringify(data, null, 2);
};

/**
 * Importa datos desde un JSON string
 * @param jsonString - String JSON con los datos
 * @returns true si la importación fue exitosa
 */
export const importData = (jsonString: string): boolean => {
  try {
    const data: Partial<ExportData> = JSON.parse(jsonString);
    
    // Validar estructura básica
    if (!data || typeof data !== 'object') {
      throw new Error('Formato de datos inválido');
    }
    
    // Importar cada tipo de dato si existe
    let imported = false;
    
    if (Array.isArray(data.drivers)) {
      saveDrivers(data.drivers);
      imported = true;
    }
    if (Array.isArray(data.vehicles)) {
      saveVehicles(data.vehicles);
      imported = true;
    }
    if (Array.isArray(data.requests)) {
      saveRequests(data.requests);
      imported = true;
    }
    if (Array.isArray(data.surveys)) {
      saveSurveys(data.surveys);
      imported = true;
    }
    if (Array.isArray(data.maintenance)) {
      saveMaintenance(data.maintenance);
      imported = true;
    }
    
    if (!imported) {
      console.warn('No se encontraron datos válidos para importar');
      return false;
    }
    
    console.info('Datos importados exitosamente');
    return true;
  } catch (error) {
    console.error('Error importando datos:', error);
    return false;
  }
};

/**
 * Verifica si existen datos en el almacenamiento
 * @returns true si hay al menos un conjunto de datos
 */
export const hasStoredData = (): boolean => {
  return Object.values(STORAGE_KEYS).some(key => localStorage.getItem(key) !== null);
};

/**
 * Obtiene estadísticas del almacenamiento
 */
export const getStorageStats = () => {
  return {
    drivers: loadDrivers()?.length || 0,
    vehicles: loadVehicles()?.length || 0,
    requests: loadRequests()?.length || 0,
    surveys: loadSurveys()?.length || 0,
    maintenance: loadMaintenance()?.length || 0,
    totalSize: getStorageSizeFormatted(),
  };
};

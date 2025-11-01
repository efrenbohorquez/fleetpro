/**
 * Constantes de la Aplicación - Sistema de Gestión de Flota
 * Personería de Bogotá
 */

// ==================== STORAGE KEYS ====================
export const STORAGE_KEYS = {
  DRIVERS: 'fleet_drivers',
  VEHICLES: 'fleet_vehicles',
  REQUESTS: 'fleet_requests',
  SURVEYS: 'fleet_surveys',
  MAINTENANCE: 'fleet_maintenance',
} as const;

// ==================== ESTADOS ====================
export const REQUEST_STATUS = {
  PENDING: 'Pendiente',
  APPROVED: 'Aprobada',
  ASSIGNED: 'Asignada',
  IN_PROGRESS: 'En Progreso',
  COMPLETED: 'Completada',
  REJECTED: 'Rechazada',
  CANCELLED: 'Cancelada',
} as const;

export const DRIVER_STATUS = {
  AVAILABLE: 'Disponible',
  ASSIGNED: 'Asignado',
  ON_LEAVE: 'De Permiso',
  INACTIVE: 'Inactivo',
} as const;

export const VEHICLE_STATUS = {
  AVAILABLE: 'Disponible',
  IN_USE: 'En Uso',
  MAINTENANCE: 'Mantenimiento',
  OUT_OF_SERVICE: 'Fuera de Servicio',
} as const;

export const MAINTENANCE_STATUS = {
  SCHEDULED: 'Programado',
  IN_PROGRESS: 'En Progreso',
  COMPLETED: 'Completado',
  CANCELLED: 'Cancelado',
} as const;

export const MAINTENANCE_TYPES = {
  PREVENTIVE: 'Preventivo',
  CORRECTIVE: 'Correctivo',
  INSPECTION: 'Inspección',
  REPAIR: 'Reparación',
} as const;

// ==================== VALORES POR DEFECTO ====================
export const DEFAULT_VALUES = {
  PAGINATION_SIZE: 10,
  MAX_FILE_SIZE_MB: 5,
  SESSION_TIMEOUT_MINUTES: 30,
  REFRESH_INTERVAL_MS: 60000, // 1 minuto
  
  // Valores por defecto para formularios
  DEFAULT_RESPONSABLE: 'EFRÉN BOHÓRQUEZ',
  DEFAULT_RATING: 0,
  DEFAULT_MILEAGE: 0,
} as const;

// ==================== VALIDACIONES ====================
export const VALIDATION_RULES = {
  // Longitudes mínimas/máximas
  MIN_NAME_LENGTH: 3,
  MAX_NAME_LENGTH: 100,
  MIN_LICENSE_LENGTH: 6,
  MAX_LICENSE_LENGTH: 20,
  MIN_PLATE_LENGTH: 6,
  MAX_PLATE_LENGTH: 7,
  MIN_VIN_LENGTH: 17,
  MAX_VIN_LENGTH: 17,
  
  // Formatos
  PLATE_REGEX: /^[A-Z]{3}[0-9]{3}$/,
  LICENSE_REGEX: /^[0-9]{6,20}$/,
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE_REGEX: /^[0-9]{7,10}$/,
  
  // Rangos numéricos
  MIN_RATING: 1,
  MAX_RATING: 5,
  MIN_MILEAGE: 0,
  MAX_MILEAGE: 9999999,
  MIN_CAPACITY: 1,
  MAX_CAPACITY: 50,
} as const;

// ==================== CONFIGURACIÓN DE UI ====================
export const UI_CONFIG = {
  // Colores de estado (para uso en clases Tailwind)
  STATUS_COLORS: {
    [REQUEST_STATUS.PENDING]: 'yellow',
    [REQUEST_STATUS.APPROVED]: 'blue',
    [REQUEST_STATUS.ASSIGNED]: 'purple',
    [REQUEST_STATUS.IN_PROGRESS]: 'indigo',
    [REQUEST_STATUS.COMPLETED]: 'green',
    [REQUEST_STATUS.REJECTED]: 'red',
    [REQUEST_STATUS.CANCELLED]: 'gray',
  },
  
  // Iconos por estado
  STATUS_ICONS: {
    [REQUEST_STATUS.PENDING]: '⏳',
    [REQUEST_STATUS.APPROVED]: '✅',
    [REQUEST_STATUS.ASSIGNED]: '👤',
    [REQUEST_STATUS.IN_PROGRESS]: '🚗',
    [REQUEST_STATUS.COMPLETED]: '✔️',
    [REQUEST_STATUS.REJECTED]: '❌',
    [REQUEST_STATUS.CANCELLED]: '🚫',
  },
  
  // Prioridades
  PRIORITIES: {
    LOW: 'Baja',
    MEDIUM: 'Media',
    HIGH: 'Alta',
    URGENT: 'Urgente',
  },
  
  // Colores de prioridad
  PRIORITY_COLORS: {
    Baja: 'gray',
    Media: 'blue',
    Alta: 'orange',
    Urgente: 'red',
  },
} as const;

// ==================== MENSAJES ====================
export const MESSAGES = {
  // Confirmaciones
  CONFIRM_DELETE: '¿Está seguro de que desea eliminar este elemento?',
  CONFIRM_APPROVE: '¿Usted está seguro de aprobar la solicitud?',
  CONFIRM_REJECT: '¿Está seguro de que desea rechazar esta solicitud?',
  CONFIRM_CANCEL: '¿Está seguro de que desea cancelar esta solicitud?',
  CONFIRM_CLEAR_DATA: '¿Está seguro de que desea limpiar todos los datos? Esta acción no se puede deshacer.',
  
  // Éxito
  SUCCESS_SAVE: 'Datos guardados exitosamente',
  SUCCESS_DELETE: 'Elemento eliminado exitosamente',
  SUCCESS_UPDATE: 'Actualización exitosa',
  SUCCESS_ASSIGN: 'Asignación realizada con éxito',
  
  // Errores
  ERROR_SAVE: 'Error al guardar los datos',
  ERROR_LOAD: 'Error al cargar los datos',
  ERROR_DELETE: 'Error al eliminar el elemento',
  ERROR_REQUIRED_FIELDS: 'Por favor complete todos los campos requeridos',
  ERROR_INVALID_FORMAT: 'El formato ingresado no es válido',
  ERROR_STORAGE_FULL: 'Almacenamiento local lleno. Por favor limpie datos antiguos.',
  
  // Advertencias
  WARNING_NO_SELECTION: 'Por favor seleccione al menos un elemento',
  WARNING_UNSAVED_CHANGES: 'Tiene cambios sin guardar. ¿Desea continuar?',
} as const;

// ==================== CONFIGURACIÓN DE EXPORTACIÓN ====================
export const EXPORT_CONFIG = {
  FILE_NAME_PREFIX: 'fleet_data',
  DATE_FORMAT: 'YYYY-MM-DD',
  TIME_FORMAT: 'HH:mm:ss',
  DATETIME_FORMAT: 'YYYY-MM-DD_HH-mm-ss',
  
  // Tipos de archivo
  FILE_TYPES: {
    JSON: 'application/json',
    CSV: 'text/csv',
    EXCEL: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  },
  
  // Extensiones
  FILE_EXTENSIONS: {
    JSON: '.json',
    CSV: '.csv',
    EXCEL: '.xlsx',
  },
} as const;

// ==================== RUTAS DE ARCHIVOS ====================
export const FILE_PATHS = {
  VEHICLE_HISTORY_DIR: 'data/Hoja de Vida Vehículos',
  VEHICLE_HISTORY_TEMPLATE: (plate: string) => 
    `data/Hoja de Vida Vehículos/${plate} Formato Hoja De Vida ${plate}.xlsx`,
} as const;

// ==================== DEPENDENCIAS PERSONERÍA DE BOGOTÁ D.C. ====================
export const PERSONERIA_DEPARTMENTS = [
  // Despacho del Personero
  'DESPACHO DEL PERSONERO DE BOGOTÁ D.C.',
  
  // Oficinas adscritas al Despacho
  'OFICINA DE CONTROL INTERNO',
  'OFICINA ASESORA DE COMUNICACIONES',
  'OFICINA ASESORA JURÍDICA',
  'OFICINA DE RELACIONES NACIONALES E INTERNACIONALES',
  
  // Direcciones principales
  'DIRECCIÓN DE PLANEACIÓN',
  'DIRECCIÓN DE GESTIÓN DEL CONOCIMIENTO, ANALÍTICA E INNOVACIÓN',
  'DIRECCIÓN DE TECNOLOGÍAS DE LA INFORMACIÓN Y LAS COMUNICACIONES - TIC',
  'DIRECCIÓN ADMINISTRATIVA Y FINANCIERA',
  'DIRECCIÓN DE ASUNTOS JURISDICCIONALES',
  'DIRECCIÓN DE ORIENTACIÓN Y ASISTENCIA A LAS PERSONAS',
  'DIRECCIÓN DE CONCILIACIÓN Y MECANISMOS ALTERNATIVOS DE SOLUCIÓN DE CONFLICTOS',
  
  // Subdirecciones - Oficina de Control Interno
  'PERSONERÍA AUXILIAR',
  
  // Subdirecciones - Secretaría General
  'SECRETARÍA GENERAL',
  'SUBDIRECCIÓN DE TALENTO HUMANO',
  'SUBDIRECCIÓN DE ADMINISTRACIÓN DEL TALENTO HUMANO',
  'SUBDIRECCIÓN DE NÓMINA Y GESTIÓN DE INFORMACIÓN DEL TALENTO HUMANO',
  'SUBDIRECCIÓN DE DESARROLLO DEL TALENTO HUMANO',
  'SUBDIRECCIÓN DE GESTIÓN DOCUMENTAL',
  'SUBDIRECCIÓN DE RECURSOS FÍSICOS',
  
  // Subdirecciones - Personería Delegada para la Seguridad del Ministerio Público y la Función Pública
  'PERSONERÍA DELEGADA PARA LA SEGURIDAD DEL MINISTERIO PÚBLICO Y LA FUNCIÓN PÚBLICA',
  'P.D. PARA EL SECTOR SALUD',
  'P.D. PARA EL SECTOR AMBIENTE',
  'P.D. PARA EL SECTOR HÁBITAT',
  'P.D. PARA EL SECTOR GOBIERNO',
  'P.D. PARA LOS SECTORES GESTIÓN PÚBLICA Y JURÍDICA',
  'P.D. PARA EL SECTOR MUJERES',
  'P.D. PARA EL SECTOR INTEGRACIÓN SOCIAL',
  'P.D. PARA EL SECTOR EDUCACIÓN',
  'P.D. PARA EL SECTOR CULTURA, RECREACIÓN Y DEPORTES',
  'P.D. PARA EL SECTOR HACIENDA',
  'P.D. PARA EL SECTOR DESARROLLO ECONÓMICO, INDUSTRIA Y TURISMO',
  'P.D. PARA EL SECTOR MOVILIDAD',
  'P.D. PARA EL SECTOR SEGURIDAD, CONVIVENCIA Y JUSTICIA',
  'P.D. PARA EL SECTOR PLANEACIÓN',
  
  // Subdirecciones - P.D. para Asuntos Penales
  'P.D. PARA ASUNTOS PENALES I',
  'P.D. PARA ASUNTOS PENALES II',
  'P.D. PARA ASUNTOS POLICIVOS Y CIVILES',
  
  // Subdirecciones - P.D. para la Instrucción Disciplinaria
  'P.D. PARA LA INSTRUCCIÓN DISCIPLINARIA I',
  'P.D. PARA LA INSTRUCCIÓN DISCIPLINARIA II',
  'P.D. PARA LA INSTRUCCIÓN DISCIPLINARIA III',
  'P.D. PARA EL JUZGAMIENTO DISCIPLINARIO I',
  'P.D. PARA EL JUZGAMIENTO DISCIPLINARIO II',
  
  // Direcciones - Investigaciones Especiales y Apoyo Técnico
  'DIRECCIÓN DE INVESTIGACIONES ESPECIALES Y APOYO TÉCNICO',
  
  // Personerías Delegadas para el Relacionamiento con el Ciudadano y Asuntos Locales
  'PERSONERÍA DELEGADA PARA EL RELACIONAMIENTO CON EL CIUDADANO Y ASUNTOS LOCALES',
  'PERSONERÍA LOCAL USAQUÉN I',
  'PERSONERÍA LOCAL USAQUÉN II',
  'PERSONERÍA LOCAL CHAPINERO I',
  'PERSONERÍA LOCAL CHAPINERO II',
  'PERSONERÍA LOCAL SANTA FÉ',
  'PERSONERÍA LOCAL SAN CRISTÓBAL I',
  'PERSONERÍA LOCAL SAN CRISTÓBAL II',
  'PERSONERÍA LOCAL USME I',
  'PERSONERÍA LOCAL USME II',
  'PERSONERÍA LOCAL TUNJUELITO',
  'PERSONERÍA LOCAL BOSA I',
  'PERSONERÍA LOCAL BOSA II',
  'PERSONERÍA LOCAL KENNEDY I',
  'PERSONERÍA LOCAL KENNEDY II',
  'PERSONERÍA LOCAL FONTIBÓN I',
  'PERSONERÍA LOCAL FONTIBÓN II',
  'PERSONERÍA LOCAL ENGATIVÁ I',
  'PERSONERÍA LOCAL ENGATIVÁ II',
  'PERSONERÍA LOCAL SUBA I',
  'PERSONERÍA LOCAL SUBA II',
  'PERSONERÍA LOCAL BARRIOS UNIDOS',
  'PERSONERÍA LOCAL TEUSAQUILLO',
  'PERSONERÍA LOCAL LOS MÁRTIRES',
  'PERSONERÍA LOCAL ANTONIO NARIÑO',
  'PERSONERÍA LOCAL PUENTE ARANDA',
  'PERSONERÍA LOCAL LA CANDELARIA',
  'PERSONERÍA LOCAL RAFAEL URIBE URIBE',
  'PERSONERÍA LOCAL CIUDAD BOLÍVAR I',
  'PERSONERÍA LOCAL CIUDAD BOLÍVAR II',
  'PERSONERÍA LOCAL SUMAPAZ',
  
  // Otras dependencias específicas
  'P.D. PARA LA FAMILIA Y ASUNTOS DE INFANCIA, ADOLESCENCIA CONSTITUCIONAL',
  'P.D. PARA LA DEFENSA Y PROTECCIÓN DE LAS PERSONAS EN EL CONFLICTO ARMADO INTERNO',
  'P.D. PARA LA DEFENSA Y PROTECCIÓN DE LOS DERECHOS DEL CONSUMIDOR',
  'P.D. PARA LA PREVENCIÓN EN MATERIA DE DERECHOS HUMANOS Y PROTECCIÓN',
  'P.D. PARA LA SEGURIDAD PÚBLICA',
  'P.D. PARA COOR. DE LA GEST DE LAS PERSONERIAS LOC',
  'P.D. PARA LA COORD. PREVEN. Y CONTR. FUN. PUB.',
  'P.D. PARA EL RELAC CON EL CIUD Y ASUNTOS LOC',
  
  // Subdirecciones - Tecnología e Infraestructura
  'SUBDIRECCIÓN DE INFRAESTRUCTURA, REDES Y SOPORTE',
  'SUBDIRECCIÓN DE SOFTWARE, BASES DE DATOS Y SEGURIDAD',
] as const;

// Exportar como array para uso en dropdowns
export const DEPARTMENTS_LIST = [...PERSONERIA_DEPARTMENTS].sort();

// ==================== TIPOS DERIVADOS ====================
export type RequestStatus = typeof REQUEST_STATUS[keyof typeof REQUEST_STATUS];
export type DriverStatus = typeof DRIVER_STATUS[keyof typeof DRIVER_STATUS];
export type VehicleStatus = typeof VEHICLE_STATUS[keyof typeof VEHICLE_STATUS];
export type MaintenanceStatus = typeof MAINTENANCE_STATUS[keyof typeof MAINTENANCE_STATUS];
export type MaintenanceType = typeof MAINTENANCE_TYPES[keyof typeof MAINTENANCE_TYPES];
export type Priority = typeof UI_CONFIG.PRIORITIES[keyof typeof UI_CONFIG.PRIORITIES];
export type Department = typeof PERSONERIA_DEPARTMENTS[number];

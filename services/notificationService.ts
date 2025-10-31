import { Driver, TransportRequest, Vehicle } from '../types';

export interface Notification {
  id: string;
  type: 'assignment' | 'approval' | 'cancellation' | 'completion';
  recipient: string; // email o nombre del destinatario
  recipientType: 'requester' | 'driver';
  message: string;
  timestamp: Date;
  requestId: string;
  read: boolean;
}

// Simulación de envío de notificaciones
export const sendNotification = (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>): Notification => {
  const newNotification: Notification = {
    ...notification,
    id: `notif-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    timestamp: new Date(),
    read: false,
  };

  // Guardar en localStorage para persistencia
  const existingNotifications = loadNotifications();
  const updatedNotifications = [...existingNotifications, newNotification];
  localStorage.setItem('fleet_notifications', JSON.stringify(updatedNotifications));

  // En producción, aquí se enviaría un email o push notification
  console.log('📧 Notificación enviada:', {
    tipo: notification.type,
    destinatario: notification.recipient,
    mensaje: notification.message,
  });

  return newNotification;
};

// Notificación de asignación al solicitante
export const notifyRequesterAssignment = (
  request: TransportRequest,
  vehicle: Vehicle,
  driver: Driver
): Notification => {
  const message = `Su solicitud de vehículo para ${request.destination} ha sido aprobada. 
Vehículo asignado: ${vehicle.make} ${vehicle.model} (${vehicle.plate})
Conductor asignado: ${driver.name} - Tel: ${driver.contact}
Fecha: ${request.date}`;

  return sendNotification({
    type: 'assignment',
    recipient: request.requester,
    recipientType: 'requester',
    message,
    requestId: request.id,
  });
};

// Notificación de asignación al conductor
export const notifyDriverAssignment = (
  request: TransportRequest,
  driver: Driver
): Notification => {
  const message = `Se le ha asignado un nuevo servicio:
Solicitante: ${request.requester} (${request.department})
Origen: ${request.origin}
Destino: ${request.destination}
Fecha: ${request.date}
Hora de salida: ${extractTime(request.date, 'departure')}
Hora de llegada: ${extractTime(request.date, 'arrival')}
Pasajeros: ${request.passengers}

Por favor confirme su disponibilidad.`;

  return sendNotification({
    type: 'assignment',
    recipient: driver.name,
    recipientType: 'driver',
    message,
    requestId: request.id,
  });
};

// Notificación de aprobación de solicitud
export const notifyApproval = (request: TransportRequest): Notification => {
  const message = `Su solicitud de vehículo N° ${request.id} ha sido aprobada y está en proceso de asignación.
Destino: ${request.destination}
Fecha: ${request.date}`;

  return sendNotification({
    type: 'approval',
    recipient: request.requester,
    recipientType: 'requester',
    message,
    requestId: request.id,
  });
};

// Notificación de cancelación
export const notifyCancellation = (request: TransportRequest, reason?: string): Notification => {
  const message = `Su solicitud de vehículo N° ${request.id} ha sido cancelada.
${reason ? `Motivo: ${reason}` : ''}
Para más información, contacte con el área de gestión de flota.`;

  return sendNotification({
    type: 'cancellation',
    recipient: request.requester,
    recipientType: 'requester',
    message,
    requestId: request.id,
  });
};

// Notificación de finalización
export const notifyCompletion = (request: TransportRequest, driver: Driver): Notification => {
  const messageToRequester = `El servicio solicitado para ${request.destination} ha sido completado exitosamente.
Conductor: ${driver.name}
Fecha: ${request.date}

Por favor, califique el servicio.`;

  return sendNotification({
    type: 'completion',
    recipient: request.requester,
    recipientType: 'requester',
    message: messageToRequester,
    requestId: request.id,
  });
};

// Cargar notificaciones desde localStorage
export const loadNotifications = (): Notification[] => {
  try {
    const stored = localStorage.getItem('fleet_notifications');
    if (stored) {
      const notifications = JSON.parse(stored);
      // Convertir timestamps de string a Date
      return notifications.map((n: any) => ({
        ...n,
        timestamp: new Date(n.timestamp),
      }));
    }
  } catch (error) {
    console.error('Error cargando notificaciones:', error);
  }
  return [];
};

// Marcar notificación como leída
export const markAsRead = (notificationId: string): void => {
  const notifications = loadNotifications();
  const updated = notifications.map(n => 
    n.id === notificationId ? { ...n, read: true } : n
  );
  localStorage.setItem('fleet_notifications', JSON.stringify(updated));
};

// Obtener notificaciones no leídas
export const getUnreadNotifications = (): Notification[] => {
  return loadNotifications().filter(n => !n.read);
};

// Limpiar notificaciones antiguas (más de 30 días)
export const cleanOldNotifications = (): void => {
  const notifications = loadNotifications();
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  
  const filtered = notifications.filter(n => n.timestamp > thirtyDaysAgo);
  localStorage.setItem('fleet_notifications', JSON.stringify(filtered));
};

// Utilidad para extraer hora de una fecha
const extractTime = (dateString: string, type: 'departure' | 'arrival'): string => {
  // Esta es una función auxiliar - ajustar según el formato de fecha usado
  // Por ahora retorna un placeholder
  return type === 'departure' ? '08:00' : '17:00';
};

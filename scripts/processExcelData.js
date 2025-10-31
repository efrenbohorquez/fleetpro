import XLSX from 'xlsx';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Leer el archivo Excel
const workbook = XLSX.readFile(join(__dirname, '../data/encuesta_satisfaccion.xlsx'));
const worksheet = workbook.Sheets[workbook.SheetNames[0]];
const rawData = XLSX.utils.sheet_to_json(worksheet, { defval: '' });

console.log(`Total de registros: ${rawData.length}`);

// Procesar conductores únicos
const driversMap = new Map();
const vehiclesMap = new Map();
const surveysData = [];
const requestsData = [];

rawData.forEach((row, index) => {
  const driverName = row['NOMBRE CONDUCTOR'];
  const plate = row['PLACA'];
  const requesterName = row['NOMBRES'];
  const department = row['DEPENDENCIA'];
  const serviceDescription = row['DESCRIPCIÓN SERVICIO'];
  const rating = row['CALIFICACIÓN EXPERIENCIA'];
  const comments = row['COMENTARIO'];
  const serviceProvided = row['SERVICIO PRESTADO'];
  const creationDate = row['FECHA CREACIÓN'];
  const requestId = row['ID CASO'];

  // Procesar conductor
  if (driverName && typeof driverName === 'string' && driverName.trim()) {
    const cleanName = driverName.trim().toLowerCase();
    if (!driversMap.has(cleanName)) {
      const nameParts = driverName.trim().split(' ');
      const firstName = nameParts.slice(0, Math.ceil(nameParts.length / 2)).join(' ');
      const lastName = nameParts.slice(Math.ceil(nameParts.length / 2)).join(' ');
      const formattedName = `${firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase()} ${lastName.charAt(0).toUpperCase() + lastName.slice(1).toLowerCase()}`;
      
      driversMap.set(cleanName, {
        id: `d${driversMap.size + 1}`,
        name: formattedName,
        licenseNumber: `L${1000000 + driversMap.size}`,
        contact: `555-${String(1000 + driversMap.size).padStart(4, '0')}`,
        status: 'disponible'
      });
    }
  }

  // Procesar vehículo
  if (plate && typeof plate === 'string' && plate.trim()) {
    const cleanPlate = plate.trim().toUpperCase();
    if (!vehiclesMap.has(cleanPlate)) {
      vehiclesMap.set(cleanPlate, {
        id: `v${vehiclesMap.size + 1}`,
        make: 'Toyota', // Por defecto, ya que no tenemos esta info
        model: 'Vehículo Oficial',
        year: 2022,
        plate: cleanPlate,
        status: 'disponible'
      });
    }
  }

  // Procesar encuesta si tiene calificación
  if (rating && serviceProvided === 'Si') {
    surveysData.push({
      id: `s${surveysData.length + 1}`,
      requestId: `r${requestId}`,
      rating: typeof rating === 'number' ? rating : 4,
      comments: comments || 'Sin comentarios',
      date: creationDate ? creationDate.split(' ')[0] : '2024-01-01'
    });
  }

  // Procesar solicitud
  if (requesterName && department) {
    const driverId = driverName ? driversMap.get(driverName.trim().toLowerCase())?.id : undefined;
    const vehicleId = plate ? vehiclesMap.get(plate.trim().toUpperCase())?.id : undefined;
    
    requestsData.push({
      id: `r${requestId}`,
      requester: requesterName,
      department: department.substring(0, 50), // Limitar longitud
      date: creationDate ? creationDate.split(' ')[0] : '2024-01-01',
      origin: 'Oficina Central',
      destination: serviceDescription ? serviceDescription.substring(0, 50) + '...' : 'Sin especificar',
      passengers: 1,
      status: serviceProvided === 'Si' ? 'completado' : 'pendiente',
      vehicleId,
      driverId
    });
  }
});

const drivers = Array.from(driversMap.values());
const vehicles = Array.from(vehiclesMap.values());

console.log(`\nConductores únicos: ${drivers.length}`);
console.log(`Vehículos únicos: ${vehicles.length}`);
console.log(`Encuestas: ${surveysData.length}`);
console.log(`Solicitudes: ${requestsData.length}`);

// Generar el nuevo contenido de mockData.ts
const mockDataContent = `
import { Driver, Vehicle, TransportRequest, MaintenanceRecord, Survey, DriverStatus, VehicleStatus, RequestStatus } from '../types';

export const drivers: Driver[] = ${JSON.stringify(drivers, null, 2).replace(/"disponible"/g, 'DriverStatus.Available')};

export const vehicles: Vehicle[] = ${JSON.stringify(vehicles, null, 2).replace(/"disponible"/g, 'VehicleStatus.Available')};

export const requests: TransportRequest[] = ${JSON.stringify(requestsData.slice(0, 50), null, 2) // Limitar a 50 solicitudes
  .replace(/"completado"/g, 'RequestStatus.Completed')
  .replace(/"pendiente"/g, 'RequestStatus.Pending')
  .replace(/"en_progreso"/g, 'RequestStatus.InProgress')
  .replace(/"aprobado"/g, 'RequestStatus.Approved')};

export const maintenance: MaintenanceRecord[] = [
  { id: 'm1', vehicleId: 'v1', date: '2024-07-25', description: 'Cambio de aceite y filtros', cost: 150 },
  { id: 'm2', vehicleId: 'v2', date: '2024-06-10', description: 'Revisión de frenos', cost: 250 },
  { id: 'm3', vehicleId: 'v3', date: '2024-08-01', description: 'Mantenimiento preventivo', cost: 300 },
];

export const surveys: Survey[] = ${JSON.stringify(surveysData.slice(0, 30), null, 2)}; // Limitar a 30 encuestas

export const allData = {
    drivers,
    vehicles,
    requests,
    maintenance,
    surveys
}
`;

// Guardar el archivo
const outputPath = join(__dirname, '../data/mockData.ts');
fs.writeFileSync(outputPath, mockDataContent);

console.log(`\n✅ Archivo mockData.ts actualizado exitosamente en: ${outputPath}`);
console.log('\nPrimeros 3 conductores:');
console.log(JSON.stringify(drivers.slice(0, 3), null, 2));
console.log('\nPrimeros 3 vehículos:');
console.log(JSON.stringify(vehicles.slice(0, 3), null, 2));

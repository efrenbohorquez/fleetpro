/**
 * Script para extraer datos de las hojas de vida de vehículos desde archivos Excel
 * Los datos se extraen de las carpetas organizadas por marca/modelo
 */

import * as XLSX from 'xlsx';
import * as fs from 'fs';
import * as path from 'path';

interface VehicleExcelData {
  plate: string;
  make: string;
  model: string;
  type?: string;
  color?: string;
  engineNumber?: string;
  chassisNumber?: string;
  cylinderCapacity?: string;
  serialNumber?: string;
  bodyType?: string;
  transitLicense?: string;
  capacity?: number;
  fuelType?: string;
  year?: number;
  filePath: string;
}

// Mapeo de nombres de columnas en Excel a propiedades
const COLUMN_MAPPING: Record<string, keyof VehicleExcelData> = {
  'PLACA': 'plate',
  'MARCA': 'make',
  'LÍNEA': 'model',
  'LINEA': 'model',
  'TIPO': 'type',
  'COLOR': 'color',
  'NÚMERO DE MOTOR': 'engineNumber',
  'NUMERO DE MOTOR': 'engineNumber',
  'NÚMERO DE CHASIS': 'chassisNumber',
  'NUMERO DE CHASIS': 'chassisNumber',
  'CILINDRAJE': 'cylinderCapacity',
  'SERIE No.': 'serialNumber',
  'SERIE NO': 'serialNumber',
  'TIPO CARROCERÍA': 'bodyType',
  'TIPO CARROCERIA': 'bodyType',
  'LICENCIA TRÁNSITO No.': 'transitLicense',
  'LICENCIA TRANSITO NO': 'transitLicense',
  'No. DE PASAJEROS': 'capacity',
  'NO DE PASAJEROS': 'capacity',
  'TIPO COMBUSTIBLE': 'fuelType',
  'TIPO COMBUSTIBLE:': 'fuelType',
  'AÑO': 'year',
  'ANO': 'year',
};

/**
 * Lee un archivo Excel y extrae los datos del vehículo
 */
function readVehicleExcel(filePath: string): VehicleExcelData | null {
  try {
    console.log(`\n📄 Leyendo archivo: ${filePath}`);
    
    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    
    // Convertir a JSON
    const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 }) as string[][];
    
    const vehicleData: Partial<VehicleExcelData> = {
      filePath: filePath
    };

    // Buscar datos en las primeras filas
    for (let i = 0; i < Math.min(20, data.length); i++) {
      const row = data[i];
      
      for (let j = 0; j < row.length - 1; j++) {
        const cell = String(row[j] || '').trim().toUpperCase();
        const value = String(row[j + 1] || '').trim();
        
        // Buscar coincidencias con el mapeo
        for (const [excelColumn, property] of Object.entries(COLUMN_MAPPING)) {
          if (cell.includes(excelColumn.toUpperCase()) && value) {
            if (property === 'capacity' || property === 'year') {
              vehicleData[property] = parseInt(value) || undefined;
            } else {
              (vehicleData as any)[property] = value;
            }
            console.log(`  ✓ ${excelColumn}: ${value}`);
          }
        }
      }
    }

    // Validar que al menos tenga placa
    if (!vehicleData.plate) {
      console.log('  ⚠️ No se encontró la placa en el archivo');
      return null;
    }

    return vehicleData as VehicleExcelData;
  } catch (error) {
    console.error(`  ❌ Error leyendo archivo ${filePath}:`, error);
    return null;
  }
}

/**
 * Escanea un directorio y sus subdirectorios buscando archivos Excel
 */
function scanDirectory(dirPath: string): VehicleExcelData[] {
  const results: VehicleExcelData[] = [];
  
  try {
    const items = fs.readdirSync(dirPath);
    
    for (const item of items) {
      const fullPath = path.join(dirPath, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        // Recursivamente escanear subdirectorios
        results.push(...scanDirectory(fullPath));
      } else if (item.match(/\.(xlsx|xls)$/i)) {
        // Procesar archivo Excel
        const vehicleData = readVehicleExcel(fullPath);
        if (vehicleData) {
          results.push(vehicleData);
        }
      }
    }
  } catch (error) {
    console.error(`Error escaneando directorio ${dirPath}:`, error);
  }
  
  return results;
}

/**
 * Función principal
 */
function main() {
  console.log('🚗 Iniciando extracción de datos de vehículos...\n');
  
  const baseDir = path.join(__dirname, '..', 'data', 'Hoja de Vida Vehículos', 'SOPORTES UNIFICADOS');
  
  if (!fs.existsSync(baseDir)) {
    console.error(`❌ No se encontró el directorio: ${baseDir}`);
    return;
  }
  
  console.log(`📂 Escaneando directorio: ${baseDir}\n`);
  
  const vehiclesData = scanDirectory(baseDir);
  
  console.log(`\n✅ Extracción completada: ${vehiclesData.length} vehículos encontrados\n`);
  
  // Guardar resultados en JSON
  const outputPath = path.join(__dirname, '..', 'data', 'extracted_vehicles.json');
  fs.writeFileSync(outputPath, JSON.stringify(vehiclesData, null, 2), 'utf-8');
  
  console.log(`💾 Datos guardados en: ${outputPath}\n`);
  
  // Mostrar resumen
  console.log('📊 Resumen por marca:');
  const byMake = vehiclesData.reduce((acc, v) => {
    acc[v.make] = (acc[v.make] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  Object.entries(byMake).forEach(([make, count]) => {
    console.log(`  ${make}: ${count} vehículo(s)`);
  });
}

// Ejecutar
if (require.main === module) {
  main();
}

export { readVehicleExcel, scanDirectory };
export type { VehicleExcelData };

const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

const vehiclesDir = path.join(__dirname, '../data/Hoja de Vida Vehículos');

// Función para extraer datos del Excel
function extractVehicleData(filePath) {
  try {
    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    
    // Convertir a JSON
    const data = XLSX.utils.sheet_to_json(worksheet, { header: 1, defval: '' });
    
    const vehicleData = {
      plate: ''
    };

    // Buscar información en el Excel
    for (let i = 0; i < data.length && i < 50; i++) {
      const row = data[i];
      const firstCell = String(row[0] || '').toLowerCase();
      const secondCell = String(row[1] || '');
      
      if (firstCell.includes('plac')) {
        vehicleData.plate = secondCell.trim();
      }
      if (firstCell.includes('marc') || firstCell.includes('make')) {
        vehicleData.make = secondCell.trim();
      }
      if (firstCell.includes('línea') && !firstCell.includes('año')) {
        vehicleData.model = secondCell.trim();
      }
      if (firstCell.includes('año') || firstCell.includes('model')) {
        const year = parseInt(secondCell);
        if (!isNaN(year) && year > 1990 && year < 2030) {
          vehicleData.year = year;
        }
      }
      if (firstCell.includes('vin') || firstCell.includes('serie') || firstCell.includes('número de serie')) {
        vehicleData.vin = secondCell.trim();
      }
      if (firstCell.includes('kilometr') || firstCell.includes('mileage') || firstCell.includes('odómetro')) {
        const mileage = parseInt(String(secondCell).replace(/[^0-9]/g, ''));
        if (!isNaN(mileage)) {
          vehicleData.mileage = mileage;
        }
      }
      if (firstCell.includes('color')) {
        vehicleData.color = secondCell.trim();
      }
      if (firstCell.includes('capacidad') || firstCell.includes('pasajeros')) {
        const capacity = parseInt(secondCell);
        if (!isNaN(capacity)) {
          vehicleData.capacity = capacity;
        }
      }
      if (firstCell.includes('combustible') || firstCell.includes('fuel')) {
        vehicleData.fuelType = secondCell.trim();
      }
      if (firstCell.includes('número') && firstCell.includes('motor')) {
        vehicleData.engineNumber = secondCell.trim();
      }
      if (firstCell.includes('número') && firstCell.includes('chasis')) {
        vehicleData.chassisNumber = secondCell.trim();
      }
      if (firstCell.includes('propietario') || firstCell.includes('owner')) {
        vehicleData.owner = secondCell.trim();
      }
    }
    
    return vehicleData;
  } catch (error) {
    console.error(`Error reading ${filePath}:`, error.message);
    return null;
  }
}

// Leer todos los archivos Excel
const files = fs.readdirSync(vehiclesDir).filter(f => f.endsWith('.xlsx') && !f.startsWith('~$'));

const vehiclesData = [];

files.forEach(file => {
  const filePath = path.join(vehiclesDir, file);
  const data = extractVehicleData(filePath);
  if (data) {
    vehiclesData.push(data);
    console.log(`\n=== ${file} ===`);
    console.log(JSON.stringify(data, null, 2));
  }
});

// Guardar resultado
const outputPath = path.join(__dirname, '../data/vehiclesExtractedData.json');
fs.writeFileSync(outputPath, JSON.stringify(vehiclesData, null, 2));
console.log(`\n✅ Datos extraídos guardados en: ${outputPath}`);
console.log(`📊 Total de vehículos procesados: ${vehiclesData.length}`);

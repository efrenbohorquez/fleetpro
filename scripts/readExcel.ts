import * as XLSX from 'xlsx';
import * as fs from 'fs';
import * as path from 'path';

// Leer el archivo Excel
const workbook = XLSX.readFile(path.join(__dirname, '../data/encuesta_satisfaccion.xlsx'));

console.log('Hojas disponibles:', workbook.SheetNames);

// Procesar cada hoja
workbook.SheetNames.forEach(sheetName => {
  console.log(`\n=== Hoja: ${sheetName} ===`);
  const worksheet = workbook.Sheets[sheetName];
  const data = XLSX.utils.sheet_to_json(worksheet, { defval: '' });
  console.log(JSON.stringify(data, null, 2));
});

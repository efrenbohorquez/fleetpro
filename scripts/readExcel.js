import XLSX from 'xlsx';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Leer el archivo Excel
const workbook = XLSX.readFile(join(__dirname, '../data/encuesta_satisfaccion.xlsx'));

console.log('Hojas disponibles:', workbook.SheetNames);

// Procesar cada hoja
workbook.SheetNames.forEach(sheetName => {
  console.log(`\n=== Hoja: ${sheetName} ===`);
  const worksheet = workbook.Sheets[sheetName];
  const data = XLSX.utils.sheet_to_json(worksheet, { defval: '' });
  console.log(JSON.stringify(data, null, 2));
});

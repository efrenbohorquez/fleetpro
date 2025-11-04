import XLSX from 'xlsx';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const excelPath = join(__dirname, '../data/excel-imports/solicitud-transporte-1-35.xlsx');

console.log('📂 Leyendo archivo:', excelPath);
console.log('');

try {
  const workbook = XLSX.readFile(excelPath);
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  const data = XLSX.utils.sheet_to_json(worksheet);

  console.log('=== COLUMNAS DEL EXCEL ===');
  console.log('');
  if (data.length > 0) {
    const columns = Object.keys(data[0]);
    columns.forEach((col, idx) => {
      console.log(`${idx + 1}. "${col}"`);
    });

    console.log('');
    console.log(`Total de columnas: ${columns.length}`);
    console.log(`Total de filas: ${data.length}`);
    console.log('');
    console.log('=== PRIMERA FILA DE EJEMPLO ===');
    console.log(JSON.stringify(data[0], null, 2));
    console.log('');
    console.log('=== SEGUNDA FILA DE EJEMPLO ===');
    if (data.length > 1) {
      console.log(JSON.stringify(data[1], null, 2));
    }
  } else {
    console.log('⚠️ El archivo no tiene datos');
  }
} catch (error) {
  console.error('❌ Error leyendo archivo:', error.message);
}

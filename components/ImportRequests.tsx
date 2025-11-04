import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { TransportRequest, RequestStatus } from '../types';

interface ImportRequestsProps {
  onImport: (requests: Omit<TransportRequest, 'id'>[]) => void;
  onClose: () => void;
}

const ImportRequests: React.FC<ImportRequestsProps> = ({ onImport, onClose }) => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<any[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string>('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setError('');
      processFile(selectedFile);
    }
  };

  const processFile = async (file: File) => {
    setIsProcessing(true);
    try {
      const data = await file.arrayBuffer();
      const workbook = XLSX.read(data);
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);

      console.log('📊 Datos del Excel:', jsonData);
      setPreview(jsonData.slice(0, 5)); // Mostrar primeras 5 filas
      setIsProcessing(false);
    } catch (err) {
      console.error('Error procesando archivo:', err);
      setError('Error al leer el archivo. Verifica que sea un archivo Excel válido.');
      setIsProcessing(false);
    }
  };

  const mapFormDataToRequest = (row: any): Omit<TransportRequest, 'id'> => {
    // Mapeo de columnas de Microsoft Forms a nuestro sistema
    // Columnas reales del Excel:
    // ID, Start time, Completion time, Email, DEPENDENCIA, TELÉFONO DE CONTACTO,
    // NOMBRE SOLICITANTE, CORREO INSTITUCIONAL, FECHA DEL SERVICIO,
    // HORA INICIO, HORA FINALIZACIÓN, DESCRIPCIÓN DEL SERVICIO
    
    return {
      requester: row['NOMBRE SOLICITANTE'] || row['Nombre del Solicitante'] || row['Nombre'] || '',
      requesterEmail: row['CORREO INSTITUCIONAL'] || row['Email'] || row['Correo electrónico'] || '',
      department: row['DEPENDENCIA'] || row['Dependencia'] || row['Área'] || '',
      departmentEmail: row['CORREO INSTITUCIONAL'] || row['Email de la Dependencia'] || '',
      date: formatDate(row['Start time'] || row['Marca temporal'] || new Date().toISOString()),
      departureDate: formatDate(row[' FECHA DEL SERVICIO'] || row['FECHA DEL SERVICIO'] || row['Fecha de Salida'] || ''),
      origin: row['Origen'] || row['Lugar de Origen'] || 'Personería Distrital',
      destination: row['Destino'] || row['Lugar de Destino'] || 'Por definir',
      passengers: parseInt(row['Número de Pasajeros'] || row['Pasajeros'] || '1'),
      purpose: row['DESCRIPCIÓN DEL SERVICIO'] || row['Motivo del Desplazamiento'] || row['Motivo'] || '',
      observations: `Hora inicio: ${row['HORA INICIO'] || 'N/A'} - Hora fin: ${row['HORA FINALIZACIÓN'] || 'N/A'}${row['TELÉFONO DE CONTACTO'] ? ` - Tel: ${row['TELÉFONO DE CONTACTO']}` : ''}`,
      status: RequestStatus.Pending,
    };
  };

  const formatDate = (dateStr: string): string => {
    if (!dateStr) return new Date().toISOString().split('T')[0];
    
    try {
      // Si viene de Excel como número de serie
      if (typeof dateStr === 'number') {
        const date = XLSX.SSF.parse_date_code(dateStr);
        return `${date.y}-${String(date.m).padStart(2, '0')}-${String(date.d).padStart(2, '0')}`;
      }
      
      // Si es string, intentar parsearlo
      const date = new Date(dateStr);
      if (!isNaN(date.getTime())) {
        return date.toISOString().split('T')[0];
      }
    } catch (e) {
      console.error('Error formateando fecha:', e);
    }
    
    return new Date().toISOString().split('T')[0];
  };

  const handleImport = () => {
    if (preview.length === 0) {
      setError('No hay datos para importar');
      return;
    }

    try {
      const mappedRequests = preview.map(mapFormDataToRequest);
      console.log('✅ Solicitudes mapeadas:', mappedRequests);
      onImport(mappedRequests);
      onClose();
    } catch (err) {
      console.error('Error importando:', err);
      setError('Error al importar las solicitudes. Verifica el formato del archivo.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-bold">📥 Importar Solicitudes desde Microsoft Forms</h2>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 text-2xl font-bold"
          >
            ×
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          {/* Selector de archivo */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              📂 Seleccionar archivo Excel de Microsoft Forms
            </label>
            <input
              type="file"
              accept=".xlsx,.xls"
              onChange={handleFileChange}
              title="Seleccionar archivo Excel"
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none p-2"
            />
            <p className="mt-2 text-xs text-gray-500">
              Ubicación: <code className="bg-gray-100 px-2 py-1 rounded">D:\Solicitud transporte personería (1-35).xlsx</code>
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              ⚠️ {error}
            </div>
          )}

          {/* Procesando */}
          {isProcessing && (
            <div className="mb-4 bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded">
              ⏳ Procesando archivo...
            </div>
          )}

          {/* Vista previa */}
          {preview.length > 0 && (
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">
                👁️ Vista Previa (primeras 5 solicitudes)
              </h3>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 overflow-x-auto">
                <table className="w-full text-xs">
                  <thead className="bg-gray-200">
                    <tr>
                      <th className="px-2 py-2 text-left">Solicitante</th>
                      <th className="px-2 py-2 text-left">Dependencia</th>
                      <th className="px-2 py-2 text-left">Origen</th>
                      <th className="px-2 py-2 text-left">Destino</th>
                      <th className="px-2 py-2 text-left">Pasajeros</th>
                      <th className="px-2 py-2 text-left">Motivo</th>
                    </tr>
                  </thead>
                  <tbody>
                    {preview.map((row, idx) => {
                      const mapped = mapFormDataToRequest(row);
                      return (
                        <tr key={idx} className="border-b border-gray-200">
                          <td className="px-2 py-2">{mapped.requester}</td>
                          <td className="px-2 py-2">{mapped.department}</td>
                          <td className="px-2 py-2">{mapped.origin}</td>
                          <td className="px-2 py-2">{mapped.destination}</td>
                          <td className="px-2 py-2">{mapped.passengers}</td>
                          <td className="px-2 py-2 truncate max-w-xs">{mapped.purpose}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Instrucciones de mapeo */}
              <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h4 className="font-bold text-yellow-900 mb-2">⚙️ Mapeo de Columnas</h4>
                <p className="text-sm text-yellow-800 mb-2">
                  Si los datos no se ven correctamente, verifica que las columnas del Excel coincidan con:
                </p>
                <ul className="text-xs text-yellow-800 space-y-1">
                  <li>• <strong>Nombre del Solicitante</strong> o <strong>Nombre</strong></li>
                  <li>• <strong>Correo electrónico</strong> o <strong>Email</strong></li>
                  <li>• <strong>Dependencia</strong> o <strong>Área</strong></li>
                  <li>• <strong>Origen</strong> o <strong>Lugar de Origen</strong></li>
                  <li>• <strong>Destino</strong> o <strong>Lugar de Destino</strong></li>
                  <li>• <strong>Número de Pasajeros</strong> o <strong>Pasajeros</strong></li>
                  <li>• <strong>Motivo del Desplazamiento</strong> o <strong>Motivo</strong></li>
                  <li>• <strong>Fecha de Salida</strong> o <strong>Fecha programada</strong></li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Botones de acción */}
        <div className="bg-gray-50 px-6 py-4 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 font-medium"
          >
            Cancelar
          </button>
          <button
            onClick={handleImport}
            disabled={preview.length === 0}
            className={`px-4 py-2 rounded-md font-medium ${
              preview.length === 0
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            📥 Importar {preview.length} Solicitud{preview.length !== 1 ? 'es' : ''}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImportRequests;

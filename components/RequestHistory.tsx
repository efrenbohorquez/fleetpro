import React, { useState, useEffect } from 'react';
import { TransportRequest, RequestStatus, Vehicle, Driver } from '../types';
import { Modal } from './common/Modal';
import { loadRequestsHistory } from '../services/storageService';
import { FileText } from './icons';

interface RequestHistoryProps {
  vehicles: Vehicle[];
  drivers: Driver[];
}

const RequestHistory: React.FC<RequestHistoryProps> = ({ vehicles, drivers }) => {
  const [historyRequests, setHistoryRequests] = useState<TransportRequest[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<TransportRequest | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<RequestStatus | 'Todos'>('Todos');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = () => {
    const history = loadRequestsHistory() || [];
    // Ordenar por fecha más reciente
    const sorted = history.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return dateB - dateA;
    });
    setHistoryRequests(sorted);
  };

  const getVehicleInfo = (vehicleId?: string) => {
    if (!vehicleId) return 'Sin asignar';
    const vehicle = vehicles.find(v => v.id === vehicleId);
    return vehicle ? `${vehicle.model} - ${vehicle.plate}` : 'Sin asignar';
  };

  const getDriverInfo = (driverId?: string) => {
    if (!driverId) return 'Sin asignar';
    const driver = drivers.find(d => d.id === driverId);
    return driver ? driver.name : 'Sin asignar';
  };

  const handleViewDetail = (request: TransportRequest) => {
    setSelectedRequest(request);
    setShowDetailModal(true);
  };

  const exportToCSV = () => {
    const headers = ['ID', 'Solicitante', 'Dependencia', 'Fecha', 'Origen', 'Destino', 'Vehículo', 'Conductor', 'Estado'];
    const rows = filteredRequests.map(req => [
      req.id,
      req.requester,
      req.department,
      req.date,
      req.origin,
      req.destination,
      getVehicleInfo(req.vehicleId),
      getDriverInfo(req.driverId),
      req.status
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `historial_solicitudes_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  const filteredRequests = historyRequests.filter(request => {
    const matchesSearch = 
      request.requester.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.destination.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'Todos' || request.status === filterStatus;
    
    const requestDate = new Date(request.date);
    const matchesDateFrom = !dateFrom || requestDate >= new Date(dateFrom);
    const matchesDateTo = !dateTo || requestDate <= new Date(dateTo);
    
    return matchesSearch && matchesStatus && matchesDateFrom && matchesDateTo;
  });

  const getStatusColor = (status: RequestStatus) => {
    switch (status) {
      case RequestStatus.Completed: return 'bg-green-100 text-green-800';
      case RequestStatus.Canceled: return 'bg-red-100 text-red-800';
      case RequestStatus.Approved: return 'bg-blue-100 text-blue-800';
      case RequestStatus.InProgress: return 'bg-indigo-100 text-indigo-800';
      default: return 'bg-yellow-100 text-yellow-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 mb-8">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">📚 Historial de Solicitudes</h1>
              <p className="text-sm text-gray-500 mt-1">Consulta de solicitudes completadas y canceladas</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-blue-600">{historyRequests.length}</p>
              <p className="text-sm text-gray-500">Total en historial</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-8">
        {/* Filtros */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                🔍 Buscar
              </label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Solicitante, dependencia, destino..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Estado</label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as RequestStatus | 'Todos')}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="Todos">Todos</option>
                <option value={RequestStatus.Completed}>Completadas</option>
                <option value={RequestStatus.Canceled}>Canceladas</option>
                <option value={RequestStatus.Approved}>Aprobadas</option>
                <option value={RequestStatus.InProgress}>En Progreso</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Desde</label>
              <input
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Hasta</label>
              <input
                type="date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-600">
              Mostrando <span className="font-semibold">{filteredRequests.length}</span> de <span className="font-semibold">{historyRequests.length}</span> solicitudes
            </p>
            <button
              onClick={exportToCSV}
              className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              📥 Exportar CSV
            </button>
          </div>
        </div>

        {/* Tabla de Historial */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fecha</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Solicitante</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Dependencia</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Destino</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Estado</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Acciones</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredRequests.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                      No se encontraron solicitudes en el historial
                    </td>
                  </tr>
                ) : (
                  filteredRequests.map((request) => (
                    <tr key={request.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 text-sm text-gray-900">{request.id}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{request.date}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{request.requester}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{request.department}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{request.destination}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(request.status)}`}>
                          {request.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleViewDetail(request)}
                          className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                        >
                          Ver Detalle
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal de Detalle */}
      {showDetailModal && selectedRequest && (
        <Modal title="Detalle de Solicitud" onClose={() => setShowDetailModal(false)} isOpen={showDetailModal}>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Solicitante</p>
                <p className="text-base text-gray-900">{selectedRequest.requester}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Dependencia</p>
                <p className="text-base text-gray-900">{selectedRequest.department}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Fecha de Solicitud</p>
                <p className="text-base text-gray-900">{selectedRequest.date}</p>
              </div>
              {selectedRequest.departureDate && (
                <div>
                  <p className="text-sm font-medium text-teal-600">Fecha de Salida</p>
                  <p className="text-base text-teal-700">{selectedRequest.departureDate}</p>
                </div>
              )}
            </div>

            <div className="border-t pt-4">
              <div className="mb-3">
                <p className="text-sm font-medium text-gray-500">Origen</p>
                <p className="text-base text-gray-900">{selectedRequest.origin}</p>
              </div>
              <div className="mb-3">
                <p className="text-sm font-medium text-gray-500">Destino</p>
                <p className="text-base text-gray-900">{selectedRequest.destination}</p>
              </div>
              <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                <p className="text-sm font-medium text-yellow-700 mb-1">📝 Motivo del Viaje</p>
                <p className="text-base font-bold text-gray-900">{selectedRequest.purpose || 'No especificado'}</p>
              </div>
            </div>

            <div className="border-t pt-4">
              <div className="mb-3">
                <p className="text-sm font-medium text-gray-500">Vehículo Asignado</p>
                <p className="text-base text-gray-900">{getVehicleInfo(selectedRequest.vehicleId)}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Conductor Asignado</p>
                <p className="text-base text-gray-900">{getDriverInfo(selectedRequest.driverId)}</p>
              </div>
            </div>

            <div className="border-t pt-4">
              <p className="text-sm font-medium text-gray-500 mb-2">Estado Final</p>
              <span className={`inline-block px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(selectedRequest.status)}`}>
                {selectedRequest.status}
              </span>
            </div>

            <div className="flex justify-end pt-4">
              <button
                onClick={() => setShowDetailModal(false)}
                className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                Cerrar
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default RequestHistory;

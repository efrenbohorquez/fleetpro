import React, { useState } from 'react';
import { TransportRequest, RequestStatus, Vehicle, Driver, VehicleStatus, DriverStatus } from '../types';
import { Modal } from './common/Modal';
import { Car, FileText, ClipboardList } from './icons';
import { DEPARTMENTS_LIST } from '../constants';
import { 
  notifyRequesterAssignment, 
  notifyDriverAssignment, 
  notifyApproval,
  notifyCancellation,
  notifyCompletion 
} from '../services/notificationService';

interface VehicleRequestProps {
  requests: TransportRequest[];
  setRequests: React.Dispatch<React.SetStateAction<TransportRequest[]>>;
  vehicles: Vehicle[];
  setVehicles: React.Dispatch<React.SetStateAction<Vehicle[]>>;
  drivers: Driver[];
  setDrivers: React.Dispatch<React.SetStateAction<Driver[]>>;
}

type ViewMode = 'menu' | 'newRequest' | 'viewRequests';

const VehicleRequest: React.FC<VehicleRequestProps> = ({ requests, setRequests, vehicles, setVehicles, drivers, setDrivers }) => {
  const [viewMode, setViewMode] = useState<ViewMode>('menu');
  const [selectedRequest, setSelectedRequest] = useState<TransportRequest | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);

  const handleViewDetail = (request: TransportRequest) => {
    setSelectedRequest(request);
    setShowDetailModal(true);
  };

  const handleAssignVehicle = (request: TransportRequest) => {
    setSelectedRequest(request);
    setShowAssignModal(true);
  };

  const handleAssignmentComplete = (
    updatedRequest: TransportRequest,
    vehicleId: string,
    driverId: string
  ) => {
    // Actualizar la solicitud
    setRequests(prev => prev.map(r => r.id === updatedRequest.id ? updatedRequest : r));

    // Actualizar estado del vehículo a "En Uso"
    setVehicles(prev => prev.map(v => 
      v.id === vehicleId ? { ...v, status: VehicleStatus.InUse } : v
    ));

    // Actualizar estado del conductor a "En Viaje"
    setDrivers(prev => prev.map(d => 
      d.id === driverId ? { ...d, status: DriverStatus.OnTrip } : d
    ));

    // Enviar notificaciones
    const vehicle = vehicles?.find(v => v.id === vehicleId);
    const driver = drivers?.find(d => d.id === driverId);

    if (vehicle && driver) {
      notifyRequesterAssignment(updatedRequest, vehicle, driver);
      notifyDriverAssignment(updatedRequest, driver);
    }

    setShowAssignModal(false);
    setSelectedRequest(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 mb-8">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Solicitud de Vehículos</h1>
              <p className="text-sm text-gray-500 mt-1">Personería de Bogotá - Sistema de Gestión de Flota</p>
            </div>
            {viewMode !== 'menu' && (
              <button
                onClick={() => setViewMode('menu')}
                className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Volver al Menú
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {viewMode === 'menu' && <MenuView onNavigate={setViewMode} requestCount={requests.length} />}
        {viewMode === 'newRequest' && <NewRequestView requests={requests} setRequests={setRequests} onBack={() => setViewMode('menu')} />}
        {viewMode === 'viewRequests' && (
          <ViewRequestsView 
            requests={requests}
            setRequests={setRequests}
            vehicles={vehicles} 
            drivers={drivers} 
            onViewDetail={handleViewDetail}
            onAssignVehicle={handleAssignVehicle}
          />
        )}
      </div>

      {showDetailModal && selectedRequest && (
        <RequestDetailModal
          isOpen={showDetailModal}
          request={selectedRequest}
          vehicles={vehicles}
          drivers={drivers}
          onClose={() => {
            setShowDetailModal(false);
            setSelectedRequest(null);
          }}
        />
      )}

      {showAssignModal && selectedRequest && (
        <AssignmentModal
          isOpen={showAssignModal}
          request={selectedRequest}
          vehicles={vehicles}
          drivers={drivers}
          onClose={() => {
            setShowAssignModal(false);
            setSelectedRequest(null);
          }}
          onAssign={handleAssignmentComplete}
        />
      )}
    </div>
  );
};

interface MenuViewProps {
  onNavigate: (view: ViewMode) => void;
  requestCount: number;
}

const MenuView: React.FC<MenuViewProps> = ({ onNavigate, requestCount }) => {
  const menuOptions = [
    {
      id: 'newRequest',
      title: 'Solicitud',
      subtitle: 'Crear nueva solicitud de vehículo',
      icon: Car,
      color: 'from-cyan-500 to-blue-600',
      hoverColor: 'hover:from-cyan-600 hover:to-blue-700',
      view: 'newRequest' as ViewMode,
    },
    {
      id: 'viewRequests',
      title: 'Consulta',
      subtitle: `Ver mis solicitudes (${requestCount})`,
      icon: ClipboardList,
      color: 'from-teal-500 to-cyan-600',
      hoverColor: 'hover:from-teal-600 hover:to-cyan-700',
      view: 'viewRequests' as ViewMode,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto py-12">
      {menuOptions.map((option) => (
        <button
          key={option.id}
          onClick={() => onNavigate(option.view)}
          className={`group relative bg-gradient-to-br ${option.color} ${option.hoverColor} p-8 rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300`}
        >
          <div className="flex flex-col items-center text-white">
            <div className="bg-white/20 p-6 rounded-full mb-4 group-hover:bg-white/30 transition-colors">
              <option.icon className="w-16 h-16" />
            </div>
            <h3 className="text-2xl font-bold mb-2">{option.title}</h3>
            <p className="text-sm text-white/90">{option.subtitle}</p>
          </div>
          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </button>
      ))}
    </div>
  );
};

interface NewRequestViewProps {
  requests: TransportRequest[];
  setRequests: React.Dispatch<React.SetStateAction<TransportRequest[]>>;
  onBack: () => void;
}

const NewRequestView: React.FC<NewRequestViewProps> = ({ requests, setRequests, onBack }) => {
  const [formData, setFormData] = useState({
    requester: '',
    requesterEmail: '',
    department: '',
    departmentEmail: '',
    date: new Date().toISOString().split('T')[0],
    departureDate: '', // Fecha de salida programada
    time: '',
    origin: '',
    destination: '',
    passengers: 1,
    purpose: '',
    observations: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === 'passengers' ? parseInt(value) || 1 : value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const newRequest: TransportRequest = {
        id: `r${Date.now()}`,
        requester: formData.requester,
        requesterEmail: formData.requesterEmail,
        department: formData.department,
        departmentEmail: formData.departmentEmail,
        date: formData.date,
        departureDate: formData.departureDate,
        origin: formData.origin,
        destination: formData.destination,
        passengers: formData.passengers,
        status: RequestStatus.Pending,
      };

      setRequests(prev => [...prev, newRequest]);
      setIsSubmitting(false);
      setShowSuccess(true);

      setTimeout(() => {
        setShowSuccess(false);
        onBack();
      }, 2000);
    }, 1000);
  };

  const handleReset = () => {
    setFormData({
      requester: '',
      requesterEmail: '',
      department: '',
      departmentEmail: '',
      date: new Date().toISOString().split('T')[0],
      departureDate: '',
      time: '',
      origin: '',
      destination: '',
      passengers: 1,
      purpose: '',
      observations: '',
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Form Header */}
        <div className="bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-6">
          <div className="flex items-center text-white">
            <Car className="w-8 h-8 mr-3" />
            <div>
              <h2 className="text-2xl font-bold">Nueva Solicitud de Vehículo</h2>
              <p className="text-sm text-blue-50 mt-1">Complete el formulario con los datos del servicio requerido</p>
            </div>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-8">
          {/* Información del Solicitante */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <span className="bg-cyan-100 text-cyan-700 rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm font-bold">1</span>
              Información del Solicitante
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre Completo <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="requester"
                  value={formData.requester}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  placeholder="Ej: Juan Pérez"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Correo del Solicitante <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="requesterEmail"
                  value={formData.requesterEmail}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  placeholder="Ej: juan.perez@personeriabogota.gov.co"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Dependencia <span className="text-red-500">*</span>
                </label>
                <select
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  required
                  title="Seleccione la dependencia solicitante"
                >
                  <option value="">Seleccione una dependencia...</option>
                  {DEPARTMENTS_LIST.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Correo de la Dependencia <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="departmentEmail"
                  value={formData.departmentEmail}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  placeholder="Ej: dependencia@personeriabogota.gov.co"
                  required
                />
              </div>
            </div>
          </div>

          {/* Detalles del Servicio */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <span className="bg-cyan-100 text-cyan-700 rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm font-bold">2</span>
              Detalles del Servicio
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fecha de Solicitud <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  required
                  title="Fecha en que se realiza la solicitud"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fecha de Salida Programada <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="departureDate"
                  value={formData.departureDate}
                  onChange={handleChange}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  required
                  title="Fecha programada para el servicio de transporte"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hora de Salida <span className="text-red-500">*</span>
                </label>
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  required
                  title="Hora programada de salida"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pasajeros <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="passengers"
                  value={formData.passengers}
                  onChange={handleChange}
                  min="1"
                  max="20"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  required
                  title="Número de pasajeros"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Punto de Origen <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="origin"
                  value={formData.origin}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  placeholder="Ej: Sede Personería Calle 7 # 6-54"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Punto de Destino <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="destination"
                  value={formData.destination}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  placeholder="Ej: Alcaldía Mayor de Bogotá"
                  required
                />
              </div>
            </div>
          </div>

          {/* Información Adicional */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <span className="bg-cyan-100 text-cyan-700 rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm font-bold">3</span>
              Información Adicional
            </h3>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Motivo del Desplazamiento
                </label>
                <input
                  type="text"
                  name="purpose"
                  value={formData.purpose}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  placeholder="Ej: Reunión, Capacitación, Diligencia judicial..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Observaciones
                </label>
                <textarea
                  name="observations"
                  value={formData.observations}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  placeholder="Información adicional relevante..."
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4 pt-6 border-t">
            <button
              type="button"
              onClick={handleReset}
              className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
            >
              Limpiar Formulario
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg hover:from-cyan-600 hover:to-blue-700 transition-all font-medium shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Enviando...
                </>
              ) : (
                'Enviar Solicitud'
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 max-w-md mx-4 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">¡Solicitud Enviada!</h3>
            <p className="text-gray-600">Su solicitud ha sido registrada exitosamente y será procesada a la brevedad.</p>
          </div>
        </div>
      )}
    </div>
  );
};

interface ViewRequestsViewProps {
  requests: TransportRequest[];
  setRequests: React.Dispatch<React.SetStateAction<TransportRequest[]>>;
  vehicles: Vehicle[];
  drivers: Driver[];
  onViewDetail: (request: TransportRequest) => void;
  onAssignVehicle: (request: TransportRequest) => void;
}

const ViewRequestsView: React.FC<ViewRequestsViewProps> = ({ 
  requests, 
  setRequests,
  vehicles, 
  drivers, 
  onViewDetail,
  onAssignVehicle
}) => {
  // Estados para filtros
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<RequestStatus | 'all'>('all');
  const [filterDateFrom, setFilterDateFrom] = useState('');
  const [filterDateTo, setFilterDateTo] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'status' | 'requester'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const statusConfig = {
    [RequestStatus.Pending]: { 
      label: 'Pendiente', 
      color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      icon: '⏳'
    },
    [RequestStatus.Approved]: { 
      label: 'Aprobada', 
      color: 'bg-blue-100 text-blue-800 border-blue-200',
      icon: '✓'
    },
    [RequestStatus.InProgress]: { 
      label: 'En Curso', 
      color: 'bg-indigo-100 text-indigo-800 border-indigo-200',
      icon: '🚗'
    },
    [RequestStatus.Completed]: { 
      label: 'Completada', 
      color: 'bg-green-100 text-green-800 border-green-200',
      icon: '✔'
    },
    [RequestStatus.Canceled]: { 
      label: 'Cancelada', 
      color: 'bg-red-100 text-red-800 border-red-200',
      icon: '✗'
    },
  };

  // Lógica de filtrado
  const filteredRequests = requests.filter(request => {
    // Filtro por búsqueda (nombre, departamento, destino)
    const matchesSearch = searchTerm === '' || 
      request.requester.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.origin.toLowerCase().includes(searchTerm.toLowerCase());

    // Filtro por estado
    const matchesStatus = filterStatus === 'all' || request.status === filterStatus;

    // Filtro por rango de fechas
    const matchesDateFrom = filterDateFrom === '' || request.date >= filterDateFrom;
    const matchesDateTo = filterDateTo === '' || request.date <= filterDateTo;

    return matchesSearch && matchesStatus && matchesDateFrom && matchesDateTo;
  });

  // Lógica de ordenamiento
  const sortedRequests = [...filteredRequests].sort((a, b) => {
    let comparison = 0;

    switch (sortBy) {
      case 'date':
        comparison = a.date.localeCompare(b.date);
        break;
      case 'status':
        comparison = a.status.localeCompare(b.status);
        break;
      case 'requester':
        comparison = a.requester.localeCompare(b.requester);
        break;
    }

    return sortOrder === 'asc' ? comparison : -comparison;
  });

  // Limpiar filtros
  const clearFilters = () => {
    setSearchTerm('');
    setFilterStatus('all');
    setFilterDateFrom('');
    setFilterDateTo('');
    setSortBy('date');
    setSortOrder('desc');
  };

  const getVehicleInfo = (vehicleId?: string) => {
    if (!vehicleId || !vehicles) return 'Sin asignar';
    const vehicle = vehicles.find(v => v.id === vehicleId);
    return vehicle ? `${vehicle.model} - ${vehicle.plate}` : 'Sin asignar';
  };

  const getDriverInfo = (driverId?: string) => {
    if (!driverId || !drivers) return 'Sin asignar';
    const driver = drivers.find(d => d.id === driverId);
    return driver ? driver.name : 'Sin asignar';
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-500 to-cyan-600 px-8 py-6">
          <div className="flex items-center justify-between text-white">
            <div className="flex items-center">
              <ClipboardList className="w-8 h-8 mr-3" />
              <div>
                <h2 className="text-2xl font-bold">Mis Solicitudes</h2>
                <p className="text-sm text-teal-50 mt-1">
                  {sortedRequests.length} de {requests.length} solicitudes
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filtros y Búsqueda */}
        <div className="bg-gray-50 border-b border-gray-200 p-6">
          {/* Barra de búsqueda */}
          <div className="mb-4">
            <div className="relative">
              <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar por solicitante, departamento, origen o destino..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Filtros avanzados */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            {/* Filtro por Estado */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Estado</label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as RequestStatus | 'all')}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
                title="Filtrar por estado de solicitud"
              >
                <option value="all">Todos los estados</option>
                <option value="Pendiente">Pendiente</option>
                <option value="Aprobada">Aprobada</option>
                <option value="En Progreso">En Progreso</option>
                <option value="Completada">Completada</option>
                <option value="Cancelada">Cancelada</option>
              </select>
            </div>

            {/* Fecha Desde */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Desde</label>
              <input
                type="date"
                value={filterDateFrom}
                onChange={(e) => setFilterDateFrom(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
                title="Fecha inicial del filtro"
              />
            </div>

            {/* Fecha Hasta */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Hasta</label>
              <input
                type="date"
                value={filterDateTo}
                onChange={(e) => setFilterDateTo(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
                title="Fecha final del filtro"
              />
            </div>

            {/* Ordenar por */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Ordenar por</label>
              <div className="flex space-x-2">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'date' | 'status' | 'requester')}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
                  title="Campo de ordenamiento"
                >
                  <option value="date">Fecha</option>
                  <option value="status">Estado</option>
                  <option value="requester">Solicitante</option>
                </select>
                <button
                  onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
                  className="px-3 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  title={sortOrder === 'asc' ? 'Ascendente' : 'Descendente'}
                >
                  <svg className={`w-4 h-4 text-gray-600 transition-transform ${sortOrder === 'desc' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Botones de acción */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">
                {searchTerm || filterStatus !== 'all' || filterDateFrom || filterDateTo ? (
                  <span className="font-medium text-teal-600">Filtros activos</span>
                ) : (
                  <span>Sin filtros aplicados</span>
                )}
              </span>
            </div>
            <button
              onClick={clearFilters}
              className="px-4 py-2 text-sm bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors flex items-center"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Limpiar Filtros
            </button>
          </div>
        </div>

        {/* Requests List */}
        <div className="p-6">
          {sortedRequests.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">
                {requests.length === 0 
                  ? 'No hay solicitudes registradas' 
                  : 'No se encontraron solicitudes con los filtros aplicados'}
              </p>
              <p className="text-gray-400 text-sm mt-2">
                {requests.length === 0 
                  ? 'Las solicitudes que cree aparecerán aquí' 
                  : 'Intente modificar los filtros de búsqueda'}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {sortedRequests.map((request) => {
                const status = statusConfig[request.status];
                return (
                  <div
                    key={request.id}
                    className="border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                  >
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center mb-2">
                            <h3 className="text-lg font-semibold text-gray-800 mr-3">
                              {request.requester}
                            </h3>
                            <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${status.color} flex items-center`}>
                              <span className="mr-1">{status.icon}</span>
                              {status.label}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-1">
                            <span className="font-medium">Dependencia:</span> {request.department}
                          </p>
                          {request.requesterEmail && (
                            <p className="text-sm text-gray-600 mb-1">
                              <span className="font-medium">Correo Solicitante:</span> {request.requesterEmail}
                            </p>
                          )}
                          {request.departmentEmail && (
                            <p className="text-sm text-gray-600">
                              <span className="font-medium">Correo Dependencia:</span> {request.departmentEmail}
                            </p>
                          )}
                        </div>
                        <div className="flex gap-2">
                          {request.status === RequestStatus.Approved && !request.vehicleId && (
                            <button
                              onClick={() => onAssignVehicle(request)}
                              className="px-4 py-2 text-sm bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors font-medium flex items-center"
                            >
                              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                              </svg>
                              Asignar
                            </button>
                          )}
                          <button
                            onClick={() => onViewDetail(request)}
                            className="px-4 py-2 text-sm bg-cyan-50 text-cyan-700 rounded-lg hover:bg-cyan-100 transition-colors font-medium"
                          >
                            Ver Detalles
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div className="flex items-start">
                          <svg className="w-5 h-5 text-gray-400 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <div>
                            <p className="text-xs text-gray-500">Fecha Solicitud</p>
                            <p className="text-sm font-medium text-gray-800">{request.date}</p>
                            {request.departureDate && (
                              <>
                                <p className="text-xs text-teal-600 font-semibold mt-1">🚗 Salida Programada</p>
                                <p className="text-sm font-bold text-teal-700">{request.departureDate}</p>
                              </>
                            )}
                          </div>
                        </div>
                        <div className="flex items-start">
                          <svg className="w-5 h-5 text-gray-400 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                          <div>
                            <p className="text-xs text-gray-500">Pasajeros</p>
                            <p className="text-sm font-medium text-gray-800">{request.passengers}</p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <svg className="w-5 h-5 text-gray-400 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <div>
                            <p className="text-xs text-gray-500">Destino</p>
                            <p className="text-sm font-medium text-gray-800 truncate max-w-xs">{request.destination}</p>
                          </div>
                        </div>
                      </div>

                      {(request.vehicleId || request.driverId) && (
                        <div className="border-t pt-4 mt-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex items-center bg-gray-50 rounded-lg p-3">
                              <Car className="w-5 h-5 text-gray-500 mr-3" />
                              <div>
                                <p className="text-xs text-gray-500">Vehículo Asignado</p>
                                <p className="text-sm font-medium text-gray-800">{getVehicleInfo(request.vehicleId)}</p>
                              </div>
                            </div>
                            <div className="flex items-center bg-gray-50 rounded-lg p-3">
                              <svg className="w-5 h-5 text-gray-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                              </svg>
                              <div>
                                <p className="text-xs text-gray-500">Conductor Asignado</p>
                                <p className="text-sm font-medium text-gray-800">{getDriverInfo(request.driverId)}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

interface RequestDetailModalProps {
  isOpen: boolean;
  request: TransportRequest;
  vehicles: Vehicle[];
  drivers: Driver[];
  onClose: () => void;
}

const RequestDetailModal: React.FC<RequestDetailModalProps> = ({ isOpen, request, vehicles, drivers, onClose }) => {
  const getVehicleInfo = (vehicleId?: string) => {
    if (!vehicleId || !vehicles) return 'Sin asignar';
    const vehicle = vehicles.find(v => v.id === vehicleId);
    return vehicle ? `${vehicle.model} - ${vehicle.plate}` : 'Sin asignar';
  };

  const getDriverInfo = (driverId?: string) => {
    if (!driverId || !drivers) return 'Sin asignar';
    const driver = drivers.find(d => d.id === driverId);
    return driver ? driver.name : 'Sin asignar';
  };

  return (
    <Modal title="Detalle de Solicitud" onClose={onClose} isOpen={isOpen}>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium text-gray-500">Solicitante</p>
            <p className="text-base text-gray-900">{request.requester}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Correo Solicitante</p>
            <p className="text-base text-gray-900">{request.requesterEmail || 'No especificado'}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Dependencia</p>
            <p className="text-base text-gray-900">{request.department}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Correo Dependencia</p>
            <p className="text-base text-gray-900">{request.departmentEmail || 'No especificado'}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Fecha de Solicitud</p>
            <p className="text-base text-gray-900">{request.date}</p>
          </div>
          {request.departureDate && (
            <div>
              <p className="text-sm font-medium text-teal-600">🚗 Fecha de Salida Programada</p>
              <p className="text-base font-bold text-teal-700">{request.departureDate}</p>
            </div>
          )}
          <div>
            <p className="text-sm font-medium text-gray-500">Pasajeros</p>
            <p className="text-base text-gray-900">{request.passengers}</p>
          </div>
        </div>

        <div className="border-t pt-4">
          <div className="mb-3">
            <p className="text-sm font-medium text-gray-500">Origen</p>
            <p className="text-base text-gray-900">{request.origin}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Destino</p>
            <p className="text-base text-gray-900">{request.destination}</p>
          </div>
        </div>

        <div className="border-t pt-4">
          <div className="mb-3">
            <p className="text-sm font-medium text-gray-500">Vehículo</p>
            <p className="text-base text-gray-900">{getVehicleInfo(request.vehicleId)}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Conductor</p>
            <p className="text-base text-gray-900">{getDriverInfo(request.driverId)}</p>
          </div>
        </div>

        <div className="border-t pt-4">
          <p className="text-sm font-medium text-gray-500 mb-2">Estado</p>
          <span className={`inline-block px-3 py-1 text-sm font-semibold rounded-full ${
            request.status === RequestStatus.Pending ? 'bg-yellow-100 text-yellow-800' :
            request.status === RequestStatus.Approved ? 'bg-blue-100 text-blue-800' :
            request.status === RequestStatus.InProgress ? 'bg-indigo-100 text-indigo-800' :
            request.status === RequestStatus.Completed ? 'bg-green-100 text-green-800' :
            'bg-red-100 text-red-800'
          }`}>
            {request.status}
          </span>
        </div>

        <div className="flex justify-end pt-4">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            Cerrar
          </button>
        </div>
      </div>
    </Modal>
  );
};

interface AssignmentModalProps {
  isOpen: boolean;
  request: TransportRequest;
  vehicles: Vehicle[];
  drivers: Driver[];
  onClose: () => void;
  onAssign: (updatedRequest: TransportRequest, vehicleId: string, driverId: string) => void;
}

const AssignmentModal: React.FC<AssignmentModalProps> = ({ 
  isOpen,
  request, 
  vehicles, 
  drivers, 
  onClose, 
  onAssign 
}) => {
  const [selectedVehicle, setSelectedVehicle] = useState('');
  const [selectedDriver, setSelectedDriver] = useState('');
  const [confirmAssignment, setConfirmAssignment] = useState(false);
  const [sendingNotifications, setSendingNotifications] = useState(false);

  // Filtrar vehículos y conductores disponibles
  const availableVehicles = vehicles.filter(v => v.status === VehicleStatus.Available);
  const availableDrivers = drivers.filter(d => d.status === DriverStatus.Available);

  const handleSubmit = () => {
    if (!selectedVehicle || !selectedDriver) {
      alert('Por favor seleccione un vehículo y un conductor');
      return;
    }

    setSendingNotifications(true);

    // Simular envío de notificaciones
    setTimeout(() => {
      const updatedRequest: TransportRequest = {
        ...request,
        vehicleId: selectedVehicle,
        driverId: selectedDriver,
        status: RequestStatus.InProgress,
      };

      onAssign(updatedRequest, selectedVehicle, selectedDriver);
      setSendingNotifications(false);
    }, 1500);
  };

  const selectedVehicleInfo = vehicles?.find(v => v.id === selectedVehicle);
  const selectedDriverInfo = drivers?.find(d => d.id === selectedDriver);

  return (
    <Modal title="Asignar Vehículo y Conductor" onClose={onClose} isOpen={isOpen}>
      <div className="space-y-6">
        {/* Información de la solicitud */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-semibold text-gray-800 mb-2 flex items-center">
            <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Detalles de la Solicitud
          </h3>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <span className="font-medium text-gray-600">Solicitante:</span>
              <p className="text-gray-800">{request.requester}</p>
            </div>
            <div>
              <span className="font-medium text-gray-600">Email Solicitante:</span>
              <p className="text-gray-800 text-xs">
                {request.requesterEmail || 'No especificado'}
              </p>
            </div>
            <div>
              <span className="font-medium text-gray-600">Dependencia:</span>
              <p className="text-gray-800">{request.department}</p>
            </div>
            <div>
              <span className="font-medium text-gray-600">Email Dependencia:</span>
              <p className="text-gray-800 text-xs">
                {request.departmentEmail || 'No especificado'}
              </p>
            </div>
            <div>
              <span className="font-medium text-gray-600">Fecha Solicitud:</span>
              <p className="text-gray-800">{request.date}</p>
            </div>
            {request.departureDate && (
              <div>
                <span className="font-medium text-teal-600">🚗 Fecha Salida:</span>
                <p className="text-teal-700 font-bold">{request.departureDate}</p>
              </div>
            )}
            <div>
              <span className="font-medium text-gray-600">Origen:</span>
              <p className="text-gray-800">{request.origin}</p>
            </div>
            <div>
              <span className="font-medium text-gray-600">Destino:</span>
              <p className="text-gray-800">{request.destination}</p>
            </div>
          </div>
        </div>

        {/* Selección de vehículo */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Seleccionar Vehículo
          </label>
          {availableVehicles.length === 0 ? (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-sm text-red-700">
              ⚠️ No hay vehículos disponibles en este momento
            </div>
          ) : (
            <select
              value={selectedVehicle}
              onChange={(e) => setSelectedVehicle(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              title="Seleccione un vehículo"
            >
              <option value="">-- Seleccione un vehículo --</option>
              {availableVehicles.map((vehicle) => (
                <option key={vehicle.id} value={vehicle.id}>
                  {vehicle.model} ({vehicle.year}) - {vehicle.plate}
                </option>
              ))}
            </select>
          )}
          {selectedVehicleInfo && (
            <div className="mt-2 p-3 bg-gray-50 rounded border border-gray-200">
              <div className="flex items-center text-sm">
                <Car className="w-5 h-5 text-gray-500 mr-2" />
                <div>
                  <p className="font-medium text-gray-800">
                    {selectedVehicleInfo.make} {selectedVehicleInfo.model}
                  </p>
                  <p className="text-gray-600">
                    Placa: {selectedVehicleInfo.plate} • Año: {selectedVehicleInfo.year}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Selección de conductor */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Seleccionar Conductor
          </label>
          {availableDrivers.length === 0 ? (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-sm text-red-700">
              ⚠️ No hay conductores disponibles en este momento
            </div>
          ) : (
            <select
              value={selectedDriver}
              onChange={(e) => setSelectedDriver(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              title="Seleccione un conductor"
            >
              <option value="">-- Seleccione un conductor --</option>
              {availableDrivers.map((driver) => (
                <option key={driver.id} value={driver.id}>
                  {driver.name} - Licencia: {driver.licenseNumber}
                </option>
              ))}
            </select>
          )}
          {selectedDriverInfo && (
            <div className="mt-2 p-3 bg-gray-50 rounded border border-gray-200">
              <div className="flex items-center text-sm">
                <svg className="w-5 h-5 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <div className="flex-1">
                  <p className="font-medium text-gray-800">{selectedDriverInfo.name}</p>
                  <p className="text-gray-600">
                    📧 {selectedDriverInfo.contact} • Lic: {selectedDriverInfo.licenseNumber}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Vista previa de correos que se enviarán */}
        {selectedVehicle && selectedDriver && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <h3 className="font-semibold text-amber-900 mb-3 flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Notificaciones por Correo Electrónico
            </h3>
            <div className="space-y-3 text-sm">
              {/* Email al solicitante */}
              <div className="bg-white p-3 rounded border border-amber-200">
                <p className="font-semibold text-gray-800 mb-1">
                  ✉️ Email al Solicitante:
                </p>
                <p className="text-blue-600 font-medium mb-2">
                  {request.requesterEmail || request.requester}
                </p>
                <div className="text-xs text-gray-600 bg-gray-50 p-2 rounded">
                  <p className="font-semibold mb-1">Asunto: Solicitud de vehículo aprobada - {request.destination}</p>
                  <p className="whitespace-pre-line">
                    Estimado/a {request.requester},

Su solicitud de vehículo ha sido aprobada.

📋 Detalles del servicio:
• Destino: {request.destination}
• Fecha de salida: {request.departureDate || request.date}

🚗 Vehículo asignado:
• {selectedVehicleInfo?.make} {selectedVehicleInfo?.model}
• Placa: {selectedVehicleInfo?.plate}

👤 Conductor asignado:
• Nombre: {selectedDriverInfo?.name}
• Contacto: {selectedDriverInfo?.contact}

Atentamente,
Sistema de Gestión de Flota
Personería de Bogotá
                  </p>
                </div>
              </div>

              {/* Email al conductor */}
              <div className="bg-white p-3 rounded border border-amber-200">
                <p className="font-semibold text-gray-800 mb-1">
                  ✉️ Email al Conductor:
                </p>
                <p className="text-blue-600 font-medium mb-2">
                  {selectedDriverInfo?.contact}
                </p>
                <div className="text-xs text-gray-600 bg-gray-50 p-2 rounded">
                  <p className="font-semibold mb-1">Asunto: Nueva asignación de servicio</p>
                  <p className="whitespace-pre-line">
                    Estimado/a {selectedDriverInfo?.name},

Se le ha asignado un nuevo servicio de transporte.

📋 Detalles del servicio:
• Solicitante: {request.requester}
• Dependencia: {request.department}
• Origen: {request.origin}
• Destino: {request.destination}
• Fecha de salida: {request.departureDate || request.date}
• Pasajeros: {request.passengers}

🚗 Vehículo asignado:
• {selectedVehicleInfo?.make} {selectedVehicleInfo?.model}
• Placa: {selectedVehicleInfo?.plate}

Por favor confirme su disponibilidad.

Atentamente,
Sistema de Gestión de Flota
Personería de Bogotá
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Confirmación */}
        {selectedVehicle && selectedDriver && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <label className="flex items-start cursor-pointer">
              <input
                type="checkbox"
                checked={confirmAssignment}
                onChange={(e) => setConfirmAssignment(e.target.checked)}
                className="mt-1 mr-3 h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <div className="text-sm flex-1">
                <p className="font-semibold text-blue-900 mb-2">
                  ✅ Confirmo la asignación de vehículo y conductor
                </p>
                <div className="bg-white p-3 rounded border border-blue-200">
                  <p className="font-semibold text-gray-700 mb-2">
                    ⚠️ Al confirmar, se enviarán automáticamente correos electrónicos a:
                  </p>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <span className="mr-2 text-lg">📧</span>
                      <div>
                        <strong>Solicitante:</strong><br/>
                        <span className="text-blue-600 font-medium">{request.requesterEmail || request.requester}</span>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 text-lg">📧</span>
                      <div>
                        <strong>Conductor:</strong><br/>
                        <span className="text-blue-600 font-medium">{selectedDriverInfo?.contact}</span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </label>
          </div>
        )}

        {/* Botones de acción */}
        <div className="flex justify-end gap-3 pt-4 border-t">
          <button
            onClick={onClose}
            disabled={sendingNotifications}
            className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            disabled={!selectedVehicle || !selectedDriver || !confirmAssignment || sendingNotifications}
            className={`px-6 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2 ${
              selectedVehicle && selectedDriver && confirmAssignment && !sendingNotifications
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {sendingNotifications ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Enviando correos...</span>
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>Confirmar y Enviar Correos</span>
              </>
            )}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default VehicleRequest;

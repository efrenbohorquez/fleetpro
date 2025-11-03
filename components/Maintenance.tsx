import React, { useState } from 'react';
import { MaintenanceRecord, MaintenanceType, MaintenanceStatus, Vehicle } from '../types';
import { Modal } from './common/Modal';
import { Car } from './icons';
import VehicleDetailModal from './VehicleDetailModal';

interface MaintenanceProps {
  maintenance: MaintenanceRecord[];
  setMaintenance: React.Dispatch<React.SetStateAction<MaintenanceRecord[]>>;
  vehicles: Vehicle[];
}

type ViewMode = 'list' | 'schedule' | 'history';

const Maintenance: React.FC<MaintenanceProps> = ({ maintenance, setMaintenance, vehicles }) => {
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [showModal, setShowModal] = useState(false);
  const [editingRecord, setEditingRecord] = useState<MaintenanceRecord | null>(null);
  const [filterType, setFilterType] = useState<MaintenanceType | 'all'>('all');
  const [filterStatus, setFilterStatus] = useState<MaintenanceStatus | 'all'>('all');
  const [filterVehicle, setFilterVehicle] = useState<string>('all');
  const [showVehicleDetail, setShowVehicleDetail] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);

  // Formulario
  const [formData, setFormData] = useState<Partial<MaintenanceRecord>>({
    vehicleId: '',
    type: MaintenanceType.Preventive,
    status: MaintenanceStatus.Scheduled,
    scheduledDate: '',
    description: '',
    cost: 0,
    mileage: 0,
    workshop: '',
    technician: '',
    parts: [],
    notes: '',
  });

  const handleOpenModal = (record?: MaintenanceRecord) => {
    if (record) {
      setEditingRecord(record);
      setFormData(record);
    } else {
      setEditingRecord(null);
      setFormData({
        vehicleId: '',
        type: MaintenanceType.Preventive,
        status: MaintenanceStatus.Scheduled,
        scheduledDate: '',
        description: '',
        cost: 0,
        mileage: 0,
        workshop: '',
        technician: '',
        parts: [],
        notes: '',
      });
    }
    setShowModal(true);
  };

  const handleSubmit = () => {
    if (!formData.vehicleId || !formData.scheduledDate || !formData.description) {
      alert('Por favor complete los campos obligatorios');
      return;
    }

    if (editingRecord) {
      // Editar
      setMaintenance(prev => prev.map(m => 
        m.id === editingRecord.id ? { ...formData, id: m.id } as MaintenanceRecord : m
      ));
    } else {
      // Crear nuevo
      const newRecord: MaintenanceRecord = {
        ...formData,
        id: `maint-${Date.now()}`,
      } as MaintenanceRecord;
      setMaintenance(prev => [...prev, newRecord]);
    }

    setShowModal(false);
    setEditingRecord(null);
  };

  const handleDelete = (id: string) => {
    if (confirm('¿Está seguro de eliminar este registro de mantenimiento?')) {
      setMaintenance(prev => prev.filter(m => m.id !== id));
    }
  };

  const handleStatusChange = (id: string, newStatus: MaintenanceStatus) => {
    setMaintenance(prev => prev.map(m => {
      if (m.id === id) {
        const updated = { ...m, status: newStatus };
        if (newStatus === MaintenanceStatus.Completed && !m.completedDate) {
          updated.completedDate = new Date().toISOString().split('T')[0];
        }
        return updated;
      }
      return m;
    }));
  };

  const getVehicleInfo = (vehicleId: string) => {
    const vehicle = vehicles.find(v => v.id === vehicleId);
    return vehicle ? `${vehicle.model} - ${vehicle.plate}` : 'Desconocido';
  };

  const handleViewVehicleDetail = (vehicleId: string) => {
    const vehicle = vehicles.find(v => v.id === vehicleId);
    if (vehicle) {
      setSelectedVehicle(vehicle);
      setShowVehicleDetail(true);
    }
  };

  // Filtrado
  const filteredMaintenance = maintenance.filter(m => {
    if (filterType !== 'all' && m.type !== filterType) return false;
    if (filterStatus !== 'all' && m.status !== filterStatus) return false;
    if (filterVehicle !== 'all' && m.vehicleId !== filterVehicle) return false;
    return true;
  });

  // Estadísticas
  const stats = {
    total: maintenance.length,
    preventive: maintenance.filter(m => m.type === MaintenanceType.Preventive).length,
    corrective: maintenance.filter(m => m.type === MaintenanceType.Corrective).length,
    scheduled: maintenance.filter(m => m.status === MaintenanceStatus.Scheduled).length,
    inProgress: maintenance.filter(m => m.status === MaintenanceStatus.InProgress).length,
    completed: maintenance.filter(m => m.status === MaintenanceStatus.Completed).length,
    totalCost: maintenance.reduce((sum, m) => sum + m.cost, 0),
  };

  const statusColors = {
    [MaintenanceStatus.Scheduled]: 'bg-blue-100 text-blue-800 border-blue-200',
    [MaintenanceStatus.InProgress]: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    [MaintenanceStatus.Completed]: 'bg-green-100 text-green-800 border-green-200',
    [MaintenanceStatus.Canceled]: 'bg-red-100 text-red-800 border-red-200',
  };

  const typeColors = {
    [MaintenanceType.Preventive]: 'bg-blue-50 text-blue-700 border-blue-200',
    [MaintenanceType.Corrective]: 'bg-orange-50 text-orange-700 border-orange-200',
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Gestión de Mantenimiento</h1>
              <p className="text-sm text-gray-500 mt-1">Mantenimiento preventivo y correctivo de vehículos</p>
            </div>
            <button
              onClick={() => handleOpenModal()}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all shadow-md font-medium flex items-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Programar Mantenimiento
            </button>
          </div>

          {/* Estadísticas */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200">
              <p className="text-xs text-blue-600 font-semibold uppercase">Total</p>
              <p className="text-2xl font-bold text-blue-800">{stats.total}</p>
            </div>
            <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 p-4 rounded-lg border border-cyan-200">
              <p className="text-xs text-cyan-600 font-semibold uppercase">Preventivo</p>
              <p className="text-2xl font-bold text-cyan-800">{stats.preventive}</p>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-lg border border-orange-200">
              <p className="text-xs text-orange-600 font-semibold uppercase">Correctivo</p>
              <p className="text-2xl font-bold text-orange-800">{stats.corrective}</p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200">
              <p className="text-xs text-blue-600 font-semibold uppercase">Programado</p>
              <p className="text-2xl font-bold text-blue-800">{stats.scheduled}</p>
            </div>
            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-4 rounded-lg border border-yellow-200">
              <p className="text-xs text-yellow-600 font-semibold uppercase">En Proceso</p>
              <p className="text-2xl font-bold text-yellow-800">{stats.inProgress}</p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg border border-green-200">
              <p className="text-xs text-green-600 font-semibold uppercase">Completado</p>
              <p className="text-2xl font-bold text-green-800">{stats.completed}</p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg border border-purple-200">
              <p className="text-xs text-purple-600 font-semibold uppercase">Costo Total</p>
              <p className="text-2xl font-bold text-purple-800">${stats.totalCost.toLocaleString()}</p>
            </div>
          </div>
        </div>

        {/* Filtros */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de Mantenimiento</label>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value as MaintenanceType | 'all')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                title="Filtrar por tipo"
              >
                <option value="all">Todos</option>
                <option value={MaintenanceType.Preventive}>Preventivo</option>
                <option value={MaintenanceType.Corrective}>Correctivo</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Estado</label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as MaintenanceStatus | 'all')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                title="Filtrar por estado"
              >
                <option value="all">Todos</option>
                <option value={MaintenanceStatus.Scheduled}>Programado</option>
                <option value={MaintenanceStatus.InProgress}>En Proceso</option>
                <option value={MaintenanceStatus.Completed}>Completado</option>
                <option value={MaintenanceStatus.Canceled}>Cancelado</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Vehículo</label>
              <select
                value={filterVehicle}
                onChange={(e) => setFilterVehicle(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                title="Filtrar por vehículo"
              >
                <option value="all">Todos los vehículos</option>
                {vehicles.map(v => (
                  <option key={v.id} value={v.id}>
                    {v.model} - {v.plate}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Lista de Mantenimientos */}
        <div className="space-y-4">
          {filteredMaintenance.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
              <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p className="text-gray-500 text-lg font-medium">No hay registros de mantenimiento</p>
              <p className="text-gray-400 text-sm mt-2">Programa el primer mantenimiento para comenzar</p>
            </div>
          ) : (
            filteredMaintenance.map((record) => (
              <div key={record.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center flex-1">
                    <Car className="w-8 h-8 text-blue-600 mr-3" />
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-semibold text-gray-800">{getVehicleInfo(record.vehicleId)}</h3>
                        <button
                          onClick={() => handleViewVehicleDetail(record.vehicleId)}
                          className="px-3 py-1 text-xs bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors font-medium flex items-center gap-1"
                          title="Ver hoja de vida completa del vehículo"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          Hoja de Vida
                        </button>
                      </div>
                      <p className="text-sm text-gray-600">{record.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${typeColors[record.type]}`}>
                      {record.type}
                    </span>
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${statusColors[record.status]}`}>
                      {record.status}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-gray-500">Fecha Programada</p>
                    <p className="text-sm font-medium text-gray-800">{record.scheduledDate}</p>
                  </div>
                  {record.completedDate && (
                    <div>
                      <p className="text-xs text-gray-500">Fecha Completada</p>
                      <p className="text-sm font-medium text-gray-800">{record.completedDate}</p>
                    </div>
                  )}
                  <div>
                    <p className="text-xs text-gray-500">Costo</p>
                    <p className="text-sm font-medium text-gray-800">${record.cost.toLocaleString()}</p>
                  </div>
                  {record.mileage && (
                    <div>
                      <p className="text-xs text-gray-500">Kilometraje</p>
                      <p className="text-sm font-medium text-gray-800">{record.mileage.toLocaleString()} km</p>
                    </div>
                  )}
                </div>

                {(record.workshop || record.technician) && (
                  <div className="grid grid-cols-2 gap-4 mb-4 pt-4 border-t">
                    {record.workshop && (
                      <div>
                        <p className="text-xs text-gray-500">Taller</p>
                        <p className="text-sm font-medium text-gray-800">{record.workshop}</p>
                      </div>
                    )}
                    {record.technician && (
                      <div>
                        <p className="text-xs text-gray-500">Técnico</p>
                        <p className="text-sm font-medium text-gray-800">{record.technician}</p>
                      </div>
                    )}
                  </div>
                )}

                {record.parts && record.parts.length > 0 && (
                  <div className="mb-4">
                    <p className="text-xs text-gray-500 mb-2">Repuestos/Servicios</p>
                    <div className="flex flex-wrap gap-2">
                      {record.parts.map((part, idx) => (
                        <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                          {part}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {record.notes && (
                  <div className="mb-4 p-3 bg-gray-50 rounded border border-gray-200">
                    <p className="text-xs text-gray-500 mb-1">Notas</p>
                    <p className="text-sm text-gray-700">{record.notes}</p>
                  </div>
                )}

                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex gap-2">
                    {record.status === MaintenanceStatus.Scheduled && (
                      <button
                        onClick={() => handleStatusChange(record.id, MaintenanceStatus.InProgress)}
                        className="px-4 py-2 text-sm bg-yellow-50 text-yellow-700 rounded-lg hover:bg-yellow-100 transition-colors font-medium"
                      >
                        Iniciar Proceso
                      </button>
                    )}
                    {record.status === MaintenanceStatus.InProgress && (
                      <button
                        onClick={() => handleStatusChange(record.id, MaintenanceStatus.Completed)}
                        className="px-4 py-2 text-sm bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors font-medium"
                      >
                        Marcar Completado
                      </button>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleOpenModal(record)}
                      className="px-4 py-2 text-sm bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors font-medium"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(record.id)}
                      className="px-4 py-2 text-sm bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors font-medium"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Modal de Formulario */}
      {showModal && (
        <Modal
          title={editingRecord ? 'Editar Mantenimiento' : 'Programar Mantenimiento'}
          onClose={() => setShowModal(false)}
          isOpen={showModal}
        >
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Vehículo <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.vehicleId}
                  onChange={(e) => setFormData({ ...formData, vehicleId: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  title="Seleccione vehículo"
                >
                  <option value="">Seleccione un vehículo</option>
                  {vehicles.map(v => (
                    <option key={v.id} value={v.id}>
                      {v.model} - {v.plate}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tipo <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value as MaintenanceType })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  title="Tipo de mantenimiento"
                >
                  <option value={MaintenanceType.Preventive}>Preventivo</option>
                  <option value={MaintenanceType.Corrective}>Correctivo</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fecha Programada <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={formData.scheduledDate}
                  onChange={(e) => setFormData({ ...formData, scheduledDate: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  title="Fecha programada del mantenimiento"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Estado</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as MaintenanceStatus })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  title="Estado del mantenimiento"
                >
                  <option value={MaintenanceStatus.Scheduled}>Programado</option>
                  <option value={MaintenanceStatus.InProgress}>En Proceso</option>
                  <option value={MaintenanceStatus.Completed}>Completado</option>
                  <option value={MaintenanceStatus.Canceled}>Cancelado</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Descripción <span className="text-red-500">*</span>
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                rows={3}
                placeholder="Descripción del mantenimiento a realizar"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Costo ($)</label>
                <input
                  type="number"
                  value={formData.cost}
                  onChange={(e) => setFormData({ ...formData, cost: parseFloat(e.target.value) || 0 })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  min="0"
                  placeholder="Ingrese el costo"
                  title="Costo del mantenimiento"
                  aria-label="Costo del mantenimiento"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Kilometraje</label>
                <input
                  type="number"
                  value={formData.mileage}
                  onChange={(e) => setFormData({ ...formData, mileage: parseInt(e.target.value) || 0 })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  min="0"
                  placeholder="Ingrese el kilometraje"
                  title="Kilometraje del vehículo"
                  aria-label="Kilometraje del vehículo"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Taller</label>
                <input
                  type="text"
                  value={formData.workshop}
                  onChange={(e) => setFormData({ ...formData, workshop: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Nombre del taller"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Técnico</label>
                <input
                  type="text"
                  value={formData.technician}
                  onChange={(e) => setFormData({ ...formData, technician: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Nombre del técnico"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Notas Adicionales</label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                rows={2}
                placeholder="Observaciones o detalles adicionales"
              />
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t">
              <button
                onClick={() => setShowModal(false)}
                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
              >
                Cancelar
              </button>
              <button
                onClick={handleSubmit}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                {editingRecord ? 'Actualizar' : 'Crear'}
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Modal de Hoja de Vida del Vehículo */}
      {showVehicleDetail && selectedVehicle && (
        <VehicleDetailModal
          vehicle={selectedVehicle}
          isOpen={showVehicleDetail}
          onClose={() => {
            setShowVehicleDetail(false);
            setSelectedVehicle(null);
          }}
        />
      )}
    </div>
  );
};

export default Maintenance;

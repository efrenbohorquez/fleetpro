import React, { useState, useEffect } from 'react';
import { Vehicle, VehicleStatus } from '../types';
import { Modal } from './common/Modal';
import { PlusIcon, EditIcon, DeleteIcon } from './icons';

const statusColorMap: { [key in VehicleStatus]: string } = {
  [VehicleStatus.Available]: 'bg-green-100 text-green-800',
  [VehicleStatus.InUse]: 'bg-indigo-100 text-indigo-800',
  [VehicleStatus.Maintenance]: 'bg-red-100 text-red-800',
};

interface VehiclesProps {
    vehicles: Vehicle[];
    setVehicles: React.Dispatch<React.SetStateAction<Vehicle[]>>;
}

const Vehicles: React.FC<VehiclesProps> = ({ vehicles, setVehicles }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<VehicleStatus | 'Todos'>('Todos');

  const handleOpenModal = (vehicle: Vehicle | null = null) => {
    console.log('🔵 Abriendo modal para:', vehicle ? 'editar' : 'crear', vehicle);
    setSelectedVehicle(vehicle);
    setIsModalOpen(true);
  };

  const handleOpenDeleteModal = (vehicle: Vehicle) => {
    console.log('🔴 Abriendo modal de eliminación para:', vehicle);
    setSelectedVehicle(vehicle);
    setIsDeleteModalOpen(true);
  }

  const handleSave = (vehicleData: Omit<Vehicle, 'id'>) => {
    if (selectedVehicle) {
      console.log('✏️ Actualizando vehículo:', selectedVehicle.id, vehicleData);
      setVehicles(vehicles.map(v => v.id === selectedVehicle.id ? { ...v, ...vehicleData } : v));
    } else {
      const newVehicle: Vehicle = { id: `v${Date.now()}`, ...vehicleData };
      console.log('➕ Creando nuevo vehículo:', newVehicle);
      setVehicles([...vehicles, newVehicle]);
    }
    setIsModalOpen(false);
    setSelectedVehicle(null);
  };

  const handleDelete = () => {
      if (selectedVehicle) {
          console.log('🗑️ Eliminando vehículo:', selectedVehicle.id);
          setVehicles(vehicles.filter(v => v.id !== selectedVehicle.id));
          setIsDeleteModalOpen(false);
          setSelectedVehicle(null);
      }
  }

  const handleDownloadHistory = (vehicle: Vehicle) => {
    console.log('📄 Abriendo hoja de vida para:', vehicle);
    setSelectedVehicle(vehicle);
    setIsHistoryModalOpen(true);
  }

  // Filtrado
  const filteredVehicles = vehicles.filter(vehicle => {
    const matchesSearch = 
      vehicle.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.plate.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.make.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'Todos' || vehicle.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  // Ordenamiento alfabético por modelo
  const sortedVehicles = [...filteredVehicles].sort((a, b) => {
    return a.model.localeCompare(b.model, 'es', { sensitivity: 'base' });
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Lista de Vehículos</h2>
        <button 
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleOpenModal();
          }} 
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium"
        >
          <PlusIcon className="w-5 h-5 mr-2" />
          Crear Vehículo
        </button>
      </div>

      {/* Búsqueda y filtros */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
              🔍 Buscar vehículo
            </label>
            <input
              id="search"
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por modelo, placa o marca..."
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="status-filter" className="block text-sm font-medium text-gray-700 mb-2">
              🎯 Filtrar por estado
            </label>
            <select
              id="status-filter"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as VehicleStatus | 'Todos')}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="Todos">Todos los estados</option>
              {Object.values(VehicleStatus).map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md overflow-x-auto">
        <div className="mb-4 text-sm text-gray-600">
          <strong>{sortedVehicles.length}</strong> vehículo{sortedVehicles.length !== 1 ? 's' : ''} encontrado{sortedVehicles.length !== 1 ? 's' : ''} (Ordenados alfabéticamente)
        </div>
        
        {sortedVehicles.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No se encontraron vehículos con los criterios de búsqueda
          </div>
        ) : (
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">Modelo</th>
                <th scope="col" className="px-6 py-3">Marca</th>
                <th scope="col" className="px-6 py-3">Año</th>
                <th scope="col" className="px-6 py-3">Placa</th>
                <th scope="col" className="px-6 py-3">Estado</th>
                <th scope="col" className="px-6 py-3 text-center">Hoja de Vida</th>
                <th scope="col" className="px-6 py-3 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {sortedVehicles.map((vehicle) => (
                <tr key={vehicle.id} className="bg-white border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">{vehicle.model}</td>
                  <td className="px-6 py-4">{vehicle.make}</td>
                  <td className="px-6 py-4">{vehicle.year}</td>
                  <td className="px-6 py-4">{vehicle.plate}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${statusColorMap[vehicle.status]}`}>
                      {vehicle.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    {vehicle.historyFile ? (
                      <button 
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleDownloadHistory(vehicle);
                        }}
                        className="px-3 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700 font-medium"
                        title="Ver hoja de vida"
                      >
                        📄 Ver Hoja
                      </button>
                    ) : (
                      <span className="text-gray-400 text-xs">Sin archivo</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center items-center space-x-2">
                      <button 
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleOpenModal(vehicle);
                        }} 
                        className="px-3 py-1.5 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 font-medium flex items-center"
                        title="Editar"
                      >
                        <EditIcon className="w-3 h-3 mr-1" />
                        Editar
                      </button>
                      <button 
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleOpenDeleteModal(vehicle);
                        }} 
                        className="px-3 py-1.5 bg-red-600 text-white text-xs rounded hover:bg-red-700 font-medium flex items-center"
                        title="Eliminar"
                      >
                        <DeleteIcon className="w-3 h-3 mr-1" />
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )
      }
      </div>
      {isModalOpen && <VehicleFormModal isOpen={isModalOpen} vehicle={selectedVehicle} onSave={handleSave} onClose={() => setIsModalOpen(false)} />}
      {isDeleteModalOpen && selectedVehicle && <ConfirmDeleteModal isOpen={isDeleteModalOpen} onConfirm={handleDelete} onClose={() => setIsDeleteModalOpen(false)} itemName={`${selectedVehicle.model} - ${selectedVehicle.plate}`} />}
      {isHistoryModalOpen && selectedVehicle && <VehicleHistoryModal isOpen={isHistoryModalOpen} vehicle={selectedVehicle} onClose={() => setIsHistoryModalOpen(false)} />}
    </div>
  );
};

interface VehicleFormModalProps {
    isOpen: boolean;
    vehicle: Vehicle | null;
    onSave: (vehicleData: Omit<Vehicle, 'id'>) => void;
    onClose: () => void;
}

const VehicleFormModal: React.FC<VehicleFormModalProps> = ({ isOpen, vehicle, onSave, onClose }) => {
    const [formData, setFormData] = useState({
        make: '', 
        model: '', 
        year: new Date().getFullYear(), 
        plate: '', 
        status: VehicleStatus.Available,
        mileage: 0,
        vin: '',
        color: '',
        fuelType: '',
        capacity: 0,
        engineNumber: '',
        chassisNumber: '',
        owner: '',
        insuranceCompany: '',
        insurancePolicy: '',
        soatExpiry: '',
        techReviewExpiry: '',
        historyFile: ''
    });

    useEffect(() => {
        if (vehicle) {
            setFormData({
                make: vehicle.make,
                model: vehicle.model,
                year: vehicle.year,
                plate: vehicle.plate,
                status: vehicle.status,
                mileage: vehicle.mileage || 0,
                vin: vehicle.vin || '',
                color: vehicle.color || '',
                fuelType: vehicle.fuelType || '',
                capacity: vehicle.capacity || 0,
                engineNumber: vehicle.engineNumber || '',
                chassisNumber: vehicle.chassisNumber || '',
                owner: vehicle.owner || '',
                insuranceCompany: vehicle.insuranceCompany || '',
                insurancePolicy: vehicle.insurancePolicy || '',
                soatExpiry: vehicle.soatExpiry || '',
                techReviewExpiry: vehicle.techReviewExpiry || '',
                historyFile: vehicle.historyFile || ''
            });
        }
    }, [vehicle]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ 
            ...prev, 
            [name]: name === 'year' || name === 'mileage' || name === 'capacity' ? parseInt(value) || 0 : value 
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('💾 Guardando vehículo:', formData);
        onSave(formData);
    };

    return (
        <Modal isOpen={isOpen} title={vehicle ? 'Editar Vehículo' : 'Crear Vehículo'} onClose={onClose}>
            <form onSubmit={handleSubmit} className="max-h-[70vh] overflow-y-auto">
                
                {/* Información Básica */}
                <div className="mb-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-3">🚗 Información Básica</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Marca *</label>
                            <input 
                                type="text" 
                                name="make" 
                                value={formData.make} 
                                onChange={handleChange} 
                                placeholder="Ej: Toyota" 
                                className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500" 
                                required 
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Modelo *</label>
                            <input 
                                type="text" 
                                name="model" 
                                value={formData.model} 
                                onChange={handleChange} 
                                placeholder="Ej: Land Cruiser Prado" 
                                className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500" 
                                required 
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Año *</label>
                            <input 
                                type="number" 
                                name="year" 
                                value={formData.year} 
                                onChange={handleChange} 
                                placeholder="2020" 
                                className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500" 
                                required 
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Placa *</label>
                            <input 
                                type="text" 
                                name="plate" 
                                value={formData.plate} 
                                onChange={handleChange} 
                                placeholder="ABC123" 
                                className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500 uppercase" 
                                required 
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Color</label>
                            <input 
                                type="text" 
                                name="color" 
                                value={formData.color} 
                                onChange={handleChange} 
                                placeholder="Blanco" 
                                className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500" 
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Estado *</label>
                            <select 
                                name="status" 
                                value={formData.status} 
                                onChange={handleChange} 
                                className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                            >
                                {Object.values(VehicleStatus).map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Especificaciones Técnicas */}
                <div className="mb-6 pt-4 border-t">
                    <h3 className="text-lg font-bold text-gray-900 mb-3">⚙️ Especificaciones Técnicas</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">VIN</label>
                            <input 
                                type="text" 
                                name="vin" 
                                value={formData.vin} 
                                onChange={handleChange} 
                                placeholder="Número de identificación vehicular" 
                                className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500 font-mono text-sm" 
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Kilometraje</label>
                            <input 
                                type="number" 
                                name="mileage" 
                                value={formData.mileage} 
                                onChange={handleChange} 
                                placeholder="0" 
                                className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500" 
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Combustible</label>
                            <input 
                                type="text" 
                                name="fuelType" 
                                value={formData.fuelType} 
                                onChange={handleChange} 
                                placeholder="Gasolina/Diesel" 
                                className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500" 
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Capacidad (pasajeros)</label>
                            <input 
                                type="number" 
                                name="capacity" 
                                value={formData.capacity} 
                                onChange={handleChange} 
                                placeholder="5" 
                                className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500" 
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Número de Motor</label>
                            <input 
                                type="text" 
                                name="engineNumber" 
                                value={formData.engineNumber} 
                                onChange={handleChange} 
                                placeholder="Motor" 
                                className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500 font-mono text-sm" 
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Número de Chasis</label>
                            <input 
                                type="text" 
                                name="chassisNumber" 
                                value={formData.chassisNumber} 
                                onChange={handleChange} 
                                placeholder="Chasis" 
                                className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500 font-mono text-sm" 
                            />
                        </div>
                    </div>
                </div>

                {/* Propiedad y Seguros */}
                <div className="mb-6 pt-4 border-t">
                    <h3 className="text-lg font-bold text-gray-900 mb-3">📄 Propiedad y Seguros</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Propietario</label>
                            <input 
                                type="text" 
                                name="owner" 
                                value={formData.owner} 
                                onChange={handleChange} 
                                placeholder="Nombre del propietario" 
                                className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500" 
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Aseguradora</label>
                            <input 
                                type="text" 
                                name="insuranceCompany" 
                                value={formData.insuranceCompany} 
                                onChange={handleChange} 
                                placeholder="Nombre de la aseguradora" 
                                className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500" 
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Número de Póliza</label>
                            <input 
                                type="text" 
                                name="insurancePolicy" 
                                value={formData.insurancePolicy} 
                                onChange={handleChange} 
                                placeholder="Póliza" 
                                className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500" 
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Vencimiento SOAT</label>
                            <input 
                                type="date" 
                                name="soatExpiry" 
                                value={formData.soatExpiry} 
                                onChange={handleChange} 
                                className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500" 
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Vencimiento Revisión Técnica</label>
                            <input 
                                type="date" 
                                name="techReviewExpiry" 
                                value={formData.techReviewExpiry} 
                                onChange={handleChange} 
                                className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500" 
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Archivo Hoja de Vida</label>
                            <input 
                                type="text" 
                                name="historyFile" 
                                value={formData.historyFile} 
                                onChange={handleChange} 
                                placeholder="data/Hoja de Vida Vehículos/..." 
                                className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500 text-sm" 
                            />
                        </div>
                    </div>
                </div>

                <div className="flex justify-end space-x-3 pt-4 border-t sticky bottom-0 bg-white">
                    <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 font-medium">Cancelar</button>
                    <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium">Guardar</button>
                </div>
            </form>
        </Modal>
    );
};

const ConfirmDeleteModal: React.FC<{isOpen: boolean, onConfirm: () => void, onClose: () => void, itemName: string}> = ({isOpen, onConfirm, onClose, itemName}) => (
    <Modal isOpen={isOpen} title="Confirmar Eliminación" onClose={onClose}>
        <p className="text-gray-700 mb-4">¿Estás seguro de que deseas eliminar <strong className="text-gray-900">{itemName}</strong>? Esta acción no se puede deshacer.</p>
        <div className="flex justify-end space-x-3 mt-6">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 font-medium">Cancelar</button>
            <button type="button" onClick={onConfirm} className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 font-medium">Eliminar</button>
        </div>
    </Modal>
);

const VehicleHistoryModal: React.FC<{isOpen: boolean, vehicle: Vehicle, onClose: () => void}> = ({isOpen, vehicle, onClose}) => (
    <Modal isOpen={isOpen} title={`📋 Hoja de Vida - ${vehicle.model} (${vehicle.plate})`} onClose={onClose}>
        <div className="space-y-6 max-h-[70vh] overflow-y-auto">
            {/* Información General */}
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-lg border border-blue-200">
                <h3 className="text-lg font-bold text-blue-900 mb-3 flex items-center">
                    🚗 Información General
                </h3>
                <div className="grid grid-cols-2 gap-3 text-sm">
                    <div><span className="font-semibold text-gray-700">Modelo:</span> <span className="text-gray-900">{vehicle.model}</span></div>
                    <div><span className="font-semibold text-gray-700">Placa:</span> <span className="text-gray-900 font-mono bg-white px-2 py-1 rounded">{vehicle.plate}</span></div>
                    <div><span className="font-semibold text-gray-700">Año:</span> <span className="text-gray-900">{vehicle.year}</span></div>
                    <div><span className="font-semibold text-gray-700">Color:</span> <span className="text-gray-900">{vehicle.color || 'No especificado'}</span></div>
                    <div className="col-span-2"><span className="font-semibold text-gray-700">VIN:</span> <span className="text-gray-900 font-mono text-xs bg-white px-2 py-1 rounded">{vehicle.vin || 'No especificado'}</span></div>
                </div>
            </div>

            {/* Especificaciones Técnicas */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg border border-green-200">
                <h3 className="text-lg font-bold text-green-900 mb-3 flex items-center">
                    ⚙️ Especificaciones Técnicas
                </h3>
                <div className="grid grid-cols-2 gap-3 text-sm">
                    <div><span className="font-semibold text-gray-700">Combustible:</span> <span className="text-gray-900">{vehicle.fuelType || 'No especificado'}</span></div>
                    <div><span className="font-semibold text-gray-700">Capacidad:</span> <span className="text-gray-900">{vehicle.capacity || 'N/A'} pasajeros</span></div>
                    <div><span className="font-semibold text-gray-700">Kilometraje:</span> <span className="text-gray-900 font-semibold">{vehicle.mileage ? `${vehicle.mileage.toLocaleString()} km` : 'No especificado'}</span></div>
                    <div><span className="font-semibold text-gray-700">Estado:</span> <span className={`px-2 py-1 rounded text-xs font-semibold ${statusColorMap[vehicle.status]}`}>{vehicle.status}</span></div>
                    <div className="col-span-2"><span className="font-semibold text-gray-700">Motor:</span> <span className="text-gray-900 font-mono text-xs bg-white px-2 py-1 rounded">{vehicle.engineNumber || 'No especificado'}</span></div>
                    <div className="col-span-2"><span className="font-semibold text-gray-700">Chasis:</span> <span className="text-gray-900 font-mono text-xs bg-white px-2 py-1 rounded">{vehicle.chassisNumber || 'No especificado'}</span></div>
                </div>
            </div>

            {/* Propiedad */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg border border-purple-200">
                <h3 className="text-lg font-bold text-purple-900 mb-3 flex items-center">
                    👤 Propiedad
                </h3>
                <div className="text-sm">
                    <div><span className="font-semibold text-gray-700">Propietario:</span> <span className="text-gray-900">{vehicle.owner || 'No especificado'}</span></div>
                </div>
            </div>

            {/* Documentación Legal */}
            <div className="bg-gradient-to-r from-orange-50 to-yellow-50 p-4 rounded-lg border border-orange-200">
                <h3 className="text-lg font-bold text-orange-900 mb-3 flex items-center">
                    📄 Documentación Legal
                </h3>
                <div className="grid grid-cols-2 gap-3 text-sm">
                    <div><span className="font-semibold text-gray-700">Aseguradora:</span> <span className="text-gray-900">{vehicle.insuranceCompany || 'No especificado'}</span></div>
                    <div><span className="font-semibold text-gray-700">Póliza:</span> <span className="text-gray-900 font-mono text-xs bg-white px-2 py-1 rounded">{vehicle.insurancePolicy || 'No especificado'}</span></div>
                    <div><span className="font-semibold text-gray-700">SOAT vence:</span> <span className={`text-gray-900 font-semibold ${vehicle.soatExpiry && new Date(vehicle.soatExpiry) < new Date(Date.now() + 30*24*60*60*1000) ? 'text-red-600' : ''}`}>{vehicle.soatExpiry || 'No especificado'}</span></div>
                    <div><span className="font-semibold text-gray-700">Revisión técnica:</span> <span className={`text-gray-900 font-semibold ${vehicle.techReviewExpiry && new Date(vehicle.techReviewExpiry) < new Date(Date.now() + 30*24*60*60*1000) ? 'text-red-600' : ''}`}>{vehicle.techReviewExpiry || 'No especificado'}</span></div>
                </div>
            </div>

            {/* Archivo */}
            {vehicle.historyFile && (
                <div className="bg-gradient-to-r from-gray-50 to-slate-50 p-4 rounded-lg border border-gray-300">
                    <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
                        📁 Archivo Excel
                    </h3>
                    <div className="text-sm">
                        <div className="bg-white p-3 rounded border border-gray-200 font-mono text-xs break-all mb-3">
                            {vehicle.historyFile}
                        </div>
                        <div className="bg-blue-100 border border-blue-300 rounded p-3">
                            <p className="text-blue-900 text-xs">
                                <strong>💡 Ubicación del archivo:</strong><br/>
                                <code className="bg-white px-2 py-1 rounded mt-1 inline-block">
                                    {vehicle.historyFile.replace('data/', 'D:/FLOTA GEMINI/fleetpro/data/')}
                                </code>
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
        
        <div className="flex justify-end mt-6 pt-4 border-t">
            <button type="button" onClick={onClose} className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium">
                Cerrar
            </button>
        </div>
    </Modal>
);

export default Vehicles;
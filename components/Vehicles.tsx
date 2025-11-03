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
  };

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
  };

  const handleViewHistory = (vehicle: Vehicle) => {
    console.log('📄 Abriendo hoja de vida para:', vehicle);
    setSelectedVehicle(vehicle);
    setIsHistoryModalOpen(true);
  };

  const filteredVehicles = vehicles.filter(vehicle => {
    const matchesSearch = 
      vehicle.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.plate.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.make.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'Todos' || vehicle.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

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
          <strong>{sortedVehicles.length}</strong> vehículo{sortedVehicles.length !== 1 ? 's' : ''} encontrado{sortedVehicles.length !== 1 ? 's' : ''}
        </div>
        
        {sortedVehicles.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No se encontraron vehículos
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
                  <td className="px-6 py-4 font-mono">{vehicle.plate}</td>
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
                          handleViewHistory(vehicle);
                        }}
                        className="px-3 py-1.5 bg-green-600 text-white text-xs rounded hover:bg-green-700 font-medium"
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
        )}
      </div>

      {isModalOpen && (
        <VehicleFormModal 
          isOpen={isModalOpen}
          vehicle={selectedVehicle} 
          onSave={handleSave} 
          onClose={() => {
            setIsModalOpen(false);
            setSelectedVehicle(null);
          }} 
        />
      )}
      {isDeleteModalOpen && selectedVehicle && (
        <ConfirmDeleteModal 
          isOpen={isDeleteModalOpen}
          onConfirm={handleDelete} 
          onClose={() => {
            setIsDeleteModalOpen(false);
            setSelectedVehicle(null);
          }} 
          itemName={`${selectedVehicle.model} - ${selectedVehicle.plate}`} 
        />
      )}
      {isHistoryModalOpen && selectedVehicle && (
        <VehicleHistoryModal 
          isOpen={isHistoryModalOpen}
          vehicle={selectedVehicle} 
          onClose={() => {
            setIsHistoryModalOpen(false);
            setSelectedVehicle(null);
          }} 
        />
      )}
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
        // Datos básicos
        plate: '',
        make: '', 
        model: '', 
        year: new Date().getFullYear(),
        type: '',
        bodyType: '',
        color: '',
        
        // Motor y mecánica
        engineNumber: '',
        chassisNumber: '',
        cylinderCapacity: '',
        serialNumber: '',
        fuelType: '',
        
        // Capacidad
        capacity: 0,
        
        // Documentación
        transitLicense: '',
        vin: '',
        owner: '',
        insuranceCompany: '',
        insurancePolicy: '',
        soatExpiry: '',
        techReviewExpiry: '',
        
        // Control interno
        status: VehicleStatus.Available,
        mileage: 0,
        historyFile: ''
    });

    useEffect(() => {
        if (vehicle) {
            setFormData({
                plate: vehicle.plate,
                make: vehicle.make,
                model: vehicle.model,
                year: vehicle.year,
                type: vehicle.type || '',
                bodyType: vehicle.bodyType || '',
                color: vehicle.color || '',
                engineNumber: vehicle.engineNumber || '',
                chassisNumber: vehicle.chassisNumber || '',
                cylinderCapacity: vehicle.cylinderCapacity || '',
                serialNumber: vehicle.serialNumber || '',
                fuelType: vehicle.fuelType || '',
                capacity: vehicle.capacity || 0,
                transitLicense: vehicle.transitLicense || '',
                vin: vehicle.vin || '',
                owner: vehicle.owner || '',
                insuranceCompany: vehicle.insuranceCompany || '',
                insurancePolicy: vehicle.insurancePolicy || '',
                soatExpiry: vehicle.soatExpiry || '',
                techReviewExpiry: vehicle.techReviewExpiry || '',
                status: vehicle.status,
                mileage: vehicle.mileage || 0,
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
        onSave(formData);
    };

    return (
        <Modal isOpen={isOpen} title={vehicle ? 'Editar Vehículo' : 'Crear Vehículo'} onClose={onClose}>
            <form onSubmit={handleSubmit} className="max-h-[70vh] overflow-y-auto px-2">
                {/* Sección 1: Identificación */}
                <div className="mb-6">
                    <h3 className="text-lg font-bold text-blue-900 mb-3 bg-blue-50 p-2 rounded">� Identificación del Vehículo</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">PLACA *</label>
                            <input 
                                type="text" 
                                name="plate" 
                                value={formData.plate} 
                                onChange={handleChange} 
                                className="w-full p-2 border rounded uppercase font-bold" 
                                placeholder="ABC123"
                                required 
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">MARCA *</label>
                            <input 
                                type="text" 
                                name="make" 
                                value={formData.make} 
                                onChange={handleChange} 
                                className="w-full p-2 border rounded" 
                                placeholder="Toyota, Chevrolet, etc."
                                required 
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">LÍNEA *</label>
                            <input 
                                type="text" 
                                name="model" 
                                value={formData.model} 
                                onChange={handleChange} 
                                className="w-full p-2 border rounded" 
                                placeholder="Prado, D-Max, etc."
                                required 
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">TIPO</label>
                            <input 
                                type="text" 
                                name="type" 
                                value={formData.type} 
                                onChange={handleChange} 
                                className="w-full p-2 border rounded" 
                                placeholder="Campero, Camioneta, etc."
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">AÑO *</label>
                            <input 
                                type="number" 
                                name="year" 
                                value={formData.year} 
                                onChange={handleChange} 
                                className="w-full p-2 border rounded" 
                                min="1900"
                                max={new Date().getFullYear() + 1}
                                required 
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">COLOR</label>
                            <input 
                                type="text" 
                                name="color" 
                                value={formData.color} 
                                onChange={handleChange} 
                                className="w-full p-2 border rounded" 
                                placeholder="Blanco, Negro, etc."
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">TIPO CARROCERÍA</label>
                            <input 
                                type="text" 
                                name="bodyType" 
                                value={formData.bodyType} 
                                onChange={handleChange} 
                                className="w-full p-2 border rounded" 
                                placeholder="Sedan, SUV, etc."
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">No. DE PASAJEROS</label>
                            <input 
                                type="number" 
                                name="capacity" 
                                value={formData.capacity} 
                                onChange={handleChange} 
                                className="w-full p-2 border rounded" 
                                min="1"
                                max="50"
                            />
                        </div>
                    </div>
                </div>

                {/* Sección 2: Especificaciones Técnicas */}
                <div className="mb-6 pt-4 border-t">
                    <h3 className="text-lg font-bold text-green-900 mb-3 bg-green-50 p-2 rounded">🔧 Especificaciones Técnicas</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">NÚMERO DE MOTOR</label>
                            <input 
                                type="text" 
                                name="engineNumber" 
                                value={formData.engineNumber} 
                                onChange={handleChange} 
                                className="w-full p-2 border rounded font-mono" 
                                placeholder="ej: 1GR1234567"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">NÚMERO DE CHASIS</label>
                            <input 
                                type="text" 
                                name="chassisNumber" 
                                value={formData.chassisNumber} 
                                onChange={handleChange} 
                                className="w-full p-2 border rounded font-mono" 
                                placeholder="ej: JT123456789"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">CILINDRAJE</label>
                            <input 
                                type="text" 
                                name="cylinderCapacity" 
                                value={formData.cylinderCapacity} 
                                onChange={handleChange} 
                                className="w-full p-2 border rounded" 
                                placeholder="ej: 2700 cc"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">SERIE No.</label>
                            <input 
                                type="text" 
                                name="serialNumber" 
                                value={formData.serialNumber} 
                                onChange={handleChange} 
                                className="w-full p-2 border rounded font-mono" 
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">TIPO COMBUSTIBLE</label>
                            <select 
                                name="fuelType" 
                                value={formData.fuelType} 
                                onChange={handleChange} 
                                className="w-full p-2 border rounded"
                            >
                                <option value="">Seleccionar...</option>
                                <option value="Gasolina">Gasolina</option>
                                <option value="Diesel">Diesel</option>
                                <option value="Gas Natural">Gas Natural</option>
                                <option value="Eléctrico">Eléctrico</option>
                                <option value="Híbrido">Híbrido</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">KILOMETRAJE ACTUAL</label>
                            <input 
                                type="number" 
                                name="mileage" 
                                value={formData.mileage} 
                                onChange={handleChange} 
                                className="w-full p-2 border rounded" 
                                min="0"
                            />
                        </div>
                    </div>
                </div>

                {/* Sección 3: Documentación */}
                <div className="mb-6 pt-4 border-t">
                    <h3 className="text-lg font-bold text-purple-900 mb-3 bg-purple-50 p-2 rounded">📄 Documentación Legal</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">LICENCIA TRÁNSITO No.</label>
                            <input 
                                type="text" 
                                name="transitLicense" 
                                value={formData.transitLicense} 
                                onChange={handleChange} 
                                className="w-full p-2 border rounded font-mono" 
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">VIN (Identificación Vehicular)</label>
                            <input 
                                type="text" 
                                name="vin" 
                                value={formData.vin} 
                                onChange={handleChange} 
                                className="w-full p-2 border rounded font-mono uppercase" 
                                placeholder="17 caracteres"
                                maxLength={17}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">PROPIETARIO</label>
                            <input 
                                type="text" 
                                name="owner" 
                                value={formData.owner} 
                                onChange={handleChange} 
                                className="w-full p-2 border rounded" 
                                placeholder="Personería de Bogotá"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">ESTADO *</label>
                            <select 
                                name="status" 
                                value={formData.status} 
                                onChange={handleChange} 
                                className="w-full p-2 border rounded"
                                required
                            >
                                {Object.values(VehicleStatus).map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Sección 4: Seguros */}
                <div className="mb-6 pt-4 border-t">
                    <h3 className="text-lg font-bold text-yellow-900 mb-3 bg-yellow-50 p-2 rounded">⚠️ Seguros y Vencimientos</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">ASEGURADORA</label>
                            <input 
                                type="text" 
                                name="insuranceCompany" 
                                value={formData.insuranceCompany} 
                                onChange={handleChange} 
                                className="w-full p-2 border rounded" 
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">PÓLIZA No.</label>
                            <input 
                                type="text" 
                                name="insurancePolicy" 
                                value={formData.insurancePolicy} 
                                onChange={handleChange} 
                                className="w-full p-2 border rounded font-mono" 
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">VENCIMIENTO SOAT</label>
                            <input 
                                type="date" 
                                name="soatExpiry" 
                                value={formData.soatExpiry} 
                                onChange={handleChange} 
                                className="w-full p-2 border rounded" 
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">VENCIMIENTO TECNOMECÁNICA</label>
                            <input 
                                type="date" 
                                name="techReviewExpiry" 
                                value={formData.techReviewExpiry} 
                                onChange={handleChange} 
                                className="w-full p-2 border rounded" 
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">ARCHIVO HOJA DE VIDA (Excel)</label>
                            <input 
                                type="text" 
                                name="historyFile" 
                                value={formData.historyFile} 
                                onChange={handleChange} 
                                className="w-full p-2 border rounded text-sm" 
                                placeholder="Ruta al archivo Excel"
                            />
                        </div>
                    </div>
                </div>

                <div className="flex justify-end space-x-3 pt-4 border-t sticky bottom-0 bg-white">
                    <button type="button" onClick={onClose} className="px-6 py-2 bg-gray-200 rounded hover:bg-gray-300 font-medium">Cancelar</button>
                    <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-medium">💾 Guardar</button>
                </div>
            </form>
        </Modal>
    );
};

const ConfirmDeleteModal: React.FC<{isOpen: boolean, onConfirm: () => void, onClose: () => void, itemName: string}> = ({isOpen, onConfirm, onClose, itemName}) => (
    <Modal isOpen={isOpen} title="Confirmar Eliminación" onClose={onClose}>
        <p className="text-gray-700 mb-4">¿Estás seguro de eliminar <strong>{itemName}</strong>?</p>
        <div className="flex justify-end space-x-3">
            <button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">Cancelar</button>
            <button onClick={onConfirm} className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">Eliminar</button>
        </div>
    </Modal>
);

const VehicleHistoryModal: React.FC<{isOpen: boolean, vehicle: Vehicle, onClose: () => void}> = ({isOpen, vehicle, onClose}) => (
    <Modal isOpen={isOpen} title={`📋 Hoja de Vida - ${vehicle.model}`} onClose={onClose}>
        <div className="space-y-4 max-h-[60vh] overflow-y-auto">
            <div className="bg-blue-50 p-4 rounded">
                <h3 className="font-bold mb-2">🚗 Información General</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                    <div><strong>Modelo:</strong> {vehicle.model}</div>
                    <div><strong>Marca:</strong> {vehicle.make}</div>
                    <div><strong>Placa:</strong> {vehicle.plate}</div>
                    <div><strong>Año:</strong> {vehicle.year}</div>
                    <div><strong>Color:</strong> {vehicle.color || 'N/A'}</div>
                    <div><strong>VIN:</strong> {vehicle.vin || 'N/A'}</div>
                </div>
            </div>
            <div className="bg-green-50 p-4 rounded">
                <h3 className="font-bold mb-2">⚙️ Especificaciones</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                    <div><strong>Combustible:</strong> {vehicle.fuelType || 'N/A'}</div>
                    <div><strong>Capacidad:</strong> {vehicle.capacity || 'N/A'}</div>
                    <div><strong>Kilometraje:</strong> {vehicle.mileage || 'N/A'} km</div>
                    <div><strong>Estado:</strong> {vehicle.status}</div>
                </div>
            </div>
            <div className="bg-orange-50 p-4 rounded">
                <h3 className="font-bold mb-2">📄 Documentación</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                    <div><strong>Aseguradora:</strong> {vehicle.insuranceCompany || 'N/A'}</div>
                    <div><strong>Póliza:</strong> {vehicle.insurancePolicy || 'N/A'}</div>
                    <div><strong>SOAT:</strong> {vehicle.soatExpiry || 'N/A'}</div>
                    <div><strong>Revisión:</strong> {vehicle.techReviewExpiry || 'N/A'}</div>
                </div>
            </div>
            {vehicle.historyFile && (
                <div className="bg-gray-50 p-4 rounded">
                    <h3 className="font-bold mb-2">📁 Archivo</h3>
                    <p className="text-sm font-mono break-all">{vehicle.historyFile}</p>
                </div>
            )}
        </div>
        <div className="flex justify-end mt-4">
            <button onClick={onClose} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Cerrar</button>
        </div>
    </Modal>
);

export default Vehicles;
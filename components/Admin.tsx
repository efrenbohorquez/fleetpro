import React, { useState } from 'react';
import { Driver, Vehicle, DriverStatus, VehicleStatus } from '../types';
import { Modal } from './common/Modal';
import { Pencil, Trash2, Plus, UserCheck, UserX, Car, AlertCircle } from './icons';

type TabType = 'drivers' | 'vehicles';

// Simple Card component for Admin
const AdminCard: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    {children}
  </div>
);

interface AdminProps {
  drivers: Driver[];
  setDrivers: React.Dispatch<React.SetStateAction<Driver[]>>;
  vehicles: Vehicle[];
  setVehicles: React.Dispatch<React.SetStateAction<Vehicle[]>>;
}

const Admin: React.FC<AdminProps> = ({ drivers, setDrivers, vehicles, setVehicles }) => {
  const [activeTab, setActiveTab] = useState<TabType>('drivers');
  
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);

  // Form states for Driver
  const [driverForm, setDriverForm] = useState({
    name: '',
    licenseNumber: '',
    contact: '',
    status: DriverStatus.Available
  });

  // Form states for Vehicle
  const [vehicleForm, setVehicleForm] = useState({
    make: '',
    model: '',
    year: new Date().getFullYear(),
    plate: '',
    status: VehicleStatus.Available
  });

  // Driver CRUD Operations
  const handleAddDriver = () => {
    setModalMode('add');
    setDriverForm({
      name: '',
      licenseNumber: '',
      contact: '',
      status: DriverStatus.Available
    });
    setIsModalOpen(true);
  };

  const handleEditDriver = (driver: Driver) => {
    setModalMode('edit');
    setSelectedDriver(driver);
    setDriverForm({
      name: driver.name,
      licenseNumber: driver.licenseNumber,
      contact: driver.contact,
      status: driver.status
    });
    setIsModalOpen(true);
  };

  const handleDeleteDriver = (id: string) => {
    if (window.confirm('¿Está seguro de eliminar este conductor?')) {
      setDrivers(drivers.filter(d => d.id !== id));
    }
  };

  const handleSaveDriver = () => {
    if (modalMode === 'add') {
      const newDriver: Driver = {
        id: `d${drivers.length + 1}`,
        ...driverForm
      };
      setDrivers([...drivers, newDriver]);
    } else if (selectedDriver) {
      setDrivers(drivers.map(d => 
        d.id === selectedDriver.id ? { ...d, ...driverForm } : d
      ));
    }
    setIsModalOpen(false);
    setSelectedDriver(null);
  };

  const handleToggleDriverStatus = (driver: Driver) => {
    const newStatus = driver.status === DriverStatus.Available 
      ? DriverStatus.OnLeave 
      : DriverStatus.Available;
    
    setDrivers(drivers.map(d => 
      d.id === driver.id ? { ...d, status: newStatus } : d
    ));
  };

  // Vehicle CRUD Operations
  const handleAddVehicle = () => {
    setModalMode('add');
    setVehicleForm({
      make: '',
      model: '',
      year: new Date().getFullYear(),
      plate: '',
      status: VehicleStatus.Available
    });
    setIsModalOpen(true);
  };

  const handleEditVehicle = (vehicle: Vehicle) => {
    setModalMode('edit');
    setSelectedVehicle(vehicle);
    setVehicleForm({
      make: vehicle.make,
      model: vehicle.model,
      year: vehicle.year,
      plate: vehicle.plate,
      status: vehicle.status
    });
    setIsModalOpen(true);
  };

  const handleDeleteVehicle = (id: string) => {
    if (window.confirm('¿Está seguro de eliminar este vehículo?')) {
      setVehicles(vehicles.filter(v => v.id !== id));
    }
  };

  const handleSaveVehicle = () => {
    if (modalMode === 'add') {
      const newVehicle: Vehicle = {
        id: `v${vehicles.length + 1}`,
        ...vehicleForm
      };
      setVehicles([...vehicles, newVehicle]);
    } else if (selectedVehicle) {
      setVehicles(vehicles.map(v => 
        v.id === selectedVehicle.id ? { ...v, ...vehicleForm } : v
      ));
    }
    setIsModalOpen(false);
    setSelectedVehicle(null);
  };

  const handleToggleVehicleStatus = (vehicle: Vehicle) => {
    const newStatus = vehicle.status === VehicleStatus.Available 
      ? VehicleStatus.Maintenance 
      : VehicleStatus.Available;
    
    setVehicles(vehicles.map(v => 
      v.id === vehicle.id ? { ...v, status: newStatus } : v
    ));
  };

  const getStatusBadgeClass = (status: DriverStatus | VehicleStatus) => {
    if (status === DriverStatus.Available || status === VehicleStatus.Available) {
      return 'bg-green-100 text-green-800';
    } else if (status === DriverStatus.OnTrip || status === VehicleStatus.InUse) {
      return 'bg-blue-100 text-blue-800';
    } else {
      return 'bg-yellow-100 text-yellow-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Administración</h1>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('drivers')}
            className={`${
              activeTab === 'drivers'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2`}
          >
            <UserCheck className="w-5 h-5" />
            Conductores ({drivers.length})
          </button>
          <button
            onClick={() => setActiveTab('vehicles')}
            className={`${
              activeTab === 'vehicles'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2`}
          >
            <Car className="w-5 h-5" />
            Vehículos ({vehicles.length})
          </button>
        </nav>
      </div>

      {/* Drivers Tab */}
      {activeTab === 'drivers' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-700">Gestión de Conductores</h2>
            <button
              onClick={handleAddDriver}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Agregar Conductor
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {drivers.map((driver) => (
              <AdminCard key={driver.id}>
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-lg text-gray-800">{driver.name}</h3>
                      <p className="text-sm text-gray-600">Licencia: {driver.licenseNumber}</p>
                      <p className="text-sm text-gray-600">Contacto: {driver.contact}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(driver.status)}`}>
                      {driver.status}
                    </span>
                  </div>

                  <div className="flex gap-2 pt-3 border-t border-gray-200">
                    <button
                      onClick={() => handleToggleDriverStatus(driver)}
                      className={`flex-1 px-3 py-2 rounded text-sm font-medium ${
                        driver.status === DriverStatus.Available
                          ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                          : 'bg-green-100 text-green-700 hover:bg-green-200'
                      }`}
                      title={driver.status === DriverStatus.Available ? 'Marcar como inactivo' : 'Activar'}
                    >
                      {driver.status === DriverStatus.Available ? <UserX className="w-4 h-4 mx-auto" /> : <UserCheck className="w-4 h-4 mx-auto" />}
                    </button>
                    <button
                      onClick={() => handleEditDriver(driver)}
                      className="flex-1 bg-blue-100 text-blue-700 px-3 py-2 rounded hover:bg-blue-200 text-sm font-medium flex items-center justify-center gap-1"
                    >
                      <Pencil className="w-4 h-4" />
                      Editar
                    </button>
                    <button
                      onClick={() => handleDeleteDriver(driver.id)}
                      className="flex-1 bg-red-100 text-red-700 px-3 py-2 rounded hover:bg-red-200 text-sm font-medium flex items-center justify-center gap-1"
                    >
                      <Trash2 className="w-4 h-4" />
                      Eliminar
                    </button>
                  </div>
                </div>
              </AdminCard>
            ))}
          </div>
        </div>
      )}

      {/* Vehicles Tab */}
      {activeTab === 'vehicles' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-700">Gestión de Vehículos</h2>
            <button
              onClick={handleAddVehicle}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Agregar Vehículo
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {vehicles.map((vehicle) => (
              <AdminCard key={vehicle.id}>
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-lg text-gray-800">{vehicle.make} {vehicle.model}</h3>
                      <p className="text-sm text-gray-600">Placa: {vehicle.plate}</p>
                      <p className="text-sm text-gray-600">Año: {vehicle.year}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(vehicle.status)}`}>
                      {vehicle.status}
                    </span>
                  </div>

                  <div className="flex gap-2 pt-3 border-t border-gray-200">
                    <button
                      onClick={() => handleToggleVehicleStatus(vehicle)}
                      className={`flex-1 px-3 py-2 rounded text-sm font-medium ${
                        vehicle.status === VehicleStatus.Available
                          ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                          : 'bg-green-100 text-green-700 hover:bg-green-200'
                      }`}
                      title={vehicle.status === VehicleStatus.Available ? 'Marcar en mantenimiento' : 'Activar'}
                    >
                      {vehicle.status === VehicleStatus.Available ? <AlertCircle className="w-4 h-4 mx-auto" /> : <Car className="w-4 h-4 mx-auto" />}
                    </button>
                    <button
                      onClick={() => handleEditVehicle(vehicle)}
                      className="flex-1 bg-blue-100 text-blue-700 px-3 py-2 rounded hover:bg-blue-200 text-sm font-medium flex items-center justify-center gap-1"
                    >
                      <Pencil className="w-4 h-4" />
                      Editar
                    </button>
                    <button
                      onClick={() => handleDeleteVehicle(vehicle.id)}
                      className="flex-1 bg-red-100 text-red-700 px-3 py-2 rounded hover:bg-red-200 text-sm font-medium flex items-center justify-center gap-1"
                    >
                      <Trash2 className="w-4 h-4" />
                      Eliminar
                    </button>
                  </div>
                </div>
              </AdminCard>
            ))}
          </div>
        </div>
      )}

      {/* Modal for Add/Edit Driver */}
      {isModalOpen && activeTab === 'drivers' && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedDriver(null);
          }}
          title={modalMode === 'add' ? 'Agregar Conductor' : 'Editar Conductor'}
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nombre Completo
              </label>
              <input
                type="text"
                value={driverForm.name}
                onChange={(e) => setDriverForm({ ...driverForm, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Ej: Juan Pérez"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Número de Licencia
              </label>
              <input
                type="text"
                value={driverForm.licenseNumber}
                onChange={(e) => setDriverForm({ ...driverForm, licenseNumber: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Ej: L1234567"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Contacto
              </label>
              <input
                type="text"
                value={driverForm.contact}
                onChange={(e) => setDriverForm({ ...driverForm, contact: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Ej: 555-1234"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Estado
              </label>
              <select
                value={driverForm.status}
                onChange={(e) => setDriverForm({ ...driverForm, status: e.target.value as DriverStatus })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value={DriverStatus.Available}>Disponible</option>
                <option value={DriverStatus.OnTrip}>En Viaje</option>
                <option value={DriverStatus.OnLeave}>De Permiso</option>
              </select>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setSelectedDriver(null);
                }}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button
                onClick={handleSaveDriver}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                {modalMode === 'add' ? 'Agregar' : 'Guardar'}
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Modal for Add/Edit Vehicle */}
      {isModalOpen && activeTab === 'vehicles' && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedVehicle(null);
          }}
          title={modalMode === 'add' ? 'Agregar Vehículo' : 'Editar Vehículo'}
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Marca
              </label>
              <input
                type="text"
                value={vehicleForm.make}
                onChange={(e) => setVehicleForm({ ...vehicleForm, make: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Ej: Toyota"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Modelo
              </label>
              <input
                type="text"
                value={vehicleForm.model}
                onChange={(e) => setVehicleForm({ ...vehicleForm, model: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Ej: Corolla"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Año
              </label>
              <input
                type="number"
                value={vehicleForm.year}
                onChange={(e) => setVehicleForm({ ...vehicleForm, year: parseInt(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Ej: 2023"
                min="1900"
                max={new Date().getFullYear() + 1}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Placa
              </label>
              <input
                type="text"
                value={vehicleForm.plate}
                onChange={(e) => setVehicleForm({ ...vehicleForm, plate: e.target.value.toUpperCase() })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Ej: ABC-123"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Estado
              </label>
              <select
                value={vehicleForm.status}
                onChange={(e) => setVehicleForm({ ...vehicleForm, status: e.target.value as VehicleStatus })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value={VehicleStatus.Available}>Disponible</option>
                <option value={VehicleStatus.InUse}>En Uso</option>
                <option value={VehicleStatus.Maintenance}>Mantenimiento</option>
              </select>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setSelectedVehicle(null);
                }}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button
                onClick={handleSaveVehicle}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                {modalMode === 'add' ? 'Agregar' : 'Guardar'}
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Admin;

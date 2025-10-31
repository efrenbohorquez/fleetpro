import React, { useState } from 'react';
import { Driver, Vehicle, DriverStatus, VehicleStatus } from '../types';
import { Modal } from './common/Modal';
import { 
  Plus, 
  UserCheck, 
  Car, 
  Settings, 
  FileText, 
  List,
  Users,
  Truck
} from './icons';

type ManagementView = 'menu' | 'createDriver' | 'listDrivers' | 'createVehicle' | 'listVehicles' | 'createManager' | 'listManagers' | 'surveys';

interface ManagementProps {
  drivers: Driver[];
  setDrivers: React.Dispatch<React.SetStateAction<Driver[]>>;
  vehicles: Vehicle[];
  setVehicles: React.Dispatch<React.SetStateAction<Vehicle[]>>;
}

const Management: React.FC<ManagementProps> = ({ drivers, setDrivers, vehicles, setVehicles }) => {
  const [currentView, setCurrentView] = useState<ManagementView>('menu');
  
  // Form states
  const [driverForm, setDriverForm] = useState({
    name: '',
    licenseNumber: '',
    contact: '',
    status: DriverStatus.Available
  });

  const [vehicleForm, setVehicleForm] = useState({
    make: '',
    model: '',
    year: new Date().getFullYear(),
    plate: '',
    status: VehicleStatus.Available
  });

  const [editingDriverId, setEditingDriverId] = useState<string | null>(null);
  const [editingVehicleId, setEditingVehicleId] = useState<string | null>(null);

  // Menu Button Component
  const MenuButton: React.FC<{
    icon: React.ReactNode;
    label: string;
    onClick: () => void;
    color?: string;
  }> = ({ icon, label, onClick, color = 'bg-blue-500 hover:bg-blue-600' }) => (
    <button
      onClick={onClick}
      className={`w-full ${color} text-white py-4 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-3 text-lg font-semibold`}
    >
      {icon}
      {label}
    </button>
  );

  // Driver Functions
  const handleSaveDriver = () => {
    if (!driverForm.name || !driverForm.licenseNumber || !driverForm.contact) {
      alert('Por favor complete todos los campos');
      return;
    }

    if (editingDriverId) {
      setDrivers(drivers.map(d => 
        d.id === editingDriverId ? { ...d, ...driverForm } : d
      ));
      setEditingDriverId(null);
    } else {
      const newDriver: Driver = {
        id: `d${Date.now()}`,
        ...driverForm
      };
      setDrivers([...drivers, newDriver]);
    }

    setDriverForm({
      name: '',
      licenseNumber: '',
      contact: '',
      status: DriverStatus.Available
    });
    
    alert(editingDriverId ? 'Conductor actualizado exitosamente' : 'Conductor creado exitosamente');
  };

  const handleEditDriver = (driver: Driver) => {
    setDriverForm({
      name: driver.name,
      licenseNumber: driver.licenseNumber,
      contact: driver.contact,
      status: driver.status
    });
    setEditingDriverId(driver.id);
    setCurrentView('createDriver');
  };

  const handleDeleteDriver = (id: string) => {
    if (window.confirm('¿Está seguro de eliminar este conductor?')) {
      setDrivers(drivers.filter(d => d.id !== id));
      alert('Conductor eliminado exitosamente');
    }
  };

  const handleToggleDriverStatus = (driver: Driver) => {
    const newStatus = driver.status === DriverStatus.Available 
      ? DriverStatus.OnLeave 
      : DriverStatus.Available;
    
    setDrivers(drivers.map(d => 
      d.id === driver.id ? { ...d, status: newStatus } : d
    ));
  };

  // Vehicle Functions
  const handleSaveVehicle = () => {
    if (!vehicleForm.make || !vehicleForm.model || !vehicleForm.plate) {
      alert('Por favor complete todos los campos');
      return;
    }

    if (editingVehicleId) {
      setVehicles(vehicles.map(v => 
        v.id === editingVehicleId ? { ...v, ...vehicleForm } : v
      ));
      setEditingVehicleId(null);
    } else {
      const newVehicle: Vehicle = {
        id: `v${Date.now()}`,
        ...vehicleForm
      };
      setVehicles([...vehicles, newVehicle]);
    }

    setVehicleForm({
      make: '',
      model: '',
      year: new Date().getFullYear(),
      plate: '',
      status: VehicleStatus.Available
    });
    
    alert(editingVehicleId ? 'Vehículo actualizado exitosamente' : 'Vehículo creado exitosamente');
  };

  const handleEditVehicle = (vehicle: Vehicle) => {
    setVehicleForm({
      make: vehicle.make,
      model: vehicle.model,
      year: vehicle.year,
      plate: vehicle.plate,
      status: vehicle.status
    });
    setEditingVehicleId(vehicle.id);
    setCurrentView('createVehicle');
  };

  const handleDeleteVehicle = (id: string) => {
    if (window.confirm('¿Está seguro de eliminar este vehículo?')) {
      setVehicles(vehicles.filter(v => v.id !== id));
      alert('Vehículo eliminado exitosamente');
    }
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
      return 'bg-green-500 text-white';
    } else if (status === DriverStatus.OnTrip || status === VehicleStatus.InUse) {
      return 'bg-blue-500 text-white';
    } else {
      return 'bg-yellow-500 text-white';
    }
  };

  // Render Menu
  const renderMenu = () => (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Gestión Administrativa</h1>
        <p className="text-gray-600">Sistema de administración de recursos de la flota</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <MenuButton
          icon={<Plus className="w-6 h-6" />}
          label="Crear Conductor"
          onClick={() => {
            setEditingDriverId(null);
            setDriverForm({
              name: '',
              licenseNumber: '',
              contact: '',
              status: DriverStatus.Available
            });
            setCurrentView('createDriver');
          }}
          color="bg-blue-500 hover:bg-blue-600"
        />

        <MenuButton
          icon={<List className="w-6 h-6" />}
          label="Lista de Conductores"
          onClick={() => setCurrentView('listDrivers')}
          color="bg-indigo-500 hover:bg-indigo-600"
        />

        <MenuButton
          icon={<Truck className="w-6 h-6" />}
          label="Crear Vehículo"
          onClick={() => {
            setEditingVehicleId(null);
            setVehicleForm({
              make: '',
              model: '',
              year: new Date().getFullYear(),
              plate: '',
              status: VehicleStatus.Available
            });
            setCurrentView('createVehicle');
          }}
          color="bg-green-500 hover:bg-green-600"
        />

        <MenuButton
          icon={<Car className="w-6 h-6" />}
          label="Lista de Vehículos"
          onClick={() => setCurrentView('listVehicles')}
          color="bg-teal-500 hover:bg-teal-600"
        />

        <MenuButton
          icon={<Users className="w-6 h-6" />}
          label="Administradores de Parqueadero"
          onClick={() => setCurrentView('createManager')}
          color="bg-purple-500 hover:bg-purple-600"
        />

        <MenuButton
          icon={<FileText className="w-6 h-6" />}
          label="Lista de Encuestas"
          onClick={() => setCurrentView('surveys')}
          color="bg-orange-500 hover:bg-orange-600"
        />
      </div>
    </div>
  );

  // Render Create Driver Form
  const renderCreateDriver = () => (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        {editingDriverId ? 'Editar Conductor' : 'Crear Nuevo Conductor'}
      </h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Nombre Completo *
          </label>
          <input
            type="text"
            value={driverForm.name}
            onChange={(e) => setDriverForm({ ...driverForm, name: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Ingrese el nombre completo"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Número de Licencia *
          </label>
          <input
            type="text"
            value={driverForm.licenseNumber}
            onChange={(e) => setDriverForm({ ...driverForm, licenseNumber: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Ej: L1234567890"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Contacto (Teléfono) *
          </label>
          <input
            type="text"
            value={driverForm.contact}
            onChange={(e) => setDriverForm({ ...driverForm, contact: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Ej: 300-1234567"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Estado
          </label>
          <select
            value={driverForm.status}
            onChange={(e) => setDriverForm({ ...driverForm, status: e.target.value as DriverStatus })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value={DriverStatus.Available}>Disponible</option>
            <option value={DriverStatus.OnTrip}>En Viaje</option>
            <option value={DriverStatus.OnLeave}>De Permiso</option>
          </select>
        </div>

        <div className="flex gap-4 pt-6">
          <button
            onClick={() => {
              setCurrentView('menu');
              setEditingDriverId(null);
            }}
            className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-semibold"
          >
            Volver
          </button>
          <button
            onClick={handleSaveDriver}
            className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
          >
            {editingDriverId ? 'Actualizar' : 'Guardar'}
          </button>
        </div>
      </div>
    </div>
  );

  // Render List Drivers
  const renderListDrivers = () => (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Lista de Conductores</h2>
        <button
          onClick={() => setCurrentView('menu')}
          className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
        >
          Volver al Menú
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="px-6 py-4 text-left">Nombre</th>
                <th className="px-6 py-4 text-left">Licencia</th>
                <th className="px-6 py-4 text-left">Contacto</th>
                <th className="px-6 py-4 text-left">Estado</th>
                <th className="px-6 py-4 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {drivers.map((driver, index) => (
                <tr key={driver.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-6 py-4 font-medium text-gray-900">{driver.name}</td>
                  <td className="px-6 py-4 text-gray-600">{driver.licenseNumber}</td>
                  <td className="px-6 py-4 text-gray-600">{driver.contact}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadgeClass(driver.status)}`}>
                      {driver.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2 justify-center">
                      <button
                        onClick={() => handleToggleDriverStatus(driver)}
                        className={`px-3 py-1 rounded text-xs font-semibold ${
                          driver.status === DriverStatus.Available
                            ? 'bg-yellow-500 hover:bg-yellow-600 text-white'
                            : 'bg-green-500 hover:bg-green-600 text-white'
                        }`}
                      >
                        {driver.status === DriverStatus.Available ? 'Inactivar' : 'Activar'}
                      </button>
                      <button
                        onClick={() => handleEditDriver(driver)}
                        className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded text-xs font-semibold"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDeleteDriver(driver.id)}
                        className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded text-xs font-semibold"
                      >
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-4 text-gray-600">
        Total de conductores: <span className="font-bold">{drivers.length}</span>
      </div>
    </div>
  );

  // Render Create Vehicle Form
  const renderCreateVehicle = () => (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        {editingVehicleId ? 'Editar Vehículo' : 'Crear Nuevo Vehículo'}
      </h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Marca *
          </label>
          <input
            type="text"
            value={vehicleForm.make}
            onChange={(e) => setVehicleForm({ ...vehicleForm, make: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="Ej: Toyota"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Modelo *
          </label>
          <input
            type="text"
            value={vehicleForm.model}
            onChange={(e) => setVehicleForm({ ...vehicleForm, model: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="Ej: Corolla"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Año
          </label>
          <input
            type="number"
            value={vehicleForm.year}
            onChange={(e) => setVehicleForm({ ...vehicleForm, year: parseInt(e.target.value) })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            min="1900"
            max={new Date().getFullYear() + 1}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Placa *
          </label>
          <input
            type="text"
            value={vehicleForm.plate}
            onChange={(e) => setVehicleForm({ ...vehicleForm, plate: e.target.value.toUpperCase() })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="Ej: ABC-123"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Estado
          </label>
          <select
            value={vehicleForm.status}
            onChange={(e) => setVehicleForm({ ...vehicleForm, status: e.target.value as VehicleStatus })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value={VehicleStatus.Available}>Disponible</option>
            <option value={VehicleStatus.InUse}>En Uso</option>
            <option value={VehicleStatus.Maintenance}>Mantenimiento</option>
          </select>
        </div>

        <div className="flex gap-4 pt-6">
          <button
            onClick={() => {
              setCurrentView('menu');
              setEditingVehicleId(null);
            }}
            className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-semibold"
          >
            Volver
          </button>
          <button
            onClick={handleSaveVehicle}
            className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold"
          >
            {editingVehicleId ? 'Actualizar' : 'Guardar'}
          </button>
        </div>
      </div>
    </div>
  );

  // Render List Vehicles
  const renderListVehicles = () => (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Lista de Vehículos</h2>
        <button
          onClick={() => setCurrentView('menu')}
          className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
        >
          Volver al Menú
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-green-600 text-white">
              <tr>
                <th className="px-6 py-4 text-left">Marca</th>
                <th className="px-6 py-4 text-left">Modelo</th>
                <th className="px-6 py-4 text-left">Año</th>
                <th className="px-6 py-4 text-left">Placa</th>
                <th className="px-6 py-4 text-left">Estado</th>
                <th className="px-6 py-4 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {vehicles.map((vehicle, index) => (
                <tr key={vehicle.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-6 py-4 font-medium text-gray-900">{vehicle.make}</td>
                  <td className="px-6 py-4 text-gray-600">{vehicle.model}</td>
                  <td className="px-6 py-4 text-gray-600">{vehicle.year}</td>
                  <td className="px-6 py-4 text-gray-900 font-semibold">{vehicle.plate}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadgeClass(vehicle.status)}`}>
                      {vehicle.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2 justify-center">
                      <button
                        onClick={() => handleToggleVehicleStatus(vehicle)}
                        className={`px-3 py-1 rounded text-xs font-semibold ${
                          vehicle.status === VehicleStatus.Available
                            ? 'bg-yellow-500 hover:bg-yellow-600 text-white'
                            : 'bg-green-500 hover:bg-green-600 text-white'
                        }`}
                      >
                        {vehicle.status === VehicleStatus.Available ? 'Mantenimiento' : 'Activar'}
                      </button>
                      <button
                        onClick={() => handleEditVehicle(vehicle)}
                        className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded text-xs font-semibold"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDeleteVehicle(vehicle.id)}
                        className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded text-xs font-semibold"
                      >
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-4 text-gray-600">
        Total de vehículos: <span className="font-bold">{vehicles.length}</span>
      </div>
    </div>
  );

  // Render placeholder for other views
  const renderPlaceholder = (title: string) => (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8 text-center">
      <Settings className="w-16 h-16 mx-auto text-gray-400 mb-4" />
      <h2 className="text-2xl font-bold text-gray-800 mb-4">{title}</h2>
      <p className="text-gray-600 mb-6">Esta funcionalidad estará disponible próximamente</p>
      <button
        onClick={() => setCurrentView('menu')}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
      >
        Volver al Menú
      </button>
    </div>
  );

  // Main render
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
      {currentView === 'menu' && renderMenu()}
      {currentView === 'createDriver' && renderCreateDriver()}
      {currentView === 'listDrivers' && renderListDrivers()}
      {currentView === 'createVehicle' && renderCreateVehicle()}
      {currentView === 'listVehicles' && renderListVehicles()}
      {currentView === 'createManager' && renderPlaceholder('Administradores de Parqueadero')}
      {currentView === 'surveys' && renderPlaceholder('Lista de Encuestas')}
    </div>
  );
};

export default Management;

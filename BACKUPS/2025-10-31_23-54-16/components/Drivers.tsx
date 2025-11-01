import React, { useState, useEffect } from 'react';
import { Driver, DriverStatus } from '../types';
import { Modal } from './common/Modal';
import { PlusIcon, EditIcon, DeleteIcon } from './icons';

const statusColorMap: { [key in DriverStatus]: string } = {
  [DriverStatus.Available]: 'bg-green-100 text-green-800',
  [DriverStatus.OnTrip]: 'bg-indigo-100 text-indigo-800',
  [DriverStatus.OnLeave]: 'bg-gray-100 text-gray-800',
};

interface DriversProps {
    drivers: Driver[];
    setDrivers: React.Dispatch<React.SetStateAction<Driver[]>>;
}

const Drivers: React.FC<DriversProps> = ({ drivers, setDrivers }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  
  const handleOpenModal = (driver: Driver | null = null) => {
    console.log('🔵 Abriendo modal para:', driver ? driver.name : 'Nuevo conductor');
    setSelectedDriver(driver);
    setIsModalOpen(true);
  };

  const handleOpenDeleteModal = (driver: Driver) => {
    console.log('🔴 Abriendo modal de eliminación para:', driver.name);
    setSelectedDriver(driver);
    setIsDeleteModalOpen(true);
  }

  const handleSave = (driverData: Omit<Driver, 'id'>) => {
    console.log('💾 Guardando conductor:', driverData);
    // Convertir nombre a mayúsculas
    const normalizedData = {
      ...driverData,
      name: driverData.name.toUpperCase().trim(),
      licenseNumber: driverData.licenseNumber.toUpperCase().trim(),
    };

    if (selectedDriver) {
      console.log('✏️ Actualizando conductor existente:', selectedDriver.id);
      setDrivers(drivers?.map(d => d.id === selectedDriver.id ? { ...d, ...normalizedData } : d) || []);
    } else {
      const newDriver: Driver = { id: `d${Date.now()}`, ...normalizedData };
      console.log('➕ Creando nuevo conductor:', newDriver.id);
      setDrivers([...(drivers || []), newDriver]);
    }
    setIsModalOpen(false);
    setSelectedDriver(null);
  };

  const handleDelete = () => {
      if (selectedDriver) {
          console.log('🗑️ Eliminando conductor:', selectedDriver.name);
          setDrivers(drivers?.filter(d => d.id !== selectedDriver.id) || []);
          setIsDeleteModalOpen(false);
          setSelectedDriver(null);
      }
  }

  // Filtrar conductores por búsqueda y estado
  const filteredDrivers = drivers?.filter(driver => {
    const matchesSearch = driver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         driver.licenseNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         driver.contact.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || driver.status === filterStatus;
    return matchesSearch && matchesStatus;
  }) || [];

  // Ordenar alfabéticamente por apellido (asumiendo formato: NOMBRE(S) APELLIDO(S))
  const sortedDrivers = [...filteredDrivers].sort((a, b) => {
    // Extraer apellidos (últimas 2 palabras generalmente son apellidos en nombres colombianos)
    const getLastName = (fullName: string) => {
      const parts = fullName.trim().split(' ').filter(p => p.length > 0);
      
      // Si tiene más de 2 palabras, tomar las últimas 2 como apellidos
      // Ej: "CARLOS SANTIAGO QUIJANO BAUTISTA" -> "QUIJANO BAUTISTA"
      if (parts.length >= 3) {
        return parts.slice(-2).join(' ');
      }
      // Si tiene 2 palabras, la última es el apellido
      // Ej: "MARTIN MOLANO" -> "MOLANO"
      else if (parts.length === 2) {
        return parts[1];
      }
      // Si solo tiene 1 palabra, usar esa
      return parts[0] || '';
    };

    const lastNameA = getLastName(a.name);
    const lastNameB = getLastName(b.name);
    
    // Comparar apellidos primero
    const lastNameCompare = lastNameA.localeCompare(lastNameB, 'es', { sensitivity: 'base' });
    
    // Si los apellidos son iguales, comparar nombres completos
    if (lastNameCompare === 0) {
      return a.name.localeCompare(b.name, 'es', { sensitivity: 'base' });
    }
    
    return lastNameCompare;
  });

  return (
    <div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div>
              <h2 className="text-3xl font-bold text-gray-800">Lista de Conductores</h2>
              <p className="text-sm text-gray-600 mt-1">Total: {sortedDrivers.length} conductor(es) - Ordenados por apellido</p>
            </div>
            <button onClick={() => handleOpenModal()} className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 shadow-md transition-all">
                <PlusIcon className="w-5 h-5 mr-2" />
                Crear Conductor
            </button>
        </div>

        {/* Filtros y búsqueda */}
        <div className="bg-white p-4 rounded-lg shadow-md mb-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">Buscar</label>
              <input
                type="text"
                id="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar por nombre, licencia o contacto..."
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="filterStatus" className="block text-sm font-medium text-gray-700 mb-1">Filtrar por Estado</label>
              <select
                id="filterStatus"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">Todos los estados</option>
                {Object.values(DriverStatus).map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

      <div className="bg-white p-6 rounded-lg shadow-md overflow-x-auto">
        {sortedDrivers.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p className="text-lg">No se encontraron conductores</p>
            <p className="text-sm mt-2">Intenta ajustar los filtros de búsqueda</p>
          </div>
        ) : (
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">Nombre</th>
                <th scope="col" className="px-6 py-3">Licencia</th>
                <th scope="col" className="px-6 py-3">Contacto</th>
                <th scope="col" className="px-6 py-3">Estado</th>
                <th scope="col" className="px-6 py-3 text-center w-48">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {sortedDrivers.map((driver) => (
                <tr key={driver.id} className="bg-white border-b hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900">{driver.name}</td>
                  <td className="px-6 py-4">{driver.licenseNumber}</td>
                  <td className="px-6 py-4">{driver.contact}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${statusColorMap[driver.status]}`}>
                      {driver.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                      <div className="flex justify-center items-center gap-2">
                          <button 
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              handleOpenModal(driver);
                            }}
                            className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm hover:shadow-md transition-all cursor-pointer" 
                            title="Editar Conductor"
                            type="button"
                          >
                            <EditIcon className="w-4 h-4 mr-1" />
                            Editar
                          </button>
                          <button 
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              handleOpenDeleteModal(driver);
                            }}
                            className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg shadow-sm hover:shadow-md transition-all cursor-pointer" 
                            title="Eliminar Conductor"
                            type="button"
                          >
                            <DeleteIcon className="w-4 h-4 mr-1" />
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
      <DriverFormModal 
        driver={selectedDriver} 
        onSave={handleSave} 
        onClose={() => {
          console.log('❌ Cerrando modal de formulario');
          setIsModalOpen(false);
          setSelectedDriver(null);
        }} 
        isOpen={isModalOpen}
      />
      <ConfirmDeleteModal 
        onConfirm={handleDelete} 
        onClose={() => {
          console.log('❌ Cerrando modal de eliminación');
          setIsDeleteModalOpen(false);
          setSelectedDriver(null);
        }} 
        itemName={selectedDriver?.name || ''} 
        isOpen={isDeleteModalOpen}
      />
    </div>
  );
};


interface DriverFormModalProps {
    driver: Driver | null;
    onSave: (driverData: Omit<Driver, 'id'>) => void;
    onClose: () => void;
    isOpen: boolean;
}

const DriverFormModal: React.FC<DriverFormModalProps> = ({ driver, onSave, onClose, isOpen }) => {
    const [formData, setFormData] = useState({
        name: '', licenseNumber: '', contact: '', status: DriverStatus.Available,
    });
    const [errors, setErrors] = useState<{[key: string]: string}>({});

    useEffect(() => {
        if (driver && isOpen) {
            console.log('📝 Cargando datos del conductor en formulario:', driver);
            setFormData({
                name: driver.name,
                licenseNumber: driver.licenseNumber,
                contact: driver.contact,
                status: driver.status,
            });
        } else if (!driver && isOpen) {
            console.log('📝 Formulario para nuevo conductor');
            // Limpiar formulario para nuevo conductor
            setFormData({
                name: '',
                licenseNumber: '',
                contact: '',
                status: DriverStatus.Available,
            });
            setErrors({});
        }
    }, [driver, isOpen]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Limpiar error al escribir
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validateForm = (): boolean => {
        const newErrors: {[key: string]: string} = {};

        // Validar nombre (mínimo 3 caracteres)
        if (formData.name.trim().length < 3) {
            newErrors.name = 'El nombre debe tener al menos 3 caracteres';
        }

        // Validar licencia (mínimo 5 caracteres)
        if (formData.licenseNumber.trim().length < 5) {
            newErrors.licenseNumber = 'La licencia debe tener al menos 5 caracteres';
        }

        // Validar contacto (mínimo 7 caracteres para números telefónicos)
        if (formData.contact.trim().length < 7) {
            newErrors.contact = 'El contacto debe tener al menos 7 caracteres';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('📤 Enviando formulario con datos:', formData);
        if (validateForm()) {
            console.log('✅ Validación exitosa, guardando...');
            onSave(formData);
        } else {
            console.log('❌ Validación fallida');
        }
    };

    return (
        <Modal title={driver ? 'Editar Conductor' : 'Crear Conductor'} onClose={onClose} isOpen={isOpen}>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Nombre Completo <span className="text-red-500">*</span>
                    </label>
                    <input 
                        type="text" 
                        id="name"
                        name="name" 
                        value={formData.name} 
                        onChange={handleChange} 
                        placeholder="Ej: JUAN CARLOS PÉREZ LÓPEZ" 
                        className={`w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                        required 
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                    <p className="text-xs text-gray-500 mt-1">Se guardará automáticamente en MAYÚSCULAS</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                        <label htmlFor="licenseNumber" className="block text-sm font-medium text-gray-700 mb-1">
                            Número de Licencia <span className="text-red-500">*</span>
                        </label>
                        <input 
                            type="text" 
                            id="licenseNumber"
                            name="licenseNumber" 
                            value={formData.licenseNumber} 
                            onChange={handleChange} 
                            placeholder="Ej: L1000000" 
                            className={`w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 ${errors.licenseNumber ? 'border-red-500' : 'border-gray-300'}`}
                            required 
                        />
                        {errors.licenseNumber && <p className="text-red-500 text-xs mt-1">{errors.licenseNumber}</p>}
                    </div>
                    
                    <div>
                        <label htmlFor="contact" className="block text-sm font-medium text-gray-700 mb-1">
                            Contacto <span className="text-red-500">*</span>
                        </label>
                        <input 
                            type="text" 
                            id="contact"
                            name="contact" 
                            value={formData.contact} 
                            onChange={handleChange} 
                            placeholder="Ej: 300 1234567" 
                            className={`w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 ${errors.contact ? 'border-red-500' : 'border-gray-300'}`}
                            required 
                        />
                        {errors.contact && <p className="text-red-500 text-xs mt-1">{errors.contact}</p>}
                    </div>
                </div>
                
                <div className="mb-6">
                    <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                        Estado <span className="text-red-500">*</span>
                    </label>
                    <select 
                        id="status" 
                        name="status" 
                        value={formData.status} 
                        onChange={handleChange} 
                        className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                    >
                        {Object.values(DriverStatus).map(s => (
                            <option key={s} value={s}>{s}</option>
                        ))}
                    </select>
                </div>

                <div className="flex justify-end space-x-3 pt-4 border-t">
                    <button 
                        type="button" 
                        onClick={onClose} 
                        className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
                    >
                        Cancelar
                    </button>
                    <button 
                        type="submit" 
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                        {driver ? 'Actualizar' : 'Crear'} Conductor
                    </button>
                </div>
            </form>
        </Modal>
    );
};

const ConfirmDeleteModal: React.FC<{onConfirm: () => void, onClose: () => void, itemName: string, isOpen: boolean}> = ({onConfirm, onClose, itemName, isOpen}) => {
    const handleConfirm = () => {
        console.log('🗑️ Confirmando eliminación');
        onConfirm();
    };

    return (
        <Modal title="Confirmar Eliminación" onClose={onClose} isOpen={isOpen}>
        <div className="py-4">
            <div className="flex items-center justify-center mb-4">
                <div className="bg-red-100 rounded-full p-3">
                    <svg className="w-12 h-12 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                </div>
            </div>
            <p className="text-center text-lg mb-2">¿Estás seguro de que deseas eliminar este conductor?</p>
            <p className="text-center text-gray-600 mb-4">
                <strong className="text-gray-900">{itemName}</strong>
            </p>
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 mb-4">
                <div className="flex">
                    <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <div className="ml-3">
                        <p className="text-sm text-yellow-700">
                            Esta acción no se puede deshacer. El conductor será eliminado permanentemente del sistema.
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <div className="flex justify-end space-x-3 pt-4 border-t">
            <button 
                type="button" 
                onClick={onClose} 
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
            >
                Cancelar
            </button>
            <button 
                type="button" 
                onClick={handleConfirm} 
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors flex items-center"
            >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Eliminar Conductor
            </button>
        </div>
        </Modal>
    );
};

export default Drivers;
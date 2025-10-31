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
  
  const handleOpenModal = (driver: Driver | null = null) => {
    setSelectedDriver(driver);
    setIsModalOpen(true);
  };

  const handleOpenDeleteModal = (driver: Driver) => {
    setSelectedDriver(driver);
    setIsDeleteModalOpen(true);
  }

  const handleSave = (driverData: Omit<Driver, 'id'>) => {
    if (selectedDriver) {
      setDrivers(drivers.map(d => d.id === selectedDriver.id ? { ...d, ...driverData } : d));
    } else {
      const newDriver: Driver = { id: `d${Date.now()}`, ...driverData };
      setDrivers([...drivers, newDriver]);
    }
    setIsModalOpen(false);
    setSelectedDriver(null);
  };

  const handleDelete = () => {
      if (selectedDriver) {
          setDrivers(drivers.filter(d => d.id !== selectedDriver.id));
          setIsDeleteModalOpen(false);
          setSelectedDriver(null);
      }
  }

  return (
    <div>
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-gray-800">Lista de Conductores</h2>
            <button onClick={() => handleOpenModal()} className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                <PlusIcon className="w-5 h-5 mr-2" />
                Crear Conductor
            </button>
        </div>
      <div className="bg-white p-6 rounded-lg shadow-md overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">Nombre</th>
              <th scope="col" className="px-6 py-3">Licencia</th>
              <th scope="col" className="px-6 py-3">Contacto</th>
              <th scope="col" className="px-6 py-3">Estado</th>
              <th scope="col" className="px-6 py-3 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {drivers.map((driver) => (
              <tr key={driver.id} className="bg-white border-b hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-900">{driver.name}</td>
                <td className="px-6 py-4">{driver.licenseNumber}</td>
                <td className="px-6 py-4">{driver.contact}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${statusColorMap[driver.status]}`}>
                    {driver.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                    <div className="flex justify-center items-center space-x-2">
                        <button onClick={() => handleOpenModal(driver)} className="p-1 text-gray-500 hover:text-gray-700" title="Editar"><EditIcon /></button>
                        <button onClick={() => handleOpenDeleteModal(driver)} className="p-1 text-red-500 hover:text-red-700" title="Eliminar"><DeleteIcon /></button>
                    </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isModalOpen && <DriverFormModal driver={selectedDriver} onSave={handleSave} onClose={() => setIsModalOpen(false)} />}
      {isDeleteModalOpen && selectedDriver && <ConfirmDeleteModal onConfirm={handleDelete} onClose={() => setIsDeleteModalOpen(false)} itemName={selectedDriver.name} />}
    </div>
  );
};


interface DriverFormModalProps {
    driver: Driver | null;
    onSave: (driverData: Omit<Driver, 'id'>) => void;
    onClose: () => void;
}

const DriverFormModal: React.FC<DriverFormModalProps> = ({ driver, onSave, onClose }) => {
    const [formData, setFormData] = useState({
        name: '', licenseNumber: '', contact: '', status: DriverStatus.Available,
    });

    useEffect(() => {
        if (driver) {
            setFormData({
                name: driver.name,
                licenseNumber: driver.licenseNumber,
                contact: driver.contact,
                status: driver.status,
            });
        }
    }, [driver]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <Modal title={driver ? 'Editar Conductor' : 'Crear Conductor'} onClose={onClose}>
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Nombre Completo" className="p-2 border rounded" required />
                    <input type="text" name="licenseNumber" value={formData.licenseNumber} onChange={handleChange} placeholder="Número de Licencia" className="p-2 border rounded" required />
                    <input type="text" name="contact" value={formData.contact} onChange={handleChange} placeholder="Contacto" className="p-2 border rounded" required />
                </div>
                 <div className="mb-6">
                    <label htmlFor="status" className="block text-sm font-medium text-gray-700">Estado</label>
                    <select id="status" name="status" value={formData.status} onChange={handleChange} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
                        {Object.values(DriverStatus).map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                </div>
                <div className="flex justify-end space-x-3">
                    <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">Cancelar</button>
                    <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Guardar</button>
                </div>
            </form>
        </Modal>
    );
};

const ConfirmDeleteModal: React.FC<{onConfirm: () => void, onClose: () => void, itemName: string}> = ({onConfirm, onClose, itemName}) => (
    <Modal title="Confirmar Eliminación" onClose={onClose}>
        <p>¿Estás seguro de que deseas eliminar a <strong>{itemName}</strong>? Esta acción no se puede deshacer.</p>
        <div className="flex justify-end space-x-3 mt-6">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">Cancelar</button>
            <button type="button" onClick={onConfirm} className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">Eliminar</button>
        </div>
    </Modal>
);

export default Drivers;
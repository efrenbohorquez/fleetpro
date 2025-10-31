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
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);

  const handleOpenModal = (vehicle: Vehicle | null = null) => {
    setSelectedVehicle(vehicle);
    setIsModalOpen(true);
  };

  const handleOpenDeleteModal = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
    setIsDeleteModalOpen(true);
  }

  const handleSave = (vehicleData: Omit<Vehicle, 'id'>) => {
    if (selectedVehicle) {
      setVehicles(vehicles.map(v => v.id === selectedVehicle.id ? { ...v, ...vehicleData } : v));
    } else {
      const newVehicle: Vehicle = { id: `v${Date.now()}`, ...vehicleData };
      setVehicles([...vehicles, newVehicle]);
    }
    setIsModalOpen(false);
    setSelectedVehicle(null);
  };

  const handleDelete = () => {
      if (selectedVehicle) {
          setVehicles(vehicles.filter(v => v.id !== selectedVehicle.id));
          setIsDeleteModalOpen(false);
          setSelectedVehicle(null);
      }
  }

  const handleDownloadHistory = (vehicle: Vehicle) => {
    if (vehicle.historyFile) {
      // En un entorno de producción, esto abriría el archivo
      alert(`Abriendo hoja de vida del vehículo ${vehicle.plate}\n\nArchivo: ${vehicle.historyFile}\n\nNota: En producción, esto descargaría el archivo Excel.`);
    } else {
      alert(`No hay hoja de vida disponible para el vehículo ${vehicle.plate}`);
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Lista de Vehículos</h2>
        <button onClick={() => handleOpenModal()} className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            <PlusIcon className="w-5 h-5 mr-2" />
            Crear Vehículo
        </button>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">Marca</th>
              <th scope="col" className="px-6 py-3">Modelo</th>
              <th scope="col" className="px-6 py-3">Año</th>
              <th scope="col" className="px-6 py-3">Placa</th>
              <th scope="col" className="px-6 py-3">Estado</th>
              <th scope="col" className="px-6 py-3 text-center">Hoja de Vida</th>
              <th scope="col" className="px-6 py-3 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map((vehicle) => (
              <tr key={vehicle.id} className="bg-white border-b hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-900">{vehicle.make}</td>
                <td className="px-6 py-4">{vehicle.model}</td>
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
                      onClick={() => handleDownloadHistory(vehicle)}
                      className="px-3 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700"
                      title="Ver hoja de vida"
                    >
                      📄 Ver
                    </button>
                  ) : (
                    <span className="text-gray-400 text-xs">N/A</span>
                  )}
                </td>
                <td className="px-6 py-4">
                    <div className="flex justify-center items-center space-x-2">
                        <button onClick={() => handleOpenModal(vehicle)} className="p-1 text-gray-500 hover:text-gray-700" title="Editar"><EditIcon /></button>
                        <button onClick={() => handleOpenDeleteModal(vehicle)} className="p-1 text-red-500 hover:text-red-700" title="Eliminar"><DeleteIcon /></button>
                    </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isModalOpen && <VehicleFormModal vehicle={selectedVehicle} onSave={handleSave} onClose={() => setIsModalOpen(false)} />}
      {isDeleteModalOpen && selectedVehicle && <ConfirmDeleteModal onConfirm={handleDelete} onClose={() => setIsDeleteModalOpen(false)} itemName={`${selectedVehicle.make} ${selectedVehicle.model}`} />}
    </div>
  );
};

interface VehicleFormModalProps {
    vehicle: Vehicle | null;
    onSave: (vehicleData: Omit<Vehicle, 'id'>) => void;
    onClose: () => void;
}

const VehicleFormModal: React.FC<VehicleFormModalProps> = ({ vehicle, onSave, onClose }) => {
    const [formData, setFormData] = useState({
        make: '', model: '', year: new Date().getFullYear(), plate: '', status: VehicleStatus.Available,
    });

    useEffect(() => {
        if (vehicle) {
            setFormData({
                make: vehicle.make,
                model: vehicle.model,
                year: vehicle.year,
                plate: vehicle.plate,
                status: vehicle.status,
            });
        }
    }, [vehicle]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: name === 'year' ? parseInt(value) : value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <Modal title={vehicle ? 'Editar Vehículo' : 'Crear Vehículo'} onClose={onClose}>
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <input type="text" name="make" value={formData.make} onChange={handleChange} placeholder="Marca" className="p-2 border rounded" required />
                    <input type="text" name="model" value={formData.model} onChange={handleChange} placeholder="Modelo" className="p-2 border rounded" required />
                    <input type="number" name="year" value={formData.year} onChange={handleChange} placeholder="Año" className="p-2 border rounded" required />
                    <input type="text" name="plate" value={formData.plate} onChange={handleChange} placeholder="Placa" className="p-2 border rounded" required />
                </div>
                 <div className="mb-6">
                    <label htmlFor="status" className="block text-sm font-medium text-gray-700">Estado</label>
                    <select id="status" name="status" value={formData.status} onChange={handleChange} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
                        {Object.values(VehicleStatus).map(s => <option key={s} value={s}>{s}</option>)}
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
        <p>¿Estás seguro de que deseas eliminar <strong>{itemName}</strong>? Esta acción no se puede deshacer.</p>
        <div className="flex justify-end space-x-3 mt-6">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">Cancelar</button>
            <button type="button" onClick={onConfirm} className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">Eliminar</button>
        </div>
    </Modal>
);

export default Vehicles;
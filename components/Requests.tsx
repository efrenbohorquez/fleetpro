import React, { useState, useEffect } from 'react';
import { TransportRequest, RequestStatus, VehicleStatus, DriverStatus, Vehicle, Driver, Survey } from '../types';
import { Modal } from './common/Modal';
import { EditIcon, DeleteIcon, CheckIcon, PlusIcon } from './icons';

const statusColorMap: { [key in RequestStatus]: string } = {
  [RequestStatus.Pending]: 'bg-yellow-100 text-yellow-800',
  [RequestStatus.Approved]: 'bg-blue-100 text-blue-800',
  [RequestStatus.InProgress]: 'bg-indigo-100 text-indigo-800',
  [RequestStatus.Completed]: 'bg-green-100 text-green-800',
  [RequestStatus.Canceled]: 'bg-red-100 text-red-800',
};

interface RequestsProps {
  requests: TransportRequest[];
  setRequests: React.Dispatch<React.SetStateAction<TransportRequest[]>>;
  vehicles: Vehicle[];
  setVehicles: React.Dispatch<React.SetStateAction<Vehicle[]>>;
  drivers: Driver[];
  setDrivers: React.Dispatch<React.SetStateAction<Driver[]>>;
  setSurveys: React.Dispatch<React.SetStateAction<Survey[]>>;
}

const Requests: React.FC<RequestsProps> = ({ requests, setRequests, vehicles, setVehicles, drivers, setDrivers, setSurveys }) => {
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [isSurveyModalOpen, setIsSurveyModalOpen] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<TransportRequest | null>(null);

  const handleOpenFormModal = (request: TransportRequest | null = null) => {
    setSelectedRequest(request);
    setIsFormModalOpen(true);
  };

  const handleOpenDeleteModal = (request: TransportRequest) => {
    setSelectedRequest(request);
    setIsDeleteModalOpen(true);
  };

  const handleSave = (requestData: Omit<TransportRequest, 'id' | 'status' | 'vehicleId' | 'driverId'>) => {
    if (selectedRequest) {
      setRequests(requests.map(r => 
        r.id === selectedRequest.id 
        ? { ...selectedRequest, ...requestData } 
        : r
      ));
    } else {
      const newRequest: TransportRequest = { 
        id: `r${Date.now()}`, 
        ...requestData, 
        status: RequestStatus.Pending 
      };
      setRequests(prev => [...prev, newRequest]);
    }
    setIsFormModalOpen(false);
    setSelectedRequest(null);
  };
  
  const handleDelete = () => {
    if (!selectedRequest) return;

    if (selectedRequest.vehicleId && selectedRequest.driverId && selectedRequest.status !== RequestStatus.Completed) {
         setVehicles(vehicles.map(v => v.id === selectedRequest.vehicleId ? {...v, status: VehicleStatus.Available} : v));
         setDrivers(drivers.map(d => d.id === selectedRequest.driverId ? {...d, status: DriverStatus.Available} : d));
    }

    setRequests(requests.filter(r => r.id !== selectedRequest.id));
    setIsDeleteModalOpen(false);
    setSelectedRequest(null);
  };

  const handleOpenAssignModal = (request: TransportRequest) => {
    setSelectedRequest(request);
    setIsAssignModalOpen(true);
  };

  const handleAssign = (vehicleId: string, driverId: string) => {
    if (selectedRequest) {
      setRequests(requests.map(r => 
        r.id === selectedRequest.id 
        ? { ...r, vehicleId, driverId, status: RequestStatus.Approved } 
        : r
      ));
      setVehicles(vehicles.map(v => v.id === vehicleId ? {...v, status: VehicleStatus.InUse} : v));
      setDrivers(drivers.map(d => d.id === driverId ? {...d, status: DriverStatus.OnTrip} : d));
    }
    setIsAssignModalOpen(false);
    setSelectedRequest(null);
  };

  const handleCompleteTrip = (request: TransportRequest) => {
      setRequests(requests.map(r => r.id === request.id ? {...r, status: RequestStatus.Completed} : r));
      if (request.vehicleId) {
        setVehicles(vehicles.map(v => v.id === request.vehicleId ? {...v, status: VehicleStatus.Available} : v));
      }
      if (request.driverId) {
        setDrivers(drivers.map(d => d.id === request.driverId ? {...d, status: DriverStatus.Available} : d));
      }
      setSelectedRequest(request);
      setIsSurveyModalOpen(true);
  }

  const handleSurveySubmit = (rating: number, comments: string) => {
    if (!selectedRequest) return;
    const newSurvey: Survey = {
        id: `s${Date.now()}`,
        requestId: selectedRequest.id,
        rating,
        comments,
        date: new Date().toISOString().split('T')[0],
    };
    setSurveys(prev => [...prev, newSurvey]);
    setIsSurveyModalOpen(false);
    setSelectedRequest(null);
  }
  
  const getVehicleInfo = (vehicleId?: string) => vehicles.find(v => v.id === vehicleId)?.plate || 'N/A';
  const getDriverInfo = (driverId?: string) => drivers.find(d => d.id === driverId)?.name || 'N/A';

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Gestión de Solicitudes</h2>
        <button onClick={() => handleOpenFormModal()} className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            <PlusIcon className="w-5 h-5 mr-2" />
            Crear Solicitud
        </button>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">Solicitante</th>
              <th scope="col" className="px-6 py-3">Fecha</th>
              <th scope="col" className="px-6 py-3">Destino</th>
              <th scope="col" className="px-6 py-3">Estado</th>
              <th scope="col" className="px-6 py-3">Vehículo</th>
              <th scope="col" className="px-6 py-3">Conductor</th>
              <th scope="col" className="px-6 py-3 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => (
              <tr key={req.id} className="bg-white border-b hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-900">{req.requester}</td>
                <td className="px-6 py-4">{req.date}</td>
                <td className="px-6 py-4">{req.destination}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${statusColorMap[req.status]}`}>
                    {req.status}
                  </span>
                </td>
                <td className="px-6 py-4">{getVehicleInfo(req.vehicleId)}</td>
                <td className="px-6 py-4">{getDriverInfo(req.driverId)}</td>
                <td className="px-6 py-4">
                   <div className="flex items-center justify-center space-x-2">
                        {req.status === RequestStatus.Pending && (
                            <button 
                            onClick={() => handleOpenAssignModal(req)}
                            className="font-medium text-blue-600 hover:underline"
                            >
                            Asignar
                            </button>
                        )}
                         {(req.status === RequestStatus.Approved || req.status === RequestStatus.InProgress) && (
                             <button onClick={() => handleCompleteTrip(req)} className="p-1 text-green-600 hover:text-green-800" title="Completar Viaje"><CheckIcon /></button>
                         )}
                         <button onClick={() => handleOpenFormModal(req)} className="p-1 text-gray-500 hover:text-gray-700" title="Editar"><EditIcon /></button>
                         <button onClick={() => handleOpenDeleteModal(req)} className="p-1 text-red-500 hover:text-red-700" title="Eliminar"><DeleteIcon /></button>
                   </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isAssignModalOpen && selectedRequest && <AssignModal request={selectedRequest} onAssign={handleAssign} onClose={() => setIsAssignModalOpen(false)} availableVehicles={vehicles.filter(v => v.status === VehicleStatus.Available)} availableDrivers={drivers.filter(d => d.status === DriverStatus.Available)} />}
      {isSurveyModalOpen && selectedRequest && <SurveyModal request={selectedRequest} onSubmit={handleSurveySubmit} onClose={() => {setIsSurveyModalOpen(false); setSelectedRequest(null);}} />}
      {isFormModalOpen && <RequestFormModal request={selectedRequest} onSave={handleSave} onClose={() => {setIsFormModalOpen(false); setSelectedRequest(null);}} />}
      {isDeleteModalOpen && selectedRequest && <ConfirmDeleteModal onConfirm={handleDelete} onClose={() => {setIsDeleteModalOpen(false); setSelectedRequest(null);}} itemName={`la solicitud de ${selectedRequest.requester}`} />}
    </div>
  );
};

interface AssignModalProps {
    request: TransportRequest;
    onClose: () => void;
    onAssign: (vehicleId: string, driverId: string) => void;
    availableVehicles: Vehicle[];
    availableDrivers: Driver[];
}

const AssignModal: React.FC<AssignModalProps> = ({ request, onClose, onAssign, availableVehicles, availableDrivers }) => {
    const [vehicleId, setVehicleId] = useState('');
    const [driverId, setDriverId] = useState('');
    const [notes, setNotes] = useState('');
    const [responsable, setResponsable] = useState('EFRÉN BOHÓRQUEZ');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if(vehicleId && driverId) {
            onAssign(vehicleId, driverId);
        }
    }

    const selectedVehicle = availableVehicles.find(v => v.id === vehicleId);
    const selectedDriver = availableDrivers.find(d => d.id === driverId);

    return (
        <Modal title="Aprobar" onClose={onClose}>
            <form onSubmit={handleSubmit}>
                {/* Header con número de solicitud */}
                <div className="text-right mb-4">
                    <span className="text-blue-600 font-semibold">Solicitud de vehículo N° {request.id}</span>
                </div>

                {/* Grid de 3 columnas */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                    {/* Responsable Parque Automotor */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Responsable Parque Automotor
                        </label>
                        <select 
                            value={responsable}
                            onChange={e => setResponsable(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            aria-label="Responsable del Parque Automotor"
                        >
                            <option value="EFRÉN BOHÓRQUEZ">EFRÉN BOHÓRQUEZ</option>
                            <option value="Otro responsable">Otro responsable</option>
                        </select>
                    </div>

                    {/* Placas del Vehículo */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Placas del Vehículo
                        </label>
                        <select 
                            value={vehicleId}
                            onChange={e => setVehicleId(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            aria-label="Seleccionar vehículo por placa"
                        >
                            <option value="">Seleccione...</option>
                            {availableVehicles.map(v => (
                                <option key={v.id} value={v.id}>
                                    {v.plate} {v.make && v.model ? `${v.make}` : ''}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Conductor Asignado */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Conductor Asignado
                        </label>
                        <select 
                            value={driverId}
                            onChange={e => setDriverId(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            aria-label="Seleccionar conductor"
                        >
                            <option value="">Seleccione...</option>
                            {availableDrivers.map(d => (
                                <option key={d.id} value={d.id}>{d.name}</option>
                            ))}
                        </select>
                    </div>
                </div>

                    {/* Campo de notas editable */}
                <div className="mb-6">
                    <div className="relative">
                        <textarea
                            value={notes}
                            onChange={e => setNotes(e.target.value)}
                            placeholder="SE DEBE PODER EDITAR"
                            className="w-full px-3 py-2 border-2 border-blue-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-20 resize-none"
                            aria-label="Notas de la solicitud"
                        />
                        <div className="absolute top-2 right-2 flex space-x-2">
                            <button 
                                type="button" 
                                className="text-blue-600 hover:text-blue-800"
                                aria-label="Agregar ubicación"
                                title="Agregar ubicación"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </button>
                            <button 
                                type="button" 
                                className="text-gray-600 hover:text-gray-800"
                                aria-label="Editar notas"
                                title="Editar notas"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Confirmación */}
                <div className="mb-6 text-center">
                    <p className="text-gray-700">¿Usted está seguro de aprobar la solicitud?</p>
                </div>

                {/* Botones */}
                <div className="flex justify-end space-x-3">
                    <button 
                        type="button" 
                        onClick={onClose} 
                        className="px-6 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                    >
                        Cerrar
                    </button>
                    <button 
                        type="submit" 
                        disabled={!vehicleId || !driverId} 
                        className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
                    >
                        Sí, deseo Aprobar
                    </button>
                </div>
            </form>
        </Modal>
    );
};

interface SurveyModalProps {
    request: TransportRequest;
    onClose: () => void;
    onSubmit: (rating: number, comments: string) => void;
}

const SurveyModal: React.FC<SurveyModalProps> = ({ request, onClose, onSubmit }) => {
    const [rating, setRating] = useState(0);
    const [comments, setComments] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if(rating > 0) {
            onSubmit(rating, comments);
        }
    }
    
    return (
        <Modal title={`Encuesta de Servicio`} onClose={onClose}>
            <form onSubmit={handleSubmit}>
                <p className="text-gray-600 mb-4">Por favor, califique el servicio para el viaje de <span className="font-bold">{request.requester}</span> a <span className="font-bold">{request.destination}</span>.</p>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Calificación</label>
                    <div className="flex items-center">
                        {[1, 2, 3, 4, 5].map(star => (
                            <button type="button" key={star} onClick={() => setRating(star)} className="focus:outline-none">
                                <svg className={`w-8 h-8 ${rating >= star ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.96a1 1 0 00.95.69h4.168c.969 0 1.371 1.24.588 1.81l-3.37 2.446a1 1 0 00-.364 1.118l1.287 3.96c.3.921-.755 1.688-1.539 1.118l-3.37-2.446a1 1 0 00-1.176 0l-3.37 2.446c-.784.57-1.838-.197-1.539-1.118l1.287-3.96a1 1 0 00-.364-1.118L2.07 9.387c-.783-.57-.38-1.81.588-1.81h4.168a1 1 0 00.95-.69l1.286-3.96z" />
                                </svg>
                            </button>
                        ))}
                    </div>
                </div>
                <div className="mb-6">
                    <label htmlFor="comments" className="block text-sm font-medium text-gray-700">Comentarios</label>
                    <textarea id="comments" value={comments} onChange={e => setComments(e.target.value)} rows={4} className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"></textarea>
                </div>
                <div className="flex justify-end space-x-3">
                    <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">Omitir</button>
                    <button type="submit" disabled={rating === 0} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-300">Enviar Encuesta</button>
                </div>
            </form>
        </Modal>
    )
}

interface RequestFormModalProps {
    request: TransportRequest | null;
    onSave: (requestData: Omit<TransportRequest, 'id' | 'status' | 'vehicleId' | 'driverId'>) => void;
    onClose: () => void;
}

const RequestFormModal: React.FC<RequestFormModalProps> = ({ request, onSave, onClose }) => {
    const [formData, setFormData] = useState({
        requester: '',
        department: '',
        date: new Date().toISOString().split('T')[0],
        origin: '',
        destination: '',
        passengers: 1,
    });

    useEffect(() => {
        if (request) {
            setFormData({
                requester: request.requester,
                department: request.department,
                date: request.date,
                origin: request.origin,
                destination: request.destination,
                passengers: request.passengers,
            });
        }
    }, [request]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: name === 'passengers' ? parseInt(value) || 1 : value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
    };
    
    return (
        <Modal title={request ? 'Editar Solicitud' : 'Crear Solicitud'} onClose={onClose}>
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <input type="text" name="requester" value={formData.requester} onChange={handleChange} placeholder="Solicitante" className="p-2 border rounded" required />
                    <input type="text" name="department" value={formData.department} onChange={handleChange} placeholder="Departamento" className="p-2 border rounded" required />
                    <input type="date" name="date" value={formData.date} onChange={handleChange} className="p-2 border rounded" required />
                    <input type="number" name="passengers" value={formData.passengers} onChange={handleChange} placeholder="Pasajeros" min="1" className="p-2 border rounded" required />
                </div>
                <div className="grid grid-cols-1 gap-4 mb-4">
                    <input type="text" name="origin" value={formData.origin} onChange={handleChange} placeholder="Origen" className="p-2 border rounded" required />
                    <input type="text" name="destination" value={formData.destination} onChange={handleChange} placeholder="Destino" className="p-2 border rounded" required />
                </div>
                <div className="flex justify-end space-x-3 mt-6">
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


export default Requests;
import React from 'react';
import { Vehicle } from '../types';
import { Modal } from './common/Modal';

interface VehicleDetailModalProps {
  isOpen: boolean;
  vehicle: Vehicle;
  onClose: () => void;
}

const VehicleDetailModal: React.FC<VehicleDetailModalProps> = ({ isOpen, vehicle, onClose }) => {
  return (
    <Modal title="🚗 Hoja de Vida del Vehículo" onClose={onClose} isOpen={isOpen}>
      <div className="space-y-6">
        {/* Sección 1: Identificación del Vehículo */}
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <h3 className="text-lg font-bold text-blue-900 mb-4 flex items-center">
            📋 Identificación del Vehículo
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-500">PLACA</p>
              <p className="text-lg font-bold text-gray-900">{vehicle.plate}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">MARCA</p>
              <p className="text-base text-gray-900">{vehicle.make}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">LÍNEA</p>
              <p className="text-base text-gray-900">{vehicle.model}</p>
            </div>
            {vehicle.type && (
              <div>
                <p className="text-sm font-medium text-gray-500">TIPO</p>
                <p className="text-base text-gray-900">{vehicle.type}</p>
              </div>
            )}
            {vehicle.year && (
              <div>
                <p className="text-sm font-medium text-gray-500">AÑO</p>
                <p className="text-base text-gray-900">{vehicle.year}</p>
              </div>
            )}
            {vehicle.color && (
              <div>
                <p className="text-sm font-medium text-gray-500">COLOR</p>
                <p className="text-base text-gray-900">{vehicle.color}</p>
              </div>
            )}
          </div>
        </div>

        {/* Sección 2: Especificaciones Técnicas */}
        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <h3 className="text-lg font-bold text-green-900 mb-4 flex items-center">
            🔧 Especificaciones Técnicas
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {vehicle.engineNumber && (
              <div>
                <p className="text-sm font-medium text-gray-500">NÚMERO DE MOTOR</p>
                <p className="text-base text-gray-900 font-mono">{vehicle.engineNumber}</p>
              </div>
            )}
            {vehicle.chassisNumber && (
              <div>
                <p className="text-sm font-medium text-gray-500">NÚMERO DE CHASIS</p>
                <p className="text-base text-gray-900 font-mono">{vehicle.chassisNumber}</p>
              </div>
            )}
            {vehicle.cylinderCapacity && (
              <div>
                <p className="text-sm font-medium text-gray-500">CILINDRAJE</p>
                <p className="text-base text-gray-900">{vehicle.cylinderCapacity}</p>
              </div>
            )}
            {vehicle.serialNumber && (
              <div>
                <p className="text-sm font-medium text-gray-500">SERIE No.</p>
                <p className="text-base text-gray-900 font-mono">{vehicle.serialNumber}</p>
              </div>
            )}
            {vehicle.fuelType && (
              <div>
                <p className="text-sm font-medium text-gray-500">TIPO COMBUSTIBLE</p>
                <p className="text-base text-gray-900">{vehicle.fuelType}</p>
              </div>
            )}
            {vehicle.bodyType && (
              <div>
                <p className="text-sm font-medium text-gray-500">TIPO CARROCERÍA</p>
                <p className="text-base text-gray-900">{vehicle.bodyType}</p>
              </div>
            )}
          </div>
        </div>

        {/* Sección 3: Capacidad y Documentación */}
        <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
          <h3 className="text-lg font-bold text-purple-900 mb-4 flex items-center">
            📄 Capacidad y Documentación
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {vehicle.capacity && (
              <div>
                <p className="text-sm font-medium text-gray-500">No. DE PASAJEROS</p>
                <p className="text-base text-gray-900 font-semibold">{vehicle.capacity} pasajeros</p>
              </div>
            )}
            {vehicle.transitLicense && (
              <div>
                <p className="text-sm font-medium text-gray-500">LICENCIA TRÁNSITO No.</p>
                <p className="text-base text-gray-900 font-mono">{vehicle.transitLicense}</p>
              </div>
            )}
            {vehicle.vin && (
              <div>
                <p className="text-sm font-medium text-gray-500">VIN</p>
                <p className="text-base text-gray-900 font-mono">{vehicle.vin}</p>
              </div>
            )}
            {vehicle.owner && (
              <div>
                <p className="text-sm font-medium text-gray-500">PROPIETARIO</p>
                <p className="text-base text-gray-900">{vehicle.owner}</p>
              </div>
            )}
          </div>
        </div>

        {/* Sección 4: Seguros y Vencimientos */}
        {(vehicle.insuranceCompany || vehicle.soatExpiry || vehicle.techReviewExpiry) && (
          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
            <h3 className="text-lg font-bold text-yellow-900 mb-4 flex items-center">
              ⚠️ Seguros y Vencimientos
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {vehicle.insuranceCompany && (
                <div>
                  <p className="text-sm font-medium text-gray-500">ASEGURADORA</p>
                  <p className="text-base text-gray-900">{vehicle.insuranceCompany}</p>
                </div>
              )}
              {vehicle.insurancePolicy && (
                <div>
                  <p className="text-sm font-medium text-gray-500">PÓLIZA No.</p>
                  <p className="text-base text-gray-900 font-mono">{vehicle.insurancePolicy}</p>
                </div>
              )}
              {vehicle.soatExpiry && (
                <div>
                  <p className="text-sm font-medium text-gray-500">VENCIMIENTO SOAT</p>
                  <p className="text-base text-gray-900">{vehicle.soatExpiry}</p>
                </div>
              )}
              {vehicle.techReviewExpiry && (
                <div>
                  <p className="text-sm font-medium text-gray-500">VENCIMIENTO TECNOMECÁNICA</p>
                  <p className="text-base text-gray-900">{vehicle.techReviewExpiry}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Sección 5: Estado Actual */}
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
            📊 Estado Actual
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-500">ESTADO</p>
              <span className={`inline-block px-3 py-1 text-sm font-semibold rounded-full ${
                vehicle.status === 'Disponible' ? 'bg-green-100 text-green-800' :
                vehicle.status === 'En Uso' ? 'bg-indigo-100 text-indigo-800' :
                'bg-red-100 text-red-800'
              }`}>
                {vehicle.status}
              </span>
            </div>
            {vehicle.mileage && (
              <div>
                <p className="text-sm font-medium text-gray-500">KILOMETRAJE</p>
                <p className="text-base text-gray-900 font-semibold">{vehicle.mileage.toLocaleString()} km</p>
              </div>
            )}
          </div>
        </div>

        {/* Archivo de Hoja de Vida */}
        {vehicle.historyFile && (
          <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
            <p className="text-sm text-blue-800">
              📁 <span className="font-semibold">Archivo Excel:</span> {vehicle.historyFile}
            </p>
          </div>
        )}

        {/* Botones */}
        <div className="flex justify-end gap-3 pt-4 border-t">
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

export default VehicleDetailModal;

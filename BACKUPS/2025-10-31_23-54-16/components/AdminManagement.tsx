import React, { useState } from 'react';
import { Driver, Vehicle, TransportRequest, Survey, MaintenanceRecord, DriverStatus, VehicleStatus, RequestStatus } from '../types';
import { FileText, Users, Truck, ClipboardList } from './icons';

type ViewMode = 'overview' | 'resources';

interface AdminManagementProps {
  allData: {
    drivers: Driver[];
    vehicles: Vehicle[];
    requests: TransportRequest[];
    surveys: Survey[];
    maintenance: MaintenanceRecord[];
  };
}

const AdminManagement: React.FC<AdminManagementProps> = ({ allData }) => {
  const { drivers, vehicles, requests, surveys, maintenance } = allData;
  const [viewMode, setViewMode] = useState<ViewMode>('overview');

  // Cálculos unificados de métricas
  const getMetrics = () => {
    const vehicleStats = {
      total: vehicles?.length || 0,
      available: vehicles?.filter(v => v.status === VehicleStatus.Available).length || 0,
      inUse: vehicles?.filter(v => v.status === VehicleStatus.InUse).length || 0,
      maintenance: vehicles?.filter(v => v.status === VehicleStatus.Maintenance).length || 0,
      utilizationRate: vehicles?.length > 0 
        ? ((vehicles.filter(v => v.status === VehicleStatus.InUse).length / vehicles.length) * 100).toFixed(1)
        : '0'
    };

    const driverStats = {
      total: drivers?.length || 0,
      available: drivers?.filter(d => d.status === DriverStatus.Available).length || 0,
      onTrip: drivers?.filter(d => d.status === DriverStatus.OnTrip).length || 0,
      onLeave: drivers?.filter(d => d.status === DriverStatus.OnLeave).length || 0,
      utilizationRate: drivers?.length > 0 
        ? ((drivers.filter(d => d.status === DriverStatus.OnTrip).length / drivers.length) * 100).toFixed(1)
        : '0'
    };

    const requestStats = {
      total: requests?.length || 0,
      pending: requests?.filter(r => r.status === RequestStatus.Pending).length || 0,
      approved: requests?.filter(r => r.status === RequestStatus.Approved).length || 0,
      inProgress: requests?.filter(r => r.status === RequestStatus.InProgress).length || 0,
      completed: requests?.filter(r => r.status === RequestStatus.Completed).length || 0,
      canceled: requests?.filter(r => r.status === RequestStatus.Canceled).length || 0,
      completionRate: requests?.length > 0 
        ? ((requests.filter(r => r.status === RequestStatus.Completed).length / requests.length) * 100).toFixed(1)
        : '0'
    };

    const surveyStats = {
      total: surveys?.length || 0,
      averageRating: surveys?.length > 0 
        ? (surveys.reduce((acc, s) => acc + s.rating, 0) / surveys.length).toFixed(2)
        : '0',
      rating5: surveys?.filter(s => s.rating === 5).length || 0,
      rating4: surveys?.filter(s => s.rating === 4).length || 0,
      rating3: surveys?.filter(s => s.rating === 3).length || 0,
      rating2: surveys?.filter(s => s.rating === 2).length || 0,
      rating1: surveys?.filter(s => s.rating === 1).length || 0
    };

    const maintenanceStats = {
      total: maintenance?.length || 0,
      totalCost: maintenance?.reduce((acc, m) => acc + (m.cost || 0), 0) || 0,
      averageCost: maintenance?.length > 0 
        ? (maintenance.reduce((acc, m) => acc + (m.cost || 0), 0) / maintenance.length).toFixed(2)
        : '0'
    };

    return {
      vehicles: vehicleStats,
      drivers: driverStats,
      requests: requestStats,
      surveys: surveyStats,
      maintenance: maintenanceStats
    };
  };

  const metrics = getMetrics();

  // Componente de tarjeta de métrica
  const MetricCard: React.FC<{
    title: string;
    icon: React.ReactNode;
    color: string;
    stats: Array<{ label: string; value: string | number; highlight?: boolean }>;
  }> = ({ title, icon, color, stats: cardStats }) => (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center mb-4">
        <div className={`${color} p-3 rounded-lg mr-3`}>
          {icon}
        </div>
        <h3 className="text-lg font-bold text-gray-800">{title}</h3>
      </div>
      <div className="space-y-2">
        {cardStats.map((stat, idx) => (
          <div key={idx} className="flex justify-between items-center">
            <span className="text-sm text-gray-600">{stat.label}</span>
            <span className={`text-lg font-semibold ${stat.highlight ? 'text-blue-600' : 'text-gray-900'}`}>
              {stat.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );

  // Componente de barra de progreso
  const ProgressBar: React.FC<{ label: string; value: number; max: number; color: string }> = ({ label, value, max, color }) => {
    const percentage = max > 0 ? (value / max) * 100 : 0;
    return (
      <div className="mb-3">
        <div className="flex justify-between text-sm mb-1">
          <span className="text-gray-700">{label}</span>
          <span className="text-gray-900 font-semibold">{value} / {max}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className={`${color} h-3 rounded-full transition-all duration-300`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    );
  };

  // Componente de tabla de recursos
  const ResourceTable: React.FC<{
    title: string;
    headers: string[];
    data: any[];
    renderRow: (item: any) => React.ReactNode;
  }> = ({ title, headers, data, renderRow }) => (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4">{title}</h3>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              {headers.map((header, idx) => (
                <th key={idx} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data && data.length > 0 ? (
              data.map(renderRow)
            ) : (
              <tr>
                <td colSpan={headers.length} className="px-6 py-4 text-center text-gray-500">
                  No hay datos disponibles
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

  const getStatusBadge = (status: string) => {
    const statusMap: { [key: string]: string } = {
      [VehicleStatus.Available]: 'bg-green-100 text-green-800',
      [VehicleStatus.InUse]: 'bg-blue-100 text-blue-800',
      [VehicleStatus.Maintenance]: 'bg-yellow-100 text-yellow-800',
      [DriverStatus.OnTrip]: 'bg-blue-100 text-blue-800',
      [DriverStatus.OnLeave]: 'bg-gray-100 text-gray-800',
      [RequestStatus.Pending]: 'bg-yellow-100 text-yellow-800',
      [RequestStatus.Approved]: 'bg-green-100 text-green-800',
      [RequestStatus.InProgress]: 'bg-blue-100 text-blue-800',
      [RequestStatus.Canceled]: 'bg-red-100 text-red-800',
      [RequestStatus.Completed]: 'bg-purple-100 text-purple-800',
    };
    
    if (status === 'Disponible') return 'bg-green-100 text-green-800';
    return statusMap[status] || 'bg-gray-100 text-gray-800';
  };

  // Vista de Resumen (Overview)
  const renderOverview = () => (
    <>
      {/* Estadísticas Principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <MetricCard
          title="Vehículos"
          icon={<Truck className="w-6 h-6 text-white" />}
          color="bg-blue-500"
          stats={[
            { label: 'Total', value: metrics.vehicles.total },
            { label: 'Disponibles', value: metrics.vehicles.available },
            { label: 'En Uso', value: metrics.vehicles.inUse },
            { label: 'Mantenimiento', value: metrics.vehicles.maintenance },
            { label: 'Tasa de Uso', value: `${metrics.vehicles.utilizationRate}%`, highlight: true }
          ]}
        />

        <MetricCard
          title="Conductores"
          icon={<Users className="w-6 h-6 text-white" />}
          color="bg-green-500"
          stats={[
            { label: 'Total', value: metrics.drivers.total },
            { label: 'Disponibles', value: metrics.drivers.available },
            { label: 'En Viaje', value: metrics.drivers.onTrip },
            { label: 'De Permiso', value: metrics.drivers.onLeave },
            { label: 'Tasa de Uso', value: `${metrics.drivers.utilizationRate}%`, highlight: true }
          ]}
        />

        <MetricCard
          title="Solicitudes"
          icon={<FileText className="w-6 h-6 text-white" />}
          color="bg-purple-500"
          stats={[
            { label: 'Total', value: metrics.requests.total },
            { label: 'Pendientes', value: metrics.requests.pending },
            { label: 'Completadas', value: metrics.requests.completed },
            { label: 'Tasa Finalización', value: `${metrics.requests.completionRate}%`, highlight: true }
          ]}
        />

        <MetricCard
          title="Satisfacción"
          icon={<FileText className="w-6 h-6 text-white" />}
          color="bg-pink-500"
          stats={[
            { label: 'Encuestas', value: metrics.surveys.total },
            { label: 'Promedio', value: `${metrics.surveys.averageRating}/5.0`, highlight: true },
            { label: '⭐⭐⭐⭐⭐', value: metrics.surveys.rating5 },
            { label: '⭐⭐⭐⭐', value: metrics.surveys.rating4 }
          ]}
        />

        <MetricCard
          title="Mantenimiento"
          icon={<ClipboardList className="w-6 h-6 text-white" />}
          color="bg-orange-500"
          stats={[
            { label: 'Registros', value: metrics.maintenance.total },
            { label: 'Costo Total', value: `$${metrics.maintenance.totalCost.toLocaleString()}` },
            { label: 'Costo Promedio', value: `$${Number(metrics.maintenance.averageCost).toLocaleString()}`, highlight: true }
          ]}
        />

        <MetricCard
          title="Eficiencia"
          icon={<ClipboardList className="w-6 h-6 text-white" />}
          color="bg-teal-500"
          stats={[
            { label: 'Uso Flota', value: `${metrics.vehicles.utilizationRate}%` },
            { label: 'Uso Conductores', value: `${metrics.drivers.utilizationRate}%` },
            { label: 'Satisfacción', value: `${metrics.surveys.averageRating}/5` }
          ]}
        />
      </div>

      {/* Gráficos de Distribución */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Distribución de Vehículos</h3>
          <ProgressBar label="Disponibles" value={metrics.vehicles.available} max={metrics.vehicles.total} color="bg-green-500" />
          <ProgressBar label="En Uso" value={metrics.vehicles.inUse} max={metrics.vehicles.total} color="bg-blue-500" />
          <ProgressBar label="Mantenimiento" value={metrics.vehicles.maintenance} max={metrics.vehicles.total} color="bg-yellow-500" />
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Distribución de Conductores</h3>
          <ProgressBar label="Disponibles" value={metrics.drivers.available} max={metrics.drivers.total} color="bg-green-500" />
          <ProgressBar label="En Viaje" value={metrics.drivers.onTrip} max={metrics.drivers.total} color="bg-blue-500" />
          <ProgressBar label="De Permiso" value={metrics.drivers.onLeave} max={metrics.drivers.total} color="bg-gray-400" />
        </div>
      </div>

      {/* Estado de Solicitudes */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Estado de Solicitudes</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="text-center p-4 bg-yellow-50 rounded-lg">
            <div className="text-3xl font-bold text-yellow-600">{metrics.requests.pending}</div>
            <div className="text-sm text-gray-600 mt-1">Pendientes</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-3xl font-bold text-green-600">{metrics.requests.approved}</div>
            <div className="text-sm text-gray-600 mt-1">Aprobadas</div>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-3xl font-bold text-blue-600">{metrics.requests.inProgress}</div>
            <div className="text-sm text-gray-600 mt-1">En Progreso</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-3xl font-bold text-purple-600">{metrics.requests.completed}</div>
            <div className="text-sm text-gray-600 mt-1">Completadas</div>
          </div>
          <div className="text-center p-4 bg-red-50 rounded-lg">
            <div className="text-3xl font-bold text-red-600">{metrics.requests.canceled}</div>
            <div className="text-sm text-gray-600 mt-1">Canceladas</div>
          </div>
        </div>
      </div>

      {/* Calificaciones */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Calificaciones de Servicio</h3>
        <ProgressBar label="5 Estrellas ⭐⭐⭐⭐⭐" value={metrics.surveys.rating5} max={metrics.surveys.total} color="bg-green-500" />
        <ProgressBar label="4 Estrellas ⭐⭐⭐⭐" value={metrics.surveys.rating4} max={metrics.surveys.total} color="bg-blue-500" />
        <ProgressBar label="3 Estrellas ⭐⭐⭐" value={metrics.surveys.rating3} max={metrics.surveys.total} color="bg-yellow-500" />
        <ProgressBar label="2 Estrellas ⭐⭐" value={metrics.surveys.rating2} max={metrics.surveys.total} color="bg-orange-500" />
        <ProgressBar label="1 Estrella ⭐" value={metrics.surveys.rating1} max={metrics.surveys.total} color="bg-red-500" />
        <div className="mt-4 pt-4 border-t border-gray-200 text-center">
          <div className="text-4xl font-bold text-gray-900">{metrics.surveys.averageRating}</div>
          <div className="text-sm text-gray-600">Calificación Promedio</div>
        </div>
      </div>
    </>
  );

  // Vista de Recursos Detallados
  const renderResources = () => (
    <>
      {/* Tabla de Vehículos */}
      <ResourceTable
        title="Estado Actual de Vehículos"
        headers={['Placa', 'Modelo', 'Año', 'Estado']}
        data={vehicles}
        renderRow={(vehicle: Vehicle) => (
          <tr key={vehicle.id} className="hover:bg-gray-50">
            <td className="px-6 py-4 whitespace-nowrap font-semibold text-gray-900">{vehicle.plate}</td>
            <td className="px-6 py-4 whitespace-nowrap text-gray-600">{vehicle.model}</td>
            <td className="px-6 py-4 whitespace-nowrap text-gray-600">{vehicle.year}</td>
            <td className="px-6 py-4 whitespace-nowrap">
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadge(vehicle.status)}`}>
                {vehicle.status}
              </span>
            </td>
          </tr>
        )}
      />

      {/* Tabla de Conductores */}
      <div className="mt-6">
        <ResourceTable
          title="Estado Actual de Conductores"
          headers={['Nombre', 'Licencia', 'Contacto', 'Estado']}
          data={drivers}
          renderRow={(driver: Driver) => (
            <tr key={driver.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap font-semibold text-gray-900">{driver.name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-600">{driver.licenseNumber}</td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-600">{driver.contact}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadge(driver.status)}`}>
                  {driver.status}
                </span>
              </td>
            </tr>
          )}
        />
      </div>

      {/* Tabla de Solicitudes */}
      <div className="mt-6">
        <ResourceTable
          title="Solicitudes Recientes"
          headers={['Solicitante', 'Dependencia', 'Destino', 'Fecha', 'Estado']}
          data={requests?.slice(0, 15)}
          renderRow={(request: TransportRequest) => (
            <tr key={request.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap font-semibold text-gray-900">{request.requester}</td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-600">{request.department}</td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-600">{request.destination}</td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-600">{request.date}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadge(request.status)}`}>
                  {request.status}
                </span>
              </td>
            </tr>
          )}
        />
      </div>

      {/* Tabla de Mantenimiento */}
      <div className="mt-6">
        <ResourceTable
          title="Registros de Mantenimiento"
          headers={['Vehículo', 'Tipo', 'Fecha', 'Costo', 'Descripción']}
          data={maintenance?.slice(0, 15)}
          renderRow={(record: MaintenanceRecord) => {
            const vehicle = vehicles?.find(v => v.id === record.vehicleId);
            return (
              <tr key={record.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap font-semibold text-gray-900">
                  {vehicle ? `${vehicle.model} - ${vehicle.plate}` : 'N/A'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-600">{record.type}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-600">{record.scheduledDate}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-900 font-semibold">
                  ${record.cost?.toLocaleString() || 'N/A'}
                </td>
                <td className="px-6 py-4 text-gray-600 max-w-md truncate">{record.description}</td>
              </tr>
            );
          }}
        />
      </div>
    </>
  );

  return (
    <div className="space-y-6">
      {/* Header con Pestañas */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg shadow-lg p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-4xl font-bold mb-2">Gestión y Administración Integral</h1>
            <p className="text-purple-100">Panel completo de control, reportes y análisis - Personería de Bogotá</p>
          </div>
          <ClipboardList className="w-16 h-16 text-white opacity-80" />
        </div>

        {/* Pestañas */}
        <div className="flex space-x-4">
          <button
            onClick={() => setViewMode('overview')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              viewMode === 'overview'
                ? 'bg-white text-purple-600 shadow-lg'
                : 'bg-purple-700 text-white hover:bg-purple-600'
            }`}
          >
            📊 Resumen Ejecutivo
          </button>
          <button
            onClick={() => setViewMode('resources')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              viewMode === 'resources'
                ? 'bg-white text-purple-600 shadow-lg'
                : 'bg-purple-700 text-white hover:bg-purple-600'
            }`}
          >
            📋 Recursos Detallados
          </button>
        </div>
      </div>

      {/* Contenido según la vista */}
      {viewMode === 'overview' ? renderOverview() : renderResources()}
    </div>
  );
};

export default AdminManagement;

import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card } from './common/Card';
import { getAnalyticsInsights } from '../services/geminiService';
import { VehicleStatus, RequestStatus, DriverStatus } from '../types';

interface DashboardProps {
    drivers: any[];
    vehicles: any[];
    requests: any[];
    surveys: any[];
    maintenance: any[];
}

const Dashboard: React.FC<DashboardProps> = ({ drivers, vehicles, requests, surveys, maintenance }) => {
    const [insights, setInsights] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const data = { drivers, vehicles, requests, surveys, maintenance };

    const kpiData = {
        totalVehicles: data.vehicles.length,
        availableVehicles: data.vehicles.filter(v => v.status === VehicleStatus.Available).length,
        pendingRequests: data.requests.filter(r => r.status === RequestStatus.Pending).length,
        availableDrivers: data.drivers.filter(d => d.status === DriverStatus.Available).length,
    };

    const chartData = [
        { name: 'RRHH', solicitudes: data.requests.filter(r => r.department === 'Recursos Humanos').length },
        { name: 'Finanzas', solicitudes: data.requests.filter(r => r.department === 'Finanzas').length },
        { name: 'Marketing', solicitudes: data.requests.filter(r => r.department === 'Marketing').length },
        { name: 'TI', solicitudes: data.requests.filter(r => r.department === 'TI').length },
        { name: 'Legal', solicitudes: data.requests.filter(r => r.department === 'Legal').length },
    ];
    
    const fetchInsights = async () => {
        setIsLoading(true);
        try {
            const result = await getAnalyticsInsights(data);
            setInsights(result);
        } catch (error) {
            console.error(error);
            setInsights("Hubo un error al generar los insights.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        // Solo cargar insights una vez al montar el componente
        // Para refrescar, el usuario debe usar el botón "Refrescar"
        fetchInsights();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // Array vacío = solo se ejecuta una vez al montar

    const formatInsights = (text: string) => {
        return text.split('\n').map((line, index) => {
            if (line.startsWith('* ')) {
                return <li key={index} className="mb-2 ml-4 list-disc">{line.substring(2)}</li>;
            }
            if (line.match(/^\d+\./)) {
                return <li key={index} className="mb-2 ml-4 list-decimal">{line.substring(line.indexOf('.') + 1)}</li>;
            }
            if (line.trim().length > 0 && (line.includes('**') || line.includes('*'))) {
                 const boldedLine = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<strong>$1</strong>');
                 return <p key={index} className="text-lg font-semibold my-3" dangerouslySetInnerHTML={{__html: boldedLine}} />;
            }
            return <p key={index} className="mb-2">{line}</p>;
        });
    }

    return (
        <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                <Card title="Vehículos Totales" value={kpiData.totalVehicles.toString()} />
                <Card title="Vehículos Disponibles" value={kpiData.availableVehicles.toString()} />
                <Card title="Solicitudes Pendientes" value={kpiData.pendingRequests.toString()} />
                <Card title="Conductores Disponibles" value={kpiData.availableDrivers.toString()} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                <div className="lg:col-span-3 bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold text-gray-700 mb-4">Solicitudes por Departamento</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="solicitudes" fill="#3B82F6" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                
                <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-semibold text-gray-700">Análisis con IA (Gemini)</h3>
                        <button onClick={fetchInsights} disabled={isLoading} className="text-sm bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-3 rounded-full disabled:bg-gray-400 transition-colors">
                            {isLoading ? 'Analizando...' : 'Refrescar'}
                        </button>
                    </div>
                    {isLoading ? (
                         <div className="flex justify-center items-center h-full">
                            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500"></div>
                        </div>
                    ) : (
                        <div className="text-gray-600 text-sm prose max-w-none">{formatInsights(insights)}</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
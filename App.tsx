import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Vehicles from './components/Vehicles';
import Drivers from './components/Drivers';
import Surveys from './components/Surveys';
import AdminManagement from './components/AdminManagement';
import VehicleRequest from './components/VehicleRequest';
import Maintenance from './components/Maintenance';
import { drivers as initialDrivers, vehicles as initialVehicles, requests as initialRequests, surveys as initialSurveys, maintenance as initialMaintenance } from './data/mockData';
import { Driver, Vehicle, TransportRequest, Survey, MaintenanceRecord } from './types';
import { loadDrivers, loadVehicles, loadRequests, loadSurveys, loadMaintenance, saveDrivers, saveVehicles, saveRequests, saveSurveys, saveMaintenance } from './services/storageService';

type View = 'dashboard' | 'requests' | 'vehicles' | 'drivers' | 'surveys' | 'reports' | 'admin' | 'management' | 'maintenance';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [drivers, setDrivers] = useState<Driver[]>(() => loadDrivers() || initialDrivers);
  const [vehicles, setVehicles] = useState<Vehicle[]>(() => loadVehicles() || initialVehicles);
  const [requests, setRequests] = useState<TransportRequest[]>(() => loadRequests() || initialRequests);
  const [surveys, setSurveys] = useState<Survey[]>(() => loadSurveys() || initialSurveys);
  const [maintenance, setMaintenance] = useState<MaintenanceRecord[]>(() => loadMaintenance() || initialMaintenance);

  useEffect(() => {
    saveDrivers(drivers);
  }, [drivers]);

  useEffect(() => {
    saveVehicles(vehicles);
  }, [vehicles]);

  useEffect(() => {
    saveRequests(requests);
  }, [requests]);

  useEffect(() => {
    saveSurveys(surveys);
  }, [surveys]);

  useEffect(() => {
    saveMaintenance(maintenance);
  }, [maintenance]);

  const allData = {
    drivers,
    vehicles,
    requests,
    surveys,
    maintenance
  };

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard {...allData} />;
      case 'requests':
        return <VehicleRequest requests={requests} setRequests={setRequests} vehicles={vehicles} setVehicles={setVehicles} drivers={drivers} setDrivers={setDrivers} />;
      case 'vehicles':
        return <Vehicles vehicles={vehicles} setVehicles={setVehicles} />;
      case 'drivers':
        return <Drivers drivers={drivers} setDrivers={setDrivers} />;
      case 'maintenance':
        return <Maintenance maintenance={maintenance} setMaintenance={setMaintenance} vehicles={vehicles} />;
      case 'surveys':
        return <Surveys surveys={surveys} requests={requests} />;
      case 'reports':
        return <AdminManagement allData={allData} />;
      case 'admin':
        return <AdminManagement allData={allData} />;
      case 'management':
        return <AdminManagement allData={allData} />;
      default:
        return <Dashboard {...allData} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar currentView={currentView} setCurrentView={setCurrentView} isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header onToggleSidebar={() => setSidebarOpen(!isSidebarOpen)} />
        <main className="flex-1 overflow-y-auto p-6">
          {renderView()}
        </main>
      </div>
    </div>
  );
};

export default App;


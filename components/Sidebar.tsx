
import React from 'react';
import { DashboardIcon, RequestsIcon, VehiclesIcon, DriversIcon, SurveysIcon, Settings, FileText, Car, Wrench } from './icons';

type View = 'dashboard' | 'requests' | 'vehicles' | 'drivers' | 'surveys' | 'reports' | 'admin' | 'management' | 'vehicleRequest' | 'maintenance';

interface SidebarProps {
  currentView: View;
  setCurrentView: (view: View) => void;
  isSidebarOpen: boolean;
  setSidebarOpen: (isOpen: boolean) => void;
}

const NavItem: React.FC<{
  viewName: View;
  label: string;
  icon: React.ReactNode;
  currentView: View;
  onClick: (view: View) => void;
}> = ({ viewName, label, icon, currentView, onClick }) => {
  const isActive = currentView === viewName;
  return (
    <li
      className={`flex items-center p-3 my-1 rounded-lg cursor-pointer transition-colors duration-200 ${
        isActive
          ? 'bg-blue-600 text-white shadow-lg'
          : 'text-gray-300 hover:bg-gray-700 hover:text-white'
      }`}
      onClick={() => onClick(viewName)}
    >
      {icon}
      <span className="ml-4 font-medium">{label}</span>
    </li>
  );
};

const Sidebar: React.FC<SidebarProps> = ({ currentView, setCurrentView, isSidebarOpen, setSidebarOpen }) => {

  const handleNavigation = (view: View) => {
    setCurrentView(view);
    if(window.innerWidth < 768) { // md breakpoint
        setSidebarOpen(false);
    }
  }

  const navItems = [
    { view: 'dashboard' as View, label: 'Dashboard', icon: <DashboardIcon className="w-6 h-6" /> },
    { view: 'requests' as View, label: 'Solicitudes', icon: <RequestsIcon className="w-6 h-6" /> },
    { view: 'vehicles' as View, label: 'Vehículos', icon: <VehiclesIcon className="w-6 h-6" /> },
    { view: 'drivers' as View, label: 'Conductores', icon: <DriversIcon className="w-6 h-6" /> },
    { view: 'maintenance' as View, label: 'Mantenimiento', icon: <Wrench className="w-6 h-6" /> },
    { view: 'surveys' as View, label: 'Encuestas', icon: <SurveysIcon className="w-6 h-6" /> },
    { view: 'admin' as View, label: 'Administración', icon: <Settings className="w-6 h-6" /> },
  ];

  return (
    <>
      <div className={`fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden ${isSidebarOpen ? 'block' : 'hidden'}`} onClick={() => setSidebarOpen(false)}></div>
      <aside className={`absolute md:relative inset-y-0 left-0 bg-gray-800 text-white w-64 space-y-6 py-7 px-2 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-300 ease-in-out z-30 flex flex-col shadow-2xl`}>
        <div className="px-4">
          <h2 className="text-2xl font-extrabold text-white text-center">
            Fleet<span className="text-blue-400">Pro</span>
          </h2>
          <p className="text-center text-xs text-gray-400 mt-1">Gestión de Flotas</p>
        </div>
        <nav className="flex-grow">
          <ul>
            {navItems.map((item) => (
              <NavItem
                key={item.view}
                viewName={item.view}
                label={item.label}
                icon={item.icon}
                currentView={currentView}
                onClick={handleNavigation}
              />
            ))}
          </ul>
        </nav>
        <div className="px-4 py-2 mt-auto">
            <p className="text-xs text-gray-500 text-center">&copy; 2024 Personería</p>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;

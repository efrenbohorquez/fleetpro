
import React, { useState, useRef, useEffect } from 'react';
import { MenuIcon } from './icons';
import { exportData, importData, clearAllData } from '../services/storageService';
import { getUnreadNotifications } from '../services/notificationService';
import NotificationPanel from './NotificationPanel';

interface HeaderProps {
  onToggleSidebar: () => void;
  onDataReload?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onToggleSidebar, onDataReload }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Actualizar contador de notificaciones no leídas
  useEffect(() => {
    const updateUnreadCount = () => {
      const unread = getUnreadNotifications();
      setUnreadCount(unread.length);
    };

    updateUnreadCount();
    // Actualizar cada 30 segundos
    const interval = setInterval(updateUnreadCount, 30000);

    return () => clearInterval(interval);
  }, []);

  const handleExport = () => {
    const data = exportData();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `fleet-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setShowMenu(false);
  };

  const handleImport = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (importData(content)) {
        alert('Datos importados exitosamente. La página se recargará.');
        window.location.reload();
      } else {
        alert('Error al importar los datos. Verifique el archivo.');
      }
    };
    reader.readAsText(file);
    setShowMenu(false);
  };

  const handleClearData = () => {
    if (confirm('¿Está seguro de que desea RESTAURAR todos los datos a los valores iniciales?\n\nEsto:\n- Actualizará los nombres de conductores a MAYÚSCULAS\n- Restaurará todos los datos desde mockData.ts\n- Esta acción no se puede deshacer')) {
      clearAllData();
      alert('Datos restaurados. La página se recargará con los datos actualizados.');
      window.location.reload();
    }
    setShowMenu(false);
  };

  return (
    <header className="flex items-center justify-between p-4 bg-white border-b border-gray-200 shadow-sm">
      <div className="flex items-center">
        <button 
          onClick={onToggleSidebar} 
          className="text-gray-500 focus:outline-none md:hidden mr-4"
          title="Abrir menú"
        >
          <MenuIcon className="w-6 h-6" />
        </button>
        <h1 className="text-xl md:text-2xl font-semibold text-gray-800">Panel de Administración</h1>
      </div>
      <div className="flex items-center space-x-4">
        {/* Notifications Button */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors relative"
            title="Notificaciones"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </button>
        </div>

        {/* Data Management Menu */}
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
            title="Gestión de datos"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
            </svg>
          </button>

          {showMenu && (
            <>
              <div 
                className="fixed inset-0 z-10" 
                onClick={() => setShowMenu(false)}
              ></div>
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 z-20">
                <div className="py-2">
                  <button
                    onClick={handleExport}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                  >
                    <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Exportar datos
                  </button>
                  <button
                    onClick={handleImport}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                  >
                    <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                    </svg>
                    Importar datos
                  </button>
                  <hr className="my-2" />
                  <button
                    onClick={handleClearData}
                    className="w-full text-left px-4 py-2 text-sm text-green-600 hover:bg-green-50 flex items-center"
                  >
                    <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Restaurar datos iniciales
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* User Profile */}
        <div className="relative">
          <button className="flex items-center space-x-2 focus:outline-none">
            <img
              className="h-9 w-9 rounded-full object-cover"
              src="https://picsum.photos/100/100"
              alt="Avatar del usuario"
            />
            <div className="hidden md:block text-right">
                <span className="font-medium text-gray-700">Admin</span>
                <p className="text-xs text-gray-500">Administrador de flota</p>
            </div>
          </button>
        </div>
      </div>

      {/* Hidden file input for import */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        onChange={handleFileChange}
        className="hidden"
        title="Archivo de importación"
      />

      {/* Notification Panel */}
      <NotificationPanel 
        isOpen={showNotifications} 
        onClose={() => setShowNotifications(false)} 
      />
    </header>
  );
};

export default Header;

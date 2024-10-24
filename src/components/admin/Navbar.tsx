import React, { useState } from 'react';
import { Bell, Settings, User, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import ChangePasswordModal from './ChangePasswordModal';

const AdminNavbar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/adminpanel');
  };

  return (
    <>
      <nav className="bg-gray-800 border-b border-gray-700">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <Link to="/adminpanel" className="text-2xl font-bold">
              <span className="text-white">LC</span>
              <span className="text-[#65EDBF]">247</span>
              <span className="text-white ml-2">Admin</span>
            </Link>

            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-white rounded-lg">
                <Bell className="h-5 w-5" />
              </button>
              <button 
                onClick={() => setShowPasswordModal(true)}
                className="p-2 text-gray-400 hover:text-white rounded-lg"
              >
                <Settings className="h-5 w-5" />
              </button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                  <User className="h-5 w-5 text-gray-300" />
                </div>
                <span className="text-sm font-medium text-gray-300">Admin</span>
              </div>
              <button 
                onClick={handleLogout}
                className="flex items-center space-x-2 bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg transition-colors"
              >
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <ChangePasswordModal 
        isOpen={showPasswordModal}
        onClose={() => setShowPasswordModal(false)}
      />
    </>
  );
};

export default AdminNavbar;
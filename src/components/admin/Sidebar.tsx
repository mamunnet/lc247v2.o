import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Users, 
  Building2, 
  ShieldCheck, 
  UserCog,
  Star,
  Award,
  AlertTriangle,
  Bell
} from 'lucide-react';

const AdminSidebar = () => {
  const location = useLocation();
  
  const menuItems = [
    { path: '/adminpanel', label: 'Dashboard', icon: Home },
    { path: '/adminpanel/reports', label: 'Reports', icon: AlertTriangle },
    { path: '/adminpanel/notices', label: 'Notices', icon: Bell },
    { path: '/adminpanel/company-head', label: 'Company Head', icon: Building2 },
    { path: '/adminpanel/admin', label: 'Admin', icon: ShieldCheck },
    { path: '/adminpanel/ss-admin', label: 'SS Admin', icon: UserCog },
    { path: '/adminpanel/sub-admin', label: 'Sub Admin', icon: Users },
    { path: '/adminpanel/super-agent', label: 'Super Agent', icon: Star },
    { path: '/adminpanel/master-agent', label: 'Master Agent', icon: Award }
  ];

  return (
    <aside className="w-64 bg-gray-800 min-h-screen p-4">
      <nav className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-emerald-500 text-white'
                  : 'text-gray-300 hover:bg-gray-700'
              }`}
            >
              <Icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default AdminSidebar;
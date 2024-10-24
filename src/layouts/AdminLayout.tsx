import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminNavbar from '../components/admin/Navbar';
import AdminSidebar from '../components/admin/Sidebar';
import Footer from '../components/Footer';

const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      <AdminNavbar />
      <div className="flex-1 flex">
        <AdminSidebar />
        <main className="flex-1 flex flex-col">
          <div className="flex-1 p-8">
            <Outlet />
          </div>
          <Footer />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
import React from 'react';
import { Outlet } from 'react-router-dom';
import PublicNavbar from '../components/public/Navbar';
import Footer from '../components/Footer';

const PublicLayout = () => {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      <PublicNavbar />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PublicLayout;
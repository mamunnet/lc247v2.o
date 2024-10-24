import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface MenuItem {
  label: string;
  path: string;
}

interface ScrollMenuProps {
  items: MenuItem[];
}

const ScrollMenu: React.FC<ScrollMenuProps> = ({ items }) => {
  const location = useLocation();

  return (
    <div className="bg-gray-800 border-b border-gray-700 overflow-x-auto">
      <div className="flex whitespace-nowrap p-4 gap-4">
        {items.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`px-4 py-2 rounded-lg transition-colors ${
              location.pathname === item.path
                ? 'bg-emerald-500 text-white'
                : 'text-gray-300 hover:bg-gray-700'
            }`}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ScrollMenu;
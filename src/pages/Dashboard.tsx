import React from 'react';
import { MessageSquare, ExternalLink } from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-center text-emerald-400">
        WELCOME TO LC247 OFFICIAL WEBSITE
      </h1>

      <div className="grid grid-cols-2 gap-8">
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-emerald-400">
            QUICK MASTER AGENT NO
          </h2>
          <div className="flex items-center space-x-4 bg-gray-700 p-4 rounded-lg">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-gray-600 rounded-full" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold">Sohan Mondal</h3>
              <p className="text-gray-400">Master Agent</p>
              <div className="flex space-x-2 mt-2">
                <button className="bg-emerald-500 text-white px-3 py-1 rounded-md text-sm">
                  Message
                </button>
                <button className="bg-red-500 text-white px-3 py-1 rounded-md text-sm">
                  Report
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-emerald-400">
            Our proxy link
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between bg-gray-700 p-4 rounded-lg">
              <div>
                <p className="text-gray-400">Main Link</p>
                <p>lc247.live</p>
              </div>
              <div className="flex items-center space-x-2">
                <span className="flex items-center">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></span>
                  Active
                </span>
                <button className="bg-emerald-500 text-white px-3 py-1 rounded-md text-sm">
                  Visit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
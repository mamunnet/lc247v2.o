import React from 'react';
import { Users, Activity, TrendingUp } from 'lucide-react';

const Dashboard = () => {
  const stats = [
    {
      title: 'Total Agents',
      value: '156',
      icon: Users,
      change: '+12%',
      changeType: 'increase'
    },
    {
      title: 'Active Agents',
      value: '142',
      icon: Activity,
      change: '+5%',
      changeType: 'increase'
    },
    {
      title: 'Total Transactions',
      value: '₹1.2M',
      icon: TrendingUp,
      change: '+18%',
      changeType: 'increase'
    }
  ];

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-emerald-400">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-gray-800 p-6 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">{stat.title}</p>
                  <p className="text-2xl font-semibold mt-1">{stat.value}</p>
                </div>
                <div className="bg-gray-700 p-3 rounded-lg">
                  <Icon className="h-6 w-6 text-emerald-400" />
                </div>
              </div>
              <div className="mt-4">
                <span className={`text-sm ${stat.changeType === 'increase' ? 'text-green-400' : 'text-red-400'}`}>
                  {stat.change}
                </span>
                <span className="text-gray-400 text-sm ml-2">from last month</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-emerald-400">Recent Activities</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((_, i) => (
              <div key={i} className="flex items-center space-x-4 bg-gray-700 p-4 rounded-lg">
                <div className="w-10 h-10 bg-gray-600 rounded-full" />
                <div>
                  <p className="font-medium">New agent registered</p>
                  <p className="text-sm text-gray-400">2 hours ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-emerald-400">System Status</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Server Status</span>
              <span className="flex items-center text-emerald-400">
                <span className="w-2 h-2 bg-emerald-400 rounded-full mr-2"></span>
                Operational
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span>API Status</span>
              <span className="flex items-center text-emerald-400">
                <span className="w-2 h-2 bg-emerald-400 rounded-full mr-2"></span>
                Operational
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
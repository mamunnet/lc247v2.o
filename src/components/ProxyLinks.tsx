import React from 'react';
import { ExternalLink } from 'lucide-react';

const proxyLinks = [
  { url: 'lc247.live', label: 'Main Website', status: 'active' },
  { url: 'lc247.games', label: 'Games Portal', status: 'active' },
  { url: 'lc247.bet', label: 'Betting Platform', status: 'active' },
  { url: 'lc247.asia', label: 'Asian Portal', status: 'active' },
  { url: 'lc247.app', label: 'Mobile App', status: 'active' },
  { url: 'lc247.info', label: 'This Site', status: 'active' }
];

const ProxyLinks = () => {
  return (
    <div className="bg-gray-800/90 p-6 rounded-xl border border-gray-700/50 h-full">
      <h2 className="text-xl font-bold text-emerald-400 text-center mb-6">
        OUR PROXY LINKS
      </h2>
      <div className="max-h-[200px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-emerald-500 scrollbar-track-gray-700">
        <div className="space-y-3">
          {proxyLinks.map((link) => (
            <div 
              key={link.url} 
              className="bg-gray-700/50 p-4 rounded-lg hover:bg-gray-700 transition-all duration-200 transform hover:scale-105"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">{link.label}</p>
                  <p className="text-white font-medium">{link.url}</p>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="flex items-center">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></span>
                    <span className="text-sm text-emerald-400">Active</span>
                  </span>
                  <a
                    href={`https://${link.url}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-emerald-500 hover:bg-emerald-600 text-white px-3 py-1 rounded-lg text-sm transition-all duration-200 flex items-center space-x-1"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Visit</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProxyLinks;
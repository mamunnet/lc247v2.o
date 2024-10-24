import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Globe, Facebook, MessageSquare, ChevronRight, Shield, Lock, Scale } from 'lucide-react';
import PolicyPopup from './PolicyPopup';

const Footer = () => {
  const [policyType, setPolicyType] = useState<'gambling' | 'privacy' | 'terms' | null>(null);

  const quickLinks = [
    { label: 'Company Head', path: '/company-head' },
    { label: 'Admin List', path: '/admin' },
    { label: 'Super Agent', path: '/super-agent' },
    { label: 'Master Agent', path: '/master-agent' },
  ];

  const proxyLinks = [
    { url: 'lc247.live', label: 'Main Website' },
    { url: 'lc247.games', label: 'Games Portal' },
    { url: 'lc247.bet', label: 'Betting Platform' },
  ];

  const policies = [
    { type: 'gambling', label: 'Gambling Policy', icon: Scale },
    { type: 'privacy', label: 'Privacy Policy', icon: Lock },
    { type: 'terms', label: 'Terms of Service', icon: Shield },
  ];

  return (
    <>
      <footer className="w-full bg-gray-800/50 backdrop-blur-lg border-t border-gray-700/50 mt-8">
        {/* Decorative Top Border */}
        <div className="w-full h-0.5 bg-gradient-to-r from-emerald-500/0 via-emerald-500 to-emerald-500/0"></div>
        
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Brand Section */}
            <div>
              <Link to="/" className="inline-flex items-center space-x-2">
                <h3 className="text-2xl font-bold">
                  <span className="text-white">LC</span>
                  <span className="text-[#65EDBF]">247</span>
                </h3>
              </Link>
              <a 
                href="https://lc247.live"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center space-x-2 text-emerald-400 hover:text-emerald-300 transition-colors text-sm"
              >
                <Globe className="w-4 h-4" />
                <span>Official Website</span>
              </a>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-sm font-semibold text-white mb-3">Quick Links</h4>
              <ul className="grid grid-cols-2 gap-2">
                {quickLinks.map((link) => (
                  <li key={link.path}>
                    <Link 
                      to={link.path}
                      className="text-gray-400 hover:text-emerald-400 transition-colors text-sm flex items-center space-x-1"
                    >
                      <ChevronRight className="w-3 h-3" />
                      <span>{link.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Proxy Links */}
            <div>
              <h4 className="text-sm font-semibold text-white mb-3">Our Networks</h4>
              <ul className="grid grid-cols-2 gap-2">
                {proxyLinks.map((link) => (
                  <li key={link.url}>
                    <a
                      href={`https://${link.url}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-emerald-400 transition-colors text-sm flex items-center space-x-1"
                    >
                      <ChevronRight className="w-3 h-3" />
                      <span>{link.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Policies Section */}
            <div>
              <h4 className="text-sm font-semibold text-white mb-3">Policies</h4>
              <ul className="grid grid-cols-1 gap-2">
                {policies.map((policy) => {
                  const Icon = policy.icon;
                  return (
                    <li key={policy.type}>
                      <button
                        onClick={() => setPolicyType(policy.type as any)}
                        className="text-gray-400 hover:text-emerald-400 transition-colors text-sm flex items-center space-x-2 w-full"
                      >
                        <Icon className="w-4 h-4" />
                        <span>{policy.label}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="mt-6 pt-4 border-t border-gray-700/50">
            <div className="flex flex-col md:flex-row justify-between items-center gap-2">
              <div className="text-gray-400 text-xs">
                © {new Date().getFullYear()} LC247. All rights reserved.
              </div>
              <div className="flex items-center space-x-4">
                <a
                  href="https://www.facebook.com/groups/lcexchanges247"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-500 transition-colors"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href="https://lc247.live"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-emerald-400 transition-colors"
                >
                  <Globe className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-emerald-400 transition-colors"
                >
                  <MessageSquare className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Policy Popups */}
      {policyType && (
        <PolicyPopup
          isOpen={true}
          onClose={() => setPolicyType(null)}
          type={policyType}
        />
      )}
    </>
  );
};

export default Footer;
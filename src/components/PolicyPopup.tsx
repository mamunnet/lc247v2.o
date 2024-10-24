import React from 'react';
import { X, Shield, Lock, Scale } from 'lucide-react';

interface PolicyPopupProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'gambling' | 'privacy' | 'terms';
}

const PolicyPopup: React.FC<PolicyPopupProps> = ({ isOpen, onClose, type }) => {
  if (!isOpen) return null;

  const policies = {
    gambling: {
      icon: Scale,
      title: 'Gambling Policy',
      content: (
        <>
          <p className="mb-4">
            LC247 is committed to responsible gambling and maintaining a safe gaming environment. By using our services, you agree to the following:
          </p>
          <ul className="space-y-2 text-gray-300">
            <li className="flex items-start">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
              <span>Users must be 18 years or older to participate in any gambling activities.</span>
            </li>
            <li className="flex items-start">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
              <span>We encourage setting personal limits and practicing responsible gaming.</span>
            </li>
            <li className="flex items-start">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
              <span>LC247 reserves the right to suspend accounts showing signs of problem gambling.</span>
            </li>
            <li className="flex items-start">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
              <span>Self-exclusion options are available upon request.</span>
            </li>
          </ul>
        </>
      )
    },
    privacy: {
      icon: Lock,
      title: 'Privacy Policy',
      content: (
        <>
          <p className="mb-4">
            Your privacy is important to us. This policy outlines how we collect, use, and protect your personal information:
          </p>
          <ul className="space-y-2 text-gray-300">
            <li className="flex items-start">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
              <span>We collect only necessary information for account creation and verification.</span>
            </li>
            <li className="flex items-start">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
              <span>Your data is encrypted and stored securely.</span>
            </li>
            <li className="flex items-start">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
              <span>We never share your personal information with third parties without consent.</span>
            </li>
            <li className="flex items-start">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
              <span>You can request data deletion at any time.</span>
            </li>
          </ul>
        </>
      )
    },
    terms: {
      icon: Shield,
      title: 'Terms of Service',
      content: (
        <>
          <p className="mb-4">
            By using LC247 services, you agree to these terms:
          </p>
          <ul className="space-y-2 text-gray-300">
            <li className="flex items-start">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
              <span>Users must provide accurate information during registration.</span>
            </li>
            <li className="flex items-start">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
              <span>Multiple accounts per user are not permitted.</span>
            </li>
            <li className="flex items-start">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
              <span>LC247 reserves the right to suspend or terminate accounts violating our policies.</span>
            </li>
            <li className="flex items-start">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
              <span>Users are responsible for maintaining account security.</span>
            </li>
          </ul>
        </>
      )
    }
  };

  const PolicyIcon = policies[type].icon;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-gray-800 via-gray-800/95 to-gray-800 border-b border-gray-700/50 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center">
                <PolicyIcon className="w-6 h-6 text-emerald-400" />
              </div>
              <h2 className="text-2xl font-bold text-white">{policies[type].title}</h2>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
          <div className="prose prose-invert prose-emerald max-w-none">
            {policies[type].content}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-700/50 p-6 bg-gray-800/50">
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
            >
              I Understand
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PolicyPopup;
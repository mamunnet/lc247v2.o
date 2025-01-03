import React from 'react';
import { X, Star, Phone, Hash, Globe, User } from 'lucide-react';
import { Agent } from '../types';
import { useAgents } from '../contexts/AgentContext';

interface ViewAgentModalProps {
  isOpen: boolean;
  onClose: () => void;
  agent: Agent;
}

const WhatsAppIcon = () => (
  <svg 
    viewBox="0 0 24 24" 
    width="24" 
    height="24" 
    fill="currentColor"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const ViewAgentModal: React.FC<ViewAgentModalProps> = ({ isOpen, onClose, agent }) => {
  const { agents } = useAgents();
  
  if (!isOpen) return null;

  const uplineAgent = agent.uplineId ? agents.find(a => a.id === agent.uplineId) : null;

  const getRoleName = (role: string) => {
    const roles: { [key: string]: string } = {
      'company-head': 'কোম্পানি হেড',
      'admin': 'এডমিন',
      'ss-admin': 'সিনিয়র সাব এডমিন',
      'sub-admin': 'সাব এডমিন',
      'super-agent': 'সুপার এজেন্ট',
      'master-agent': 'মাস্টার এজেন্ট'
    };
    return roles[role.toLowerCase()] || role;
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-lg w-full max-w-lg">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-emerald-400">এজেন্টের বিস্তারিত তথ্য</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Profile Section */}
          <div className="space-y-6">
            {/* Avatar and Name */}
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                {agent.name.charAt(0)}
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">{agent.name}</h3>
                <p className="text-emerald-400">{getRoleName(agent.role)}</p>
              </div>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* ID */}
              <div className="bg-gray-700/50 p-4 rounded-lg">
                <div className="flex items-center space-x-2 text-gray-400 mb-1">
                  <Hash className="w-4 h-4" />
                  <span className="text-sm">এজেন্ট আইডি</span>
                </div>
                <p className="text-white font-medium">{agent.id}</p>
              </div>

              {/* Rating */}
              <div className="bg-gray-700/50 p-4 rounded-lg">
                <div className="flex items-center space-x-2 text-gray-400 mb-1">
                  <Star className="w-4 h-4" />
                  <span className="text-sm">রেটিং</span>
                </div>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < agent.rating ? 'text-yellow-400 fill-current' : 'text-gray-500'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Phone Number */}
              <div className="bg-gray-700/50 p-4 rounded-lg">
                <div className="flex items-center space-x-2 text-gray-400 mb-1">
                  <Phone className="w-4 h-4" />
                  <span className="text-sm">ফোন নাম্বার</span>
                </div>
                <p className="text-white font-medium">{agent.phoneNumber}</p>
              </div>

              {/* WhatsApp */}
              <div className="bg-gray-700/50 p-4 rounded-lg">
                <div className="flex items-center space-x-2 text-gray-400 mb-1">
                  <Globe className="w-4 h-4" />
                  <span className="text-sm">হোয়াটসঅ্যাপ</span>
                </div>
                <a
                  href={agent.socialLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 text-[#25D366] hover:text-[#128C7E] transition-colors"
                >
                  <WhatsAppIcon />
                  <span>হোয়াটসঅ্যাপে যোগাযোগ করুন</span>
                </a>
              </div>

              {/* Upline Details */}
              {uplineAgent && (
                <div className="bg-gray-700/50 p-4 rounded-lg md:col-span-2">
                  <div className="flex items-center space-x-2 text-gray-400 mb-3">
                    <User className="w-4 h-4" />
                    <span className="text-sm">আপলাইন এজেন্টের তথ্য</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold">
                      {uplineAgent.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-white font-medium">{uplineAgent.name}</p>
                      <p className="text-emerald-400 text-sm">{getRoleName(uplineAgent.role)}</p>
                      <p className="text-gray-400 text-sm">{uplineAgent.id}</p>
                      <a
                        href={uplineAgent.socialLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#25D366] hover:text-[#128C7E] text-sm flex items-center space-x-1 mt-1"
                      >
                        <WhatsAppIcon />
                        <span>যোগাযোগ করুন</span>
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Close Button */}
          <div className="mt-6 flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              বন্ধ করুন
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewAgentModal;

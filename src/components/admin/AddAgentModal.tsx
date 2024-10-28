import React, { useState } from 'react';
import { X, Phone, User } from 'lucide-react';
import { Agent } from '../../types';

interface AddAgentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (agent: any) => void;
  roleTitle: string;
  uplines: Agent[];
  isDashboard?: boolean;
}

const AddAgentModal = ({ isOpen, onClose, onAdd, roleTitle, uplines, isDashboard = false }: AddAgentModalProps) => {
  const [formData, setFormData] = useState({
    name: '',
    id: `LC${Math.floor(100000 + Math.random() * 900000)}`,
    phoneNumber: '',
    uplineId: '',
    rating: 5,
    socialLink: '',
    role: isDashboard ? '' : roleTitle.toLowerCase().replace(/\s+/g, '-')
  });

  const agentTypes = [
    { value: 'company-head', label: 'Company Head' },
    { value: 'admin', label: 'Admin' },
    { value: 'ss-admin', label: 'SS Admin' },
    { value: 'sub-admin', label: 'Sub Admin' },
    { value: 'super-agent', label: 'Super Agent' },
    { value: 'master-agent', label: 'Master Agent' }
  ];

  const roleHierarchy: { [key: string]: string } = {
    'master-agent': 'super-agent',
    'super-agent': 'sub-admin',
    'sub-admin': 'ss-admin',
    'ss-admin': 'admin',
    'admin': 'company-head'
  };

  const getUplineOptionsForRole = (role: string): Agent[] => {
    const normalizedRole = role.toLowerCase();
    const uplineRole = roleHierarchy[normalizedRole];
    
    if (!uplineRole) return [];

    return uplines.filter(agent => 
      agent.role.toLowerCase() === uplineRole
    );
  };

  const availableUplines = formData.role ? getUplineOptionsForRole(formData.role) : [];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newAgent = {
      ...formData,
      socialLink: `https://wa.me/${formData.phoneNumber.replace(/[^0-9]/g, '')}`
    };
    
    onAdd(newAgent);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg w-full max-w-md m-4">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-emerald-400">
              Add New Agent
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg pl-10 pr-4 py-2 text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  required
                  placeholder="Enter agent name"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg pl-10 pr-4 py-2 text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  required
                  placeholder="Enter phone number"
                />
              </div>
            </div>

            {isDashboard && (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Agent Type
                </label>
                <select
                  value={formData.role}
                  onChange={(e) => {
                    setFormData({ 
                      ...formData, 
                      role: e.target.value,
                      uplineId: '' // Reset upline when role changes
                    });
                  }}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  required
                >
                  <option value="">Select agent type</option>
                  {agentTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {formData.role && formData.role !== 'company-head' && (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Select Upline
                </label>
                <select
                  value={formData.uplineId}
                  onChange={(e) => setFormData({ ...formData, uplineId: e.target.value })}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  required
                >
                  <option value="">Select an upline</option>
                  {availableUplines.map((upline) => (
                    <option key={upline.id} value={upline.id}>
                      {upline.name} ({upline.id}) - {upline.role}
                    </option>
                  ))}
                </select>
                {availableUplines.length === 0 && (
                  <p className="mt-2 text-sm text-yellow-400">
                    No available uplines found for this agent type. Please create a {roleHierarchy[formData.role]} first.
                  </p>
                )}
              </div>
            )}

            <div className="flex justify-end space-x-3 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
              >
                Add Agent
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddAgentModal;

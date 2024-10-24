import React, { useState } from 'react';
import { X, CheckCircle } from 'lucide-react';
import { Agent } from '../types';
import { useAgents } from '../contexts/AgentContext';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  agent: Agent;
}

const ReportModal = ({ isOpen, onClose, agent }: ReportModalProps) => {
  const [reason, setReason] = useState('');
  const { getAgentsByRole, submitReport } = useAgents();
  const [selectedUpline, setSelectedUpline] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [whatsappNumber, setWhatsappNumber] = useState('');
  
  const getUplineAgents = () => {
    switch (agent.role) {
      case 'master-agent':
        return getAgentsByRole('super-agent');
      case 'super-agent':
        return getAgentsByRole('sub-admin');
      case 'sub-admin':
        return getAgentsByRole('ss-admin');
      case 'ss-admin':
        return getAgentsByRole('admin');
      case 'admin':
        return getAgentsByRole('company-head');
      default:
        return getAgentsByRole('master-agent');
    }
  };

  const uplineAgents = getUplineAgents();
  const uplineRoleDisplay = agent.role === 'master-agent' ? 'Super Agent' :
                           agent.role === 'super-agent' ? 'Sub Admin' :
                           agent.role === 'sub-admin' ? 'SS Admin' :
                           agent.role === 'ss-admin' ? 'Admin' :
                           agent.role === 'admin' ? 'Company Head' : 'Master Agent';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const uplineAgent = uplineAgents.find(a => a.id === selectedUpline);
    if (!uplineAgent) return;

    try {
      await submitReport({
        agentId: agent.id,
        agentName: agent.name,
        reportedById: uplineAgent.id,
        reportedByName: uplineAgent.name,
        reason,
        whatsappNumber
      });

      setShowSuccess(true);
      setTimeout(() => {
        onClose();
        setShowSuccess(false);
        setReason('');
        setSelectedUpline('');
        setWhatsappNumber('');
      }, 3000);
    } catch (error) {
      console.error('Failed to submit report:', error);
    }
  };

  if (!isOpen) return null;

  if (showSuccess) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-gray-800 rounded-lg p-8 w-full max-w-md m-4 text-center">
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-16 w-16 text-emerald-400" />
          </div>
          <h2 className="text-2xl font-bold text-emerald-400 mb-4">Report Submitted Successfully!</h2>
          <p className="text-gray-300 mb-6">
            Thank you for your report. We will investigate this matter and contact you via WhatsApp at {whatsappNumber}.
          </p>
          <div className="animate-pulse text-sm text-gray-400">
            This window will close automatically...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md m-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-emerald-400">Report {agent.role.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Agent Information
            </label>
            <div className="bg-gray-700/50 p-4 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold">
                  {agent.name.charAt(0)}
                </div>
                <div>
                  <div className="font-medium">{agent.name}</div>
                  <div className="text-sm text-gray-400">{agent.id}</div>
                  <div className="text-sm text-emerald-400">
                    {agent.role.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Select {uplineRoleDisplay}
            </label>
            <select
              value={selectedUpline}
              onChange={(e) => setSelectedUpline(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-emerald-500"
              required
            >
              <option value="">Select {uplineRoleDisplay}</option>
              {uplineAgents.map((upline) => (
                <option key={upline.id} value={upline.id}>
                  {upline.name} ({upline.id})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Your WhatsApp Number
            </label>
            <input
              type="tel"
              value={whatsappNumber}
              onChange={(e) => setWhatsappNumber(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-emerald-500"
              placeholder="Enter your WhatsApp number"
              required
            />
            <p className="text-sm text-gray-400 mt-1">
              Include country code (e.g., +1234567890)
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Reason for Report
            </label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-emerald-500"
              rows={4}
              required
              placeholder="Please describe the reason for reporting..."
            />
          </div>

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
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              Submit Report
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReportModal;
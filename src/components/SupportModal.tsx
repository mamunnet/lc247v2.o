import React, { useState } from 'react';
import { X, Send, AlertTriangle } from 'lucide-react';
import { useAgents } from '../contexts/AgentContext';

interface SupportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SupportModal = ({ isOpen, onClose }: SupportModalProps) => {
  const [supportType, setSupportType] = useState('');
  const [agentType, setAgentType] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [message, setMessage] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const { submitReport, getAgentsByRole } = useAgents();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await submitReport({
        agentId: agentType || 'SUPPORT',
        agentName: agentType || 'General Support',
        reportedById: 'CUSTOMER',
        reportedByName: 'Customer Support',
        reason: message,
        whatsappNumber
      });

      setShowSuccess(true);
      setTimeout(() => {
        onClose();
        setShowSuccess(false);
        setSupportType('');
        setAgentType('');
        setWhatsappNumber('');
        setMessage('');
      }, 3000);
    } catch (error) {
      console.error('Failed to submit support request:', error);
    }
  };

  if (!isOpen) return null;

  if (showSuccess) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-gray-800 rounded-lg p-8 w-full max-w-md m-4 text-center">
          <div className="flex justify-center mb-4">
            <Send className="h-16 w-16 text-emerald-400" />
          </div>
          <h2 className="text-2xl font-bold text-emerald-400 mb-4">Support Request Submitted!</h2>
          <p className="text-gray-300 mb-6">
            We will contact you via WhatsApp at {whatsappNumber} to assist you further.
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
          <h2 className="text-xl font-bold text-emerald-400">Contact Support</h2>
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
              Support Type
            </label>
            <select
              value={supportType}
              onChange={(e) => setSupportType(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-emerald-500"
              required
            >
              <option value="">Select Support Type</option>
              <option value="agent">Complaints against Agent</option>
              <option value="other">Other Support</option>
            </select>
          </div>

          {supportType === 'agent' && (
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Agent Type
              </label>
              <select
                value={agentType}
                onChange={(e) => setAgentType(e.target.value)}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-emerald-500"
                required
              >
                <option value="">Select Agent Type</option>
                <option value="master-agent">Master Agent</option>
                <option value="super-agent">Super Agent</option>
                <option value="sub-admin">Sub Admin</option>
                <option value="ss-admin">SS Admin</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          )}

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
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Message
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-emerald-500"
              rows={4}
              required
              placeholder="Please describe your issue..."
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
              className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors flex items-center space-x-2"
            >
              <Send className="w-4 h-4" />
              <span>Submit</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SupportModal;
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
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const { submitReport } = useAgents();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await submitReport({
        agentId: agent.id,
        agentName: agent.name,
        reportedById: 'USER',
        reportedByName: 'Anonymous User',
        reason,
        whatsappNumber
      });

      setShowSuccess(true);
      setTimeout(() => {
        onClose();
        setShowSuccess(false);
        setReason('');
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
          <h2 className="text-2xl font-bold text-emerald-400 mb-4">রিপোর্ট সফলভাবে জমা হয়েছে!</h2>
          <p className="text-gray-300 mb-6">
            আপনার রিপোর্টটি জমা হয়েছে। আমরা শীঘ্রই WhatsApp এ যোগাযোগ করব।
          </p>
          <div className="animate-pulse text-sm text-gray-400">
            এই উইন্ডোটি স্বয়ংক্রিয়ভাবে বন্ধ হয়ে যাবে...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md m-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-emerald-400">এজেন্ট রিপোর্ট করুন</h2>
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
              এজেন্টের তথ্য
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
              আপনার WhatsApp নাম্বার
              <span className="text-xs text-gray-400 block mt-1">
                আমরা এই নাম্বারে আপনার সাথে যোগাযোগ করব
              </span>
            </label>
            <input
              type="tel"
              value={whatsappNumber}
              onChange={(e) => setWhatsappNumber(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-emerald-500"
              placeholder="উদাহরণ: +8801xxxxxxxxx"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              রিপোর্টের কারণ
              <span className="text-xs text-gray-400 block mt-1">
                বিস্তারিতভাবে সমস্যার বর্ণনা দিন
              </span>
            </label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-emerald-500"
              rows={4}
              required
              placeholder="এজেন্টের সাথে কি সমস্যা হয়েছে তা বিস্তারিত লিখুন..."
            />
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              বাতিল
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              রিপোর্ট করুন
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReportModal;

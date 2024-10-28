import React from 'react';
import { XCircle, CheckCircle, MessageSquare } from 'lucide-react';
import { Report } from '../../types';
import WhatsAppLink from './WhatsAppLink';

interface ReportDetailsModalProps {
  report: Report;
  onClose: () => void;
  onStatusUpdate?: (id: number, status: 'resolved' | 'rejected') => Promise<void>;
}

const ReportDetailsModal: React.FC<ReportDetailsModalProps> = ({ report, onClose, onStatusUpdate }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-2xl m-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-emerald-400">রিপোর্ট বিস্তারিত</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            <XCircle className="h-6 w-6" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-gray-400 mb-1">রিপোর্ট করা এজেন্ট</h3>
            <div className="bg-gray-700/50 p-3 rounded-lg">
              <div className="flex items-center">
                <div className="flex-shrink-0 h-10 w-10 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">{report.agentName.charAt(0)}</span>
                </div>
                <div className="ml-4">
                  <div className="text-sm font-medium text-white">{report.agentName}</div>
                  <div className="text-sm text-emerald-400">{report.agentId}</div>
                </div>
              </div>
            </div>
          </div>

          {report.whatsappNumber && (
            <div>
              <h3 className="text-sm font-medium text-gray-400 mb-1">যোগাযোগের WhatsApp নাম্বার</h3>
              <div className="bg-gray-700/50 p-3 rounded-lg">
                <WhatsAppLink number={report.whatsappNumber} className="flex items-center space-x-2 text-emerald-400 hover:text-emerald-300">
                  <MessageSquare className="w-5 h-5" />
                  <span>{report.whatsappNumber}</span>
                </WhatsAppLink>
              </div>
            </div>
          )}

          <div>
            <h3 className="text-sm font-medium text-gray-400 mb-1">রিপোর্টের কারণ</h3>
            <div className="bg-gray-700/50 p-3 rounded-lg">
              <p className="text-sm text-white whitespace-pre-wrap">{report.reason}</p>
            </div>
          </div>

          {report.status === 'pending' && onStatusUpdate && (
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => onStatusUpdate(report.id!, 'rejected')}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center space-x-2"
              >
                <XCircle className="w-5 h-5" />
                <span>প্রত্যাখ্যান</span>
              </button>
              <button
                onClick={() => onStatusUpdate(report.id!, 'resolved')}
                className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors flex items-center space-x-2"
              >
                <CheckCircle className="w-5 h-5" />
                <span>সমাধান</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReportDetailsModal;

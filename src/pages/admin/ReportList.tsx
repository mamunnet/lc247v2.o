import React, { useState } from 'react';
import { MessageSquare, Eye, Search } from 'lucide-react';
import { useAgents } from '../../contexts/AgentContext';
import { Report } from '../../types';
import ReportStatusBadge from '../../components/reports/ReportStatusBadge';
import ReportDetailsModal from '../../components/reports/ReportDetailsModal';
import WhatsAppLink from '../../components/reports/WhatsAppLink';

const ReportList = () => {
  const { reports, updateReportStatus } = useAgents();
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'resolved' | 'rejected'>('all');

  const filteredReports = reports.filter(report => {
    const matchesSearch = 
      report.agentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.agentId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.reportedByName.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || report.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleStatusUpdate = async (id: number, status: 'resolved' | 'rejected') => {
    try {
      await updateReportStatus(id, status);
      setSelectedReport(null);
    } catch (error) {
      console.error('Failed to update report status:', error);
    }
  };

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold text-emerald-400">Report Management</h1>
        
        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search reports..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white w-full md:w-64
                       focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>
          
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as 'all' | 'pending' | 'resolved' | 'rejected')}
            className="bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white
                     focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="resolved">Resolved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-700/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Agent</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Reported By</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">WhatsApp</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-gray-800 divide-y divide-gray-700">
              {filteredReports.map((report) => (
                <tr key={report.id} className="hover:bg-gray-700/50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold">{report.agentName.charAt(0)}</span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-white">{report.agentName}</div>
                        <div className="text-sm text-emerald-400">{report.agentId}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-white">{report.reportedByName}</div>
                    <div className="text-sm text-gray-400">{report.reportedById}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {report.whatsappNumber && (
                      <WhatsAppLink 
                        number={report.whatsappNumber}
                        className="flex items-center space-x-1 text-emerald-400 hover:text-emerald-300"
                      >
                        <MessageSquare className="w-4 h-4" />
                        <span>{report.whatsappNumber}</span>
                      </WhatsAppLink>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <ReportStatusBadge status={report.status} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => setSelectedReport(report)}
                      className="text-emerald-400 hover:text-emerald-300"
                    >
                      <Eye className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedReport && (
        <ReportDetailsModal
          report={selectedReport}
          onClose={() => setSelectedReport(null)}
          onStatusUpdate={handleStatusUpdate}
        />
      )}
    </div>
  );
};

export default ReportList;
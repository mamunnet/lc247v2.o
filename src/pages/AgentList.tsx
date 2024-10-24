import React, { useState } from 'react';
import { Eye, Star, AlertTriangle } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { useAgents } from '../contexts/AgentContext';
import { Agent } from '../types';
import ReportModal from '../components/ReportModal';
import ViewAgentModal from '../components/ViewAgentModal';

interface AgentListProps {
  type: string;
}

const WhatsAppIcon = () => (
  <svg 
    viewBox="0 0 24 24" 
    width="16" 
    height="16" 
    className="w-4 h-4"
    fill="currentColor"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const AgentList: React.FC<AgentListProps> = ({ type }) => {
  const [showReportModal, setShowReportModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const { getAgentsByRole } = useAgents();
  const location = useLocation();
  
  const currentAgents = getAgentsByRole(type);

  const handleReport = (agent: Agent) => {
    setSelectedAgent(agent);
    setShowReportModal(true);
  };

  const handleView = (agent: Agent) => {
    setSelectedAgent(agent);
    setShowViewModal(true);
  };

  const isCompanyHead = type === 'company-head';

  const getTitle = () => {
    const titles: { [key: string]: string } = {
      'company-head': 'কোম্পানি হেড',
      'admin': 'এডমিন',
      'ss-admin': 'সিনিয়র সাব এডমিন',
      'sub-admin': 'সাব এডমিন',
      'super-agent': 'সুপার এজেন্ট',
      'master-agent': 'মাস্টার এজেন্ট'
    };
    return titles[type] || type;
  };

  return (
    <div className="space-y-4 px-2 sm:px-4 lg:px-6">
      <div className="flex justify-center items-center mb-4">
        <h1 className="text-lg sm:text-2xl lg:text-3xl font-bold">
          <span className="text-white">LC</span>
          <span className="text-[#65EDBF]">247</span>
          <span className="text-white"> {getTitle()} লিস্ট</span>
        </h1>
      </div>

      <div className="bg-gray-800 rounded-lg overflow-x-auto shadow-xl">
        <div className="min-w-full inline-block align-middle">
          <table className="min-w-full">
            <thead className="bg-gray-700/50">
              <tr>
                <th className="text-left p-3 sm:p-4 text-gray-400 font-medium text-xs sm:text-sm">নাম</th>
                <th className="text-left p-3 sm:p-4 text-gray-400 font-medium text-xs sm:text-sm">আইডি</th>
                <th className="text-left p-3 sm:p-4 text-gray-400 font-medium text-xs sm:text-sm">সোশ্যাল লিংক</th>
                <th className="text-left p-3 sm:p-4 text-gray-400 font-medium text-xs sm:text-sm">ফোন নাম্বার</th>
                <th className="text-left p-3 sm:p-4 text-gray-400 font-medium text-xs sm:text-sm">রেটিং</th>
                <th className="text-center p-3 sm:p-4 text-gray-400 font-medium text-xs sm:text-sm">অ্যাকশন</th>
              </tr>
            </thead>
            <tbody className="bg-gray-800 divide-y divide-gray-700">
              {currentAgents.map((agent) => (
                <tr key={agent.id} className="hover:bg-gray-700/50">
                  <td className="p-3 sm:p-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2 sm:space-x-3">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                        {agent.name.charAt(0)}
                      </div>
                      <div>
                        <div className="text-xs sm:text-sm font-medium text-white">{agent.name}</div>
                        <div className="text-xs sm:text-sm text-gray-400">{getTitle()}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-3 sm:p-4 whitespace-nowrap">
                    <span className="bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded-full text-xs sm:text-sm">
                      {agent.id}
                    </span>
                  </td>
                  <td className="p-3 sm:p-4 whitespace-nowrap">
                    <a
                      href={agent.socialLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#25D366] hover:text-[#128C7E] transition-colors"
                      title="Contact on WhatsApp"
                    >
                      <WhatsAppIcon />
                    </a>
                  </td>
                  <td className="p-3 sm:p-4 whitespace-nowrap text-xs sm:text-sm text-gray-300">
                    {agent.phoneNumber}
                  </td>
                  <td className="p-3 sm:p-4 whitespace-nowrap">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 sm:w-4 sm:h-4 ${i < agent.rating ? 'text-yellow-400 fill-current' : 'text-gray-500'}`}
                        />
                      ))}
                    </div>
                  </td>
                  <td className="p-3 sm:p-4 whitespace-nowrap">
                    <div className="flex justify-center space-x-2">
                      <button
                        onClick={() => handleView(agent)}
                        className="p-1.5 bg-blue-500/10 text-blue-400 rounded-full text-xs sm:text-sm hover:bg-blue-500/20 transition-colors flex items-center space-x-1"
                      >
                        <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span className="hidden sm:inline">দেখুন</span>
                      </button>
                      {!isCompanyHead && (
                        <button
                          onClick={() => handleReport(agent)}
                          className="p-1.5 bg-red-500/10 text-red-400 rounded-full text-xs sm:text-sm hover:bg-red-500/20 transition-colors flex items-center space-x-1"
                        >
                          <AlertTriangle className="w-3 h-3 sm:w-4 sm:h-4" />
                          <span className="hidden sm:inline">রিপোর্ট</span>
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showReportModal && selectedAgent && !isCompanyHead && (
        <ReportModal
          isOpen={showReportModal}
          onClose={() => {
            setShowReportModal(false);
            setSelectedAgent(null);
          }}
          agent={selectedAgent}
        />
      )}

      {showViewModal && selectedAgent && (
        <ViewAgentModal
          isOpen={showViewModal}
          onClose={() => {
            setShowViewModal(false);
            setSelectedAgent(null);
          }}
          agent={selectedAgent}
        />
      )}
    </div>
  );
};

export default AgentList;
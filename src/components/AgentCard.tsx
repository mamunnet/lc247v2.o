import React from 'react';
import { Eye, AlertTriangle } from 'lucide-react';
import { Agent } from '../types';

interface AgentCardProps {
  agent: Agent;
  onReport: (agent: Agent) => void;
  onView: (agent: Agent) => void;
  showReport?: boolean;
}

const WhatsAppIcon = () => (
  <svg 
    viewBox="0 0 24 24" 
    width="20" 
    height="20" 
    fill="currentColor"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const AgentCard: React.FC<AgentCardProps> = ({ agent, onReport, onView, showReport = true }) => {
  const isCompanyHead = agent.role?.toLowerCase() === 'company-head';

  return (
    <div className="bg-gray-700/50 p-4 rounded-lg hover:bg-gray-700 transition-colors">
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold">
          {agent.name.charAt(0)}
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-white">{agent.name}</h3>
          <p className="text-sm text-emerald-400">{agent.id}</p>
          <p className="text-sm text-gray-400">{agent.phoneNumber}</p>
          <div className="flex flex-wrap gap-2 mt-2">
            <a
              href={agent.socialLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#25D366] hover:text-[#128C7E] transition-colors"
              title="Contact on WhatsApp"
            >
              <WhatsAppIcon />
            </a>
            <button
              onClick={() => onView(agent)}
              className="px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full text-sm hover:bg-blue-500/20 transition-colors flex items-center space-x-1"
            >
              <Eye className="w-4 h-4" />
              <span>View</span>
            </button>
            {!isCompanyHead && showReport && (
              <button
                onClick={() => onReport(agent)}
                className="px-3 py-1 bg-red-500/10 text-red-400 rounded-full text-sm hover:bg-red-500/20 transition-colors flex items-center space-x-1"
              >
                <AlertTriangle className="w-4 h-4" />
                <span>Report</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentCard;
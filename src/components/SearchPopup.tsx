import React, { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { useAgents } from '../contexts/AgentContext';
import AgentCard from './AgentCard';
import { Agent } from '../types';
import ReportModal from './ReportModal';
import ViewAgentModal from './ViewAgentModal';

interface SearchPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchPopup: React.FC<SearchPopupProps> = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [showReportModal, setShowReportModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const { agents } = useAgents();
  const [filteredAgents, setFilteredAgents] = useState<Agent[]>([]);

  const agentTypes = [
    { value: 'all', label: 'All Agents' },
    { value: 'company-head', label: 'Company Head' },
    { value: 'admin', label: 'Admin' },
    { value: 'ss-admin', label: 'Senior Sub Admin' },
    { value: 'sub-admin', label: 'Sub Admin' },
    { value: 'super-agent', label: 'Super Agent' },
    { value: 'master-agent', label: 'Master Agent' }
  ];

  useEffect(() => {
    const filtered = agents.filter(agent => {
      const matchesSearch = 
        agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        agent.id.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = selectedType === 'all' || agent.role.toLowerCase() === selectedType;
      return matchesSearch && matchesType;
    });
    setFilteredAgents(filtered);
  }, [searchQuery, selectedType, agents]);

  const handleReport = (agent: Agent) => {
    setSelectedAgent(agent);
    setShowReportModal(true);
  };

  const handleView = (agent: Agent) => {
    setSelectedAgent(agent);
    setShowViewModal(true);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-lg w-full max-w-3xl">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-emerald-400">Search Agents</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-white">
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name or ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-gray-700 text-white rounded-lg pl-10 pr-4 py-2
                           border border-gray-600 focus:ring-2 focus:ring-emerald-500"
                  autoFocus
                />
              </div>
            </div>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white
                       focus:ring-2 focus:ring-emerald-500"
            >
              {agentTypes.map(type => (
                <option key={type.value} value={type.value}>{type.label}</option>
              ))}
            </select>
          </div>

          <div className="max-h-[60vh] overflow-y-auto custom-scrollbar space-y-4">
            {filteredAgents.length > 0 ? (
              filteredAgents.map(agent => (
                <AgentCard
                  key={agent.id}
                  agent={agent}
                  onReport={handleReport}
                  onView={handleView}
                  showReport={agent.role.toLowerCase() !== 'company-head'}
                />
              ))
            ) : (
              <div className="text-center py-8 text-gray-400">
                No agents found matching your search criteria
              </div>
            )}
          </div>
        </div>
      </div>

      {showReportModal && selectedAgent && (
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

export default SearchPopup;
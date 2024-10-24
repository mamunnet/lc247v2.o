import React, { useState } from 'react';
import { Eye, Edit, Trash2, Star, Plus } from 'lucide-react';
import { useAgents } from '../../contexts/AgentContext';
import AddAgentModal from '../../components/admin/AddAgentModal';
import EditAgentModal from '../../components/admin/EditAgentModal';
import { Agent } from '../../types';

interface AgentListProps {
  type: string;
}

export default function AdminAgentList({ type }: AgentListProps) {
  const { agents, addAgent, updateAgent, deleteAgent, getUplineOptions, getAgentsByRole } = useAgents();
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  
  const displayAgents = type === 'all' 
    ? Object.values(agents).flat() 
    : getAgentsByRole(type);

  const handleAdd = async (newAgent: Omit<Agent, 'id'>) => {
    await addAgent({
      ...newAgent,
      role: type
    });
    setShowAddModal(false);
  };

  const handleEdit = async (updatedAgent: Agent) => {
    await updateAgent(updatedAgent.id, updatedAgent);
    setShowEditModal(false);
    setSelectedAgent(null);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this agent?')) {
      await deleteAgent(id);
    }
  };

  const uplines = getUplineOptions(type);

  return (
    <div className="p-4 md:p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold text-emerald-400">
          {type === 'all' ? 'All Agents' : `${type.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')} List`}
        </h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors w-full md:w-auto justify-center"
        >
          <Plus className="w-5 h-5" />
          <span>Add New Agent</span>
        </button>
      </div>

      <div className="bg-gray-800 rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-700/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Rating</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Social Link</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Phone Number</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-gray-800 divide-y divide-gray-700">
              {displayAgents.map((agent: Agent) => (
                <tr key={agent.id} className="hover:bg-gray-700/50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold">
                        {agent.name.charAt(0)}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-white">{agent.name}</div>
                        <div className="text-sm text-gray-400">{agent.role}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{agent.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, index) => (
                        <Star
                          key={index}
                          className={`w-4 h-4 ${
                            index < agent.rating ? 'text-yellow-400 fill-current' : 'text-gray-500'
                          }`}
                        />
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <a
                      href={agent.socialLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-400 hover:text-emerald-300"
                    >
                      WhatsApp
                    </a>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {agent.phoneNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex space-x-2">
                      <button 
                        className="text-blue-400 hover:text-blue-300"
                        onClick={() => {
                          setSelectedAgent(agent);
                          setShowEditModal(true);
                        }}
                      >
                        <Edit className="w-5 h-5" />
                      </button>
                      <button 
                        className="text-red-400 hover:text-red-300"
                        onClick={() => handleDelete(agent.id)}
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showAddModal && (
        <AddAgentModal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          onAdd={handleAdd}
          roleTitle={type.toUpperCase()}
          uplines={uplines}
        />
      )}

      {showEditModal && selectedAgent && (
        <EditAgentModal
          isOpen={showEditModal}
          onClose={() => {
            setShowEditModal(false);
            setSelectedAgent(null);
          }}
          onEdit={handleEdit}
          agent={selectedAgent}
          roleTitle={type.toUpperCase()}
          uplines={uplines}
        />
      )}
    </div>
  );
}
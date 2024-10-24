import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { agentOperations, reportOperations } from '../db';
import { Agent, Report } from '../types';

interface AgentContextType {
  agents: Agent[];
  reports: Report[];
  filteredAgents: Agent[];
  addAgent: (agent: Omit<Agent, "id">) => Promise<void>;
  updateAgent: (id: string, agent: Partial<Agent>) => Promise<void>;
  deleteAgent: (id: string) => Promise<void>;
  getUplineOptions: (role: string) => Agent[];
  getAgentsByRole: (role: string) => Agent[];
  submitReport: (report: Omit<Report, 'id' | 'status' | 'createdAt'>) => Promise<void>;
  updateReportStatus: (id: number, status: 'resolved' | 'rejected') => Promise<void>;
  searchAgents: (query: string) => void;
  loading: boolean;
  error: Error | null;
}

const AgentContext = createContext<AgentContextType | undefined>(undefined);

const roleHierarchy = {
  'master-agent': 'super-agent',
  'super-agent': 'sub-admin',
  'sub-admin': 'ss-admin',
  'ss-admin': 'admin',
  'admin': 'company-head',
  'company-head': null
};

// Fisher-Yates shuffle algorithm
const shuffleArray = <T extends any>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export function AgentProvider({ children }: { children: ReactNode }) {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [reports, setReports] = useState<Report[]>([]);
  const [filteredAgents, setFilteredAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [loadedAgents, loadedReports] = await Promise.all([
          agentOperations.getAllAgents(),
          reportOperations.getAllReports()
        ]);
        setAgents(shuffleArray(loadedAgents));
        setReports(loadedReports);
        setFilteredAgents(shuffleArray(loadedAgents));
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to load data'));
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const searchAgents = (query: string) => {
    if (!query.trim()) {
      setFilteredAgents(shuffleArray(agents));
      return;
    }

    const lowercaseQuery = query.toLowerCase();
    const filtered = agents.filter(agent => 
      agent.name.toLowerCase().includes(lowercaseQuery) ||
      agent.id.toLowerCase().includes(lowercaseQuery) ||
      agent.role.toLowerCase().includes(lowercaseQuery)
    );
    setFilteredAgents(shuffleArray(filtered));
  };

  const addAgent = async (agent: Omit<Agent, "id">) => {
    try {
      const newAgent = {
        ...agent,
        id: `LC${Math.floor(100000 + Math.random() * 900000)}`,
        rating: 5
      };
      await agentOperations.createAgent(newAgent as Agent);
      const updatedAgents = shuffleArray([...agents, newAgent as Agent]);
      setAgents(updatedAgents);
      setFilteredAgents(updatedAgents);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to add agent'));
      throw err;
    }
  };

  const updateAgent = async (id: string, updates: Partial<Agent>) => {
    try {
      const agent = agents.find(a => a.id === id);
      if (!agent) throw new Error('Agent not found');

      const updatedAgent = { ...agent, ...updates };
      await agentOperations.updateAgent(updatedAgent);
      const updatedAgents = shuffleArray(agents.map(a => a.id === id ? updatedAgent : a));
      setAgents(updatedAgents);
      setFilteredAgents(updatedAgents);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to update agent'));
      throw err;
    }
  };

  const deleteAgent = async (id: string) => {
    try {
      await agentOperations.deleteAgent(id);
      const updatedAgents = shuffleArray(agents.filter(agent => agent.id !== id));
      setAgents(updatedAgents);
      setFilteredAgents(updatedAgents);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to delete agent'));
      throw err;
    }
  };

  const submitReport = async (report: Omit<Report, 'id' | 'status' | 'createdAt'>) => {
    try {
      await reportOperations.createReport(report);
      const updatedReports = await reportOperations.getAllReports();
      setReports(updatedReports);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to submit report'));
      throw err;
    }
  };

  const updateReportStatus = async (id: number, status: 'resolved' | 'rejected') => {
    try {
      await reportOperations.updateReportStatus(id, status);
      const updatedReports = await reportOperations.getAllReports();
      setReports(updatedReports);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to update report status'));
      throw err;
    }
  };

  const getUplineOptions = (role: string): Agent[] => {
    const normalizedRole = role.toLowerCase().replace(/\s+/g, '-');
    const uplineRole = roleHierarchy[normalizedRole as keyof typeof roleHierarchy];
    if (!uplineRole) return [];
    return shuffleArray(agents.filter(agent => agent.role.toLowerCase() === uplineRole));
  };

  const getAgentsByRole = (role: string): Agent[] => {
    const normalizedRole = role.toLowerCase().replace(/\s+/g, '-');
    return shuffleArray(agents.filter(agent => agent.role.toLowerCase() === normalizedRole));
  };

  const value = {
    agents,
    filteredAgents,
    reports,
    addAgent,
    updateAgent,
    deleteAgent,
    getUplineOptions,
    getAgentsByRole,
    submitReport,
    updateReportStatus,
    searchAgents,
    loading,
    error
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-emerald-400 mb-4">Loading Data</h1>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500 mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <AgentContext.Provider value={value}>
      {children}
    </AgentContext.Provider>
  );
}

export function useAgents() {
  const context = useContext(AgentContext);
  if (context === undefined) {
    throw new Error("useAgents must be used within an AgentProvider");
  }
  return context;
}
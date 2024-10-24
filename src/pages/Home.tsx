import React, { useState } from 'react';
import { Search, MessageSquare, ExternalLink, Star } from 'lucide-react';
import { useAgents } from '../contexts/AgentContext';
import Footer from '../components/Footer';
import AgentCard from '../components/AgentCard';
import ReportModal from '../components/ReportModal';
import { Agent } from '../types';

const AgentSection = ({ title, description, agents, onReport, type }: {
  title: string;
  description: string;
  agents: Agent[];
  onReport: (agent: Agent) => void;
  type: string;
}) => (
  <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
    <h2 className="text-xl font-semibold text-yellow-400 text-center mb-4">
      {title}
    </h2>
    <p className="text-gray-300 mb-6 text-center">
      {description}
    </p>
    <div className="space-y-4">
      {agents.slice(0, 3).map((agent) => (
        <AgentCard 
          key={agent.id} 
          agent={agent} 
          onReport={onReport}
          showReport={type !== 'company-head'} 
        />
      ))}
    </div>
  </div>
);

// Rest of the Home component remains the same
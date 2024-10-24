export interface Agent {
  id: string;
  name: string;
  role: string;
  rating: number;
  socialLink: string;
  phoneNumber: string;
  uplineId?: string;
  createdAt?: number;
}

export interface Report {
  id?: number;
  agentId: string;
  agentName: string;
  reportedById: string;
  reportedByName: string;
  reason: string;
  whatsappNumber: string;
  status: 'pending' | 'resolved' | 'rejected';
  createdAt?: number;
}

export interface Notice {
  id: string;
  title: string;
  content: string;
  date: number;
  priority: 'low' | 'medium' | 'high';
  status: 'active' | 'archived';
}
import { initializeDb, agentOperations } from '../src/db';

const setupDb = async () => {
  const db = await initializeDb();

  const initialAgents = [
    {
      id: 'LC318416',
      name: 'Hafeez Khan',
      type: 'COMPANY HEAD',
      phoneNumber: '+1234567890',
      socialLink: 'https://wa.me/1234567890',
      rating: 5
    },
    {
      id: 'LC318417',
      name: 'Tanvir Ahmed',
      type: 'ADMIN',
      phoneNumber: '+1234567891',
      socialLink: 'https://wa.me/1234567891',
      uplineId: 'LC318416',
      rating: 5
    },
    {
      id: 'LC318418',
      name: 'Rahul Kumar',
      type: 'SS ADMIN',
      phoneNumber: '+1234567892',
      socialLink: 'https://wa.me/1234567892',
      uplineId: 'LC318417',
      rating: 5
    },
    {
      id: 'LC318419',
      name: 'Amit Shah',
      type: 'SUB ADMIN',
      phoneNumber: '+1234567893',
      socialLink: 'https://wa.me/1234567893',
      uplineId: 'LC318418',
      rating: 5
    },
    {
      id: 'LC318420',
      name: 'Pradeep Singh',
      type: 'SUPER AGENT',
      phoneNumber: '+1234567894',
      socialLink: 'https://wa.me/1234567894',
      uplineId: 'LC318419',
      rating: 5
    },
    {
      id: 'LC318421',
      name: 'Rajesh Patel',
      type: 'MASTER AGENT',
      phoneNumber: '+1234567895',
      socialLink: 'https://wa.me/1234567895',
      uplineId: 'LC318420',
      rating: 5
    }
  ];

  // Insert initial data
  for (const agent of initialAgents) {
    try {
      await agentOperations.createAgent(agent);
      console.log(`Added agent: ${agent.name}`);
    } catch (error) {
      console.error(`Error adding agent ${agent.name}:`, error);
    }
  }

  console.log('Database setup complete!');
};

setupDb().catch(console.error);
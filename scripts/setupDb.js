import { agentOperations } from '../src/db/index.js';

// Initial data for the database
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
  // Add more initial agents as needed
];

// Insert initial data
initialAgents.forEach(agent => {
  try {
    agentOperations.createAgent.run(agent);
    console.log(`Added agent: ${agent.name}`);
  } catch (error) {
    console.error(`Error adding agent ${agent.name}:`, error.message);
  }
});

console.log('Database setup complete!');
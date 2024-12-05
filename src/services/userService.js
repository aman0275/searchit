import { mockUsers } from '../mockData';

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const searchUsers = async (searchTerm) => {
  // Simulate API call delay
  await delay(Math.random() * 800 + 200); // Random delay between 200-1000ms

  // Simulate API error occasionally (10% chance)
  if (Math.random() < 0.1) {
    throw new Error('Simulated API error');
  }

  const normalizedSearch = searchTerm.toLowerCase();
  
  return mockUsers.filter(user => 
    user.firstName.toLowerCase().includes(normalizedSearch) ||
    user.lastName.toLowerCase().includes(normalizedSearch) ||
    user.ssn.includes(normalizedSearch)
  );
}; 
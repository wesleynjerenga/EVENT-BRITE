
import { Event } from '@/types';

export const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Summer Music Festival 2024',
    description: 'Join us for the biggest music festival of the year featuring top artists from around the world. Experience multiple stages, food vendors, and unforgettable performances.',
    category: 'Music',
    date: '2024-07-15',
    time: '18:00',
    venue: 'Central Park Amphitheater',
    location: 'New York, NY',
    price: 89.99,
    ticketsAvailable: 2500,
    totalTickets: 5000,
    image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&h=600&fit=crop',
    organizer: 'Live Nation',
    featured: true
  },
  {
    id: '2',
    title: 'Tech Innovation Conference',
    description: 'Discover the latest in technology innovation with keynote speakers from major tech companies. Network with industry leaders and explore cutting-edge solutions.',
    category: 'Technology',
    date: '2024-06-28',
    time: '09:00',
    venue: 'Convention Center',
    location: 'San Francisco, CA',
    price: 299.99,
    ticketsAvailable: 800,
    totalTickets: 1000,
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop',
    organizer: 'TechEvents Inc',
    featured: true
  },
  {
    id: '3',
    title: 'Basketball Championship Finals',
    description: 'Witness the epic showdown in the championship finals. Two of the best teams compete for the ultimate title in this thrilling sporting event.',
    category: 'Sports',
    date: '2024-06-30',
    time: '19:30',
    venue: 'Madison Square Garden',
    location: 'New York, NY',
    price: 159.99,
    ticketsAvailable: 1200,
    totalTickets: 2000,
    image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&h=600&fit=crop',
    organizer: 'Sports Arena',
    featured: false
  },
  {
    id: '4',
    title: 'Art & Culture Exhibition',
    description: 'Explore contemporary art from emerging and established artists. This exhibition showcases diverse perspectives and innovative artistic expressions.',
    category: 'Arts',
    date: '2024-07-05',
    time: '10:00',
    venue: 'Modern Art Museum',
    location: 'Los Angeles, CA',
    price: 25.99,
    ticketsAvailable: 300,
    totalTickets: 500,
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop',
    organizer: 'Cultural Foundation',
    featured: false
  },
  {
    id: '5',
    title: 'Business Leadership Summit',
    description: 'Learn from successful entrepreneurs and business leaders. Gain insights into leadership strategies, market trends, and growth opportunities.',
    category: 'Business',
    date: '2024-07-20',
    time: '08:30',
    venue: 'Business Center',
    location: 'Chicago, IL',
    price: 199.99,
    ticketsAvailable: 500,
    totalTickets: 750,
    image: 'https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=800&h=600&fit=crop',
    organizer: 'Business Network',
    featured: false
  },
  {
    id: '6',
    title: 'Food & Wine Festival',
    description: 'Savor exquisite cuisine and fine wines from renowned chefs and vineyards. Experience culinary excellence in a beautiful outdoor setting.',
    category: 'Food',
    date: '2024-08-10',
    time: '16:00',
    venue: 'Riverside Park',
    location: 'Portland, OR',
    price: 75.99,
    ticketsAvailable: 1000,
    totalTickets: 1500,
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop',
    organizer: 'Culinary Events',
    featured: true
  }
];

export const categories = [
  'All',
  'Music',
  'Technology',
  'Sports',
  'Arts',
  'Business',
  'Food'
];

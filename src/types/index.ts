
export interface Event {
  id: string;
  title: string;
  description: string;
  category: string;
  date: string;
  time: string;
  venue: string;
  location: string;
  price: number;
  ticketsAvailable: number;
  totalTickets: number;
  image: string;
  organizer: string;
  featured: boolean;
}

export interface Ticket {
  id: string;
  eventId: string;
  userId: string;
  qrCode: string;
  purchaseDate: string;
  status: 'active' | 'used' | 'cancelled';
  seatNumber?: string;
}

export interface Booking {
  id: string;
  eventId: string;
  userId: string;
  tickets: number;
  totalAmount: number;
  bookingDate: string;
  status: 'confirmed' | 'pending' | 'cancelled';
}

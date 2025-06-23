
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { mockEvents } from '@/data/mockData';
import { useAuth } from '@/contexts/AuthContext';
import { Calendar, MapPin, Clock, Ticket, User, Star } from 'lucide-react';
import { toast } from 'sonner';

const EventDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [ticketQuantity, setTicketQuantity] = useState(1);
  const [isBooking, setIsBooking] = useState(false);

  const event = mockEvents.find(e => e.id === id);

  if (!event) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-600">Event not found</h1>
            <Button onClick={() => navigate('/events')} className="mt-4">
              Back to Events
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  const handleBooking = async () => {
    if (!user) {
      toast.error('Please login to book tickets');
      navigate('/login');
      return;
    }

    setIsBooking(true);
    try {
      // Simulate booking process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate QR code data
      const qrData = `EVENT:${event.id}|USER:${user.id}|TICKETS:${ticketQuantity}|DATE:${new Date().toISOString()}`;
      
      toast.success(`Successfully booked ${ticketQuantity} ticket(s)! Check your dashboard for details.`);
      navigate('/dashboard');
    } catch (error) {
      toast.error('Booking failed. Please try again.');
    } finally {
      setIsBooking(false);
    }
  };

  const totalPrice = event.price * ticketQuantity;

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Event Image */}
            <div className="relative overflow-hidden rounded-lg mb-6">
              <img 
                src={event.image} 
                alt={event.title}
                className="w-full h-64 md:h-96 object-cover"
              />
              <div className="absolute top-4 left-4">
                <span className="bg-blue-600 text-white px-3 py-2 rounded-full text-sm font-medium">
                  {event.category}
                </span>
              </div>
              {event.featured && (
                <div className="absolute top-4 right-4">
                  <span className="bg-gradient-to-r from-orange-400 to-red-500 text-white px-3 py-2 rounded-full text-sm font-medium">
                    Featured
                  </span>
                </div>
              )}
            </div>

            {/* Event Details */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-4">{event.title}</h1>
                <div className="flex items-center space-x-4 text-gray-600 mb-4">
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-1" />
                    <span>by {event.organizer}</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 mr-1 text-yellow-500" />
                    <span>4.8 (127 reviews)</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center p-4 bg-blue-50 rounded-lg">
                  <Calendar className="h-6 w-6 text-blue-600 mr-3" />
                  <div>
                    <div className="font-medium">{new Date(event.date).toLocaleDateString()}</div>
                    <div className="text-sm text-gray-600">Date</div>
                  </div>
                </div>
                <div className="flex items-center p-4 bg-blue-50 rounded-lg">
                  <Clock className="h-6 w-6 text-blue-600 mr-3" />
                  <div>
                    <div className="font-medium">{event.time}</div>
                    <div className="text-sm text-gray-600">Start Time</div>
                  </div>
                </div>
                <div className="flex items-center p-4 bg-blue-50 rounded-lg">
                  <MapPin className="h-6 w-6 text-blue-600 mr-3" />
                  <div>
                    <div className="font-medium">{event.venue}</div>
                    <div className="text-sm text-gray-600">{event.location}</div>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">About This Event</h2>
                <p className="text-gray-700 leading-relaxed">
                  {event.description}
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">Event Location</h2>
                <div className="bg-gray-100 rounded-lg p-6">
                  <h3 className="font-semibold mb-2">{event.venue}</h3>
                  <p className="text-gray-600">{event.location}</p>
                  <div className="mt-4 h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                    <span className="text-gray-500">Interactive Map</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Book Tickets</span>
                  <span className="text-2xl font-bold text-blue-600">${event.price}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Number of Tickets</label>
                  <Input
                    type="number"
                    min="1"
                    max={Math.min(10, event.ticketsAvailable)}
                    value={ticketQuantity}
                    onChange={(e) => setTicketQuantity(parseInt(e.target.value) || 1)}
                    className="w-full"
                  />
                </div>

                <div className="flex items-center justify-between py-3 border-t border-b">
                  <span>Subtotal ({ticketQuantity} tickets)</span>
                  <span className="font-semibold">${totalPrice.toFixed(2)}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span>Service Fee</span>
                  <span>${(totalPrice * 0.1).toFixed(2)}</span>
                </div>

                <div className="flex items-center justify-between font-bold text-lg pt-3 border-t">
                  <span>Total</span>
                  <span>${(totalPrice * 1.1).toFixed(2)}</span>
                </div>

                <Button 
                  onClick={handleBooking}
                  disabled={isBooking || event.ticketsAvailable === 0}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  size="lg"
                >
                  {isBooking ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Processing...
                    </div>
                  ) : event.ticketsAvailable === 0 ? (
                    'Sold Out'
                  ) : (
                    <>
                      <Ticket className="mr-2 h-4 w-4" />
                      Book Now
                    </>
                  )}
                </Button>

                <div className="text-center text-sm text-gray-500">
                  <div className="flex items-center justify-center">
                    <Ticket className="h-4 w-4 mr-1" />
                    <span>{event.ticketsAvailable} tickets remaining</span>
                  </div>
                </div>

                <div className="text-xs text-gray-500 text-center">
                  <p>Free cancellation up to 24 hours before the event</p>
                  <p>Mobile tickets accepted</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EventDetail;

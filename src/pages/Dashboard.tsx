import React, { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Calendar, Ticket, QrCode, MapPin, Clock, Download } from 'lucide-react';

interface Event {
  id: number;
  title: string;
  location: string;
  venue: string;
  date: string;
  time: string;
  price: number;
  image: string;
}

interface TicketType {
  id: string;
  eventId: string;
  event: Event;
  qrCode: string;
  purchaseDate: string;
  ticketCount: number;
  status: 'active';
}

const Dashboard = () => {
  const { user } = useAuth();
  const [tickets, setTickets] = useState<TicketType[]>([]);

  useEffect(() => {
    fetch('http://localhost:5001/api/events')
      .then(res => res.json())
      .then(data => {
        const sampleTickets = data.slice(0, 2).map((event: Event, index: number) => ({
          id: `${index + 1}`,
          eventId: event.id.toString(),
          event: {
            ...event,
            image: index === 0
              ? 'https://i.pinimg.com/736x/d1/40/f8/d140f819ec9dec53cf14eda85f563631.jpg' // ✅ First image updated
              : index === 1
              ? 'https://i.pinimg.com/736x/77/40/c4/7740c42ff80e80cab457718231d3e0e6.jpg' // ✅ Second image updated
              : event.image,
          },
          qrCode: `QR${index}ABC123`,
          purchaseDate: new Date().toISOString(),
          ticketCount: index + 1,
          status: 'active',
        }));
        setTickets(sampleTickets);
      });
  }, []);

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.name}!</h1>
          <p className="text-gray-600">Manage your tickets and upcoming events</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-3 bg-blue-100 rounded-full">
                  <Ticket className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Total Tickets</p>
                  <p className="text-2xl font-bold">6</p> {/* Updated total tickets */}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-3 bg-green-100 rounded-full">
                  <Calendar className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Upcoming Events</p>
                  <p className="text-2xl font-bold">4</p> {/* Updated upcoming events */}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-3 bg-purple-100 rounded-full">
                  <QrCode className="h-6 w-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Active Tickets</p>
                  <p className="text-2xl font-bold">2</p> {/* Updated active tickets */}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-6">My Tickets</h2>
          <div className="space-y-6">
            {tickets.map(ticket => (
              <Card key={ticket.id}>
                <CardContent className="p-0">
                  <div className="md:flex">
                    <div className="md:w-48 h-48 md:h-auto">
                      <img
                        src={ticket.event.image}
                        alt={ticket.event.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 p-6">
                      <div className="flex flex-col md:flex-row md:items-start justify-between">
                        <div className="flex-1">
                          <h3 className="text-xl font-bold mb-2">{ticket.event.title}</h3>
                          <div className="space-y-2 text-gray-600 mb-4">
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-2" />
                              {new Date(ticket.event.date).toLocaleDateString()}
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-2" />
                              {ticket.event.time}
                            </div>
                            <div className="flex items-center">
                              <MapPin className="h-4 w-4 mr-2" />
                              {ticket.event.venue}, {ticket.event.location}
                            </div>
                            <div className="flex items-center">
                              <Ticket className="h-4 w-4 mr-2" />
                              {ticket.ticketCount} ticket(s)
                            </div>
                          </div>
                          <div className="text-sm text-gray-500">
                            Purchased on {new Date(ticket.purchaseDate).toLocaleDateString()}
                          </div>
                        </div>
                        <div className="mt-4 md:mt-0 md:ml-6 text-center">
                          <div className="w-24 h-24 bg-gray-200 rounded-lg flex items-center justify-center mb-3">
                            <QrCode className="h-12 w-12 text-gray-400" />
                          </div>
                          <Button size="sm" variant="outline" className="w-full">
                            <Download className="h-4 w-4 mr-1" />
                            Download
                          </Button>
                          <div className="text-xs text-gray-500">QR: {ticket.qrCode}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {tickets.length === 0 && (
              <Card>
                <CardContent className="p-12 text-center">
                  <Ticket className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">No tickets yet</h3>
                  <p className="text-gray-500 mb-4">Start exploring events and book your first ticket!</p>
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    Browse Events
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;

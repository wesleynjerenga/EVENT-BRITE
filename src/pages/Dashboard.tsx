
import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Calendar, Ticket, QrCode, MapPin, Clock, Download } from 'lucide-react';
import { mockEvents } from '@/data/mockData';

const Dashboard = () => {
  const { user } = useAuth();

  // Mock user tickets - in real app, this would come from API
  const userTickets = [
    {
      id: '1',
      eventId: '1',
      event: mockEvents[0],
      qrCode: 'QR123456789',
      purchaseDate: '2024-06-20',
      ticketCount: 2,
      status: 'active' as const
    },
    {
      id: '2',
      eventId: '2',
      event: mockEvents[1],
      qrCode: 'QR987654321',
      purchaseDate: '2024-06-18',
      ticketCount: 1,
      status: 'active' as const
    }
  ];

  const generateQRCodeData = (ticket: any) => {
    return `EVENT:${ticket.eventId}|USER:${user?.id}|TICKET:${ticket.id}|DATE:${ticket.purchaseDate}`;
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.name}!</h1>
          <p className="text-gray-600">Manage your tickets and upcoming events</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-3 bg-blue-100 rounded-full">
                  <Ticket className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Total Tickets</p>
                  <p className="text-2xl font-bold">
                    {userTickets.reduce((sum, ticket) => sum + ticket.ticketCount, 0)}
                  </p>
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
                  <p className="text-2xl font-bold">{userTickets.length}</p>
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
                  <p className="text-2xl font-bold">
                    {userTickets.filter(t => t.status === 'active').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* My Tickets */}
        <div>
          <h2 className="text-2xl font-bold mb-6">My Tickets</h2>
          <div className="space-y-6">
            {userTickets.map((ticket) => (
              <Card key={ticket.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="md:flex">
                    {/* Event Image */}
                    <div className="md:w-48 h-48 md:h-auto">
                      <img 
                        src={ticket.event.image} 
                        alt={ticket.event.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    {/* Event Details */}
                    <div className="flex-1 p-6">
                      <div className="flex flex-col md:flex-row md:items-start justify-between">
                        <div className="flex-1">
                          <h3 className="text-xl font-bold mb-2">{ticket.event.title}</h3>
                          <div className="space-y-2 text-gray-600 mb-4">
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-2" />
                              <span>{new Date(ticket.event.date).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-2" />
                              <span>{ticket.event.time}</span>
                            </div>
                            <div className="flex items-center">
                              <MapPin className="h-4 w-4 mr-2" />
                              <span>{ticket.event.venue}, {ticket.event.location}</span>
                            </div>
                            <div className="flex items-center">
                              <Ticket className="h-4 w-4 mr-2" />
                              <span>{ticket.ticketCount} ticket(s)</span>
                            </div>
                          </div>
                          <div className="text-sm text-gray-500">
                            Purchased on {new Date(ticket.purchaseDate).toLocaleDateString()}
                          </div>
                        </div>
                        
                        {/* QR Code Section */}
                        <div className="mt-4 md:mt-0 md:ml-6 text-center">
                          <div className="w-24 h-24 bg-gray-200 rounded-lg flex items-center justify-center mb-3">
                            <QrCode className="h-12 w-12 text-gray-400" />
                          </div>
                          <div className="space-y-2">
                            <Button size="sm" variant="outline" className="w-full">
                              <Download className="h-4 w-4 mr-1" />
                              Download
                            </Button>
                            <div className="text-xs text-gray-500">
                              QR: {ticket.qrCode}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {userTickets.length === 0 && (
            <Card>
              <CardContent className="p-12 text-center">
                <Ticket className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No tickets yet</h3>
                <p className="text-gray-500 mb-4">
                  Start exploring events and book your first ticket!
                </p>
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  Browse Events
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;

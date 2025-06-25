// src/pages/EventDetail.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Calendar, Clock, MapPin } from 'lucide-react';

type Event = {
  id: number;
  title: string;
  location: string;
  date: string;
  time: string;
  venue: string;
  price: number;
};

const EventDetail = () => {
  const { id } = useParams();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5001/api/events/${id}`)
      .then(res => res.json())
      .then(data => {
        setEvent(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading event details:', err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="text-center py-8">Loading...</p>;
  if (!event) return <p className="text-center text-red-500 py-8">Event not found.</p>;

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-blue-700 mb-6">{event.title}</h1>

        <div className="mb-4 space-y-2 text-gray-700">
          <div className="flex items-center">
            <Calendar className="w-5 h-5 mr-2 text-blue-500" />
            {new Date(event.date).toLocaleDateString()}
          </div>
          <div className="flex items-center">
            <Clock className="w-5 h-5 mr-2 text-blue-500" />
            {event.time}
          </div>
          <div className="flex items-center">
            <MapPin className="w-5 h-5 mr-2 text-blue-500" />
            {event.venue}, {event.location}
          </div>
          <p className="font-semibold">Price: <span className="text-green-600">Ksh {event.price}</span></p>
        </div>

        {/* ✅ Booking Form */}
        <div className="mt-8 border-t pt-6">
          <h2 className="text-2xl font-semibold mb-4">Book Your Ticket</h2>
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Your Full Name"
              className="w-full px-4 py-2 border rounded"
              required
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full px-4 py-2 border rounded"
              required
            />
            <input
              type="number"
              placeholder="Number of Tickets"
              className="w-full px-4 py-2 border rounded"
              min={1}
              required
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
            >
              Confirm Booking
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default EventDetail;

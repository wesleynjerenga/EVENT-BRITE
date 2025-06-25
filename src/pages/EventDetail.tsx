// src/pages/EventDetail.tsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext'; // Import useAuth for authentication

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
  const { user } = useAuth(); // Get the authenticated user
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    quantity: 1,
  });

  useEffect(() => {
    fetch(`http://localhost:5001/api/events/${id}`)
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          setEvent(null);
        } else {
          setEvent(data);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching event:', err);
        setLoading(false);
      });
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      const response = await fetch('http://localhost:5001/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          event_id: id,
          quantity: formData.quantity,
          fullName: formData.fullName,
          email: formData.email,
        }),
      });

      if (response.ok) {
        alert('Booking confirmed!');
      } else {
        alert('Failed to book tickets. Please try again.');
      }
    } catch (error) {
      console.error('Error booking tickets:', error);
      alert('An error occurred. Please try again.');
    }
  };

  if (loading) return <p className="text-center py-10">Loading...</p>;

  if (!event) return (
    <Layout>
      <div className="text-center py-16">
        <h1 className="text-2xl font-semibold text-gray-700 mb-4">Event not found</h1>
      </div>
    </Layout>
  );

  if (!user) {
    return (
      <Layout>
        <div className="text-center mt-12">
          <p className="text-red-500 font-semibold">You must be logged in to book tickets.</p>
          <Link to="/login">
            <Button className="mt-4">Go to Login</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-blue-700 mb-4">{event.title}</h1>
        <div className="space-y-2 text-gray-700 mb-6">
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
          <div>
            <strong>Price:</strong> <span className="text-green-600">Ksh {event.price}</span>
          </div>
        </div>

        {/* ✅ Booking Form */}
        <div className="mt-8 border-t pt-6">
          <h2 className="text-2xl font-semibold mb-4">Book Your Ticket</h2>
          <form className="space-y-4" onSubmit={handleBooking}>
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              className="w-full border border-gray-300 rounded px-4 py-2"
              value={formData.fullName}
              onChange={handleInputChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              className="w-full border border-gray-300 rounded px-4 py-2"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            <input
              type="number"
              name="quantity"
              placeholder="Number of Tickets"
              className="w-full border border-gray-300 rounded px-4 py-2"
              value={formData.quantity}
              onChange={handleInputChange}
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

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const EventDetail = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5000/api/events/${id}`)
      .then(res => res.json())
      .then(data => {
        setEvent(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching event:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!event || event.error) return <p>Event not found.</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold mb-4">{event.title}</h2>
      {event.image && (
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-64 object-cover rounded mb-4"
        />
      )}
      <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
      <p><strong>Location:</strong> {event.location}</p>
      <p><strong>Price:</strong> ${event.price}</p>
      {event.description && <p className="mt-4">{event.description}</p>}
    </div>
  );
};

export default EventDetail;

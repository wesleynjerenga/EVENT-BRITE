import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // 👈 Add this

type Event = {
  id: number;
  title: string;
  location: string;
  date: string;
  time?: string;
  price?: string;
  description?: string;
  organizer?: string;
  category?: string;
  capacity?: number;
  image_url?: string;
};

const EventsList = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const navigate = useNavigate(); // 👈 Setup navigation

  useEffect(() => {
    fetch("http://localhost:5001/api/events")
      .then(res => res.json())
      .then(data => setEvents(data))
      .catch(err => console.error("Error fetching events:", err));
  }, []);

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-6 text-center">🎟️ Upcoming Events</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map(event => (
          <div key={event.id} className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition">
            {event.image_url && (
              <img
                src={event.image_url}
                alt={event.title}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4">
              <h3 className="text-2xl font-semibold mb-2">{event.title}</h3>
              <p className="text-gray-700 mb-1">📍 Location: {event.location}</p>
              <p className="text-gray-700 mb-1">📅 Date: {new Date(event.date).toDateString()}</p>
              <p className="text-gray-700 mb-1">💰 Price: {event.price || "Free"}</p>
              <button
                onClick={() => navigate(`/events/${event.id}`)} // 👈 Navigate to EventDetail page
                className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventsList;

import React, { useEffect, useState } from 'react';

type Event = {
  id: number;
  title: string;
  location: string;
  date: string;
  time: string;
  price: number;
  image_url: string;
};

const FeaturedEvents: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    fetch('http://localhost:5001/api/events')
      .then((res) => res.json())
      .then((data) => setEvents(data))
      .catch((err) => console.error('Failed to load events:', err));
  }, []);

  return (
    <div className="featured-events">
      <h2>Featured Events</h2>
      <div className="cards-grid">
        {events.map(event => (
          <div className="event-card" key={event.id}>
            <img src={event.image_url} alt={event.title} />
            <h3>{event.title}</h3>
            <p>{event.location}</p>
            <p>{event.date} at {event.time}</p>
            <p>${event.price.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedEvents;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { auth } from "../firebase";

function EventList() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const token = await auth.currentUser.getIdToken();
      const response = await axios.get("http://localhost:3000/api/events/events", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEvents(response.data);
    };
    fetchEvents();
  }, []);

  return (
    <div>
      <h2>Your Events</h2>
      <ul>
        {events.map((event) => (
          <li key={event.id}>
            {event.eventName} - {event.status}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EventList;

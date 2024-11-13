import React, { useState, useEffect } from "react";
import axios from "axios";
import { auth } from "../firebase";

function AdminDashboard() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const token = await auth.currentUser.getIdToken();
      const response = await axios.get("http://localhost:3000/api/admin/events", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEvents(response.data);
    };
    fetchEvents();
  }, []);

  const reviewRequest = async (eventId, status) => {
    const token = await auth.currentUser.getIdToken();
    await axios.post(
      "http://localhost:3000/api/admin/review-leave",
      { eventId, status },
      { headers: { Authorization: `Bearer ${token}` } }
    );
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <ul>
        {events.map((event) => (
          <li key={event.id}>
            {event.eventName} - {event.status}
            <button onClick={() => reviewRequest(event.id, "Approved")}>Approve</button>
            <button onClick={() => reviewRequest(event.id, "Rejected")}>Reject</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminDashboard;

import React, { useState } from "react";
import axios from "axios";
import { auth } from "../firebase";

function EventForm() {
  const [eventName, setEventName] = useState("");
  const [eventType, setEventType] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");

  const submitRequest = async () => {
    const token = await auth.currentUser.getIdToken();
    axios.post("http://localhost:3000/api/events/request-leave", {
      eventName,
      eventType,
      date,
      location,
    }, {
      headers: { Authorization: `Bearer ${token}` },
    });
  };

  return (
    <div>
      <h2>Request Duty Leave</h2>
      <input placeholder="Event Name" value={eventName} onChange={(e) => setEventName(e.target.value)} />
      <input placeholder="Event Type" value={eventType} onChange={(e) => setEventType(e.target.value)} />
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      <input placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} />
      <button onClick={submitRequest}>Submit</button>
    </div>
  );
}

export default EventForm;

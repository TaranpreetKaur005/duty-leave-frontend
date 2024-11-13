import React, { useState, useEffect } from "react";
import { auth } from "./firebase";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import EventForm from "./components/EventForm";
import AdminDashboard from "./components/AdminDashboard";
import EventList from "./components/EventList";

function App() {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUser(user);
        const token = await user.getIdTokenResult();
        setIsAdmin(token.claims.role === "admin");
      } else {
        setUser(null);
        setIsAdmin(false);
      }
    });
  }, []);

  return (
    <div>
      <Navbar user={user} isAdmin={isAdmin} />
      {!user ? (
        <Login />
      ) : isAdmin ? (
        <AdminDashboard />
      ) : (
        <>
          <EventForm />
          <EventList />
        </>
      )}
    </div>
  );
}

export default App;

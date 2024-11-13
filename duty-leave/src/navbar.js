import React from "react";
import { auth } from "../firebase";

function Navbar({ user, isAdmin }) {
  return (
    <nav>
      <h2>Duty Leave Application</h2>
      {user && (
        <div>
          <span>{user.email} ({isAdmin ? "Admin" : "Student"})</span>
          <button onClick={() => auth.signOut()}>Logout</button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;

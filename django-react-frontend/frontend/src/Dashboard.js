import React, { useState, useEffect } from "react";

function Dashboard() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    const user = localStorage.getItem("username");
    if (!user) {
      window.location.href = "/";
    } else {
      setUsername(user);
    }
  }, []);

  const updateProfile = async () => {
    const response = await fetch("http://127.0.0.1:8000/api/update-profile/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email }),
    });

    if (response.ok) {
      alert("Profile updated successfully");
    } else {
      alert("Failed to update profile");
    }
  };

  const changePassword = async () => {
    const response = await fetch("http://127.0.0.1:8000/api/change-password/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, newPassword }),
    });

    if (response.ok) {
      alert("Password changed successfully");
    } else {
      alert("Failed to change password");
    }
  };

  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <p>Welcome, {username}</p>

      <h3>Update Profile</h3>
      <input
        placeholder="New Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={updateProfile}>Update Email</button>

      <h3>Change Password</h3>
      <input
        type="password"
        placeholder="New Password"
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <button onClick={changePassword}>Change Password</button>

      <br /><br />
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default Dashboard;
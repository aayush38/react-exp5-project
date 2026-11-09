import React, { useState, useEffect } from "react";

// Simulated API call (stands in for fetch("/api/profile")) so the demo works offline.
const fetchProfile = () =>
  new Promise((resolve) =>
    setTimeout(() => resolve({ name: "Aayush", age: 20, email: "aayush@example.com" }), 1000)
  );

export default function ProfileManager() {
  const [profile, setProfile] = useState({ name: "", age: "", email: "" });
  const [saved, setSaved] = useState(null);
  const [loading, setLoading] = useState(true);

  // 1) Fetch initial data when the component mounts (empty dependency array)
  useEffect(() => {
    fetchProfile().then((data) => {
      setProfile(data);
      setSaved(data);
      setLoading(false);
    });
  }, []);

  // 2) Log a message whenever the saved profile changes
  useEffect(() => {
    if (saved) console.log("Profile updated:", saved);
  }, [saved]);

  const handleChange = (e) => setProfile({ ...profile, [e.target.name]: e.target.value });
  const handleSubmit = (e) => { e.preventDefault(); setSaved(profile); };

  if (loading) return <div className="card"><div className="card-body">Loading profile...</div></div>;

  return (
    <div className="card"><div className="card-body">
      <h5 className="card-title">Task 3: User Profile Manager</h5>
      <form onSubmit={handleSubmit}>
        <input className="form-control" name="name" value={profile.name} onChange={handleChange} style={{ marginBottom: 8 }} />
        <input className="form-control" name="age" type="number" value={profile.age} onChange={handleChange} style={{ marginBottom: 8 }} />
        <input className="form-control" name="email" type="email" value={profile.email} onChange={handleChange} style={{ marginBottom: 8 }} />
        <button className="btn btn-primary" type="submit">Update profile</button>
      </form>
      <hr />
      <h6>Updated profile</h6>
      <p>Name: <b>{saved.name}</b> | Age: <b>{saved.age}</b> | Email: <b>{saved.email}</b></p>
    </div></div>
  );
}

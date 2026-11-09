import React, { useState } from "react";

const initialProfile = { name: "", age: "", email: "" };

export default function ProfileEditor() {
  const [profile, setProfile] = useState(initialProfile);
  const [showForm, setShowForm] = useState(true);

  const handleChange = (e) =>
    setProfile({ ...profile, [e.target.name]: e.target.value });

  return (
    <div className="card"><div className="card-body">
      <h5 className="card-title">Task 1: User Profile Editor</h5>
      <button className="btn btn-warning" onClick={() => setShowForm(!showForm)}>
        {showForm ? "Hide" : "Show"} form
      </button>
      <button className="btn btn-danger" onClick={() => setProfile(initialProfile)}>Reset</button>

      {showForm && (
        <form onSubmit={(e) => e.preventDefault()} style={{ marginTop: 10 }}>
          <input className="form-control" name="name" placeholder="Name"
                 value={profile.name} onChange={handleChange} style={{ marginBottom: 8 }} />
          <input className="form-control" name="age" type="number" placeholder="Age"
                 value={profile.age} onChange={handleChange} style={{ marginBottom: 8 }} />
          <input className="form-control" name="email" type="email" placeholder="Email"
                 value={profile.email} onChange={handleChange} />
        </form>
      )}

      <hr />
      <h6>Entered information</h6>
      <p>Name: <b>{profile.name || "-"}</b></p>
      <p>Age: <b>{profile.age || "-"}</b></p>
      <p>Email: <b>{profile.email || "-"}</b></p>
    </div></div>
  );
}

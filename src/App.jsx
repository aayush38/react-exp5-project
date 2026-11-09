import React, { useState } from "react";
import Fundamentals from "./components/Fundamentals.jsx";
import Hooks from "./components/Hooks.jsx";
import ProfileEditor from "./components/ProfileEditor.jsx";
import TaskManager from "./components/TaskManager.jsx";
import ProfileManager from "./components/ProfileManager.jsx";

const tabs = {
  "A. Fundamentals": <Fundamentals />,
  "B. Hooks": <Hooks />,
  "Task 1: Profile Editor": <ProfileEditor />,
  "Task 2: Task Manager": <TaskManager />,
  "Task 3: Profile Manager": <ProfileManager />,
};

export default function App() {
  const [active, setActive] = useState("A. Fundamentals");
  return (
    <div className="container" style={{ maxWidth: 760, paddingTop: 20, paddingBottom: 40 }}>
      <h2>React Experiment 5 - Fundamentals &amp; Hooks</h2>
      <div style={{ margin: "12px 0" }}>
        {Object.keys(tabs).map((name) => (
          <button key={name} className={"btn " + (active === name ? "btn-primary" : "btn-default")}
                  onClick={() => setActive(name)}>
            {name}
          </button>
        ))}
      </div>
      {tabs[active]}
    </div>
  );
}

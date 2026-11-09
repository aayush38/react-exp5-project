import React, { useReducer, useState } from "react";

function tasksReducer(state, action) {
  switch (action.type) {
    case "add":
      return { ...state, tasks: [...state.tasks, { id: Date.now(), text: action.text, completed: false }] };
    case "complete":
      return { ...state, tasks: state.tasks.map((t) => (t.id === action.id ? { ...t, completed: true } : t)) };
    case "toggleCompleted":
      return { ...state, showCompleted: !state.showCompleted };
    case "reset":
      return { ...state, tasks: [] };
    default:
      return state;
  }
}

export default function TaskManager() {
  const [state, dispatch] = useReducer(tasksReducer, { tasks: [], showCompleted: true });
  const [text, setText] = useState("");

  const addTask = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    dispatch({ type: "add", text: text.trim() });
    setText("");
  };

  const visible = state.tasks.filter((t) => state.showCompleted || !t.completed);

  return (
    <div className="card"><div className="card-body">
      <h5 className="card-title">Task 2: Task Manager</h5>
      <form onSubmit={addTask} style={{ display: "flex", gap: 8 }}>
        <input className="form-control" placeholder="New task" value={text}
               onChange={(e) => setText(e.target.value)} />
        <button className="btn btn-primary" type="submit">Add</button>
      </form>

      <div style={{ marginTop: 10 }}>
        <button className="btn btn-info" onClick={() => dispatch({ type: "toggleCompleted" })}>
          {state.showCompleted ? "Hide" : "Show"} completed tasks
        </button>
        <button className="btn btn-danger" onClick={() => dispatch({ type: "reset" })}>Reset list</button>
      </div>

      <ul className="list-group">
        {visible.length === 0 && <li className="list-group-item">No tasks to show</li>}
        {visible.map((t) => (
          <li key={t.id} className="list-group-item" style={{ display: "flex", justifyContent: "space-between" }}>
            <span className={t.completed ? "done" : ""}>{t.text}</span>
            {!t.completed && (
              <button className="btn btn-success" onClick={() => dispatch({ type: "complete", id: t.id })}>
                Mark complete
              </button>
            )}
          </li>
        ))}
      </ul>
    </div></div>
  );
}

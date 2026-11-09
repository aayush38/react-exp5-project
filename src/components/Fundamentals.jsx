import React, { Component, useState } from "react";

/* 1. Function component + props + JSX expressions + styling */
function Greeting({ name, course, year }) {
  const style = { color: "#0d6efd", fontWeight: "bold" };         // inline styling
  const isSenior = year >= 3;                                      // JS expression in JSX
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Function Component &amp; Props</h5>
        <p style={style}>Hello, {name.toUpperCase()}!</p>
        <p>Course: {course} | Year: {year} | {isSenior ? "Senior" : "Junior"} student</p>
        <p>2 + 3 = {2 + 3}</p>
      </div>
    </div>
  );
}

/* 2. Events + event handling in a function component */
function EventDemo() {
  const [msg, setMsg] = useState("No event yet");
  const handleClick = (e) => setMsg(`Button clicked (event type: ${e.type})`);
  const handleChange = (e) => setMsg(`You typed: ${e.target.value}`);
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">React Events</h5>
        <button className="btn btn-primary" onClick={handleClick}>Click me</button>
        <input className="form-control" placeholder="Type here" onChange={handleChange} />
        <p style={{ marginTop: 10 }}><b>{msg}</b></p>
      </div>
    </div>
  );
}

/* 3. Class component: state, lifecycle methods, event binding */
class LifecycleDemo extends Component {
  constructor(props) {
    super(props);
    this.state = { count: 0, log: [] };
    this.increment = this.increment.bind(this);                    // event binding
  }
  addLog(text) {
    this.setState((prev) => ({ log: [...prev.log, text] }));
  }
  componentDidMount() {                                            // runs once after first render
    this.addLog("componentDidMount: component mounted");
  }
  componentDidUpdate(prevProps, prevState) {                       // runs after every update
    if (prevState.count !== this.state.count) {
      console.log("componentDidUpdate: count is now", this.state.count);
    }
  }
  componentWillUnmount() {                                         // cleanup before removal
    console.log("componentWillUnmount: component removed");
  }
  increment() {
    this.setState((prev) => ({ count: prev.count + 1 }));
  }
  arrowReset = () => this.setState({ count: 0 });                  // arrow fn = auto-bound
  render() {
    return (
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Class Component, State, Lifecycle &amp; Event Binding</h5>
          <p>Count: <b>{this.state.count}</b></p>
          <button className="btn btn-success" onClick={this.increment}>Increment (bind in constructor)</button>
          <button className="btn btn-danger" onClick={this.arrowReset}>Reset (arrow function)</button>
          <ul>{this.state.log.map((l, i) => <li key={i}>{l}</li>)}</ul>
        </div>
      </div>
    );
  }
}

export default function Fundamentals() {
  const [showLifecycle, setShowLifecycle] = useState(true);
  return (
    <>
      <Greeting name="Aayush" course="Full Stack Development" year={3} />
      <EventDemo />
      <button className="btn btn-warning" onClick={() => setShowLifecycle(!showLifecycle)}>
        {showLifecycle ? "Unmount" : "Mount"} class component
      </button>
      {showLifecycle && <LifecycleDemo />}
    </>
  );
}

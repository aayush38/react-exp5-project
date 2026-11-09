import React, {
  useState, useEffect, useContext, useRef, useCallback, useReducer, useMemo, memo,
} from "react";
import { ThemeContext } from "../context/ThemeContext.jsx";

/* useState */
function UseStateDemo() {
  const [count, setCount] = useState(0);
  return (
    <div className="card"><div className="card-body">
      <h5 className="card-title">useState</h5>
      <p>Count: <b>{count}</b></p>
      <button className="btn btn-primary" onClick={() => setCount(count + 1)}>+1</button>
      <button className="btn btn-danger" onClick={() => setCount(0)}>Reset</button>
    </div></div>
  );
}

/* useEffect: side effect + cleanup (timer) */
function UseEffectDemo() {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(true);
  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(id);                  // cleanup
  }, [running]);                                      // dependency array
  useEffect(() => { document.title = `Timer: ${seconds}s`; }, [seconds]);
  return (
    <div className="card"><div className="card-body">
      <h5 className="card-title">useEffect</h5>
      <p>Timer: <b>{seconds}s</b> (also updates the browser tab title)</p>
      <button className="btn btn-warning" onClick={() => setRunning(!running)}>
        {running ? "Pause" : "Resume"}
      </button>
    </div></div>
  );
}

/* useContext */
function UseContextDemo() {
  const theme = useContext(ThemeContext);
  return (
    <div className="card"><div className="card-body">
      <h5 className="card-title">useContext</h5>
      <div className={theme === "dark" ? "dark-box" : "light-box"} style={{ padding: 12, borderRadius: 6 }}>
        Current theme from context: <b>{theme}</b>
      </div>
    </div></div>
  );
}

/* useRef */
function UseRefDemo() {
  const inputRef = useRef(null);
  const renders = useRef(0);
  renders.current += 1;                               // persists, does NOT re-render
  return (
    <div className="card"><div className="card-body">
      <h5 className="card-title">useRef</h5>
      <input ref={inputRef} className="form-control" placeholder="Click the button to focus me" />
      <button className="btn btn-info" style={{ marginTop: 8 }} onClick={() => inputRef.current.focus()}>
        Focus input
      </button>
      <p>Component rendered <b>{renders.current}</b> time(s)</p>
    </div></div>
  );
}

/* useCallback + memo: stable function identity prevents child re-render */
const Child = memo(function Child({ onAdd }) {
  console.log("Child rendered");
  return <button className="btn btn-success" onClick={onAdd}>Add 1 (memoized child)</button>;
});

function UseCallbackDemo() {
  const [total, setTotal] = useState(0);
  const [text, setText] = useState("");
  const handleAdd = useCallback(() => setTotal((t) => t + 1), []);
  return (
    <div className="card"><div className="card-body">
      <h5 className="card-title">useCallback</h5>
      <p>Total: <b>{total}</b></p>
      <Child onAdd={handleAdd} />
      <input className="form-control" placeholder="Typing here does not re-render Child"
             value={text} onChange={(e) => setText(e.target.value)} />
    </div></div>
  );
}

/* useMemo: cache an expensive calculation */
function UseMemoDemo() {
  const [n, setN] = useState(10);
  const [dark, setDark] = useState(false);
  const factorial = useMemo(() => {
    console.log("Computing factorial...");
    let r = 1n;
    for (let i = 2n; i <= BigInt(n); i++) r *= i;
    return r.toString();
  }, [n]);                                            // recomputed only when n changes
  return (
    <div className="card"><div className="card-body">
      <h5 className="card-title">useMemo</h5>
      <input type="number" className="form-control" value={n} min="0" max="100"
             onChange={(e) => setN(Number(e.target.value))} />
      <p style={{ marginTop: 8, wordBreak: "break-all" }}>{n}! = <b>{factorial}</b></p>
      <button className={dark ? "btn btn-info" : "btn btn-warning"} onClick={() => setDark(!dark)}>
        Toggle colour (does not recompute)
      </button>
    </div></div>
  );
}

/* useReducer */
function counterReducer(state, action) {
  switch (action.type) {
    case "increment": return { count: state.count + 1 };
    case "decrement": return { count: state.count - 1 };
    case "reset":     return { count: 0 };
    default: throw new Error("Unknown action: " + action.type);
  }
}
function UseReducerDemo() {
  const [state, dispatch] = useReducer(counterReducer, { count: 0 });
  return (
    <div className="card"><div className="card-body">
      <h5 className="card-title">useReducer</h5>
      <p>Count: <b>{state.count}</b></p>
      <button className="btn btn-primary" onClick={() => dispatch({ type: "increment" })}>+</button>
      <button className="btn btn-warning" onClick={() => dispatch({ type: "decrement" })}>-</button>
      <button className="btn btn-danger" onClick={() => dispatch({ type: "reset" })}>Reset</button>
    </div></div>
  );
}

export default function Hooks() {
  const [theme, setTheme] = useState("light");
  return (
    <ThemeContext.Provider value={theme}>
      <button className="btn btn-primary" onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
        Toggle context theme
      </button>
      <UseStateDemo />
      <UseEffectDemo />
      <UseContextDemo />
      <UseRefDemo />
      <UseCallbackDemo />
      <UseMemoDemo />
      <UseReducerDemo />
    </ThemeContext.Provider>
  );
}

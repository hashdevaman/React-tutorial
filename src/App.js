import * as React from "react";

// Initial state of timer
const initialState = {
  isRunning: false,
  timer: 0
};

// Adding reducer function
const reducer = (state, action) => {
  // console.log("action here", action);

  switch (action.type) {
    case "start":
      return { ...state, isRunning: true };
    case "stop":
      return { ...state, isRunning: false };
    case "reset":
      return { isRunning: false, timer: 0 };
    case "tick":
      return { ...state, timer: state.timer + 1 };
    default:
      throw new Error();
  }
};

export default function App() {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const intervalRef = React.useRef(0);

  React.useEffect(() => {
    if (!state.isRunning) {
      return;
    }
    intervalRef.current = setInterval(() => dispatch({ type: "tick" }), 1000);
    return () => {
      clearInterval(intervalRef.current);
      intervalRef.current = 0;
    };
  }, [state.isRunning]);

  return (
    <div>
      <h2>React Stop Watch</h2>
      <h3>{state.timer}s</h3>
      <button onClick={() => dispatch({ type: "start" })}>Start</button>
      <button onClick={() => dispatch({ type: "stop" })}>Stop</button>
      <button onClick={() => dispatch({ type: "reset" })}>Reset</button>
    </div>
  );
}

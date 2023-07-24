import * as React from "react";

export default function App() {

  const [timer, setTimer] = React.useState(0);
  const [status, setStatus] = React.useState(2); // 1 start, 2 stop, 3 reset 
  const [laps, setLaps] = React.useState([]);
  const interval = React.useRef(0); 

  React.useEffect(() => {
    if(status === 1) {
      interval.current = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000)
    } else if(status === 2) {
      clearInterval(interval.current);
      interval.current = 0;
    } else if(status === 3) {
      clearInterval(interval.current);
      interval.current = 0;
      setTimer(0);
    }
  }, [status]);

  const addLaps = () => {
    setLaps([...laps, ...[timer]])
  }
 

  return (
    <div>
      <h2>React Stop Watch</h2>
      <div>{laps.length > 0 && laps.map(val => {
        return (<p>{val}</p>)
      })}</div>
      <h3>{timer}s</h3>
      <button onClick={() => setStatus(1)}>Start</button>
      <button onClick={() => setStatus(2)}>Stop</button>
      <button onClick={() => setStatus(3)}>Reset</button>
      <button onClick={() => addLaps()}>Lapse</button>
    </div>
  );
}

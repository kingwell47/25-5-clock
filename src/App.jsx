import React, { useState } from "react";
import "./App.scss";
import Break from "./components/Break";
import Session from "./components/Session";
import Timer from "./components/Timer";

const initial = {
  breakTime: 5,
  sessionTime: 25,
};

function App() {
  const [breakTime, setBreakTime] = useState(initial.breakTime);
  const [sessionTime, setSessionTime] = useState(initial.sessionTime);
  const [sessionActive, setSessionActive] = useState(true);

  return (
    <div className='App'>
      <h1>25 + 5 Clock</h1>
      <Break />
      <Session />
      <Timer />
    </div>
  );
}

export default App;

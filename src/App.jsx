import React, { useState } from "react";
import "./App.scss";
import Display from "./components/Display";
import Timer from "./components/Timer";
import takeABreak from "./audio/break.wav";
import backToWork from "./audio/work.wav";

const initial = {
  breakTime: 5,
  sessionTime: 25,
};

function App() {
  const [breakTime, setBreakTime] = useState(initial.breakTime);
  const [sessionTime, setSessionTime] = useState(initial.sessionTime);
  const [sessionActive, setSessionActive] = useState(true);
  const [countingDown, setCountingDown] = useState(false);

  let audio = document.getElementById("beep");

  const handleSwitchOver = () => {
    setSessionActive(!sessionActive);
  };

  const handleReset = () => {
    setBreakTime(initial.breakTime);
    setSessionTime(initial.sessionTime);
    setSessionActive(true);
    setCountingDown(false);
  };

  return (
    <div className='App'>
      <h1>25 + 5 Clock</h1>
      <audio src={sessionActive ? backToWork : takeABreak} id='beep'></audio>
      <Display
        id='break'
        time={breakTime}
        handler={setBreakTime}
        counting={countingDown}
      />
      <Display
        id='session'
        time={sessionTime}
        handler={setSessionTime}
        counting={countingDown}
      />
      <Timer
        id={sessionActive ? "session" : "break"}
        time={sessionActive ? sessionTime : breakTime}
        counting={{ countingDown, setCountingDown }}
        resetBtn={handleReset}
        switchOver={handleSwitchOver}
      />
    </div>
  );
}

export default App;

import React, { useState } from "react";
import "./App.scss";
import Display from "./components/Display";
import Timer from "./components/Timer";
import takeABreak from "./audio/break.wav";
import backToWork from "./audio/work.wav";
import cardDraw from "./audio/card.mp3";

const initial = {
  breakTime: 5,
  sessionTime: 25,
};

function App() {
  const [breakTime, setBreakTime] = useState(initial.breakTime);
  const [sessionTime, setSessionTime] = useState(initial.sessionTime);
  const [sessionActive, setSessionActive] = useState(true);
  const [countingDown, setCountingDown] = useState(false);

  const takeBreak = new Audio(takeABreak);
  const backWork = new Audio(backToWork);

  const handleSwitchOver = () => {
    //Handle Switching over to another timer
    if (sessionActive) {
      //Play Audio depending on what's active
      takeBreak.play();
    } else {
      backWork.play();
    }
    setSessionActive(!sessionActive); //Toggle Session active
  };

  const handleReset = () => {
    //Reset the timer back to initial 25 + 5 Settings
    setBreakTime(initial.breakTime);
    setSessionTime(initial.sessionTime);
    setSessionActive(true);
    setCountingDown(false);
  };

  return (
    <div className='app'>
      <h1>25 + 5 Clock</h1>
      <audio src={cardDraw} id='beep'></audio>
      <div className='display_wrapper'>
        <Display
          id='session'
          time={sessionTime}
          handler={setSessionTime}
          counting={countingDown} // Pass down status if counting down or not
        />
        <Timer //Switch Items Depending on if session is active
          id={sessionActive ? "session" : "break"}
          time={sessionActive ? sessionTime : breakTime}
          counting={{ countingDown, setCountingDown }} // Pass down status if counting down or not, passing down the setter also allows the timer to change the status
          resetBtn={handleReset}
          switchOver={handleSwitchOver}
        />
        <Display
          id='break'
          time={breakTime}
          handler={setBreakTime}
          counting={countingDown} // Pass down status if counting down or not
        />
      </div>
    </div>
  );
}

export default App;

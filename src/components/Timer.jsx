import React, { useState, useEffect, useRef } from "react";

/* 

Adapted from Florin Pop's countdown timer
https://www.youtube.com/watch?v=x7WJEmxNlEs

and
Uzoanya Dominic's Countdown Timer
https://www.youtube.com/watch?v=ZVOGPvo08zM

and
Coding Entrepreneurs
https://www.youtube.com/watch?v=NAx76xx40jM
*/

function Timer(props) {
  const [totalTime, setTotalTime] = useState(props.time * 60);
  // const [timerMinutes, setTimerMinutes] = useState(props.time);
  // const [timerSeconds, setTimerSeconds] = useState("00");
  const { countingDown, setCountingDown } = props.counting;
  const timerMinutes = useRef(props.time);
  const timerSeconds = useRef("00");

  const playAudio = () => {
    let audio = document.getElementById("beep");
    audio.play();
  };
  const pauseAudio = () => {
    let audio = document.getElementById("beep");
    audio.pause();
    audio.load();
  };

  const handleStart = () => {
    if (totalTime === props.time * 60) {
      setTotalTime(totalTime - 1); //Immediately decrement the count at start!
    }
    setCountingDown(!countingDown); //Toggle the countdown
  };

  const resetTimer = () => {
    //handle resetting everything
    props.resetBtn();
    refresh(); //update the timer to latest time;
    pauseAudio();
  };

  // Update the timer every time prop.time is changed
  useEffect(() => {
    let minutes = props.time;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    setTotalTime(props.time * 60);
    timerMinutes.current = minutes;
    timerSeconds.current = "00";
  }, [props.time]);

  // UseEffect to do updates
  useEffect(() => {
    let interval = setInterval(() => {
      if (!countingDown) {
        return; // If the timer is not active, do nothing
      }
      if (totalTime <= 0) {
        playAudio(); // Play Audio when time is up
      }
      if (countingDown && totalTime >= 0) {
        //Countdown only until zero
        doIntervalChange();
      } else {
        props.switchOver(); //Switchover to the other timer
        refresh(); // update the timer again
      }
    }, 1000); // 1 second intervals
    return () => clearInterval(interval);
  });

  //The function below "refreshes" the display time
  const refresh = () => {
    setTotalTime(props.time * 60);
    let minutes = props.time;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    timerMinutes.current = minutes;
    timerSeconds.current = "00";
  };

  //This is the actual counting down function
  const doIntervalChange = () => {
    let minutes = Math.floor(totalTime / 60);
    let seconds = totalTime % 60;
    seconds = seconds < 10 ? "0" + seconds : seconds; //Formatting the seconds and minutes
    minutes = minutes < 10 ? "0" + minutes : minutes;
    timerMinutes.current = minutes;
    timerSeconds.current = seconds;
    setTotalTime(totalTime - 1);
  };

  return (
    <section className={props.id + "-timer"}>
      <h2 className='header' id='timer-label'>
        {props.id}
      </h2>
      <p className='text' id='time-left'>
        {timerMinutes.current}:{timerSeconds.current}
      </p>
      <button className='button' id='start_stop' onClick={() => handleStart()}>
        Play/Pause
      </button>
      <button className='button' id='reset' onClick={() => resetTimer()}>
        Reset
      </button>
    </section>
  );
}

export default Timer;

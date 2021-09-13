import React, { useState, useEffect, useRef } from "react";
import jester from "../icons/foolhat.svg";

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
  const alert = useRef(false);
  const switching = useRef(false);

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
    alert.current = false;
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
      if (timerMinutes.current === "00") {
        alert.current = true;
      } else {
        alert.current = false;
      }
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
        switching.current = true;
        props.switchOver(); //Switchover to the other timer
        refresh(); // update the timer again
        setInterval(() => {
          switching.current = false;
        }, 4500);
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
      <button
        className={countingDown ? "button-top active" : "button-top"}
        id='start_stop'
        onClick={() => handleStart()}>
        P
        <svg>
          <path
            d='m20 10c0.97-5 2.911-10 9.702-10 6.792 0 12.128 5 9.703 15-2.426 10-13.584 15-19.405 25-5.821-10-16.979-15-19.405-25-2.4254-10 2.9109-15 9.703-15 6.791 0 8.732 5 9.702 10z'
            fill='#A5031E'
          />
        </svg>
      </button>
      <div className={alert.current ? "text-wrapper alert" : "text-wrapper"}>
        {switching.current && <img src={jester} alt='' />}
        <p className='text' id='time-left'>
          {timerMinutes.current}:{timerSeconds.current}
        </p>
        <h2 className='header' id='timer-label'>
          {props.id}
        </h2>
      </div>
      <button className='button-bottom' id='reset' onClick={() => resetTimer()}>
        <svg>
          <path
            d='m20 10c0.97-5 2.911-10 9.702-10 6.792 0 12.128 5 9.703 15-2.426 10-13.584 15-19.405 25-5.821-10-16.979-15-19.405-25-2.4254-10 2.9109-15 9.703-15 6.791 0 8.732 5 9.702 10z'
            fill='#A5031E'
          />
        </svg>
        R
      </button>
    </section>
  );
}

export default Timer;

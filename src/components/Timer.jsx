import React from "react";

function Timer() {
  return (
    <section className='timer'>
      <h2 className='timer__header'>Session / Break</h2>
      <p className='timer__text'>25:00</p>
      <button className='timer__button'>Play/Pause</button>
      <button className='timer__button'>Reset</button>
    </section>
  );
}

export default Timer;

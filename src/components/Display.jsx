import React from "react";

function Display(props) {
  const countingDown = props.counting;

  const addTime = () => {
    if (countingDown) {
      //If currently countingdown, do nothing
      return;
    }
    let currTime = props.time;
    if (currTime < 60) {
      props.handler(currTime + 1); //increment the time prop passed down from the parent component
    } else {
      return;
    }
  };

  const reduceTime = () => {
    //If currently countingdown, do nothing
    if (countingDown) {
      return;
    }
    let currTime = props.time;
    if (currTime > 1) {
      props.handler(currTime - 1);
    } else {
      return;
    }
  };

  return (
    <section className={props.id}>
      <h2 className='header' id={props.id + "-label"}>
        {props.id} length
      </h2>
      <p className='text' id={props.id + "-length"}>
        {props.time}
      </p>
      <button
        className='button'
        id={props.id + "-increment"}
        onClick={() => addTime()}>
        Add
      </button>
      <button
        className='button'
        id={props.id + "-decrement"}
        onClick={() => reduceTime()}>
        Subtract
      </button>
    </section>
  );
}

export default Display;

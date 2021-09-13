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
      <button
        className='button-top'
        id={props.id + "-increment"}
        onClick={() => addTime()}>
        A
        <svg>
          <path
            id='path3295'
            fill='rgb(36, 10, 14)'
            d='m9.9958 40c7.2112-1.603 7.9872-5.826 8.5312-13.594-1.253 2.075-3.531 3.607-7.25 3.594-6.1124-0.021-10.207-3.576-8.75-11.25 1.4688-7.737 12.469-10.737 17.469-18.75 5 8.0128 16 11.013 17.469 18.75 1.456 7.674-2.469 11.228-8.75 11.25-3.719 0.013-5.997-1.519-7.25-3.594 0.544 7.768 1.319 11.991 8.531 13.594h-20z'
          />
        </svg>
      </button>
      <div className='text-wrapper'>
        <p className='text' id={props.id + "-length"}>
          {props.time}
        </p>
        <h2 className='header' id={props.id + "-label"}>
          {props.id} length
        </h2>
      </div>
      <button
        className='button-bottom'
        id={props.id + "-decrement"}
        onClick={() => reduceTime()}>
        <svg>
          <path
            id='path3295'
            fill='rgb(36, 10, 14)'
            d='m9.9958 40c7.2112-1.603 7.9872-5.826 8.5312-13.594-1.253 2.075-3.531 3.607-7.25 3.594-6.1124-0.021-10.207-3.576-8.75-11.25 1.4688-7.737 12.469-10.737 17.469-18.75 5 8.0128 16 11.013 17.469 18.75 1.456 7.674-2.469 11.228-8.75 11.25-3.719 0.013-5.997-1.519-7.25-3.594 0.544 7.768 1.319 11.991 8.531 13.594h-20z'
          />
        </svg>
        S
      </button>
    </section>
  );
}

export default Display;

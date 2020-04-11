import React, { useState } from "react";
import ReactDOM from "react-dom";

const Button = ({ action, text }) => {
  return (
    <div>
      <button onClick={action}>{text}</button>
    </div>
  );
};
const App = () => {
  const [count, setCount] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
    total: 0,
  });

  const addGood = () => {
    setCount({ ...count, good: count.good + 1, total: count.total + 1 });
  };

  const addNeutral = () => {
    setCount({ ...count, neutral: count.neutral + 1, total: count.total + 1 });
  };

  const addBad = () => {
    setCount({ ...count, bad: count.bad + 1, total: count.total + 1 });
  };
  return (
    <div>
      <h1>Give Feedback</h1>
      <Button action={addGood} text="Good" />
      <Button action={addNeutral} text="Neutral" />
      <Button action={addBad} text="Bad" />
      <h2>statistics</h2>
      <p>Good {count.good}</p>
      <p>Neutral {count.neutral}</p>
      <p>Bad {count.bad}</p>
      <p>Average {(count.good - count.bad) / count.total}</p>
      <p>Positive {(count.good / count.total) * 100}%</p>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));

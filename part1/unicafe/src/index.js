import React, { useState } from "react";
import ReactDOM from "react-dom";

const Button = ({ action, text }) => {
  return (
    <>
      <button onClick={action}>{text}</button>
    </>
  );
};

const Statistic = ({ name, value }) => (
  <tr>
    <td>{name}:</td>
    <td>{value}</td>
  </tr>
);

const Statistics = ({ data: { good, neutral, bad, total } }) => {
  if (total === 0) {
    return (
      <div>
        <h2>No feedback given</h2>
      </div>
    );
  }
  return (
    <div>
      <h2>statistics</h2>
      <table>
        <tbody>
          <Statistic name="Good" value={good} />
          <Statistic name="Neutral" value={neutral} />
          <Statistic name="Bad" value={bad} />
          <Statistic name="All" value={total} />
          <Statistic name="Average" value={(good - bad) / total} />
          <Statistic name="Positive" value={(good / total) * 100 + "%"} />
        </tbody>
      </table>
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

  const increaseVal = (text) => {
    return () => {
      setCount({ ...count, [text]: count[text] + 1, total: count.total + 1 });
    };
  };

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button action={increaseVal("good")} text="Good" />
      <Button action={increaseVal("neutral")} text="Neutral" />
      <Button action={increaseVal("bad")} text="Bad" />
      <Statistics data={count} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));

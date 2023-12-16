import React, { useState } from "react";
import './index.css';

const Home = (props) => {
  const { user } = props;
  const { name, age } = user;
  const [allValue, setValue] = useState({ counter: 0 });

  const onChangeValue = () => {
    let newValue = allValue.counter + 1;
    setValue({ ...allValue, counter: newValue });
  };

  const onDecrementValue = () => {
    let newValue = allValue.counter - 1;
    setValue({ ...allValue, counter: newValue });
  };

  return (
    <div className="bg-container">
      <h1 className="heading">{allValue.counter}</h1>
      <button type="button" onClick={onChangeValue}>
        Increment
      </button>
      <button type="button" onClick={onDecrementValue}>
        Decrement
      </button>
    </div>
  );
};

export default Home;

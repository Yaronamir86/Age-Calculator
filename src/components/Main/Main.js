import React, { useState, useEffect } from 'react';
import Input from '../Input/Input.js';
import Output from '../Output/Output.js';
import './Main.css';

function Main() {
  const [age, setAge] = useState({ years: null, months: null, days: null });
  const [inputChanged, setInputChanged] = useState(false);

  // Function to calculate age based on input values
  const calculateAge = (years, months, days) => {
    setAge({ years, months, days });
  };

  useEffect(() => {
    if (inputChanged) {
      setAge({ years: null, months: null, days: null });
      setInputChanged(false);
    }
  }, [inputChanged]);

  return (
    <div className="main__content">
      <Input onCalculate={calculateAge} setInputChanged={setInputChanged} />
      <Output age={age} />
    </div>
  );
}

export default Main;

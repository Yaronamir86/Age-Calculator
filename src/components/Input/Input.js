import React, { useState } from "react";
import "./Input.css";
// import { differenceInCalendarMonths } from "date-fns";
import button_img from "../../images/icon-arrow.svg";

function Input({ onCalculate }) {
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [inputError, setInputError] = useState("");
  const [inputErrorDay, setInputErrorDay] = useState("");
  const [inputErrorMonth, setInputErrorMonth] = useState("");
  const [inputErrorYear, setInputErrorYear] = useState("");

  
  const isValidDay = (day) => {
    const numericDay = parseInt(day);
    return !isNaN(numericDay) && numericDay >= 1 && numericDay <= 31;
  };

  const isValidMonth = (month) => {
    const numericMonth = parseInt(month);
    return !isNaN(numericMonth) && numericMonth >= 1 && numericMonth <= 12;
  };

  const isValidYear = (year) => {
    const currentYear = new Date().getFullYear();
    const numericYear = parseInt(year);
    return (
      !isNaN(numericYear) && numericYear >= 1900 && numericYear <= currentYear
    );
  };

  const isValidDate = (day, month, year) => {
    const numericDay = parseInt(day);
    const numericMonth = parseInt(month);
    const numericYear = parseInt(year);

    
    const date = new Date(numericYear, numericMonth - 1, numericDay);
    return (
      !isNaN(date) &&
      date.getDate() === numericDay &&
      date.getMonth() === numericMonth - 1 &&
      date.getFullYear() === numericYear
    );
  };

  // Handle input changes and update state accordingly
  const handleDayChange = (e) => {
    const inputValue = e.target.value;
    setDay(inputValue);

    if (!isValidDay(inputValue)) {
      setInputErrorDay("Must be a valid day");
    } else {
      setInputErrorDay("");
    }
  };

  
  

  const handleMonthChange = (e) => {
    const inputValue = e.target.value;
    setMonth(inputValue);

    // Validate the input (for example, check if it's a valid month)
    if (!isValidMonth(inputValue)) {
      setInputErrorMonth("Must be a valid month");
    } else {
      setInputErrorMonth("");
    }
  };

  const handleYearChange = (e) => {
    const inputValue = e.target.value;
    setYear(inputValue);

    // Validate the input (for example, check if it's a valid year)
    if (inputValue.length !== 4) {
      setInputErrorYear("Year must be 4 digits");
    } else if (!isValidYear(inputValue)) {
      setInputErrorYear("Must be in the past, count starts from 1900");
    } else {
      setInputErrorYear("");
    }
  };
  // Function to calculate age
  const calculateAge = () => {

   

    if (!day ) {
      setInputErrorDay("All data must be filled in"); 
    }

    if (!month) {
      setInputErrorMonth("All data must be filled in");
    }

    if (!year) {
      setInputErrorYear("All data must be filled in");
      return; 
    }

   


    if (day && month && year) {
      if (isValidDate(day, month, year)) {
        const birthDate = new Date(year, month - 1, day);
        const currentDate = new Date();
  
        // Check if the entered date is in the future
        if (birthDate > currentDate) {
          
          return; // Return early to prevent age calculation
        }
  
        let ageYears = currentDate.getFullYear() - birthDate.getFullYear();
        let ageMonths = currentDate.getMonth() - birthDate.getMonth();
        let ageDays = currentDate.getDate() - birthDate.getDate();
  
        // Handle cases where the birth date day is greater than the current date day
        if (ageDays < 0) {
          ageMonths--;
          ageDays += new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            0
          ).getDate();
        }
  
        // Handle cases where the birth date month is greater than the current date month
        if (ageMonths < 0) {
          ageYears--;
          ageMonths += 12;
        }
  
        setInputError("");
        setInputErrorYear("");
        setInputErrorMonth("");
        setInputErrorDay("");
  
        onCalculate(ageYears, ageMonths, ageDays);
      } else {
        setInputError("Must be a valid date");
      }
    }
  };

  return (
    <div className="input__container">
      <form onSubmit={calculateAge} className="input__form form">
        <div className="input__content">
          <h2 className={`input__title ${
              inputErrorDay ? "input__title_error" : ""
            }`}>DAY</h2>
          <input
            type="number"
            className={`input__text ${
              inputErrorDay ? "input__text_error" : ""
            }`}
            placeholder="DD"
            value={day}
            onChange={handleDayChange}
            required={true}
            min="1"
            max="31"
          />
          {inputErrorDay && (
            <p className="input__text_message">{inputErrorDay}</p>
          )}
          {inputError && <p className="input__text_message">{inputError}</p>}
        </div>
        <div className="input__content">
          <h2 className={`input__title ${
              inputErrorMonth ? "input__title_error" : ""
            }`}>MONTH</h2>
          <input
            type="number"
            className={`input__text ${
              inputErrorMonth ? "input__text_error" : ""
            }`}
            placeholder="MM"
            value={month}
            onChange={handleMonthChange}
            required={true}
            min="1"
            max="12"
          />
          {inputErrorMonth && (
            <p className="input__text_message">{inputErrorMonth}</p>
          )}
          {inputError && <p className="input__text_message">{inputError}</p>}
        </div>
        <div className="input__content">
          <h2 className={`input__title ${
              inputErrorYear ? "input__title_error" : ""
            }`}>YEAR</h2>
          <input
            type="number"
            className={`input__text ${
              inputErrorYear ? "input__text_error" : ""
            }`}
            placeholder="YYYY"
            value={year}
            onChange={handleYearChange}
            required={true}
            min="1900"
            max={new Date().getFullYear()}
          />
          {inputErrorYear && (
            <p className="input__text_message">{inputErrorYear}</p>
          )}
          {inputError && <p className="input__text_message">{inputError}</p>}
        </div>
      </form>
      <button className="input__btn" onClick={calculateAge}>
        <img src={button_img} alt="button" />
      </button>
    </div>
  );
}

export default Input;

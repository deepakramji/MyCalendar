import React from "react";
import { Calendar } from "react-calendar";
//import "react-calendar/dist/Calendar.css";
import "./calendar.css";

const CalendarComponent = ({ date, dateChanged }) => {
  return (
    <div>
      <h1>Click on a date to add/view Notes..</h1>
      <div className="Calendar1">
        <Calendar onChange={dateChanged} value={date} />
      </div>
    </div>
  );
};

export default CalendarComponent;

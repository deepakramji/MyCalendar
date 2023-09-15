import React, { useState, useEffect } from "react";
import Notes from "./components/notes";
import CalendarComponent from "./components/calendar";

import { format } from "date-fns";

const BASE = "http://localhost:3000/mtNotes/";

function App() {
  const [currDate, setDate] = useState(new Date());
  const [defaultStrings, setDefaultStrings] = useState({
    workoutPlan: "",
    workoutNotes: "",
    nutritionNotes: "",
  });

  const dateChanged = (newDate) => {
    setDate(newDate);
  };

  const getFormattedDate = () => {
    const formattedDate = format(currDate, "yyyy-MM-dd");
    return formattedDate;
  };

  const fetchDefaultStrings = async () => {
    const workoutPlan = await getDefaultString("workoutPlan");
    const workoutNotes = await getDefaultString("workoutNotes");
    const nutritionNotes = await getDefaultString("nutritionNotes");

    setDefaultStrings({
      workoutPlan,
      workoutNotes,
      nutritionNotes,
    });
  };

  useEffect(() => {
    fetchDefaultStrings();
  }, [currDate]);

  const getDefaultString = async (noteSel) => {
    try {
      const response = await fetch(BASE + getFormattedDate());
      const data = await response.json();
      let retStr = "";
      if (data !== null) {
        if (noteSel === "workoutPlan") retStr = data.workoutPlan;
        else if (noteSel === "workoutNotes") retStr = data.workoutNotes;
        else if (noteSel === "nutritionNotes") retStr = data.nutritionNotes;
      }
      if (retStr === undefined) return "";
      console.log(noteSel);
      console.log(retStr);
      return retStr;
    } catch (error) {
      console.error(error);
      return "";
    }
  };

  return (
    <div className="App">
      <br></br>
      <div>
        <CalendarComponent
          date={getFormattedDate()}
          dateChanged={dateChanged}
        />
      </div>
      <div className="Notes">
        <h2>Workout Plan</h2>
        <Notes
          nRows={"6"}
          date={getFormattedDate()}
          clsName={"workoutPlan"}
          dataFromDb={defaultStrings.workoutPlan}
        ></Notes>
        <h2>How did the workout go ?</h2>
        <Notes
          nRows={"9"}
          date={getFormattedDate()}
          clsName={"workoutNotes"}
          dataFromDb={defaultStrings.workoutNotes}
        ></Notes>
        <div style={{ display: "flex" }}>
          <h2>Other Notes</h2>
          <h3 style={{ transform: "translateY(20%)", fontWeight: "lighter" }}>
            (Nutrition, sleep, Pains and Niggles)
          </h3>
        </div>
        <Notes
          nRows={"18"}
          date={getFormattedDate()}
          clsName={"nutritionNotes"}
          dataFromDb={defaultStrings.nutritionNotes}
        ></Notes>
      </div>
    </div>
  );
}

export default App;

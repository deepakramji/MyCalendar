import React, { useState, useEffect } from "react";

const BASE = "http://localhost:3000/mtNotes/";

const Notes = ({ nRows, date, clsName, dataFromDb }) => {
  const [text, setText] = useState(dataFromDb);
  useEffect(() => {
    setText(dataFromDb);
  }, [dataFromDb]);

  const textChanged = (event) => {
    const newText = event.target.value;
    setText(newText);
    addOrUpdateNotes(date, newText, clsName);
  };

  const addOrUpdateNotes = async (currDate, text, clsName) => {
    try {
      const response = await fetch(BASE + "new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          date: currDate,
          [clsName]: text,
        }),
      });

      const data = await response.json();
      if (data == 11000) {
        await fetch(BASE + "edit/" + currDate, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            [clsName]: text,
          }),
        });
      }
    } catch (error) {
      console.error("Error caught:", error);
    }
  };

  return (
    <div>
      <textarea
        className={clsName + " " + clsName}
        rows={nRows}
        cols="10"
        name="description"
        value={text}
        onChange={textChanged}
      ></textarea>
      <br></br>
    </div>
  );
};

export default Notes;

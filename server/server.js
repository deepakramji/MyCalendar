const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

const connectionString =
  "mongodb+srv://ramji:pxoNomIPRtolqc0z@cluster0.wtk2hrc.mongodb.net/";

mongoose
  .connect(connectionString)
  .then(() => {
    console.log("Connected to MongoDB Atlas!");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB Atlas:", error);
  });

const dayLogModel = require("./models/models");

//Get all day Notes
app.get("/mtNotes", async (req, res) => {
  const allNotes = await dayLogModel.find();
  let match = null;
  for (let n of allNotes) {
    if (n.userName === "ramji.hariharan@gmail.com") match = n;
  }
  if (match) {
    res.json(match.content);
  } else {
    res.json({ message: "No data found for the specified date." });
  }
});

//Get notes for a certain day
app.get("/mtNotes/:date", async (req, res) => {
  try {
    const dayLog = await dayLogModel.findOne({
      userName: "ramji.hariharan@gmail.com",
    });
    let match = null;
    for (let c of dayLog.content) {
      if (c.date === req.params.date) match = c;
    }
    if (match) {
      res.json(match);
    } else {
      res.json({ message: "No data found for the specified date." });
    }
  } catch (error) {
    res.json(error.code);
  }
});

// Edit a daylog
app.put("/mtNotes/edit/:date", async (req, res) => {
  try {
    const dayLog = await dayLogModel.findOne({
      userName: "ramji.hariharan@gmail.com",
    });
    let match = null;
    for (let c of dayLog.content) {
      if (c.date === req.params.date) match = c;
    }
    if (match !== null) {
      if (req.body.workoutPlan !== undefined)
        match.workoutPlan = req.body.workoutPlan;
      if (req.body.workoutNotes !== undefined)
        match.workoutNotes = req.body.workoutNotes;
      if (req.body.nutritionNotes !== undefined)
        match.nutritionNotes = req.body.nutritionNotes;
      await dayLog.save();
    }
    res.json(match.content);
  } catch (error) {
    res.json(error.code);
  }
});

// Post a new daylog
app.post("/mtNotes/new", async (req, res) => {
  try {
    const dayLog = await dayLogModel.findOne({
      userName: "ramji.hariharan@gmail.com",
    });
    let match = null;
    for (let c of dayLog.content) {
      if (c.date === req.body.date) match = c;
    }

    if (match !== null) {
      res.status(400).json(11000);
      return;
    } else {
      const newLog = {
        date: req.body.date,
        workoutPlan: req.body.workoutPlan,
        workoutNotes: req.body.workoutNotes,
        nutritionNotes: req.body.nutritionNotes,
      };
      dayLog.content.push(newLog);
      await dayLog.save();
      res.json(newLog);
    }
  } catch (error) {
    if (error.code === 11000 && error.keyPattern && error.keyPattern.date) {
      // Duplicate key error for 'date' field
      res.status(400).json(error.code);
    } else {
      console.error("Error saving day log:", error);
      res
        .status(500)
        .json({ error: "An error occurred while saving the day log." });
    }
  }
});

// Delete a day note
app.delete("/mtNotes/delete/:date", async (req, res) => {
  const result = await dayLogModel.findOne({
    userName: "ramji.hariharan@gmail.com",
  });
  result.content = result.content.filter((c) => {
    if (c.date === req.params.date) return false;
    return true;
  });
  await result.save();
  res.json(result);
});

app.listen(3000, () => console.log("Server started on Port 3001"));

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

const mtNotes = require("./models/models");

//Get all day Notes
app.get("/mtNotes", async (req, res) => {
  const allNotes = await mtNotes.find();
  res.json(allNotes);
});

//Get notes for a certain day
app.get("/mtNotes/:date", async (req, res) => {
  try {
    const dayLog = await mtNotes.findOne({ date: req.params.date });
    res.json(dayLog);
  } catch (error) {
    res.json(error.code);
  }
});

// Edit a daylog
app.put("/mtNotes/edit/:date", async (req, res) => {
  try {
    const dayLog = await mtNotes.findOne({ date: req.params.date });
    if (dayLog !== null) {
      if (req.body.workoutPlan !== undefined)
        dayLog.workoutPlan = req.body.workoutPlan;
      if (req.body.workoutNotes !== undefined)
        dayLog.workoutNotes = req.body.workoutNotes;
      if (req.body.nutritionNotes !== undefined)
        dayLog.nutritionNotes = req.body.nutritionNotes;
      const savedDayLog = await dayLog.save();
    }
    res.json(savedDayLog);
  } catch (error) {
    res.json(error.code);
  }
});

// Post a new daylog
app.post("/mtNotes/new", async (req, res) => {
  try {
    const dayLog = new mtNotes({
      date: req.body.date,
      workoutPlan: req.body.workoutPlan,
      workoutNotes: req.body.workoutNotes,
      nutritionNotes: req.body.nutritionNotes,
    });
    const savedDayLog = await dayLog.save();
    res.json(savedDayLog);
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
  const result = await mtNotes.findOneAndDelete({ date: req.params.date });
  res.json(result);
});

app.listen(3000, () => console.log("Server started on Port 3001"));

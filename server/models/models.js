const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const mtNotesSchema = new Schema({
  date: {
    type: String,
    required: true,
    unique: true,
  },
  workoutPlan: {
    type: String,
  },
  workoutNotes: {
    type: String,
  },
  nutritionNotes: {
    type: String,
  },
});

const mtNotes = mongoose.model("mtNotes", mtNotesSchema);

module.exports = mtNotes;

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const dayLogSchema = new Schema({
  userName: String,
  content: [
    {
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
    },
  ],
});

const dayLog = mongoose.model("dayLog", dayLogSchema);
module.exports = dayLog;

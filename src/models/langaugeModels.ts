import mongoose from "mongoose";

const langaugeSchema = new mongoose.Schema({
  userId: {
    type: String,
    require: true,
  },
  langauge: {
    type: String,
    require: true,
  }
});

const Langauges =mongoose.models.Langauges || mongoose.model("Langauges",langaugeSchema);

export default Langauges;
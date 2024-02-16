import mongoose from "mongoose";

const postesSchema = new mongoose.Schema({
  userId: {
    type: String,
    require: true,
  },
  imgposty: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  }
});

const Postes = mongoose.models.Postes || mongoose.model("Postes",postesSchema);

export default Postes;
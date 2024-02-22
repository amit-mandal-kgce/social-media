import mongoose from "mongoose";

const networkConSchema = new mongoose.Schema({
  userId: {
    type: String,
    require: true,
  },
  connectId: {
    type: String,
    require: true,
  }
});

const Connects =mongoose.models.Connects || mongoose.model("Connects",networkConSchema);

export default Connects;
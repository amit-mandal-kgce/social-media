import mongoose from "mongoose";

const connectionSchema = new mongoose.Schema({
  userId: {
    type: String,
    require: true,
  }
});
const Connections =mongoose.models.Connections || mongoose.model("Connections",connectionSchema);

export default Connections;
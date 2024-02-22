import mongoose from "mongoose";

const networkRequestSchema = new mongoose.Schema({
  userId: {
    type: String,
    require: true,
  },
  connectId: {
    type: String,
    require: true,
  }
});

const Requests =mongoose.models.Requests || mongoose.model("Requests",networkRequestSchema);

export default Requests;
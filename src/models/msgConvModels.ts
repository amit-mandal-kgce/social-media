import mongoose from "mongoose";

const msgConvSchema = new mongoose.Schema({
  userId: {
    type: String,
    require: true,
  },
  connectId: {
    type: String,
    require: true,
  },
  textmsg: {
    type: String,
    require: true,
  },
});

const TextMessages =mongoose.models.TextMessages || mongoose.model("TextMessages",msgConvSchema);

export default TextMessages;
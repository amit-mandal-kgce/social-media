import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  id: {
    type: String,
    require: true,
  },
  userId: {
    type: String,
    require: true,
  },
  comment: {
    type: String,
    require: true,
  }
});
const Comment =mongoose.models.Comment || mongoose.model("Comment",commentSchema);

export default Comment;
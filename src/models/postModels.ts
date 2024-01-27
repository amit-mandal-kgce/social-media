import mongoose from "mongoose";

const postsSchema = new mongoose.Schema({
  userId: {
    type: String,
    require: true,
  },
  describe: {
    type: String,
    require: true,
    unique: true,
  },
  postImage: {
    type: String,
    require: true,
  },
});

const Posts =mongoose.models.Posts || mongoose.model("Posts",postsSchema);

export default Posts;
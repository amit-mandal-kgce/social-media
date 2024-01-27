import mongoose from "mongoose";

const profilbackImgSchema = new mongoose.Schema({
  userId: {
    type: String,
    require: true,
  },
  backImage: {
    type: String,
    require: true,
  },
});

const BackImgs =mongoose.models.BackImgs || mongoose.model("BackImgs", profilbackImgSchema);

export default BackImgs;
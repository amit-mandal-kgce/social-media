import mongoose from "mongoose";

const profilImgSchema = new mongoose.Schema({
  userId: {
    type: String,
    require: true,
  },
  profilImg: {
    type: String,
    require: true,
  },
});

const ProfileImgs =mongoose.models.ProfileImgs || mongoose.model("ProfileImgs", profilImgSchema);

export default ProfileImgs;
import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
  userId: {
    type: String,
    require: true,
  },
  heading: {
    type: String,
    require: true,
  },
  industry: {
    type: String,
    require: true,
  },
  education: {
    type: String,
    require: true,
  },
  region: {
    type: String,
    require: true,
  },
  city: {
    type: String,
    require: true,
  },
  phone: {
    type: String,
    require: true,
  },
  address: {
    type: String,
    require: true,
  },
});

const Profiles =mongoose.models.Profiles || mongoose.model("Profiles",profileSchema);

export default Profiles;
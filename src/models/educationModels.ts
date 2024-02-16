import mongoose from "mongoose";

const educationSchema = new mongoose.Schema({
  userId: {
    type: String,
    require: true,
  },
  school: {
    type: String,
    require: true,
  },
  univercity: {
    type: String,
    require: true,
  },
  degree: {
    type: String,
    require: true,
  },
  fieldstudy: {
    type: String,
    require: true,
  },
  startdate: {
    type: String,
    require: true,
  },
  enddate: {
    type: String,
    require: true,
  },
});
const Educations =mongoose.models.Educations || mongoose.model("Educations",educationSchema);

export default Educations;
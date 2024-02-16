import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  userId: {
    type: String,
    require: true,
  },
  projeName: {
    type: String,
    require: true,
  },
  monthyear: {
    type: String,
    require: true,
  },
  linkes: {
    type: String,
    require: true,
  },
  techonogy: {
    type: String,
    require: true,
  },
});
const Projects =mongoose.models.Projects || mongoose.model("Projects",projectSchema);

export default Projects;
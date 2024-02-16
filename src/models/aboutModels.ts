import mongoose from "mongoose";

const aboutSchema = new mongoose.Schema({
  userId: {
    type: String,
    require: true,
  },
  about: {
    type: String,
    require: true,
  }
});
const Abouts =mongoose.models.Abouts || mongoose.model("Abouts",aboutSchema);

export default Abouts;
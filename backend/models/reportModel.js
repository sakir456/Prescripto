import mongoose from "mongoose";

const reportSchema = new mongoose.Schema({
  summary: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  userEmail: {
    type: String,
    required: true,
  },
  image:{
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
});

const reportModel = mongoose.models.report || mongoose.model("report", reportSchema);

export default reportModel;

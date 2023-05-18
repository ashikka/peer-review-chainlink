import mongoose from "mongoose";

const Schema = mongoose.Schema;

const Paper = new Schema({
  title: String,
  abstract: String,
  category: String,
  address: String,
  ipfsHash: String,
  user: String,
  status: String,
  date: Number,
});

const PaperModel = mongoose.model("Paper", Paper);

export default PaperModel;

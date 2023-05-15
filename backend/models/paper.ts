import mongoose from "mongoose";

const Schema = mongoose.Schema;

const Paper = new Schema({
  title: String,
  abstract: String,
  category: String,
  address: String,
  ipfsHash: String,
  user: String,
});

const PaperModel = mongoose.model("Paper", Paper);

export default PaperModel;

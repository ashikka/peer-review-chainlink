import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./models/connection";
import routes from "./routes";
import { Blockchain } from "./utils/ethers";
import { getScholarDetails } from "./utils/scholar";

async function main() {
  dotenv.config();

  await connectDB();
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.use(routes);

  app.get("/", (req, res) => {
    res.send("OK");
  });

  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
}

main();

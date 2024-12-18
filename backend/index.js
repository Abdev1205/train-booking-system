// server.mjs
import express from "express";
import cors from "cors";
import apiRoutes from "./routes/index.js"
import initializeSeats from "./utils/initializeSeats.js";
import connectDb from "./db/connect.js"
import 'dotenv/config'

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', apiRoutes)


const databaseConnection = async () => {
  try {
    await connectDb(process.env.MONGO_URL);
    app.get("/", (req, res) => {
      res.send("Hi Welcome Spyne Backend")
    })
  } catch (error) {
    console.log(error);
  }
}
databaseConnection();

initializeSeats();


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

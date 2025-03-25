import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/database.js";
import task from "./controllers/task.js";
import cors from "cors";
const app = express();
dotenv.config();
connectDB();
app.use(express.json());

// app.use(
//   cors({
//     origin: "https://algo-root-frontend.vercel.app/",
//     credentials: true,
//   })
// );

const corsOptions = {
  origin: "https://algo-root-frontend.vercel.app", // Update this to match your frontend's origin
  credentials: true, // This allows cookies to be sent with requests
};

app.use(cors(corsOptions));

const PORT = process.env.PORT || 3000;

app.use("/api/v1/tasks", task);

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});

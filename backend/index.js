import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import chatbotRoutes from "./routes/chatbotRoute.js";
import cors from "cors";

const app = express();
dotenv.config({});

// cors use karna frontend tak le jane ke liye
/* ✅ YAHAN CORS LAGANA HAI */
app.use(
  cors({
    origin: [
      "http://localhost:5173",       // local dev
      "https://chatspoof.vercel.app" // Vercel frontend URL
    ],
    methods: ["GET", "POST"],
    credentials: true
  })
);
// middleware ko use karenge
app.use(express.json());

// Home Route hai
app.get("/", (req, res) => {
  res.json({ message: "This is home route....! " });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`This is port are runing on = ${port}`));

// MongoDB ko connect karna hai pahle data ko save karne ke liye
mongoose
  .connect(process.env.MONGO_URI, {
    dbName: "Chatbot_responce",
  })
  .then(() => console.log("MongoDB is connected...!"))
  .catch((err) => console.log(err))

// Esme Sender post karega routing se
app.use("/bot/v1/", chatbotRoutes);

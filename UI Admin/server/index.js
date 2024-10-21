import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.js";
import { register } from "./controllers/auth.js";

const app = express();
dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5174");
  next();
});

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(
  cors({
    origin: "http://localhost:5174",
    credentials: true,
  })
);

app.use("/assets", express.static(path.join(__dirname, "public/assets")));

/* FILE STORAGE */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

/*ROUTES WITH FILES */
app.post("/auth/register", upload.single("picture"), register);

/* ROUTES */
app.use("/auth", authRoutes);
app.get("/api/feedbacks", async (req, res) => {
  try {
    const feedbackCollection = mongoose.connection.collection("goodfeedbacks");
    const feedbacks = await feedbackCollection.find({}).toArray();
    res.json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching feedbacks", error });
  }
});

app.get("/api/wrongfeedbacks", async (req, res) => {
  try {
    const feedbackCollection = mongoose.connection.collection("wrongfeedbacks");
    const feedbacks = await feedbackCollection.find({}).toArray();
    res.json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching feedbacks", error });
  }
});

// GET /users - Fetch all users from MongoDB without Mongoose model
app.get("/users", async (req, res) => {
  try {
    const usersCollection = mongoose.connection.collection("users");
    const users = await usersCollection.find({}).toArray();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
});

// DELETE /users/:id - Delete user by ID without Mongoose model
app.delete("/users/:id", async (req, res) => {
  try {
    const usersCollection = mongoose.connection.collection("users");
    const { id } = req.params;
    await usersCollection.deleteOne({ _id: new mongoose.Types.ObjectId(id) });
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error });
  }
});

app.get("/locations", async (req, res) => {
  try {
    const feedbackCollection = mongoose.connection.collection("users");
    const feedbacks = await feedbackCollection.find({}).toArray();
    res.json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching feedbacks", error });
  }
});
app.get("/api/users/promotion", async (req, res) => {
  try {
    const usersGroupedByCityAndPromo = await mongoose.connection
      .collection("users")
      .aggregate([
        {
          $group: {
            _id: {
              city: "$location",
              promotion: "$promotion", 
            },
            count: { $sum: 1 },
          },
        },
        {
          $group: {
            _id: "$_id.city", 
            users: { $sum: "$count" }, 
            promotions: { $push: { promotion: "$_id.promotion", count: "$count" } }, 
          },
        },
        {
          $project: {
            city: "$_id",
            users: 1,
            promotions: 1,
          },
        },
      ])
      .toArray();

    res.json(usersGroupedByCityAndPromo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching user data" });
  }
});


app.get("/api/users/cities", async (req, res) => {
  try {
    const usersGroupedByCity = await mongoose.connection
      .collection("users")
      .aggregate([
        {
          $group: {
            _id: "$location",
            count: { $sum: 1 },
          },
        },
        {
          $project: {
            city: "$_id",
            count: 1,
          },
        },
      ])
      .toArray();

    res.json(usersGroupedByCity);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching user data" });
  }
});



/* MONGOOSE SETUP */
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("connection successfull");
  } catch (error) {
    console.log("server connection is failed");
  }
};

const PORT = process.env.PORT || 3002;

// Listening to the requests
app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});

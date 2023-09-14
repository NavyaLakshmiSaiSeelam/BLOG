import express from "express";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import cookieParser from "cookie-parser";
import multer from "multer";
import cors from "cors";

const PORT = 8800;

const app = express();
app.use(cors());

app.use(express.json());
app.use(cookieParser());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads"); // Store files in the 'uploads' folder within your backend directory
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage });

app.post("/api/upload", upload.single("file"), function (req, res) {
  try {
    if (!req.file) {
      throw new Error("No file uploaded");
    }

    const file = req.file;

    // Move the uploaded file to the 'uploads' folder in the backend
    const targetPath = `uploads/${file.filename}`;
    // Assuming you're running the backend server from the root of your project

    res.status(200).json(file.filename);
  } catch (error) {
    console.error(error); // Log the error
    res.status(500).json({ error: "Internal Server Error" }); // Send an error response
  }
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

// Serve uploaded files from the client's 'public/upload' folder
// app.use("/api/upload", express.static("client/public/upload"));
app.use("/api/upload", express.static("uploads"));

app.listen(PORT, (error) => {
  if (error) {
    console.error("Error starting the server:", error);
  } else {
    console.log("Connected!");
  }
});

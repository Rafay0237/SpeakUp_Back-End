const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const cors = require("cors");
require("dotenv").config();
const app = express();
const PortfolioRoutes = require("./routes/portfolio");
const ArticleRoutes = require("./routes/article");

const corsOptions = {
  origin: 'https://illustrious-froyo-6855b5.netlify.app',
  methods: ['GET,POST,DELETE'],
  credentials: true, 
};

app.use(cors(corsOptions));

app.use(express.json());

const port = process.env.Port || 3000;
const host = process.env.Host || "0.0.0.0";
let MongodbConnectionURI = process.env.ConnectionURI;

async function dbConnection() {
  await mongoose.connect(MongodbConnectionURI);
  console.log("Connected To Database");
}
dbConnection().catch((err) => console.error(err));

app.listen(port, host, () => {
  console.log("Server Is Listening");
});

app.get("/", (req, res) => {
  res.status(200).send("Welcome to Speakup Back-End ");
});

const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const path = require("path");

cloudinary.config({
  cloud_name: "dgxcvannc",
  api_key: "316958841918178",
  api_secret: "KUnNI1sHQp9RMvAUJAei6mhn-Xk",
});
const storage = multer.memoryStorage();
const upload = multer({ storage });

app.use("/Portfolios", PortfolioRoutes);
app.use("/Articles", ArticleRoutes);
app.use("/upload", upload.single("file"), async (req, res) => {
  try {
    if (!req.file)
      return res.status(400).json({ message: "No File to Upload" });

    const tempFilePath = path.join(
      __dirname,
      "uploads/profiles",
      req.file.originalname
    );
    fs.writeFileSync(tempFilePath, req.file.buffer);

    const result = await cloudinary.uploader.upload(tempFilePath, {
      resource_type: "image",
      crossorigin: "anonymous"
    });
    !result && console.log("Cloudinary Image uploading Error !");
    fs.unlinkSync(tempFilePath);

    res.status(200).json({ url: result.secure_url });
  } catch (error) {
    res.status(500).json({ error:error.message});
  }
});

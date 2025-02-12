import express from "express";
import multer from "multer";
import { GridFsStorage } from "multer-gridfs-storage";
import { gfs } from "../index.js";
import something from './index.js';
import something from "./correct-file-name.js";  // Use the right file name


const router = express.Router();
const something = require('./index.js');


// Storage engine
const storage = new GridFsStorage({
  url: process.env.MONGO_URI,
  file: (req, file) => {
    return {
      filename: file.originalname,
      bucketName: "uploads",
    };
  },
});

const upload = multer({ storage });

// Upload file route
router.post("/upload", upload.single("file"), (req, res) => {
  res.json({ file: req.file });
});

// Get all uploaded files
router.get("/files", async (req, res) => {
  gfs.files.find().toArray((err, files) => {
    if (!files || files.length === 0) {
      return res.status(404).json({ msg: "No files found" });
    }
    res.json(files);
  });
});

// Download file
router.get("/files/:filename", async (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    if (!file || file.length === 0) {
      return res.status(404).json({ msg: "No file found" });
    }

    const readstream = gfs.createReadStream(file.filename);
    readstream.pipe(res);
  });
});

export default router;

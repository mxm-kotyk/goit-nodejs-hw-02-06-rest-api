import multer from "multer";
import path from "path";
import crypto from "crypto";

const destination = path.resolve("temp");

const storage = multer.diskStorage({
  destination,
  filename: (req, file, cb) => {
    const uniquePrefix = crypto.randomUUID();
    const filename = `${uniquePrefix}_${file.originalname}`;
    cb(null, filename);
  },
});

const limits = {
  fileSize: 5 * 1024 * 1024,
};

const fileFilter = (req, file, cb) => {
  if (file.originalname.split(".").pop() === "exe") {
    cb(new Error("File extension not allowed"));
  }
  cb(null, true);
};

const upload = multer({ storage, limits, fileFilter });

export default upload;

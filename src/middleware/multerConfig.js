const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Define the upload path
const uploadPath = path.join(__dirname, "..", "..", "uploads");

// Create the folder if it doesn't exist
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

// Configure storage to temporarily store files in /uploads before uploading to R2
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

// Allowed file types (images and PDFs)
const fileFilter = (req, file, cb) => {
  const allowedImageTypes = [
    "image/jpeg",
    "image/png",
    "image/jpg",
    "image/gif",
    "image/webp",
  ];
  const allowedPdfTypes = ["application/pdf"];

  if (allowedImageTypes.includes(file.mimetype)) {
    req.uploadType = "image";
    cb(null, true);
  } else if (allowedPdfTypes.includes(file.mimetype)) {
    req.uploadType = "pdf";
    cb(null, true);
  } else {
    cb(
      new Error("Unsupported file type. Only images and PDFs are allowed."),
      false
    );
  }
};

// Single file upload
const singleUpload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
  },
}).single("file");

// Multiple files upload
const multiUpload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
  },
}).fields([
  { name: "photo", maxCount: 1 },
  { name: "citizenshipFront", maxCount: 1 },
  { name: "citizenshipBack", maxCount: 1 },
  { name: "registration", maxCount: 1 },
]);

module.exports = {
  singleUpload,
  multiUpload,
};

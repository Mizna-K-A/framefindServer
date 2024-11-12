// // middleware/multerMiddleware.js
// const multer = require('multer');
// const path = require('path');
// const fs = require('fs');

// // Ensure directories exist or create them
// const ensureUploadDirs = () => {
//     const directories = ['uploads/images', 'uploads/videos'];
//     directories.forEach(dir => {
//         if (!fs.existsSync(dir)) {
//             fs.mkdirSync(dir, { recursive: true });
//         }
//     });
// };

// // Run the directory check
// ensureUploadDirs();

// // Configure multer storage
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         const folder = file.fieldname === 'locationImg' ? 'uploads/images' : 'uploads/videos';
//         cb(null, folder);
//     },
//     filename: (req, file, cb) => {
//         cb(null, `${Date.now()}-${file.originalname}`);
//     }
// });

// // File type validation
// const fileFilter = (req, file, cb) => {
//     const allowedImageTypes = ['image/jpeg', 'image/jpg', 'image/png'];
//     const allowedVideoTypes = ['video/mp4'];

//     if (file.fieldname === 'locationImg' && allowedImageTypes.includes(file.mimetype)) {
//         cb(null, true);
//     } else if (file.fieldname === 'locationVideo' && allowedVideoTypes.includes(file.mimetype)) {
//         cb(null, true);
//     } else {
//         cb(new Error('Invalid file type. Only JPEG, JPG, PNG for images and MP4 for videos are allowed!'), false);
//     }
// };

// // Set up multer with storage, limits, and filtering
// const multerMiddleware = multer({
//     storage,
//     limits: {
//         fileSize: 1024 * 1024 * 1024 // Set file size limit to 10 MB
//     },
//     fileFilter
// });

// module.exports = multerMiddleware;

const multer = require('multer');
const path = require('path');

// Define storage configuration for multer
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, './uploads');
  },
  filename: (req, file, callback) => {
    const prefix = file.mimetype.startsWith('image/') ? 'image' : 'video';
    const uniqueSuffix = `${Date.now()}-${file.originalname}`;
    callback(null, `${prefix}-${uniqueSuffix}`);
  }
});

// Multer middleware to handle both image and video uploads
const multerMiddleware = multer({
  storage,
  fileFilter: (req, file, callback) => {
    // Check file type (image or video)
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'video/mp4'];
    if (allowedTypes.includes(file.mimetype)) {
      callback(null, true);
    } else {
      callback(new Error('Only JPEG, JPG, PNG images and MP4 videos are allowed!'), false);
    }
  },
  limits: {
    fileSize: 1024 * 1024 * 1024, // 1GB limit for video files
  },
});

module.exports = multerMiddleware;


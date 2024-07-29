import multer from "multer";
import path from 'path';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const originalname = path.parse(file.originalname).name;
      const ext = path.parse(file.originalname).ext;
      cb(null, originalname + '-' + uniqueSuffix + ext);
    }
  })
  
 export const upload = multer({ storage: storage })

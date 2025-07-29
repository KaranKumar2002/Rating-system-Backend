import path from 'path';
import multer from 'multer';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const tempPath = process.env.NODE_ENV === 'production'
      ? '/tmp' // Render's writable directory
      : path.join(process.cwd(), 'public', 'temp');
    cb(null, tempPath);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix);
  }
});
const upload = multer({ storage: storage });
export default upload;

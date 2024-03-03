import multer from 'multer';
import { getSlugFromTitle } from '../utils/slug.js';

const storage = multer.diskStorage({
  destination: 'public/images',
  filename(req, file, cb) {
    cb(null, `${getSlugFromTitle(req.body.title)}.${file.originalname.split('.').pop()}`);
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5000000, // 5MB
    files: 1
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/) || file.size > 5000000) {
      return cb(new Error('Please upload an image under 5mb with a .jpg, .jpeg, or .png extension.'));
    }
    cb(null, true);
  }
});

export default upload;
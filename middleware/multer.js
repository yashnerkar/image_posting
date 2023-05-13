import multer from 'multer';

const storage = multer.diskStorage({
  destination: './public/uploads/', // Specify the directory where the uploaded files will be stored
  filename: (req, file, callback) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`; // Generate a unique filename
    callback(null, `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`);
  },
});

const upload = multer({ storage });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default upload.single('image');

import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import multer from 'multer';
import { Request, RequestHandler } from 'express';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

interface CloudinaryStorageOptions {
  cloudinary: any; // Adjust the type as needed for the cloudinary object
  params: {
    resource_type: string;
    allowed_formats: string[];
    public_id: (req: Request, file: Express.Multer.File) => string;
  };
}

// Cloudinary configuration
const { CLOUDINARY_HOST, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } =
  process.env;
cloudinary.config({
  cloud_name: CLOUDINARY_HOST,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

// Multer configuration
const storageOptions: CloudinaryStorageOptions = {
  cloudinary: cloudinary,
  params: {
    resource_type: 'auto',
    allowed_formats: ['jpg', 'jpeg', 'png', 'pdf'],
    public_id: (req: Request, file: Express.Multer.File): string => {
      const fileName = file.originalname.split('.').slice(0, -1).join('.');
      return fileName;
    },
  },
};

const storage = new CloudinaryStorage(storageOptions);
export const uploadLogo: RequestHandler = multer({ storage: storage }).single(
  'logo'
);
const upload: RequestHandler = multer({ storage: storage }).single('resume');

export default upload;

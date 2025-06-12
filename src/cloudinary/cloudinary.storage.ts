import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { cloudinary } from './cloudinary.config';

export const cloudinaryStorage = new CloudinaryStorage({
  cloudinary,
  params: (_req, file: Express.Multer.File) => ({
    folder: 'clinical-attachments',
    allowed_formats: ['jpg', 'png', 'pdf', 'docx'],
    public_id: `${Date.now()}-${file.originalname}`,
  }),
});

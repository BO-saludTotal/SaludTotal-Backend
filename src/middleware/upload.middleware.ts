import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Configuración de almacenamiento para Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(process.cwd(), 'uploads', 'verificaciones');
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const extension = path.extname(file.originalname);
    cb(null, `verificacion-${file.fieldname}-${uniqueSuffix}${extension}`);
  }
});

// Filtro de archivos
const fileFilter = (req: Express.Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const allowedMimes = ['image/jpeg', 'image/png', 'application/pdf'];
  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    const err = new Error('Tipo de archivo no permitido. Solo se aceptan imágenes (JPEG, PNG) y PDF.') as any;
    err.status = 400; // Puedes añadir un status para manejarlo mejor luego
    cb(err, false);
  }
};

// Configuración de Multer
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5 // Límite de tamaño del archivo (ej: 5MB)
  },
  fileFilter: fileFilter
});

export default upload;
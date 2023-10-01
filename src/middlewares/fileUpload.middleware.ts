import { NextFunction, Request, Response } from 'express';
import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const fileExt = path.extname(file.originalname)
        cb(null, `${uniqueSuffix}${fileExt}`)
    }
})

const fileFilter = (req: Request, file: Express.Multer.File, cb: CallableFunction) => {
    console.log(file.mimetype);

    if (file.mimetype !== "image/png" && file.mimetype !== "image/jpg" && file.mimetype !== "image/jpeg") {
        return cb(null, false, new Error('Only .png or .jpg or .jpeg is allowed'));
    }
    cb(null, true);
}

export const uploader = multer({ storage: storage, fileFilter: fileFilter }).single('logo')

export const fileUpload = function (req: Request, response: Response, next: NextFunction) {
    uploader(req, response, function (err) {
        if (err instanceof multer.MulterError) {
            return response.status(500).json({ error: err.message, code: 500, success: false, message: 'File upload error' })
        } else if (err) {
            return response.status(500).json({ error: err.message, code: 500, success: false, message: 'Server error' })
        }

        next()
    })
}
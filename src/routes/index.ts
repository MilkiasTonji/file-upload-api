
import express, {} from 'express'
import { getAllUploadedFiles, uploadFile } from '../controllers/fileController';
import multer from 'multer';
import path from 'path';

const app = express.Router()

var storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, './uploads')
    },
    filename: (req, file, callBack) => {
        callBack(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})


const upload = multer({ storage: storage })


app.get('/files', getAllUploadedFiles)
app.post('/file', upload.single('file') ,uploadFile)


export default app;
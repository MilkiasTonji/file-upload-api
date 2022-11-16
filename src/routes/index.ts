
import express, {} from 'express'
import { deletedFile, getAllUploadedFiles, updateFile, uploadFile } from '../controllers/fileController';
import multer from 'multer';
import path from 'path';

const app = express.Router()

var storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, './uploads')
    },
    filename: (req, file, callBack) => {
        // console.log(file)
        callBack(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})


const upload = multer({ storage: storage })


app.get('/files', getAllUploadedFiles)
app.post('/file', upload.single('file') ,uploadFile)
app.put('/file/:id', upload.single('file') ,updateFile)
app.delete('/file/:id', deletedFile)



export default app;
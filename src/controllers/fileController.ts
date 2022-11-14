
import { createFile, getAllFiles, getFileById } from "../services/file.service";

import { Request, Response } from "express";


export const uploadFile = (req: Request, res: Response) => {
    const file: any = req.file
    if (!file) {
        return res.status(500).send({success: false, message: 'No file provided'})
    }
    const filename = req.file?.filename
    const fileSize = req.file?.size
    var imgUrl = 'http://127.0.0.1:3000/uploads/' + filename;

    uploadFileHandler({filename, fileSize, imgUrl}).then((file) => {
        res.status(200).send(file)
    }).catch(error => res.status(500).send(error))
}

export const getAllUploadedFiles = (req: Request, res: Response) => {
    const pageIndex: any = req.query.page || 1
    const pageSize: any = req.query.pageSize || 100

    getFileHandler(pageIndex, pageSize).then((files) => {
      res.status(200).send(files)
    }).catch(error => res.status(500).send(error))
  }



// async operations 

const uploadFileHandler =async (body:any) => {
    const file = await createFile(body)
    return {success: true, file}
}


const getFileHandler = async (pageIndex = 1, pageSize: any) => {
    const files =  await getAllFiles(pageIndex, pageSize)
    if(files){
        return {success: true, files}
    }
    return {success: false, message: "Server could not process your request."}
}


import { createFile, getAllFiles, getFileById } from "../services/file.service";
import { Request, Response } from "express";
import fs from 'fs'
import path from "path";

export const uploadFile = (req: Request, res: Response) => {
  const file: any = req.file;
  if (!file) {
    return res
      .status(500)
      .send({ success: false, message: "No file provided" });
  }
  const fileName = req.file?.filename;
  const fileSize = req.file?.size;
  var imgUrl = "http://127.0.0.1:5000/uploads/" + fileName;

  uploadFileHandler({ fileName, fileSize, imgUrl })
    .then((file) => {
      res.status(200).send(file);
    })
    .catch((error) => res.status(500).send(error));
};

export const getAllUploadedFiles = (req: Request, res: Response) => {
  const pageIndex: any = req.query.page || 1;
  const pageSize: any = req.query.pageSize || 100;

  getFileHandler(pageIndex, pageSize)
    .then((files) => {
      res.status(200).send(files);
    })
    .catch((error) => res.status(500).send(error));
};


export const updateFile = (req: Request, res: Response) => {
   const {id} = req.params
   const file: any = req.file;
   if (!file) {
     return res
       .status(500)
       .send({ success: false, message: "No file provided" });
   }
   const fileName = req.file?.filename;
   const fileSize = req.file?.size;
   var imgUrl = "http://127.0.0.1:5000/uploads/" + fileName;

 
    updateHandler(id, {fileName, fileSize, imgUrl})
      .then((file) => {
        res.status(200).send(file);
      })
      .catch((error) => res.status(500).send(error));
  };


  export const deletedFile = (req: Request, res: Response) => {
    const {id} = req.params
     deleteHandler(id)
       .then((file) => {
         res.status(200).send(file);
       })
       .catch((error) => res.status(500).send(error));
   };
 
   

// async operations

const uploadFileHandler = async (body: any) => {
  const file = await createFile(body);
  return { success: true, file };
};

const getFileHandler = async (pageIndex = 1, pageSize: any) => {
  const files = await getAllFiles(pageIndex, pageSize);
  if (files) {
    return { success: true, files };
  }
  return { success: false, message: "Server could not process your request." };
};

const updateHandler = async (id: any, body: any) => {
  const file:any = await getFileById(id);
  const dirname = path.resolve()
  if (file) {
    const _path = dirname + `/uploads/${file.fileName}`
    fs.unlinkSync(_path)
    const updt = await file.update(body);
    if (updt) {
      return { success: true, file };
    } else {
      return { success: false, message: "Could not update a file" };
    }
  } else {
    return { success: false, message: "No file found" };
  }
};

const deleteHandler = async (id: any) => {
  const file: any = await getFileById(id);
  const dirname = path.resolve()
  if (file) {
    const _path = dirname + `/uploads/${file.fileName}`
      fs.unlinkSync(_path)
    await file.destroy();
    return { success: true, message: "File deleted successfully!" };
  } else {
    return { success: false, message: "No file found" };
  }
};

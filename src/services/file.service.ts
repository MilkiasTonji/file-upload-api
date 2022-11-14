
import {UploadFile} from '../models/File'

type fileType = {
    fileName: string,
    fileSize: string,
    imgUrl: string
}

export const getAllFiles = (offset: any, limit: any) => {
    return UploadFile.findAndCountAll({offset, limit, order: ['createdAt', 'desc']})
}

export const createFile = (file: fileType) => {
    return UploadFile.create(file)
}

export const getFileById = (id: any) => {
    return UploadFile.findByPk(id)
}

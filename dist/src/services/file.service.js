"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFileById = exports.createFile = exports.getAllFiles = void 0;
const File_1 = require("../models/File");
const getAllFiles = (offset, limit) => {
    return File_1.UploadFile.findAndCountAll({ offset, limit, order: ['createdAt', 'desc'] });
};
exports.getAllFiles = getAllFiles;
const createFile = (file) => {
    return File_1.UploadFile.create(file);
};
exports.createFile = createFile;
const getFileById = (id) => {
    return File_1.UploadFile.findByPk(id);
};
exports.getFileById = getFileById;

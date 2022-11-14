"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUploadedFiles = exports.uploadFile = void 0;
const file_service_1 = require("../services/file.service");
const uploadFile = (req, res) => {
    var _a, _b;
    const file = req.file;
    if (!file) {
        return res.status(500).send({ success: false, message: 'No file provided' });
    }
    const filename = (_a = req.file) === null || _a === void 0 ? void 0 : _a.filename;
    const fileSize = (_b = req.file) === null || _b === void 0 ? void 0 : _b.size;
    var imgUrl = 'http://127.0.0.1:3000/uploads/' + filename;
    uploadFileHandler({ filename, fileSize, imgUrl }).then((file) => {
        res.status(200).send(file);
    }).catch(error => res.status(500).send(error));
};
exports.uploadFile = uploadFile;
const getAllUploadedFiles = (req, res) => {
    const pageIndex = req.query.page || 1;
    const pageSize = req.query.pageSize || 100;
    getFileHandler(pageIndex, pageSize).then((files) => {
        res.status(200).send(files);
    }).catch(error => res.status(500).send(error));
};
exports.getAllUploadedFiles = getAllUploadedFiles;
// async operations 
const uploadFileHandler = (body) => __awaiter(void 0, void 0, void 0, function* () {
    const file = yield (0, file_service_1.createFile)(body);
    return { success: true, file };
});
const getFileHandler = (pageIndex = 1, pageSize) => __awaiter(void 0, void 0, void 0, function* () {
    const files = yield (0, file_service_1.getAllFiles)(pageIndex, pageSize);
    if (files) {
        return { success: true, files };
    }
    return { success: false, message: "Server could not process your request." };
});

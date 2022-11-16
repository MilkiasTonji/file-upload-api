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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletedFile = exports.updateFile = exports.getAllUploadedFiles = exports.uploadFile = void 0;
const file_service_1 = require("../services/file.service");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const uploadFile = (req, res) => {
    var _a, _b;
    const file = req.file;
    if (!file) {
        return res
            .status(500)
            .send({ success: false, message: "No file provided" });
    }
    const fileName = (_a = req.file) === null || _a === void 0 ? void 0 : _a.filename;
    const fileSize = (_b = req.file) === null || _b === void 0 ? void 0 : _b.size;
    var imgUrl = "http://127.0.0.1:5000/uploads/" + fileName;
    uploadFileHandler({ fileName, fileSize, imgUrl })
        .then((file) => {
        res.status(200).send(file);
    })
        .catch((error) => res.status(500).send(error));
};
exports.uploadFile = uploadFile;
const getAllUploadedFiles = (req, res) => {
    const pageIndex = req.query.page || 1;
    const pageSize = req.query.pageSize || 100;
    getFileHandler(pageIndex, pageSize)
        .then((files) => {
        res.status(200).send(files);
    })
        .catch((error) => res.status(500).send(error));
};
exports.getAllUploadedFiles = getAllUploadedFiles;
const updateFile = (req, res) => {
    var _a, _b;
    const { id } = req.params;
    const file = req.file;
    if (!file) {
        return res
            .status(500)
            .send({ success: false, message: "No file provided" });
    }
    const fileName = (_a = req.file) === null || _a === void 0 ? void 0 : _a.filename;
    const fileSize = (_b = req.file) === null || _b === void 0 ? void 0 : _b.size;
    var imgUrl = "http://127.0.0.1:5000/uploads/" + fileName;
    updateHandler(id, { fileName, fileSize, imgUrl })
        .then((file) => {
        res.status(200).send(file);
    })
        .catch((error) => res.status(500).send(error));
};
exports.updateFile = updateFile;
const deletedFile = (req, res) => {
    const { id } = req.params;
    deleteHandler(id)
        .then((file) => {
        res.status(200).send(file);
    })
        .catch((error) => res.status(500).send(error));
};
exports.deletedFile = deletedFile;
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
const updateHandler = (id, body) => __awaiter(void 0, void 0, void 0, function* () {
    const file = yield (0, file_service_1.getFileById)(id);
    const dirname = path_1.default.resolve();
    if (file) {
        const _path = dirname + `/uploads/${file.fileName}`;
        fs_1.default.unlinkSync(_path);
        const updt = yield file.update(body);
        if (updt) {
            return { success: true, file };
        }
        else {
            return { success: false, message: "Could not update a file" };
        }
    }
    else {
        return { success: false, message: "No file found" };
    }
});
const deleteHandler = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const file = yield (0, file_service_1.getFileById)(id);
    const dirname = path_1.default.resolve();
    if (file) {
        const _path = dirname + `/uploads/${file.fileName}`;
        fs_1.default.unlinkSync(_path);
        yield file.destroy();
        return { success: true, message: "File deleted successfully!" };
    }
    else {
        return { success: false, message: "No file found" };
    }
});

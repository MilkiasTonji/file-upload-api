"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fileController_1 = require("../controllers/fileController");
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const app = express_1.default.Router();
var storage = multer_1.default.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, './uploads');
    },
    filename: (req, file, callBack) => {
        callBack(null, file.fieldname + '-' + Date.now() + path_1.default.extname(file.originalname));
    }
});
const upload = (0, multer_1.default)({ storage: storage });
app.get('/files', fileController_1.getAllUploadedFiles);
app.post('/file', upload.single('file'), fileController_1.uploadFile);
exports.default = app;

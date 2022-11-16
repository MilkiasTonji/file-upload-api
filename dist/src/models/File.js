"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadFile = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../database/connection"));
exports.UploadFile = connection_1.default.define('File', {
    id: {
        primaryKey: true,
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.UUIDV4
    },
    fileName: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false
    },
    fileSize: {
        type: sequelize_1.DataTypes.STRING(455),
        allowNull: false
    },
    imgUrl: {
        type: sequelize_1.DataTypes.STRING(455),
        allowNull: false
    }
});
// UploadFile.sync({alter: true})

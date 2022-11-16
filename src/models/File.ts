
import { DataTypes } from "sequelize"
import db from '../database/connection'


export const UploadFile = db.define('File', {
    id: {
        primaryKey: true,
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4
    },
    fileName: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    fileSize: {
        type: DataTypes.STRING(455),
        allowNull: false
    },
    imgUrl: {
        type: DataTypes.STRING(455),
        allowNull: false
    }
})


// UploadFile.sync({alter: true})
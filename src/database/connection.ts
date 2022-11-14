import * as dotenv from 'dotenv'
dotenv.config()

import {Sequelize} from 'sequelize'


const db_name: any = process.env.DB_NAME
const db_username: any = process.env.DB_USERNAME
const db_password = process.env.DB_PASSWORD

const sequelize = new Sequelize(db_name, db_username, db_password, {
    host: 'localhost',
    dialect: 'mysql',
    logging: false
})

export default sequelize;
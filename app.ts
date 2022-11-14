
import express, {Express} from 'express'
import routes from './src/routes/index'
import sequelize from './src/database/connection'


const app: Express = express()

const PORT = process.env.PORT || 3000

const testConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('connection established.')
        // console.log(chalk.rgb(249, 50, 44).bold(`DB`) + " "+ chalk.green('connection established.'))
    } catch (error) {
        console.log(`unable to connect to database ${error}`)
        // console.log(chalk.red(`unable to connect to database ${error}`))
    }
}


// call a function
testConnection()

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.use(express.static("./uploads"))



app.use('/api', routes)


app.listen(PORT, ()=> {
    console.log(`app running at port ${PORT}`)
})
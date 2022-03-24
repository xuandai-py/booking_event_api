import express from 'express'
import bodyParser from 'body-parser'
import viewEngine from './config/viewEngine'
import initWebRoutes from './routes/web'
import dotenv from 'dotenv'
import cors from 'cors'



let app = express()
let PORT = process.env.PORT || 9998
dotenv.config()
const corsOptions = {
    origin: 'http://localhost:3001',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200
}
app.use(cors(corsOptions));

//app.use(bodyParser.json())
//app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json({ limit: '16mb' }))
app.use(bodyParser.urlencoded({ limit: '16mb', extended: true }))

viewEngine(app)
initWebRoutes(app)

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
})


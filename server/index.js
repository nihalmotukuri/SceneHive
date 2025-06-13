import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import mongoose from 'mongoose'
import MoviesRoutes from './routes/movie.route.js'

dotenv.config()
const app = express()

app.use(cors())
app.use(express.json())

app.use('/api', MoviesRoutes)

app.get('/', (req, res) => {
    res.json({ "msg": "Hey there!" })
})

mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {
        console.log("Connect to database")
        app.listen(process.env.PORT, () => {
            console.log(`Server is running at ${process.env.PORT}`)
        })
    })
    .catch(err => console.error(err))
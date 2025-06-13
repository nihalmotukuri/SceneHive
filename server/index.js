import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import mongoose from 'mongoose'
import MoviesRoutes from './routes/movie.route.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

app.use('/api', MoviesRoutes)

app.get('/', (req, res) => {
    res.json({ "msg": "Hey there!" })
})

mongoose
    .connect("mongodb+srv://nihalmotukuri:UnekkWki65Zb0glh@scenehive-api.wou5okp.mongodb.net/?retryWrites=true&w=majority&appName=scenehive-api")
    .then(() => {
        console.log("Connect to database")
        app.listen(process.env.PORT, () => {
            console.log(`Server is running at ${PORT}`)
        })
    })
    .catch(err => console.error(err))


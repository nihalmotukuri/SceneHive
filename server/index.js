import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import User from './models/user.model.js'
import Favorites from './models/favorites.model.js'

dotenv.config()
const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.json({ "msg": "Hey there!" })
})

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization

    if (!authHeader.startsWith('Bearer ')) {
        return res.status(403).json({ message: "Access denied: No token provided" })
    }

    const token = authHeader.split(' ')[1]

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        next()
    } catch (err) {
        return res.status(401).json({ message: "Invalid or expired token" })
    }
}

app.post('/signup', async (req, res) => {
    const { name, email, password } = req.body

    try {
        const existingUser = await User.findOne({ email })
        if (existingUser) return res.status(400).json({ errMessage: "User already exists" })

        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = await User.create({ name, email, password: hashedPassword })

        await Favorites.create({ userId: newUser._id, favorites: [] })

        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '7d' })

        res.status(201).json({
            message: "User created!",
            token,
            newUser: {
                id: newUser._id,
                email: newUser.email
            }
        })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

app.post('/login', async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await User.findOne({ email })
        if (!user) return res.status(400).json({ errMessage: "User not found" })

        const correctPass = await bcrypt.compare(password, user.password)
        if (!correctPass) return res.status(401).json({ errMessage: "Invalid credentials" })

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' })

        res.status(200).json({
            message: "Login successful!",
            token,
            user: {
                id: user._id,
                email: user.email
            }
        })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

app.get('/favorites', verifyToken, async (req, res) => {
    const userId = req.user.id 
    
    try {
        const favoritesList = await Favorites.findOne({ userId })
        const favorites = favoritesList.favorites 
        res.status(200).json(favorites)
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})

app.post('/favorites', verifyToken, async (req, res) => {
    const userId = req.user.id
    const movie = req.body

    try {
        const favoritesList = await Favorites.findOne({ userId })

        if (!favoritesList) {
            return res.status(404).json({ message: 'Favorites not found for user' })
        }

        const alreadyExists = favoritesList.favorites.some(fav => fav.id === movie.id)

        if (!alreadyExists) {
            favoritesList.favorites.push(movie)
            await favoritesList.save()
        }

        res.status(200).json({ favoritesList })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})


app.get('/dashboard', verifyToken, (req, res) => {
    res.json({
        message: "Welcome to your dashboard!",
        userId: req.user.id
    })
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
import express from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import User from '../models/user.model.js'
import Favorites from '../models/favorites.model.js'
import { verifyToken } from '../middlewares/movie.middleware.js'

const router = express.Router()

router.post('/signup', async (req, res) => {
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

router.post('/login', async (req, res) => {
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

router.get('/favorites', verifyToken, async (req, res) => {
    const userId = req.user.id

    try {
        const favoritesList = await Favorites.findOne({ userId })
        res.status(200).json(favoritesList)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

router.post('/favorites', verifyToken, async (req, res) => {
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

        res.status(200).json(favoritesList)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

router.delete('/favorites', verifyToken, async (req, res) => {
    const userId = req.user.id
    const movieId = req.body.id

    try {
        const updatedFavorites = await Favorites.findOneAndUpdate(
            { userId },
            { $pull: { favorites: { id: movieId } } },
            { new: true }
        )

        if (!updatedFavorites) {
            return res.status(404).json({ message: 'Favorites not found for user' })
        }

        res.status(200).json(updatedFavorites)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

export default router
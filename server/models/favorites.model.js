import mongoose from 'mongoose'

const favoritesSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    favorites: [
        {
            id: {
                type: Number,
                required: true,
            },
            title: {
                type: String,
                required: true,
            },
            overview: {
                type: String,
            },
            poster_path: {
                type: String,
            },
            backdrop_path: {
                type: String,
            },
            release_date: {
                type: String,
            },
            genres: [
                {
                    id: Number,
                    name: String,
                }
            ],
            vote_average: {
                type: Number,
            },
            trailerKey: {
                type: String
            }
        }
    ]
})

const Favorites = mongoose.model("Favorites", favoritesSchema)
export default Favorites 
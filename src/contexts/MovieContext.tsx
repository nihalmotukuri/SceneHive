import { createContext, useContext, useEffect, useState } from 'react'
import type { Movie, MovieContextType } from '../types'
import type { ReactNode } from 'react'

const MovieContext = createContext<MovieContextType | undefined>(undefined)

export const useMovieContext = () => useContext(MovieContext)

export const MovieContextProvider = ({ children }: { children: ReactNode }) => {
    const favJson = localStorage.getItem('favorite_movies')
    const localFav: Movie[] = favJson? JSON.parse(favJson) : []
    const [favorites, setFavorites] = useState<Movie[]>(localFav)

    const addToFavorites = (movie: Movie): void => {
        favorites.some(m => m.id === movie.id)
        ? setFavorites(prev => prev.filter(m => m.id !== movie.id))
        : setFavorites(prev => [...prev, movie])
    }

    useEffect(() => {
        localStorage.setItem('favorite_movies', JSON.stringify(favorites))
    }, [favorites])

    const isFavorite = (movieId: number) => favorites.some(m => m.id === movieId)

    const value: MovieContextType = {favorites, addToFavorites, isFavorite}

    return (
        <MovieContext.Provider value={ value }>
            {children}
        </MovieContext.Provider>
    )
}
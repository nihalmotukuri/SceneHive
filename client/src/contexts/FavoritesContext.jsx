import React from "react";

const FavoritesContext = React.createContext({
    favorites: [],
    setFavorites: () => {},
    favoritesLoading: false,
    addToFavorites: () => {},
    isFavorite: () => {},
    token: '',
    setToken: () => {}
})

export default FavoritesContext
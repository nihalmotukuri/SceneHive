import React from "react";

const FavoritesContext = React.createContext({
    favorites: [],
    favoritesLoading: false,
    addToFavorites: () => {},
    isFavorite: () => {},
})

export default FavoritesContext
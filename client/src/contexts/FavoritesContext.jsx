import React from "react";

const FavoritesContext = React.createContext({
    favorites: [],
    addToFavorites: () => {},
    isFavorites: () => {},
})

export default FavoritesContext
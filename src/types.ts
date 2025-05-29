export type Movie = {
    id: number;
    title: string;
    poster_path: string;
    trailerKey?: string | null;
}

export type Video = {
    key: string;
    site: string;
    type: string;
}

export type SearchResultsProps = {
    searchResults: Movie[];
    onSearch: boolean;
}

export type MovieCardProps = {
    movie: Movie;
}

export type Genre = {
    id: number;
    name: string;
    genrePoster?: string;
}

export type GenreCardProps = {
    genre: Genre;
}

export type MovieContextType = {
    favorites: Movie[];
    addToFavorites: (movie: Movie) => void;
    isFavorite: (movieId: number) => boolean;
}

export type SearchRecProps = {
    currentSearchResults: Movie[];
    isTyping: boolean;
    setSearchInput: (recommededSearchInput: string) => void;
    setIsRecHovered: (arg: boolean) => void;
}
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
}
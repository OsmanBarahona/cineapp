export interface Movie {
    id: number;
    title: string;
    year: number;
    director: string;
    genre: string;
    rating: number;
    duration: number;
    description: string;
    imageUrl: string;
    isFavorite: boolean;
    lastUpdated: Date;
}

export const GENRES = [
    "Acción",
    "Aventura",
    "Comedia",
    "Drama",
    "Ciencia Ficción",
    "Terror",
    "Romance",
    "Animación",
    "Documental"
];
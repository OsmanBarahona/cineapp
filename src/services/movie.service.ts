import { Injectable } from "@angular/core";
import { Movie, GENRES } from "../models/movie.model";

@Injectable({
    providedIn: "root"
})
export class MovieService {
    private movies: Movie[] = [
        {
            id: 1,
            title: "Inception",
            year: 2010,
            director: "Christopher Nolan",
            genre: "Ciencia Ficción",
            rating: 8.8,
            duration: 148,
            description: "Un ladrón que roba secretos corporativos mediante el uso de tecnología para compartir sueños.",
            imageUrl: "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
            isFavorite: true,
            lastUpdated: new Date()
        },
        {
            id: 2,
            title: "The Dark Knight",
            year: 2008,
            director: "Christopher Nolan",
            genre: "Acción",
            rating: 9.0,
            duration: 152,
            description: "Batman se enfrenta al Joker, un criminal sádico que quiere sumir a Gotham City en la anarquía.",
            imageUrl: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
            isFavorite: false,
            lastUpdated: new Date()
        },
        {
            id: 3,
            title: "Pulp Fiction",
            year: 1994,
            director: "Quentin Tarantino",
            genre: "Drama",
            rating: 8.9,
            duration: 154,
            description: "Las vidas de dos asesinos a sueldo, un boxeador y un par de bandidos se entrelazan.",
            imageUrl: "https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg",
            isFavorite: false,
            lastUpdated: new Date()
        },
        {
            id: 4,
            title: "Parasite",
            year: 2019,
            director: "Bong Joon Ho",
            genre: "Drama",
            rating: 8.6,
            duration: 132,
            description: "Una familia pobre se infiltra en el hogar de una familia rica empleándose como sirvientes.",
            imageUrl: "https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
            isFavorite: true,
            lastUpdated: new Date()
        },
        {
            id: 5,
            title: "The Shawshank Redemption",
            year: 1994,
            director: "Frank Darabont",
            genre: "Drama",
            rating: 9.3,
            duration: 142,
            description: "Dos hombres encarcelados establecen un vínculo a lo largo de varios años.",
            imageUrl: "https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
            isFavorite: false,
            lastUpdated: new Date()
        }
    ];

    getMovies(): Movie[] {
        return this.movies;
    }

    getMovieById(id: number): Movie | undefined {
        return this.movies.find(movie => movie.id === id);
    }

    searchMovies(query: string): Movie[] {
        if (!query) return this.movies;
        
        const lowerQuery = query.toLowerCase();
        return this.movies.filter(movie =>
            movie.title.toLowerCase().includes(lowerQuery) ||
            movie.director.toLowerCase().includes(lowerQuery) ||
            movie.genre.toLowerCase().includes(lowerQuery)
        );
    }

    addRandomMovie(): Movie {
        const randomId = Math.floor(Math.random() * 1000) + 100;
        const randomGenre = GENRES[Math.floor(Math.random() * GENRES.length)];
        const randomYear = 2000 + Math.floor(Math.random() * 24);
        
        const newMovie: Movie = {
            id: randomId,
            title: `Película Aleatoria ${randomId}`,
            year: randomYear,
            director: "Director Desconocido",
            genre: randomGenre,
            rating: parseFloat((Math.random() * 3 + 7).toFixed(1)),
            duration: 90 + Math.floor(Math.random() * 60),
            description: "Esta es una película agregada aleatoriamente mediante pull to refresh.",
            imageUrl: "https://via.placeholder.com/300x450/3D3D3D/FFFFFF?text=Película",
            isFavorite: false,
            lastUpdated: new Date()
        };

        this.movies.unshift(newMovie);
        return newMovie;
    }

    updateMovieGenre(movieId: number, newGenre: string): boolean {
        const movie = this.getMovieById(movieId);
        if (movie) {
            movie.genre = newGenre;
            movie.lastUpdated = new Date();
            return true;
        }
        return false;
    }

    toggleFavorite(movieId: number): boolean {
        const movie = this.getMovieById(movieId);
        if (movie) {
            movie.isFavorite = !movie.isFavorite;
            return true;
        }
        return false;
    }
}
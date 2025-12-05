import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "@nativescript/angular";
import { ActionDialogOptions, action, Toast } from "@nativescript/core";
import { MovieService } from "../../services/movie.service";
import { Movie, GENRES } from "../../models/movie.model";

@Component({
    selector: "ns-movie-list",
    templateUrl: "./movie-list.component.html",
    styleUrls: ["./movie-list.component.css"]
})
export class MovieListComponent implements OnInit {
    movies: Movie[] = [];
    selectedGenre: string = "Todas";
    isRefreshing: boolean = false;

    constructor(
        private movieService: MovieService,
        private routerExtensions: RouterExtensions
    ) {}

    ngOnInit(): void {
        this.loadMovies();
    }

    loadMovies(): void {
        this.movies = this.movieService.getMovies();
    }

    onMovieTap(event: any): void {
        const movie = event.item;
        this.routerExtensions.navigate(["/movie", movie.id]);
    }

    onRefresh(): void {
        this.isRefreshing = true;
        
        setTimeout(() => {
            const newMovie = this.movieService.addRandomMovie();
            this.loadMovies();
            this.isRefreshing = false;
            
            Toast.makeText(`¡${newMovie.title} agregada!`).show();
        }, 1500);
    }

    showCategoryDialog(): void {
        const options: ActionDialogOptions = {
            title: "Seleccionar Categoría",
            message: "Elige una categoría para filtrar:",
            cancelButtonText: "Cancelar",
            actions: ["Todas", ...GENRES]
        };

        action(options).then((result) => {
            if (result !== "Cancelar") {
                this.selectedGenre = result;
                this.filterByGenre(result);
                
                Toast.makeText(`Filtrado por: ${result}`).show();
            }
        });
    }

    filterByGenre(genre: string): void {
        if (genre === "Todas") {
            this.loadMovies();
            return;
        }
        
        const allMovies = this.movieService.getMovies();
        this.movies = allMovies.filter(movie => movie.genre === genre);
    }

    toggleFavorite(movie: Movie): void {
        this.movieService.toggleFavorite(movie.id);
        this.loadMovies();
        Toast.makeText(movie.isFavorite ? "Removido de favoritos" : "Agregado a favoritos").show();
    }

    onDoubleTapFavorite(movie: Movie): void {
        Toast.makeText(`Doble tap en ${movie.title}`).show();
    }

    onLongPressFilter(): void {
        Toast.makeText("Mantén presionado para más opciones").show();
    }

    getGenreIcon(genre: string): string {
        const icons: {[key: string]: string} = {
            "Acción": "💥",
            "Aventura": "🗺️",
            "Comedia": "😂",
            "Drama": "🎭",
            "Ciencia Ficción": "🚀",
            "Terror": "👻",
            "Romance": "💖",
            "Animación": "🐭",
            "Documental": "🎥"
        };
        return icons[genre] || "🎬";
    }

    goToSearch(): void {
        this.routerExtensions.navigate(["/search"], {
            animated: true,
            transition: { name: "slide", duration: 300, curve: "ease" }
        });
    }
}
import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "@nativescript/angular";
import { Toast } from "@nativescript/core";
import { MovieService } from "../../services/movie.service";
import { Movie } from "../../models/movie.model";

@Component({
    selector: "ns-search",
    templateUrl: "./search.component.html",
    styleUrls: ["./search.component.css"]
})
export class SearchComponent implements OnInit {
    searchQuery: string = "";
    filteredMovies: Movie[] = [];
    isSearching: boolean = false;

    constructor(
        private movieService: MovieService,
        private routerExtensions: RouterExtensions
    ) {}

    ngOnInit(): void {
        this.filteredMovies = this.movieService.getMovies();
    }

    onSearch(): void {
        if (this.searchQuery.length < 3) {
            Toast.makeText("Ingresa al menos 3 caracteres para buscar").show();
            return;
        }

        this.isSearching = true;
        setTimeout(() => {
            this.filteredMovies = this.movieService.searchMovies(this.searchQuery);
            this.isSearching = false;
            Toast.makeText(`Encontradas ${this.filteredMovies.length} películas`).show();
        }, 500);
    }

    onMovieTap(event: any): void {
        const movie = event.item;
        this.routerExtensions.navigate(["/movie", movie.id], {
            animated: true,
            transition: {
                name: "slide",
                duration: 300,
                curve: "ease"
            }
        });
    }

    toggleFavorite(movie: Movie): void {
        this.movieService.toggleFavorite(movie.id);
        Toast.makeText(movie.isFavorite ? "Removido de favoritos" : "Agregado a favoritos").show();
    }

    onDoubleTapFavorite(movie: Movie): void {
        Toast.makeText(`Doble tap en ${movie.title}`).show();
    }

    goToList(): void {
        this.routerExtensions.navigate(["/movies"], {
            animated: true,
            transition: {
                name: "flip",
                duration: 400,
                curve: "easeInOut"
            }
        });
    }
}
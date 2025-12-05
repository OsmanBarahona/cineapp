import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { RouterExtensions } from "@nativescript/angular";
import { ActionDialogOptions, action } from "@nativescript/core/ui/dialogs";
import { ToastDuration, Toasty } from "@triniwiz/nativescript-toasty";
import { MovieService } from "../../services/movie.service";
import { Movie, GENRES } from "../../models/movie.model";

@Component({
    selector: "ns-movie-detail",
    templateUrl: "./movie-detail.component.html",
    styleUrls: ["./movie-detail.component.css"]
})
export class MovieDetailComponent implements OnInit {
    movie: Movie | undefined;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private routerExtensions: RouterExtensions,
        private movieService: MovieService
    ) {}

    ngOnInit(): void {
        const id = +this.route.snapshot.params.id;
        this.movie = this.movieService.getMovieById(id);
        
        if (!this.movie) {
            this.routerExtensions.navigate(["/movies"]);
        }
    }

    toggleFavorite(): void {
        if (this.movie) {
            this.movieService.toggleFavorite(this.movie.id);
            this.movie.isFavorite = !this.movie.isFavorite;
            
            new Toasty({ 
                text: this.movie.isFavorite ? 
                    "¡Agregado a favoritos!" : 
                    "Removido de favoritos",
                duration: ToastDuration.SHORT 
            }).show();
        }
    }

    showCategoryDialog(): void {
        if (!this.movie) return;

        const options: ActionDialogOptions = {
            title: "Cambiar Categoría",
            message: "Selecciona una nueva categoría para: " + this.movie.title,
            cancelButtonText: "Cancelar",
            actions: GENRES
        };

        action(options).then((result) => {
            if (result !== "Cancelar" && this.movie) {
                const success = this.movieService.updateMovieGenre(this.movie.id, result);
                
                if (success) {
                    this.movie.genre = result;
                    new Toasty({ 
                        text: `Categoría cambiada a: ${result}`,
                        duration: ToastDuration.SHORT 
                    }).show();
                }
            }
        });
    }

    showEditDialog(): void {
        new Toasty({ 
            text: "Función de edición en desarrollo",
            duration: ToastDuration.SHORT 
        }).show();
    }

    goBack(): void {
        this.routerExtensions.back();
    }
}
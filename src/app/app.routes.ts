import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "@nativescript/angular";
import { Routes } from "@angular/router";

import { MovieListComponent } from "../../components/movie-list/movie-list.component";
import { MovieDetailComponent } from "../../components/movie-detail/movie-detail.component";
import { SearchComponent } from "../../components/search/search.component";

const routes: Routes = [
    { path: "", redirectTo: "/search", pathMatch: "full" },
    { path: "movies", component: MovieListComponent },
    { path: "movie/:id", component: MovieDetailComponent },
    { path: "search", component: SearchComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { } 
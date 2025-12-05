import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "@nativescript/angular";
import { NativeScriptFormsModule } from "@nativescript/angular";

import { AppRoutingModule } from "./app.routes";  // <-- Importa tu app.routes.ts
import { AppComponent } from "./app.component";
import { MovieListComponent } from "../../components/movie-list/movie-list.component";
import { MovieDetailComponent } from "../../components/movie-detail/movie-detail.component";
import { SearchComponent } from "../../components/search/search.component";

import { MinLengthDirective } from "../../validators/min-length.validator";

@NgModule({
    bootstrap: [AppComponent],
    imports: [
        NativeScriptModule,
        AppRoutingModule,
        NativeScriptFormsModule
    ],
    declarations: [
        AppComponent,
        MovieListComponent,
        MovieDetailComponent,
        SearchComponent,
        MinLengthDirective
    ],
    providers: [],
    schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule { }
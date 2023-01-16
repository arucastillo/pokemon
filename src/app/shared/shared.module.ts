import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {ErrorPageComponent} from './components/error-page/error-page.component';

/* Angular Material Modules */
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatSortModule} from "@angular/material/sort";
import {MatAutocompleteModule} from '@angular/material/autocomplete';


import {NavbarComponent} from './components/navbar/navbar.component';
import {PokemonDetailsComponent} from './components/pokemon-details/pokemon-details.component';

const MAT_MODULES = [
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatButtonModule,
  MatIconModule,
  MatAutocompleteModule
];

@NgModule({
  declarations: [
    ErrorPageComponent,
    NavbarComponent,
    PokemonDetailsComponent
  ],
  entryComponents: [],
  providers: [],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    ...MAT_MODULES
  ],
  exports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    ErrorPageComponent,
    NavbarComponent,
    ...MAT_MODULES,
    PokemonDetailsComponent
  ]
})

export class SharedModule {
}

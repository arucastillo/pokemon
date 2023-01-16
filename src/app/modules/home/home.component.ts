import {Component, OnInit, ViewChild} from '@angular/core';
import {PokemonService} from "../../core/services/pokemon.service";
import {Pokemon} from "../../shared/models/pokemon.model";
import {distinctUntilChanged, merge, startWith, switchMap, tap} from "rxjs";
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  isLoading: boolean = true;

  activePokemon: Pokemon;
  pageSizeOptions = [5, 10, 15, 20];
  pokemonCount = 0;
  pokemon: Pokemon[] = [];
  dataSource: MatTableDataSource<Pokemon>;
  displayedColumns: string[] = [];

  constructor(private pokemonService: PokemonService) {

  }

  ngOnInit(): void {
    this.getListOfPokemon();
  }

  getListOfPokemon(): void {
    merge(this.sort.sortChange, this.paginator.page).pipe(
      distinctUntilChanged(),
      startWith({}),
      tap(() => this.isLoading = true),
      switchMap(() => {
        const params = {
          sortBy: this.sort.active ? `${this.sort.active} ${this.sort.direction}` : null,
          pageSize: this.paginator.pageSize,
          page: this.paginator.pageIndex + 1,
        };
        return this.pokemonService.getListOfPokemon();
      })
    ).subscribe({
      next: res => {
        this.pokemon = res.results;
        this.dataSource = new MatTableDataSource(this.pokemon);
        this.pokemonCount = res.count;

        if (this.dataSource.data.length > 0) {
          this.displayedColumns = ['name', 'actions'];
        }
        this.isLoading = false;
      },
      error: err => {
        this.isLoading = false;
      }
    });
  }

  showPreview(element: Pokemon): void {
    this.dataSource.data.forEach(pokemon => {
      pokemon.isActive = false;
    });
    this.getPokemonDetails(element);
  }

  getPokemonDetails(pokemon: Pokemon): void {
    pokemon.isActive = true;
    this.pokemonService.getPokemonDetails(pokemon.name).subscribe({
      next: (res) => {
        this.activePokemon = res;
      },
      error: (err) => {

      },
      complete: () => {

      }
    });
  }

}

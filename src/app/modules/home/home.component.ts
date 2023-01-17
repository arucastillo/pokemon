import {Component, OnInit, ViewChild} from '@angular/core';
import {PokemonService} from "../../core/services/pokemon.service";
import {Pokemon} from "../../shared/models/pokemon.model";
import {distinctUntilChanged, map, merge, Observable, startWith, switchMap, tap} from "rxjs";
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  private filterFields(value): Pokemon[] {
    const filterValue = value.name ? value.name.toLowerCase() : value.toLowerCase();
    return this.allPokemon.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  isLoading: boolean = true;

  name = new FormControl('');
  filteredOptions: Observable<Pokemon[]>;

  selectedPokemonName = new FormControl('');
  pageSizeOptions = [10, 15, 20];
  pokemonCount = 0;

  allPokemon: Pokemon[] = [];
  pokemon: Pokemon[] = [];
  dataSource: MatTableDataSource<Pokemon>;
  displayedColumns: string[] = [];

  abecedary = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
  displayedCountColumns = ['letter', 'count']

  constructor(private pokemonService: PokemonService) {

  }


  ngOnInit(): void {
    this.getPaginatedListOfPokemon();
    this.filteredOptions = this.name.valueChanges
      .pipe(
        startWith(''),
        map(name => name ? this.filterFields(name) : this.allPokemon?.slice())
      );

  }

  getPaginatedListOfPokemon(): void {
    merge(this.sort.sortChange, this.paginator.page).pipe(
      distinctUntilChanged(),
      startWith({}),
      tap(() => this.isLoading = true),
      switchMap(() => {
        const params = {
          offset: this.paginator.pageIndex + 1,
          limit: this.paginator.pageSize ? this.paginator.pageSize : 10
        };

        return this.pokemonService.getListOfPokemon(params);
      })
    ).subscribe({
      next: res => {
        this.pokemon = res.results;
        this.dataSource = new MatTableDataSource(this.pokemon);
        this.pokemonCount = res.count;

        if (this.dataSource.data.length > 0) {
          this.displayedColumns = ['name', 'actions'];
        }

        const params = {
          limit: this.pokemonCount
        };

        this.getAllPokemon(params);
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  getAllPokemon(params): void {
    this.pokemonService.getListOfPokemon(params).subscribe({
      next: (res) => {
        this.allPokemon = res.results;
      },
      error: () => {
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  showPreview(element: Pokemon): void {
    this.dataSource.data.forEach(pokemon => {
      pokemon.isActive = pokemon.name === element.name;
    });

    this.selectedPokemonName.setValue(element.name);
  }

  displayFn(field: Pokemon): string {
    return field && field.name ? field.name : '';
  }

  countOccurrence(value) {
    return this.allPokemon.map(pokemon => pokemon.name[0]).filter((v) => (v === value)).length;
  }
}

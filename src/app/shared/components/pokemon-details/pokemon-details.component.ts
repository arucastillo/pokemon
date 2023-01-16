import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Pokemon} from "../../models/pokemon.model";
import {PokemonService} from "../../../core/services/pokemon.service";
import {TitleCasePipe} from '@angular/common';


@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.scss'],
  providers: [TitleCasePipe]
})
export class PokemonDetailsComponent implements OnInit, OnChanges {

  @Input() pokemonName: string | null
  pokemon: Pokemon;
  type: string;

  constructor(private pokemonService: PokemonService,  private titleCasePipe: TitleCasePipe) {

  }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.pokemonName) {
      this.getPokemonDetails(this.pokemonName);
    }
  }

  getPokemonDetails(name: string): void {
    this.pokemonService.getPokemonDetails(name).subscribe({
      next: (res) => {
        this.pokemon = res;
      },
      error: (err) => {

      },
      complete: () => {
        if (this.pokemon.types.length > 1) {
          this.type =  `${this.titleCasePipe.transform(this.pokemon.types[0].type.name)} / ${this.titleCasePipe.transform(this.pokemon.types[1].type.name)}`
        } else {
          this.type = this.titleCasePipe.transform(this.pokemon.types[0].type.name);
        }
      }
    });
  }

}

import {Component, Input, OnInit} from '@angular/core';
import {Pokemon} from "../../models/pokemon.model";

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.scss']
})
export class PokemonDetailsComponent implements OnInit  {


  @Input() activePokemon: Pokemon;

  ngOnInit(): void {

  }

}

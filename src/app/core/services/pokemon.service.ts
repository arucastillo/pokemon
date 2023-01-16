import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Pokemon, PokemonData} from "../../shared/models/pokemon.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private readonly apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  public getListOfPokemon(): Observable<PokemonData> {
    return this.http.get<PokemonData>(`${this.apiUrl}`, {responseType: 'json'});
  }

  public getPokemonDetails(name: string): Observable<Pokemon> {
    return this.http.get<Pokemon>(`${this.apiUrl}/${name}`, {responseType: 'json'});
  }

}

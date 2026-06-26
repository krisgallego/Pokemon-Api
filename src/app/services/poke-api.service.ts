import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import {
  catchError,
  forkJoin,
  map,
  Observable,
  of,
  switchMap,
} from 'rxjs';

import {
  PokemonResponse,
} from '../models/pokemon-response.model';

import {
  PokemonDetailResponse,
} from '../models/pokemon-detail-response.model';

import { Pokemon } from '../models/pokemon.model';

@Injectable({
  providedIn: 'root',
})
export class PokeApiService {

  private API_URL =
    'https://pokeapi.co/api/v2/pokemon';

  constructor(private http: HttpClient) { }

  getPokemons(): Observable<Pokemon[]> {

    return this.http
      .get<PokemonResponse>(
        `${this.API_URL}?limit=20&offset=0`
      )
      .pipe(

        switchMap((response) => {

          const pokemons$ =
            response.results.map((pokemon) =>
              this.getPokemonDetail(pokemon.url)
            );

          return forkJoin(pokemons$);
        }),
        catchError((error) => {
          console.error('Error en el servicio:', error);
          return of([]);
        })
      );
  }

  getPokemonDetail(
    url: string
  ): Observable<Pokemon> {

    return this.http
      .get<PokemonDetailResponse>(url)
      .pipe(

        map((pokemon) => {

          return {
            id: pokemon.id,
            name: pokemon.name,
            image: pokemon.sprites.front_default,
            height: pokemon.height,
            weight: pokemon.weight,
            ability:
              pokemon.abilities[0]?.ability.name ||
              'No disponible',
            type:
              pokemon.types[0]?.type.name ||
              'No disponible',
          };
        })
      );
  }
}
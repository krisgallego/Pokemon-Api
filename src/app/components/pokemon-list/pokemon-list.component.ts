import { Component, OnInit } from '@angular/core';

import { Pokemon } from '../../models/pokemon.model';
import { PokeApiService } from '../../services/poke-api.service';


@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.scss',
  standalone: false
})
export class PokemonListComponent implements OnInit {
  pokemons: Pokemon[] = [];

  loading = false;

  error = '';

  constructor(
    private pokeApiService: PokeApiService
  ) { }

  ngOnInit(): void {

    this.loading = true;

    this.pokeApiService
      .getPokemons()
      .subscribe({

        next: (data) => {

          this.pokemons = data;

          this.loading = false;
        },

        error: () => {

          this.error =
            'Error al cargar los Pokémon';

          this.loading = false;
        },
      });
  }

}

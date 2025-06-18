import { Component, OnInit } from '@angular/core';
import { PokeapiService } from '../services/pokeapi.service';
import { PokemonListResult, PokemonListResponse } from '../models/pokemon.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false
})
export class HomePage implements OnInit {
  pokemons: PokemonListResult[] = [];
  limit = 20;
  offset = 0;
  count = 0;
  loading = false;

  constructor(private pokeapi: PokeapiService, private router: Router) {}

  ngOnInit() {
    this.getPokemons();
  }

  getPokemons() {
    this.loading = true;
    this.pokeapi.getPokemonList(this.limit, this.offset).subscribe({
      next: (res: PokemonListResponse) => {
        this.pokemons = res.results;
        this.count = res.count;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  nextPage() {
    if (this.offset + this.limit < this.count) {
      this.offset += this.limit;
      this.getPokemons();
    }
  }

  prevPage() {
    if (this.offset - this.limit >= 0) {
      this.offset -= this.limit;
      this.getPokemons();
    }
  }

  goToDetail(pokemon: PokemonListResult) {
    const name = pokemon.name;
    this.router.navigate(['/pokemon-detail', name]);
  }
}

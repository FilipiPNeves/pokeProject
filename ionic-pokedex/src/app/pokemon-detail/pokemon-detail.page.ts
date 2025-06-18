import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokeapiService } from '../services/pokeapi.service';
import { Pokemon } from '../models/pokemon.model';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.page.html',
  styleUrls: ['./pokemon-detail.page.scss'],
  standalone: false
})
export class PokemonDetailPage implements OnInit {
  pokemon: Pokemon | null = null;
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private pokeapi: PokeapiService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const name = params.get('name');
      if (name) {
        this.getPokemon(name);
      }
    });
  }

  getPokemon(name: string) {
    this.loading = true;
    this.pokeapi.getPokemonDetails(name).subscribe({
      next: (res) => {
        this.pokemon = res;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }
}

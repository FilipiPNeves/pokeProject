import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PokemonListResponse, Pokemon } from '../models/pokemon.model';

@Injectable({
  providedIn: 'root',
})
export class PokeapiService {
  private baseUrl = 'https://pokeapi.co/api/v2';

  constructor(private http: HttpClient) {}

  getPokemonList(limit: number, offset: number): Observable<PokemonListResponse> {
    return this.http.get<PokemonListResponse>(`${this.baseUrl}/pokemon?limit=${limit}&offset=${offset}`);
  }

  getPokemonDetails(name: string): Observable<Pokemon> {
    return this.http.get<Pokemon>(`${this.baseUrl}/pokemon/${name}`);
  }
} 
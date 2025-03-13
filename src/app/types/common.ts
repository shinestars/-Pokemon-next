export interface Result {
  previous: null | string;
  next: null | string;
  count: number;
}

export interface types {
  name: string;
  url: string;
}

export interface PokemonType {
  name: string;
  url: string;
}
export interface TypesOfPokemon {
  pokemon: PokemonType;
  slot: number;
}

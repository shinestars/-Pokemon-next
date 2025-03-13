export interface Result {
  previous: null | string;
  next: null | string;
  count: number;
}

export interface Type {
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

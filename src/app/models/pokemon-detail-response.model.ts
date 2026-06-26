export interface PokemonDetailResponse {
  id: number;
  name: string;
  height: number;
  weight: number;

  sprites: {
    front_default: string;
  };

  abilities: {
    ability: {
      name: string;
    };
  }[];

  types: {
    type: {
      name: string;
    };
  }[];
}
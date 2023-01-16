export interface PokemonData{
 count: number;
 next: string;
 previous: string;
 results: Pokemon[];
}

export interface Pokemon{
  abilities?: Details[];
  base_experience: number;
  forms: Details[];
  game_indices: GameIndices[];
  height: number;
  held_items: [];
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: Moves[];
  name: string;
  order: number;
  past_types: [];
  species: Details;
  sprites: Sprites;
  stats: any;
  types: any;
  weight: number;
  url?: string;
  isActive?: boolean;
}

export interface Sprites{
  back_default: string;
  back_female: string;
  back_shiny: string;
  back_shiny_female: string;
  front_default: string;
  front_shiny: string;
  front_shiny_female: string;
  other: any;
  versions: any;
}

export interface Moves{
  move: Details;
  version_group_details: VersionGroupDetails[];
}

export interface VersionGroupDetails{
  level_learned_at: number;
  move_learn_method: Details;
  version_group: Details;
}

export interface GameIndices{
  game_index: number;
  version: Details;
}

export interface Details{
  name: string;
  url: string;
  is_hidden?: boolean;
  slot?: number;
}

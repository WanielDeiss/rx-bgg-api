export type ThingTypes =
  | 'rpgitem'
  | 'videogame'
  | 'boardgame'
  | 'boardgameaccessory'
  | 'boardgameexpansion';

interface MinMaxPlayers {
  min: number;
  max: number;
}

export interface ThingResult {
  id: number;
  type: ThingTypes;
  primaryName: string;
  thumbnail: string;
  image: string;
  description: string;
  yearPublished: number;
  players: MinMaxPlayers;
}

export interface ThingParamerts {
  id: number | number[];
}

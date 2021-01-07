export type HotTypes =
  | 'boardgame'
  | 'rpg'
  | 'videogame'
  | 'boardgamecompany'
  | 'rpgcompany';

export interface HotParameters {
  type: HotTypes;
}

export interface HotResult {
  id: number;
  rank: number;
  thumbnail: string;
  name: string;
  yearPublished?: number;
}

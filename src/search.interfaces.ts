export type SearchTypes =
  | 'rpgitem'
  | 'videogame'
  | 'boardgame'
  | 'boardgameaccessory'
  | 'boardgameexpansion';

export interface SearchParameters {
  query: string;
  type?: SearchTypes;
  exact?: number;
}

export interface SearchResult {
  id: number;
  type: SearchTypes;
  name: string;
  isNameAlternate: boolean;
  yearPublished: number;
}

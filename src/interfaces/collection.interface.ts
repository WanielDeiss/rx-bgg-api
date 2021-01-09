export type CollectionSubtypes =
  | 'boardgame'
  | 'boardgameexpansion'
  | 'boardgameaccessory'
  | 'rpgitem'
  | 'rpgissue'
  | 'videogame';

type Rating = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export interface CollectionParameters {
  username?: string;
  version?: number;
  subtype?: CollectionSubtypes;
  excludeSubtype?: CollectionSubtypes;
  id?: number | number[];
  brief?: number;
  stats?: number;
  own?: boolean;
  rated?: boolean;
  played?: boolean;
  comment?: boolean;
  trade?: boolean;
  want?: boolean;
  wishlist?: boolean;
  wishlistPriority?: 1 | 2 | 3 | 4 | 5;
  preordered?: boolean;
  wantToPlay?: boolean;
  wantToBuy?: boolean;
  prevOwned?: boolean;
  hasParts?: boolean;
  wantParts?: boolean;
  minRating?: Rating;
  rating?: Rating;
  bggRating?: Rating;
  minPlays?: number;
  maxPlays?: number;
  showPrivate?: 1;
  collId?: number;
  modifiedSince?: Date;
}

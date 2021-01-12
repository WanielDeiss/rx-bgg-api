export type UserDomains = 'boardgame' | 'rpg' | 'videogame';

export interface UserParameters {
  name: string;
  buddies?: boolean;
  guilds?: boolean;
  hot?: boolean;
  top?: boolean;
  domain?: UserDomains;
  page?: string;
}

export interface UserResult {
  id: number;
  username: string;
  firstname: string;
  lastname: string;
  avatarLink: string;
  yearRegistered: number;
  lastLogin: string;
  stateOrProvince: string;
  country: string;
  webaddress: string;
  xboxAccount: string;
  wiiAccount: string;
  psnAccount: string;
  battleNetAccount: string;
  steamAccount: string;
  traderRating: number;
  marketRating: number;
}

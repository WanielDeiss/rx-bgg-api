import { RxHR } from '@akanass/rx-http-request';
import { Observable } from 'rxjs';
import { map, pluck } from 'rxjs/operators';
import { Element } from 'xml-js/types';
import {
  getElement,
  getFlatElementValue
} from './helpers/get-element-value.helper';
import { xmlToJs } from './helpers/xml-to-js.helper';
import { UserParameters, UserResult } from './interfaces';
import API_ROUTES from './routes';

const mapData = (elements: Element[]): UserResult => {
  const firstname = getFlatElementValue(elements[0]);
  const lastname = getFlatElementValue(elements[1]);
  const avatarLink = getFlatElementValue(elements[2]);
  const yearRegistered = Number(getFlatElementValue(elements[3]));
  const lastLogin = getFlatElementValue(elements[4]);
  const stateOrProvince = getFlatElementValue(elements[5]);
  const country = getFlatElementValue(elements[6]);
  const webaddress = getFlatElementValue(elements[7]);
  const xboxAccount = getFlatElementValue(elements[8]);
  const wiiAccount = getFlatElementValue(elements[9]);
  const psnAccount = getFlatElementValue(elements[10]);
  const battleNetAccount = getFlatElementValue(elements[11]);
  const steamAccount = getFlatElementValue(elements[12]);
  const traderRating = Number(getFlatElementValue(elements[13]));
  const marketRating = Number(getFlatElementValue(elements[14]));

  return {
    firstname,
    lastname,
    avatarLink,
    yearRegistered,
    lastLogin,
    stateOrProvince,
    country,
    webaddress,
    xboxAccount,
    wiiAccount,
    psnAccount,
    battleNetAccount,
    steamAccount,
    traderRating,
    marketRating
  } as UserResult;
};

export const user = (args: UserParameters): Observable<UserResult> => {
  const getParams: string[] = [];
  for (const [key, value] of Object.entries(args)) {
    getParams.push(`${key}=${encodeURIComponent(value)}`);
  }
  return RxHR.get(`${API_ROUTES.USER}/?${getParams.join('&')}`).pipe(
    pluck('body'),
    map(xmlToJs),
    map(mapData)
  );
};

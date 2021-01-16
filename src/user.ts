import { RxHR } from '@akanass/rx-http-request';
import { Observable } from 'rxjs';
import { map, pluck } from 'rxjs/operators';
import { Element, xml2js } from 'xml-js';
import { getAttributeByNameFromElement } from './helpers';
import { getFlatElementValue } from './helpers/get-element-value.helper';
import { UserParameters, UserResult } from './interfaces';
import API_ROUTES from './routes';
import XML_OPTIONS from './xml.options';

const mapData = (element: Element): UserResult | undefined => {
  if (!element.elements?.length) return undefined;

  const userElement = element.elements[0];
  const childs = userElement.elements as Element[];

  const id = getAttributeByNameFromElement({
    element: userElement,
    name: 'id'
  });

  if (!id) return undefined;

  const username = getAttributeByNameFromElement({
    element: userElement,
    name: 'name'
  });

  const firstname = getFlatElementValue(childs[0]);
  const lastname = getFlatElementValue(childs[1]);
  const avatarLink = getFlatElementValue(childs[2]);
  const yearRegistered = Number(getFlatElementValue(childs[3]));
  const lastLogin = getFlatElementValue(childs[4]);
  const stateOrProvince = getFlatElementValue(childs[5]);
  const country = getFlatElementValue(childs[6]);
  const webaddress = getFlatElementValue(childs[7]);
  const xboxAccount = getFlatElementValue(childs[8]);
  const wiiAccount = getFlatElementValue(childs[9]);
  const psnAccount = getFlatElementValue(childs[10]);
  const battleNetAccount = getFlatElementValue(childs[11]);
  const steamAccount = getFlatElementValue(childs[12]);
  const traderRating = Number(getFlatElementValue(childs[13]));
  const marketRating = Number(getFlatElementValue(childs[14]));

  return {
    id: Number(id),
    username,
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

export const user = (
  args: UserParameters
): Observable<UserResult | undefined> => {
  const getParams: string[] = [];
  for (const [key, value] of Object.entries(args)) {
    getParams.push(`${key}=${encodeURIComponent(value)}`);
  }
  return RxHR.get(`${API_ROUTES.USER}/?${getParams.join('&')}`).pipe(
    pluck('body'),
    map((value) => xml2js(value, XML_OPTIONS) as Element),
    map(mapData)
  );
};

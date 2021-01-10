import { RxHR } from '@akanass/rx-http-request';
import { Observable } from 'rxjs';
import { map, pluck } from 'rxjs/operators';
import { Element } from 'xml-js/types';
import {
  findElementsByName,
  findOneElementByAttribute,
  findOneElementByName,
  getAttributeByNameFromElement,
  getFlatElementValue,
  xmlToJs
} from './helpers/';
import { getTextFromElement } from './helpers/get-text-from-element.helpers';
import { ThingParamerts, ThingResult } from './interfaces';
import API_ROUTES from './routes';

const aggregateThings = (thing: Element): ThingResult => {
  const id = Number(
    getAttributeByNameFromElement({ element: thing, name: 'id' })
  );
  const type = getAttributeByNameFromElement({ element: thing, name: 'type' });
  const childElements = thing.elements;
  const nameElements = findElementsByName({
    elements: childElements,
    name: 'name'
  });
  const primaryNameElement = findOneElementByAttribute({
    elements: nameElements,
    attributePropertyName: 'type',
    attributePropertyValue: 'primary'
  });
  const imageElement = findOneElementByName({
    elements: childElements,
    name: 'image'
  });
  const thumbnailElement = findOneElementByName({
    elements: childElements,
    name: 'thumbnail'
  });
  const descriptionElement = findOneElementByName({
    elements: childElements,
    name: 'description'
  });
  const yearPublishedElement = findOneElementByName({
    elements: childElements,
    name: 'yearpublished'
  });
  const minPlayersElement = findOneElementByName({
    elements: childElements,
    name: 'minplayers'
  });
  const maxPlayersElement = findOneElementByName({
    elements: childElements,
    name: 'maxplayers'
  });

  const result = {
    id,
    type,
    primaryName: getAttributeByNameFromElement({
      element: primaryNameElement,
      name: 'value'
    }),
    thumbnail: getTextFromElement(thumbnailElement),
    image: getTextFromElement(imageElement),
    description: getTextFromElement(descriptionElement),
    yearPublished: Number(getFlatElementValue(yearPublishedElement)),
    players: {
      min: Number(getFlatElementValue(minPlayersElement)),
      max: Number(getFlatElementValue(maxPlayersElement))
    }
  };

  return result as ThingResult;
};

const mapData = (elements: Element[]): ThingResult | ThingResult[] => {
  const result = elements.map(aggregateThings);
  return result.length > 1 ? result : result[0];
};

export const thing = (
  args: ThingParamerts
): Observable<ThingResult | ThingResult[]> => {
  const getParams: string[] = [];
  // eslint-disable-next-line prefer-const
  for (let [key, value] of Object.entries(args)) {
    value = key === 'id' && Array.isArray(value) ? value.join(',') : value;
    getParams.push(`${key}=${value}`);
  }
  return RxHR.get(`${API_ROUTES.THING}/?${getParams.join('&')}`).pipe(
    pluck('body'),
    map(xmlToJs),
    map(mapData)
  );
};

import { RxHR } from '@akanass/rx-http-request';
import { Observable } from 'rxjs';
import { map, pluck } from 'rxjs/operators';
import { xml2js, xml2json } from 'xml-js';
import { Element, Options } from 'xml-js/types';
import { SearchParameters, SearchResult } from './search.interfaces';

const ROOT_URL = 'https://api.geekdo.com/xmlapi2';
const SEARCH_URI = `${ROOT_URL}/search`;

const xmlConvertingOptions: Options.XML2JS = {
  trim: true
};

const xmlToJs = (data: string): SearchResult[] => {
  console.log(xmlToJs);
  const unformatedSearchResults: Element[] = xml2js(data, xmlConvertingOptions)
    .elements[0].elements;
  return unformatedSearchResults.map(shiftData);
};

const shiftData = (element: Element): SearchResult => {
  const name = element.elements?.filter((x) => x.name === 'name')[0];
  const yearPublished = element.elements?.filter(
    (x) => x.name === 'yearpublished'
  )[0];
  return {
    id: Number(element.attributes?.id),
    type: element.attributes?.type,
    name: name?.attributes?.value,
    isNameAlternate: name?.attributes?.type === 'alternate',
    yearPublished: Number(yearPublished?.attributes?.value)
  } as SearchResult;
};

export const search = (params: SearchParameters): Observable<any> => {
  let getParams: string[] = [];
  for (let [key, value] of Object.entries(params)) {
    value = key === 'query' ? value.replace(' ', '+') : value;
    getParams.push(`${key}=${value}`);
  }
  return RxHR.get(`${SEARCH_URI}/?${getParams.join('&')}`).pipe(
    pluck('body'),
    map(xmlToJs)
  );
};

import { RxHR } from '@akanass/rx-http-request';
import { Observable } from 'rxjs';
import { map, pluck } from 'rxjs/operators';
import { xml2js } from 'xml-js';
import { Element, Options } from 'xml-js/types';
import { SearchParameters, SearchResult } from './interfaces';
import API_ROUTES from './routes';

const xmlConvertingOptions: Options.XML2JS = {
  trim: true
};

const xmlToJs = (data: string): SearchResult[] => {
  const unformatedSearchResults: Element[] = xml2js(data, xmlConvertingOptions)
    .elements[0].elements;
  return unformatedSearchResults.map(mapData);
};

const mapData = (element: Element): SearchResult => {
  const name = element.elements?.filter((x) => x.name === 'name')[0];
  const yearPublished = element.elements?.filter(
    (x) => x.name === 'yearpublished'
  )[0];
  const searchResult = {
    id: Number(element.attributes?.id),
    type: element.attributes?.type,
    name: name?.attributes?.value,
    isNameAlternate: name?.attributes?.type === 'alternate'
  } as SearchResult;

  if (yearPublished)
    searchResult.yearPublished = Number(yearPublished?.attributes?.value);

  return searchResult;
};

export const search = (args: SearchParameters): Observable<SearchResult[]> => {
  const getParams: string[] = [];
  // eslint-disable-next-line prefer-const
  for (let [key, value] of Object.entries(args)) {
    value = key === 'query' ? value.replace(' ', '+') : value;
    getParams.push(`${key}=${value}`);
  }
  return RxHR.get(`${API_ROUTES.SEARCH}/?${getParams.join('&')}`).pipe(
    pluck('body'),
    map(xmlToJs)
  );
};

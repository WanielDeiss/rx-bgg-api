import { RxHR } from '@akanass/rx-http-request';
import { Observable } from 'rxjs';
import { map, pluck, tap } from 'rxjs/operators';
import { Element } from 'xml-js/types';
import { getElement } from './helpers/get-element-value.helper';
import { xmlToJs } from './helpers/xml-to-js.helper';
import { SearchParameters, SearchResult } from './interfaces';
import API_ROUTES from './routes';

const mapData = (elements: Element[]): SearchResult[] => {
  return elements.map((element) => {
    const elem = getElement(element);
    const name = elem('name')?.value;
    const type = elem('name')?.type;
    const yearPublished = elem('yearpublished')?.value;
    const result = {
      id: Number(element.attributes?.id),
      type: element.attributes?.type,
      name,
      isNameAlternate: type === 'alternate'
    } as SearchResult;

    if (yearPublished) result.yearPublished = Number(yearPublished);

    return result;
  });
};

export const search = (args: SearchParameters): Observable<SearchResult[]> => {
  const getParams: string[] = [];
  for (const [key, value] of Object.entries(args)) {
    getParams.push(`${key}=${encodeURIComponent(value)}`);
  }
  return RxHR.get(`${API_ROUTES.SEARCH}/?${getParams.join('&')}`).pipe(
    pluck('body'),
    map(xmlToJs),
    map(mapData)
  );
};

import { RxHR } from '@akanass/rx-http-request';
import { Observable } from 'rxjs';
import { map, pluck, tap } from 'rxjs/operators';
import { Element } from 'xml-js/types';
import { getElement } from './helpers/get-element-value.helper';
import { xmlToJs } from './helpers/xml-to-js.helper';
import { HotParameters, HotResult } from './interfaces/hot.interface';
import API_ROUTES from './routes';

const mapData = (elements: Element[]): HotResult[] => {
  return elements.map((element) => {
    const elem = getElement(element);
    const name = elem('name')?.value;
    const thumbnail = elem('thumbnail')?.value;
    const yearPublished = elem('yearpublished')?.value;
    const result = {
      id: Number(element.attributes?.id),
      rank: Number(element.attributes?.rank),
      name,
      thumbnail
    } as HotResult;

    if (yearPublished) result.yearPublished = Number(yearPublished);

    return result;
  });
};

export const hot = (args: HotParameters): Observable<HotResult[]> => {
  return RxHR.get(`${API_ROUTES.HOT}/?type=${args.type}`).pipe(
    pluck('body'),
    map(xmlToJs),
    map(mapData)
  );
};

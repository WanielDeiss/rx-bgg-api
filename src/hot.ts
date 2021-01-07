import { RxHR } from '@akanass/rx-http-request';
import { Observable } from 'rxjs';
import { map, pluck, tap } from 'rxjs/operators';
import { Element } from 'xml-js/types';
import { xmlToJs } from './helpers/xml-to-js.helper';
import { HotParameters, HotResult } from './interfaces/hot.interface';
import API_ROUTES from './routes';

const mapData = (elements: Element[]): HotResult[] => {
  return elements.map((element) => {
    const name = element.elements?.filter((x) => x.name === 'name')[0];
    const thumbnail = element.elements?.filter(
      (x) => x.name === 'thumbnail'
    )[0];
    const yearPublished = element.elements?.filter(
      (x) => x.name === 'yearpublished'
    )[0];
    const result = {
      id: Number(element.attributes?.id),
      rank: Number(element.attributes?.rank),
      name: name?.attributes?.value,
      thumbnail: thumbnail?.attributes?.value
    } as HotResult;

    if (yearPublished)
      result.yearPublished = Number(yearPublished?.attributes?.value);

    return result;
  });
};

export const hot = (args: HotParameters): Observable<any> => {
  return RxHR.get(`${API_ROUTES.HOT}/?type=${args.type}`).pipe(
    pluck('body'),
    map(xmlToJs),
    map(mapData)
  );
};

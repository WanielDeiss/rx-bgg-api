import { xml2js } from 'xml-js';
import { Element, Options } from 'xml-js/types';

const xmlConvertingOptions: Options.XML2JS = {
  trim: true
};

export const xmlToJs = (data: string): Element[] => {
  return xml2js(data, xmlConvertingOptions).elements[0].elements;
};

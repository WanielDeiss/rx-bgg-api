import { Attributes, Element } from 'xml-js';

export const getElementValue = (element: Element) => {
  return (elementName: string): Attributes | undefined => {
    const elem = element.elements?.filter((x) => x.name === elementName)[0];
    return elem?.attributes;
  };
};

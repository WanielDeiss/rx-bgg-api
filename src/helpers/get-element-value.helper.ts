import { Attributes, Element } from 'xml-js';

export const getElement = (element: Element ) => {
  return (elementName: string): Attributes | undefined => {
    const elem = element.elements?.filter((x) => x.name === elementName)[0];
    return elem?.attributes;
  };
};

export const getFlatElementValue = (
  element: Element | undefined
): string | number | undefined => {
  if (!element) return undefined;
  return element.attributes?.value;
};

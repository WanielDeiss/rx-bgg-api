import { Element } from 'xml-js';

interface GetTextFromElement {
  element: Element | undefined;
}

export const getTextFromElement = (
  element: GetTextFromElement['element']
): string | undefined => {
  if (!element?.elements?.length) return undefined;
  return element.elements[0].text?.toString();
};

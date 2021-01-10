import { Element } from 'xml-js';

interface GetAttributeByNameFromElement {
  element: Element | undefined;
  name: string;
}

export const getAttributeByNameFromElement = (
  args: GetAttributeByNameFromElement
): string | number | undefined => {
  if (!args.element) return undefined;
  const attributes = args.element?.attributes;
  const attributeValue = attributes ? attributes[args.name] : undefined;
  return attributeValue;
};

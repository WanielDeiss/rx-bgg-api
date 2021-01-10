import { Element } from 'xml-js';

interface FindElementsByName {
  elements: Element[] | undefined;
  name: string;
}

interface FindElementByAttribute {
  elements: Element[] | undefined;
  attributePropertyName: string;
  attributePropertyValue: string;
}

export const findElementsByName = (
  args: FindElementsByName
): Element[] | undefined => {
  if (!args.elements?.length) return undefined;

  return args.elements.filter((element) => element.name === args.name);
};

export const findOneElementByName = (
  args: FindElementsByName
): Element | undefined => {
  if (!args.elements?.length) return undefined;

  return args.elements.find((element) => element.name === args.name);
};

export const findOneElementByAttribute = (
  args: FindElementByAttribute
): Element | undefined => {
  if (!args.elements?.length) return undefined;

  return args.elements?.find((element) => {
    if (!element.attributes) return undefined;

    return (
      element.attributes[args.attributePropertyName] ===
      args.attributePropertyValue
    );
  });
};

# Geekdo SDK

RxJS based BoardGameGeek API Package, fully written in Typescript.

## Installation

```bash
$ npm i geekdo-sdk

or

$ yarn add geekdo-sdk
```

## Usage

Geekdo SDK is designed to be the simplest way to call the BoardGameGeek XMLAPI2 and get an fully typed object.

```typescript
import * as Geekdo from 'rx-bgg-api';
import { SearchParameters } from 'rx-bgg-api/interfaces';
```

Detailed informations under the referenc section

## References

### search({ query, type, exact })

**Parameters**

| Name  | Type        | Description                                                                                                                                                                                  |
| ----- | ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| query | string      | Returns all types of Items that match SEARCH_QUERY.                                                                                                                                          |
| type  | SearchTypes | [Optionally] Return all items that match SEARCH_QUERY of type SearchTypes. SearchTypes might be **rpgitem**, **videogame**, **boardgame**, **boardgameaccessory** or **boardgameexpansion**. |
| exact | number      | [Optionally] Limit results to items that match the SEARCH_QUERY exactly                                                                                                                      |

**Usage**

```typescript
const parameters: SearchParameters = {
  query: '7 Wonders',
  type: 'boardgame', // optionally
  exact: 5 // optionally
};

Geekdo.search(parameters).subscribe(
  (res) => {
    console.log('Response:', res);
  },
  (err) => {
    console.error(err);
  }
);
```

**Response**

```json
[
  {
    id: 1234,
    type: 'boardgame',
    name: '7 Dans',
    isNameAlternate: false,
    yearPublished: 1988
  },
  {
    id: 4321,
    type: 'boardgame',
    name: 'Settlers of Sina',
    isNameAlternate: true,
    yearPublished: 1994
  }
```

### hot({ types })

**Parameters**

| Name | Type     | Description                                                                                         |
| ---- | -------- | --------------------------------------------------------------------------------------------------- |
| type | HotTypes | SearchTypes might be **boardgame**, **rpg**, **videogame**, **boardgamecompany** or **rpgcompany**. |

**Usage**

```typescript
const parameters: HotParameters = {
  query: 'boardgame'
};

Geekdo.hot(parameters).subscribe(
  (res) => {
    console.log('Response:', res);
  },
  (err) => {
    console.error(err);
  }
);
```

**Response**

```json
[
  {
    "id": 1234,
    "rank": 1,
    "name": "Awesome Boardgame",
    "thumbnail": "https://cf.geekdo-images.com/.../some.jpg",
    "yearPublished": 2021
  },
  {
    "id": 4321,
    "rank": 2,
    "name": "Another Awesome Boardgame",
    "thumbnail": "https://cf.geekdo-images.com/.../some.jpg",
    "yearPublished": 2020
  }
]
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://github.com/WanielDeiss/rx-bgg-api/blob/master/LICENSE.md)

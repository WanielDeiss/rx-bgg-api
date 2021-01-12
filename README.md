# Geekdo SDK

[![npm version](https://badge.fury.io/js/geekdo-sdk.svg)](https://www.npmjs.com/package/geekdo-sdk)

Geekdo SDK is designed to be the simplest way to call the BoardGameGeek XMLAPI2 and get an fully typed object.

## Table of contents

- [Installation](#Installation)
- [Usage](#Usage)
- [References](#References)
  - [user](#user)
  - [search](#search)
  - [thing](#thing)
  - [hot](#hot)
- [Contributing](#Contributing)
- [License](#License)

## Installation

```bash
$ npm i geekdo-sdk

or

$ yarn add geekdo-sdk
```

## Usage

```typescript
import * as Geekdo from 'geekdo-sdk';
import { SearchParameters } from 'geekdo-sdk/interfaces';
```

Detailed informations under the referenc section

## References

### user

```typescript
user({ name });
```

**Parameters**

| Name | Type   | Description             |
| ---- | ------ | ----------------------- |
| name | string | Specifies the user name |

**Usage**

```typescript
const parameters: UserParameters = {
  name: 'wanieldeiss'
};

Geekdo.user(parameters).subscribe(
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
{
  "id": 12345,
  "username": "wanieldeiss",
  "firstname": "Daniel",
  "lastname": "",
  "avatarLink": "N/A",
  "yearRegistered": 2019,
  "lastLogin": "2021-01-05",
  "stateOrProvince": "Bayern",
  "country": "Germany",
  "webaddress": "https://sircode.xyz",
  "xboxAccount": "",
  "wiiAccount": "",
  "psnAccount": "",
  "battleNetAccount": "",
  "steamAccount": "",
  "traderRating": 0,
  "marketRating": 0
}
```

### search

```typescript
search({ query, type, exact });
```

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
    "id": 1234,
    "type": "boardgame",
    "name": "7 Dans",
    "isNameAlternate": false,
    "yearPublished": 1988
  },
  {
    "id": 4321,
    "type": "boardgame",
    "name": "Settlers of Sina",
    "isNameAlternate": true,
    "yearPublished": 1994
  }
]
```

### thing

```typescript
thing({ id });
```

**Parameters**

| Name | Type               | Description                                   |
| ---- | ------------------ | --------------------------------------------- |
| id   | number \| number[] | Specifies the id of the thing(s) to retrieve. |

**Usage**

```typescript
const singleGame: ThingParameters = {
  id: 12345
};

const multiGames: ThingParameters = {
  id: [12345, 54321, 67890]
};

// or replace singleGame with multiGames
Geekdo.thing(singleGame).subscribe(
  (res) => {
    console.log('Response:', res);
  },
  (err) => {
    console.error(err);
  }
);
```

**Response**

If you put >1 id's into `thing()`, you get an array of `ThingResult[]`

```json
{
  "id": 12345,
  "type": "boardgame",
  "primaryName": "Super Awesome Boardgame",
  "thumbnail": "https://cf.geekdo-images.com/.../some-thumbnail.jpg",
  "image": "https://cf.geekdo-images.com/.../some-image.jpg",
  "description": "Lorem ipsum dolor sit amet.",
  "yearPublished": 1970,
  "players": { "min": 1, "max": 5 }
}
```

### hot

```typescript
hot({ types });
```

**Parameters**

| Name | Type     | Description                                                                                         |
| ---- | -------- | --------------------------------------------------------------------------------------------------- |
| type | HotTypes | SearchTypes might be **boardgame**, **rpg**, **videogame**, **boardgamecompany** or **rpgcompany**. |

**Usage**

```typescript
const parameters: HotParameters = {
  type: 'boardgame'
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

# Geekdo SDK

RxJS based BoardGameGeek API Package, fully written in Typescript.

## Installation

```bash
$ npm i rx-bgg-api

or

$ yarn add rx-bgg-api
```

## Usage

Geekdo SDK is designed to be the simplest way to call the BoardGameGeek XMLAPI2 and get an fully typed object.

```typescript
import * as BggApi from 'rx-bgg-api';
import { SearchParameters } from 'rx-bgg-api/interfaces';

const searchParameters: SearchParameters = {
  query: '7 Wonders',
  type: 'boardgame', // optionally
  exact: 5 // optionally
};

BggApi.search(searchParameters).subscribe(
  (res) => {
    console.log('Response:', res);
  },
  (err) => {
    console.error(err);
  }
);
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://github.com/WanielDeiss/rx-bgg-api/blob/master/LICENSE.md)

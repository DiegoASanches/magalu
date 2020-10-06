import App from './App';
import axios from 'axios';
import axiosMock from 'axios';
import { filterOnlyFavorite, like, unlike } from './services/favorite.service';

jest.mock('axios');

it('returns initial list of heroes', async () => {
  const instance = new App();
  axios.get.mockResolvedValue({
    data: {
      attributionHTML: '<a href="http://marvel.com">Data provided by Marvel. © 2020 MARVEL</a>',
      attributionText: "Data provided by Marvel. © 2020 MARVEL",
      code: 200,
      copyright: "© 2020 MARVEL",
      data: { offset: 0, limit: 20, total: 1493, count: 20 },
      etag: "8616b391f161e0cc0cc085a2bee1bfe7582e1a52",
      status: "Ok",
      data: {
        count: 20,
        limit: 20,
        offset: 0,
        results: [
          {
            comics: { available: 12, collectionURI: "http://gateway.marvel.com/v1/public/characters/1011334/comics" },
            description: "",
            events: { available: 1, collectionURI: "http://gateway.marvel.com/v1/public/characters/1011334/events" },
            id: 1011334,
            modified: "2014-04-29T14:18:17-0400",
            name: "superman",
            resourceURI: "http://gateway.marvel.com/v1/public/characters/1011334",
            series: { available: 3, collectionURI: "http://gateway.marvel.com/v1/public/characters/1011334/series" },
            stories: { available: 21, collectionURI: "http://gateway.marvel.com/v1/public/characters/1011334/stories" },
            thumbnail: { path: "http://i.annihil.us/u/prod/marvel/i/mg/c/e0/535fecbbb9784", extension: "jpg" },
            urls: [{ type: "detail" }, { type: "wiki", }, { type: "comiclink", }],
          },
          {
            comics: { available: 3, collectionURI: "http://gateway.marvel.com/v1/public/characters/1017100/comics" },
            description: "Rick Jones has been Hulk's best bud since day one, but now he's more than a friend...he's a teammate! Transformed by a Gamma energy explosion, A-Bomb's thick, armored skin is just as strong and powerful as it is blue. And when he curls into action, he uses it like a giant bowling ball of destruction! ",
            events: { available: 0, collectionURI: "http://gateway.marvel.com/v1/public/characters/1017100/events" },
            id: 1017100,
            modified: "2013-09-18T15:54:04-0400",
            name: "A-Bomb (HAS)",
            resourceURI: "http://gateway.marvel.com/v1/public/characters/1017100",
            series: { available: 2, collectionURI: "http://gateway.marvel.com/v1/public/characters/1017100/series" },
            stories: { available: 7, collectionURI: "http://gateway.marvel.com/v1/public/characters/1017100/stories" },
            thumbnail: { path: "http://i.annihil.us/u/prod/marvel/i/mg/3/20/5232158de5b16", extension: "jpg" },
            urls: [{ type: "detail" }, { type: "comiclink" }],
          }
        ],
        total: 1493,
      }
    }
  });

  const response = await instance.search();
  expect(response.characters.length).toBeGreaterThan(0);
  expect(axiosMock.get).toHaveBeenCalledTimes(1);
});

it('like', async () => {
  const instance = new App();
  const result = await instance.search({ sortName: instance.state.sortName });
  like(1011334);
  const favoriteCharacters = filterOnlyFavorite(result.characters);
  const test = favoriteCharacters.filter(favoriteCharacter => favoriteCharacter.isFavorite === true);
  expect(test.length).toBe(1);
  expect(test[0].id).toBe(1011334);
});

it('unlike', async () => {
  const instance = new App();
  const result = await instance.search({ sortName: instance.state.sortName });
  like(1011334);
  like(1017100);
  unlike(1017100);
  const favoriteCharacters = filterOnlyFavorite(result.characters);
  const test = favoriteCharacters.filter(favoriteCharacter => favoriteCharacter.isFavorite === true);
  expect(test.length).toBe(1);
  expect(test[0].id).toBe(1011334);
});
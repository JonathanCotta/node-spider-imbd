## Node Spider

A webcrawler for imdb using javascript tecnologies.

### Installing and running

To run the project you just need follow these steps

> Clone the project repository:

```
git clone https://gitlab.com/JonathanCotta/node-spider-imdb.git
```

> Install packages:

```
yarn install
```

> Run the project

```
yarn start
```

### URL example
```
http://localhost:8888/api/v1/imdb/search/?q=top+gun
```

### Available routes

| Method | Route |
| ------ | ------ |
| GET | /api/v1/info |
| GET | /api/v1/imdb/search/movies |
| GET | /api/v1/imdb/search/tv/short |
| GET | /api/v1/imdb/search/tv/movies |
| GET | /api/v1/imdb/search/tv/special |
| GET | /api/v1/imdb/search/tv/series |
| GET | /api/v1/imdb/search/tv/miniseries |
| GET | /api/v1/imdb/search/games |
| GET | /api/v1/imdb/search/short |
| GET | /api/v1/imdb/search/documentary |


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
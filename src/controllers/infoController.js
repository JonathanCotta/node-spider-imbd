async function v1(req, res) {
  const apiInfo = {
    status: 'ON',
    routes: [
      {
        method: 'GET',
        auth: false,
        route: '/api/v1/imdb/search/movies',
        queryArguments: ['title'],
      },
      {
        method: 'GET',
        auth: false,
        route: '/api/v1/imdb/search/tv/short',
        queryArguments: ['title'],
      },
      {
        method: 'GET',
        auth: false,
        route: '/api/v1/imdb/search/tv/movies',
        queryArguments: ['title'],
      },
      {
        method: 'GET',
        auth: false,
        route: '/api/v1/imdb/search/tv/special',
        queryArguments: ['title'],
      },
      {
        method: 'GET',
        auth: false,
        route: '/api/v1/imdb/search/tv/series',
        queryArguments: ['title'],
      },
      {
        method: 'GET',
        auth: false,
        route: '/api/v1/imdb/search/tv/miniseries',
        queryArguments: ['title'],
      },
      {
        method: 'GET',
        auth: false,
        route: '/api/v1/imdb/search/games',
        queryArguments: ['title'],
      },
      {
        method: 'GET',
        auth: false,
        route: '/api/v1/imdb/search/short',
        queryArguments: ['title'],
      },
      {
        method: 'GET',
        auth: false,
        route: '/api/v1/imdb/search/documentary',
        queryArguments: ['title'],
      },
    ],
  };

  return res.status(200).json(apiInfo);
}

module.exports = {
  v1,
};

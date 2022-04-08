const jsonServer = require('json-server');
const queryString = require('query-string');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

// Add custom routes before JSON Server router
server.get('/echo', (req, res) => {
  res.jsonp(req.query);
});

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser);

router.render = (req, res) => {
  const headers = res.getHeaders();
  const totalCountHeader = headers['x-total-count'];
  const queryParam = queryString.parse(req._parsedUrl.query);

  console.log("adsf",queryParam)
  if(req.method === 'GET' && totalCountHeader){
    const result = {
      data: res.locals.data,
      pagination: {
        _page: queryParam._page || 1,
        _limit: queryParam._limit || 10,
        _totalRows: totalCountHeader
      }
    }
    return res.jsonp(result)
  }
  res.jsonp(res.locals.data);
};

server.use((req, res, next) => {
  if (req.method === 'POST') {
    (req.body.ctime = Date.now()), (req.body.mtime = Date.now());
  } else if (req.method === 'PATCH') {
    req.body.mtime = Date.now();
  }
  next();
});

// Use default router
server.use('/api', router);
const HOST = '0.0.0.0';
const POST = process.env.PORT || 8080;
server.listen(POST, HOST, () => {
  console.log('JSON Server is running');
});

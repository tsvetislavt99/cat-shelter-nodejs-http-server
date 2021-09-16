import http from 'http';
import imageLoader from './handlers/imagesHandler.js';
import homeHandler from './handlers/homeHandler.js';
import addBreedHandler from './handlers/addBreedHandler.js';
import addCatHandler from './handlers/addCatHandler.js';
import staticHandler from './handlers/otherStaticFilesHandler.js';
import deleteHandler from './handlers/deleteHandler.js';
const port = process.argv[2];

http
  .createServer((req, res) => {
    //*****************Request logger*********************
    console.log(`Method: ${req.method}\nPath: ${req.url}`);
    imageLoader(req, res);
    staticHandler(req, res);
    if (req.url === '/') {
      homeHandler(req, res);
    } else if (req.url === '/add-breed') {
      addBreedHandler(req, res);
    } else if (req.url === '/add-cat') {
      addCatHandler(req, res);
    } else if (req.url.startsWith('/delete-cat/')) {
      deleteHandler(req, res);
    }
  })
  .listen(port, () => {
    console.info(`HTTP Server listening on port ${port}....`);
  });

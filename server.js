import http from 'http';
import fs from 'fs';
const port = process.argv[2];

http
  .createServer((req, res) => {
    console.log(req.method);
    console.log(req.url);
    switch (req.url) {
      case '/':
        res.writeHead(200, 'OK', { 'Content-Type': 'text/html' });
        let indexPage = fs.readFileSync('./views/home/index.html');
        console.log('finished loading index.html...');
        res.write(indexPage);
        res.end();
        break;
      case '/content/styles/site.css':
        res.writeHead(200, 'OK', { 'Content-type': 'text/css' });
        console.log('Reading CSS...');
        let cssFile = fs.readFileSync('./content/styles/site.css');
        res.write(cssFile);
        res.end();
        break;
      case '/content/images/pawprint.ico':
        res.writeHead(200, 'OK', {
          'Content-type': 'image/vnd.microsoft.icon',
        });
        let iconFile = fs.readFileSync('./content/images/pawprint.ico');
        res.write(iconFile);
        res.end();
        break;
      case '/add-breed':
        res.writeHead(200, 'OK', { 'Content-Type': 'text/html' });
        let addBreedPage = fs.readFileSync('./views/addBreed.html');
        res.write(addBreedPage);
        res.end();
        break;
      case '/add-cat':
        res.writeHead(200, 'OK', { 'Content-Type': 'text/html' });
        let addCatPage = fs.readFileSync('./views/addCat.html');
        res.write(addCatPage);
        res.end();
        break;
      default:
        break;
    }
  })
  .listen(port, () => {
    console.info(`HTTP Server listening on port ${port}....`);
  });

import fs from 'fs';

export default function staticHandler(req, res) {
  switch (req.url) {
    case '/content/styles/site.css':
      res.writeHead(200, 'OK', { 'Content-type': 'text/css' });
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
    case '/js/index.js':
      res.writeHead(200, 'OK', {
        'Content-type': 'application/javascript',
      });
      let js = fs.readFileSync('./js/index.js');
      res.write(js);
      res.end();
      break;
    default:
      break;
  }
}

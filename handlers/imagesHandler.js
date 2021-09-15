import fs from 'fs';

export default function imageLoader(req, res) {
  if (
    req.url.startsWith('/content/images/') &&
    req.url !== '/content/images/pawprint.ico' &&
    req.method === 'GET'
  ) {
    let img = fs.readFileSync(`.${req.url}`);
    res.writeHead(200, { 'Content-Type': 'image/jpeg' });
    res.end(img);
  }
}

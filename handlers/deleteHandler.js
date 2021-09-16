import fs from 'fs';

export default function deleteHandler(req, res) {
  const idToDel = req.url.substring(req.url.lastIndexOf('/') + 1);
  fs.readFile('./db/cats.json', 'utf-8', (err, data) => {
    if (err) throw err;

    let allCats = JSON.parse(data);
    let catsUpdated = allCats.filter((cat) => cat.id !== idToDel);
    let jsonFile = JSON.stringify(catsUpdated);
    fs.writeFile('./db/cats.json', jsonFile, () => {
      res.writeHead(200, 'OK');
      res.end();
    });
  });
}

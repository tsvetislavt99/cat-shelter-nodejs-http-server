import fs from 'fs';
import qs from 'querystring';

export default function addBreedHandler(req, res) {
  if (req.method === 'GET') {
    res.writeHead(200, 'OK', { 'Content-Type': 'text/html' });
    let addBreedPage = fs.readFileSync('./views/addBreed.html');
    res.write(addBreedPage);
    res.end();
    //****************************Add Breed POST Starting here*********************************
  } else if (req.method === 'POST') {
    const breedsJSON = fs.readFileSync('./db/breeds.json');
    const breedsDB = JSON.parse(breedsJSON);
    let formData = '';
    req.on('data', (data) => {
      formData += data;
    });
    req.on('end', () => {
      let parsed = qs.parse(formData);
      if (!breedsDB.breeds.includes(parsed.breed)) {
        breedsDB.breeds.push(parsed.breed);
        fs.writeFileSync('./db/breeds.json', JSON.stringify(breedsDB));
      }
      res.writeHead(302, { location: '/' });
      res.end();
    });
  }
}

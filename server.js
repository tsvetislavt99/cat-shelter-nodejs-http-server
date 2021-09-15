import http from 'http';
import fs from 'fs';
import qs from 'querystring';
import path from 'path';
import formidable from 'formidable';
import imageLoader from './handlers/imagesHandler.js';
import homeHandler from './handlers/homeHandler.js';
const port = process.argv[2];

//Load JSON DB
const breedsJSON = fs.readFileSync('./db/breeds.json');
const breedsDB = JSON.parse(breedsJSON);

http
  .createServer((req, res) => {
    //****************************Request logger****************************
    console.log(`Method: ${req.method}\nPath: ${req.url}`);
    imageLoader(req, res);

    switch (req.url) {
      //****************************Home page****************************
      case '/':
        homeHandler(req, res);
        break;
      //****************************Add breed page****************************
      case '/add-breed':
        if (req.method === 'GET') {
          res.writeHead(200, 'OK', { 'Content-Type': 'text/html' });
          let addBreedPage = fs.readFileSync('./views/addBreed.html');
          res.write(addBreedPage);
          res.end();
          //****************************Add Breed POST Starting here*********************************
        } else if (req.method === 'POST') {
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
        break;
      //****************************Add cat page****************************
      case '/add-cat':
        if (req.method === 'GET') {
          res.writeHead(200, 'OK', { 'Content-Type': 'text/html' });
          let addCatPage = fs.readFileSync('./views/addCat.html');
          const breedsJson = fs.readFileSync('./db/breeds.json', 'utf-8');
          const parsedBreedsList = JSON.parse(breedsJson).breeds.map(
            (breed) => `<option value="${breed}">${breed}</option> `
          );
          let finalAddCatPage = addCatPage
            .toString()
            .replace('{{catBreeds}}', parsedBreedsList);
          res.write(finalAddCatPage);
          res.end();
          //****************************Add Cat POST Starting here*********************************
        } else if (req.method === 'POST') {
          let form = formidable.IncomingForm();
          const __dirname = path.resolve();
          const uploadFolder = path.join(__dirname, 'content', 'images');
          form.uploadDir = uploadFolder;
          form.parse(req, (err, fields, files) => {
            let oldPath = files.upload.path;
            let newPath =
              path.join(__dirname, 'content', 'images') +
              '/' +
              files.upload.name;
            let rawData = fs.readFileSync(oldPath);
            fs.writeFileSync(newPath, rawData);

            fs.readFile('./db/cats.json', 'utf-8', (err, data) => {
              if (err) throw err;

              let allCats = JSON.parse(data);
              allCats.push({
                id: allCats.length + 1,
                ...fields,
                image: files.upload.name,
              });
              let jsonFile = JSON.stringify(allCats);
              fs.writeFile('./db/cats.json', jsonFile, () => {
                res.writeHead(302, { location: '/' });
                res.end();
              });
            });
          });
        }
        break;
      //****************************Utilities loading****************************
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
  })
  .listen(port, () => {
    console.info(`HTTP Server listening on port ${port}....`);
  });

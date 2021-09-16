import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';
import formidable from 'formidable';

export default function addCatHandler(req, res) {
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
      if (err) throw err;

      let oldPath = files.upload.path;
      let newPath =
        path.join(__dirname, 'content', 'images') + '/' + files.upload.name;
      let rawData = fs.readFileSync(oldPath);
      fs.writeFileSync(newPath, rawData);
      //This works only for UNIX OS and deletes the garbage files after formidable uploads.
      exec('rm -r ./content/images/upload_*', (error, stdout, stderr) => {
        if (error) {
          console.log(`error: ${error.message}`);
          return;
        }
      });
      //Please remove the exec command if you are not on a UNIX OS
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
}

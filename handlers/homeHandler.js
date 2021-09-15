import fs from 'fs';

export default function homeHandler(req, res) {
  res.writeHead(200, 'OK', { 'Content-Type': 'text/html' });
  let indexPage = fs.readFileSync('./views/home/index.html');
  const allCats = JSON.parse(fs.readFileSync('./db/cats.json'));
  const myCats = allCats.map(
    (cat) => `<li>
          <img
            src="./content/images/${cat.image}"
            alt="${cat.breed} Cat"
          />
          <h3></h3>
          <p><span>Breed: </span>${cat.breed} Cat</p>
          <p>
            <span>Description: </span>${cat.description}
          </p>
          <ul class="buttons">
            <li class="btn edit"><a href="">Change Info</a></li>
            <li class="btn delete"><a href="">New Home</a></li>
          </ul>
        </li>`
  );
  let loadedCatsPage = indexPage.toString().replace('{{catsList}}', myCats);
  res.write(loadedCatsPage);
  res.end();
}

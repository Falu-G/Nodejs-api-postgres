const express = require('express');
var multer  = require('multer');
const bodyParser = require('body-parser');
const app = express();
const db = require('./queries');
const port = 3000;
var upload = multer({ dest: 'avatars/' });
const { v4: uuidv4 } = require('uuid');

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
});


app.get('/players', db.getPlayers);
app.get('/player/:id', db.getPlayerById);
app.post('/player',upload.single('avatar'), db.createPlayer);
app.put('/player/avatar/:id',upload.single('avatar'), db.updatePlayer);
app.patch('/player/:id',db.patialupdatePlayer);
app.delete('/player/:id', db.deletePlayer);

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})

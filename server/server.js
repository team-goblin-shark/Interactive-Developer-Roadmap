const express = require('express');
const bodyParser = require('body-parser');
const { getData, getCategory, fakeData } = require('./dbController.js');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

<<<<<<< HEAD
app.get('/api/resources/:id', getData);

app.get('/api/category', getCategory);

=======
// app.get('/', (req, res) => res.send('Hello World!'));

// app.get('/fakeData', fakeData);
// console.log(process.env);
app.get('/api/resources/:id', getData);

app.get('/api/category', getCategory);

>>>>>>> 923dc58c2e56540c92353e699f3809fffaeb3d9d
app.listen(port, () => console.log(`listening on port ${port}!`));

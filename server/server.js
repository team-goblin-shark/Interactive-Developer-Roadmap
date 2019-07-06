const express = require('express');
const pg = require('pg');
const { getData } = require('./dbController.js');

const app = express();
const port = 3000;


const conString = 'postgres://kupqjigy:vzZUKkBtNXGMFp-r8jpmUdRp7L1_JJtY@raja.db.elephantsql.com:5432/kupqjigy';
const client = new pg.Client(conString);
// client.connect((err) => {
//   if (err) {
//     return console.error('could not connect to postgres', err);
//   }
//   client.query('SELECT NOW() AS "theTime"', (err, result) => {
//     if (err) {
//       return console.error('error running query', err);
//     }
//     console.log(result.rows[0].theTime);
//   });
// });


app.get('/', (req, res) => res.send('Hello World!'));

app.get('/resources', getData);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

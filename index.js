const express = require('express');

const app = express();
const port = 3001;
const connetToMongoDB = require('./lib/db');
const apiRoutes = require('./routes/Api');

connetToMongoDB();

app.use(express.json());

app.listen(process.env.PORT || port, () => {
  console.log(`Example app listening on port ${process.env.PORT || port}`);
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api', apiRoutes);

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

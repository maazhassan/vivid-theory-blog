import express from 'express';
import cors from 'cors';
import { sequelize, testDbConnection } from './services/db.js';
import { router } from './routes/index.js';

sequelize.sync();
testDbConnection();
const app = express();
const port = process.env.SERVER_PORT || 3000;

app.use(cors());

app.use(express.static('public'));

app.use(router);

app.listen(port, () => {
  console.log(`API listening on port ${port}`)
});
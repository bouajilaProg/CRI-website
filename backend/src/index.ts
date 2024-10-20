//imports 
import express, { Request, Response } from 'express';
const app = express();
const PORT = process.env.PORT || 4000;
const cors = require('cors');

//import routes
import UserRouter from './routes/Users';
import MaterielRouter from './routes/Materiel';
import OrderRouter from './routes/Order';

//setup
app.use(cors([
  {
    origin: 'http://localhost:3000',
    credentials: true
  },
  {
    origin: "*",
    credentials: true
  }
]));

//middleware
app.use(express.json());

//routes
app.use('/users', UserRouter);
app.use('/materiel', MaterielRouter);
app.use('/order', OrderRouter);

//run the server
app.listen(PORT, () => {
  console.log(`Backend is running on http://localhost:${PORT}`);
});

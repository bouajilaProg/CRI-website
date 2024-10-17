//imports 
import express, { Request, Response } from 'express';
const app = express();
const PORT = process.env.PORT || 4000;
const cors = require('cors');


//setup
app.use(cors(
  {
    origin: 'http://localhost:3000',
    credentials: true
  }
));

//middleware
app.use(express.json());


//run the server
app.listen(PORT, () => {
  console.log(`Backend is running on http://localhost:${PORT}`);
});

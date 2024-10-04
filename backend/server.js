//imports 
const app = require('express')();
const cors = require('cors');


//setup
app.use(cors(
  {
    origin: 'http://localhost:3000',
    credentials: true
  }
));





//run the server
app.listen(4000);

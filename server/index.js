require('dotenv').config()
const express = require('express')
const session = require('express-session')
const massive = require('massive')
const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env
const ctrl = require('./controllers/controller')
const validCtrl = require('./controllers/validation')
const accCtrl = require('./controllers/accCountroller')
const cors = require('cors')
const app = express()


app.use(cors()); 
app.use(express.json());


app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false, 
    cookie: { maxAge: 1000*60*60*24*100 }
  })
);

massive(CONNECTION_STRING).then(db => {
  app.set('db', db);
  console.log('Database is connected');
  app.listen(SERVER_PORT, () => console.log(`Listening on port: ${SERVER_PORT}`));
});



//ENDPOINTS 
app.post('/api/valid', validCtrl.validate)
app.post('/api/submit', ctrl.submit); 
app.post('/api/signin', validCtrl.signIn)
app.post('/api/account', accCtrl.createAcc)
app.get('/api/accounts/:customer_id', accCtrl.getAccounts);



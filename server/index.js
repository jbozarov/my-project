require('dotenv').config()
const express = require('express')
const session = require('express-session')
const massive = require('massive')
const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET, STRIPE_SECRET } = process.env
const validCtrl = require('./controllers/validation')
const accCtrl = require('./controllers/accCountroller')
const stockCtrl = require('./controllers/stockController')
const stripeCtrl = require('./controllers/stripeControllers')
const cors = require('cors')
const app = express()


app.use(cors()); 
app.use(express.json());


app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true, 
    cookie: { maxAge: 1000*60*60*2 }
  })
);

massive(CONNECTION_STRING).then(db => {
  app.set('db', db);
  console.log('Database is connected');
  app.listen(SERVER_PORT, () => console.log(`Listening on port: ${SERVER_PORT}`));
});



//ENDPOINTS 
app.post('/auth/valid', validCtrl.validate)
app.post('/auth/register', validCtrl.register); 
app.post('/auth/signin', validCtrl.signIn)
app.post('/auth/logout', validCtrl.logout)
app.post('/api/account', accCtrl.createAcc)
app.get('/api/accounts/:customer_id', accCtrl.getAccounts)
app.get('/api/transactions/:account_number', accCtrl.getTransactions)


//STOCKS
app.get('/api/stocks', stockCtrl.getStocks)
app.post('/api/add', stockCtrl.addToCart)
app.get('/api/cart/:customer_order_id', stockCtrl.getCart)
app.delete('/api/removefromcart/:ticker', stockCtrl.remove)


app.post('/api/payment', stripeCtrl.pay)



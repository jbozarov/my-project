require('dotenv').config()
const express = require('express')
const session = require('express-session')
const massive = require('massive')
const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET, EMAIL, PASSWORD } = process.env
const validCtrl = require('./controllers/validation')
const accCtrl = require('./controllers/accCountroller')
const stockCtrl = require('./controllers/stockController')
const stripeCtrl = require('./controllers/stripeControllers')
const appointCtrl = require('./controllers/appointmentControllers')
const invstCtrl = require('./controllers/investmentCtrl')
const orderCtrl = require('./controllers/orderControllers')
const nodemailer = require('nodemailer')
const cors = require('cors')
const app = express()

const transporter = nodemailer.createTransport({
   service: 'gmail', 
   auth: {
      user: EMAIL, 
      pass: PASSWORD
   }
})


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
  app.set('transporter', transporter)
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
app.get('/api/transactionscustomerid/:customer_id', accCtrl.getTransByCusId)


//STOCKS
app.get('/api/stocks', stockCtrl.getStocks)
app.post('/api/add', stockCtrl.addToCart)
app.get('/api/cart/:customer_order_id', stockCtrl.getCart)
app.delete('/api/removefromcart/:ticker', stockCtrl.remove)


//APPOINTMENTS
app.post('/api/schedules', appointCtrl.getSchedules)
app.put('/api/make', appointCtrl.makeApp)

app.post('/api/payment', stripeCtrl.pay)

//INVESTMENTS 
app.get('/api/investments/:customer_id', invstCtrl.getInvestments)

//ORDERS 
app.get('/api/getbuyorders', orderCtrl.getBuyOrders)
app.post('/api/addbuyorders', orderCtrl.addBuyOrder)
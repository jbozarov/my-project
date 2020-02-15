


module.exports = {
   getBuyOrders: (req, res) => {
      const db = req.app.get('db')
      db.orders.get_buy_orders()
      .then(buyorders => res.status(200).send(buyorders))
      .catch(err => res.status(500).send('getBuyOrders error: ', err))
   }, 
   addBuyOrder: (req, res) => {
      const db = req.app.get('db')
      const { customer_id, orderType, ticker, qty, wantedPrice } = req.body
      const wanted_price = wantedPrice; 
      const order_type = orderType; 
      console.log(customer_id, orderType, ticker, qty, wantedPrice)
      db.orders.add_buy_order([customer_id, order_type, ticker, qty, wanted_price])
   }
}
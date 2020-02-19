


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
      .then(response => res.status(200).send('added, orderctrl, line 18'))
      .catch(err => res.status(500).send('addBuyOrders error: ', err))
   }, 
   deleteBuyOrder: (req, res) => {
      const db = req.app.get('db')
      const { buy_order_id } = req.params

      db.orders.delete_buy_order(buy_order_id)
      .then(() => res.sendStatus(200))
      .catch(err => res.status(500).send('cannot delete: ', err))
   }, 
   editBuyOrder: (req, res) => {
      const db = req.app.get('db')
      console.log(req.body)
      const { buyOrderId, type, price } = req.body
      console.log('line 33 order ctrl: ', buyOrderId, type, price)
      // let buy_order_id = buyOrderId
      // let order_type = type
      // let wanted_price = price
      // console.log('line 37 ', buy_order_id, order_type, wanted_price)
      db.orders.edit_buy_order([buyOrderId, type, price])
      .then(response => res.status(200).send('Edited'))
      .catch(err => res.status(500).send('cannot edit : ', err))
   },
   getSellOrders: (req, res) => {
      const db = req.app.get('db')
      db.orders.get_sell_orders()
      .then(sellorders => res.status(200).send(sellorders))
      .catch(err => res.status(500).send('getBuyOrders error: ', err))
   },
   addSellOrder: (req, res) => {
      const db = req.app.get('db')
      const { customer_id, orderType, ticker, qty, wantedPrice } = req.body
      const wanted_price = wantedPrice; 
      const order_type = orderType; 
      console.log(customer_id, orderType, ticker, qty, wantedPrice)
      db.orders.add_sell_order([customer_id, order_type, ticker, qty, wanted_price])
      .then(response => res.status(200).send('added, orderctrl, line 18'))
      .catch(err => res.status(500).send('addBuyOrders error: ', err))
   }, 
   deleteSellOrder: (req, res) => {
      const db = req.app.get('db')
      const { sell_order_id } = req.params

      db.orders.delete_sell_order(sell_order_id)
      .then(() => res.sendStatus(200))
      .catch(err => res.status(500).send('cannot delete: ', err))
   }, 
   editSellOrder: (req, res) => {
      const db = req.app.get('db')
      console.log(req.body)
      const { sellOrderId, type, price } = req.body
      console.log('line 33 order ctrl: ', sellOrderId, type, price)
      db.orders.edit_sell_order([sellOrderId, type, price])
      .then(response => res.status(200).send('Edited'))
      .catch(err => res.status(500).send('cannot edit : ', err))
   },
}
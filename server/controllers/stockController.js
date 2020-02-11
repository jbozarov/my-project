

module.exports = {
    getStocks: async (req, res) => {
        const db = req.app.get('db')

        await db.securities.get_stocks()
        .then(stocks => res.status(200).send(stocks))
    },
    addToCart: (req, res) => {
       const db = req.app.get('db')
       const { customer_order_id, ticker, qty, price, total } = req.body 
       console.log({ customer_order_id, ticker, qty, price, total })

       db.cart.add_to_cart([customer_order_id, ticker, qty, price, total])
       .then(data => res.sendStatus(200))
       .catch(err => res.status(500).send(err))
    }, 
    getCart: (req, res) => {
       const db = req.app.get('db')
       const { customer_order_id } = req.params 
       console.log('line 22: ', customer_order_id)

       db.cart.get_cart( customer_order_id ) 
       .then(items => res.status(200).send(items))
       .catch(error => res.status(500).send(error))
    }, 
    remove: (req, res) => {
       const { ticker } = req.params
       req.app.get('db').cart.remove_from_cart(ticker)
       .then(() => res.sendStatus(200))
       .catch(err => res.status(500).send(err))
    }
}
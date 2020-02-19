

module.exports =  {
    createAcc: async(req, res) => {
        const db = req.app.get('db')
        const { account_number, customer_id, account_type, balance } = req.body

        const newAccount = await db.accounts.create_account([account_number, customer_id, account_type, balance])
        res.status(200).send(newAccount); 
    },
    getAccounts: async(req, res) => {
        const db = req.app.get('db')
        const { customer_id } = req.params

        await db.accounts.get_accounts(customer_id)
        .then(response => res.status(200).send(response))
    }, 
    getTransactions: async(req, res) => {
        const db = req.app.get('db') 
        const { account_number } = req.params
        console.log('accCTRL 21 ', account_number)

        await db.transactions.get_transactions(account_number)
        .then(transactions => res.status(200).send(transactions))
    },
    getTransByCusId: async(req, res) => {
        const db = req.app.get('db') 
        const { customer_id } = req.params
        console.log('accCTRL 21 ', customer_id)

        await db.transactions.get_trans_by_cusid(customer_id)
        .then(transactions => res.status(200).send(transactions))
    },
    addSellTransaction: (req, res) => {
      const db = req.app.get('db') 
      const { price, qty, total } = req.body; 
      console.log('accCtrl add sell trans ', price, qty, total)
      let today = new Date().toLocaleDateString()
      let account_number = '4242424242424242'
      let selling = 'Selling stocks'
      db.transactions.create_transaction([account_number, total, selling, today, 'gain'])
      .then(() => res.sendStatus(200))
      .catch(err => res.status(500).send('Err in addSellTransactions ', err))
    }
}
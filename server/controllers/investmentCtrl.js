


module.exports = {
   getInvestments: (req, res) => {
      const db = req.app.get('db')
      const { customer_id } = req.params
      db.investments.get_investments(customer_id)
      .then(response => res.status(200).send(response))
      .catch(err => res.status(500).send('error in invest ctrl'))
   },
   sellInvestment: (req, res) => {
      const db = req.app.get('db')
      const { investment_id } = req.params
      db.investments.delete_investment(investment_id)

   }
}
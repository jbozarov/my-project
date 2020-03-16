const stripe = require('stripe')(process.env.STRIPE_SECRET)
const EMAIL = process.env

const mailOptions = {
   from: EMAIL, 
   to: '', 
   subject: 'You sold your stocks', 
   text: 'Selling confirmation '
}


module.exports = {
   getInvestments: (req, res) => {
      const db = req.app.get('db')
      const { customer_id } = req.params
      db.investments.get_investments(customer_id)
      .then(response => res.status(200).send(response))
      .catch(err => res.status(500).send(err))
   },
   sellInvestment: (req, res) => {
      const db = req.app.get('db')
      const transporter = req.app.get('transporter')
      const { investment_id } = req.params
      db.investments.delete_investment(investment_id)
      const customMailOptions = {...mailOptions}
      transporter.sendMail(customMailOptions, (err, data) => {
         if(err) {
            console.log(err)
         } else {
            console.log('email confirmation sent')
            console.log(data)
         }
      })

   }
}
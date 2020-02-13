const stripe = require('stripe')(process.env.STRIPE_SECRET)
const EMAIL = process.env


const mailOptions = {
   from: EMAIL, 
   to: '', 
   subject: 'Thanks you for  investing', 
   text: 'THANKS '
}


module.exports = {
    pay: (req,res)=>{
        const db = req.app.get('db')
        const transporter = req.app.get('transporter')
        const {token:{id}, amount, customer_order_id, customer_id, email } = req.body;
        console.log('stripe line 7: ', amount, customer_order_id, customer_id, email)
        stripe.charges.create(
            {
                amount: amount,
                currency:'usd',
                source:id,
                description:'Test Charge'
            },
            async (err, charge) => {
                if(err) {
                    console.log('error line: 17 ', err)
                    return res.status(500).send(err)
                } else {
                  let today = new Date().toLocaleDateString()
                    let newTransaction = {
                       account_number: '4242424242424242', 
                       amount: charge.amount/100, 
                       description: charge.description, 
                       transaction_date: today
                    }

                    const cart = await db.cart.get_cart( customer_order_id ) 
                  //   const orderDetails: 
                    const {ticker, qty, price, total } = cart[0]
                    const customMailOptions = {...mailOptions, to: email, text: `Your purchase details: Stockes: ${ticker}, Quantity: ${qty}, price: ${price}, total:  ${total}`}
                    transporter.sendMail(customMailOptions, (err, data) => {
                       if(err) {
                          console.log(err)
                       } else {
                          console.log('email confirmation sent')
                          console.log(data)
                       }
                    })
                    db.transactions.create_transaction([newTransaction.account_number, newTransaction.amount, newTransaction.description, newTransaction.transaction_date])
                    const balance = await db.accounts.get_balance(newTransaction.account_number)
                    console.log('account bal: ', balance, parseFloat(balance[0].balance), parseFloat(newTransaction.amount))
                    db.accounts.update_account_balance([parseFloat(balance[0].balance)-parseFloat(newTransaction.amount), newTransaction.account_number])
                    db.cart.update_to_paid(customer_order_id)
                    db.cart.create_order(customer_id)
                    return res.status(200).send(charge)
                }
            }
        ) 
    },
}
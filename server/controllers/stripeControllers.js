const stripe = require('stripe')(process.env.STRIPE_SECRET)

module.exports = {
    pay: (req,res)=>{
        const db = req.app.get('db')
        const {token:{id}, amount, customer_order_id, customer_id } = req.body;
        console.log('stripe line 7: ', amount, customer_order_id, customer_id)
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
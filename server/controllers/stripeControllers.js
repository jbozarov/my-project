const stripe = require('stripe')(process.env.STRIPE_SECRET)

module.exports = {
    pay:(req,res)=>{
        // const db = req.app.get('db')
        const {token:{id},amount} = req.body;
        console.log(id,amount,stripe)
        stripe.charges.create(
            {
                amount:amount,
                currency:'usd',
                source:id,
                description:'Test Charge'
            },
            (err, charge) => {
                if(err) {
                    console.log(err)
                    return res.status(500).send(err)
                } else {
                    console.log('Successful payment',charge)
                    //this is where you would do something with that purchase (i.e. store that information to your db)
                    return res.status(200).send(charge)
                }
            }
        )
    },
}
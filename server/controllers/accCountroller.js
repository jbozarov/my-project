

module.exports =  {
    createAcc: async(req, res) => {
        const db = req.app.get('db')
        const { account_number, customer_id, account_type, balance } = req.body

        const newAccount = await db.create_account([account_number, customer_id, account_type, balance])
        res.status(200).send(newAccount); 
    },
    getAccounts: async(req, res) => {
        const db = req.app.get('db')
        const { customer_id } = req.params

        await db.get_accounts(customer_id)
        .then(response => res.status(200).send(response))
    }
}
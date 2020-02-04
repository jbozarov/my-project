const bcrypt = require('bcryptjs'); 

module.exports = {
    submit: async (req, res) => {
        const { first_name, last_name, birth_date, street, city, state, country, zip_code, login, password } = req.body; 
        const db = req.app.get('db'); 

        console.log('Before ', { first_name, last_name, birth_date, street, city, state, country, zip_code, login, password })
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt); 

        let newCustomer = await db.create_customer([first_name, last_name, birth_date, street, city, state, country, zip_code, login, hash])
        console.log('submit, line 12: ', newCustomer[0]); 
        res.status(200).send(newCustomer[0]); 
    }
}
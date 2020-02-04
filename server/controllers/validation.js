const bcrypt = require('bcryptjs'); 

module.exports = {
    validate: async (req, res) => {
        const db = req.app.get('db'); 
        const { login } = req.body; 
        let user = await db.check_login(login)

        if (user[0]) {
            return res.status(400).send('Username is already taken')
        }
        res.status(200).send('Username is available')
    },
    signIn: async (req, res) => {
        const db = req.app.get('db');
        const {login, password} = req.body; 
        let user = await db.check_login(login)

        if(!user[0]) {
            return res.status(400).send('Incorrect email')
        }
        let validated = bcrypt.compareSync(password, user[0].hash)
        if(!validated) return res.status(400).send('Incorrect password')
        req.session.user = {first_name: user[0].first_name, customer_id: user[0].customer_id}
        return res.status(200).send(req.session.user); 
    },
}
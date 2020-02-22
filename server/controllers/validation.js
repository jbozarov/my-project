const bcrypt = require('bcryptjs'); 
const {EMAIL} = process.env


const mailOptions = {
   from: EMAIL,
   to: '',
   subject: 'Thanks for registering',
   text: 'Thanks for creating account with ABC Bank!.'
 }
module.exports = {
   validate: async (req, res) => {
        const db = req.app.get('db'); 
        const { email } = req.body; 
        let user = await db.customers.check_login(email)

        if (user[0]) {
            return res.status(400).send('Username is already taken')
        }
        res.status(200).send('Username is available')
    },
   register: async (req, res) => {
      const { first_name, last_name, email, password } = req.body; 
      const db = req.app.get('db'); 
      const transporter = req.app.get('transporter')
      const { session } = req

      const salt = bcrypt.genSaltSync(10)
      const hash = bcrypt.hashSync(password, salt); 
      let newCustomer = await db.customers.create_customer([first_name, last_name, email, hash])
      const customMailOptions = {...mailOptions, to: email}
      transporter.sendMail(customMailOptions, (err, data) => {
         if(err){
           console.log(err)
         }else {
           console.log('email sent')
           console.log(data)
         }
       })

      let userCart = await db.cart.create_order(newCustomer[0].customer_id)
      session.user = {...newCustomer[0], ...userCart[0]}
      res.status(200).send(session.user); 
  },
    signIn: async (req, res) => {
        const db = req.app.get('db');
        const {email, password} = req.body; 
        const { session } = req
        let user = await db.customers.check_login(email)


        if(!user[0]) {
            return res.status(400).send('Incorrect email')
        }
        console.log(user)
        let validated = bcrypt.compareSync(password, user[0].hash)
        if(!validated) return res.status(401).send('Incorrect password')
        delete user[0].hash
        session.user = user[0]
        return res.status(200).send(session.user); 
    },
    logout: (req, res) => {
       const { session } = req
       session.destroy(); 
       res.sendStatus(200)
    }
}
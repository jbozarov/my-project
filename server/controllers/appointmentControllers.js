

module.exports = {
   getSchedules:  ( req, res ) => {
      const db = req.app.get('db')
      const { selectedDate } = req.body
      console.log('appointCtrl ', req.body) 

       db.appointments.get_schedules(selectedDate)
      .then(response => res.status(200).send(response))
   }, 
   makeApp: (req, res ) => {
      const db = req.app.get('db')
      const { date, time } = req.body 
      console.log(date, time)

      db.appointments.make_appointment([date, time]) 
      .then(response => res.sendStatus(200))
      .catch(err => console.log(err))

   }
}
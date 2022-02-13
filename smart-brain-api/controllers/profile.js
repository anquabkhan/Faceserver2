const handleprofile = (req, res, db, bcrypt) =>  {
    const { id } = req.params 
    // res.json('asdadad')
    db.select('*').from('users').where({id})
      .then(user => {
          if (user.length){
            res.json(user[0])
          }else{
              res.status(400).json("User not found")
          }
      })
      .catch(err => res.status(400).json("Id not found"))
  
}

module.exports = {
    handleprofile
}
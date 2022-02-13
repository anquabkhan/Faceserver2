const Clarifai = require('Clarifai') 

const app = new Clarifai.App({
    apiKey: 'f3663f421d0143499b2ab199c70c390e'
   });

const handleAPiCall = (req, res) =>{
    console.log("inside ApiCall")
    app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input )
    .then(data => {
        res.json(data)
    })
    .catch(err => res.status(400).json('unable to work with Api'))
}   
 

const handleimage = (req, res, db, bcrypt) =>  {
    console.log("inside user")
    const { id } = req.body
    db("users").where('id', '=', id )
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        console.log(entries)
        if (entries.length == 0){
            res.json("id not found")
        }
        else{
            res.json(entries[0])
        }
    })
    .catch(err => res.status(400).json("unable to get entries"))
}

module.exports = {
    handleimage ,
    handleAPiCall 
}
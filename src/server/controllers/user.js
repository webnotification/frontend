import mongoose from 'mongoose';
let User = mongoose.model('User');

let createOne = (req, res, next)=>{
  var data = {
    name: req.body.name,
    company: req.body.company,
    email: req.body.email,
    website: req.body.website,
    is_verified: true,
    created_at: (new Date()).toISOString()
  };

  console.log('Registering new user', data);
  console.log('Has Password: ', req.body.password);
  User.register(data, req.body.password, function(err){
    if (err){
      console.log('Registration:Failed: ', err)
      res.status(400).json({
        status: 'error',
        result: err
      });
    }else{
      console.log('Registration:Success')
      res.json({
        status: 'OK',
        registered: true,
        result: data
      })
    }
  });
}

export default {
  create: createOne
}

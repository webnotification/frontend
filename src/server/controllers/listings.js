import Store from '../helpers/modelStore';

let User = Store.model('listing');

function fetchAll(req, res, next){
  res.send('Sending All Users');
}

function fetchOne(req, res, next){
  res.send('One User: ' + req.params.id);
}

function createOne(req, res, next){
  let data = {
    email: req.body.email,
    username: req.body.username,
    password: req.body.password
  };
  User.create(data).then((user)=>{
    res.json({
      message: 'Creating one user',
      result : user
    });
  });
}

function removeOne(req, res, next){
  res.send('Removing one: ' + req.params.id);
}

function updateOne(req, res, next){
  res.send('Updating user: ' + req.params.id);
}


let stuff = {
  list  : fetchAll,
  fetch : fetchOne,
  remove: removeOne,
  update: updateOne,
  create: createOne
};

export default stuff;

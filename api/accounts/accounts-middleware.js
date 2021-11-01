const Account = require('./accounts-model.js');

exports.checkAccountPayload = (req, res, next) => {
  const { name, budget } = req.body
  if(!name || budget === undefined) {
    res.status(400).json({ message: "name and budget are required" })
  }else if (
    typeof name !=='string') {res.status(400).json({ message: "name of account must be a string" })
  }else if(name.length < 3 ||
    name.trim().length < 3 ||
    name.length > 100) {
      res.status(400).json({ message: "name of account must be between 3 and 100" })
    }else if(
      typeof budget !== 'number'
    ){
      res.status(400).json({ message: "budget of account must be a number" })
  } else if(budget < 0 || budget > 100000){
    res.status(400).json({ message: "budget of account is too large or too small" })
  } else{
    next()
  }
}

exports.checkAccountNameUnique = (req, res, next) => {
  // DO YOUR MAGIC
  const { name } = req.body
  Account.getByName(name)
  .then(found => {
    if(found) {
      res.status(400).json({ message: "that name is taken" })
    } else {
      next()
    }
  })
}

exports.checkAccountId = (req, res, next) => {
  // DO YOUR MAGIC
  Account.getById(req.params.id)
    .then(possibleAccount => {
      if(possibleAccount) {
        req.accountFromDb = possibleAccount
        next()
      } else {
        res.status(404).json({ message: "account not found"})
      }
    })
  .catch(err => {
    console.log(err)
  })
}

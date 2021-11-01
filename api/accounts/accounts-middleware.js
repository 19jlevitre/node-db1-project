const Account = require('./accounts-model.js');

exports.checkAccountPayload = (req, res, next) => {
  

}

exports.checkAccountNameUnique = (req, res, next) => {
  // DO YOUR MAGIC
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

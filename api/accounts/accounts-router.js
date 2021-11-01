const router = require('express').Router()
const Account = require('./accounts-model.js');
const { checkAccountId, checkAccountPayload, checkAccountNameUnique } = require('./accounts-middleware.js');
router.get('/', async (req, res, next) => {
  
  try {
  const accounts = await Account.getAll()
  res.json(accounts)
  } catch (err) {
    console.log(err)
  }
})

router.get('/:id', checkAccountId, (req, res, next) => {
  res.status(200).json(req.accountFromDb);
})

router.post('/',  checkAccountPayload, checkAccountNameUnique,  (req, res, next) => {
  const { name, budget } = req.body

  Account.create({name: name.trim(), budget: budget})
  .then(newAccount => {
    res.status(201).json(newAccount);
  }).catch(next)
})

router.put('/:id', checkAccountPayload, checkAccountId, async (req, res, next) => {
  try {
    const data = await Account.updateById(req.params.id, req.body)
    res.json(data)
  } catch(err){
  console.log(err)
  }
});

router.delete('/:id', (req, res, next) => {
  // DO YOUR MAGIC
})

router.use((err, req, res, next) => { // eslint-disable-line
  // DO YOUR MAGIC
})

module.exports = router;

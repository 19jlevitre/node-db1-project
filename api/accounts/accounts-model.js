const db = require('../../data/db-config.js');

const getAll =  async () => {
  const result = await db('accounts')
  return result 
}

const getById =  async id => {
  // DO YOUR MAGIC
  const result = await db('accounts').where('id', id).first()
  return result
}

const create =  async account => {
  // DO YOUR MAGIC
  const [id] = await db('accounts').insert(account)
  const newAccount = await getById(id)
  return newAccount
}

const getByName = async name => {
  const result =  await db('accounts').where('name', name).first()
  return result
}

const updateById =  async (id, account) => {
  // DO YOUR MAGIC
  await db('accounts').update(account).where('id',id)
  return getById(id)
}

const deleteById = id => {
  // DO YOUR MAGIC
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
  getByName,
}

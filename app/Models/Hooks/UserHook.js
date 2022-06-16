'use strict'
const Hash = use('Hash')

const UserHook = (exports = module.exports = {})

UserHook.hashPass = async user => {
  if (user.dirty.password) {
    user.password = await Hash.make(user.password)
  }
}
UserHook.validate = async user => {
  if (!user.username) {
    throw new Error('ts mety io username io ')
  }
}

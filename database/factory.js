'use strict'


/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Hash = use('Hash')

Factory.blueprint('App/Models/User', async faker => {
  return {
    username: faker.username(),
    email: faker.email(),
    password: await Hash.make(faker.password())
  }
})
Factory.blueprint('App/Models/Post', async (faker) => {
  return {
    title: faker.sentence(),
    description: faker.paragraph(),
    user_id: await Factory.model('App/Models/User')
      .create()
      .then(user => user.id)
  }
})

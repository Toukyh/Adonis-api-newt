'use strict'
const User = use('App/Models/User')
const { validate } = use('Validator')

class AuthController {
  async register ({ request, auth, response }) {
    let user = await User.create(request.all())
    //generate token for user;
    let token = await auth.generate(user)
    Object.assign(user, token)

    return response.json(user)
  }

  async login ({ request, auth, response }) {
    let { email, password } = request.all()

    try {
      if (await auth.attempt(email, password)) {
        let user = await User.findBy('email', email)
        let token = await auth.generate(user)

        Object.assign(user, token)
        return response.json(user)
      }
    } catch (e) {
      // console.log(e)
      return response.json({ message: 'invalid credentials!' })
    }
  }
  async authenticated ({ auth, response }) {
    try {
      const user = await auth.getUser()
      return response.json(user.id)
    } catch (error) {
      response.send('Missing or invalid api token')
    }
  }
}

module.exports = AuthController

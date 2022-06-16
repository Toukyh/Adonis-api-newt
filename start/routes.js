'use strict'



/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.group(()=>{
  Route.post('/register', 'AuthController.register').middleware('guest')
  Route.post('/login', 'AuthController.login').middleware('guest')

  Route.get('/authenticated', 'AuthController.authenticated').middleware('auth')
  Route.resource('post','PostController').middleware('auth').apiOnly()
}).prefix('api')

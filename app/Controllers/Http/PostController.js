'use strict'

const User = require('../../Models/User')

const Post = use('App/Models/Post')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with posts
 */
class PostController {
  /**
   * Show a list of all posts.
   * GET posts
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response }) {
    let posts = await Post.query()
      .with('user')
      .fetch()

    return response.json(posts)
  }

  /**
   * Create/save a new post.
   * POST posts
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, auth, response }) {
    try {
      let post = await auth.user.posts().create(request.all())
      await post.load('user')
      return response.json(post)
    } catch (e) {
      // console.log(e)
      return response.json({
        message: 'You are not authorized to perform this action'
      })
    }
  }

  /**
   * Display a single post.
   * GET posts/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response }) {
    const res = await Post.find(params.id)
    return response.json(res)
  }

  /**
   * Update post details.
   * PUT or PATCH posts/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ auth, params, response, request }) {
    let post = await Post.find(params.id)
    let user = await auth.getUser()
    if (post.user_id != user.id) {
      return response.json({ msg: 'you cant modif this post' })
    }else{
      post.title = request.input('title')
      post.description = request.input('description')

      await post.save()
      // si on veut afficher l'user associer a cette post en particulier
      await post.load('user')
      return response.json(post)
    }
  }
  /**
   * Delete a post with id.
   * DELETE posts/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({auth, params, request, response }) {
    const post = await Post.find(params.id)
    let user = await auth.getUser()
    if (post.user_id != user.id) {
      return response.json({ msg: 'you cant delete this post' })
    }else{
    await post.delete()
    return response.json({ msg: 'the post has been deleted successfully' })
    }
  }
}

module.exports = PostController

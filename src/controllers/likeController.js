const Post = require('../models/Post')

module.exports = {
  async like(req, res) {
    const post = await Post.findById(req.params.id)
    post.likes += 1
    await post.save()
    const posts = await Post.find()

    const postsReverse = [...posts].reverse()

    req.io.emit('liked', post)
    return res.send(postsReverse)
  },
  async deslike(req, res) {
    const post = await Post.findById(req.params.id)
    post.likes -= 1
    await post.save()
    const posts = await Post.find()
    postsReverse = [...posts].reverse()

    req.io.emit('desliked', post)
    return res.send(postsReverse)
  }
}

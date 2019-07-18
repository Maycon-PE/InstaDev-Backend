const Post = require('../models/Post')
const path = require('path')
const fs = require('fs')

module.exports =  {
  async posts(req, res) {
    const id = req.params.id
    Post.findById(id)
      .then(response => {
        fs.unlinkSync(path.resolve(__dirname, '..', '..', 'uploads', 'resized', response.image))
        response.remove()
      })
      .then(async () => {
        const posts = await Post.find()
        const postsReverse = [...posts].reverse()
        req.io.emit('deleted', postsReverse)
        return res.send(postsReverse)
      })
  }
}

const Post = require('../models/Post')
const sharp = require('sharp') // redimencionamento de imagens
const path = require('path')
const fs = require('fs')

module.exports = {
  async index(req, res) {
    const posts = await Post.find()
    const postsReverse = [...posts].reverse()

    return res.send(postsReverse)
  },
  async store(req, res) {
    const { author, place, description, hashtags, socket } = req.body
    const { filename: image } = req.file

    const [ name ] = image.split('.')

    const fileName = `${name}.jpg`

    await sharp(req.file.path)
      .resize(500)
      .jpeg({ quality: 70 })
      .toFile(
        path.resolve(req.file.destination, 'resized', fileName)
      )

    fs.unlinkSync(req.file.path)
    const post = await Post.create({
      author,
      place,
      description,
      hashtags,
      image: fileName
    })


    req.io.emit('posted', post)

    return res.json(post)
  }
}

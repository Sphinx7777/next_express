const express = require('express')
const next = require('next')
const PostModel = require('./model/postModel')
const mongoose = require('mongoose')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()



app.prepare().then(() => {
  const server = express()
  server.use(express.json())

  const Start = async () => {
    try {
      await mongoose.connect('mongodb+srv://sfinx:333666@cluster0-qxxie.mongodb.net/testDBGold?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
      server.listen(port, err => {
        if (err) throw err
        console.log(`> Ready on http://localhost:${port}`)
      })
    } catch (err) {
      console.log(`some error ${err}`)
    }
  }

  server.get(
    '/posts/all',
    async (req, res) => {
      try {
        const posts = await PostModel.find({});
        return res.status(200).json({ data: posts });
      } catch (err) {
        res.status(500).json(`some error ${err.message}`)
      }
    })

  server.post(
    '/posts/add',
    async (req, res) => {
      try {
        const createdPost = await PostModel.create(req.body);
        res.json(createdPost)
      } catch (err) {
        res.status(500).json(`some error ${err.message}`)
      }
    })

  server.delete(
    '/posts/del/:id',
    async (req, res) => {
      try {
        await PostModel.deleteOne({ _id: req.params.id })
        res.json({ id: req.params.id })
      } catch (err) {
        res.status(500).json(`some error ${err.message}`)
      }
    })

  server.put(
    '/posts/update/:id',
    async (req, res) => {
      try {
        await PostModel.findOneAndUpdate({ _id: req.params.id }, req.body);
        const updatePost = await PostModel.findOne({ _id: req.params.id });
        res.json(updatePost)
      } catch (err) {
        res.status(500).json(`some error ${err.message}`)
      }
    })

  server.get(
    '/view/:id', 
    async (req, res) => {
    const post = await PostModel.findOne({_id: req.params.id});
    return app.render(req, res, '/view', {post, id: req.params.id})
  })

  server.get('/b', (req, res) => {
    return app.render(req, res, '/b', req.query)
  })

  server.get('/posts', async (req, res) => {
    const posts = await PostModel.find({});
    return app.render(req, res, '/posts', posts)
  })

  server.get('/', async (req, res) => {
    return app.render(req, res, '/index', req.query)
  })

  server.all('*', (req, res) => {
    return handle(req, res)
  })
  Start()
})

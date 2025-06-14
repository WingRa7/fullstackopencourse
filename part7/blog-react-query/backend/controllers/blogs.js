const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const jwt = require('jsonwebtoken')

blogsRouter.post('/', async (request, response) => {
  const body = request.body

  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  const user = request.user

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id,
    comments: [],
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  const responseBlog = await Blog.findById(savedBlog._id).populate('user', {
    username: 1,
    name: 1,
  })
  response.status(201).json(responseBlog)
})

blogsRouter.post('/:id/comments', async (request, response) => {
  const comment = request.body
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    blog.comments.push(comment)
    blog.save()
    response.json(blog)
  } else {
    response.status(404).end()
  }
})

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  const blog = await Blog.findById(request.params.id)
  if (!blog) {
    return response.status(404).json({ error: 'blog not found' })
  }
  const user = request.user
  if (user._id.toString() !== blog.user.toString()) {
    return response.status(403).json({ error: 'must be creator to delete' })
  }
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const blogUpdate = request.body
  try {
    const updatedBlog = await Blog.findOneAndUpdate(
      { _id: request.params.id },
      blogUpdate,
      { new: true }
    ).populate('user', { username: 1, name: 1 })
    response.json(updatedBlog)
  } catch {
    response.status(404).end()
  }
})

module.exports = blogsRouter

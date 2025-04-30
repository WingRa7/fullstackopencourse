const assert = require('node:assert')
const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

describe('when there is initially some blogs saved', () => {

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('blogs are successfully returned', async () => {
    const response = await api
      .get('/api/blogs')

    assert.strictEqual(response.body.length, helper.initialBlogs.length)
  })

  test('blog post has property: id', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
    const blogKeys = Object.keys(response.body[0])
    assert(blogKeys.find( k => k === 'id'))

  })

  test('blog post succesfully created', async () => {
    const newBlog = {
      title: 'An archive for the 1980s microcomputer revolution',
      author: 'Steve Lowry',
      url: 'https://clp.bbcrewind.co.uk/history',
      likes: 8
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

    const titles = blogsAtEnd.map(b => b.title)
    assert(titles.includes('An archive for the 1980s microcomputer revolution'))
    const authors = blogsAtEnd.map(b => b.author)
    assert(authors.includes('Steve Lowry'))
    const urls = blogsAtEnd.map(b => b.url)
    assert(urls.includes('https://clp.bbcrewind.co.uk/history'))
  })

  describe('when post requests are missing fields', () => {
    test('blog post created without likes property defaults to 0 likes', async () => {
      const newBlog = {
        title: 'The man who built his own WH Smith',
        author: 'Lewis Packwood',
        url: 'https://filmstories.co.uk/features/the-man-who-built-his-own-wh-smith/',
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()
      const blogMissLikes = blogsAtEnd.find((b) => b.title === 'The man who built his own WH Smith' )
      assert(blogMissLikes.likes === 0)
    })

    test('blog post created without title property returns status code 400 Bad Request', async () => {
      const newBlog = {
        author: 'Bradford Morgan White',
        url: 'https://www.abortretry.fail/p/mips-for-the-masses',
        likes: 2
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
        .expect('Content-Type', /application\/json/)
    })

    test('blog post created without url property returns status code 400 Bad Request', async () => {
      const newBlog = {
        title: 'The blog that was never published',
        author: 'Dave Holloway',
        likes: 0
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
        .expect('Content-Type', /application\/json/)
    })
  })

  describe('when modifying exisiting blogs', () => {
    test ('blog post succesfully deleted', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToDelete = blogsAtStart[0]

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)

      const blogsAtEnd = await helper.blogsInDb()

      const titles = blogsAtEnd.map(b => b.title)
      assert(!titles.includes(blogToDelete.title))

      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length -1)
    })

    test ('blog post succesfully updated', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToUpdate = blogsAtStart[0]

      const updatedBlog = {
        title: 'React Patterns 2',
        author: 'Michael J Chan',
        url: 'https://reactpatterns.co.uk',
        likes: 10
      }

      await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(updatedBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()

      const titles = blogsAtEnd.map(n => n.title)
      assert(titles.includes(updatedBlog.title))

      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
    })
  })
})



after(async () => {
  await mongoose.connection.close()
})
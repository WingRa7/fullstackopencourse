const assert = require('node:assert')
const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const bcrypt = require('bcrypt')

const helper = require('./test_helper')

const User = require('../models/user')
const Blog = require('../models/blog')


beforeEach(async () => {
  await User.deleteMany({})
  await User.insertMany(helper.initialUsers)
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

describe('when there is initially some users and blogs saved', () => {

  test('users are returned as json', async () => {
    await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('users are successfully returned', async () => {
    const response = await api
      .get('/api/users')

    assert.strictEqual(response.body.length, helper.initialUsers.length)
  })

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

  test('user succesfully created', async () => {

    const newUser = {
      username: 'patrick90',
      name: 'Patrick Dubbs',
      password: 'Dublin'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, helper.initialUsers.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    assert(usernames.includes('patrick90'))
    const names = usersAtEnd.map(u => u.name)
    assert(names.includes('Patrick Dubbs'))
  })

  test('blog post succesfully created', async () => {

    const newBlog = {
      title: 'An archive for the 1980s microcomputer revolution',
      author: 'Lenny Carrots',
      url: 'https://clp.bbcrewind.co.uk/history',
      likes: 8,
      userId: '6815df37029bd474200287d2'
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
    assert(authors.includes('Lenny Carrots'))
    const urls = blogsAtEnd.map(b => b.url)
    assert(urls.includes('https://clp.bbcrewind.co.uk/history'))
  })

  describe('when post requests are missing fields', () => {
    test('blog post created without likes property defaults to 0 likes', async () => {
      const newBlog = {
        title: 'The man who built his own WH Smith',
        author: 'Michael Chan',
        url: 'https://filmstories.co.uk/features/the-man-who-built-his-own-wh-smith/',
        userId: '6815cbc4b39dcf5e3173e14c'
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
        author: 'Robert C. Martin',
        url: 'https://www.abortretry.fail/p/mips-for-the-masses',
        likes: 2,
        userId: '6815cbe20229df171e0a1db9'
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
        author: 'Robert C. Martin',
        likes: 0,
        userId: '6815cbe20229df171e0a1db9'
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

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', name: 'rooty', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'dave87',
      name: 'Dave',
      password: 'London',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    assert(usernames.includes(newUser.username))
  })

  test('creation with invalid username returns status code 400 Bad Request and error message', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'da',
      name: 'David',
      password: 'Manchester',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
      .expect({ error: 'Username must be atleast 3 characters long' })

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length)

    const usernames = usersAtEnd.map(u => u.username)
    assert(!usernames.includes(newUser.username))
  })

  test('creation with invalid password returns status code 400 Bad Request and error message', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'dave88',
      name: 'David',
      password: 'Ma',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
      .expect({ error: 'Password must be atleast 3 characters long' })

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length)

    const usernames = usersAtEnd.map(u => u.username)
    assert(!usernames.includes(newUser.username))
  })

})

after(async () => {
  await User.deleteMany({})
  await Blog.deleteMany({})
  await mongoose.connection.close()
})
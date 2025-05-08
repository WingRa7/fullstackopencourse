const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')


const initialUsers = [
  {
    _id: '6815cbc4b39dcf5e3173e14c',
    username: 'michael98',
    name: 'Michael Chan',
    passwordHash: 'VG9yb250bw==', // Toronto
    blogs: [],
    __v: 0
  },
  {
    _id: '6815cbd03541066cad1523a6',
    username: 'edsger66',
    name: 'Edsger W. Dijkstra',
    passwordHash: 'QnJpc3RvbA==', // Bristol
    blogs: [],
    __v: 0
  },
  {
    _id: '6815cbe20229df171e0a1db9',
    username: 'robert59',
    name: 'Robert C. Martin',
    passwordHash: 'TG9uZG9u', // London
    blogs: [],
    __v: 0
  },
  {
    _id: '6815df37029bd474200287d2',
    username: 'lenny59',
    name: 'Lenny Carrots',
    passwordHash: 'Q2hpY2Fnbw==', // Chicago
    blogs: [],
    __v: 0
  }
]

const initialBlogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    user: '6815cbc4b39dcf5e3173e14c',
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    user: '6815cbd03541066cad1523a6',
    __v: 0
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    user: '6815cbd03541066cad1523a6',
    __v: 0
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    user: '6815cbe20229df171e0a1db9',
    __v: 0
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    user: '6815cbe20229df171e0a1db9',
    __v: 0
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    user: '6815cbe20229df171e0a1db9',
    __v: 0
  }
]

const initialToken = () => {

  const userForToken = {
    username: 'lenny59',
    id: '6815df37029bd474200287d2',
  }

  const token = jwt.sign(
    userForToken,
    process.env.SECRET,
    { expiresIn: 60*60 }
  )

  return token
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = {
  initialBlogs, initialUsers, initialToken, blogsInDb, usersInDb
}
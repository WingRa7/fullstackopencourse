const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const result = blogs.reduce((total, blog) => {
    return total + blog.likes
  }, 0)
  return result
}

const favouriteBlog = (blogs) => {
  const result = blogs.reduce((mostLiked, blog) => {
    return blog.likes > mostLiked.likes ? blog : mostLiked
  })
  return result
}

const mostBlogs = (blogs) => {
  const result = _.chain(blogs)
    .countBy((blog) => {
      const result = blog.author
      return result
    })
    .reduce(
      (acc, count, author) => {
        const result =
          count > acc.blogs ? { author: author, blogs: count } : acc
        return result
      },
      { author: '', blogs: 0 }
    )
    .value()
  return result
}

const mostLikes = (blogs) => {
  const result = _.chain(blogs)
    .reduce((acc, value) => {
      const author = value.author
      const likes = value.likes
      acc[author] = (acc[author] || 0) + likes
      return acc
    }, {})
    .reduce(
      (acc, value, key) => {
        const result = value > acc.likes ? { author: key, likes: value } : acc
        return result
      },
      { author: '', likes: 0 }
    )
    .value()
  return result
}

module.exports = { dummy, totalLikes, favouriteBlog, mostBlogs, mostLikes }

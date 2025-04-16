const dummy = (blogs) => {
  return 1
}

const totalLikes = blogs => {
  const result = blogs.reduce((total, blog) => {
    return total + blog.likes
  }, 0)
  return result
}

const favouriteBlog = blogs => {
  const result = blogs.reduce((mostLiked, blog) => {
    return (blog.likes > mostLiked.likes ? blog : mostLiked)
  })
  return result
}

module.exports = { dummy, totalLikes, favouriteBlog }
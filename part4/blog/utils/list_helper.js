const dummy = (blogs) => {
  return 1
}

const totalLikes = blogs => {
  const result = blogs.reduce((total, blog) => {
    return total + blog.likes
  }, 0)
  return result
}

module.exports = { dummy, totalLikes }
const loginWith = async (page, username, password)  => {
  await page.locator('input[name="Username"]').fill(username)
  await page.locator('input[name="Password"]').fill(password)
  await page.getByRole('button', { name: 'Login' }).click()
}

const createBlog = async (page, title, author, url) => {
  await page.getByRole('button', { name: 'new blog' }).click()
  await page.locator('input[name="Title"]').click()
  await page.locator('input[name="Title"]').fill(title)
  await page.locator('input[name="Author"]').click()
  await page.locator('input[name="Author"]').fill(author)
  await page.locator('input[name="Url"]').click()
  await page.locator('input[name="Url"]').fill(url)
  await page.getByRole('button', { name: 'Create' }).click()
}

const populateUser = async (request) => {
  await request.post('/api/users', { data: { name: 'User0', username: 'username0', password: 'password0' } })
}

const populateUsers = async (request) => {
  await request.post('/api/users', { data: { name: 'User0', username: 'username0', password: 'password0' } })
  await request.post('/api/users', { data: { name: 'User1', username: 'username1', password: 'password1' } })
  await request.post('/api/users', { data: { name: 'User2', username: 'username2', password: 'password2' } })
}

const populateBlogs = async (request) => {

  const loginUser0 = await request.post('/api/login', {
    data: { username: 'username0', password: 'password0' } })
  const authUser0 = await loginUser0.json()
  await request.post('/api/blogs', {
    headers: { 'Authorization': authUser0.token },
    data: {
      title: 'User0 Blog Title',
      author: 'User0 Playwright',
      url: 'http://www.playwrightblogs.com/user0/1',
      likes: 5
    } })

  const loginUser1 = await request.post('/api/login', {
    data: { username: 'username1', password: 'password1' } })
  const authUser1 = await loginUser1.json()
  await request.post('/api/blogs', {
    headers: { 'Authorization': authUser1.token },
    data: {
      title: 'User1 Blog Title',
      author: 'User1 Playwright',
      url: 'http://www.playwrightblogs.com/user1/1',
      likes: 10
    } })

  const loginUser2 = await request.post('/api/login', {
    data: { username: 'username2', password: 'password2' } })
  const authUser2 = await loginUser2.json()
  await request.post('/api/blogs', {
    headers: { 'Authorization': authUser2.token },
    data: {
      title: 'User2 Blog Title',
      author: 'User2 Playwright',
      url: 'http://www.playwrightblogs.com/user2/1',
      likes: 1
    } })
}

const isDescending = (arr) => {
  if (arr.length <= 1) return true
  const result = arr.reduce((accumulator, current) => {
    if (accumulator === -1) {return -1}
    return (accumulator >= current ? current : -1)
  }, arr[0])
  if (result >= 0) {return true} else {return false}
}
//expect(isDescending(arr)).toBeTruthy()


export { loginWith, createBlog, populateUser, populateUsers, populateBlogs, isDescending }
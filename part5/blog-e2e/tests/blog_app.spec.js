const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog, populateUser, populateUsers, populateBlogs, isDescending } = require('./helper')

describe('Blog app', () => {

  describe('Populated with a single user', () => {

    beforeEach(async ({ page, request }) => {
      await request.post('/api/testing/reset')
      await populateUser(request)
      await page.goto('/')
    })

    test('Login form is shown', async ({ page }) => {
      await page.getByRole('heading', { name: 'Log in to application' })
      await page.getByText('Username')
      await page.getByText('Password')
      await page.getByRole('button', { name: 'Login' })
    })

    describe('Login', () => {

      test('succeeds with correct credentials', async ({ page }) => {
        await loginWith(page, 'username0', 'password0')
        await expect(page.getByText('User0 is logged in')).toBeVisible()
      })

      test('fails with wrong credentials', async ({ page }) => {
        await loginWith(page, 'username0', 'negative')
        const errorDiv = await page.locator('.notification')
        await expect(errorDiv).toContainText('Wrong credentials')
        await expect(page.getByText('User0 is logged in')).not.toBeVisible()
      })
    })

    describe('When logged in', () => {
      beforeEach(async ({ page }) => {
        await loginWith(page, 'username0', 'password0')
      })

      test('a new blog can be created', async ({ page }) => {
        await createBlog(page, 'User0 Blog Title', 'User0 Playwright', 'http://www.playwrightblogs.com/user0/1')
        await expect(page.getByRole('heading', { name: 'User0 Blog Title' })).toBeVisible()
      })

      test('a new blog can be liked', async ({ page }) => {
        await createBlog(page, 'User0 Blog Title', 'User0 Playwright', 'http://www.playwrightblogs.com/user0/1')
        await expect(page.getByRole('heading', { name: 'User0 Blog Title' })).toBeVisible()
        await page.getByRole('button', { name: 'View' }).click()
        await expect(page.getByText('Likes 0')).toBeVisible()
        await page.getByRole('button', { name: 'Like' }).click()
        await expect(page.getByText('Likes 1')).toBeVisible()
      })

      test('the user who added the blog can delete it', async ({ page }) => {
        await createBlog(page, 'User0 Blog Title', 'User0 Playwright', 'http://www.playwrightblogs.com/user0/1')
        await expect(page.getByRole('heading', { name: 'User0 Blog Title' })).toBeVisible()
        await page.getByRole('button', { name: 'View' }).click()
        await page.getByRole('button', { name: 'Remove' }).click()
        await expect(page.getByText('Blog deleted')).toBeVisible()
        await expect(page.getByRole('heading', { name: 'User0 Blog Title' })).not.toBeVisible()
      })
    })
  })

  describe('Populated with multiple users and blogs', () => {

    beforeEach(async ({ page, request }) => {
      await request.post('/api/testing/reset')
      await populateUsers(request)
      await populateBlogs(request)
      await page.goto('/')
      await loginWith(page, 'username1', 'password1')
      await expect(page.getByText('User1 is logged in')).toBeVisible()
    })

    test('only the user who added the blog sees the blog&apos;s delete button', async ({ page }) => {
      await createBlog(page, 'User1 Blog Title New', 'User1 Playwright', 'http://www.playwrightblogs.com/user1/2')
      await expect(page.getByRole('heading', { name: 'User1 Blog Title New' })).toBeVisible()
      const ownBlog = await page.getByText('User1 Blog Title New User1 PlaywrightHideViewhttp://www.playwrightblogs.com/')
      await ownBlog.getByRole('button', { name: 'View' }).click()
      await expect(ownBlog.getByRole('button', { name: 'Remove' })).toBeVisible()
      const notOwnBlog = await page.getByText('User0 Blog Title User0 PlaywrightHideViewhttp://www.playwrightblogs.com/')
      await notOwnBlog.getByRole('button', { name: 'View' }).click()
      await expect(notOwnBlog.getByRole('button', { name: 'Remove' })).not.toBeVisible()
    })

    test('blogs are sorted in descending order of likes', async ({ page }) => {
      const viewButtons = await page.getByTestId('viewButton').all()
      await viewButtons[0].click()
      await viewButtons[1].click()
      await viewButtons[2].click()
      const likesEleArr = await page.getByTestId('likes').allInnerTexts()
      const likesStrArr = likesEleArr.map((i) => { return i.replace(/[^0-9]+/g,'')})
      const likesNumArr = likesStrArr.map((i) => { return parseInt(i)})
      expect(isDescending(likesNumArr)).toBeTruthy()
    })

  })

})
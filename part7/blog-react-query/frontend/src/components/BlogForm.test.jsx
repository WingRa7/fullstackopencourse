import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

describe('<BlogForm/>', () => {
  let container

  const mockAddBlog = vi.fn()

  const blog = {
    title: 'Title that renders nicely',
    author: 'Harold',
    url: 'http://www.notrendered.com',
    likes: 0,
    user: '68149013f92aabca8f9f78fa',
    id: '6825f87516873ca5e15279e9',
  }

  beforeEach(() => {
    container = render(
      <BlogForm createBlog={mockAddBlog} />
    ).container
  })

  test('When a new blog is created, the correct details are passed to the function.', async () => {

    const user = userEvent.setup()
    const titleInput = container.querySelector('[name="Title"]')
    const authorInput = container.querySelector('[name="Author"]')
    const urlInput = container.querySelector('[name="Url"]')
    const submitButton = screen.getByText('Create')

    await user.type(titleInput, blog.title)
    await user.type(authorInput, blog.author)
    await user.type(urlInput, blog.url)
    await user.click(submitButton)

    expect(mockAddBlog.mock.calls).toHaveLength(1)
    expect(mockAddBlog.mock.calls[0][0].title).toBe('Title that renders nicely')
    expect(mockAddBlog.mock.calls[0][0].author).toBe('Harold')
    expect(mockAddBlog.mock.calls[0][0].url).toBe('http://www.notrendered.com')


  })

})
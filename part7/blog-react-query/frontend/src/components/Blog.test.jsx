import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog/>', () => {
  let container

  const mockHandleLike = vi.fn()

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
      <Blog blog={blog} processLike={mockHandleLike} />
    ).container
  })

  test('Renders Blog Title and Author and not URL or Likes', () => {
    const title = screen.queryByText(blog.title, { exact: false })
    const author = screen.queryByText(blog.author, { exact: false })
    const url = screen.queryByText(blog.url, { exact: false })
    const likes = screen.queryByText('Likes 0', { exact: false })

    expect(title).not.toHaveStyle('display:none')
    expect(author).not.toHaveStyle('display:none')
    expect(url).toHaveStyle('display:none')
    expect(likes).toHaveStyle('display:none')
  })

  test('When View Button clicked URL and Likes are shown', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('View')
    await user.click(button)

    const title = screen.queryByText('Title that renders nicely', {
      exact: false,
    })
    const author = screen.queryByText('Harold', { exact: false })
    const url = screen.queryByText('http://www.notrendered.com', {
      exact: false,
    })
    const likes = screen.queryByText('Likes 0', { exact: false })

    expect(title).not.toHaveStyle('display:none')
    expect(author).not.toHaveStyle('display:none')
    expect(url).not.toHaveStyle('display:none')
    expect(likes).not.toHaveStyle('display:none')
  })

  test('When Like Button is clicked twice event handler function is called twice', async () => {
    const user = userEvent.setup()
    const viewButton = screen.getByText('View')
    await user.click(viewButton)
    const likeButton = screen.getByText('Like')
    await user.click(likeButton)
    await user.click(likeButton)

    const title = screen.queryByText('Title that renders nicely', {
      exact: false,
    })
    const author = screen.queryByText('Harold', { exact: false })
    const url = screen.queryByText('http://www.notrendered.com', {
      exact: false,
    })
    const likes = screen.queryByText('Likes 0', { exact: false })

    expect(title).not.toHaveStyle('display:none')
    expect(author).not.toHaveStyle('display:none')
    expect(url).not.toHaveStyle('display:none')
    expect(likes).not.toHaveStyle('display:none')
    expect(mockHandleLike.mock.calls).toHaveLength(2)
  })
})

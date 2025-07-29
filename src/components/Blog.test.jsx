import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

const initialBlog = {
    "title": "Je fais un nouveau test",
    "author": "Didier Michou",
    "url": "test.com",
    "likes": 7,
    "user": {
      "username": "Pololo_2",
      "name": "Paul GT 2",
      "id": "6885fac405f88be7b2bf49de"
    },
    "id": "688601bf05f88be7b2bf4a4b"
  }


test('renders content', () => {

  render(<Blog blog={initialBlog} />)

  const blogTitle = screen.getByText('Je fais un nouveau test')
  const blogAuthor = screen.getByText('Didier Michou', { exact: false})
  const blogUrl = screen.queryByText('test.com')
  const blogLikes = screen.queryByText('Likes: 7')

  expect(blogTitle).toBeDefined()
  expect(blogAuthor).toBeDefined()
  expect(blogUrl).toBeNull()
  expect(blogLikes).toBeNull()
})


test('clicking the button to show details of the flog', async () => {
  
  render(<Blog blog={initialBlog} />)

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  const blogTitle = screen.getByText('Je fais un nouveau test')
  const blogAuthor = screen.getByText('Didier Michou', { exact: false})
  const blogUrl = screen.queryByText('test.com')
  const blogLikes = screen.queryByText('Likes: 7')
  const blogPostedBy = screen.queryByText('Added by Pololo_2')

  expect(blogTitle, blogAuthor, blogUrl, blogLikes, blogPostedBy).toBeDefined()
})
import { render, screen } from '@testing-library/react'
import Blog from './Blog'


test('renders content', () => {
  const blog = {
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

  render(<Blog blog={blog} />)

  const blogTitle = screen.getByText('Je fais un nouveau test')
  const blogAuthor = screen.getByText('Didier Michou', { exact: false})
  const blogUrl = screen.queryByText('test.com')
  const blogLikes = screen.queryByText('Likes: 7')

  expect(blogTitle).toBeDefined()
  expect(blogAuthor).toBeDefined()
  expect(blogUrl).toBeNull()
  expect(blogLikes).toBeNull()
})
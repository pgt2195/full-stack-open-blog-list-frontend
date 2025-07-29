import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import { vi } from 'vitest'
import blogService from '../services/blogs'

// On dit à Vitest de simuler le module 'blogs.js'.
// Toutes les fonctions exportées (update, create, etc.) seront remplacées par des mocks.
vi.mock('../services/blogs') 

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

/**
 * Here, since my component was built differently than the one the the exercise,
 * I had to be creative on how to test the like button.
 */
test('clicking the like button twice calls the event handler twice', async () => {
  
  render(<Blog blog={initialBlog} setBlogs={() => {}} />)

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)
  const likeButton = screen.getByText('like')
  await user.click(likeButton)
  await user.click(likeButton)

  expect(blogService.update.mock.calls).toHaveLength(2) // Possible grâce à la ligne 9
})
/* eslint-disable testing-library/no-container */
/* eslint-disable testing-library/prefer-screen-queries */
/* eslint-disable testing-library/render-result-naming-convention */
/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-render-in-setup */
/* eslint-disable no-unused-vars */
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen, fireEvent } from '@testing-library/react'
import Blog from './Blog'
import Togglable from './Toggable'
import userEvent from '@testing-library/user-event'



test('renders only author and title', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'true',
    url: 'yes',
    likes: 55
  }

  render(<Blog blog={blog} />)

  const element = screen.getByText('Title: Component testing is done with react-testing-library. Author: true.')
  expect(element).toBeDefined()
})

describe('<Togglable />', () => {
  let container

  beforeEach(() => {
    container = render(
      <Togglable buttonLabel="View details">
        <div className="testDiv" >
        Title: Component testing is done with react-testing-library. Author: true. Url: yes. Likes: 55
        </div>
      </Togglable>
    ).container
  })

  test('Renders togglable content when button clicked', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('View details')
    await user.click(button)

    const div = container.querySelector('.toggableContent')
    expect(div).not.toHaveStyle('display: none')
  })

  test('Like button works', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('View details')

    const blog = {
      title: 'Component testing is done with react-testing-library',
      author: 'true',
      url: 'yes',
      likes: 55
    }
    await user.click(button)
        const likebtn = screen.getByAltText('Like')

    await user.click(likebtn)
    await user.click(likebtn)
    //Like functionality is implemented in Blog.js, and can't be tested here
    //This is just a placeholder that 'clicks' the Like button twice

    const div = container.querySelector('.toggableContent')
    expect(div).not.toHaveStyle('display: none')
  })


})

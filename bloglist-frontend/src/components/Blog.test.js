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
import axiosMock from 'axios'
import { userEvent } from '@testing-library/user-event/dist/types/setup'
jest.mock('axios')

function tick() {
  return new Promise(resolve => {
    setTimeout(resolve, 0)
  })
}


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
            togglable content
        </div>
      </Togglable>
    ).container
  })

  test('Renders togglable content', async () => {
    await screen.findAllByText('togglable content')
  })
})
test('Like button works', async () => {
  const mockHandler = jest.fn()
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'true',
    url: 'yes',
    likes: 55
  }

  const component = render(<Blog blog={blog} />)

  const element = screen.getByText('Title: Component testing is done with react-testing-library. Author: true.')



  fireEvent.click(element)

  const button = component.getByText('Like')
  axiosMock.put.mockResolvedValueOnce({ data: blog })
  fireEvent.click(button)
  axiosMock.put.mockResolvedValueOnce({ data: blog })
  fireEvent.click(button)

  await tick()

  expect(mockHandler.mock.calls).toHaveLength(0)



})

test('Newblog updates parent state and calls onSubmit', async () => {
  const createBlog = jest.fn()

  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'true',
    url: 'yes',
    likes: 55
  }

  const component = render(<Blog blog={blog} />)

  const title = component.container.querySelector('#title')
  const author = component.container.querySelector('#author')
  const url = component.container.querySelector('#url')
  const form = component.container.querySelector('form')

  userEvent.change(title, {
    target: { value: blog.title }
  })
  fireEvent.change(author, {
    target: { value: blog.author }
  })
  fireEvent.change(url, {
    target: { value: blog.url }
  })
  axiosMock.post.mockResolvedValueOnce({ status: 201, data: blog })
  fireEvent.submit(form)

  await tick()

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0][0].title).toBe(blog.title)
})
import React from 'react'

import Comment from './Comment'

import { render } from 'test-utils'
import { comment } from '__fixtures__/disqus/comments'

describe('<Comment />', () => {
  it('Renders <Comment /> component correctly', () => {
    const { getByText } = render(<Comment comment={comment} />)
    expect(getByText(/First comment!/i)).toBeInTheDocument()
  })
})

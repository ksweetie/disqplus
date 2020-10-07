import React from 'react'

import { comment, withMediaTwitter } from '../../__fixtures__/disqus/comments'

import Comment from './Comment'
import { IComment } from './interface'

export default {
  title: 'DisqPlus/Comment',
  component: Comment,
}

export const Basic = (): JSX.Element => <Comment comment={comment} allComments={[]} />

export const WithATweet = (): JSX.Element => {
  const c = { ...comment, ...withMediaTwitter } as IComment
  return <Comment comment={c} />
}

import React from 'react'

import TimeAgoWrapper from '../../misc/TimeAgoWrapper/TimeAgoWrapper'

import { bullet } from './Comment.style'
import { IComment } from './interface'

interface Props {
  comment: IComment
  parent: IComment | undefined
}

const authorLink = {
  color: '#ff642b',
  fontSize: 17,
  fontWeight: 700,
  letterSpacing: '.01em',
  textDecoration: 'none',

  ':hover': {
    textDecoration: 'underline',
  },
}

const header = {
  marginBottom: 5,
}

const replyTo = {
  color: '#687a86',
}

const replyArrow = {
  fontSize: 15,
  padding: '0 5px',
  transform: 'rotateY(180deg)',
}

export default function CommentHeader({ comment, parent }: Props): JSX.Element {
  return (
    <header css={header}>
      <a href="" css={authorLink}>
        {comment.author.name}
      </a>

      {parent && (
        <span css={replyTo}>
          <i css={replyArrow} className="fa fa-reply" />
          {parent.author.name}
        </span>
      )}

      <span css={bullet}>•</span>

      <TimeAgoWrapper datetime={comment.createdAt} />
    </header>
  )
}

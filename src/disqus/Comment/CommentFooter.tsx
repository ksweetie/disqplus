import React from 'react'

import { IComment } from './interface'

interface Props {
  comment: IComment
}

const footer = {
  alignItems: 'center',
  color: '#656c7a',
  display: 'flex',
  marginBottom: 20,
  marginTop: 10,
}

const votelink = {
  fontSize: 15,
  opacity: 0.5,
  padding: '0 5px',

  // TODO: Make these global
  backgroundColor: 'unset',
  border: 0,
  fontWeight: 700,
  outline: 0,

  ':hover': {
    cursor: 'pointer',
    opacity: 0.8,
  },
}

const voteIcon = {
  fontSize: 14,
}

const separator = {
  borderRight: '2px solid #656c7a',
  height: 14,
  margin: '0 9px',
  opacity: 0.7,
}

const likes = { marginRight: 7 }
const dislikes = { marginLeft: 7 }

export default function CommentFooter({ comment }: Props): JSX.Element {
  return (
    <div css={footer}>
      <button css={votelink}>
        {!!comment.likes && <span css={likes}>{comment.likes}</span>}
        <span>
          <i css={voteIcon} className="fa fa-chevron-up" />
        </span>
      </button>
      <span css={separator} />
      <button css={votelink}>
        <span>
          <i css={voteIcon} className="fa fa-chevron-down" />
        </span>
        {!!comment.dislikes && <span css={dislikes}>{comment.dislikes}</span>}
      </button>
    </div>
  )
}

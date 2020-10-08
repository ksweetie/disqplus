import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons'

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
  fontSize: 16,
  opacity: 0.5,
  padding: '0 5px',

  ':hover': {
    cursor: 'pointer',
    opacity: 0.8,
  },
}

const upvote = { ...votelink, marginLeft: -5 }

const voteIcon = {
  fontSize: 14,
  height: 14,
  verticalAlign: -1,
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
      <button css={upvote}>
        {!!comment.likes && <span css={likes}>{comment.likes}</span>}
        <span>
          <FontAwesomeIcon icon={faChevronUp} css={voteIcon} />
        </span>
      </button>
      <span css={separator} />
      <button css={votelink}>
        <span>
          <FontAwesomeIcon icon={faChevronDown} css={voteIcon} />
        </span>
        {!!comment.dislikes && <span css={dislikes}>{comment.dislikes}</span>}
      </button>
    </div>
  )
}

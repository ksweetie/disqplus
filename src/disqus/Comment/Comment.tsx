import React from 'react'

import { avatar, body, childrenWrapper, wrapper } from './Comment.style'
import { IComment } from './interface'
import CommentHeader from './CommentHeader'
import CommentMessage from './CommentMessage'
import CommentFooter from './CommentFooter'

interface Props {
  comment: IComment
  allComments?: IComment[]
}

export default function Comment({ comment, allComments }: Props): JSX.Element {
  const parent = allComments?.find((c) => comment.parent?.toString() === c.id)
  const children = allComments?.filter((c) => c.parent?.toString() === comment.id)

  return (
    <>
      <div css={wrapper}>
        <img css={avatar} src={comment.author.avatar.large.cache} />
        <div css={body}>
          <CommentHeader comment={comment} parent={parent} />
          <CommentMessage comment={comment} />
          <CommentFooter comment={comment} />
        </div>
      </div>

      {children?.map((child) => (
        <div css={childrenWrapper} key={child.id}>
          <Comment comment={child} allComments={allComments} />
        </div>
      ))}
    </>
  )
}

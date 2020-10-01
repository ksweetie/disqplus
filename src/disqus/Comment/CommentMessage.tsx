import React from 'react'

import { IComment, IMedia } from './interface'

interface Props {
  comment: IComment
}

const wrapper = {
  img: {
    maxWidth: '100%',
  },
}

const messageWrapper = {
  color: 'rgba(0, 10, 0, .70)',
  fontFamily: 'Lora, serif',
  fontSize: 20,
  letterSpacing: '.01em',
  lineHeight: 1.5,

  p: {
    margin: '0 0 15px',

    ':last-child': {
      marginBottom: 0,
    },
  },

  a: {
    color: '#ff642b',
    textDecoration: 'none',

    ':hover': {
      textDecoration: 'underline',
    },
  },
}

export default function CommentMessage({ comment }: Props): JSX.Element {
  const getMedia = (media: IMedia): string => {
    switch (media.providerName) {
      case 'Disquscdn':
        return `<img src="${media.thumbnailUrl}" />`
      case 'Twitter':
        return media.html
      default:
        return ''
    }
  }

  const message = comment.message
  const media = comment.media.map((m) => getMedia(m)).join('')

  return (
    <div css={messageWrapper}>
      <div dangerouslySetInnerHTML={{ __html: message }} />
      <div dangerouslySetInnerHTML={{ __html: media }} css={wrapper} />
    </div>
  )
}

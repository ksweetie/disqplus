import React, { useRef } from 'react'
import { format, register } from 'timeago.js'

import { myLocale } from './timeago-locale'

interface Props {
  datetime: string
}

const timeAgo = {
  color: 'rgba(104, 122, 134, .8)',
  fontFamily: 'Roboto, sans-serif',
  fontWeight: 500,
}
const locale = 'my-locale'

register(locale, myLocale)

export default function TimeAgoWrapper(props: Props): JSX.Element {
  const timeRef = useRef<HTMLElement>(null)

  // render(timeRef.current, locale)

  return (
    <span css={timeAgo}>
      <time ref={timeRef} dateTime={props.datetime}>
        {format(`${props.datetime}.000Z`, locale)}
      </time>
    </span>
  )
}

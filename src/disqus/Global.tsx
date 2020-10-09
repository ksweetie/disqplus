import React from 'react'

import normalize from '../lib/normalize.css'

import global from './global.style'

interface Props {
  children: React.ReactNode
}

export default function Global({ children }: Props): JSX.Element {
  return <div css={[normalize, global]}>{children}</div>
}

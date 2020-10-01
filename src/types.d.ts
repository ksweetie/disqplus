import { InterpolationWithTheme } from '@emotion/core'

// This gets rid of the TS error when importing css from emotion without using it
declare module 'react' {
  interface DOMAttributes<T> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    css?: InterpolationWithTheme<any>
  }
}

declare global {
  interface Window {
    twttr: {
      widgets: {
        load: () => void
      }
    }
  }
}

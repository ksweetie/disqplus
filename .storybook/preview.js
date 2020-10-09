import Global from '../src/disqus/Global'

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
}

// Wrap stories in global styles
export const decorators = [
  (Story) => (
    <Global>
      <Story />
    </Global>
  ),
]

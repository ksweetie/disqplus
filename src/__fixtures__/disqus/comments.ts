import { IComment } from '../../disqus/Comment/interface'

export const comment = {
  id: '5100549541',
  author: {
    name: 'Test User',
    avatar: {
      large: {
        cache: '//a.disquscdn.com/1595026449/images/noavatar92.png',
      },
    },
  },
  createdAt: '2020-10-07T03:50:26',
  dislikes: 0,
  likes: 0,
  media: [],
  message: '<p>First comment!</p>',
  parent: null,
  foo: 'bar',
} as IComment

export const withMediaTwitter = {
  message:
    '<p>A comment with a tweet!</p><p><a href="https://disq.us/url?url=https%3A%2F%2Ftwitter.com%2Fkevin_sweet%2Fstatus%2F788913842923327488%3AqPfbjUnmTdUppLjax98NVMY3cB0&amp;cuid=3210109" rel="nofollow noopener" title="https://twitter.com/kevin_sweet/status/788913842923327488">https://twitter.com/kevin_s...</a></p>',
  media: [
    {
      providerName: 'Twitter',
      html:
        '<blockquote class="twitter-tweet">\n    <a href="https://twitter.com/kevin_sweet/status/788913842923327488"></a>\n</blockquote>\n<script src="//platform.twitter.com/widgets.js"></script>\n',
      thumbnailUrl: '',
    },
  ],
}

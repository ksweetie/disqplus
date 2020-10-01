export interface IMedia {
  html: string
  providerName: 'Disquscdn' | 'Twitter'
  thumbnailUrl: string
}

export interface IComment {
  id: string
  author: {
    avatar: {
      large: {
        cache: string
      }
    }
    name: string
  }
  createdAt: string
  dislikes: number
  likes: number
  media: IMedia[]
  message: string
  parent: number
}

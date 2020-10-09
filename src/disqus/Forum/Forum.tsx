import React, { useEffect, useState } from 'react'
import ky from 'ky/umd'

import Comment from '../Comment/Comment'
import { IComment } from '../Comment/interface'
import Global from '../Global'

interface Props {
  apiKey: string
  forumName: string
  link: string
  limit?: number
  proxy?: string
}

export default function Forum(props: Props): JSX.Element {
  const { apiKey, forumName, link, limit = 100, proxy = '' } = props
  const [comments, setComments] = useState<IComment[]>([])

  useEffect(() => {
    authenticateUser()
  }, [])

  useEffect(() => {
    if (!link) return
    setComments([])
    fetchComments()
  }, [link])

  useEffect(() => {
    // This will run each time we fetch any comments, we could probably make this run once after we know all comments have been fetched
    // fetchCurrentUserLikes()
  }, [comments])

  const authenticateUser = async (): Promise<void> => {
    // const res = await ky
    //   .post(
    //     `https://disqus.com/api/3.0/posts/list.json?api_key=${apiKey}&forum=${forum}&thread=link:${router.query?.link}`,
    //   )
    //   .json()
  }

  const fetchComments = async (cursor = ''): Promise<void> => {
    const res: { response: IComment[]; cursor: { next: string } } = await ky
      .get(
        `${proxy}https://disqus.com/api/3.0/posts/list.json?api_key=${apiKey}&forum=${forumName}&thread=link:${link}&limit=${limit}&cursor=${cursor}`,
      )
      .json()
    setComments((comments) => [...comments, ...res['response']])
    if (res['response'].length === limit) fetchComments(res['cursor']['next'])
  }

  // const fetchCurrentUserLikes = async (): Promise<void> => {
  //   const posts = comments
  //     .filter((comment) => comment.likes > 0 || comment.dislikes > 0)
  //     .map((comment) => `&post=${comment.id}`)
  //     .join('')
  //   const res = await ky
  //     .get(`https://disqus.com/api/3.0/embed/threadDetails.json?api_key=${key}&thread=8126951959${posts}`, {
  //       credentials: 'include',
  //     })
  //     .json()
  // }

  return (
    <Global>
      <div className="comment-container">
        {comments
          .filter((comment) => !comment.parent)
          .map((comment) => (
            <Comment key={comment.id} comment={comment} allComments={comments} />
          ))}
      </div>
    </Global>
  )
}

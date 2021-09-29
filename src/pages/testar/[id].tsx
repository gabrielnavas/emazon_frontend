import { GetStaticPaths, GetStaticProps } from 'next'

type Props = {
    post: {id: number, content: string}
}

const Post = ({ post }: Props) => {
  const { id, content } = post

  return (
        <div>
            <h1>Post {id}</h1>
            <p>{content}</p>
        </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  // Get all posts via API, file, etc.
  const posts = [{ id: '1' }, { id: '2' }, { id: '3' }, { id: '4' }, { id: '5' }] // Example
  const paths = posts.map(post => ({
    params: { id: post.id }
  }))
  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps = async context => {
  const postId = context.params?.id || ''
  // Get post detail via API, file, etc.
  const post = { id: postId, content: `I'm the post with id ${postId}!` } // Example
  return { props: { post } }
}

export default Post

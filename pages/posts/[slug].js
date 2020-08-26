import { Box, Container, Typography } from '@material-ui/core'
import dateFormat from 'dateformat'
import urlFor from 'helpers/urlFor'
import query from 'helpers/query'
import Layout from 'components/Layout'
import PostBody from 'components/PostBody'

const Post = ({ post }) => (
  <Layout>
    <Box marginY={5}>
      <Container>
        <Typography variant='h1'>
          {post.title}
        </Typography>
        <Typography variant='h2' style={{ color: 'gray'}}>
          {dateFormat(new Date(post.publishedAt), 'longDate')}
        </Typography>
        <Container maxWidth='md' disableGutters style={{ margin: 0 }}>
          <PostBody post={post} />
        </Container>
      </Container>
    </Box>
  </Layout>
)

export async function getStaticPaths() {
  const posts = await query({
    filters: '[_type == "post"]',
    projection: '{slug}'
  })

  const paths = posts.map(post => ({
    params: {
      slug: post.slug.current
    }
  }))

  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  const post = await query({
    filters: ['[_type == "post"]', '[slug.current == $slug]'],
    projection: '{title, publishedAt, body}',
    selector: '[0]',
    params: { slug: params.slug }
  })

  return {
    props: {
      post: {
        title: post.title,
        publishedAt: post.publishedAt,
        body: post.body
      }
    }
  }
}

export default Post

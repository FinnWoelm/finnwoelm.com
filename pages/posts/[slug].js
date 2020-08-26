import { Box, Container, Typography } from '@material-ui/core'
import dateFormat from 'dateformat'
import styled from 'styled-components'
import urlFor from 'helpers/urlFor'
import query from 'helpers/query'
import Layout from 'components/Layout'
import PostBody from 'components/PostBody'

const PostImage = styled.img`
  max-width: 100%;
  border-radius: 8px;
`

const Post = ({ post }) => (
  <Layout>
    <Box marginY={5}>
      <Container>
        <PostImage src={post.featuredImage} />
        <Box marginY={3}>
          <Typography variant='h1'>
            {post.title}
          </Typography>
          <Typography variant='subtitle1' style={{ color: 'gray' }}>
            {dateFormat(new Date(post.publishedAt), 'longDate')}
          </Typography>
        </Box>
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
    projection: '{title, publishedAt, mainImage, body}',
    selector: '[0]',
    params: { slug: params.slug }
  })

  return {
    props: {
      post: {
        title: post.title,
        publishedAt: post.publishedAt,
        featuredImage: urlFor(post.mainImage).height(240).url(),
        body: post.body
      }
    }
  }
}

export default Post

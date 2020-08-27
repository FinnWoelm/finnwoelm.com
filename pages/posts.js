import { Box, Container, Grid, Typography } from '@material-ui/core'
import urlFor from 'helpers/urlFor'
import query from 'helpers/query'
import Layout from 'components/Layout'
import Title from 'components/Title'
import NewsCard from 'components/NewsCard'

const Posts = ({ posts }) => (
  <Layout>
    <Box marginY={5}>
      <Container>
        <Box marginBottom={2}>
          <Title>
            News and Updates
          </Title>
          <Typography variant='body1'>
            The latest news, thoughts, ideas, and reflections from my life.
          </Typography>
        </Box>
        <Grid container spacing={2}>
          {posts.map(post => (
            <Grid key={post.slug} item xs={12} md={4}>
              <NewsCard
                news={post} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  </Layout>
)

export async function getStaticProps() {
  const posts = await query({
    filters: '[_type == "post"]',
    sorts: 'order(publishedAt desc)',
    projection: '{title, slug, publishedAt, mainImage, teaser}'
  })

  return {
    props: {
      posts: posts.map(post => ({
        title: post.title,
        slug: post.slug.current,
        publishedAt: post.publishedAt,
        featuredImage: urlFor(post.mainImage).height(200).url(),
        teaser: post.teaser
      }))
    }
  }
}

export default Posts

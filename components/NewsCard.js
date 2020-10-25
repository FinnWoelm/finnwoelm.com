import Link from 'next/link'
import { Card, CardActionArea, CardContent, CardMedia, Divider, Typography } from '@material-ui/core'
import styled from 'styled-components'
import dateFormat from 'dateformat'

const HoverCard = styled(Card)`
  &&:hover {
    transform: scale(1.03) rotate(2deg) translateY(-5px);
    box-shadow: 0px 7px 8px -4px rgba(0,0,0,0.2),0px 12px 17px 2px rgba(0,0,0,0.14),0px 5px 22px 4px rgba(0,0,0,0.12);

    position: relative;
    z-index: 100;
  }

  && {
    transition: transform, box-shadow;
    transition-duration: .3s;
    transition-timing-function: ease-in-out;
  }
`

const NewsCard = ({ news }) => (
  <HoverCard style={{ height: '100%' }}>
    <Link href='/posts/[slug]' as={`/posts/${news.slug}`} passHref>
      <CardActionArea style={{ height: '100%' }} component='a'>
        <CardMedia
          image={news.featuredImage}
          title={`Featured Image: ${news.title}`}
          style={{ height: 200 }}/>
        <Divider />
        <CardContent>
          <Typography variant='subtitle1' gutterBottom>
            {news.title}
          </Typography>
          <Typography variant='body2' style={{ color: 'gray' }} gutterBottom>
            {dateFormat(new Date(news.publishedAt), 'mediumDate')}
          </Typography>
          <Typography variant='body2'>
            {news.teaser}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Link>
  </HoverCard>
)

export default NewsCard

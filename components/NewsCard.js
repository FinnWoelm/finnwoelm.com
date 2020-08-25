import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@material-ui/core'
import styled from 'styled-components'

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

const NewsCard = ({ summary, raised = false }) => (
  <HoverCard style={{ height: '100%' }}>
    <CardActionArea style={{ height: '100%' }} component='a'>
      <CardMedia
        image='/finn-woelm.jpg'
        title='alt text'
        style={{ height: 200 }}/>
      <CardContent>
        <Typography variant='h3' gutterBottom>
          My Cool Post
        </Typography>
        <Typography variant='body2'>
          {summary}
        </Typography>
      </CardContent>
    </CardActionArea>
  </HoverCard>
)

export default NewsCard

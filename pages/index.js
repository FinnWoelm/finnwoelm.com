import Head from 'next/head'
import { Box, Container, Grid, Typography } from '@material-ui/core'
import styled from 'styled-components'
import theme from 'helpers/theme'
import NavBar from 'components/NavBar'
import ExternalLink from 'components/ExternalLink'

const FlippingGrid = styled(Grid)`
  ${theme.breakpoints.down('sm')} {
    flex-direction: column-reverse;
  }
`

const Home = () => (
  <>
    <NavBar />
    <Container>
      <FlippingGrid container alignItems="center">
        <Grid item xs={12} md={6} lg={6}>
          <Box marginY={5}>

            <Typography variant='h1' gutterBottom>
              Hi there!
              {' '}
              <span role="img" aria-label="wave">👋</span>
            </Typography>
            <Typography variant='body1' gutterBottom>
              My name is Finn and I'm a data scientist and analyst at the
              {' '}
              <ExternalLink href="https://www.unsdsn.org/">
                United Nations Sustainable Development Solutions Network
              </ExternalLink>
              , where I help to track and monitor the progress of all 193 UN
              Member States towards the achievement of the 17 Sustainable
              Development Goals.
            </Typography>
            <Typography variant='body1' gutterBottom>
              I am passionate about data, the environment, and impact startups.
              In my free time, I love to code, contribute to open source,
              and promote open principles in the non-profit sector.
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={3} md />
        <Grid item xs={6} md={4} lg={4}>
          <Box marginY={5}>
            <img src="finn-woelm.jpg" style={{ maxWidth: '100%', borderRadius: '50%'}}/>
          </Box>
        </Grid>
        <Grid item xs={3} md />
      </FlippingGrid>
    </Container>
  </>
)

export default Home

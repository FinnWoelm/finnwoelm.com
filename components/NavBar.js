import Link from 'next/link'
import { AppBar, Box, Button, Container, IconButton, Toolbar } from '@material-ui/core'
import { Github, Linkedin, Twitter } from 'mdi-material-ui'
import styled from 'styled-components'
import ExternalLink from 'components/ExternalLink'

const SocialButton = styled(IconButton).attrs({
  component: ExternalLink
})``

const NavBar = () => (
  <AppBar position='static' color='transparent' elevation={0} style={{ borderBottom: '1px solid #eee' }}>
    <Container>
      <Toolbar style={{ marginLeft: -32, marginRight: -32 }}>
        <Link href="/" passHref>
          <Button>
            <img src='/logo.png' style={{ height: 30 }} />
          </Button>
        </Link>
        <Box marginX={2} />
        <Link href="/posts" passHref>
          <Button color="inherit">
            News
          </Button>
        </Link>
        <Box marginX={2} />
        <SocialButton
          href="https://twitter.com/FinnWoelm"
          style={{ color: '#1da1f2' }}>
          <Twitter />
        </SocialButton>
        <SocialButton
          href="https://www.linkedin.com/in/FinnWoelm/"
          style={{ color: '#2867b2' }}>
          <Linkedin />
        </SocialButton>
        <SocialButton
          href="https://github.com/FinnWoelm"
          style={{ color: '#000' }}>
          <Github />
        </SocialButton>
      </Toolbar>
    </Container>
  </AppBar>
)

export default NavBar

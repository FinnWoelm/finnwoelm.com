import { useState } from 'react'
import Link from 'next/link'
import { AppBar, Box, Button, Container, Hidden, IconButton, Toolbar } from '@material-ui/core'
import { Menu } from 'mdi-material-ui'
import styled from 'styled-components'
import theme from 'helpers/theme'
import ExternalLink from 'components/ExternalLink'
import NavBarDrawer from 'components/NavBarDrawer'
import { GitHubIcon, LinkedInIcon, TwitterIcon } from 'components/SocialIcons'

const TWITTER = "https://twitter.com/FinnWoelm"
const LINKEDIN = "https://www.linkedin.com/in/FinnWoelm/"
const GITHUB = "https://github.com/FinnWoelm"

const LeftAlignedToolbar = styled(Toolbar)`
  ${theme.breakpoints.up('md')} {
     margin-left: -8px;
     margin-right: -8px;
  }
`

const HiddenFlex = styled(Hidden)`
  display: flex;
`

const SocialButton = styled(IconButton).attrs({
  component: ExternalLink
})``

const NavBar = () => {

  const [showNavDrawer, setShowNavDrawer] = useState(false)
  const toggleNavDrawer = () => setShowNavDrawer(!showNavDrawer)

  return (
    <AppBar position='static' color='transparent' elevation={0} style={{ borderBottom: '1px solid #eee' }}>
      <Container>
        <LeftAlignedToolbar disableGutters>
          <Hidden implementation='css' mdUp>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleNavDrawer}>
              <Menu />
            </IconButton>
          </Hidden>
          <Link href="/" passHref>
            <Button>
              <img src='/logo.png' style={{ height: 30 }} />
            </Button>
          </Link>
          <Hidden implementation='js' mdUp>
            <NavBarDrawer
              open={showNavDrawer}
              onClose={toggleNavDrawer}
              twitter={TWITTER}
              linkedin={LINKEDIN}
              github={GITHUB} />
          </Hidden>
          <HiddenFlex implementation='css' smDown>
            <Box marginX={2} />
            <Link href="/posts" passHref>
              <Button color="inherit">
                News
              </Button>
            </Link>
            <Box marginX={2} />
            <SocialButton
              href={TWITTER}>
              <TwitterIcon />
            </SocialButton>
            <SocialButton
              href={LINKEDIN}>
              <LinkedInIcon />
            </SocialButton>
            <SocialButton
              href={GITHUB}>
              <GitHubIcon />
            </SocialButton>
          </HiddenFlex>
        </LeftAlignedToolbar>
      </Container>
    </AppBar>
  )
}

export default NavBar

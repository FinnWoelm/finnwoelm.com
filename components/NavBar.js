import Link from 'next/link'
import { AppBar, Button, Container, Toolbar } from '@material-ui/core'

const NavBar = () => (
  <AppBar position='static' color='transparent' elevation={0}>
    <Container>
      <Toolbar>
        <Link href="/" passHref>
          <Button>
            <img src='/logo.png' style={{ height: 30 }} />
          </Button>
        </Link>
        <Button color="inherit">News</Button>
        <Button color="inherit">Projects</Button>
        <Button color="inherit">About</Button>
      </Toolbar>
    </Container>
  </AppBar>
)

export default NavBar

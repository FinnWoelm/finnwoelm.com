import Head from 'next/head'
import { Typography } from '@material-ui/core'

const Title = ({ children }) => (
  <>
    <Head>
      <title>{children} ­­– Finn Woelm</title>
    </Head>
    <Typography variant='h1'>
      {children}
    </Typography>
  </>
)

export default Title

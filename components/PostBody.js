import BlockContent from '@sanity/block-content-to-react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import okaidia from 'react-syntax-highlighter/dist/cjs/styles/prism/okaidia'
import getYouTubeId from 'get-youtube-id'
import YouTube from 'react-youtube'
import { Box, Container, Typography } from '@material-ui/core'
import styled from 'styled-components'
import client from 'helpers/client'
import theme from 'helpers/theme'
import Paragraph from 'components/Paragraph'
import InlineCode from 'components/InlineCode'

const ResponsiveYouTube = styled(YouTube)`
  width: 100%;
  height: 540px;

  ${theme.breakpoints.only('sm')} {
    height: 450px;
  }

  ${theme.breakpoints.only('xs')} {
    height: 360px;
  }
`

const BlockRenderer = props => {
  const {style = 'normal'} = props.node;

  if (style === 'heading') {
    return (
      <Typography variant='h2' gutterBottom style={{ marginTop: 32 }}>
        {props.children}
      </Typography>
    )
  }

  if (style === 'subheading') {
    return (
      <Typography variant='h3' gutterBottom style={{ marginTop: 16 }}>
        {props.children}
      </Typography>
    )
  }

  if(style === 'normal') {
    return <Paragraph>{props.children}</Paragraph>
  }

  if (style === 'blockquote') {
    return <blockquote><Paragraph>{props.children}</Paragraph></blockquote>
  }

  // Fall back to default handling
  return BlockContent.defaultSerializers.types.block(props)
}


const serializers = {
  container: props => <Box {...props} />,
  types: {
    block: BlockRenderer,
    code: props => (
      <SyntaxHighlighter
        language={props.node.language}
        style={okaidia}>
        {props.node.code}
      </SyntaxHighlighter>
    ),
    youtube: props => {
      const id = getYouTubeId(props.node.url)
      return (<ResponsiveYouTube videoId={id} />)
    }
  },
  marks: {
    code: InlineCode
  }
}

const PostBody = ({ post }) => (
  <BlockContent
    blocks={post.body}
    imageOptions={{w: 960, h: 600, fit: 'max'}}
    serializers={serializers}
    projectId={client.config().projectId}
    dataset={client.config().dataset} />
)

export default PostBody

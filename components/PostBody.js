import BlockContent from '@sanity/block-content-to-react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import okaidia from 'react-syntax-highlighter/dist/cjs/styles/prism/okaidia'
import { Box, Container, Typography } from '@material-ui/core'
import client from 'helpers/client'
import Paragraph from 'components/Paragraph'
import InlineCode from 'components/InlineCode'

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
    )
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

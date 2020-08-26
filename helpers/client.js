const sanityClient = require('@sanity/client')

const client = sanityClient({
  projectId: 'zdrr72ub',
  dataset: 'production',
  useCdn: false // `false` if you want to ensure fresh data
})

export default client

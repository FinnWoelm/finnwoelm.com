import client from 'helpers/client'

const defaultOptions = {
  filters: [],
  sorts: [],
  projection: [],
  selector: [],
  params: {}
}

const query = async (queryOptions) => {
  // Merge query options into default options
  const options = Object.assign({}, defaultOptions, queryOptions)

  // Combine options into a query string
  const query = ['*', ...[options.filters].flat(),
                      ...[options.sorts].flat(),
                      ...[options.projection].flat(),
                      ...[options.selector].flat()].join('|')

  // Execute the query
  return client.fetch(query, options.params)
}

export default query

import client from 'part:@sanity/base/client'

// From: https://appdividend.com/2019/04/11/how-to-get-distinct-values-from-array-in-javascript/
const unique = (value, index, self) => {
  return self.indexOf(value) === index
}

// Update all documents that have not been updated in the last 10 minutes
const fetchDocuments = () =>
  client.fetch(`*[_type == 'post' && dateTime(now()) - dateTime(_updatedAt) > 600] | {_id, _rev, title, body} | [0...100]`)

const buildPatches = docs => (
  docs.map(doc => {
    (doc.body || []).forEach(block => {

      // Replace h1 and h2 with heading and subheading
      if(block.style === 'h1')
        block.style = 'heading'
      else if(block.style === 'h2') {
        block.style = 'subheading'
      }
    })

    return {
      id: doc._id,
      patch: {
        set: {body: doc.body},
        // this will cause the transaction to fail if the documents has been
        // modified since it was fetched.
        ifRevisionID: doc._rev
      }
    }
  })
)

const createTransaction = patches =>
  patches.reduce((tx, patch) => tx.patch(patch.id, patch.patch), client.transaction())

const commitTransaction = tx => tx.commit()

const migrateNextBatch = async () => {
  const documents = await fetchDocuments()
  const patches = buildPatches(documents)
  if (patches.length === 0) {
    console.log('No more documents to migrate!')
    return null
  }
  console.log(
    `Migrating batch:\n %s`,
    patches.map(patch => `${patch.id} => ${JSON.stringify(patch.patch)}`).join('\n')
  )
  const transaction = createTransaction(patches)
  await commitTransaction(transaction)
  return migrateNextBatch()
}

migrateNextBatch().catch(err => {
  console.error(err)
  process.exit(1)
})

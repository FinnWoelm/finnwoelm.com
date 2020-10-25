import client from 'part:@sanity/base/client'

const MARKS_TO_REMOVE = ['5d1321fbbafb', '61c19cc3cd8e']
// Check if any undefined marks are present
const ALLOWED_MARKS = ['strong', 'em', 'code']

// From: https://appdividend.com/2019/04/11/how-to-get-distinct-values-from-array-in-javascript/
const unique = (value, index, self) => {
  return self.indexOf(value) === index
}

// Find documents using the defined mark
const fetchDocuments = () =>
  client.fetch(`*[_type == 'post'] | {_id, _rev, title, body} | [0...100]`)

const buildPatches = docs => (
  docs.map(doc => {
    let needsUpdate = false;

    (doc.body || []).forEach(block => {
      (block.children || []).forEach(child => {
        const allowedMarks = [
          ...block.markDefs.map(def => def._key),
          ...ALLOWED_MARKS
        ]

        // For each mark, ...
        child.marks = child.marks.map(mark => {
          // Check if mark is allowed
          if(allowedMarks.indexOf(mark) !== -1)
            return mark

          // Check if mark is to be removed
          if(MARKS_TO_REMOVE.indexOf(mark) !== -1) {
            console.log("Removing", mark, "in", child, "of doc:", doc.title)
            needsUpdate = true
            return null
          }

          // Flag undefined mark
          console.log("Found undefined mark", mark, "in doc:", doc.title)
          return mark
        }).filter(Boolean)
      })
    })

    if(!needsUpdate)
      return null

    return {
      id: doc._id,
      patch: {
        set: {body: doc.body},
        // this will cause the transaction to fail if the documents has been
        // modified since it was fetched.
        ifRevisionID: doc._rev
      }
    }
  }).filter(Boolean)
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
  // TODO: Implement support for removing marks from more than 100 records
  // return migrateNextBatch()
  return null
}

migrateNextBatch().catch(err => {
  console.error(err)
  process.exit(1)
})

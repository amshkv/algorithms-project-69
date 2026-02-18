// @ts-check

/**
 * @typedef {{ name: string, text: string }} Document
 */

/**
 * @param {Document[]} documents
 * @param {string} query
 * @returns {string[]}
 */
const search = (documents, query) => {
  if (!Array.isArray(documents) || query.length === 0) {
    return []
  }

  const filteredDocuments = documents.filter(document => document.text.includes(query))
  return filteredDocuments.map(document => document.name)
}

export default search

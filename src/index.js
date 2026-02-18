// @ts-check

/**
 * @typedef {{ name: string, text: string }} Document
 */

/**
 * @param {Document[]} documents
 * @param {string} query
 * @returns {string[]}
 */

import tokenize from './helpers/tokenize.js'

const search = (documents, query) => {
  if (!Array.isArray(documents) || query.length === 0) {
    return []
  }

  const queryTerms = tokenize(query)
  if (queryTerms.length === 0) {
    return []
  }

  return documents.map(({ text, name }) => {
    const docTokens = tokenize(text)
    const score = queryTerms.reduce((acc, term) => (
      acc + docTokens.filter(t => t === term).length
    ), 0)
    return { name, score }
  })
    .filter(document => document.score > 0)
    .sort((document_a, document_b) => document_b.score - document_a.score)
    .map(document => document.name)
}
export default search

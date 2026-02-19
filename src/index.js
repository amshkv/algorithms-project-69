// @ts-check

/**
 * @typedef {{ id: string, text: string }} Document
 * @typedef {Record<string, string[]>} InvertedIndex
 * @typedef {{ id: string, termCounts: Map<string, number> }} IndexedDocument
 */

/**
 * @param {Document[]} documents
 * @param {string} query
 * @returns {string[]}
 */

import tokenize from './helpers/tokenize.js'

const search = (documents, query) => {
  if (!Array.isArray(documents) || query.length === 0) {
    return {}
  }

  const queryTerms = tokenize(query)
  if (queryTerms.length === 0) {
    return {}
  }

  const tokenizedDocuments = documents.map(document => ({ id: document.id, text: tokenize(document.text) }))

  return queryTerms.reduce((acc, val) => {
    let result = tokenizedDocuments.map(({ id, text }) => {
      const count = text.filter(t => t === val).length
      return [count, id]
    })
      .filter(document => document[0] > 0)
      .sort((a, b) => b[0] - a[0])
      .map(arr => arr[1])

    acc[val] = result

    return acc
  }, {})
}
export default search

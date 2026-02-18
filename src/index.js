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

  return documents.reduce((result, document) => {
    const docTerms = new Set(tokenize(document.text))
    if (queryTerms.every(term => docTerms.has(term))) {
      result.push(document.name)
    }
    return result
  }, [])
}

export default search

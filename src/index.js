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
    const scores = queryTerms.reduce((acc, term) => {
      const count = docTokens.filter(t => t === term).length
      if (count > 0) {
        return [acc[0] + 1, acc[1] + count]
      }
      return [acc[0], acc[1]]
    }, [0, 0])
    return { name, scores }
  })
    .filter(document => document.scores[0] > 0)
    .sort((a, b) => (b.scores[0] - a.scores[0]) || (b.scores[1] - a.scores[1]))
    .map(document => document.name)
}
export default search

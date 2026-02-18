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

  return []
}

export default search

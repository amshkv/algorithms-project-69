// @ts-check

/**
 * @typedef {{ id: string, text: string }} Document
 */

/**
 * @param {Document[]} documents
 * @param {string} query
 * @returns {string[]}
 */

import tokenize from './helpers/tokenize.js';

const search = (documents, query) => {
  if (!Array.isArray(documents) || query.length === 0) {
    return [];
  }

  const uniqueQueryTerms = [...new Set(tokenize(query))];
  if (uniqueQueryTerms.length === 0) {
    return [];
  }

  const tokenizedDocuments = documents.map((document) => {
    return {
      id: document.id,
      tokens: tokenize(document.text),
    };
  });

  const documentsCount = tokenizedDocuments.length;
  const documentFrequencies = tokenizedDocuments.reduce((acc, document) => {
    const uniqueDocumentTerms = new Set(document.tokens);
    uniqueDocumentTerms.forEach((term) => {
      acc[term] = (acc[term] ?? 0) + 1;
    });
    return acc;
  }, {});

  return tokenizedDocuments.map((document, position) => {
    const termsCountInDocument = document.tokens.length;

    const score = uniqueQueryTerms.reduce((acc, term) => {
      const termCountInDocument = document.tokens.filter((token) => {
        return token === term;
      }).length;
      if (termCountInDocument === 0) {
        return acc;
      }

      const tf = termCountInDocument / termsCountInDocument;
      const df = documentFrequencies[term] ?? 0;
      const idf = Math.log((documentsCount + 1) / (df + 1)) + 1;

      return acc + (tf * idf);
    }, 0);

    return { id: document.id, score, position };
  })
    .filter((document) => {
      return document.score > 0;
    })
    .sort((a, b) => (b.score - a.score) || (a.position - b.position))
    .map((document) => {
      return document.id;
    });
};
export default search;

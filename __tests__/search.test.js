// @ts-check

import { expect, test } from '@jest/globals'
import search from '../index.js'

test('returns names of documents that contain the query', () => {
  const documents = [
    { name: 'doc-1', text: 'hello world' },
    { name: 'doc-2', text: 'welcome to hexlet' },
    { name: 'doc-3', text: 'hexlet world' },
  ]

  expect(search(documents, 'world')).toEqual(['doc-1', 'doc-3'])
})

test('returns an empty array when no documents match the query', () => {
  const documents = [
    { name: 'doc-1', text: 'hello world' },
    { name: 'doc-2', text: 'welcome to hexlet' },
  ]

  expect(search(documents, 'python')).toEqual([])
})

test('finds documents when text contains punctuation', () => {
  const documents = [
    { name: 'doc-1', text: 'I can\'t shoot straight unless I\'ve had a pint!' },
    { name: 'doc-2', text: 'The pub is closed today' },
  ]

  expect(search(documents, 'pint')).toEqual(['doc-1'])
})

test('returns an empty array when query has no terms', () => {
  const documents = [
    { name: 'doc-1', text: 'I had a pint in the evening' },
    { name: 'doc-2', text: 'Tea and coffee only' },
  ]

  expect(search(documents, '!!!')).toEqual([])
})

test('ranks matched documents by term frequency', () => {
  const documents = [
    { name: 'doc-1', text: 'I cannot shoot straight unless I had a pint' },
    { name: 'doc-2', text: 'Do not shoot shoot shoot that thing at me' },
    { name: 'doc-3', text: 'I am your shooter' },
  ]

  expect(search(documents, 'shoot')).toEqual(['doc-2', 'doc-1'])
})

test('ranks documents by frequency after query normalization', () => {
  const documents = [
    { name: 'doc-1', text: 'pint in the evening' },
    { name: 'doc-2', text: 'pint pint and tea' },
  ]

  expect(search(documents, 'pint!')).toEqual(['doc-2', 'doc-1'])
})

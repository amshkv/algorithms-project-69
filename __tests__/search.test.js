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

test('finds documents when punctuation differs between text and query', () => {
  const documents = [
    { name: 'doc-1', text: 'I can\'t shoot straight unless I\'ve had a pint!' },
    { name: 'doc-2', text: 'The pub is closed today' },
  ]

  expect(search(documents, 'pint?')).toEqual(['doc-1'])
})

test('finds documents when query contains punctuation and text does not', () => {
  const documents = [
    { name: 'doc-1', text: 'I had a pint in the evening' },
    { name: 'doc-2', text: 'Tea and coffee only' },
  ]

  expect(search(documents, 'pint!')).toEqual(['doc-1'])
})

test('returns an empty array when query has no terms', () => {
  const documents = [
    { name: 'doc-1', text: 'I had a pint in the evening' },
    { name: 'doc-2', text: 'Tea and coffee only' },
  ]

  expect(search(documents, '!!!')).toEqual([])
})

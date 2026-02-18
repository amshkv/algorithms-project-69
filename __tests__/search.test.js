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

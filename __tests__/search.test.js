// @ts-check

import { expect, test } from '@jest/globals'
import search from '../index.js'

test('builds an inverted index for query terms', () => {
  const documents = [
    { id: 'doc-1', text: 'hello world' },
    { id: 'doc-2', text: 'welcome to hexlet' },
    { id: 'doc-3', text: 'hexlet world' },
  ]

  expect(search(documents, 'world hexlet')).toEqual({
    world: ['doc-1', 'doc-3'],
    hexlet: ['doc-2', 'doc-3'],
  })
})

test('normalizes punctuation in query and document text', () => {
  const documents = [
    { id: 'doc-1', text: 'I had a pint!' },
    { id: 'doc-2', text: 'No beer today' },
  ]

  expect(search(documents, 'pint?')).toEqual({
    pint: ['doc-1'],
  })
})

test('keeps query terms with empty matches', () => {
  const documents = [
    { id: 'doc-1', text: 'some text' },
    { id: 'doc-2', text: 'some text too' },
  ]

  expect(search(documents, 'some missing')).toEqual({
    some: ['doc-1', 'doc-2'],
    missing: [],
  })
})

test('does not duplicate document ids when a term repeats in one document', () => {
  const documents = [
    { id: 'doc1', text: 'some some some text' },
    { id: 'doc2', text: 'some text too' },
  ]

  expect(search(documents, 'some text too')).toEqual({
    some: ['doc1', 'doc2'],
    text: ['doc1', 'doc2'],
    too: ['doc2'],
  })
})

test('orders document ids for each term by term frequency', () => {
  const documents = [
    { id: 'doc1', text: 'some some some text' },
    { id: 'doc2', text: 'some text text too' },
  ]

  expect(search(documents, 'some text too')).toEqual({
    some: ['doc1', 'doc2'],
    text: ['doc2', 'doc1'],
    too: ['doc2'],
  })
})

test('returns an empty object when query has no terms', () => {
  const documents = [
    { id: 'doc-1', text: 'shoot at target' },
    { id: 'doc-2', text: 'shoot target' },
  ]

  expect(search(documents, '!!!')).toEqual({})
})

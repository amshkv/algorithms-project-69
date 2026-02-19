// @ts-check

import { expect, test } from '@jest/globals';
import search from '../index.js';

test('ranks documents by tf-idf for a single term', () => {
  const documents = [
    { id: 'doc1', text: 'apple apple apple banana' },
    { id: 'doc2', text: 'apple banana' },
    { id: 'doc3', text: 'banana banana' },
  ];

  expect(search(documents, 'apple')).toEqual(['doc1', 'doc2']);
});

test('normalizes punctuation in query and document', () => {
  const documents = [
    { id: 'doc-1', text: 'I had a pint!' },
    { id: 'doc-2', text: 'No beer today' },
  ];

  expect(search(documents, 'pint?')).toEqual(['doc-1']);
});

test('returns an empty array when no documents match the query', () => {
  const documents = [
    { id: 'doc-1', text: 'some text' },
    { id: 'doc-2', text: 'some text too' },
  ];

  expect(search(documents, 'missing')).toEqual([]);
});

test('returns an empty array when query has no terms', () => {
  const documents = [
    { id: 'doc-1', text: 'shoot at target' },
    { id: 'doc-2', text: 'shoot target' },
  ];

  expect(search(documents, '!!!')).toEqual([]);
});

test('supports ranking for multi-word query', () => {
  const documents = [
    { id: 'doc-1', text: 'I cannot shoot straight unless I had a pint' },
    { id: 'doc-2', text: 'Do not shoot shoot shoot that thing at me' },
    { id: 'doc-3', text: 'I am your shooter' },
  ];

  expect(search(documents, 'shoot at me')).toEqual(['doc-2', 'doc-1']);
});

test('accounts for idf and boosts documents with rarer matched terms', () => {
  const documents = [
    { id: 'doc1', text: 'apple apple apple apple' },
    { id: 'doc2', text: 'apple rare' },
    { id: 'doc3', text: 'apple grape' },
  ];

  expect(search(documents, 'apple rare')).toEqual(['doc2', 'doc1', 'doc3']);
});

test('keeps source order for equal tf-idf scores', () => {
  const documents = [
    { id: 'doc1', text: 'apple banana' },
    { id: 'doc2', text: 'apple banana' },
  ];

  expect(search(documents, 'apple')).toEqual(['doc1', 'doc2']);
});

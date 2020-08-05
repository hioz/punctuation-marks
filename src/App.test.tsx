import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import json from './data.json';

type DataType = { [index: string]: string };

const data: DataType = json;

const escapePattern = /[-/\\^$*+?.()|[\]{}]/g;

function escapeRegex(str: string, pattern = escapePattern): string {
  return str.replace(pattern, '\\$&');
}

describe('<App />', () => {
  test('check all data', () => {
    render(<App />);

    Object.entries(data).forEach(([_, v]) => {
      expect(screen.getByText(new RegExp(escapeRegex(v)))).toBeInTheDocument();
    });
  });

  test('search', () => {
    render(<App />);
    const searchInput = screen.getByRole('searchbox');

    userEvent.type(searchInput, '~');
    expect(screen.getByText(/tilde/i)).toBeInTheDocument();

    userEvent.type(searchInput, 'a');
    expect(
      screen.getByText(/It's not a punctuation mark/i)
    ).toBeInTheDocument();
  });
});

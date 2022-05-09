import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { NotFound } from '../components';

describe('', () => {
  it('', () => {
    renderWithRouter(<NotFound />);
    const titleEl = screen.getByRole('heading',
      { name: /page requested not found/i, level: 2 });
    expect(titleEl).toBeDefined();
    const image = screen.getByRole('img',
      { name: /pikachu crying because the page requested was not found/i });
    expect(image).toBeDefined();
    expect(image).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
    screen.logTestingPlaygroundURL();
  });
});

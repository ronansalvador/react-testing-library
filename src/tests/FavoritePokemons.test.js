import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

describe('Componente FavoritePokemoons', () => {
  it(`Teste se é exibida na tela a mensagem No favorite pokemon found, 
  caso a pessoa não tenha pokémons favoritos.`, () => {
    renderWithRouter(<FavoritePokemons />);
    const titleEl = screen.getByRole('heading',
      { name: /favorite pokémons/i, level: 2 });
    const noFavorites = screen.getByText(/no favorite pokemon found/i);
    expect(titleEl).toBeDefined();
    expect(noFavorites).toBeDefined();
  });

  it('Teste se são exibidos todos os cards de pokémons favoritados.', () => {
    renderWithRouter(<App />);
    const btnEletric = screen.getByRole('button', { name: /electric/i });
    expect(btnEletric).toBeDefined();
    userEvent.click(btnEletric);
    const detailsEl = screen.getByRole('link', { name: /more details/i });
    expect(detailsEl).toBeDefined();
    userEvent.click(detailsEl);
    const checkFavorite = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
    expect(checkFavorite).toBeDefined();
    userEvent.click(checkFavorite);
    const favorites = screen.getByRole('link', { name: /favorite pokémons/i });
    userEvent.click(favorites);
    const cardsFavorite = screen.getAllByRole('link', { name: /more details/i });
    expect(cardsFavorite.length).toBe(1);
    screen.logTestingPlaygroundURL();
  });
});

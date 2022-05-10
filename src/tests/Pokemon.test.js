import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import Pokemon from '../components/Pokemon';
import data from '../data';

describe('Teste o componente <Pokemon.js />', () => {
  it('Teste se é renderizado um card com as informações de determinado pokémon.', () => {
    renderWithRouter(<Pokemon pokemon={ data[0] } />);
    const { averageWeight, image, name, type } = data[0];
    const { value, measurementUnit } = averageWeight;
    const nome = screen.getByText(name);
    const tipo = screen.getByTestId('pokemon-type');
    const typeText = `${type}`;
    const peso = screen.getByTestId('pokemon-weight');
    const img = screen.getByRole('img', { name: `${name} sprite` });
    expect(nome).toBeInTheDocument();
    expect(tipo).toHaveTextContent(typeText);
    expect(peso).toHaveTextContent(`Average weight: ${value} ${measurementUnit}`);
    expect(img).toHaveAttribute('src', image);
  });
  it('Teste se o card do pokémon indicado na Pokédex contém um link de navegação', () => {
    renderWithRouter(<Pokemon pokemon={ data[0] } />);
    const { id } = data[0];
    const detailsLink = screen.getByRole('link', { name: /more details/i });
    const linkId = `/pokemons/${id}`;
    expect(detailsLink).toHaveAttribute('href', linkId);
  });
  it(`Teste se ao clicar no link de navegação do pokémon, é feito o redirecionamento 
  da aplicação para a página de detalhes de pokémon.`, () => {
    const { history } = renderWithRouter(<Pokemon pokemon={ data[0] } />);
    const { id } = data[0];
    const detailsLink = screen.getByRole('link', { name: /more details/i });
    const linkId = `/pokemons/${id}`;
    expect(detailsLink).toHaveAttribute('href', linkId);
    userEvent.click(detailsLink);
    const { pathname } = history.location;
    expect(pathname).toBe(linkId);
  });
  it('Teste se existe um ícone de estrela nos pokémons favoritados.', () => {
    renderWithRouter(<Pokemon pokemon={ data[0] } isFavorite />);
    const { name } = data[0];
    const iconEl = screen.getByRole('img', { name: `${name} is marked as favorite` });
    expect(iconEl).toBeInTheDocument();
    expect(iconEl).toHaveAttribute('src', '/star-icon.svg');
    screen.logTestingPlaygroundURL();
  });
});

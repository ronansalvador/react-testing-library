import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import data from '../data';

const url = '/pokemons/25';

describe('Teste o componente <PokemonDetails.js />', () => {
  it(`Teste se as informações detalhadas do pokémon selecionado 
  são mostradas na tela.`, () => {
    const { history } = renderWithRouter(<App />);
    const detailsLink = screen.getByRole('link', { name: /more details/i });
    expect(detailsLink).toBeInTheDocument();
    userEvent.click(detailsLink);
    const { pathname } = history.location;
    expect(pathname).toBe(url);
    const nameDetails = screen.getByRole('heading', { name: `${data[0].name} Details` });
    expect(nameDetails).toBeInTheDocument();
    expect(detailsLink).not.toBeInTheDocument();
    const sumaryEl = screen.getByRole('heading', { name: /summary/i, level: 2 });
    expect(sumaryEl).toBeDefined();
    const resumo = screen.getByText(`${data[0].summary}`);
    expect(resumo).toBeInTheDocument();
  });
  it(`Teste se existe na página uma seção com os mapas contendo 
  as localizações do pokémon`, () => {
    const { history } = renderWithRouter(<App />);
    const detailsLink = screen.getByRole('link', { name: /more details/i });
    expect(detailsLink).toBeInTheDocument();
    userEvent.click(detailsLink);
    const { pathname } = history.location;
    expect(pathname).toBe(url);
    const textGameLocation = `Game Locations of ${data[0].name}`;
    const gameLocations = screen.getByRole('heading', { name: `${textGameLocation}` });
    expect(gameLocations).toBeInTheDocument();
    data[0].foundAt.forEach((location) => {
      const index = screen.getByText(location.location);
      expect(index).toBeInTheDocument();
      const imgMap = screen.getAllByRole('img', { name: `${data[0].name} location` });
      expect(imgMap.length).toBe(2);
      expect(imgMap[0]).toHaveAttribute('src', `${data[0].foundAt[0].map}`);
      expect(imgMap[1]).toHaveAttribute('src', `${data[0].foundAt[1].map}`);
      const titleMap1 = screen.getByText(`${data[0].foundAt[0].location}`);
      const titleMap2 = screen.getByText(`${data[0].foundAt[1].location}`);
      expect(titleMap1).toBeInTheDocument();
      expect(titleMap2).toBeInTheDocument();
    });
  });
  it(`Teste se o usuário pode favoritar um pokémon 
  através da página de detalhes.`, () => {
    const { history } = renderWithRouter(<App />);
    const detailsLink = screen.getByRole('link', { name: /more details/i });
    expect(detailsLink).toBeInTheDocument();
    userEvent.click(detailsLink);
    const { pathname } = history.location;
    expect(pathname).toBe(url);
    const checkFavorite = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
    expect(checkFavorite).toBeInTheDocument();
    const favoriteText = `${data[0].name} is marked as favorite`;
    console.log(favoriteText);
    userEvent.click(checkFavorite);
    const favoriteIcon = screen.getByRole('img', { name: `${favoriteText}` });
    expect(favoriteIcon).toBeInTheDocument();
    userEvent.click(checkFavorite);
    expect(favoriteIcon).not.toBeInTheDocument();
    screen.logTestingPlaygroundURL();
  });
});

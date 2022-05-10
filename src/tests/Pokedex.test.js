import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
// import Pokedex from '../components/Pokedex';
import App from '../App';

describe('Pokedex', () => {
  it(`Teste se a página contém um heading h2 com o texto 
  Encountered pokémons.`, () => {
    renderWithRouter(<App />);
    const titleEl = screen.getByRole('heading',
      { name: /encountered pokémons/i, level: 2 });
    expect(titleEl).toBeDefined();
  });
  it(`Teste se é exibido o próximo pokémon da lista quando o 
  botão Próximo pokémon é clicado`, () => {
    renderWithRouter(<App />);
    const titleEl = screen.getByRole('heading',
      { name: /encountered pokémons/i, level: 2 });
    expect(titleEl).toBeDefined();
    const electric = screen.getByRole('button', { name: /electric/i });
    const next = screen.getByRole('button', { name: /próximo pokémon/i });
    userEvent.click(electric);
    expect(next).toHaveAttribute('disabled');
    const fire = screen.getByRole('button', { name: /fire/i });
    userEvent.click(fire);
    const pokemon1 = screen.getByText(/charmander/i);
    expect(pokemon1).toBeDefined();
    userEvent.click(next);
    const pokemon2 = screen.getByText(/rapidash/i);
    expect(pokemon2).toBeInTheDocument();
    userEvent.click(next);
    expect(pokemon1).toBeInTheDocument();
  });
  it('Teste se é mostrado apenas um pokémon por vez.', () => {
    renderWithRouter(<App />);
    const pokemon = screen.getAllByTestId('pokemon-name');
    expect(pokemon.length).toBe(1);
  });
  it('Teste se a Pokédex tem os botões de filtro.', () => {
    renderWithRouter(<App />);
    const btnAll = screen.getByRole('button', { name: /all/i });
    const btnEletric = screen.getByRole('button', { name: /electric/i });
    const btnFire = screen.getByRole('button', { name: /fire/i });
    const btnBug = screen.getByRole('button', { name: /fire/i });
    const btnPoison = screen.getByRole('button', { name: /poison/i });
    const btnPsychic = screen.getByRole('button', { name: /psychic/i });
    const btnNormal = screen.getByRole('button', { name: /normal/i });
    const btnDragon = screen.getByRole('button', { name: /dragon/i });
    expect(btnAll).toBeInTheDocument();
    expect(btnEletric).toBeDefined();
    expect(btnFire).toBeDefined();
    expect(btnBug).toBeDefined();
    expect(btnPoison).toBeDefined();
    expect(btnPsychic).toBeDefined();
    expect(btnNormal).toBeDefined();
    expect(btnDragon).toBeDefined();
    userEvent.click(btnPsychic);
    const typePokemon = screen.getAllByText(/psychic/i);
    expect(typePokemon.length).toBe(2);
    const buttons = screen.getAllByTestId('pokemon-type-button');
    const SEVEN = 7;
    expect(buttons.length).toBe(SEVEN);
  });
  test('Teste se a Pokédex tem os botões de filtro.', () => {
    renderWithRouter(<App />);
    const buttons = ['Electric', 'Fire', 'Bug', 'Poison',
      'Psychic', 'Normal', 'Dragon'];
    buttons.forEach((button) => {
      const index = screen.getByRole('button', { name: button });
      expect(index).toBeInTheDocument();
    });
    const NUMBER_SEVEN = 7;
    expect(screen.getAllByTestId('pokemon-type-button')).toHaveLength(NUMBER_SEVEN);
  });
  it('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);
    const btnAll = screen.getByRole('button', { name: /all/i });
    const btnEletric = screen.getByRole('button', { name: /electric/i });
    const pokemon = screen.getByTestId('pokemon-name');
    expect(btnAll).toBeInTheDocument();
    userEvent.click(btnEletric);
    expect(pokemon).toHaveTextContent(/pikachu/i);
    const btnFire = screen.getByRole('button', { name: /fire/i });
    userEvent.click(btnFire);
    expect(pokemon).toHaveTextContent(/charmander/i);
    userEvent.click(btnAll);
    expect(pokemon).toHaveTextContent(/pikachu/i);
  });
});

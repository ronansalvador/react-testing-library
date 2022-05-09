import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import About from '../components/About';
// import App from '../App';

describe('Teste o componente <About.js />', () => {
  it('Teste se a página contém as informações sobre a Pokédex.', () => {
    const { history } = renderWithRouter(<About />);
    console.log(history);
    const titleEl = screen.getAllByRole('heading', { name: /about pokédex/i, level: 2 });
    expect(titleEl).toBeDefined();
    screen.logTestingPlaygroundURL();
  });
  it('Teste se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    renderWithRouter(<About />);
    const texto1 = 'This application simulates a Pokédex, a';
    const texto2 = 'digital encyclopedia containing all Pokémons';
    const paragrafo1 = screen.getByText(`${texto1} ${texto2}`);
    const texto3 = 'One can filter Pokémons by type,';
    const texto4 = 'and see more details for each one of them';
    const paragrafo2 = screen.getByText(`${texto3} ${texto4}`);
    expect(paragrafo1).toBeDefined();
    expect(paragrafo2).toBeDefined();
  });
  it('Teste se a página contém a seguinte imagem de uma Pokédex:', () => {
    renderWithRouter(<About />);
    const image = screen.getByRole('img', { name: /pokédex/i });
    expect(image).toBeDefined();
    expect(image).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});

import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import pokemonList from '../data';
import renderWithRouter from '../renderWithRouter';

const pathPokemon = '/pokemon/25';

describe('Testa o componente Pokemon Details', () => {
  it('testa se as informações detalhadas são mostradas na tela', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => history.push(pathPokemon));
    expect(history.location.pathname).toBe(pathPokemon);

    const titleEl = await screen.findByRole('heading', { name: /Details/ });
    expect(titleEl).toBeInTheDocument();

    const links = screen.getAllByRole('link');
    expect(links.some((link) => link.href.includes(pathPokemon))).toBeFalsy();

    const summary = screen.getByRole('heading', { name: /summary/i, level: 2 });
    expect(summary).toBeInTheDocument();
    const summaryText = screen.getByText(pokemonList[0].summary);
    expect(summaryText).toBeInTheDocument();
  });
  it('testa se existe na página uma seção com os mapas de localização dos pokémons', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => history.push(pathPokemon));
    expect(history.location.pathname).toBe(pathPokemon);

    const titleEl = await screen.findByRole('heading', { name: /Game Locations of/, level: 2 });
    expect(titleEl).toBeInTheDocument();

    const location1 = screen.getByText(/kanto viridian forest/i);
    expect(location1).toBeInTheDocument();
    const location2 = screen.getByText(/kanto power plant/i);
    expect(location2).toBeInTheDocument();

    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(3);
    expect(images.some((img) => img.alt.includes('location'))).toBeTruthy();
    expect(images[1]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
  });
  it('teste se o usuário pode favoritar um pokémon', () => {
    const { history } = renderWithRouter(<App />);
    act(() => history.push(pathPokemon));
    expect(history.location.pathname).toBe(pathPokemon);

    const checkFav = screen.getByLabelText(/pokémon favoritado\?/i);
    expect(checkFav).toBeInTheDocument();

    const link = screen.getByRole('link', {
      name: /favorite pokémon/i,
    });

    userEvent.click(checkFav);
    userEvent.click(link);

    const titleEl = screen.getByText(/pikachu/i);
    expect(titleEl).toBeInTheDocument();
  });
});

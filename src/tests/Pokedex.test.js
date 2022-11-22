import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('testa o componente Pokedex.js', () => {
  it('testa se a pagina contem um H2 com o texto Encountered Pokémon', () => {
    renderWithRouter(<App />);

    const titleEl = screen.getByRole('heading', { name: /encountered pokémon/i, level: 2 });

    expect(titleEl).toBeInTheDocument();
  });
  it('teste se é exibido o proximo pokémon da lista ao clicar no botão', async () => {
    renderWithRouter(<App />);
    const pokemonName = await screen.findByText(/pikachu/i);
    const button = screen.getByRole('button', { name: /próximo pokémon/i });
    userEvent.click(button);
    await waitFor(() => {
      expect(pokemonName).toHaveTextContent('Charmander');
    });
    userEvent.click(button);
    await waitFor(() => {
      expect(pokemonName).toHaveTextContent('Caterpie');
    });
    userEvent.click(button);
    await waitFor(() => {
      expect(pokemonName).toHaveTextContent('Ekans');
    });
    userEvent.click(button);
    await waitFor(() => {
      expect(pokemonName).toHaveTextContent('Alakazam');
    });
    userEvent.click(button);
    await waitFor(() => {
      expect(pokemonName).toHaveTextContent('Mew');
    });
    userEvent.click(button);
    await waitFor(() => {
      expect(pokemonName).toHaveTextContent('Rapidash');
    });
    userEvent.click(button);
    await waitFor(() => {
      expect(pokemonName).toHaveTextContent('Snorlax');
    });
    userEvent.click(button);
    await waitFor(() => {
      expect(pokemonName).toHaveTextContent('Dragonair');
    });
    userEvent.click(button);
    await waitFor(() => {
      expect(pokemonName).toHaveTextContent('Pikachu');
    });
  });
  it('teste se a pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);
    const button = screen.getByRole('button', { name: /all/i });
    expect(button).toBeInTheDocument();

    const buttons = screen.getAllByTestId('pokemon-type-button');
    userEvent.click(buttons[0]);
    expect(buttons[0]).toHaveTextContent('Electric');

    userEvent.click(button);
    expect(button).toBeVisible();
  });
});

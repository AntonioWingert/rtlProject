import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Pokemon } from '../components';
import pokemonList from '../data';
import renderWithRouter from '../renderWithRouter';

describe('Testa o componente Pokémon', () => {
  let currentHistory;
  beforeEach(() => {
    const { history } = renderWithRouter(<Pokemon
      pokemon={ pokemonList[0] }
      isFavorite
      showDetailsLink
    />);
    currentHistory = history;
  });
  const { averageWeight, id, image, name, type } = pokemonList[0];
  const { measurementUnit, value } = averageWeight;

  it('testa se o card renderiza com as informações do pokémon', () => {
    const pokemonName = screen.getByTestId('pokemon-name');
    const pokemonType = screen.getByText(type);
    const mediumWeight = screen.getByText(`Average weight: ${value} ${measurementUnit}`);
    const images = screen.getAllByRole('img');

    expect(pokemonName).toBeInTheDocument();
    expect(pokemonType).toBeInTheDocument();
    expect(mediumWeight).toBeInTheDocument();
    expect(images.some((img) => img.src === image)).toBeTruthy();
    expect(images.some((img) => img.alt.includes('sprite'))).toBeTruthy();
  });
  it('teste se ao clicar no link é redirecionado a pagina de detalhes sobre o pokémon', () => {
    const link = screen.getByRole('link', { name: /More details/ });
    expect(link.href.includes(`pokemon/${id}`)).toBeTruthy();

    userEvent.click(link);
    expect(currentHistory.location.pathname).toBe(`/pokemon/${id}`);
  });
  it('teste se existe um icone de estrela nos pokémons favoritados', () => {
    const images = screen.getAllByRole('img');
    const favImage = images.find((img) => img.src.includes('/star-icon.svg'));
    expect(favImage.src.includes('/star-icon.svg')).toBeTruthy();
    expect(favImage.alt).toBe(`${name} is marked as favorite`);
  });
});

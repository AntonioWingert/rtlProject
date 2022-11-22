import FavoritePokemon from '../pages/FavoritePokemon';
import renderWithRouter from '../renderWithRouter';

describe('Testa o componente Favorite Pokémon', () => {
  it('teste se a mensagem No favorite pokemon found é exibida caso não exista nenhum pokémon favoritado', () => {
    const { getByText } = renderWithRouter(<FavoritePokemon />);
    const titleEl = getByText(/no favorite pokémon found/i);
    expect(titleEl).toBeInTheDocument();
  });
});

import pokemonList from '../data';
import FavoritePokemon from '../pages/FavoritePokemon';
import renderWithRouter from '../renderWithRouter';

describe('Testa o componente Favorite Pokémon', () => {
  it('teste se a mensagem No favorite pokemon found é exibida caso não exista nenhum pokémon favoritado', () => {
    const { getByText } = renderWithRouter(<FavoritePokemon />);
    const titleEl = getByText(/no favorite pokémon found/i);
    expect(titleEl).toBeInTheDocument();
  });
  it('Teste se são exibidos todos os cards de Pokémon favoritados', () => {
    const { getByText } = renderWithRouter(<FavoritePokemon
      pokemonList={ pokemonList }
    />);
    expect(getByText(/pikachu/i)).toBeInTheDocument();
    expect(getByText(/Charmander/i)).toBeInTheDocument();
    expect(getByText(/Caterpie/i)).toBeInTheDocument();
    expect(getByText(/Ekans/i)).toBeInTheDocument();
    expect(getByText(/Alakazam/i)).toBeInTheDocument();
    expect(getByText(/Snorlax/i)).toBeInTheDocument();
    expect(getByText(/Dragonair/i)).toBeInTheDocument();
  });
});

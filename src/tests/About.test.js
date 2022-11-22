import { render, screen } from '@testing-library/react';
import { About } from '../pages';

describe('Testa o componente About', () => {
  it('Testa se a página contém as informações sobre a Pokédex', () => {
    render(<About />);
    const titleEl = screen.getByRole('heading', {
      name: /about pokédex/i,
      level: 2,
    });
    const paragraphOne = screen.getByText(
      /this application simulates a pokédex, a digital encyclopedia containing all pokémon/i,
    );
    const paragraphTwo = screen.getByText(
      /one can filter pokémon by type, and see more details for each one of them/i,
    );
    const img = screen.getByRole('img', { name: /pokédex/i });

    expect(titleEl).toBeInTheDocument();
    expect(paragraphOne).toBeInTheDocument();
    expect(paragraphTwo).toBeInTheDocument();
    expect(img.src).toContain('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});

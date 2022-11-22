import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testa o componente App', () => {
  it('testa se o topo da aplicação possui os links de navegacao', () => {
    const { getByRole } = renderWithRouter(<App />);
    const home = getByRole('link', {
      name: /home/i,
    });
    expect(home).toBeInTheDocument();
    const about = getByRole('link', {
      name: /about/i,
    });
    expect(about).toBeInTheDocument();
    const favorite = getByRole('link', {
      name: /favorite pokémon/i,
    });
    expect(favorite).toBeInTheDocument();
  });
  it('testa se a aplicação é redirecionada ao clicar no link home', () => {
    const { history, getByRole } = renderWithRouter(<App />);
    const home = getByRole('link', {
      name: /home/i,
    });

    userEvent.click(home);
    expect(history.location.pathname).toBe('/');
  });
  it('testa se a aplicação é redirecionada ao clicar no link about', () => {
    const { history, getByRole } = renderWithRouter(<App />);
    const about = getByRole('link', {
      name: /about/i,
    });

    userEvent.click(about);
    expect(history.location.pathname).toBe('/about');
  });
  it('testa se a aplicação é redirecionada ao clicar no link favorite pokémon', () => {
    const { history, getByRole } = renderWithRouter(<App />);
    const favorite = getByRole('link', {
      name: /favorite pokémon/i,
    });

    userEvent.click(favorite);
    expect(history.location.pathname).toBe('/favorites');
  });
  it('testa se a aplicação é redirecionada para Not Found se entrar em uma URL desconhecida', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/agumon');

    expect(history.location.pathname).toBe('/agumon');
  });
});

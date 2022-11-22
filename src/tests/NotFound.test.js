import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('testa o componente Not Found', () => {
  it('testa se a aplicação é redirecionada para Not Found se entrar em uma URL desconhecida', () => {
    const { history, getByRole } = renderWithRouter(<App />);
    const URL_IMAGE = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';

    act(() => {
      history.push('/badrequest');
    });

    const titleEl = getByRole('heading', { name: /page requested not found/i,
      level: 2 });
    const image = getByRole('img', { name: /pikachu crying because the page requested was not found/i });

    expect(titleEl).toBeInTheDocument();
    expect(image.src).toContain(URL_IMAGE);
    expect(history.location.pathname).toBe('/badrequest');
  });
});

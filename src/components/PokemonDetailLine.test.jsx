import { render, screen } from '@testing-library/react';
import PokemonDetailLine from './PokemonDetailLine';

describe('PokemonDetailLine', () => {
  it('muestra la propiedad y el nombre correctamente', () => {
    render(<PokemonDetailLine property="Color" name="Rojo" />);
    expect(screen.getByText('Color')).toBeInTheDocument();
    expect(screen.getByText('Rojo')).toBeInTheDocument();
  });

  it('renderiza el icono correcto para "Color"', () => {
    render(<PokemonDetailLine property="Color" name="Rojo" />);
    const svg = screen.getByTestId('ColorLensIcon');
    expect(svg).toBeInTheDocument();
  });

  it('usa icono por defecto para propiedad desconocida', () => {
    render(<PokemonDetailLine property="OtraCosa" name="Algo" />);
    const fallbackIcon = screen.getByTestId('ImageIcon');
    expect(fallbackIcon).toBeInTheDocument();
  });
});

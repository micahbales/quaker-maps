import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import { Loading } from './Loading';
import { QuakerMapsTheme } from './theme';

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider theme={QuakerMapsTheme}>
      {component}
    </ThemeProvider>
  );
};

describe('Loading Component', () => {
  it('renders a circular progress indicator', () => {
    renderWithTheme(<Loading />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('applies correct styling', () => {
    renderWithTheme(<Loading />);
    const progressContainer = screen.getByRole('progressbar').parentElement;
    
    expect(progressContainer).toHaveStyle({
      display: 'flex',
      justifyContent: 'center',
      marginTop: '25%'
    });
  });

  it('renders with MUI theme applied', () => {
    renderWithTheme(<Loading />);
    const progress = screen.getByRole('progressbar');
    expect(progress).toBeInTheDocument();
  });
});
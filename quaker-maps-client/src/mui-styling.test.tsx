import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider, useTheme } from '@mui/material/styles';
import { Button, Box, Typography } from '@mui/material';
import { QuakerMapsTheme } from './theme';

// Test component to verify theme application
const TestComponent: React.FC = () => {
  const theme = useTheme();
  
  return (
    <Box>
      <Typography variant="h1" data-testid="typography">
        Test Typography
      </Typography>
      <Button 
        variant="contained" 
        color="primary" 
        data-testid="primary-button"
        sx={{ margin: theme.spacing(1) }}
      >
        Primary Button
      </Button>
      <Button 
        variant="contained" 
        color="secondary" 
        data-testid="secondary-button"
      >
        Secondary Button
      </Button>
      <Box 
        data-testid="styled-box"
        sx={{
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
          padding: theme.spacing(2),
        }}
      >
        Styled Box
      </Box>
    </Box>
  );
};

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider theme={QuakerMapsTheme}>
      {component}
    </ThemeProvider>
  );
};

describe('MUI v5 Styling and Theme Application', () => {
  it('applies theme to MUI components', () => {
    renderWithTheme(<TestComponent />);
    
    expect(screen.getByTestId('typography')).toBeInTheDocument();
    expect(screen.getByTestId('primary-button')).toBeInTheDocument();
    expect(screen.getByTestId('secondary-button')).toBeInTheDocument();
    expect(screen.getByTestId('styled-box')).toBeInTheDocument();
  });

  it('uses sx prop for styling', () => {
    renderWithTheme(<TestComponent />);
    
    const styledBox = screen.getByTestId('styled-box');
    expect(styledBox).toBeInTheDocument();
    
    // The sx prop should apply the styles
    const computedStyle = window.getComputedStyle(styledBox);
    expect(computedStyle.padding).toBeTruthy();
  });

  it('applies primary theme colors correctly', () => {
    renderWithTheme(<TestComponent />);
    
    const primaryButton = screen.getByTestId('primary-button');
    expect(primaryButton).toHaveClass('MuiButton-containedPrimary');
  });

  it('applies secondary theme colors correctly', () => {
    renderWithTheme(<TestComponent />);
    
    const secondaryButton = screen.getByTestId('secondary-button');
    expect(secondaryButton).toHaveClass('MuiButton-containedSecondary');
  });

  it('provides theme through useTheme hook', () => {
    const ThemeConsumer: React.FC = () => {
      const theme = useTheme();
      return (
        <div data-testid="theme-consumer">
          Primary: {theme.palette.primary.main}
        </div>
      );
    };

    renderWithTheme(<ThemeConsumer />);
    
    const consumer = screen.getByTestId('theme-consumer');
    expect(consumer).toBeInTheDocument();
    expect(consumer.textContent).toContain('Primary:');
  });

  it('supports MUI v5 createTheme API', () => {
    // Verify that our theme was created with the v5 API
    expect(QuakerMapsTheme).toHaveProperty('palette');
    expect(QuakerMapsTheme.palette).toHaveProperty('primary');
    expect(QuakerMapsTheme.palette).toHaveProperty('secondary');
    
    // v5 themes have these properties
    expect(QuakerMapsTheme).toHaveProperty('typography');
    expect(QuakerMapsTheme).toHaveProperty('spacing');
    expect(QuakerMapsTheme).toHaveProperty('breakpoints');
  });

  it('works with emotion styling engine', () => {
    // Test that emotion (MUI v5's default styling engine) works
    const EmotionStyledComponent: React.FC = () => (
      <Box
        data-testid="emotion-box"
        sx={{
          '&:hover': {
            backgroundColor: 'primary.light',
          },
          transition: 'background-color 0.3s',
        }}
      >
        Emotion Styled
      </Box>
    );

    renderWithTheme(<EmotionStyledComponent />);
    
    const emotionBox = screen.getByTestId('emotion-box');
    expect(emotionBox).toBeInTheDocument();
  });

  it('supports responsive breakpoints', () => {
    const ResponsiveComponent: React.FC = () => (
      <Box
        data-testid="responsive-box"
        sx={{
          width: {
            xs: '100%',
            sm: '50%',
            md: '25%',
          },
        }}
      >
        Responsive Box
      </Box>
    );

    renderWithTheme(<ResponsiveComponent />);
    
    const responsiveBox = screen.getByTestId('responsive-box');
    expect(responsiveBox).toBeInTheDocument();
  });
});
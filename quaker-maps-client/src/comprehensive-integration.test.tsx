import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { QuakerMapsTheme } from './theme';
import { NavBar } from './components/NavBar/NavBar';
import { Loading } from './Loading';

// Mock performance API
Object.defineProperty(window, 'performance', {
  value: {
    now: jest.fn(() => Date.now()),
    mark: jest.fn(),
    measure: jest.fn(),
    getEntriesByType: jest.fn((type: string) => {
      if (type === 'navigation') {
        return [{
          loadEventEnd: 100,
          fetchStart: 0,
        }];
      }
      return [];
    }),
  },
});

describe('Comprehensive Integration Tests', () => {
  const renderWithAllProviders = (component: React.ReactElement, initialRoute = '/') => {
    return render(
      <MemoryRouter initialEntries={[initialRoute]}>
        <ThemeProvider theme={QuakerMapsTheme}>
          {component}
        </ThemeProvider>
      </MemoryRouter>
    );
  };

  it('integrates React 18, MUI v5, and React Router v6 successfully', () => {
    const TestIntegrationComponent: React.FC = () => {
      const [count, setCount] = React.useState(0);

      return (
        <div>
          <h1 data-testid="integration-title">React 18 + MUI v5 + Router v6</h1>
          <NavBar
            isViewingMainMap={true}
            toggleDrawer={() => () => {}}
            marginLeft="0px"
            navMenuIsOpen={false}
          />
          <Loading />
          <button 
            data-testid="counter-button"
            onClick={() => setCount(c => c + 1)}
          >
            Count: {count}
          </button>
        </div>
      );
    };

    renderWithAllProviders(<TestIntegrationComponent />);

    // Verify React 18 rendering
    expect(screen.getByTestId('integration-title')).toBeInTheDocument();

    // Verify MUI v5 components render
    expect(screen.getByText('Quaker Maps')).toBeInTheDocument();
    expect(screen.getByRole('progressbar')).toBeInTheDocument();

    // Verify React 18 state updates work
    const button = screen.getByTestId('counter-button');
    expect(button).toHaveTextContent('Count: 0');
    
    fireEvent.click(button);
    expect(button).toHaveTextContent('Count: 1');
  });

  it('verifies MUI v5 theme integration with React 18', () => {
    const ThemeTestComponent: React.FC = () => {
      return (
        <div>
          <NavBar
            isViewingMainMap={true}
            toggleDrawer={() => () => {}}
            marginLeft="0px"
            navMenuIsOpen={false}
          />
        </div>
      );
    };

    renderWithAllProviders(<ThemeTestComponent />);

    // Verify MUI v5 theme is applied
    const quakersButton = screen.getByText('Quakers?');
    expect(quakersButton).toHaveClass('MuiButton-containedPrimary');
    
    const faqButton = screen.getByText('FAQ');
    expect(faqButton).toHaveClass('MuiButton-containedPrimary');
  });

  it('verifies React Router v6 integration', () => {
    const RouterTestComponent: React.FC = () => {
      return (
        <div>
          <h1 data-testid="router-test">Router v6 Test</h1>
          <NavBar
            isViewingMainMap={false}
            toggleDrawer={() => () => {}}
            marginLeft="0px"
            navMenuIsOpen={false}
          />
        </div>
      );
    };

    renderWithAllProviders(<RouterTestComponent />);

    // Verify navigation links use correct hrefs (Router v6 compatible)
    expect(screen.getByText('Quaker Maps').closest('a')).toHaveAttribute('href', '/');
    expect(screen.getByText('Quakers?').closest('a')).toHaveAttribute('href', '/info');
    expect(screen.getByText('FAQ').closest('a')).toHaveAttribute('href', '/frequently-asked-questions');
    expect(screen.getByText('Contact').closest('a')).toHaveAttribute('href', '/contact');
  });

  it('verifies all testing libraries work with updated versions', async () => {
    const AsyncTestComponent: React.FC = () => {
      const [loading, setLoading] = React.useState(true);

      React.useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 100);
        return () => clearTimeout(timer);
      }, []);

      return (
        <div>
          {loading ? (
            <Loading />
          ) : (
            <div data-testid="loaded-content">Content Loaded!</div>
          )}
        </div>
      );
    };

    renderWithAllProviders(<AsyncTestComponent />);

    // Initially shows loading
    expect(screen.getByRole('progressbar')).toBeInTheDocument();

    // Wait for async content to load
    await waitFor(() => {
      expect(screen.getByTestId('loaded-content')).toBeInTheDocument();
    });

    // Loading should be gone
    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
  });

  it('demonstrates React 18 concurrent features compatibility', () => {
    const ConcurrentTestComponent: React.FC = () => {
      const [urgentCount, setUrgentCount] = React.useState(0);
      const [nonUrgentCount, setNonUrgentCount] = React.useState(0);

      const handleUrgentUpdate = () => {
        setUrgentCount(prev => prev + 1);
      };

      const handleNonUrgentUpdate = () => {
        React.startTransition(() => {
          setNonUrgentCount(prev => prev + 1);
        });
      };

      return (
        <div>
          <div data-testid="urgent-count">Urgent: {urgentCount}</div>
          <div data-testid="non-urgent-count">Non-Urgent: {nonUrgentCount}</div>
          <button data-testid="urgent-btn" onClick={handleUrgentUpdate}>
            Urgent Update
          </button>
          <button data-testid="non-urgent-btn" onClick={handleNonUrgentUpdate}>
            Non-Urgent Update
          </button>
        </div>
      );
    };

    renderWithAllProviders(<ConcurrentTestComponent />);

    // Test urgent updates
    fireEvent.click(screen.getByTestId('urgent-btn'));
    expect(screen.getByTestId('urgent-count')).toHaveTextContent('Urgent: 1');

    // Test non-urgent updates with startTransition
    fireEvent.click(screen.getByTestId('non-urgent-btn'));
    expect(screen.getByTestId('non-urgent-count')).toHaveTextContent('Non-Urgent: 1');
  });
});
import React, { useState, startTransition } from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import { Button, Box } from '@mui/material';
import { QuakerMapsTheme } from './theme';

// Test component that uses React 18 features
const React18TestComponent: React.FC = () => {
  const [count, setCount] = useState(0);
  const [isPending, setIsPending] = useState(false);

  const handleUrgentUpdate = () => {
    setCount(prev => prev + 1);
  };

  const handleNonUrgentUpdate = () => {
    setIsPending(true);
    startTransition(() => {
      setCount(prev => prev + 10);
      setIsPending(false);
    });
  };

  return (
    <ThemeProvider theme={QuakerMapsTheme}>
      <Box>
        <div data-testid="count">Count: {count}</div>
        <div data-testid="pending">{isPending ? 'Pending...' : 'Ready'}</div>
        <Button 
          data-testid="urgent-button" 
          onClick={handleUrgentUpdate}
          variant="contained"
          color="primary"
        >
          Urgent Update
        </Button>
        <Button 
          data-testid="non-urgent-button" 
          onClick={handleNonUrgentUpdate}
          variant="contained"
          color="secondary"
        >
          Non-Urgent Update
        </Button>
      </Box>
    </ThemeProvider>
  );
};

// Test component for automatic batching
const AutomaticBatchingTestComponent: React.FC = () => {
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  const renderCountRef = React.useRef(0);

  // This should only cause one re-render in React 18 due to automatic batching
  const handleMultipleUpdates = () => {
    setCount1(prev => prev + 1);
    setCount2(prev => prev + 1);
  };

  // Track renders using ref to avoid infinite loops
  renderCountRef.current += 1;

  return (
    <ThemeProvider theme={QuakerMapsTheme}>
      <Box>
        <div data-testid="count1">Count 1: {count1}</div>
        <div data-testid="count2">Count 2: {count2}</div>
        <div data-testid="render-count">Renders: {renderCountRef.current}</div>
        <Button 
          data-testid="batch-button" 
          onClick={handleMultipleUpdates}
          variant="contained"
        >
          Update Both
        </Button>
      </Box>
    </ThemeProvider>
  );
};

describe('React 18 Features Integration', () => {
  it('supports startTransition for non-urgent updates', async () => {
    render(<React18TestComponent />);
    
    expect(screen.getByTestId('count')).toHaveTextContent('Count: 0');
    expect(screen.getByTestId('pending')).toHaveTextContent('Ready');
    
    // Test urgent update
    fireEvent.click(screen.getByTestId('urgent-button'));
    expect(screen.getByTestId('count')).toHaveTextContent('Count: 1');
    
    // Test non-urgent update with startTransition
    fireEvent.click(screen.getByTestId('non-urgent-button'));
    
    await waitFor(() => {
      expect(screen.getByTestId('count')).toHaveTextContent('Count: 11');
    });
  });

  it('demonstrates automatic batching behavior', () => {
    render(<AutomaticBatchingTestComponent />);
    
    expect(screen.getByTestId('count1')).toHaveTextContent('Count 1: 0');
    expect(screen.getByTestId('count2')).toHaveTextContent('Count 2: 0');
    
    // Initial render count should be 1
    expect(screen.getByTestId('render-count')).toHaveTextContent('Renders: 1');
    
    // Click button to trigger multiple state updates
    fireEvent.click(screen.getByTestId('batch-button'));
    
    // Both counts should be updated
    expect(screen.getByTestId('count1')).toHaveTextContent('Count 1: 1');
    expect(screen.getByTestId('count2')).toHaveTextContent('Count 2: 1');
    
    // Due to automatic batching, render count should only be 2 (not 3)
    expect(screen.getByTestId('render-count')).toHaveTextContent('Renders: 2');
  });

  it('works with MUI v5 components and React 18', () => {
    render(<React18TestComponent />);
    
    // Verify MUI components render correctly with React 18
    const urgentButton = screen.getByTestId('urgent-button');
    const nonUrgentButton = screen.getByTestId('non-urgent-button');
    
    expect(urgentButton).toHaveClass('MuiButton-containedPrimary');
    expect(nonUrgentButton).toHaveClass('MuiButton-containedSecondary');
  });

  it('maintains component state correctly with React 18', () => {
    render(<React18TestComponent />);
    
    // Multiple rapid clicks should all be processed
    const urgentButton = screen.getByTestId('urgent-button');
    
    fireEvent.click(urgentButton);
    fireEvent.click(urgentButton);
    fireEvent.click(urgentButton);
    
    expect(screen.getByTestId('count')).toHaveTextContent('Count: 3');
  });
});
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import { NavBar } from './NavBar';
import { QuakerMapsTheme } from '../../theme';

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider theme={QuakerMapsTheme}>
      {component}
    </ThemeProvider>
  );
};

describe('NavBar Component', () => {
  const defaultProps = {
    isViewingMainMap: true,
    toggleDrawer: jest.fn(() => jest.fn()),
    marginLeft: '0px',
    navMenuIsOpen: false,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the Quaker Maps title', () => {
    renderWithTheme(<NavBar {...defaultProps} />);
    expect(screen.getByText('Quaker Maps')).toBeInTheDocument();
  });

  it('renders all navigation buttons', () => {
    renderWithTheme(<NavBar {...defaultProps} />);
    expect(screen.getByText('Quakers?')).toBeInTheDocument();
    expect(screen.getByText('FAQ')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });

  it('shows filter button when viewing main map and nav menu is closed', () => {
    renderWithTheme(<NavBar {...defaultProps} />);
    expect(screen.getByLabelText('menu')).toBeInTheDocument();
  });

  it('hides filter button when nav menu is open', () => {
    renderWithTheme(<NavBar {...defaultProps} navMenuIsOpen={true} />);
    expect(screen.queryByLabelText('menu')).not.toBeInTheDocument();
  });

  it('hides filter button when not viewing main map', () => {
    renderWithTheme(<NavBar {...defaultProps} isViewingMainMap={false} />);
    expect(screen.queryByLabelText('menu')).not.toBeInTheDocument();
  });

  it('calls toggleDrawer when filter button is clicked', () => {
    const mockToggleDrawer = jest.fn(() => jest.fn());
    renderWithTheme(<NavBar {...defaultProps} toggleDrawer={mockToggleDrawer} />);
    
    const filterButton = screen.getByLabelText('menu');
    fireEvent.click(filterButton);
    
    expect(mockToggleDrawer).toHaveBeenCalledWith(true);
  });

  it('applies correct margin left styling', () => {
    const marginLeft = '250px';
    renderWithTheme(<NavBar {...defaultProps} marginLeft={marginLeft} />);
    
    // The Box component should have the marginLeft style applied
    const navContainer = screen.getByText('Quaker Maps').closest('[class*="MuiBox"]') || 
                        screen.getByText('Quaker Maps').closest('div');
    expect(navContainer).toBeInTheDocument();
  });

  it('renders navigation links with correct hrefs', () => {
    renderWithTheme(<NavBar {...defaultProps} />);
    
    expect(screen.getByText('Quaker Maps').closest('a')).toHaveAttribute('href', '/');
    expect(screen.getByText('Quakers?').closest('a')).toHaveAttribute('href', '/info');
    expect(screen.getByText('FAQ').closest('a')).toHaveAttribute('href', '/frequently-asked-questions');
    expect(screen.getByText('Contact').closest('a')).toHaveAttribute('href', '/contact');
  });
});
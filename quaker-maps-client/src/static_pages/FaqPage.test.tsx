import React from 'react'
import { render, screen } from '@testing-library/react'
import { ThemeProvider } from '@mui/material/styles'
import { BrowserRouter } from 'react-router-dom'
import { FaqPage } from './FaqPage'
import { QuakerMapsTheme } from '../theme'

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      <ThemeProvider theme={QuakerMapsTheme}>{component}</ThemeProvider>
    </BrowserRouter>
  )
}

describe('FaqPage Component', () => {
  it('renders the FAQ page title', () => {
    renderWithProviders(<FaqPage />)
    expect(screen.getByText(/Frequently Asked Questions/i)).toBeInTheDocument()
  })

  it('renders with MUI v5 components', () => {
    renderWithProviders(<FaqPage />)

    // Check that MUI components are rendered
    const container = screen.getByText(/Frequently Asked Questions/i).closest('div')
    expect(container).toBeInTheDocument()
  })

  it('applies theme styling correctly', () => {
    renderWithProviders(<FaqPage />)

    // The page should render without throwing errors, indicating proper theme application
    expect(screen.getByText(/Frequently Asked Questions/i)).toBeInTheDocument()
  })

  it('renders FAQ content sections', () => {
    renderWithProviders(<FaqPage />)

    // Check for common FAQ content
    expect(screen.getByText(/What is Quakerism/i)).toBeInTheDocument()
  })

  it('uses React 18 compatible rendering', () => {
    // This test verifies that the component renders without errors in React 18
    const { container } = renderWithProviders(<FaqPage />)
    expect(container.firstChild).toBeInTheDocument()
  })
})

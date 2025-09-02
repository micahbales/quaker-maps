import React from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';
import { QuakerMapsTheme } from './theme';
import { Meeting } from './types';

// Custom render function that includes providers
const AllTheProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={QuakerMapsTheme}>
        {children}
      </ThemeProvider>
    </BrowserRouter>
  );
};

const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options });

// Mock meeting data for tests
export const mockMeeting: Meeting = {
  id: 'test-meeting-1',
  title: 'Test Quaker Meeting',
  slug: 'test-quaker-meeting',
  latitude: 40.7128,
  longitude: -74.0060,
  address: '123 Test Street',
  city: 'Test City',
  state: 'NY',
  zip: '12345',
  phone: '555-123-4567',
  website: 'https://testmeeting.org',
  worship_time: 'Sunday 10:00 AM',
  school_time: 'Sunday 9:00 AM',
  description: 'A welcoming Quaker meeting for all.',
  accessibility: ['Wheelchair accessible'],
  branch: ['Liberal'],
  worship_style: ['Unprogrammed'],
  yearly_meeting: ['New York Yearly Meeting'],
  lgbt_affirming: true,
  mappable: true,
  created_at: {
    _seconds: 1234567890,
    _nanoseconds: 0
  }
};

export const mockMeetings: Meeting[] = [
  mockMeeting,
  {
    ...mockMeeting,
    id: 'test-meeting-2',
    title: 'Another Test Meeting',
    slug: 'another-test-meeting',
    city: 'Another City',
    lgbt_affirming: false,
    branch: ['Conservative'],
    worship_style: ['Programmed']
  }
];

// Mock session storage
export const mockSessionStorage = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};

// Setup function for common test mocks
export const setupTestMocks = () => {
  // Environment variables are mocked in vite.config.ts test.env section

  // Mock fetch
  global.fetch = vi.fn();

  // Mock sessionStorage
  Object.defineProperty(window, 'sessionStorage', {
    value: mockSessionStorage,
    writable: true,
  });

  // Mock performance API
  Object.defineProperty(window, 'performance', {
    value: {
      now: vi.fn(() => Date.now()),
      mark: vi.fn(),
      measure: vi.fn(),
      getEntriesByType: vi.fn((type: string) => {
        if (type === 'navigation') {
          return [{
            loadEventEnd: 100,
            fetchStart: 0,
          }];
        }
        return [];
      }),
    },
    writable: true,
  });

  // Mock PerformanceObserver
  const MockPerformanceObserver = vi.fn().mockImplementation(() => ({
    observe: vi.fn(),
    disconnect: vi.fn(),
  }));
  (MockPerformanceObserver as any).supportedEntryTypes = ['measure', 'navigation', 'resource'];
  global.PerformanceObserver = MockPerformanceObserver as any;

  // Mock google-map-react
  vi.mock('google-map-react', () => {
    return {
      default: function GoogleMapReact() {
        return <div data-testid="google-map">Google Map</div>;
      }
    };
  });
};

// Cleanup function for tests
export const cleanupTestMocks = () => {
  vi.clearAllMocks();
  mockSessionStorage.getItem.mockReturnValue(null);
};

// Re-export everything from React Testing Library
export * from '@testing-library/react';

// Override render method
export { customRender as render };
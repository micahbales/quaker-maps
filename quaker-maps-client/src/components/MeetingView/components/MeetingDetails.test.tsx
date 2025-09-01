import React from 'react';
import { render, screen } from '@testing-library/react';
import { MeetingDetails } from './MeetingDetails';
import { Meeting } from '../../../types';
import { expect, it, describe } from 'vitest';

// Test meeting with undefined accessibility property
const testMeetingWithUndefinedAccessibility: Meeting = {
    id: 'test-1',
    title: 'Test Meeting',
    slug: 'test-meeting',
    state: 'CA',
    lgbt_affirming: false,
    mappable: true,
    latitude: 37.7749,
    longitude: -122.4194,
    created_at: {
        _seconds: 1640995200,
        _nanoseconds: 0
    },
    // accessibility is undefined (not provided)
    branch: ['Liberal'],
    worship_style: ['Unprogrammed'],
    yearly_meeting: ['Pacific Yearly Meeting'],
    city: 'San Francisco',
    address: '123 Test St',
    description: 'A test meeting',
    phone: '555-123-4567',
    school_time: '10:00 AM',
    website: 'test.org',
    worship_time: '11:00 AM',
    zip: '94102'
};

// Test meeting with empty accessibility array
const testMeetingWithEmptyAccessibility: Meeting = {
    ...testMeetingWithUndefinedAccessibility,
    accessibility: []
};

// Test meeting with accessibility data
const testMeetingWithAccessibility: Meeting = {
    ...testMeetingWithUndefinedAccessibility,
    accessibility: ['Wheelchair Accessible', 'Hearing Loop']
};

describe('MeetingDetails', () => {
    it('should handle undefined accessibility property without crashing', () => {
        render(<MeetingDetails meeting={testMeetingWithUndefinedAccessibility} title="Test Meeting" />);

        // Should render the meeting title
        expect(screen.getByText('Test Meeting')).toBeInTheDocument();

        // Should not render accessibility section
        expect(screen.queryByText(/Accessibility:/)).not.toBeInTheDocument();
    });

    it('should handle empty accessibility array without crashing', () => {
        render(<MeetingDetails meeting={testMeetingWithEmptyAccessibility} title="Test Meeting" />);

        // Should render the meeting title
        expect(screen.getByText('Test Meeting')).toBeInTheDocument();

        // Should not render accessibility section
        expect(screen.queryByText(/Accessibility:/)).not.toBeInTheDocument();
    });

    it('should render accessibility when data is present', () => {
        render(<MeetingDetails meeting={testMeetingWithAccessibility} title="Test Meeting" />);

        // Should render the meeting title
        expect(screen.getByText('Test Meeting')).toBeInTheDocument();

        // Should render accessibility section
        expect(screen.getByText(/Accessibility:/)).toBeInTheDocument();
        expect(screen.getByText(/Wheelchair Accessible, Hearing Loop/)).toBeInTheDocument();
    });

    it('should handle undefined arrays for all multi-value fields', () => {
        const meetingWithUndefinedArrays: Meeting = {
            ...testMeetingWithUndefinedAccessibility,
            // All array fields undefined
            accessibility: undefined,
            branch: undefined,
            worship_style: undefined,
            yearly_meeting: undefined
        };

        render(<MeetingDetails meeting={meetingWithUndefinedArrays} title="Test Meeting" />);

        // Should render the meeting title
        expect(screen.getByText('Test Meeting')).toBeInTheDocument();

        // Should not render any of the array-based sections
        expect(screen.queryByText(/Accessibility:/)).not.toBeInTheDocument();
        expect(screen.queryByText(/Branch:/)).not.toBeInTheDocument();
        expect(screen.queryByText(/Worship Style:/)).not.toBeInTheDocument();
        expect(screen.queryByText(/Yearly Meeting:/)).not.toBeInTheDocument();
    });

    it('should not crash when rendering without title prop', () => {
        // This is the main test - ensuring the component doesn't crash with undefined properties
        render(<MeetingDetails meeting={testMeetingWithUndefinedAccessibility} />);

        // Should render location information
        expect(screen.getByText(/Location:/)).toBeInTheDocument();
        expect(screen.getByText(/San Francisco/)).toBeInTheDocument();

        // Should not render accessibility section
        expect(screen.queryByText(/Accessibility:/)).not.toBeInTheDocument();
    });
});
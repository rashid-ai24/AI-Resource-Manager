import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { LoadingSpinner, LoadingOverlay, LoadingPage, LoadingButton } from '../LoadingSpinner';

describe('LoadingSpinner', () => {
  it('renders with default label', () => {
    render(<LoadingSpinner />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders with custom label', () => {
    render(<LoadingSpinner label="Please wait" />);
    expect(screen.getByText('Please wait')).toBeInTheDocument();
  });

  it('has role="status" for accessibility', () => {
    render(<LoadingSpinner />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(<LoadingSpinner className="custom-class" />);
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('renders different sizes', () => {
    const { rerender } = render(<LoadingSpinner size="xs" />);
    expect(screen.getByRole('status')).toBeInTheDocument();

    rerender(<LoadingSpinner size="lg" />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });
});

describe('LoadingOverlay', () => {
  it('renders with default label', () => {
    render(<LoadingOverlay />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders with custom label', () => {
    render(<LoadingOverlay label="Saving..." />);
    expect(screen.getByText('Saving...')).toBeInTheDocument();
  });
});

describe('LoadingPage', () => {
  it('renders with default label', () => {
    render(<LoadingPage />);
    expect(screen.getAllByText('Loading...')).toHaveLength(2);
  });

  it('renders with custom label', () => {
    render(<LoadingPage label="Fetching data..." />);
    expect(screen.getAllByText('Fetching data...')).toHaveLength(2);
  });
});

describe('LoadingButton', () => {
  it('renders with saving label', () => {
    render(<LoadingButton />);
    expect(screen.getByText('Saving...')).toBeInTheDocument();
  });
});

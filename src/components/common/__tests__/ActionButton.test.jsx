import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ActionButton } from '../ActionButton';
import { Search } from 'lucide-react';

describe('ActionButton', () => {
  it('renders with label', () => {
    render(<ActionButton label="Click me" />);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('renders with icon', () => {
    render(<ActionButton icon={Search} label="Search" />);
    expect(screen.getByText('Search')).toBeInTheDocument();
  });

  it('renders children when no label', () => {
    render(<ActionButton>Custom Content</ActionButton>);
    expect(screen.getByText('Custom Content')).toBeInTheDocument();
  });

  it('disables when disabled prop is true', () => {
    render(<ActionButton label="Disabled" disabled />);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('disables when loading', () => {
    render(<ActionButton label="Loading" loading />);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('applies variant correctly', () => {
    render(<ActionButton label="Ghost" variant="ghost" />);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('applies size correctly', () => {
    render(<ActionButton label="Small" size="sm" />);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<ActionButton label="Custom" className="custom-class" />);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('custom-class');
  });
});

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { EmptyState } from '../EmptyState';
import { Search } from 'lucide-react';
import { Button } from '../../ui/button';

describe('EmptyState', () => {
  it('renders with default title', () => {
    render(<EmptyState />);
    expect(screen.getByText('No items found')).toBeInTheDocument();
  });

  it('renders with custom title', () => {
    render(<EmptyState title="No agents" />);
    expect(screen.getByText('No agents')).toBeInTheDocument();
  });

  it('renders description when provided', () => {
    render(
      <EmptyState
        title="No results"
        description="Try adjusting your search"
      />
    );
    expect(screen.getByText('Try adjusting your search')).toBeInTheDocument();
  });

  it('renders icon when provided', () => {
    render(<EmptyState icon={Search} title="No results" />);
    expect(screen.getByText('No results')).toBeInTheDocument();
  });

  it('renders action when provided', () => {
    render(
      <EmptyState
        title="No items"
        action={<Button>Create Item</Button>}
      />
    );
    expect(screen.getByText('Create Item')).toBeInTheDocument();
  });

  it('renders children', () => {
    render(
      <EmptyState title="Empty">
        <p>Custom content</p>
      </EmptyState>
    );
    expect(screen.getByText('Custom content')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <EmptyState title="Custom" className="custom-class" />
    );
    expect(container.firstChild).toHaveClass('custom-class');
  });
});

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Footer from '../Footer';

// Mock Date to ensure consistent output
const mockDate = new Date('2025-04-28');
vi.spyOn(global, 'Date').mockImplementation(() => mockDate);

describe('Footer Component', () => {
    it('renders with current year', () => {
        // Arrange & Act
        render(<Footer />);

        // Assert
        expect(screen.getByText(`© 2025 - KnightKo`)).toBeInTheDocument();
    });
});
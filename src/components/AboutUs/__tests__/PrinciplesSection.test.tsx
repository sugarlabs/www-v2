import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import PrinciplesSection from '../PrinciplesSection';

// Mock framer-motion
vi.mock('framer-motion', () => ({
    motion: {
        div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
        h2: ({ children, ...props }: any) => <h2 {...props}>{children}</h2>,
        img: ({ ...props }: any) => <img {...props} />,
    },
}));

describe('PrinciplesSection', () => {
    it('renders the section title', async () => {
        render(<PrinciplesSection />);
        // screen.debug();
        expect(await screen.findByText(/Learning as a verb/i)).toBeInTheDocument();
    });

    it('renders the featured image', () => {
        render(<PrinciplesSection />);
        const image = screen.getByAltText('Our Principles');
        expect(image).toBeInTheDocument();
    });
});

import { render, screen } from '@testing-library/react';
import Home from 'src/pages';

describe('Home', () => {
	it('render Home', () => {
		render(<Home />);
		const div = screen.getByText('Hello');

		expect(div).toBeInTheDocument();
	});
});

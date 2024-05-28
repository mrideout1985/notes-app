import { render } from '@testing-library/react';
import AuthFormHeader from './AuthFormHeader';
import { BrowserRouter as Router } from 'react-router-dom';
describe('AuthFormHeader', () => {
    it('should render the correct text if the action prop is register', () => {
        const screen = render(<Router>
				<AuthFormHeader action="register"/>
			</Router>);
        expect(screen.getByRole('link', { name: 'Sign in' })).toBeInTheDocument();
        expect(screen.getByRole('link')).toHaveAttribute('href', '/login');
        expect(screen.getByText('Already have an account?')).toBeInTheDocument();
    });
    it('should render the correct text if the action prop is login', () => {
        const screen = render(<Router>
				<AuthFormHeader action="login"/>
			</Router>);
        expect(screen.getByRole('link', { name: 'Sign up' })).toBeInTheDocument();
        expect(screen.getByRole('link')).toHaveAttribute('href', '/register');
        expect(screen.getByText('to start taking notes')).toBeInTheDocument();
    });
});
